import {
  ArrowLeft,
  BarChart3,
  Download,
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { clusters, scoreHistory } from '../data/mockData';

interface Props {
  onBack: () => void;
}

const TOP_OPPORTUNITIES = clusters
  .filter((c) => c.runtimePriority === 'High' || c.runtimePriority === 'Medium')
  .slice(0, 6);

const AUDIT_METADATA = [
  { label: 'Org ID', value: '00D5g00000NrSTAR' },
  { label: 'Environment', value: 'Production' },
  { label: 'Scan Date', value: 'March 26, 2026' },
  { label: 'Report Version', value: 'v2.4.1' },
  { label: 'Runtime Enrichment', value: 'Enabled' },
  { label: 'Requested By', value: 'Priya Raman' },
  { label: 'Surfaces Scanned', value: 'ApexClass, ApexTrigger, LWC, Aura' },
  { label: 'Total Clusters', value: '33' },
  { label: 'Scan Duration', value: '47 minutes' },
];

export default function PdfPreview({ onBack }: Props) {
  const { showToast } = useAppContext();

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="sf-breadcrumb">
        <a href="#" onClick={(e) => { e.preventDefault(); onBack(); }}>SETUP</a>
        <span className="sep">›</span>
        <a href="#" onClick={(e) => { e.preventDefault(); onBack(); }}>Code Intelligence</a>
        <span className="sep">›</span>
        <a href="#" onClick={(e) => { e.preventDefault(); onBack(); }}>Code Reusability</a>
        <span className="sep">›</span>
        <a href="#" onClick={(e) => { e.preventDefault(); onBack(); }}>Report</a>
        <span className="sep">›</span>
        <span>PDF Preview</span>
      </nav>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button className="sf-btn sf-btn-icon" onClick={onBack} title="Back">
            <ArrowLeft size={16} />
          </button>
          <h1 className="sf-page-title" style={{ marginBottom: 0 }}>PDF Preview</h1>
        </div>
        <button className="sf-btn sf-btn-primary" onClick={() => showToast('PDF download started', 'info')}>
          <Download size={14} /> Download PDF
        </button>
      </div>

      {/* PDF Container */}
      <div
        style={{
          maxWidth: 720,
          margin: '0 auto',
          background: '#fff',
          boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        {/* Cover Page */}
        <div
          style={{
            background: 'linear-gradient(135deg, #032d60 0%, #0176d3 60%, #1b96ff 100%)',
            padding: '80px 48px',
            textAlign: 'center',
            color: '#fff',
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
            }}
          >
            <BarChart3 size={32} color="#fff" />
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, letterSpacing: '-0.5px' }}>
            Code Reuse Report
          </h1>
          <p style={{ fontSize: 18, opacity: 0.85, marginBottom: 32, fontWeight: 500 }}>
            Northstar Retail Group
          </p>
          <div style={{ fontSize: 14, opacity: 0.65 }}>March 2026</div>
        </div>

        {/* Content Sections */}
        <div style={{ padding: '48px 48px 56px' }}>

          {/* Executive Summary */}
          <section style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--sf-text)', marginBottom: 12, paddingBottom: 8, borderBottom: '2px solid var(--sf-blue)' }}>
              Executive Summary
            </h2>
            <p style={{ fontSize: 13, color: 'var(--sf-text-secondary)', lineHeight: 1.8 }}>
              This report summarizes the code reuse analysis for the Northstar Retail Group production org,
              covering 147 Apex classes, 12 triggers, and 23 LWC bundles. The analysis identified 33 clusters
              of similar or duplicate code representing approximately 2,800 lines of reducible logic. The overall
              Code Reuse Health Score improved to <strong style={{ color: 'var(--sf-text)' }}>78 out of 100</strong>,
              a <strong style={{ color: 'var(--sf-success)' }}>+9 point increase</strong> from the previous scan on March 12.
              Key improvements include the resolution of two duplicate clusters (Lead Scoring, Forecast Rollup)
              and a significant similarity improvement in the Pricing Rules Calculator cluster. Three clusters remain
              at high priority: Pricing Rules Calculator Variants, Quote Sync REST Wrapper Patterns, and
              Discount Approval Threshold Evaluators. Immediate standardization of the Pricing Rules cluster
              is recommended, with an estimated 75% line reduction (~340 → ~85 lines).
            </p>
          </section>

          {/* Score & Trend */}
          <section style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--sf-text)', marginBottom: 12, paddingBottom: 8, borderBottom: '2px solid var(--sf-blue)' }}>
              Score &amp; Trend
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 32, marginBottom: 20 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 56, fontWeight: 800, color: 'var(--sf-blue)', lineHeight: 1 }}>78</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--sf-text-muted)', textTransform: 'uppercase', marginTop: 4 }}>
                  Current Score
                </div>
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--sf-success)' }}>+9</div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 36, fontWeight: 700, color: 'var(--sf-text-muted)', lineHeight: 1 }}>69</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--sf-text-muted)', textTransform: 'uppercase', marginTop: 4 }}>
                  Previous Score
                </div>
              </div>
            </div>
            <div style={{ background: '#fafbfc', border: '1px solid var(--sf-border)', borderRadius: 6, padding: '16px 20px' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--sf-text-muted)', textTransform: 'uppercase', marginBottom: 12 }}>
                Score History
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 80 }}>
                {scoreHistory.map((point) => (
                  <div key={point.month} style={{ flex: 1, textAlign: 'center' }}>
                    <div
                      style={{
                        width: '60%',
                        height: `${(point.score - 50) * 1.6}px`,
                        background: point.month === 'Mar 26' ? 'var(--sf-blue)' : '#b0d4f1',
                        borderRadius: '3px 3px 0 0',
                        margin: '0 auto 4px',
                        minHeight: 8,
                      }}
                    />
                    <div style={{ fontSize: 10, color: 'var(--sf-text-muted)' }}>{point.month}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--sf-text)' }}>{point.score}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Top Reuse Opportunities */}
          <section style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--sf-text)', marginBottom: 12, paddingBottom: 8, borderBottom: '2px solid var(--sf-blue)' }}>
              Top Reuse Opportunities
            </h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--sf-border)', textAlign: 'left' }}>
                  <th style={{ padding: '8px 12px', fontWeight: 700, color: 'var(--sf-text-muted)', textTransform: 'uppercase', fontSize: 10 }}>Cluster</th>
                  <th style={{ padding: '8px 12px', fontWeight: 700, color: 'var(--sf-text-muted)', textTransform: 'uppercase', fontSize: 10 }}>Surface</th>
                  <th style={{ padding: '8px 12px', fontWeight: 700, color: 'var(--sf-text-muted)', textTransform: 'uppercase', fontSize: 10 }}>Type</th>
                  <th style={{ padding: '8px 12px', fontWeight: 700, color: 'var(--sf-text-muted)', textTransform: 'uppercase', fontSize: 10 }}>Similarity</th>
                  <th style={{ padding: '8px 12px', fontWeight: 700, color: 'var(--sf-text-muted)', textTransform: 'uppercase', fontSize: 10 }}>Members</th>
                  <th style={{ padding: '8px 12px', fontWeight: 700, color: 'var(--sf-text-muted)', textTransform: 'uppercase', fontSize: 10 }}>Priority</th>
                  <th style={{ padding: '8px 12px', fontWeight: 700, color: 'var(--sf-text-muted)', textTransform: 'uppercase', fontSize: 10 }}>Recommendation</th>
                </tr>
              </thead>
              <tbody>
                {TOP_OPPORTUNITIES.map((c) => (
                  <tr key={c.id} style={{ borderBottom: '1px solid var(--sf-border)' }}>
                    <td style={{ padding: '8px 12px', fontWeight: 600 }}>{c.name}</td>
                    <td style={{ padding: '8px 12px' }}>{c.surface}</td>
                    <td style={{ padding: '8px 12px' }}>{c.type}</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>{c.similarityRange}</td>
                    <td style={{ padding: '8px 12px', textAlign: 'center' }}>{c.memberCount}</td>
                    <td style={{ padding: '8px 12px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <span
                          style={{
                            width: 7,
                            height: 7,
                            borderRadius: '50%',
                            background: c.runtimePriority === 'High' ? 'var(--sf-error)' : c.runtimePriority === 'Medium' ? 'var(--sf-warning)' : 'var(--sf-success)',
                            display: 'inline-block',
                          }}
                        />
                        {c.runtimePriority}
                      </span>
                    </td>
                    <td style={{ padding: '8px 12px', fontWeight: 600, fontSize: 11 }}>{c.recommendation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Audit Metadata */}
          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--sf-text)', marginBottom: 12, paddingBottom: 8, borderBottom: '2px solid var(--sf-blue)' }}>
              Audit Metadata
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {AUDIT_METADATA.map((f) => (
                <div key={f.label}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--sf-text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>
                    {f.label}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{f.value}</div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
