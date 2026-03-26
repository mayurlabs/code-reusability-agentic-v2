import { useState, useRef, useEffect } from 'react';
import { X, RotateCcw, Pin, Info, Send } from 'lucide-react';
import { useAppContext } from '../context/AppContext.tsx';
import type { AgentMessage } from '../context/AppContext.tsx';
import { AgentforceIcon } from './GlobalHeader.tsx';

const SUGGESTED_PROMPTS = [
  'What code should I standardize?',
  'Show low-value variants',
  'Compare pricing logic',
  'What changed since last scan?',
];

function AgentAvatar() {
  return (
    <div
      style={{
        width: 28,
        height: 28,
        borderRadius: '50%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <AgentforceIcon size={28} />
    </div>
  );
}

function UserAvatar() {
  return (
    <div
      style={{
        width: 28,
        height: 28,
        borderRadius: '50%',
        background: 'var(--sf-blue)',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 10,
        fontWeight: 700,
        flexShrink: 0,
      }}
    >
      PR
    </div>
  );
}

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '4px 0' }}>
      <AgentAvatar />
      <div
        style={{
          background: 'var(--sf-agent-bg)',
          borderRadius: '12px 12px 12px 2px',
          padding: '10px 14px',
          display: 'flex',
          gap: 4,
          alignItems: 'center',
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#999',
              animation: `typingDot 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
        <style>{`
          @keyframes typingDot {
            0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
            30% { opacity: 1; transform: translateY(-3px); }
          }
        `}</style>
      </div>
    </div>
  );
}

function MessageBubble({
  msg,
  onAction,
}: {
  msg: AgentMessage;
  onAction: (action: { label: string; type: string }) => void;
}) {
  const isBot = msg.role === 'bot';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: isBot ? 'flex-start' : 'flex-start',
        flexDirection: isBot ? 'row' : 'row-reverse',
        gap: 10,
        maxWidth: '100%',
      }}
    >
      {isBot ? <AgentAvatar /> : <UserAvatar />}
      <div style={{ maxWidth: 'calc(100% - 44px)' }}>
        <div
          style={{
            background: isBot ? 'var(--sf-agent-bg)' : 'var(--sf-agent-user-bg)',
            borderRadius: isBot
              ? '12px 12px 12px 2px'
              : '12px 12px 2px 12px',
            padding: '10px 14px',
            fontSize: 13,
            lineHeight: 1.55,
            color: 'var(--sf-text)',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {msg.content}
        </div>

        {msg.actions && msg.actions.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 6,
              marginTop: 8,
            }}
          >
            {msg.actions.map((action, i) => (
              <button
                key={i}
                onClick={() => onAction(action)}
                style={{
                  padding: '5px 12px',
                  borderRadius: 16,
                  border: '1px solid var(--sf-blue)',
                  color: 'var(--sf-blue)',
                  fontSize: 12,
                  fontWeight: 500,
                  background: '#fff',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--sf-blue)';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.color = 'var(--sf-blue)';
                }}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}

        <div
          style={{
            fontSize: 10,
            color: 'var(--sf-text-muted)',
            marginTop: 4,
            textAlign: isBot ? 'left' : 'right',
          }}
        >
          {new Date(msg.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    </div>
  );
}

interface AgentPanelProps {
  onNavigate?: () => void;
}

export function AgentPanel({ onNavigate }: AgentPanelProps) {
  const {
    agentMessages,
    sendAgentMessage,
    setShowGenerateModal,
    addAgentMessage,
    setAgentPanelOpen,
  } = useAppContext();

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prevMessageCount = useRef(agentMessages.length);

  useEffect(() => {
    if (agentMessages.length > prevMessageCount.current) {
      const latest = agentMessages[agentMessages.length - 1];
      if (latest.role === 'user') {
        setIsTyping(true);
      } else {
        setIsTyping(false);
      }
    }
    prevMessageCount.current = agentMessages.length;
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [agentMessages]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    sendAgentMessage(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAction = (action: { label: string; type: string }) => {
    switch (action.type) {
      case 'scan':
        setShowGenerateModal(true);
        break;
      case 'navigate':
        onNavigate?.();
        break;
      case 'query':
        addAgentMessage({
          id: crypto.randomUUID(),
          role: 'bot',
          content:
            'Here are the key comparison insights:\n\n• **Highest overlap**: PricingEngine vs QuoteCalculator — 87% similarity\n• **Quick win**: 4 date-formatting helpers are functionally identical\n• **Biggest savings**: Consolidating pricing variants could remove ~340 lines\n• **Risk flag**: RenewalPricing has unique loyalty logic — keep separate\n\nWant me to generate a consolidation plan for the safe merges?',
          timestamp: new Date().toISOString(),
          actions: [{ label: 'Generate plan', type: 'query' }],
        });
        break;
    }
  };

  return (
    <div
      style={{
        width: 380,
        minWidth: 380,
        height: '100%',
        background: '#fff',
        borderLeft: '1px solid var(--sf-border)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '12px 16px',
          borderBottom: '1px solid var(--sf-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <AgentforceIcon size={22} />
          <span style={{ fontSize: 14, fontWeight: 700 }}>Agentforce</span>
          <Info size={14} color="var(--sf-blue)" style={{ cursor: 'pointer' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {[RotateCcw, Pin, X].map((Icon, i) => (
            <button
              key={i}
              onClick={
                Icon === X ? () => setAgentPanelOpen(false) : undefined
              }
              style={{
                width: 28,
                height: 28,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 4,
                color: 'var(--sf-text-secondary)',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = '#f3f3f3')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = 'transparent')
              }
            >
              <Icon size={15} />
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        {agentMessages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} onAction={handleAction} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested prompts */}
      <div
        style={{
          padding: '8px 16px 4px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 6,
          borderTop: '1px solid var(--sf-border)',
        }}
      >
        {SUGGESTED_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            onClick={() => sendAgentMessage(prompt)}
            style={{
              padding: '4px 10px',
              borderRadius: 12,
              border: '1px solid var(--sf-border)',
              fontSize: 11,
              color: 'var(--sf-text-secondary)',
              background: '#fafafa',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--sf-blue)';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.borderColor = 'var(--sf-blue)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#fafafa';
              e.currentTarget.style.color = 'var(--sf-text-secondary)';
              e.currentTarget.style.borderColor = 'var(--sf-border)';
            }}
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input */}
      <div
        style={{
          padding: '10px 16px 14px',
          display: 'flex',
          alignItems: 'flex-end',
          gap: 8,
        }}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe your task or ask a question..."
          rows={1}
          style={{
            flex: 1,
            border: '1px solid var(--sf-border)',
            borderRadius: 8,
            padding: '8px 12px',
            fontSize: 13,
            outline: 'none',
            resize: 'none',
            minHeight: 36,
            maxHeight: 80,
            lineHeight: 1.4,
          }}
          onFocus={(e) =>
            (e.currentTarget.style.borderColor = 'var(--sf-blue)')
          }
          onBlur={(e) =>
            (e.currentTarget.style.borderColor = 'var(--sf-border)')
          }
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            background: input.trim() ? 'var(--sf-blue)' : '#e5e5e5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'background 0.15s',
          }}
        >
          <Send size={15} color={input.trim() ? '#fff' : '#999'} />
        </button>
      </div>
    </div>
  );
}
