import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const LAYERS = [
  {
    label: 'Frontend',
    items: ['React + Vite', 'Tailwind CSS', 'Three.js + R3F', 'Framer Motion'],
    color: '#3b82f6',
    icon: '🖥️',
  },
  {
    label: 'Simulation Engine',
    items: ['Deterministic Core', 'Weighted Impacts', 'Ripple Effects', 'Turn Logic'],
    color: '#8b5cf6',
    icon: '⚙️',
  },
  {
    label: 'AI Narrative Layer',
    items: ['Gemini 2.5 Flash', 'Context-Aware Prompts', 'Fallback Mode', 'Modular API'],
    color: '#10b981',
    icon: '🤖',
  },
];

const CARD_DELAYS = [0, 1.1, 2.2];
const CARD_DURATION = 0.9;

export const ArchitectureSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-20% 0px' });

  return (
  <section id="architecture" ref={sectionRef} className="section" style={{ borderTop: '1px solid rgba(139,92,246,0.08)', overflow: 'hidden' }}>
    <div className="blob-purple" style={{ width: 500, height: 500, top: '10%', right: '-5%', opacity: 0.6 }} />

    <div className="container-fluid py-24 relative z-10">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 72 }}>
        <div className="tag" style={{ marginBottom: 20, display: 'inline-flex' }}>System Design</div>
        <h2 className="font-display" style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#f3f4f6', marginBottom: 16 }}>
          System Architecture
        </h2>
        <p style={{ fontSize: 18, color: '#6b7280', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
          Three clearly isolated layers — UI, deterministic engine, and AI narrative — remain independently replaceable.
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 0, alignItems: 'stretch' }}>
        {LAYERS.map((layer, i) => (
          <div key={layer.label} style={{ display: 'flex', alignItems: 'stretch' }}>
            {/* Card */}
            <motion.div
              initial={{ opacity: 0, x: -120 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -120 }}
              transition={{
                delay: CARD_DELAYS[i],
                duration: CARD_DURATION,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{ y: -6 }}
              className="glass-bright"
              style={{ flex: 1, borderRadius: 20, padding: 32, position: 'relative', overflow: 'hidden' }}
            >
              {/* glow corner */}
              <div style={{ position: 'absolute', top: 0, left: 0, width: 200, height: 200, borderRadius: '50%', background: `radial-gradient(circle, ${layer.color}18 0%, transparent 65%)`, filter: 'blur(24px)', pointerEvents: 'none' }} />

              <div style={{ fontSize: 36, marginBottom: 16 }}>{layer.icon}</div>
              <div style={{ padding: '2px 10px', borderRadius: 6, background: `${layer.color}18`, border: `1px solid ${layer.color}40`, color: layer.color, fontSize: 11, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.08em', display: 'inline-block', marginBottom: 14 }}>
                LAYER {i + 1}
              </div>
              <h3 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: '#e5e7eb', marginBottom: 20, letterSpacing: '-0.02em' }}>{layer.label}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {layer.items.map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#9ca3af' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: layer.color, flexShrink: 0, boxShadow: `0 0 6px ${layer.color}` }} />
                    {item}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 28, height: 2, borderRadius: 1, background: `linear-gradient(90deg, ${layer.color}70, transparent)` }} />
            </motion.div>

            {/* Animated connector arrow (between cards) */}
            {i < LAYERS.length - 1 && (
              <div style={{ display: 'flex', alignItems: 'center', padding: '0 12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {[0, 1, 2].map(d => (
                    <motion.div key={d} style={{ width: 20, height: 2, borderRadius: 1, background: '#7c3aed' }}
                      animate={{ opacity: [0.2, 1, 0.2], x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: d * 0.25 }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Separation principle callout */}
      <motion.div
        initial={{ opacity: 0, x: -120 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -120 }}
        transition={{ delay: 3.2, duration: CARD_DURATION, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="glass" style={{ marginTop: 40, borderRadius: 16, padding: '20px 28px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ fontSize: 24, flexShrink: 0 }}>🔒</div>
        <div>
          <div className="font-display" style={{ fontWeight: 700, color: '#e5e7eb', marginBottom: 4 }}>Strict Separation of Concerns</div>
          <div style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.5 }}>
            The AI layer only generates narrative text. All numeric transitions are pure deterministic functions in <span style={{ color: '#a855f7', fontFamily: "'JetBrains Mono', monospace" }}>SimulationEngine.ts</span>. Gemini cannot modify state.
          </div>
        </div>
      </motion.div>
    </div>
  </section>
  );
};
