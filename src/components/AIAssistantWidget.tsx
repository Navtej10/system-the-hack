import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const AIAssistantWidget = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Governance Advisor online. I can analyze your current simulation state, suggest policies, or explain systemic ripple effects. What do you need?' }
  ]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [
      ...prev,
      { role: 'user', text: userMsg },
      { role: 'ai', text: 'The AI Advisor is analyzing your current simulation context. In a live session, this would provide strategic guidance based on your turn state, metric values, and remaining policy options.' }
    ]);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        className="fixed z-[900]"
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        style={{
          bottom: 28, right: 28,
          width: 58, height: 58, borderRadius: '50%',
          background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
          border: 'none', cursor: 'pointer',
          boxShadow: open ? '0 0 0 4px rgba(139,92,246,0.3), 0 8px 32px rgba(124,58,237,0.6)' : '0 4px 24px rgba(124,58,237,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22, color: '#fff',
          transition: 'box-shadow 0.25s',
        }}
        aria-label="Open AI Advisor"
      >
        {open ? '✕' : '🤖'}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="fixed z-[899] glass-bright"
            style={{
              bottom: 98, right: 28,
              width: 360, borderRadius: 20, overflow: 'hidden',
              boxShadow: '0 0 40px rgba(139,92,246,0.2), 0 24px 60px rgba(0,0,0,0.6)',
            }}
          >
            {/* Header */}
            <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(139,92,246,0.15)', background: 'rgba(10,10,15,0.8)', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#a855f7', boxShadow: '0 0 8px #a855f7', animation: 'pulse 2s infinite' }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#c4b5fd', letterSpacing: '0.1em', fontWeight: 600 }}>AI POLICY ADVISOR</span>
              <span style={{ marginLeft: 'auto', fontSize: 11, color: '#4b5563', fontFamily: "'JetBrains Mono', monospace" }}>v1.0</span>
            </div>

            {/* Messages */}
            <div style={{ padding: 16, maxHeight: 300, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}>
                    {msg.role === 'ai' && (
                      <div style={{ fontSize: 10, color: '#7c3aed', fontFamily: "'JetBrains Mono', monospace", marginBottom: 4, letterSpacing: '0.1em' }}>ADVISOR</div>
                    )}
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div style={{ padding: '10px 14px', borderTop: '1px solid rgba(139,92,246,0.1)', background: 'rgba(10,10,15,0.7)', display: 'flex', gap: 8 }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Ask for strategy advice…"
                style={{
                  flex: 1, background: 'rgba(139,92,246,0.07)', border: '1px solid rgba(139,92,246,0.15)',
                  borderRadius: 10, padding: '9px 13px', fontSize: 13, color: '#e5e7eb',
                  fontFamily: 'Inter, sans-serif', outline: 'none',
                }}
              />
              <button
                onClick={send}
                style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(139,92,246,0.25)', border: '1px solid rgba(139,92,246,0.4)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a855f7', fontSize: 16, flexShrink: 0 }}
              >↑</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
