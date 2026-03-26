import { useState } from 'react';
import {
  ArrowLeft,
  Layers,
  AlertTriangle,
  Eye,
  CheckCircle2,
  XCircle,
  Activity,
  Lightbulb,
  Link2,
  Star,
  Shield,
  Download,
  GitCompare,
  Radio,
  FileText,
  Zap,
  GitBranch,
  ArrowUpRight,
  ArrowDownLeft,
  Users,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  clusters,
  apexGuruInsights,
  modernisationCandidates,
} from '../data/mockData';
import type { Cluster, ClusterMember, CodeLine } from '../data/mockData';

interface ClusterDetailProps {
  clusterId: string;
  onBack: () => void;
}

const BADGE_COLORS: Record<string, { bg: string; color: string }> = {
  Preferred: { bg: '#e6f9ed', color: '#2e844a' },
  Candidate: { bg: '#e1f5fe', color: '#0176d3' },
  Legacy: { bg: '#fff8e1', color: '#b7741a' },
  Variant: { bg: '#f3e8ff', color: '#9050e9' },
};

const REC_COLORS: Record<string, { bg: string; color: string }> = {
  Standardize: { bg: '#e1f5fe', color: '#0176d3' },
  Review: { bg: '#fff8e1', color: '#b7741a' },
  Consolidate: { bg: '#f3e8ff', color: '#9050e9' },
  'Retire Variant': { bg: '#fde8e8', color: '#c23934' },
  Monitor: { bg: '#f0f0f0', color: '#706e6b' },
};

const PRIORITY_COLORS: Record<string, string> = {
  High: '#c23934',
  Medium: '#fe9339',
  Low: '#2e844a',
  'N/A': '#969492',
};

const RISK_COLORS: Record<string, { bg: string; color: string }> = {
  Low: { bg: '#e6f9ed', color: '#2e844a' },
  Moderate: { bg: '#fff8e1', color: '#b7741a' },
  High: { bg: '#fde8e8', color: '#c23934' },
  Unknown: { bg: '#f0f0f0', color: '#706e6b' },
};

const TABS = [
  'Overview',
  'Members',
  'Compare',
  'Runtime Signals',
  'Recommendation Rationale',
  'Related Insights',
] as const;

type TabName = (typeof TABS)[number];

function formatNumber(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

function Badge({ text, bg, color }: { text: string; bg: string; color: string }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '3px 10px',
        borderRadius: 12,
        background: bg,
        color,
        fontSize: 11,
        fontWeight: 600,
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </span>
  );
}

function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 8,
        border: '1px solid var(--sf-border)',
        padding: 20,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionTitle({
  icon,
  iconColor,
  children,
}: {
  icon: React.ReactNode;
  iconColor?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontSize: 15,
        fontWeight: 700,
        color: 'var(--sf-text)',
        marginBottom: 12,
      }}
    >
      <span style={{ color: iconColor || 'var(--sf-blue)', display: 'flex' }}>
        {icon}
      </span>
      {children}
    </div>
  );
}

/* ───────── OVERVIEW TAB ───────── */

function OverviewTab({
  cluster,
  onTabSwitch,
}: {
  cluster: Cluster;
  onTabSwitch: (t: TabName) => void;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Summary */}
      <Card>
        <SectionTitle icon={<Lightbulb size={18} />}>Shared Intent</SectionTitle>
        <p
          style={{
            fontSize: 14,
            lineHeight: 1.7,
            color: 'var(--sf-text)',
            background: '#f8f9fa',
            padding: 16,
            borderRadius: 6,
            borderLeft: '4px solid var(--sf-blue)',
          }}
        >
          {cluster.sharedIntent}
        </p>
      </Card>

      {/* Why / Where 2-col */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Card>
          <SectionTitle icon={<AlertTriangle size={18} />} iconColor="#fe9339">
            Why This Matters
          </SectionTitle>
          <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {cluster.whyItMatters.map((item, i) => (
              <li
                key={i}
                style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--sf-text)' }}
              >
                {item}
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <SectionTitle icon={<Eye size={18} />} iconColor="var(--sf-blue)">
            Where It Appears
          </SectionTitle>
          <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {cluster.whereItAppears.map((item, i) => (
              <li
                key={i}
                style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--sf-text)' }}
              >
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Estimated Reduction */}
      <Card
        style={{
          background: 'linear-gradient(135deg, #f0faf4, #e6f9ed)',
          borderColor: '#b7ebc9',
        }}
      >
        <SectionTitle icon={<Activity size={18} />} iconColor="#2e844a">
          Estimated Rationalization Opportunity
        </SectionTitle>
        <p
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: '#2e844a',
            marginTop: 4,
          }}
        >
          {cluster.estimatedReduction}
        </p>
      </Card>

      {/* Action row */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button
          onClick={() => onTabSwitch('Compare')}
          style={actionBtnStyle()}
        >
          <GitCompare size={14} /> Compare Members
        </button>
        <button
          onClick={() => onTabSwitch('Runtime Signals')}
          style={actionBtnStyle()}
        >
          <Radio size={14} /> View Runtime Signals
        </button>
        <button
          onClick={() => onTabSwitch('Recommendation Rationale')}
          style={actionBtnStyle()}
        >
          <FileText size={14} /> View Recommendation Rationale
        </button>
        <button style={actionBtnStyle('#f8f9fa', 'var(--sf-text-secondary)')}>
          <Download size={14} /> Export Cluster Summary
        </button>
      </div>
    </div>
  );
}

function actionBtnStyle(bg?: string, color?: string): React.CSSProperties {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    height: 34,
    padding: '0 16px',
    borderRadius: 4,
    background: bg || 'var(--sf-blue)',
    color: color || '#fff',
    fontSize: 13,
    fontWeight: 600,
    border: bg ? '1px solid var(--sf-border)' : 'none',
    cursor: 'pointer',
  };
}

/* ───────── MEMBERS TAB ───────── */

function MembersTab({ cluster }: { cluster: Cluster }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {cluster.members.map((m) => (
        <MemberCard key={m.id} member={m} preferredCandidate={cluster.preferredCandidate} />
      ))}
      {cluster.members.length === 0 && (
        <Card>
          <p style={{ color: 'var(--sf-text-secondary)', textAlign: 'center', padding: 20 }}>
            Member details are not yet available for this cluster.
          </p>
        </Card>
      )}
    </div>
  );
}

function MemberCard({
  member: m,
  preferredCandidate,
}: {
  member: ClusterMember;
  preferredCandidate: string;
}) {
  const badgeStyle = BADGE_COLORS[m.badge] || BADGE_COLORS.Variant;
  const isActive = m.usageState.toLowerCase().includes('active');
  const isPreferred = m.name === preferredCandidate;
  const risk = RISK_COLORS[m.dependencies.riskLevel] || RISK_COLORS.Unknown;

  return (
    <Card>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: 14,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span
            style={{
              fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
              fontSize: 14,
              fontWeight: 600,
              color: 'var(--sf-blue)',
            }}
          >
            {m.name}
          </span>
          <Badge text={m.badge} bg={badgeStyle.bg} color={badgeStyle.color} />
          {isPreferred && (
            <Badge text="★ Preferred" bg="#e6f9ed" color="#2e844a" />
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 12,
              fontWeight: 600,
              color: isActive ? '#2e844a' : '#c23934',
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: isActive ? '#2e844a' : '#c23934',
              }}
            />
            {m.usageState}
          </span>
          <span
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: 'var(--sf-blue)',
            }}
          >
            {m.similarity}%
          </span>
        </div>
      </div>

      {/* Metadata row */}
      <div
        style={{
          display: 'flex',
          gap: 24,
          fontSize: 12,
          color: 'var(--sf-text-secondary)',
          marginBottom: 16,
          flexWrap: 'wrap',
        }}
      >
        <span>
          <strong>Surface:</strong> {m.surface}
        </span>
        <span>
          <strong>Owner:</strong> {m.owner}
        </span>
        <span>
          <strong>Modified:</strong> {m.lastModified}
        </span>
        <span>
          <strong>LOC:</strong> {m.loc}
        </span>
      </div>

      {/* Dependency section */}
      <div
        style={{
          background: '#f8f9fa',
          borderRadius: 6,
          padding: 14,
          border: '1px solid #eee',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 12,
            fontWeight: 700,
            color: 'var(--sf-text)',
            marginBottom: 10,
          }}
        >
          <Link2 size={13} /> Dependencies
        </div>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12 }}>
            <ArrowDownLeft size={13} color="#2e844a" />
            <span style={{ color: 'var(--sf-text-secondary)' }}>Inbound:</span>
            <strong>{m.dependencies.inboundCount}</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12 }}>
            <ArrowUpRight size={13} color="#0176d3" />
            <span style={{ color: 'var(--sf-text-secondary)' }}>Outbound:</span>
            <strong>{m.dependencies.outboundCount}</strong>
          </div>
          <Badge text={`Risk: ${m.dependencies.riskLevel}`} bg={risk.bg} color={risk.color} />
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 11,
              fontWeight: 600,
              color: m.dependencies.migrationReady ? '#2e844a' : '#b7741a',
            }}
          >
            <Shield size={12} />
            {m.dependencies.migrationReady ? 'Migration Ready' : 'Needs Prep'}
          </span>
        </div>
        {m.dependencies.topCallers.length > 0 && (
          <div style={{ fontSize: 12, color: 'var(--sf-text-secondary)' }}>
            <strong>Top callers:</strong>{' '}
            {m.dependencies.topCallers.map((c, i) => (
              <span key={i}>
                <code
                  style={{
                    background: '#eef1f6',
                    padding: '1px 6px',
                    borderRadius: 3,
                    fontSize: 11,
                  }}
                >
                  {c}
                </code>
                {i < m.dependencies.topCallers.length - 1 && ' '}
              </span>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

/* ───────── COMPARE TAB ───────── */

const LOGIC_BLOCKS = [
  {
    name: 'Price Lookup',
    description: 'Retrieve active base price for the product from Pricebook',
    status: 'duplicate' as const,
    lines: { preferred: '2', candidate: '2', legacy: '2–3' },
    recommendation: 'Identical across all — use preferred version',
  },
  {
    name: 'Input Validation',
    description: 'Null-check and boundary validation on price input',
    status: 'variant' as const,
    lines: { preferred: '3–5', candidate: '3–5', legacy: '3–4' },
    recommendation: 'Preferred throws typed exception; Legacy silently returns 0 — standardize on exception pattern',
  },
  {
    name: 'Discount Schedule Lookup',
    description: 'Query discount tiers/schedules based on product and tier level',
    status: 'variant' as const,
    lines: { preferred: '8', candidate: '8', legacy: '7–11' },
    recommendation: 'Preferred uses helper class; Legacy has inline SOQL (governor limit risk) — migrate to helper pattern',
  },
  {
    name: 'Quantity Threshold Matching',
    description: 'Loop through discount tiers to match quantity against min/max bounds',
    status: 'duplicate' as const,
    lines: { preferred: '9–14', candidate: '9–13', legacy: '12–14' },
    recommendation: 'Core matching logic is identical — use preferred version',
  },
  {
    name: 'Final Price Calculation',
    description: 'Apply discount percentage and round to 2 decimal places',
    status: 'duplicate' as const,
    lines: { preferred: '16–17', candidate: '15–16', legacy: '16' },
    recommendation: 'Same formula — preferred has explicit RoundingMode; standardize on that',
  },
  {
    name: 'Audit Logging',
    description: 'Log pricing decision for compliance audit trail',
    status: 'unique-preferred' as const,
    lines: { preferred: '19', candidate: '—', legacy: '—' },
    recommendation: 'Only in preferred — adopt across all implementations for compliance',
  },
  {
    name: 'Discount Ceiling Enforcement',
    description: 'Cap maximum discount at policy-defined ceiling',
    status: 'missing-others' as const,
    lines: { preferred: '—', candidate: '—', legacy: '—' },
    recommendation: 'Missing from all variants — add from DiscountPolicyService to prevent over-discounting',
  },
];

function CompareTab({ cluster }: { cluster: Cluster }) {
  const [expandedBlock, setExpandedBlock] = useState<number | null>(null);

  const duplicateCount = LOGIC_BLOCKS.filter(b => b.status === 'duplicate').length;
  const variantCount = LOGIC_BLOCKS.filter(b => b.status === 'variant').length;
  const uniqueCount = LOGIC_BLOCKS.filter(b => b.status === 'unique-preferred' || b.status === 'missing-others').length;

  const statusConfig: Record<string, { label: string; bg: string; color: string; border: string; icon: string }> = {
    'duplicate': { label: 'Duplicate — Can Reuse', bg: '#f0faf4', color: '#2e844a', border: '#b7ebc9', icon: '✓' },
    'variant': { label: 'Variant — Needs Standardization', bg: '#fffde7', color: '#b7741a', border: '#ffe082', icon: '≠' },
    'unique-preferred': { label: 'Unique to Preferred — Adopt Everywhere', bg: '#e1f0ff', color: '#0176d3', border: '#90caf9', icon: '★' },
    'missing-others': { label: 'Gap — Missing from All', bg: '#fde8e8', color: '#c23934', border: '#ef9a9a', icon: '!' },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Shared Intent */}
      <Card>
        <SectionTitle icon={<Lightbulb size={18} />}>What These Implementations Do</SectionTitle>
        <p style={{ fontSize: 13, lineHeight: 1.6 }}>{cluster.sharedIntent}</p>
      </Card>

      {/* Summary Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {[
          { label: 'Duplicate Logic', value: duplicateCount, sub: 'Safe to reuse from preferred', bg: '#f0faf4', color: '#2e844a' },
          { label: 'Variant Logic', value: variantCount, sub: 'Needs standardization', bg: '#fffde7', color: '#b7741a' },
          { label: 'Unique / Gaps', value: uniqueCount, sub: 'Adopt or add', bg: '#e1f0ff', color: '#0176d3' },
          { label: 'Total Blocks Analyzed', value: LOGIC_BLOCKS.length, sub: 'Across all implementations', bg: '#f5f5f5', color: '#444' },
        ].map((s, i) => (
          <div key={i} style={{ background: s.bg, borderRadius: 8, padding: '14px 16px', border: `1px solid ${s.color}20` }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: s.color, marginBottom: 2 }}>{s.label}</div>
            <div style={{ fontSize: 11, color: 'var(--sf-text-secondary)' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Implementations being compared */}
      <Card>
        <SectionTitle icon={<GitCompare size={18} />}>Implementations Compared</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 8 }}>
          {cluster.members.slice(0, 3).map((m) => {
            const badge = BADGE_COLORS[m.badge] || BADGE_COLORS.Variant;
            return (
              <div key={m.id} style={{
                padding: '12px 14px',
                border: m.badge === 'Preferred' ? '2px solid #2e844a' : '1px solid var(--sf-border)',
                borderRadius: 8,
                background: m.badge === 'Preferred' ? '#f8fdf9' : '#fff',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                  <Badge text={m.badge} bg={badge.bg} color={badge.color} />
                  {m.badge === 'Preferred' && <Star size={12} color="#2e844a" fill="#2e844a" />}
                </div>
                <code style={{ fontSize: 11, fontWeight: 600, color: 'var(--sf-blue)', wordBreak: 'break-all', lineHeight: 1.4, display: 'block' }}>
                  {m.name}
                </code>
                <div style={{ fontSize: 11, color: 'var(--sf-text-secondary)', marginTop: 6, display: 'flex', gap: 10 }}>
                  <span>{m.loc} lines</span>
                  <span>{m.similarity}% similar</span>
                  <span>{m.owner}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Logic Block Comparison — the hero section */}
      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--sf-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Logic Block Comparison</div>
            <div style={{ fontSize: 12, color: 'var(--sf-text-secondary)', marginTop: 2 }}>
              Each row represents a distinct logic block. Click to expand details and see the recommended action.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, fontSize: 11 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: '#2e844a' }} /> Duplicate
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: '#fe9339' }} /> Variant
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: '#0176d3' }} /> Unique
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: '#c23934' }} /> Gap
            </span>
          </div>
        </div>

        {/* Table Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '4px 1fr 200px 100px 100px 100px',
          borderBottom: '2px solid var(--sf-border)',
          background: '#fafafa',
          fontSize: 11,
          fontWeight: 600,
          color: 'var(--sf-text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: '0.03em',
        }}>
          <div />
          <div style={{ padding: '10px 14px' }}>Logic Block</div>
          <div style={{ padding: '10px 14px' }}>Status</div>
          <div style={{ padding: '10px 14px', textAlign: 'center' }}>Preferred</div>
          <div style={{ padding: '10px 14px', textAlign: 'center' }}>Candidate</div>
          <div style={{ padding: '10px 14px', textAlign: 'center' }}>Legacy</div>
        </div>

        {/* Rows */}
        {LOGIC_BLOCKS.map((block, idx) => {
          const sc = statusConfig[block.status];
          const isExpanded = expandedBlock === idx;
          return (
            <div key={idx}>
              <div
                onClick={() => setExpandedBlock(isExpanded ? null : idx)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '4px 1fr 200px 100px 100px 100px',
                  borderBottom: '1px solid var(--sf-border)',
                  cursor: 'pointer',
                  background: isExpanded ? sc.bg : '#fff',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => { if (!isExpanded) e.currentTarget.style.background = '#fafbfc'; }}
                onMouseLeave={(e) => { if (!isExpanded) e.currentTarget.style.background = '#fff'; }}
              >
                <div style={{ background: sc.color }} />
                <div style={{ padding: '12px 14px' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#181818' }}>{block.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--sf-text-secondary)', marginTop: 2 }}>{block.description}</div>
                </div>
                <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center' }}>
                  <span style={{
                    padding: '3px 10px',
                    borderRadius: 4,
                    fontSize: 11,
                    fontWeight: 600,
                    background: sc.bg,
                    color: sc.color,
                    border: `1px solid ${sc.border}`,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                  }}>
                    <span style={{ fontSize: 10 }}>{sc.icon}</span> {sc.label}
                  </span>
                </div>
                <div style={{ padding: '12px 14px', textAlign: 'center', fontSize: 12, fontFamily: 'monospace', color: block.lines.preferred === '—' ? '#ccc' : '#444' }}>
                  {block.lines.preferred === '—' ? '—' : `L${block.lines.preferred}`}
                </div>
                <div style={{ padding: '12px 14px', textAlign: 'center', fontSize: 12, fontFamily: 'monospace', color: block.lines.candidate === '—' ? '#ccc' : '#444' }}>
                  {block.lines.candidate === '—' ? '—' : `L${block.lines.candidate}`}
                </div>
                <div style={{ padding: '12px 14px', textAlign: 'center', fontSize: 12, fontFamily: 'monospace', color: block.lines.legacy === '—' ? '#ccc' : '#444' }}>
                  {block.lines.legacy === '—' ? '—' : `L${block.lines.legacy}`}
                </div>
              </div>
              {isExpanded && (
                <div style={{
                  padding: '14px 20px 14px 18px',
                  background: sc.bg,
                  borderBottom: '1px solid var(--sf-border)',
                  borderLeft: `4px solid ${sc.color}`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <Lightbulb size={14} color={sc.color} style={{ marginTop: 2, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: sc.color, marginBottom: 4 }}>Recommendation</div>
                      <div style={{ fontSize: 13, lineHeight: 1.5, color: '#333' }}>{block.recommendation}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </Card>

      {/* Key Differences Summary */}
      <Card>
        <SectionTitle icon={<XCircle size={18} />} iconColor="#c23934">
          Key Differences That Require Attention
        </SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
          {cluster.differences.map((d, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 10,
              padding: '10px 14px',
              background: '#fef5f5',
              borderRadius: 6,
              borderLeft: '3px solid #c23934',
            }}>
              <XCircle size={14} color="#c23934" style={{ marginTop: 2, flexShrink: 0 }} />
              <span style={{ fontSize: 13, lineHeight: 1.5 }}>{d}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Recommended Standard */}
      <Card
        style={{
          background: 'linear-gradient(135deg, #f0faf4, #e6f9ed)',
          borderColor: '#b7ebc9',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <Star size={16} color="#2e844a" fill="#2e844a" />
          <span style={{ fontSize: 14, fontWeight: 700, color: '#2e844a' }}>
            Recommended Reusable Standard
          </span>
        </div>
        <p style={{ fontSize: 13, lineHeight: 1.6 }}>
          <code
            style={{
              fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
              background: '#d4edda',
              padding: '2px 8px',
              borderRadius: 4,
              fontWeight: 600,
            }}
          >
            {cluster.preferredCandidate}
          </code>{' '}
          is recommended as the standard implementation. It has the highest runtime confidence,
          broadest caller coverage, lowest dependency risk, and includes audit logging.
        </p>
      </Card>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  padding: '8px 12px',
  fontSize: 11,
  fontWeight: 600,
  color: 'var(--sf-text-muted)',
  textTransform: 'uppercase',
};

/* ───────── RUNTIME SIGNALS TAB ───────── */

function RuntimeSignalsTab({ cluster }: { cluster: Cluster }) {
  const chartData = cluster.members
    .filter((m) => m.invocations30d > 0)
    .map((m) => ({
      name: m.name.split('.').pop()?.replace('()', '') || m.name,
      '30d': m.invocations30d,
      '90d': m.invocations90d,
    }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {cluster.members.map((m) => {
        const confColor =
          m.runtimeConfidence === 'High'
            ? '#2e844a'
            : m.runtimeConfidence === 'Medium'
              ? '#fe9339'
              : '#c23934';

        return (
          <Card key={m.id}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 14,
              }}
            >
              <code
                style={{
                  fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--sf-blue)',
                }}
              >
                {m.name}
              </code>
              <Badge
                text={`Confidence: ${m.runtimeConfidence}`}
                bg={confColor === '#2e844a' ? '#e6f9ed' : confColor === '#fe9339' ? '#fff8e1' : '#fde8e8'}
                color={confColor}
              />
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: 12,
              }}
            >
              {[
                { label: 'Invocations 30d', value: formatNumber(m.invocations30d) },
                { label: 'Invocations 90d', value: formatNumber(m.invocations90d) },
                { label: 'Active Paths', value: String(m.activePaths) },
                {
                  label: 'Last Observed',
                  value: new Date(m.lastObserved).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  }),
                },
                { label: 'Runtime State', value: m.usageState.split('–')[0].trim() },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    background: '#f8f9fa',
                    borderRadius: 6,
                    padding: '10px 12px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--sf-text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>
                    {stat.label}
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--sf-text)' }}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        );
      })}

      {/* Usage Comparison Chart */}
      {chartData.length > 0 && (
        <Card>
          <SectionTitle icon={<Activity size={18} />}>Usage Comparison</SectionTitle>
          <div style={{ width: '100%', height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ left: 20, right: 30, top: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={180}
                  tick={{ fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 6,
                    border: '1px solid #e5e5e5',
                    fontSize: 12,
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="30d" fill="#0176d3" radius={[0, 4, 4, 0]} name="30-day Invocations" />
                <Bar dataKey="90d" fill="#b4d6f0" radius={[0, 4, 4, 0]} name="90-day Invocations" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}

      {cluster.members.length === 0 && (
        <Card>
          <p style={{ color: 'var(--sf-text-secondary)', textAlign: 'center', padding: 20 }}>
            Runtime signal data is not yet available for this cluster.
          </p>
        </Card>
      )}
    </div>
  );
}

/* ───────── RECOMMENDATION RATIONALE TAB ───────── */

function RationaleTab({ cluster }: { cluster: Cluster }) {
  const retireCandidates = cluster.members.filter(
    (m) => m.name !== cluster.preferredCandidate && m.dependencies,
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Why recommend */}
      <Card>
        <SectionTitle icon={<CheckCircle2 size={18} />} iconColor="#2e844a">
          Why ApexGuru recommends{' '}
          <code
            style={{
              fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
              background: '#e6f9ed',
              padding: '2px 8px',
              borderRadius: 4,
              fontSize: 13,
            }}
          >
            {cluster.preferredCandidate.split('.').pop()}
          </code>
        </SectionTitle>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {cluster.rationale.map((r, i) => (
            <li
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 8,
                fontSize: 13,
                lineHeight: 1.6,
              }}
            >
              <CheckCircle2
                size={16}
                color="#2e844a"
                style={{ marginTop: 2, flexShrink: 0 }}
              />
              {r}
            </li>
          ))}
        </ul>
      </Card>

      {/* Next Steps */}
      <Card>
        <SectionTitle icon={<FileText size={18} />}>Recommended Next Steps</SectionTitle>
        <ol style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {cluster.nextSteps.map((s, i) => (
            <li key={i} style={{ fontSize: 13, lineHeight: 1.6 }}>
              {s}
            </li>
          ))}
        </ol>
      </Card>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button style={actionBtnStyle()}>
          <Star size={14} /> Mark as Preferred Standard
        </button>
        <button style={actionBtnStyle('#f3e8ff', '#9050e9')}>
          <Layers size={14} /> Consolidate Variants
        </button>
        <button
          style={{
            ...actionBtnStyle('#fff', '#c23934'),
            border: '1px solid #c23934',
          }}
        >
          <XCircle size={14} /> Retire Lower-Value Variants
        </button>
      </div>

      {/* Dependency Safety Assessment */}
      {retireCandidates.length > 0 && (
        <Card>
          <SectionTitle icon={<Shield size={18} />} iconColor="#fe9339">
            Dependency Safety Assessment
          </SectionTitle>
          <p style={{ fontSize: 12, color: 'var(--sf-text-secondary)', marginBottom: 14 }}>
            Analysis of dependency impact for retirement candidates:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {retireCandidates.map((m) => {
              const risk = RISK_COLORS[m.dependencies.riskLevel] || RISK_COLORS.Unknown;
              return (
                <div
                  key={m.id}
                  style={{
                    padding: 14,
                    background: '#f8f9fa',
                    borderRadius: 6,
                    border: '1px solid #eee',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 8,
                    }}
                  >
                    <code style={{ fontSize: 12, fontWeight: 600 }}>{m.name}</code>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <Badge
                        text={`Risk: ${m.dependencies.riskLevel}`}
                        bg={risk.bg}
                        color={risk.color}
                      />
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                          fontSize: 11,
                          fontWeight: 600,
                          color: m.dependencies.migrationReady ? '#2e844a' : '#b7741a',
                        }}
                      >
                        {m.dependencies.migrationReady ? (
                          <CheckCircle2 size={12} />
                        ) : (
                          <AlertTriangle size={12} />
                        )}
                        {m.dependencies.migrationReady ? 'Safe to Retire' : 'Migration Prep Required'}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      gap: 16,
                      fontSize: 12,
                      color: 'var(--sf-text-secondary)',
                    }}
                  >
                    <span>
                      {m.dependencies.inboundCount} inbound / {m.dependencies.outboundCount} outbound
                    </span>
                    <span>
                      Callers: {m.dependencies.topCallers.join(', ')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}

/* ───────── RELATED INSIGHTS TAB ───────── */

function RelatedInsightsTab({ cluster }: { cluster: Cluster }) {
  const relatedInsights = apexGuruInsights.slice(0, 2);
  const relatedMod = modernisationCandidates.slice(0, 2);
  const relatedClusters = clusters
    .filter((c) => c.id !== cluster.id && c.surface === cluster.surface)
    .slice(0, 2);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
      {/* ApexGuru Insights */}
      <Card>
        <SectionTitle icon={<Zap size={18} />} iconColor="#9050e9">
          Related ApexGuru Insights
        </SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {relatedInsights.map((ins) => (
            <div
              key={ins.id}
              style={{
                padding: 12,
                background: '#f8f9fa',
                borderRadius: 6,
                cursor: 'pointer',
                border: '1px solid #eee',
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{ins.title}</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <Badge
                  text={ins.severity}
                  bg={ins.severity === 'Critical' ? '#fde8e8' : '#fff8e1'}
                  color={ins.severity === 'Critical' ? '#c23934' : '#b7741a'}
                />
                <span style={{ fontSize: 11, color: 'var(--sf-text-secondary)' }}>
                  {ins.team}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Modernisation */}
      <Card>
        <SectionTitle icon={<GitBranch size={18} />} iconColor="#2e844a">
          Code Modernisation Candidates
        </SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {relatedMod.map((mod) => (
            <div
              key={mod.id}
              style={{
                padding: 12,
                background: '#f8f9fa',
                borderRadius: 6,
                cursor: 'pointer',
                border: '1px solid #eee',
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{mod.title}</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <Badge
                  text={mod.status}
                  bg={mod.status === 'Recommended' ? '#e6f9ed' : '#e1f5fe'}
                  color={mod.status === 'Recommended' ? '#2e844a' : '#0176d3'}
                />
                <span style={{ fontSize: 11, color: 'var(--sf-text-secondary)' }}>
                  {mod.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Related Clusters */}
      <Card>
        <SectionTitle icon={<Layers size={18} />}>Related Clusters</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {relatedClusters.map((cl) => {
            const rec = REC_COLORS[cl.recommendation] || REC_COLORS.Monitor;
            return (
              <div
                key={cl.id}
                style={{
                  padding: 12,
                  background: '#f8f9fa',
                  borderRadius: 6,
                  cursor: 'pointer',
                  border: '1px solid #eee',
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{cl.name}</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Badge text={cl.recommendation} bg={rec.bg} color={rec.color} />
                  <span style={{ fontSize: 11, color: 'var(--sf-text-secondary)' }}>
                    {cl.memberCount} members
                  </span>
                </div>
              </div>
            );
          })}
          {relatedClusters.length === 0 && (
            <p style={{ fontSize: 12, color: 'var(--sf-text-secondary)' }}>
              No related clusters found.
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════ MAIN COMPONENT ═══════════════════ */

export default function ClusterDetail({ clusterId, onBack }: ClusterDetailProps) {
  const [activeTab, setActiveTab] = useState<TabName>('Overview');

  const cluster = clusters.find((c) => c.id === clusterId);

  if (!cluster) {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: 'var(--sf-text-secondary)' }}>
        <h2 style={{ fontSize: 18, marginBottom: 8, color: 'var(--sf-text)' }}>Cluster Not Found</h2>
        <p>No cluster found with ID "{clusterId}".</p>
        <button onClick={onBack} style={{ ...actionBtnStyle(), marginTop: 16 }}>
          <ArrowLeft size={14} /> Go Back
        </button>
      </div>
    );
  }

  const recStyle = REC_COLORS[cluster.recommendation] || REC_COLORS.Monitor;
  const priorityColor = PRIORITY_COLORS[cluster.runtimePriority] || PRIORITY_COLORS['N/A'];

  return (
    <div>
      {/* Breadcrumb */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 12,
          color: 'var(--sf-text-muted)',
          marginBottom: 12,
        }}
      >
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          style={{ color: 'var(--sf-blue)', textDecoration: 'none' }}
        >
          SETUP
        </a>
        <span>›</span>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          style={{ color: 'var(--sf-blue)', textDecoration: 'none' }}
        >
          Code Intelligence
        </a>
        <span>›</span>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          style={{ color: 'var(--sf-blue)', textDecoration: 'none' }}
        >
          Code Reusability
        </a>
        <span>›</span>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          style={{ color: 'var(--sf-blue)', textDecoration: 'none' }}
        >
          Reuse Report
        </a>
        <span>›</span>
        <span style={{ color: 'var(--sf-text)' }}>{cluster.name}</span>
      </div>

      {/* Page title row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 16,
        }}
      >
        <button
          onClick={onBack}
          style={{
            width: 32,
            height: 32,
            borderRadius: 6,
            background: '#fff',
            border: '1px solid var(--sf-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
          }}
          title="Go back"
        >
          <ArrowLeft size={16} color="var(--sf-text-secondary)" />
        </button>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: 'linear-gradient(135deg, #e1f5fe, #b3e5fc)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Layers size={20} color="var(--sf-blue)" />
        </div>
        <h1 style={{ fontSize: 20, fontWeight: 700 }}>{cluster.name}</h1>
      </div>

      {/* Header badges row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          flexWrap: 'wrap',
          marginBottom: 20,
          padding: '12px 16px',
          background: '#fff',
          borderRadius: 8,
          border: '1px solid var(--sf-border)',
        }}
      >
        <Badge text={cluster.type} bg="#f0f0f0" color="var(--sf-text)" />
        <Badge text={`Similarity: ${cluster.similarityRange}`} bg="#e1f5fe" color="#0176d3" />
        <Badge text={`${cluster.memberCount} Members`} bg="#f0f0f0" color="var(--sf-text)" />
        <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12 }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: priorityColor,
            }}
          />
          <span style={{ fontWeight: 600 }}>Priority: {cluster.runtimePriority}</span>
        </span>
        <Badge text={cluster.recommendation} bg={recStyle.bg} color={recStyle.color} />
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            padding: '3px 10px',
            borderRadius: 12,
            background: '#e6f9ed',
            color: '#2e844a',
            fontSize: 11,
            fontWeight: 600,
          }}
        >
          <Star size={11} fill="#2e844a" />
          <span style={{ fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace" }}>
            {cluster.preferredCandidate}
          </span>
        </span>
      </div>

      {/* Tab bar */}
      <div
        style={{
          display: 'flex',
          borderBottom: '2px solid var(--sf-border)',
          marginBottom: 20,
          gap: 0,
        }}
      >
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '10px 18px',
              fontSize: 13,
              fontWeight: activeTab === tab ? 700 : 500,
              color: activeTab === tab ? 'var(--sf-blue)' : 'var(--sf-text-secondary)',
              borderBottom: activeTab === tab ? '2px solid var(--sf-blue)' : '2px solid transparent',
              marginBottom: -2,
              background: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'color 0.15s',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'Overview' && (
        <OverviewTab cluster={cluster} onTabSwitch={setActiveTab} />
      )}
      {activeTab === 'Members' && <MembersTab cluster={cluster} />}
      {activeTab === 'Compare' && <CompareTab cluster={cluster} />}
      {activeTab === 'Runtime Signals' && <RuntimeSignalsTab cluster={cluster} />}
      {activeTab === 'Recommendation Rationale' && <RationaleTab cluster={cluster} />}
      {activeTab === 'Related Insights' && <RelatedInsightsTab cluster={cluster} />}
    </div>
  );
}
