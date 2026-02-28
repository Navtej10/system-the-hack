import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const PROBLEMS = [
  {
    icon: '⚙️',
    title: 'AI Displacement',
    stat: '40% jobs at risk',
    desc: 'Automation is projected to displace nearly 40% of the global workforce by 2035. Manufacturing, logistics, and knowledge sectors face rapid restructuring. Entire skill ecosystems risk obsolescence within a decade.',
    color: '#ef4444',
  },
  {
    icon: '📊',
    title: 'Rising Inequality',
    stat: '3x wealth gap',
    desc: 'Productivity gains increasingly concentrate in the top 0.1%. Middle-class wage growth stagnates while asset ownership accelerates wealth divergence. Social mobility weakens across generations.',
    color: '#f59e0b',
  },
  {
    icon: '🌐',
    title: 'Economic Instability',
    stat: '$12T at risk',
    desc: 'Consumer demand declines as employment shifts destabilize income structures. Government revenue shrinks while welfare pressure expands. Financial systems face structural volatility at scale.',
    color: '#8b5cf6',
  },
];

const CARD_DELAYS = [0, 1.1, 2.2];
const CARD_DURATION = 0.9;

export const ProblemSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-20% 0px' });
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <section
      id="overview-problem"
      ref={sectionRef}
      className="section automation-section"
      style={{ borderTop: '1px solid rgba(139,92,246,0.08)' }}
    >
      <div className="blob-purple" style={{ width: 500, height: 500, top: '0%', right: '5%', opacity: 0.6 }} />
      <div className="automation-depth-gradient" />
      <div className="automation-vignette" />

      <div className="container-fluid py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 72 }}
        >
          <div className="tag" style={{ marginBottom: 20, display: 'inline-flex' }}>
            The Crisis Context
          </div>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              color: '#f3f4f6',
              marginBottom: 16,
            }}
          >
            The Automation Crisis
          </h2>
          <p style={{ fontSize: 18, color: '#6b7280', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
            Three interconnected crises converging simultaneously, demanding systemic policy responses beyond traditional governance.
          </p>
        </motion.div>

        <div className="automation-grid">
          {PROBLEMS.map((p, i) => {
            const isHovered = hoverIndex === i;

            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, x: -120 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -120 }}
                transition={{
                  delay: CARD_DELAYS[i],
                  duration: CARD_DURATION,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                onHoverStart={() => setHoverIndex(i)}
                onHoverEnd={() => setHoverIndex(null)}
                className="glass automation-card"
                style={{
                  borderRadius: 24,
                  padding: 56,
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'default',
                  minHeight: 480,
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: isHovered
                    ? '0 0 36px rgba(139,92,246,0.35)'
                    : '0 0 16px rgba(15,23,42,0.6)',
                  border: isHovered
                    ? '1px solid rgba(139,92,246,0.55)'
                    : '1px solid rgba(31,41,55,0.85)',
                  transition: 'box-shadow 0.3s ease-out, border 0.3s ease-out',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 140,
                    height: 140,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${p.color}20 0%, transparent 70%)`,
                    filter: 'blur(16px)',
                    pointerEvents: 'none',
                  }}
                />

                <div style={{ fontSize: 48, marginBottom: 24 }}>{p.icon}</div>

                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 16,
                    fontWeight: 600,
                    marginBottom: 12,
                    color: p.color,
                    letterSpacing: '0.06em',
                  }}
                >
                  {p.stat}
                </div>

                <h3
                  className="font-display"
                  style={{
                    fontSize: 32,
                    fontWeight: 700,
                    color: '#e5e7eb',
                    marginBottom: 20,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                  }}
                >
                  {p.title}
                </h3>

                <p
                  style={{
                    fontSize: 17,
                    color: '#6b7280',
                    lineHeight: 1.75,
                    flex: 1,
                  }}
                >
                  {p.desc}
                </p>

                <div
                  style={{
                    marginTop: 28,
                    height: 2,
                    borderRadius: 1,
                    background: `linear-gradient(90deg, ${p.color}70, transparent)`,
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
