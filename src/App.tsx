import { useState, useEffect, useRef, useCallback } from 'react';
import { useAppContext } from './context/AppContext';
import { GlobalHeader, SetupHeader } from './components/GlobalHeader';
import { LeftNav } from './components/LeftNav';
import { AgentPanel } from './components/AgentPanel';
import { GenerateReportModal } from './components/GenerateReportModal';
import CodeReusabilityLanding from './pages/CodeReusabilityLanding';
import ReportDashboard from './pages/ReportDashboard';
import ClusterDetail from './pages/ClusterDetail';
import ReportComparison from './pages/ReportComparison';
import PdfPreview from './pages/PdfPreview';
import ApexGuruPage from './pages/ApexGuruPage';
import CodeModernisationPage from './pages/CodeModernisationPage';

type ViewState =
  | { page: 'landing' }
  | { page: 'report'; reportId: string }
  | { page: 'cluster'; clusterId: string; reportId: string }
  | { page: 'compare'; reportId: string }
  | { page: 'pdf'; reportId: string };

export default function App() {
  const {
    activePage,
    showGenerateModal,
    agentPanelOpen,
  } = useAppContext();

  const [view, setView] = useState<ViewState>({ page: 'landing' });
  const contentRef = useRef<HTMLDivElement>(null);
  const prevActivePage = useRef(activePage);

  useEffect(() => {
    if (activePage !== prevActivePage.current) {
      setView({ page: 'landing' });
      prevActivePage.current = activePage;
    }
  }, [activePage]);

  useEffect(() => {
    contentRef.current?.scrollTo(0, 0);
  }, [view, activePage]);

  const handleAgentNavigate = useCallback(() => {
    setView({ page: 'report', reportId: 'rpt-001' });
  }, []);

  const renderMainContent = () => {
    if (activePage === 'apex-guru') return <ApexGuruPage />;
    if (activePage === 'code-modernisation') return <CodeModernisationPage />;

    if (activePage === 'code-reusability') {
      switch (view.page) {
        case 'landing':
          return (
            <CodeReusabilityLanding
              onViewReport={(reportId) => setView({ page: 'report', reportId })}
            />
          );
        case 'report':
          return (
            <ReportDashboard
              reportId={view.reportId}
              onBack={() => setView({ page: 'landing' })}
              onClusterClick={(clusterId) =>
                setView({ page: 'cluster', clusterId, reportId: view.reportId })
              }
              onCompare={() => setView({ page: 'compare', reportId: view.reportId })}
              onPdfPreview={() => setView({ page: 'pdf', reportId: view.reportId })}
            />
          );
        case 'cluster':
          return (
            <ClusterDetail
              clusterId={view.clusterId}
              onBack={() => setView({ page: 'report', reportId: view.reportId })}
            />
          );
        case 'compare':
          return (
            <ReportComparison
              onBack={() => setView({ page: 'report', reportId: view.reportId })}
            />
          );
        case 'pdf':
          return (
            <PdfPreview
              onBack={() => setView({ page: 'report', reportId: view.reportId })}
            />
          );
      }
    }

    return (
      <div className="sf-card sf-empty-state" style={{ marginTop: 20 }}>
        <h3>Select a page from the left navigation</h3>
        <p>Navigate to Code Intelligence to get started.</p>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <GlobalHeader />
      <SetupHeader />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <LeftNav />
        <main
          ref={contentRef}
          style={{
            flex: 1,
            overflow: 'auto',
            padding: '20px 28px',
            background: 'var(--sf-body-bg)',
            minWidth: 0,
          }}
        >
          {renderMainContent()}
        </main>
        {agentPanelOpen && <AgentPanel onNavigate={handleAgentNavigate} />}
      </div>

      {showGenerateModal && <GenerateReportModal />}
    </div>
  );
}
