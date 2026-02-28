import { useGameStore } from '../store/gameStore';
import { motion, AnimatePresence } from 'framer-motion';

export const ExplanationPanel = () => {
  const { currentExplanation, isSimulating } = useGameStore();

  return (
    <div className="glass-card rounded-2xl p-8 w-full h-full flex flex-col relative overflow-hidden bg-[#0d0d18]/50">
      {/* Decorative corner glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-600/10 rounded-full blur-[60px] pointer-events-none" />

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-purple-900/30 border border-purple-500/20 flex items-center justify-center text-xl">
            🧠
          </div>
          <div>
            <h3 className="font-display font-bold text-gray-100 text-lg m-0">Strategic Intel</h3>
            <div className="font-code text-[10px] text-purple-400 uppercase tracking-widest mt-0.5">Real-time Analysis</div>
          </div>
        </div>
        
        <div className="flex gap-1.5">
          {[0, 1, 2].map(i => (
            <motion.div 
              key={i}
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.9, 1.1, 0.9] }} 
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }} 
              className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_#8b5cf6]" 
            />
          ))}
        </div>
      </div>

      <div className="flex-1 relative min-h-0">
        <AnimatePresence mode="wait">
          {isSimulating ? (
            <motion.div
              key="simulating"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="absolute inset-0 flex flex-col justify-center gap-4"
            >
              {[
                "Decoding neural architecture ripples...",
                "Running billion-parameter probability check...",
                "Synthesizing socioeconomic causality..."
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4">
                  <motion.div 
                    animate={{ width: [0, i === 2 ? 40 : 100] }} 
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                    className="h-[1px] bg-purple-500/40" 
                  />
                  <span className="font-code text-xs text-purple-400 font-bold opacity-70 italic tracking-wide">{text}</span>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={currentExplanation}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full overflow-y-auto pr-4 custom-scrollbar"
            >
              <div className="prose prose-invert max-w-none">
                {currentExplanation.split('\n').filter(p => p.trim()).map((para, i) => (
                  <p key={i} className="font-code text-sm text-gray-300 leading-[1.8] mb-6 last:mb-0 border-l-2 border-purple-500/10 pl-5 relative">
                    {/* Floating quote-like detail */}
                    {i === 0 && <span className="absolute -left-1 top-0 text-purple-500 text-xl font-serif">"</span>}
                    {para}
                  </p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative footer line */}
      <div className="mt-8 pt-4 border-t border-white/5">
        <div className="flex justify-between items-center opacity-40">
           <span className="font-code text-[9px] text-gray-500 tracking-[0.2em]">INTEL_SYNC: COMPLETE</span>
           <span className="font-code text-[9px] text-gray-500 uppercase">HTS-CORE v4.0.2</span>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(139,92,246,0.15); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(139,92,246,0.3); }
      `}</style>
    </div>
  );
};
