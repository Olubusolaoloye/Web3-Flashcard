import { supabase } from './supabase';

export type Row = Record<string, unknown>;

/** Supabase surfaces a dropped connection as a bare "Failed to fetch", which tells
 * an admin nothing. Everything else is a real database message worth showing. */
function humanize(message: string): string {
  if (/failed to fetch|networkerror|load failed/i.test(message)) {
    return 'Could not reach the database. Check your connection and try again.';
  }
  return message;
}

/** Reads are plain SELECTs — anon has RLS-granted read access to content tables. */
export async function listRows(table: string, orderBy: string): Promise<Row[]> {
  try {
    const { data, error } = await supabase.from(table).select('*').order(orderBy);
    if (error) throw new Error(humanize(error.message));
    return (data ?? []) as Row[];
  } catch (e) {
    throw new Error(humanize(e instanceof Error ? e.message : String(e)));
  }
}

type Operation = 'insert' | 'update' | 'delete';

/**
 * All writes funnel through the `admin_write` SECURITY DEFINER function, which
 * verifies the password against the bcrypt hash in `admin_settings` before touching
 * anything. A wrong password raises, so the thrown message is what the user sees.
 */
async function adminWrite(
  password: string,
  operation: Operation,
  table: string,
  id: string | null,
  payload: Row | null
): Promise<void> {
  let error;
  try {
    ({ error } = await supabase.rpc('admin_write', {
      p_password: password,
      p_operation: operation,
      p_table: table,
      p_id: id,
      p_payload: payload,
    }));
  } catch (e) {
    throw new Error(humanize(e instanceof Error ? e.message : String(e)));
  }
  if (error) throw new Error(humanize(error.message));
}

export function insertRow(password: string, table: string, payload: Row) {
  return adminWrite(password, 'insert', table, null, payload);
}

export function updateRow(password: string, table: string, id: string, payload: Row) {
  return adminWrite(password, 'update', table, id, payload);
}

export function deleteRow(password: string, table: string, id: string) {
  return adminWrite(password, 'delete', table, id, null);
}

/** Cheapest possible password check: a no-op delete of an id that cannot exist.
 * A bad password raises before the delete runs; a good one deletes nothing. */
export async function verifyPassword(password: string): Promise<boolean> {
  try {
    await adminWrite(password, 'delete', 'modules', '__admin_login_probe__', null);
    return true;
  } catch (e) {
    const message = e instanceof Error ? e.message : '';
    if (/password/i.test(message)) return false;
    throw e;
  }
}
