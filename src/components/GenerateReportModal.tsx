import { useState } from 'react';
import { X, Info } from 'lucide-react';
import { useAppContext } from '../context/AppContext.tsx';

const SCOPE_OPTIONS = [
  { id: 'apex', label: 'Apex Classes & Methods', defaultChecked: true },
  { id: 'triggers', label: 'Triggers', defaultChecked: true },
  { id: 'lwc', label: 'LWC JavaScript / TypeScript', defaultChecked: true },
  { id: 'soql', label: 'SOQL / SOSL Queries', defaultChecked: false },
];

export function GenerateReportModal() {
  const { setShowGenerateModal, triggerScan } = useAppContext();

  const [reportName, setReportName] = useState(
    'Mar 2026 Code Reuse Report - Northstar Retail Group',
  );
  const [environment, setEnvironment] = useState('production');
  const [scope, setScope] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const opt of SCOPE_OPTIONS) {
      initial[opt.id] = opt.defaultChecked;
    }
    return initial;
  });
  const [comparePrevious, setComparePrevious] = useState(true);
  const [includeRuntime, setIncludeRuntime] = useState(true);
  const [note, setNote] = useState('');

  const toggleScope = (id: string) => {
    setScope((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 200,
      }}
      onClick={() => setShowGenerateModal(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: 8,
          width: 540,
          maxHeight: '85vh',
          overflow: 'auto',
          boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            borderBottom: '1px solid var(--sf-border)',
          }}
        >
          <h2 style={{ fontSize: 16, fontWeight: 700 }}>
            New Code Reuse Report
          </h2>
          <button
            onClick={() => setShowGenerateModal(false)}
            style={{
              width: 28,
              height: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4,
              color: 'var(--sf-text-secondary)',
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '20px' }}>
          {/* Report Name */}
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: 'block',
                fontSize: 12,
                fontWeight: 600,
                marginBottom: 4,
                color: 'var(--sf-text-secondary)',
              }}
            >
              Report Name
            </label>
            <input
              type="text"
              value={reportName}
              onChange={(e) => setReportName(e.target.value)}
              style={{
                width: '100%',
                height: 34,
                border: '1px solid var(--sf-border)',
                borderRadius: 4,
                padding: '0 10px',
                fontSize: 13,
                outline: 'none',
              }}
            />
          </div>

          {/* Environment */}
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: 'block',
                fontSize: 12,
                fontWeight: 600,
                marginBottom: 4,
                color: 'var(--sf-text-secondary)',
              }}
            >
              Environment
            </label>
            <select
              value={environment}
              onChange={(e) => setEnvironment(e.target.value)}
              style={{
                width: '100%',
                height: 34,
                border: '1px solid var(--sf-border)',
                borderRadius: 4,
                padding: '0 8px',
                fontSize: 13,
                outline: 'none',
                background: '#fff',
              }}
            >
              <option value="production">Production</option>
              <option value="full-copy">Full Copy Sandbox</option>
            </select>
          </div>

          {/* Analysis Scope */}
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: 'block',
                fontSize: 12,
                fontWeight: 600,
                marginBottom: 8,
                color: 'var(--sf-text-secondary)',
              }}
            >
              Analysis Scope
            </label>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              {SCOPE_OPTIONS.map((opt) => (
                <label
                  key={opt.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: 13,
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={scope[opt.id]}
                    onChange={() => toggleScope(opt.id)}
                    style={{ accentColor: 'var(--sf-blue)' }}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>

          {/* Toggle options */}
          <div style={{ marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={comparePrevious}
                onChange={(e) => setComparePrevious(e.target.checked)}
                style={{ accentColor: 'var(--sf-blue)' }}
              />
              Compare against previous scan
            </label>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={includeRuntime}
                onChange={(e) => setIncludeRuntime(e.target.checked)}
                style={{ accentColor: 'var(--sf-blue)' }}
              />
              Include runtime usage data
            </label>
          </div>

          {/* Note */}
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: 'block',
                fontSize: 12,
                fontWeight: 600,
                marginBottom: 4,
                color: 'var(--sf-text-secondary)',
              }}
            >
              Note (optional)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add context about this scan..."
              rows={3}
              style={{
                width: '100%',
                border: '1px solid var(--sf-border)',
                borderRadius: 4,
                padding: 10,
                fontSize: 13,
                outline: 'none',
                resize: 'vertical',
              }}
            />
          </div>

          {/* Info box */}
          <div
            style={{
              background: '#eaf5fe',
              borderRadius: 6,
              padding: '12px 14px',
              display: 'flex',
              gap: 10,
              fontSize: 12,
              color: 'var(--sf-text-secondary)',
              lineHeight: 1.5,
            }}
          >
            <Info
              size={16}
              color="var(--sf-blue)"
              style={{ flexShrink: 0, marginTop: 1 }}
            />
            <span>
              Scans typically complete in 2–5 minutes depending on org size.
              Results include cluster analysis, similarity scores, and
              actionable refactoring recommendations. You'll be notified when
              the report is ready.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 10,
            padding: '14px 20px',
            borderTop: '1px solid var(--sf-border)',
          }}
        >
          <button
            onClick={() => setShowGenerateModal(false)}
            style={{
              height: 34,
              padding: '0 20px',
              borderRadius: 4,
              border: '1px solid var(--sf-border)',
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--sf-text)',
              background: '#fff',
            }}
          >
            Cancel
          </button>
          <button
            onClick={triggerScan}
            style={{
              height: 34,
              padding: '0 20px',
              borderRadius: 4,
              border: 'none',
              fontSize: 13,
              fontWeight: 600,
              color: '#fff',
              background: 'var(--sf-blue)',
            }}
          >
            Generate Reuse Report
          </button>
        </div>
      </div>
    </div>
  );
}
