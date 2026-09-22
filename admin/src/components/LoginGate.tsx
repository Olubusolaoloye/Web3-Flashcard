import { FormEvent, useState } from 'react';
import { verifyPassword } from '../lib/api';

interface LoginGateProps {
  onUnlock: (password: string) => void;
}

/**
 * The password is never stored anywhere persistent — it lives in React state for
 * the session and is sent with each write so the database can verify it against
 * its bcrypt hash. Closing the tab logs you out.
 */
export function LoginGate({ onUnlock }: LoginGateProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!password || busy) return;
    setBusy(true);
    setError(null);
    try {
      const ok = await verifyPassword(password);
      if (ok) {
        onUnlock(password);
      } else {
        setError('That password is not right.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not reach the database.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="login-wrap">
      <form className="login-card" onSubmit={submit}>
        <div className="login-mark">W3</div>
        <h1 style={{ fontSize: 21 }}>Web3 Academy</h1>
        <p className="sub" style={{ marginBottom: 24 }}>Admin dashboard</p>

        <div className="field" style={{ textAlign: 'left' }}>
          <label htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            autoComplete="current-password"
            disabled={busy}
          />
        </div>

        {error ? (
          <div className="banner error" style={{ marginTop: 14, textAlign: 'left' }}>
            {error}
          </div>
        ) : null}

        <button className="btn" type="submit" disabled={busy || !password} style={{ width: '100%', marginTop: 18 }}>
          {busy ? 'Checking…' : 'Unlock'}
        </button>
      </form>
    </div>
  );
}
