export const Footer = () => (
  <footer
    id="about"
    className="footer-section"
    style={{ borderTop: '1px solid rgba(139,92,246,0.12)', background: '#07070c' }}
  >
    <div className="container-fluid" style={{ paddingTop: 96, paddingBottom: 96 }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 96,
          marginBottom: 96,
        }}
      >
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                fontSize: 14,
                color: '#fff',
                letterSpacing: 1,
              }}
            >
              HTS
            </div>
            <span
              className="font-display"
              style={{ fontWeight: 700, fontSize: 22, color: '#e5e7eb', letterSpacing: '-0.02em' }}
            >
              Hack-the-System
            </span>
          </div>
          <p
            style={{
              fontSize: 17,
              color: '#6b7280',
              lineHeight: 1.8,
              maxWidth: 380,
            }}
          >
            An AI-driven strategic governance simulation for modeling societal responses to automation-driven disruption. Built for decision-makers, researchers, and policy innovators.
          </p>
          <div style={{ marginTop: 28, display: 'flex', gap: 14 }}>
            <a
              href="#"
              style={{
                padding: '12px 24px',
                borderRadius: 12,
                border: '1px solid rgba(139,92,246,0.3)',
                background: 'rgba(139,92,246,0.1)',
                fontSize: 15,
                color: '#a855f7',
                textDecoration: 'none',
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: '0.05em',
              }}
            >
              GitHub →
            </a>
          </div>
        </div>

        {/* Platform */}
        <div>
          <div
            style={{
              fontSize: 14,
              fontFamily: "'JetBrains Mono', monospace",
              color: '#6b7280',
              letterSpacing: '0.12em',
              marginBottom: 24,
            }}
          >
            PLATFORM
          </div>
          {['Overview', 'Simulation Engine', 'AI Advisor', 'Architecture', 'Dashboard'].map(link => (
            <div
              key={link}
              style={{ fontSize: 17, color: '#9ca3af', marginBottom: 16, cursor: 'pointer' }}
              onMouseEnter={e => ((e.target as HTMLDivElement).style.color = '#e5e7eb')}
              onMouseLeave={e => ((e.target as HTMLDivElement).style.color = '#9ca3af')}
            >
              {link}
            </div>
          ))}
        </div>

        {/* Project */}
        <div>
          <div
            style={{
              fontSize: 14,
              fontFamily: "'JetBrains Mono', monospace",
              color: '#6b7280',
              letterSpacing: '0.12em',
              marginBottom: 24,
            }}
          >
            PROJECT
          </div>
          <div style={{ fontSize: 17, color: '#9ca3af', marginBottom: 16 }}>Built for: AI Hackathon 2035</div>
          <div style={{ fontSize: 17, color: '#9ca3af', marginBottom: 16 }}>Stack: React, Vite, Three.js, Gemini</div>
          <div style={{ fontSize: 17, color: '#9ca3af', marginBottom: 16 }}>License: MIT</div>
          <div
            style={{
              marginTop: 28,
              padding: '14px 20px',
              borderRadius: 12,
              background: 'rgba(16,185,129,0.1)',
              border: '1px solid rgba(16,185,129,0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 12px #10b981',
              }}
            />
            <span style={{ fontSize: 14, color: '#10b981', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.08em' }}>
              SYS v1.0 · ONLINE
            </span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          paddingTop: 40,
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div style={{ fontSize: 15, color: '#4b5563' }}>
          © 2035 Hack-the-System · AI Governance Simulation Lab
        </div>
        <div style={{ fontSize: 14, fontFamily: "'JetBrains Mono', monospace", color: '#4b5563' }}>
          DET ENGINE · AI LAYER · MODULAR ARCH
        </div>
      </div>
    </div>
  </footer>
);
