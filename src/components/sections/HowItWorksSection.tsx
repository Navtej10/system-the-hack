import { motion } from 'framer-motion';

const STEPS = [
  { icon: '🎯', label: 'Policy Decision',         desc: 'Select from 5 strategic policy levers — each with defined impacts, trade-offs, and risk levels.' },
  { icon: '⚙️', label: 'Deterministic Engine',    desc: 'Pure mathematical transitions apply weighted impacts, secondary ripple effects, natural decay, and ±2 jitter.' },
  { icon: '🔗', label: 'Ripple Effect Logic',     desc: 'Threshold-triggered cascades model systemic interdependencies — poverty causes further instability.' },
  { icon: '🤖', label: 'AI Explanation Layer',    desc: 'Gemini generates a 3-sentence analytical narrative of the trade-offs and societal consequences.' },
  { icon: '📡', label: 'Updated Society State',   desc: 'Five metrics update with smooth animation. Win if all >75 in 10 turns. Collapse if two metrics fall below 20.' },
];

export const HowItWorksSection = () => (
  <section id="simulation" className="section" style={{ overflow: 'hidden' }}>
    <div className="blob-purple" style={{ width: 600, height: 600, bottom: '-10%', left: '-5%', opacity: 0.5 }} />

    <div className="container-fluid py-24 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginBottom: 64 }}
      >
        <div className="tag" style={{ marginBottom: 20, display: 'inline-flex' }}>Platform Architecture</div>
        <h2 className="font-display" style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#f3f4f6', marginBottom: 16 }}>
          How the Platform Works
        </h2>
        <p style={{ fontSize: 18, color: '#6b7280', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
          A five-stage deterministic simulation pipeline — AI narrates; numbers we never change.
        </p>
      </motion.div>

      {/* Flow */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
        {STEPS.map((step, i) => (
          <div key={step.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 640 }}>
            <motion.div
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22,1,0.36,1] }}
              whileHover={{ scale: 1.02 }}
              className="glass-bright"
              style={{
                borderRadius: 16, padding: '20px 28px',
                display: 'flex', alignItems: 'center', gap: 20,
                width: '100%', cursor: 'default',
                boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
              }}
            >
              <div style={{
                width: 52, height: 52, flexShrink: 0, borderRadius: 12,
                background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24,
              }}>
                {step.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <div className="font-display" style={{ fontSize: 17, fontWeight: 700, color: '#e5e7eb', letterSpacing: '-0.02em' }}>{step.label}</div>
                  <div style={{ padding: '2px 8px', borderRadius: 6, background: 'rgba(139,92,246,0.12)', fontSize: 11, color: '#a855f7', fontFamily: "'JetBrains Mono', monospace" }}>Step {i + 1}</div>
                </div>
                <div style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.5 }}>{step.desc}</div>
              </div>
            </motion.div>

            {/* animated arrow connector */}
            {i < STEPS.length - 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '8px 0' }}>
                {[0, 1, 2].map(dot => (
                  <motion.div
                    key={dot}
                    style={{ width: 2, height: 6, borderRadius: 1, background: '#7c3aed' }}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.4, repeat: Infinity, delay: dot * 0.3 }}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);
