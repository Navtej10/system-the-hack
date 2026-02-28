import { useGameStore } from '../store/gameStore';
import { MetricsPanel } from './MetricsPanel';
import { PolicyCards } from './PolicyCards';
import { ExplanationPanel } from './ExplanationPanel';
import { CityWireframe } from './CityWireframe';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

interface DashboardProps {
  onRestart: () => void;
}

export const Dashboard = ({ onRestart }: DashboardProps) => {
  const { currentState, isSimulating, resetGame } = useGameStore();
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (currentState.status === 'won') {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#8b5cf6', '#3b82f6', '#10b981'],
      });
    }
  }, [currentState.status]);

  useEffect(() => {
    const { metrics } = currentState;
    const criticalMetrics = Object.values(metrics).filter((v) => v < 30).length;
    setShowWarning(criticalMetrics > 0 && currentState.status === 'playing');
  }, [currentState]);

  const handleRestart = () => {
    resetGame();
    onRestart();
  };

  const { metrics } = currentState;
  const metricValues = Object.values(metrics);
  const unstableCount = metricValues.filter((v) => v < 30).length;
  const globalStable = unstableCount === 0;

  return (
    <div className="min-h-screen pt-24 pb-12 relative overflow-x-hidden w-full bg-[#0a0a0f]">
      {/* Background radial effects */}
      <div
        className="blob-purple"
        style={{ width: '60vw', height: '60vw', top: '-20%', left: '-10%', opacity: 0.15 }}
      />
      <div
        className="blob-blue"
        style={{ width: '50vw', height: '50vw', bottom: '-10%', right: '-10%', opacity: 0.1 }}
      />

      <div className="container-fluid flex flex-col gap-10 relative z-10">
        {/* TOP BAR */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full glass-card rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center font-code font-bold text-white shadow-[0_0_14px_rgba(139,92,246,0.45)]">
              HTS
            </div>
            <div>
              <h2 className="font-display font-bold text-2xl text-white m-0">Governance Control</h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_#10b981]" />
                <span className="font-code text-[10px] text-emerald-400 tracking-widest uppercase">
                  Live Simulation Active
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <AnimatePresence>
              {showWarning && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 font-code text-xs flex items-center gap-2"
                >
                  <span className="animate-pulse text-lg">⚠️</span>
                  SYSTEM INSTABILITY DETECTED
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col items-end">
              <span className="font-code text-[10px] text-gray-500 tracking-[0.2em] mb-1">
                CHRONOS SYNC
              </span>
              <div className="font-display font-bold text-3xl text-white">
                TURN {currentState.turn} <span className="text-gray-600">/ 10</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* SECTION 1: Visualization (left) + Predictive Engine (right) */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full rounded-3xl border border-slate-900 bg-[#050814] overflow-hidden flex flex-col xl:flex-row min-h-[500px]"
        >
          {/* Left: city visualization area */}
          <div className="relative w-full xl:w-[72%] bg-[#050814] flex items-center justify-center">
            {/* Status pill (top-left) */}
            <div className="absolute top-6 left-6 z-10 rounded-2xl bg-[#050814]/95 border border-slate-800 px-6 py-3 flex gap-10 shadow-[0_10px_30px_rgba(0,0,0,0.7)]">
              <div className="flex flex-col">
                <span className="font-code text-[10px] uppercase tracking-[0.18em] text-slate-400">
                  Global Equilibrium
                </span>
                <span
                  className="font-display font-bold text-xl"
                  style={{ color: globalStable ? '#22c55e' : '#eab308' }}
                >
                  {globalStable ? 'STABLE' : 'UNSTABLE'}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-code text-[10px] uppercase tracking-[0.18em] text-slate-400">
                  Chronos Cycle
                </span>
                <span className="font-display font-bold text-xl text-sky-400">
                  {currentState.turn} <span className="text-slate-500">/ 10</span>
                </span>
              </div>
            </div>

            {/* 3D city wireframe */}
            <div className="w-[86%] h-[72%] border border-slate-800 rounded-3xl bg-[#020617] overflow-hidden">
              <CityWireframe />
            </div>
          </div>

          {/* Right: predictive engine / advisor */}
          <div className="w-full xl:w-[28%] border-t border-slate-900 xl:border-t-0 xl:border-l bg-[#050712] flex flex-col">
            <div className="px-6 py-5 border-b border-slate-800 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-700 to-blue-600 flex items-center justify-center text-lg border border-purple-500/40">
                🌀
              </div>
              <div>
                <div className="font-display text-sm font-semibold text-slate-100">
                  Predictive Engine
                </div>
                <div className="font-code text-[10px] uppercase tracking-[0.18em] text-slate-500">
                  Trade-off Analytics
                </div>
              </div>
            </div>
            <div className="flex-1 min-h-[260px] p-4">
              <ExplanationPanel />
            </div>
          </div>
        </motion.section>

        {/* SECTION 2: Interventions (left) + Metrics (right) */}
        <motion.section
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full rounded-3xl border border-slate-900 bg-[#050814] overflow-hidden flex flex-col lg:flex-row mt-4"
        >
          {/* Strategic interventions */}
          <div className="w-full lg:w-[65%] border-b border-slate-900 lg:border-b-0 lg:border-r px-8 py-8">
            <div className="flex justify-between items-center mb-5">
              <div className="font-code text-[11px] text-purple-400/70 tracking-[0.3em] uppercase font-bold">
                Strategic Interventions
              </div>
              <div className="font-code text-[10px] text-slate-500 font-semibold tracking-[0.18em] uppercase hidden md:block">
                Choose one per turn cycle
              </div>
            </div>
            <div className="mt-4">
              <PolicyCards disabled={isSimulating || currentState.status !== 'playing'} />
            </div>
          </div>

          {/* Metrics */}
          <div className="w-full lg:w-[35%] px-8 py-8 bg-[#050712] flex flex-col">
            <div className="font-code text-[11px] text-purple-400/70 tracking-[0.3em] uppercase font-bold mb-5">
              Analysis Metrics
            </div>
            <div className="flex-1 min-h-[260px]">
              <MetricsPanel />
            </div>
          </div>
        </motion.section>
      </div>

      {/* OVERLAYS */}
      <AnimatePresence>
        {isSimulating && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-md"
          >
            <div className="flex flex-col items-center gap-8">
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 border-4 border-purple-500/10 rounded-full" />
                <motion.div 
                  className="absolute inset-0 border-4 border-purple-500 border-t-transparent rounded-full" 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} 
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-code text-xs text-purple-400 animate-pulse">CALCULATING</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="font-display font-bold text-xl text-white tracking-widest">PROCESSING RIPPLE EFFECTS</div>
                <div className="font-code text-xs text-purple-500/60 uppercase">Updating system parameters...</div>
              </div>
            </div>
          </motion.div>
        )}

        {(currentState.status === 'won' || currentState.status === 'lost') && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="fixed inset-0 z-[1100] flex items-center justify-center bg-[#05050a]/90 backdrop-blur-xl p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className={`glass-card max-w-2xl w-full p-12 rounded-[2rem] text-center border-2 ${currentState.status === 'won' ? 'border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.2)]' : 'border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.2)]'}`}
            >
              <div className="text-7xl mb-8">{currentState.status === 'won' ? '🕊️' : '📉'}</div>
              <h2 className="font-display font-bold text-5xl text-white mb-6">
                {currentState.status === 'won' ? 'Societal Equilibrium' : 'Systemic Collapse'}
              </h2>
              <p className="text-gray-400 text-xl mb-10 leading-relaxed">
                {currentState.status === 'won' 
                  ? "You have successfully navigated the AI transition. Society has reached a stable state of innovation and equality." 
                  : "The structural failures were too great. The nation has entered a period of irrecoverable fragmentation."}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-gray-500 text-xs font-code uppercase mb-1">Final Turn</div>
                  <div className="text-white font-display font-bold text-2xl">{currentState.turn}</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-gray-500 text-xs font-code uppercase mb-1">Final Result</div>
                  <div className={`font-display font-bold text-2xl ${currentState.status === 'won' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {currentState.status === 'won' ? 'SUCCESS' : 'FAILED'}
                  </div>
                </div>
              </div>
              <button 
                onClick={handleRestart} 
                className={`mt-10 btn-primary w-full py-5 text-xl font-display ${currentState.status === 'lost' ? 'bg-red-600 hover:bg-red-500 shadow-red-500/20' : ''}`}
              >
                {currentState.status === 'won' ? 'Launch New Simulation →' : 'Attempt Emergency Override →'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
