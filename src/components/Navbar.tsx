import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Overview', href: '#overview' },
  { label: 'Simulation', href: '#simulation' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'AI Assistant', href: '#ai-assistant' },
  { label: 'About', href: '#about' },
];

interface NavbarProps {
  currentView: 'landing' | 'dashboard';
  onNavigate: (view: 'landing' | 'dashboard') => void;
}

export const Navbar = ({ currentView, onNavigate }: NavbarProps) => {
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    let ticking = false;
    let lastVal = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const val = window.scrollY > 20;
        if (val !== lastVal) {
          lastVal = val;
          setScrolled(val);
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setActiveLink(href);
    setMobileOpen(false);

    if (currentView !== 'landing') {
      onNavigate('landing');
      return;
    }

    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const launchSimulation = () => {
    setMobileOpen(false);
    navigate('/scenario');
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-[500]"
        style={{
          background: scrolled ? 'rgba(10,10,15,0.95)' : 'transparent',
          borderBottom: scrolled
            ? '1px solid rgba(139,92,246,0.12)'
            : '1px solid transparent',
          boxShadow: scrolled
            ? '0 2px 12px rgba(0,0,0,0.3)'
            : 'none',
          transition:
            'background 0.3s, border-color 0.3s, box-shadow 0.3s',
        }}
      >
        <div
          className="container-fluid"
          style={{
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 84,
          }}
        >
          {/* Logo */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => onNavigate('landing')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background:
                  'linear-gradient(135deg, #7c3aed, #a855f7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                fontSize: 13,
                color: '#fff',
                letterSpacing: 1,
                boxShadow: '0 0 10px rgba(124,58,237,0.25)',
              }}
            >
              HTS
            </div>

            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 19,
                color: '#e5e7eb',
              }}
            >
              Hack-the-System
            </span>
          </motion.button>

          {/* Desktop Links */}
          <div className="hidden lg:flex" style={{ gap: 12 }}>
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                style={{
                  background:
                    activeLink === link.href
                      ? 'rgba(139,92,246,0.12)'
                      : 'transparent',
                  border:
                    activeLink === link.href
                      ? '1px solid rgba(139,92,246,0.3)'
                      : '1px solid transparent',
                  borderRadius: 8,
                  padding: '8px 18px',
                  cursor: 'pointer',
                  fontSize: 15,
                  fontWeight: 600,
                  color:
                    activeLink === link.href
                      ? '#c4b5fd'
                      : '#9ca3af',
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Launch Button */}
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              className="btn-primary hidden md:block"
              style={{
                padding: '10px 24px',
                fontSize: 15,
                fontWeight: 600,
              }}
              onClick={launchSimulation}
            >
              Launch Simulation →
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 8,
              }}
            >
              ☰
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed z-[499] left-4 right-4 glass"
            style={{ top: 94, borderRadius: 16, padding: 16 }}
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  padding: '12px 16px',
                  color: '#9ca3af',
                }}
              >
                {link.label}
              </button>
            ))}

            <button
              className="btn-primary"
              style={{
                width: '100%',
                marginTop: 8,
                padding: '12px 20px',
              }}
              onClick={launchSimulation}
            >
              Launch Simulation →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};