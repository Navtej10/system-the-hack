import { motion } from 'framer-motion';

const FEATURES = [
  { icon: '📊', text: 'Query current system state in plain language' },
  { icon: '🎯', text: 'Get strategy suggestions based on metric risks' },
  { icon: '🔗', text: 'Explain ripple effects before they happen' },
  { icon: '⚡', text: 'Suggest the next optimal policy move' },
];

const DEMO_CHAT = [
  { role: 'user', text: 'What should I prioritize this turn?' },
  { role: 'ai', text: 'Gov. Budget is at 29 — critical. If it drops below 20 alongside any other metric, you collapse. I recommend Taxing AI Corporations this turn to inject +25 budget, accepting a -15 economy penalty as a calculated trade-off.' },
  { role: 'user', text: 'What happens if I choose UBI instead?' },
  { role: 'ai', text: 'UBI would raise Public Happiness +20 and reduce Inequality -25 — excellent for stability — but cost -30 Budget, pushing you to near-collapse territory immediately. High reward, existential risk. Not recommended at turn 4.' },
];

export const AIAssistantSection = () => (
  <section id="ai-assistant" className="section ai-advisor-section" style={{ borderTop: '1px solid rgba(139,92,246,0.08)' }}>
    <div className="blob-blue" style={{ width: 600, height: 600, bottom: 0, left: '-10%' }} />

    <div className="container-fluid ai-advisor-container relative z-10" style={{ paddingTop: 80, paddingBottom: 80, width: '100%' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginBottom: 120 }}
      >
        <div className="tag" style={{ marginBottom: 24, display: 'inline-flex' }}>AI Advisory System</div>
        <h2
          className="font-display"
          style={{
            fontSize: 'clamp(2.6rem, 5.5vw, 4.75rem)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            color: '#f3f4f6',
            marginBottom: 24,
          }}
        >
          AI Policy Advisor
        </h2>
        <p
          style={{
            fontSize: 20,
            color: '#6b7280',
            maxWidth: 680,
            margin: '0 auto',
            lineHeight: 1.8,
          }}
        >
          A strategic advisor — not a chatbot. Context-aware, analytically rigorous, and always reading the current simulation state.
        </p>
      </motion.div>

      <div className="ai-advisor-grid" style={{ display: 'grid' }}>
        {/* Left: Feature list */}
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h3
            className="font-display"
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: '#e5e7eb',
              marginBottom: 16,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            Strategic Decision Support
          </h3>
          <p
            style={{
              fontSize: 17,
              color: '#9ca3af',
              lineHeight: 1.75,
              marginBottom: 48,
            }}
          >
            The AI Advisor reads your live simulation state and provides analytical guidance. It never modifies numbers — only explains, advises, and warns.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginBottom: 56 }}>
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 18 }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    flexShrink: 0,
                    borderRadius: 12,
                    background: 'rgba(139,92,246,0.12)',
                    border: '1px solid rgba(139,92,246,0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 22,
                  }}
                >
                  {f.icon}
                </div>
                <div style={{ fontSize: 17, color: '#9ca3af', paddingTop: 12, lineHeight: 1.6 }}>{f.text}</div>
              </motion.div>
            ))}
          </div>

          <div
            className="glass"
            style={{
              borderRadius: 18,
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <div style={{ fontSize: 26 }}>🔒</div>
            <div style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.5 }}>
              <span style={{ color: '#c4b5fd' }}>Advisory only.</span> The AI assistant cannot modify simulator state. All decisions belong to you.
            </div>
          </div>
        </motion.div>

        {/* Right: Demo chat UI */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-bright"
          style={{
            borderRadius: 24,
            overflow: 'hidden',
            boxShadow: '0 0 40px rgba(139,92,246,0.1)',
          }}
        >
          {/* Chat header */}
          <div
            style={{
              padding: '20px 24px',
              borderBottom: '1px solid rgba(139,92,246,0.12)',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              background: 'rgba(10,10,15,0.6)',
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#a855f7', boxShadow: '0 0 10px #a855f7' }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: '#c4b5fd', letterSpacing: '0.08em' }}>
              AI POLICY ADVISOR · ACTIVE
            </span>
          </div>

          {/* Messages */}
          <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 20, minHeight: 420 }}>
            {DEMO_CHAT.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}
              >
                <div className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'} style={{ maxWidth: '88%' }}>
                  {msg.role === 'ai' && (
                    <div
                      style={{
                        fontSize: 11,
                        color: '#7c3aed',
                        fontFamily: "'JetBrains Mono', monospace",
                        marginBottom: 8,
                        letterSpacing: '0.1em',
                      }}
                    >
                      ADVISOR
                    </div>
                  )}
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input bar */}
          <div
            style={{
              padding: '18px 24px',
              borderTop: '1px solid rgba(139,92,246,0.1)',
              display: 'flex',
              gap: 14,
              background: 'rgba(10,10,15,0.6)',
            }}
          >
            <div
              style={{
                flex: 1,
                borderRadius: 14,
                background: 'rgba(139,92,246,0.06)',
                border: '1px solid rgba(139,92,246,0.15)',
                padding: '14px 20px',
                fontSize: 16,
                color: '#6b7280',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Ask about your current strategy…
            </div>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: 'rgba(139,92,246,0.2)',
                border: '1px solid rgba(139,92,246,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                flexShrink: 0,
              }}
            >
              ↑
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);
