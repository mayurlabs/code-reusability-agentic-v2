import { useState } from 'react';
import {
  ArrowLeft,
  BarChart3,
  Download,
  Share2,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  MessageSquare,
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar,
} from 'recharts';
import { useAppContext } from '../context/AppContext';
import {
  scanReports, clusters, scoreHistory,
  surfaceDistribution, clusterTypeDistribution,
} from '../data/mockData';

interface Props {
  reportId: string;
  onBack: () => void;
  onClusterClick: (clusterId: string) => void;
  onCompare: () => void;
  onPdfPreview: () => void;
}

const BUCKET_CARDS = [
  { label: 'Total Clusters', value: '33', border: '#0176d3' },
  { label: 'Standardize', value: '7', border: '#2e844a' },
  { label: 'Consolidate', value: '8', border: '#e65100' },
  { label: 'Review', value: '9', border: '#0176d3' },
  { label: 'Retire / Monitor', value: '9', border: '#c23934' },
];

const SCORE_DELTAS = [
  { label: 'Duplicates Resolved', value: '+2 clusters', bg: '#e6f9ed', color: '#2e844a', positive: true },
  { label: 'Similarity Improvement', value: '+3% avg', bg: '#e6f9ed', color: '#2e844a', positive: true },
  { label: 'New Near-Duplicates', value: '+1 cluster', bg: '#fff3e0', color: '#e65100', positive: false },
  { label: 'Test Coverage Gain', value: '+23% avg', bg: '#e6f9ed', color: '#2e844a', positive: true },
];

const AGENT_PROMPTS = [
  'Which clusters should I prioritize this sprint?',
  'Show me the riskiest code patterns',
  'What changed since my last scan?',
  'Draft a migration plan for pricing logic',
];

const PIE_COLORS = clusterTypeDistribution.map((d) => d.color);

function recBadgeClass(rec: string): string {
  const key = rec.toLowerCase().replace(/\s+/g, '-');
  if (key.includes('standardize')) return 'recommendation-badge standardize';
  if (key.includes('consolidate')) return 'recommendation-badge consolidate';
  if (key.includes('review')) return 'recommendation-badge review';
  if (key.includes('retire')) return 'recommendation-badge retire';
  if (key.includes('monitor')) return 'recommendation-badge monitor';
  return 'recommendation-badge';
}

function priorityDotClass(p: string): string {
  switch (p) {
    case 'High': return 'priority-dot high';
    case 'Medium': return 'priority-dot medium';
    case 'Low': return 'priority-dot low';
    default: return 'priority-dot na';
  }
}

export default function ReportDashboard({ reportId, onBack, onClusterClick, onCompare, onPdfPreview }: Props) {
  const { showToast } = useAppContext();
  const [surfaceFilter, setSurfaceFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const report = scanReports.find((r) => r.id === reportId) ?? scanReports[0];

  const filteredClusters = clusters.filter((c) => {
    if (surfaceFilter !== 'All' && !c.surface.includes(surfaceFilter)) return false;
    if (typeFilter !== 'All' && c.type !== typeFilter) return false;
    if (priorityFilter !== 'All' && c.runtimePriority !== priorityFilter) return false;
    if (searchTerm && !c.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

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
        <span>Report</span>
      </nav>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button className="sf-btn sf-btn-icon" onClick={onBack} title="Back">
            <ArrowLeft size={16} />
          </button>
          <h1 className="sf-page-title" style={{ marginBottom: 0 }}>
            <BarChart3 size={22} color="var(--sf-blue)" />
            Code Reuse Report
          </h1>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="sf-btn" onClick={onPdfPreview}>
            <Download size={14} /> Download PDF
          </button>
          <button className="sf-btn" onClick={onCompare}>
            <BarChart3 size={14} /> Compare to Previous
          </button>
          <button className="sf-btn" onClick={() => showToast('Share link copied to clipboard', 'success')}>
            <Share2 size={14} /> Share Summary
          </button>
        </div>
      </div>

      {/* Report Header Band */}
      <div className="sf-card" style={{ display: 'flex', alignItems: 'center', gap: 32, marginBottom: 20, padding: '24px 28px' }}>
        <div style={{ textAlign: 'center', minWidth: 80 }}>
          <div style={{ fontSize: 48, fontWeight: 800, color: 'var(--sf-blue)', lineHeight: 1 }}>
            {report.score ?? '—'}
          </div>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--sf-text-muted)', marginTop: 4, textTransform: 'uppercase' }}>
            Reuse Score
          </div>
        </div>
        {report.scoreDelta !== null && (
          <span
            className="sf-badge"
            style={{
              background: report.scoreDelta >= 0 ? '#e6f9ed' : '#fde8e8',
              color: report.scoreDelta >= 0 ? 'var(--sf-success)' : 'var(--sf-error)',
              fontSize: 13,
              fontWeight: 700,
              padding: '4px 14px',
            }}
          >
            {report.scoreDelta >= 0 ? '+' : ''}{report.scoreDelta} pts
          </span>
        )}
        <div style={{ borderLeft: '1px solid var(--sf-border)', paddingLeft: 28, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 32px', fontSize: 13 }}>
          <div><span style={{ color: 'var(--sf-text-muted)', fontWeight: 600 }}>Requested by: </span>{report.requestedBy}</div>
          <div><span style={{ color: 'var(--sf-text-muted)', fontWeight: 600 }}>Generated: </span>{new Date(report.endTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
          <div><span style={{ color: 'var(--sf-text-muted)', fontWeight: 600 }}>Compared to: </span>Mar 12, 2026 Report (score 69)</div>
          <div><span style={{ color: 'var(--sf-text-muted)', fontWeight: 600 }}>Runtime: </span>47 min</div>
        </div>
      </div>

      {/* Score Explanation */}
      <div className="sf-card" style={{ marginBottom: 20 }}>
        <h3 className="sf-section-title">Why the score improved</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {SCORE_DELTAS.map((d) => (
            <div
              key={d.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                background: d.bg,
                borderRadius: 6,
                padding: '12px 16px',
              }}
            >
              {d.positive
                ? <ArrowUpRight size={18} color={d.color} />
                : <ArrowDownRight size={18} color={d.color} />
              }
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: d.color }}>{d.value}</div>
                <div style={{ fontSize: 12, color: 'var(--sf-text-secondary)' }}>{d.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Opportunity Bucket Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14, marginBottom: 20 }}>
        {BUCKET_CARDS.map((b) => (
          <div key={b.label} className="sf-stat-card" style={{ borderTop: `3px solid ${b.border}` }}>
            <div className="stat-label">{b.label}</div>
            <div className="stat-value">{b.value}</div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="sf-filter-bar">
        <select className="sf-select" value={surfaceFilter} onChange={(e) => setSurfaceFilter(e.target.value)}>
          <option value="All">All Surfaces</option>
          <option value="Apex">Apex</option>
          <option value="Trigger">Trigger</option>
          <option value="LWC">LWC</option>
        </select>
        <select className="sf-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="All">All Types</option>
          <option value="Exact Duplicate">Exact Duplicate</option>
          <option value="Near Duplicate">Near Duplicate</option>
          <option value="Pattern Family">Pattern Family</option>
        </select>
        <select className="sf-select" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <div style={{ position: 'relative', marginLeft: 'auto' }}>
          <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--sf-text-muted)' }} />
          <input
            className="sf-input"
            placeholder="Search clusters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: 30, width: 240 }}
          />
        </div>
      </div>

      {/* Cluster Table */}
      <div className="sf-card" style={{ padding: 0, marginBottom: 20 }}>
        <table className="sf-table">
          <thead>
            <tr>
              <th>Cluster Name</th>
              <th>Surface</th>
              <th>Type</th>
              <th>Similarity</th>
              <th>Members</th>
              <th>Runtime Priority</th>
              <th>Recommendation</th>
              <th>Owner</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {filteredClusters.map((c) => (
              <tr key={c.id} style={{ cursor: 'pointer' }} onClick={() => onClusterClick(c.id)}>
                <td>
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); onClusterClick(c.id); }}
                    style={{ color: 'var(--sf-blue)', fontWeight: 600, textDecoration: 'none' }}
                  >
                    {c.name}
                  </a>
                </td>
                <td>
                  <span className="sf-badge sf-badge-progress">{c.surface}</span>
                </td>
                <td style={{ fontSize: 12 }}>{c.type}</td>
                <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{c.similarityRange}</td>
                <td style={{ textAlign: 'center' }}>{c.memberCount}</td>
                <td>
                  <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <span className={priorityDotClass(c.runtimePriority)} />
                    {c.runtimePriority}
                  </span>
                </td>
                <td>
                  <span className={recBadgeClass(c.recommendation)}>{c.recommendation}</span>
                </td>
                <td style={{ fontSize: 12 }}>{c.owner}</td>
                <td style={{ fontSize: 12, color: 'var(--sf-text-secondary)' }}>{c.lastUpdated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 20 }}>
        {/* Score Trend */}
        <div className="sf-card">
          <h3 className="sf-section-title">Score Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={scoreHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
              <XAxis dataKey="month" fontSize={11} tick={{ fill: '#706e6b' }} />
              <YAxis domain={[50, 100]} fontSize={11} tick={{ fill: '#706e6b' }} />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#0176d3" strokeWidth={2} dot={{ r: 4, fill: '#0176d3' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Cluster Type Distribution */}
        <div className="sf-card">
          <h3 className="sf-section-title">Cluster Type Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={clusterTypeDistribution}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={75}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
                fontSize={10}
              >
                {clusterTypeDistribution.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Duplication by Surface */}
        <div className="sf-card">
          <h3 className="sf-section-title">Duplication by Surface</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={surfaceDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
              <XAxis dataKey="name" fontSize={11} tick={{ fill: '#706e6b' }} />
              <YAxis fontSize={11} tick={{ fill: '#706e6b' }} />
              <Tooltip />
              <Bar dataKey="value" fill="#0176d3" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Ask Code Intelligence */}
      <div className="sf-card" style={{ background: '#f8f5ff', border: '1px solid #e0d4f5' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <MessageSquare size={18} color="#7b61ff" />
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#4a148c', margin: 0 }}>Ask Code Intelligence</h3>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {AGENT_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => showToast('Opening Agentforce...', 'info')}
              style={{
                padding: '8px 16px',
                borderRadius: 20,
                background: '#ede7f6',
                border: '1px solid #ce93d8',
                color: '#4a148c',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#d1c4e9'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#ede7f6'; }}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
