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

function CompareTab({ cluster }: { cluster: Cluster }) {
  const membersWithCode = cluster.members.filter((m) => m.codeLines && m.codeLines.length > 0);
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(membersWithCode.slice(0, 2).map((m) => m.id)),
  );

  const toggleSelection = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectedMembers = membersWithCode.filter((m) => selected.has(m.id));

  const maxLines = Math.max(0, ...selectedMembers.map((m) => m.codeLines!.length));

  let identicalCount = 0;
  let differentCount = 0;
  let uniqueCount = 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Shared Intent */}
      <Card>
        <SectionTitle icon={<Lightbulb size={18} />}>Shared Intent</SectionTitle>
        <p style={{ fontSize: 13, lineHeight: 1.6 }}>{cluster.sharedIntent}</p>
      </Card>

      {/* Common / Differences */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Card>
          <SectionTitle icon={<CheckCircle2 size={18} />} iconColor="#2e844a">
            Common Logic Blocks
          </SectionTitle>
          <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {cluster.commonBlocks.map((b, i) => (
              <li key={i} style={{ fontSize: 13, lineHeight: 1.5 }}>
                {b}
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <SectionTitle icon={<XCircle size={18} />} iconColor="#c23934">
            Key Differences
          </SectionTitle>
          <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {cluster.differences.map((d, i) => (
              <li key={i} style={{ fontSize: 13, lineHeight: 1.5 }}>
                {d}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Selection table */}
      {membersWithCode.length > 0 && (
        <Card>
          <SectionTitle icon={<GitCompare size={18} />}>
            Select Implementations to Compare
          </SectionTitle>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--sf-border)', textAlign: 'left' }}>
                <th style={{ padding: '8px 12px', width: 40 }} />
                <th style={thStyle}>Method</th>
                <th style={thStyle}>Owner</th>
                <th style={thStyle}>LOC</th>
                <th style={thStyle}>Similarity</th>
                <th style={thStyle}>Badge</th>
              </tr>
            </thead>
            <tbody>
              {membersWithCode.map((m) => {
                const badge = BADGE_COLORS[m.badge] || BADGE_COLORS.Variant;
                return (
                  <tr
                    key={m.id}
                    style={{
                      borderBottom: '1px solid var(--sf-border)',
                      background: selected.has(m.id) ? '#f0f7ff' : undefined,
                    }}
                  >
                    <td style={{ padding: '8px 12px', textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={selected.has(m.id)}
                        onChange={() => toggleSelection(m.id)}
                        style={{ accentColor: 'var(--sf-blue)' }}
                      />
                    </td>
                    <td style={{ padding: '8px 12px' }}>
                      <code style={{ fontSize: 12 }}>{m.name}</code>
                    </td>
                    <td style={{ padding: '8px 12px', color: 'var(--sf-text-secondary)' }}>
                      {m.owner}
                    </td>
                    <td style={{ padding: '8px 12px' }}>{m.loc}</td>
                    <td style={{ padding: '8px 12px', fontWeight: 600, color: 'var(--sf-blue)' }}>
                      {m.similarity}%
                    </td>
                    <td style={{ padding: '8px 12px' }}>
                      <Badge text={m.badge} bg={badge.bg} color={badge.color} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      )}

      {/* Side-by-side comparison */}
      {selectedMembers.length >= 2 && (
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <div
            style={{
              padding: '14px 20px',
              borderBottom: '1px solid var(--sf-border)',
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            Code Comparison
          </div>
          {/* Column Headers */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${selectedMembers.length}, 1fr)`,
              borderBottom: '2px solid var(--sf-border)',
            }}
          >
            {selectedMembers.map((m) => {
              const badge = BADGE_COLORS[m.badge] || BADGE_COLORS.Variant;
              return (
                <div
                  key={m.id}
                  style={{
                    padding: '10px 14px',
                    borderRight: '1px solid var(--sf-border)',
                    background: '#fafafa',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <code style={{ fontSize: 11, fontWeight: 600, color: 'var(--sf-blue)' }}>
                      {m.name.split('.').pop()}
                    </code>
                    <Badge text={m.badge} bg={badge.bg} color={badge.color} />
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: 'var(--sf-text-secondary)',
                      display: 'flex',
                      gap: 12,
                    }}
                  >
                    <span>{m.loc} LOC</span>
                    <span>{m.similarity}% similar</span>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Code Lines */}
          <div style={{ fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace", fontSize: 12 }}>
            {Array.from({ length: maxLines }).map((_, lineIdx) => {
              const cells = selectedMembers.map((m) => {
                const cl = m.codeLines![lineIdx];
                return cl || null;
              });

              const texts = cells.map((c) => (c ? c.text.trim() : null));
              const nonNull = texts.filter((t) => t !== null);

              const lineCategories = cells.map((cell, colIdx) => {
                if (!cell) return 'missing';
                const myText = texts[colIdx]!.trim();
                if (myText === '') return 'identical';
                const otherTexts = texts.filter((_, j) => j !== colIdx && _ !== null);
                if (otherTexts.length > 0 && otherTexts.every((t) => t!.trim() === myText)) {
                  return 'identical';
                }
                if (otherTexts.length > 0 && otherTexts.every((t) => t!.trim() !== myText)) {
                  const allSame = nonNull.every(t => t === nonNull[0]);
                  if (allSame) return 'identical';
                  const appearsElsewhere = otherTexts.some(t => t!.trim() === myText);
                  if (!appearsElsewhere && otherTexts.length > 0) {
                    const allOthersSame = otherTexts.every(t => t === otherTexts[0]);
                    if (allOthersSame && otherTexts[0]!.trim() !== myText) return 'unique';
                    return 'different';
                  }
                  return 'different';
                }
                return 'different';
              });

              lineCategories.forEach((cat) => {
                if (cat === 'identical') identicalCount++;
                else if (cat === 'unique') uniqueCount++;
                else if (cat === 'different') differentCount++;
              });

              const LINE_STYLES: Record<string, { bg: string; border: string; symbol: string }> = {
                identical: { bg: '#f0faf4', border: '#2e844a', symbol: '=' },
                different: { bg: '#fffde7', border: '#fe9339', symbol: '≠' },
                unique: { bg: '#fde8e8', border: '#c23934', symbol: '+' },
                missing: { bg: '#f5f5f5', border: '#e0e0e0', symbol: '' },
              };

              return (
                <div
                  key={lineIdx}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${selectedMembers.length}, 1fr)`,
                    borderBottom: '1px solid #eee',
                  }}
                >
                  {cells.map((cell, colIdx) => {
                    const cat = lineCategories[colIdx];
                    const ls = LINE_STYLES[cat];
                    return (
                      <div
                        key={colIdx}
                        style={{
                          padding: '2px 10px',
                          background: ls.bg,
                          borderLeft: `3px solid ${ls.border}`,
                          borderRight: colIdx < cells.length - 1 ? '1px solid var(--sf-border)' : undefined,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          minHeight: 24,
                        }}
                      >
                        <span
                          style={{
                            color: '#999',
                            width: 22,
                            textAlign: 'right',
                            fontSize: 10,
                            flexShrink: 0,
                            userSelect: 'none',
                          }}
                        >
                          {cell ? cell.lineNum : ''}
                        </span>
                        <span
                          style={{
                            width: 14,
                            textAlign: 'center',
                            fontSize: 10,
                            fontWeight: 700,
                            color: ls.border,
                            flexShrink: 0,
                          }}
                        >
                          {ls.symbol}
                        </span>
                        <span
                          style={{
                            flex: 1,
                            whiteSpace: 'pre',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {cell ? cell.text : ''}
                        </span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
          {/* Legend */}
          <div
            style={{
              padding: '10px 20px',
              borderTop: '1px solid var(--sf-border)',
              display: 'flex',
              gap: 20,
              fontSize: 11,
              color: 'var(--sf-text-secondary)',
              background: '#fafafa',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 12, height: 12, background: '#f0faf4', border: '1px solid #2e844a', borderRadius: 2 }} />
              Identical ({identicalCount})
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 12, height: 12, background: '#fffde7', border: '1px solid #fe9339', borderRadius: 2 }} />
              Different ({differentCount})
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 12, height: 12, background: '#fde8e8', border: '1px solid #c23934', borderRadius: 2 }} />
              Unique ({uniqueCount})
            </span>
          </div>
        </Card>
      )}

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
