import { useCallback, useEffect, useMemo, useState } from 'react';
import { deleteRow, insertRow, listRows, Row, updateRow } from '../lib/api';
import { FieldSpec, TableSpec } from '../tables';

interface TableEditorProps {
  spec: TableSpec;
  password: string;
  onCountChange: (table: string, count: number) => void;
}

type Draft = Record<string, string>;

/** Columns the database fills in itself; never sent in a write payload. */
const SERVER_MANAGED = new Set(['created_at', 'updated_at', 'expires_at']);

function toDraftValue(value: unknown): string {
  if (value === null || value === undefined) return '';
  if (typeof value === 'object') return JSON.stringify(value, null, 2);
  return String(value);
}

/** Builds the edit-form field list: declared fields first, then any column found
 * in the live data that the spec doesn't know about, so a schema change added in
 * Supabase still shows up here instead of silently disappearing. */
function resolveFields(spec: TableSpec, rows: Row[]): FieldSpec[] {
  const declared = spec.fields;
  const known = new Set(declared.map((f) => f.column));
  const extras = new Set<string>();
  rows.forEach((row) => {
    Object.keys(row).forEach((column) => {
      if (!known.has(column)) extras.add(column);
    });
  });
  return [
    ...declared,
    ...Array.from(extras)
      .sort()
      .map<FieldSpec>((column) => ({
        column,
        label: column,
        kind: SERVER_MANAGED.has(column) ? 'readonly' : 'json',
        hint: 'Column found in the database but not described in the dashboard — edit as raw JSON.',
      })),
  ];
}

function emptyDraft(fields: FieldSpec[]): Draft {
  const draft: Draft = {};
  fields.forEach((f) => {
    if (f.kind !== 'readonly') draft[f.column] = '';
  });
  return draft;
}

function draftFromRow(fields: FieldSpec[], row: Row): Draft {
  const draft: Draft = {};
  fields.forEach((f) => {
    if (f.kind !== 'readonly') draft[f.column] = toDraftValue(row[f.column]);
  });
  return draft;
}

/** Turns the string-only form state back into typed JSON for the database.
 * Throws with the offending field's label if a JSON field won't parse. */
function payloadFromDraft(fields: FieldSpec[], draft: Draft): Row {
  const payload: Row = {};
  fields.forEach((field) => {
    if (field.kind === 'readonly' || SERVER_MANAGED.has(field.column)) return;
    const raw = (draft[field.column] ?? '').trim();

    if (field.kind === 'number') {
      if (raw === '') return;
      const n = Number(raw);
      if (Number.isNaN(n)) throw new Error(`${field.label} must be a number.`);
      payload[field.column] = n;
      return;
    }

    if (field.kind === 'json') {
      if (raw === '') return;
      try {
        payload[field.column] = JSON.parse(raw);
      } catch {
        throw new Error(`${field.label} is not valid JSON.`);
      }
      return;
    }

    if (raw === '') return;
    payload[field.column] = raw;
  });
  return payload;
}

function expiryPill(row: Row): { label: string; className: string } | null {
  const expiresAt = row.expires_at;
  if (typeof expiresAt !== 'string') return null;
  const ms = new Date(expiresAt).getTime() - Date.now();
  if (ms <= 0) return { label: 'Ended', className: 'pill expired' };
  const hours = Math.floor(ms / 3_600_000);
  const minutes = Math.floor((ms % 3_600_000) / 60_000);
  return { label: hours > 0 ? `${hours}h ${minutes}m left` : `${minutes}m left`, className: 'pill live' };
}

export function TableEditor({ spec, password, onCountChange }: TableEditorProps) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [editing, setEditing] = useState<{ id: string | null; draft: Draft } | null>(null);
  const [saving, setSaving] = useState(false);

  const fields = useMemo(() => resolveFields(spec, rows), [spec, rows]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listRows(spec.name, spec.orderBy);
      setRows(data);
      onCountChange(spec.name, data.length);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load rows.');
    } finally {
      setLoading(false);
    }
  }, [spec.name, spec.orderBy, onCountChange]);

  useEffect(() => {
    setEditing(null);
    setNotice(null);
    load();
  }, [load]);

  const save = async () => {
    if (!editing || saving) return;
    setSaving(true);
    setError(null);
    try {
      const payload = payloadFromDraft(fields, editing.draft);

      if (editing.id === null) {
        // `id` is the primary key everywhere except alpha_spotlights, which
        // generates its own.
        const needsId = fields.some((f) => f.column === 'id' && f.kind !== 'readonly');
        if (needsId && !payload.id) throw new Error('ID is required.');
        await insertRow(password, spec.name, payload);
        setNotice('Created.');
      } else {
        delete payload.id;
        await updateRow(password, spec.name, editing.id, payload);
        setNotice('Saved.');
      }

      setEditing(null);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not save.');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (row: Row) => {
    const id = String(row.id ?? '');
    const label = String(row[spec.titleColumn] ?? id);
    if (!id) return;
    if (!window.confirm(`Delete “${label}”? This cannot be undone.`)) return;
    setError(null);
    try {
      await deleteRow(password, spec.name, id);
      setNotice('Deleted.');
      setEditing(null);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not delete.');
    }
  };

  if (editing) {
    const isNew = editing.id === null;
    return (
      <>
        <div className="page-head">
          <div>
            <h1>
              {isNew ? 'New' : 'Edit'} {spec.label.replace(/e?s$/, '')}
            </h1>
            <p className="sub">{isNew ? `Adds a row to ${spec.name}.` : editing.id}</p>
          </div>
          <button className="btn ghost" onClick={() => setEditing(null)}>
            Cancel
          </button>
        </div>

        {error ? <div className="banner error" style={{ marginBottom: 14 }}>{error}</div> : null}

        <div className="form">
          {fields.map((field) => {
            const readOnly = field.kind === 'readonly';
            const lockedId = field.column === 'id' && !isNew;
            if (readOnly) return null;

            return (
              <div className="field" key={field.column}>
                <label htmlFor={`f-${field.column}`}>{field.label}</label>
                {field.kind === 'longtext' || field.kind === 'json' ? (
                  <textarea
                    id={`f-${field.column}`}
                    className={field.kind === 'json' ? 'code' : undefined}
                    value={editing.draft[field.column] ?? ''}
                    onChange={(e) =>
                      setEditing({ ...editing, draft: { ...editing.draft, [field.column]: e.target.value } })
                    }
                  />
                ) : (
                  <input
                    id={`f-${field.column}`}
                    type={field.kind === 'number' ? 'number' : 'text'}
                    value={editing.draft[field.column] ?? ''}
                    disabled={lockedId}
                    onChange={(e) =>
                      setEditing({ ...editing, draft: { ...editing.draft, [field.column]: e.target.value } })
                    }
                  />
                )}
                {field.hint ? <p className="hint">{field.hint}</p> : null}
              </div>
            );
          })}

          <div className="form-actions">
            {!isNew ? (
              <button
                className="btn danger small spacer"
                onClick={() => {
                  const row = rows.find((r) => String(r.id) === editing.id);
                  if (row) remove(row);
                }}
              >
                Delete
              </button>
            ) : null}
            <button className="btn ghost" onClick={() => setEditing(null)} disabled={saving}>
              Cancel
            </button>
            <button className="btn" onClick={save} disabled={saving}>
              {saving ? 'Saving…' : isNew ? 'Create' : 'Save changes'}
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="page-head">
        <div>
          <h1>
            {spec.icon} {spec.label}
          </h1>
          <p className="sub">
            {loading ? 'Loading…' : `${rows.length} ${rows.length === 1 ? 'entry' : 'entries'} · live in the app`}
          </p>
        </div>
        <button className="btn" onClick={() => setEditing({ id: null, draft: emptyDraft(fields) })}>
          + New
        </button>
      </div>

      {error ? <div className="banner error" style={{ marginBottom: 14 }}>{error}</div> : null}
      {notice ? <div className="banner success" style={{ marginBottom: 14 }}>{notice}</div> : null}

      {!loading && rows.length === 0 ? (
        <div className="empty">Nothing here yet. Use “+ New” to add the first one.</div>
      ) : (
        <div className="rows">
          {rows.map((row) => {
            const pill = expiryPill(row);
            return (
              <div className="row" key={String(row.id)}>
                <div className="row-grow">
                  <div className="row-title">{String(row[spec.titleColumn] ?? row.id)}</div>
                  {spec.subtitleColumn ? (
                    <div className="row-sub">{String(row[spec.subtitleColumn] ?? '')}</div>
                  ) : null}
                </div>
                {pill ? <span className={pill.className}>{pill.label}</span> : null}
                <button
                  className="btn soft small"
                  onClick={() => setEditing({ id: String(row.id), draft: draftFromRow(fields, row) })}
                >
                  Edit
                </button>
                <button className="btn danger small" onClick={() => remove(row)}>
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
