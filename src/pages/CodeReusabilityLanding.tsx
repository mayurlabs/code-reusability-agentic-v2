import { useState } from 'react';
import {
  BarChart3,
  Download,
  RefreshCw,
  FileText,
  Eye,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowUpRight,
  Search,
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { scanReports } from '../data/mockData';

interface Props {
  onViewReport: (reportId: string) => void;
}

const STAT_CARDS = [
  { label: 'Code Reuse Health Score', value: '78', delta: '+9 vs previous', deltaType: 'positive' as const },
  { label: 'High-Priority Reuse Opportunities', value: '12', delta: null, deltaType: null },
  { label: 'Recommended Reusable Standards', value: '7', delta: null, deltaType: null },
  { label: 'Lower-Value Variants', value: '19', delta: null, deltaType: null },
  { label: 'Surfaces Analyzed', value: '4', delta: 'Apex, Triggers, LWC JS, SOQL', deltaType: null },
];

const IMPROVED_ITEMS = [
  'Pricing cluster similarity improved +3% after PartnerPricingService refactor',
  'Lead Scoring duplicates fully resolved — 2 classes deleted',
  'Address Validation test coverage increased to 91%',
];

const ATTENTION_ITEMS = [
  'Quote Sync REST wrappers — 5 variants still active, high blast radius',
  'New near-duplicate detected in Renewal Date helpers',
  'Case Escalation trigger branches remain untested',
];

const ACTION_ITEMS = [
  'Standardize Pricing Rules on PricingRulesEngineV2 (est. 75% line reduction)',
  'Consolidate Renewal Date helpers — parameterize fiscal start month',
  'Migrate hardcoded approval thresholds to Custom Metadata',
];

const METADATA_FIELDS = [
  { label: 'Environment', value: 'Production' },
  { label: 'Org ID', value: '00D5g00000NrSTAR' },
  { label: 'Scope', value: 'ApexClass, ApexTrigger, LWC, Aura' },
  { label: 'Runtime Enrichment', value: 'Enabled' },
  { label: 'Report Version', value: 'v2.4.1' },
  { label: 'Total Clusters', value: '33' },
];

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function statusBadgeClass(status: string): string {
  switch (status) {
    case 'Complete': return 'sf-badge sf-badge-complete';
    case 'In Progress': return 'sf-badge sf-badge-progress';
    case 'Failed': return 'sf-badge sf-badge-failed';
    default: return 'sf-badge sf-badge-draft';
  }
}

export default function CodeReusabilityLanding({ onViewReport }: Props) {
  const { hasCompletedScan, scanInProgress, setShowGenerateModal, showToast } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReports = scanReports.filter(
    (r) => r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (scanInProgress) {
    return (
      <div>
        <nav className="sf-breadcrumb">
          <a href="#" onClick={(e) => e.preventDefault()}>SETUP</a>
          <span className="sep">›</span>
          <a href="#" onClick={(e) => e.preventDefault()}>Code Intelligence</a>
          <span className="sep">›</span>
          <span>Code Reusability</span>
        </nav>
        <h1 className="sf-page-title">
          <BarChart3 size={22} color="var(--sf-blue)" />
          Code Reusability
        </h1>

        <div className="sf-card" style={{ marginTop: 40, textAlign: 'center', padding: '60px 40px' }}>
          <div
            style={{
              width: 48,
              height: 48,
              border: '3px solid var(--sf-border)',
              borderTopColor: 'var(--sf-blue)',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
              margin: '0 auto 20px',
            }}
          />
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>
            Analyzing code patterns...
          </h3>
          <p style={{ fontSize: 13, color: 'var(--sf-text-secondary)', maxWidth: 360, margin: '0 auto' }}>
            Scanning your org's Apex classes, triggers, and LWC bundles for duplicate and similar code patterns.
          </p>
        </div>
      </div>
    );
  }

  if (!hasCompletedScan) {
    return (
      <div>
        <nav className="sf-breadcrumb">
          <a href="#" onClick={(e) => e.preventDefault()}>SETUP</a>
          <span className="sep">›</span>
          <a href="#" onClick={(e) => e.preventDefault()}>Code Intelligence</a>
          <span className="sep">›</span>
          <span>Code Reusability</span>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <h1 className="sf-page-title">
            <BarChart3 size={22} color="var(--sf-blue)" />
            Code Reusability
          </h1>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="sf-btn" disabled>
              <Download size={14} /> Download PDF
            </button>
            <button className="sf-btn" onClick={() => showToast('Refreshing...', 'info')}>
              <RefreshCw size={14} /> Refresh
            </button>
            <button className="sf-btn sf-btn-primary" onClick={() => setShowGenerateModal(true)}>
              Generate Reuse Report
            </button>
          </div>
        </div>

        <div className="sf-card sf-empty-state" style={{ marginBottom: 24 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: 'var(--sf-blue-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
            }}
          >
            <BarChart3 size={32} color="var(--sf-blue)" />
          </div>
          <h3>Understand which code should be reused, standardized, or retired</h3>
          <p style={{ marginBottom: 24 }}>
            Run a Code Reuse scan to analyze your org's codebase for duplicate logic, near-duplicate patterns,
            and consolidation opportunities across Apex, Triggers, and LWC.
          </p>
          <button className="sf-btn sf-btn-primary" onClick={() => setShowGenerateModal(true)}>
            Generate Your First Report
          </button>
        </div>

        <div className="sf-card" style={{ padding: 0 }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--sf-border)' }}>
            <span className="sf-section-title" style={{ marginBottom: 0 }}>Scan History</span>
          </div>
          <table className="sf-table">
            <thead>
              <tr>
                <th style={{ width: 32 }}></th>
                <th>Report Name</th>
                <th>Requestor</th>
                <th>Requested Date</th>
                <th>Score</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: 32, color: 'var(--sf-text-muted)' }}>
                  No scan reports yet. Generate your first report to get started.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="sf-breadcrumb">
        <a href="#" onClick={(e) => e.preventDefault()}>SETUP</a>
        <span className="sep">›</span>
        <a href="#" onClick={(e) => e.preventDefault()}>Code Intelligence</a>
        <span className="sep">›</span>
        <span>Code Reusability</span>
      </nav>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 className="sf-page-title">
            <BarChart3 size={22} color="var(--sf-blue)" />
            Code Reusability
          </h1>
          <p style={{ fontSize: 13, color: 'var(--sf-text-secondary)', marginTop: 4 }}>
            Identify duplicate logic and consolidation opportunities across your codebase.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="sf-btn" onClick={() => showToast('PDF download started', 'info')}>
            <Download size={14} /> Download PDF
          </button>
          <button className="sf-btn" onClick={() => onViewReport('rpt-001')}>
            <Eye size={14} /> View Full Report
          </button>
          <button className="sf-btn sf-btn-primary" onClick={() => setShowGenerateModal(true)}>
            Generate Reuse Report
          </button>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14, marginBottom: 24 }}>
        {STAT_CARDS.map((card) => (
          <div key={card.label} className="sf-stat-card">
            <div className="stat-label">{card.label}</div>
            <div className="stat-value">{card.value}</div>
            {card.delta && (
              <div className={`stat-delta ${card.deltaType === 'positive' ? 'positive' : ''}`}>
                {card.deltaType === 'positive' && <ArrowUpRight size={12} style={{ display: 'inline', verticalAlign: 'middle' }} />}
                {' '}{card.delta}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Insight Columns */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 24 }}>
        <div className="sf-insight-col">
          <div className="col-header">
            <CheckCircle2 size={16} color="var(--sf-success)" />
            <span>What Improved</span>
          </div>
          {IMPROVED_ITEMS.map((item, i) => (
            <div
              key={i}
              className="col-item"
              onClick={() => onViewReport('rpt-001')}
            >
              <CheckCircle2 size={14} color="var(--sf-success)" style={{ flexShrink: 0 }} />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div className="sf-insight-col">
          <div className="col-header">
            <AlertTriangle size={16} color="var(--sf-warning)" />
            <span>What Needs Attention</span>
          </div>
          {ATTENTION_ITEMS.map((item, i) => (
            <div
              key={i}
              className="col-item"
              onClick={() => onViewReport('rpt-001')}
            >
              <AlertTriangle size={14} color="var(--sf-warning)" style={{ flexShrink: 0 }} />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div className="sf-insight-col">
          <div className="col-header">
            <Lightbulb size={16} color="var(--sf-blue)" />
            <span>Recommended Actions</span>
          </div>
          {ACTION_ITEMS.map((item, i) => (
            <div
              key={i}
              className="col-item"
              onClick={() => onViewReport('rpt-001')}
            >
              <Lightbulb size={14} color="var(--sf-blue)" style={{ flexShrink: 0 }} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Scan Details */}
      <div className="sf-card" style={{ marginBottom: 24 }}>
        <h3 className="sf-section-title">Latest Scan Details</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {METADATA_FIELDS.map((f) => (
            <div key={f.label}>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--sf-text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>
                {f.label}
              </div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{f.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scan History */}
      <div className="sf-card" style={{ padding: 0 }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--sf-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span className="sf-section-title" style={{ marginBottom: 0 }}>Scan History</span>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--sf-text-muted)' }} />
            <input
              className="sf-input"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: 30, width: 220 }}
            />
          </div>
        </div>
        <table className="sf-table">
          <thead>
            <tr>
              <th style={{ width: 36 }}></th>
              <th>Report Name</th>
              <th>Requestor</th>
              <th>Requested Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Score</th>
              <th>Delta</th>
              <th>Status</th>
              <th style={{ width: 100 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((rpt) => (
              <tr
                key={rpt.id}
                style={{ cursor: 'pointer' }}
                onClick={() => rpt.status === 'Complete' && onViewReport(rpt.id)}
              >
                <td>
                  <FileText size={16} color="var(--sf-blue)" />
                </td>
                <td style={{ color: 'var(--sf-blue)', fontWeight: 500 }}>{rpt.name}</td>
                <td>{rpt.requestedBy}</td>
                <td>{formatDate(rpt.requestedDate)}</td>
                <td>{formatTime(rpt.startTime)}</td>
                <td>{formatTime(rpt.endTime)}</td>
                <td style={{ fontWeight: 700, fontFamily: 'monospace' }}>
                  {rpt.score !== null ? rpt.score : '—'}
                </td>
                <td>
                  {rpt.scoreDelta !== null ? (
                    <span style={{ color: rpt.scoreDelta >= 0 ? 'var(--sf-success)' : 'var(--sf-error)', fontWeight: 600 }}>
                      {rpt.scoreDelta >= 0 ? '+' : ''}{rpt.scoreDelta}
                    </span>
                  ) : (
                    <span style={{ color: 'var(--sf-text-muted)' }}>—</span>
                  )}
                </td>
                <td>
                  <span className={statusBadgeClass(rpt.status)}>{rpt.status}</span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button
                      className="sf-btn sf-btn-icon sf-btn-sm"
                      title="Open Report"
                      onClick={(e) => { e.stopPropagation(); if (rpt.status === 'Complete') onViewReport(rpt.id); }}
                    >
                      <Eye size={14} />
                    </button>
                    <button
                      className="sf-btn sf-btn-icon sf-btn-sm"
                      title="Download PDF"
                      onClick={(e) => { e.stopPropagation(); showToast('PDF download started', 'info'); }}
                    >
                      <Download size={14} />
                    </button>
                    <button
                      className="sf-btn sf-btn-icon sf-btn-sm"
                      title="Re-run Scan"
                      onClick={(e) => { e.stopPropagation(); showToast('Re-running scan...', 'info'); }}
                    >
                      <RotateCcw size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
