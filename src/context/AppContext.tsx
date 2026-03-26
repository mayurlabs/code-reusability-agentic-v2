import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

export interface AgentMessage {
  id: string;
  role: 'bot' | 'user';
  content: string;
  timestamp: string;
  actions?: { label: string; type: string }[];
}

interface AppState {
  hasCompletedScan: boolean;
  activePage: string;
  toasts: Toast[];
  showGenerateModal: boolean;
  scanInProgress: boolean;
  agentPanelOpen: boolean;
  agentMessages: AgentMessage[];
}

interface AppActions {
  setActivePage: (page: string) => void;
  setHasCompletedScan: (v: boolean) => void;
  showToast: (message: string, type?: Toast['type']) => void;
  setShowGenerateModal: (v: boolean) => void;
  setScanInProgress: (v: boolean) => void;
  toggleAgentPanel: () => void;
  setAgentPanelOpen: (v: boolean) => void;
  addAgentMessage: (msg: AgentMessage) => void;
  triggerScan: () => void;
  sendAgentMessage: (text: string) => void;
}

type AppContextValue = AppState & AppActions;

const AppContext = createContext<AppContextValue | null>(null);

const WELCOME_MESSAGE: AgentMessage = {
  id: 'welcome',
  role: 'bot',
  content:
    "Hi, I'm your Code Intelligence assistant. I can help you understand code reuse patterns, find duplicate logic, and recommend refactoring strategies. What would you like to explore?",
  timestamp: new Date().toISOString(),
  actions: [
    { label: 'Run a new scan', type: 'scan' },
    { label: 'View latest report', type: 'navigate' },
  ],
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [hasCompletedScan, setHasCompletedScan] = useState(true);
  const [activePage, setActivePage] = useState('code-reusability');
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [scanInProgress, setScanInProgress] = useState(false);
  const [agentPanelOpen, setAgentPanelOpen] = useState(false);
  const [agentMessages, setAgentMessages] = useState<AgentMessage[]>([
    WELCOME_MESSAGE,
  ]);

  const showToast = useCallback(
    (message: string, type: Toast['type'] = 'info') => {
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    },
    [],
  );

  const toggleAgentPanel = useCallback(() => {
    setAgentPanelOpen((prev) => !prev);
  }, []);

  const addAgentMessage = useCallback((msg: AgentMessage) => {
    setAgentMessages((prev) => [...prev, msg]);
  }, []);

  const triggerScan = useCallback(() => {
    setShowGenerateModal(false);
    setScanInProgress(true);
    showToast('Code Reuse scan started — analyzing your org...', 'info');

    setTimeout(() => {
      setScanInProgress(false);
      setHasCompletedScan(true);
      showToast('Scan complete — Code Reuse report is ready.', 'success');
    }, 2500);
  }, [showToast]);

  const sendAgentMessage = useCallback(
    (text: string) => {
      const userMsg: AgentMessage = {
        id: crypto.randomUUID(),
        role: 'user',
        content: text,
        timestamp: new Date().toISOString(),
      };
      addAgentMessage(userMsg);

      setTimeout(() => {
        const responses: Record<string, AgentMessage> = {
          default: {
            id: crypto.randomUUID(),
            role: 'bot',
            content: `I've analyzed your request. Based on the latest scan, I found 23 clusters of similar code across your org. The top opportunities are in pricing logic (7 variants), discount calculations (5 variants), and address validation (4 variants). Would you like me to drill into any of these?`,
            timestamp: new Date().toISOString(),
            actions: [
              { label: 'Show pricing cluster', type: 'navigate' },
              { label: 'Compare all variants', type: 'query' },
            ],
          },
        };

        let response = responses.default;

        const lower = text.toLowerCase();
        if (lower.includes('standardize') || lower.includes('standard')) {
          response = {
            id: crypto.randomUUID(),
            role: 'bot',
            content:
              'Based on your scan results, I recommend standardizing these high-impact areas first:\n\n1. **Pricing Logic** — 7 variants found, estimated 340 lines reducible\n2. **Discount Calculations** — 5 variants, 180 lines reducible\n3. **Address Validation** — 4 variants, 95 lines reducible\n\nStarting with pricing logic would give you the biggest win.',
            timestamp: new Date().toISOString(),
            actions: [{ label: 'View pricing cluster', type: 'navigate' }],
          };
        } else if (lower.includes('low-value') || lower.includes('variant')) {
          response = {
            id: crypto.randomUUID(),
            role: 'bot',
            content:
              'I found 12 low-value variants — code that differs only in formatting, variable names, or minor logic. These are safe candidates for immediate consolidation:\n\n• 4 date-formatting helpers (identical logic)\n• 3 null-check wrappers (trivial differences)\n• 5 string utility methods (duplicated across triggers)\n\nWant me to generate a consolidation plan?',
            timestamp: new Date().toISOString(),
            actions: [{ label: 'Generate plan', type: 'query' }],
          };
        } else if (lower.includes('compare') || lower.includes('pricing')) {
          response = {
            id: crypto.randomUUID(),
            role: 'bot',
            content:
              "Here's a comparison of the 7 pricing logic variants:\n\n| Variant | Class | Lines | Differences |\n|---------|-------|-------|-------------|\n| v1 | PricingEngine | 45 | Base implementation |\n| v2 | QuoteCalculator | 52 | Adds bulk discount |\n| v3 | RenewalPricing | 48 | Loyalty tier logic |\n| v4–v7 | Various | 38–44 | Minor formatting only |\n\nVariants v4–v7 are near-identical and can be merged immediately.",
            timestamp: new Date().toISOString(),
            actions: [
              { label: 'View diff', type: 'navigate' },
              { label: 'Run new scan', type: 'scan' },
            ],
          };
        } else if (lower.includes('changed') || lower.includes('last scan')) {
          response = {
            id: crypto.randomUUID(),
            role: 'bot',
            content:
              'Since your last scan (Feb 14, 2026):\n\n• **+3 new clusters** detected (API callout patterns)\n• **2 clusters resolved** (merged by your team)\n• **Reuse score improved** from 62% → 68%\n• **Lines reducible** decreased from 1,240 → 890\n\nGreat progress! The new API callout clusters are worth investigating.',
            timestamp: new Date().toISOString(),
            actions: [{ label: 'View changes', type: 'navigate' }],
          };
        }

        addAgentMessage(response);
      }, 1000);
    },
    [addAgentMessage],
  );

  const value: AppContextValue = {
    hasCompletedScan,
    activePage,
    toasts,
    showGenerateModal,
    scanInProgress,
    agentPanelOpen,
    agentMessages,
    setActivePage,
    setHasCompletedScan,
    showToast,
    setShowGenerateModal,
    setScanInProgress,
    toggleAgentPanel,
    setAgentPanelOpen,
    addAgentMessage,
    triggerScan,
    sendAgentMessage,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
      {toasts.length > 0 && (
        <div className="toast-container">
          {toasts.map((t) => (
            <div key={t.id} className={`toast ${t.type}`}>
              {t.message}
            </div>
          ))}
        </div>
      )}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}
