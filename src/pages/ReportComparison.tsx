import {
  ArrowLeft,
  BarChart3,
  ArrowRight,
  Plus,
  Minus,
  CheckCircle2,
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { useAppContext } from '../context/AppContext';
import { scoreHistory } from '../data/mockData';

interface Props {
  onBack: () => void;
}

const IMPROVED_ITEMS = [
  'Lead Scoring duplicate classes deleted — 2 classes removed, ~120 lines saved',
  'ForecastUtils consolidated into ForecastRollupService',
  'PartnerPricingService refactored to share PricebookEntrySelector (+3% similarity)',
  'Address Validation test coverage increased from 68% → 91%',
  'One hardcoded approval threshold migrated to Custom Metadata',
];

const NEW_ISSUES = [
  'New near-duplicate detected in Renewal Date helpers (Q2 contract automation sprint)',
  'Quote Sync REST wrappers — new variant added by Integration Services team',
  'Case Escalation trigger branch count increased from 4 to 5',
];

const RESOLVED_CLUSTERS = [
  { name: 'Lead Scoring Exact Duplicates', prevMembers: 3, currMembers: 1, change: 'Resolved', surface: 'Apex' },
  { name: 'ForecastRollupHelper + ForecastUtils', prevMembers: 3, currMembers: 1, change: 'Consolidated', surface: 'Apex' },
  { name: 'Pricing Rules Calculator Variants', prevMembers: 5, currMembers: 5, change: 'Improved (+3%)', surface: 'Apex' },
  { name: 'Address Validation Service Family', prevMembers: 4, currMembers: 4, change: 'Test Coverage ↑', surface: 'Apex + LWC' },
  { name: 'Discount Approval Threshold Evaluators', prevMembers: 4, currMembers: 3, change: 'Reduced', surface: 'Apex' },
];

export default function ReportComparison({ onBack }: Props) {
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
        <span>Comparison</span>
      </nav>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <button className="sf-btn sf-btn-icon" onClick={onBack} title="Back">
          <ArrowLeft size={16} />
        </button>
        <h1 className="sf-page-title" style={{ marginBottom: 0 }}>
          <BarChart3 size={22} color="var(--sf-blue)" />
          Report Comparison
        </h1>
      </div>

      {/* Side-by-Side Score Comparison */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24, justifyContent: 'center' }}>
        {/* Previous Report */}
        <div className="sf-card" style={{ flex: 1, maxWidth: 340, textAlign: 'center', padding: '28px 24px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--sf-text-muted)', textTransform: 'uppercase', marginBottom: 12 }}>
            Previous Report
          </div>
          <div style={{ fontSize: 12, color: 'var(--sf-text-secondary)', marginBottom: 8 }}>Mar 12, 2026</div>
          <div style={{ fontSize: 56, fontWeight: 800, color: 'var(--sf-text-secondary)', lineHeight: 1 }}>69</div>
          <div style={{ fontSize: 12, color: 'var(--sf-text-muted)', marginTop: 6 }}>Reuse Score</div>
        </div>

        {/* Delta Arrow */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <ArrowRight size={28} color="var(--sf-success)" />
          <span
            className="sf-badge"
            style={{ background: '#e6f9ed', color: 'var(--sf-success)', fontSize: 14, fontWeight: 700, padding: '4px 16px' }}
          >
            +9
          </span>
        </div>

        {/* Current Report */}
        <div className="sf-card" style={{ flex: 1, maxWidth: 340, textAlign: 'center', padding: '28px 24px', border: '2px solid var(--sf-blue)' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--sf-blue)', textTransform: 'uppercase', marginBottom: 12 }}>
            Current Report
          </div>
          <div style={{ fontSize: 12, color: 'var(--sf-text-secondary)', marginBottom: 8 }}>Mar 26, 2026</div>
          <div style={{ fontSize: 56, fontWeight: 800, color: 'var(--sf-blue)', lineHeight: 1 }}>78</div>
          <div style={{ fontSize: 12, color: 'var(--sf-text-muted)', marginTop: 6 }}>Reuse Score</div>
        </div>
      </div>

      {/* Score Trend Chart */}
      <div className="sf-card" style={{ marginBottom: 24 }}>
        <h3 className="sf-section-title">Score Trend</h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={scoreHistory}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
            <XAxis dataKey="month" fontSize={11} tick={{ fill: '#706e6b' }} />
            <YAxis domain={[50, 100]} fontSize={11} tick={{ fill: '#706e6b' }} />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="#0176d3" strokeWidth={2.5} dot={{ r: 5, fill: '#0176d3', stroke: '#fff', strokeWidth: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Two-Column: Improved vs New Issues */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        {/* What Improved */}
        <div className="sf-insight-col">
          <div className="col-header" style={{ background: '#f0faf3' }}>
            <CheckCircle2 size={16} color="var(--sf-success)" />
            <span style={{ color: 'var(--sf-success)' }}>What Improved</span>
          </div>
          {IMPROVED_ITEMS.map((item, i) => (
            <div key={i} className="col-item">
              <Plus size={14} color="var(--sf-success)" style={{ flexShrink: 0 }} />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* New Issues Detected */}
        <div className="sf-insight-col">
          <div className="col-header" style={{ background: '#fff8f0' }}>
            <Minus size={16} color="var(--sf-warning)" />
            <span style={{ color: '#e65100' }}>New Issues Detected</span>
          </div>
          {NEW_ISSUES.map((item, i) => (
            <div key={i} className="col-item">
              <Minus size={14} color="var(--sf-warning)" style={{ flexShrink: 0 }} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Resolved / Reduced Clusters Table */}
      <div className="sf-card" style={{ padding: 0, marginBottom: 24 }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--sf-border)' }}>
          <h3 className="sf-section-title" style={{ marginBottom: 0 }}>Resolved & Reduced Clusters</h3>
        </div>
        <table className="sf-table">
          <thead>
            <tr>
              <th>Cluster Name</th>
              <th>Surface</th>
              <th>Previous Members</th>
              <th>Current Members</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            {RESOLVED_CLUSTERS.map((row, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600, color: 'var(--sf-blue)' }}>{row.name}</td>
                <td><span className="sf-badge sf-badge-progress">{row.surface}</span></td>
                <td style={{ textAlign: 'center' }}>{row.prevMembers}</td>
                <td style={{ textAlign: 'center' }}>{row.currMembers}</td>
                <td>
                  <span
                    style={{
                      color: row.change === 'Resolved' || row.change.startsWith('Consolidated')
                        ? 'var(--sf-success)'
                        : row.change.startsWith('Improved') || row.change.startsWith('Reduced') || row.change.startsWith('Test')
                          ? 'var(--sf-blue)'
                          : 'var(--sf-text)',
                      fontWeight: 600,
                      fontSize: 12,
                    }}
                  >
                    {row.change}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Back Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <button className="sf-btn" onClick={onBack}>
          <ArrowLeft size={14} /> Back to Report
        </button>
      </div>
    </div>
  );
}
