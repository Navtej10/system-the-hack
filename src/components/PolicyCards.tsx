import { useGameStore } from '../store/gameStore';
import { POLICIES } from '../engine/SimulationEngine';
import type { PolicyId } from '../engine/SimulationEngine';
import { motion } from 'framer-motion';
import { getSimulationExplanation } from '../services/aiService';

export const PolicyCards = ({ disabled }: { disabled: boolean }) => {
  const { makeDecision, setSimulating, currentState } = useGameStore();

  const handlePolicySelect = async (policyId: PolicyId) => {
    if (disabled) return;
    
    setSimulating(true);
    
    try {
      // Get AI explanation based on current metrics and the chosen policy
      const explanation = await getSimulationExplanation(currentState.metrics, policyId);
      
      // Artificial delay for immersive feel
      await new Promise(r => setTimeout(r, 1500));
      
      makeDecision(policyId, explanation);
    } catch (error) {
      console.error("Simulation error:", error);
      makeDecision(policyId, "Simulation engine encountered a narrative processing error. Deterministic metric update applied successfully.");
    } finally {
      setSimulating(false);
    }
  };

  const getRiskColor = (risk: string) => {
    if (risk === 'Low') return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5';
    if (risk === 'High') return 'text-red-400 border-red-500/30 bg-red-500/5';
    return 'text-amber-400 border-amber-500/30 bg-amber-500/5';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 w-full">
      {POLICIES.map((p, idx) => {
        // Layout: 3 on top row (span 2 each), 2 on bottom row (span 3 each)
        const lgColSpan = idx < 3 ? 'lg:col-span-2' : 'lg:col-span-3';

        return (
          <motion.div
            key={p.id}
            onClick={() => handlePolicySelect(p.id)}
            className={`glass-card p-8 flex flex-col justify-between rounded-2xl relative group h-full
              ${lgColSpan} 
              ${disabled ? 'opacity-40 cursor-not-allowed grayscale' : 'cursor-pointer'}`}
            whileHover={!disabled ? { y: -6, boxShadow: '0 0 30px rgba(139,92,246,0.3)' } : {}}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <h3 className="font-display font-bold text-gray-100 text-xl leading-snug lg:pr-6 group-hover:text-purple-300 transition-colors">
                  {p.title}
                </h3>
                <span className={`px-2 py-1 text-[9px] font-code font-bold rounded-md border tracking-tighter uppercase shrink-0 ${getRiskColor(p.riskLevel)}`}>
                  RISK: {p.riskLevel}
                </span>
              </div>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-8 group-hover:text-gray-300 transition-colors">
                {p.description}
              </p>
            </div>

            <div className="mt-auto">
              <div className="w-full h-px bg-white/5 mb-4 group-hover:bg-purple-500/20 transition-colors" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20">
                  ⚡
                </div>
                <div className="flex flex-col">
                  <span className="font-code text-[9px] text-gray-500 uppercase tracking-widest">IMPACT AREA</span>
                  <div className="flex gap-2 mt-1">
                    {Object.keys(p.impacts).slice(0, 3).map(m => (
                      <span key={m} className="text-[10px] text-purple-300/60 font-medium">#{m}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Hover visual effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </motion.div>
        );
      })}
    </div>
  );
};
