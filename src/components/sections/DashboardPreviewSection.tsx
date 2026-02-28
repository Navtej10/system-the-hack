import { useState } from 'react';
import { motion } from 'framer-motion';

const MOCK_METRICS = [
  { label: 'Employment',       value: 58, color: '#f59e0b' },
  { label: 'Economy',          value: 72, color: '#10b981' },
  { label: 'Public Happiness', value: 41, color: '#f59e0b' },
  { label: 'Inequality',       value: 63, color: '#f59e0b' },
  { label: 'Gov. Budget',      value: 29, color: '#ef4444' },
];

const MOCK_POLICIES = [
  { title: 'Invest in AI Reskilling', risk: 'LOW',    riskColor: '#10b981' },
  { title: 'Universal Basic Income',  risk: 'HIGH',   riskColor: '#ef4444' },
  { title: 'Tax AI Corporations',     risk: 'MEDIUM', riskColor: '#f59e0b' },
];

export const DashboardPreviewSection = () => {
  const [hoveredPolicy, setHoveredPolicy] = useState<number | null>(null);

  return (
    <section id="dashboard" className="section" style={{ borderTop: '1px solid rgba(139,92,246,0.08)' }}>
      <div className="blob-blue" style={{ width: 500, height: 500, top: '10%', right: '-5%' }} />

      <div className="container-fluid py-24 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          style={{ textAlign: 'center', marginBottom: 72 }}
        >
          <div className="tag" style={{ marginBottom: 20, display: 'inline-flex' }}>Live Interface</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#f3f4f6', marginBottom: 16 }}>
            Dashboard Preview
          </h2>
          <p style={{ fontSize: 18, color: '#6b7280', maxWidth: 540, margin: '0 auto', lineHeight: 1.7 }}>
            A real-time intelligence interface tracking five societal metrics across ten decision turns.
          </p>
        </motion.div>

        {/* Mock Dashboard Frame */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-bright"
          style={{ borderRadius: 24, overflow: 'hidden', boxShadow: '0 0 60px rgba(139,92,246,0.12), 0 40px 80px rgba(0,0,0,0.5)' }}
        >
          {/* Title bar */}
          <div style={{
            padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            borderBottom: '1px solid rgba(139,92,246,0.12)',
            background: 'rgba(10,10,15,0.7)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', gap: 6 }}>
                {['#ef4444','#f59e0b','#10b981'].map(c => (
                  <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.7 }} />
                ))}
              </div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#6b7280' }}>hack-the-system · governance-lab</span>
            </div>
            <div style={{
              padding: '4px 14px', borderRadius: 999,
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
              fontSize: 11, color: '#ef4444', fontFamily: "'JetBrains Mono', monospace",
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              TURN 4 / 10
            </div>
          </div>

          <div style={{ padding: 28 }}>
            {/* Warning */}
            <div style={{
              padding: '10px 16px', borderRadius: 10, marginBottom: 24,
              background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ fontSize: 16 }}>⚠</span>
              <span style={{ fontSize: 13, color: '#fca5a5', fontFamily: "'JetBrains Mono', monospace" }}>SECTOR INSTABILITY DETECTED · Gov. Budget critical</span>
            </div>

            {/* Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 12, marginBottom: 28 }}>
              {MOCK_METRICS.map((m) => (
                <div key={m.label} className="glass" style={{ borderRadius: 14, padding: '16px 12px', textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: '#6b7280', fontFamily: "'JetBrains Mono', monospace", marginBottom: 10, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{m.label}</div>
                  <div style={{ position: 'relative', width: 56, height: 56, margin: '0 auto 8px' }}>
                    <svg viewBox="0 0 56 56" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                      <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5" />
                      <circle cx="28" cy="28" r="22" fill="none" stroke={m.color} strokeWidth="5"
                        strokeDasharray={`${2 * Math.PI * 22}`}
                        strokeDashoffset={`${2 * Math.PI * 22 * (1 - m.value / 100)}`}
                        strokeLinecap="round"
                        style={{ filter: `drop-shadow(0 0 4px ${m.color})` }}
                      />
                    </svg>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 800, color: m.color, fontFamily: "'Space Grotesk', sans-serif" }}>{m.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Policy cards */}
            <div>
              <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 12, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.08em' }}>AVAILABLE POLICY MECHANISMS</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
                {MOCK_POLICIES.map((p, i) => (
                  <motion.div
                    key={p.title}
                    className="glass"
                    onHoverStart={() => setHoveredPolicy(i)}
                    onHoverEnd={() => setHoveredPolicy(null)}
                    animate={{ borderColor: hoveredPolicy === i ? 'rgba(139,92,246,0.45)' : 'rgba(139,92,246,0.12)', y: hoveredPolicy === i ? -4 : 0 }}
                    style={{ borderRadius: 14, padding: 18, cursor: 'pointer' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#e5e7eb', lineHeight: 1.3, flex: 1, paddingRight: 8 }}>{p.title}</div>
                      <span style={{ padding: '2px 7px', borderRadius: 6, border: `1px solid ${p.riskColor}40`, background: `${p.riskColor}15`, color: p.riskColor, fontSize: 10, fontFamily: "'JetBrains Mono', monospace", whiteSpace: 'nowrap', flexShrink: 0 }}>
                        RISK: {p.risk}
                      </span>
                    </div>
                    <div style={{ fontSize: 11, color: '#4b5563', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.06em' }}>
                      {hoveredPolicy === i ? '↑ Employment  ↓ Gov. Budget' : 'HOVER FOR IMPACT PROJECTION'}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
