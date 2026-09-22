import { useCallback, useState } from 'react';
import { LoginGate } from './components/LoginGate';
import { TableEditor } from './components/TableEditor';
import { TABLES } from './tables';

export default function App() {
  const [password, setPassword] = useState<string | null>(null);
  const [activeTable, setActiveTable] = useState(TABLES[0].name);
  const [counts, setCounts] = useState<Record<string, number>>({});

  const onCountChange = useCallback((table: string, count: number) => {
    setCounts((prev) => (prev[table] === count ? prev : { ...prev, [table]: count }));
  }, []);

  if (!password) {
    return <LoginGate onUnlock={setPassword} />;
  }

  const spec = TABLES.find((t) => t.name === activeTable) ?? TABLES[0];

  return (
    <div className="shell">
      <nav className="sidebar">
        <div className="brand">
          <div className="brand-mark">W3</div>
          <div>
            <div className="brand-name">Web3 Academy</div>
            <div className="brand-sub">Admin</div>
          </div>
        </div>

        {TABLES.map((table) => (
          <button
            key={table.name}
            className={`nav-item${table.name === activeTable ? ' active' : ''}`}
            onClick={() => setActiveTable(table.name)}
          >
            <span>{table.icon}</span>
            <span>{table.label}</span>
            {counts[table.name] !== undefined ? <span className="nav-count">{counts[table.name]}</span> : null}
          </button>
        ))}

        <button className="nav-item" style={{ marginTop: 'auto' }} onClick={() => setPassword(null)}>
          <span>🔒</span>
          <span>Lock</span>
        </button>
      </nav>

      <main className="main">
        <TableEditor key={spec.name} spec={spec} password={password} onCountChange={onCountChange} />
      </main>
    </div>
  );
}
