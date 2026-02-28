import { useGameStore } from '../store/gameStore';
import { motion } from 'framer-motion';

export const MetricsPanel = () => {
  const { currentState } = useGameStore();
  const { metrics } = currentState;

  const metricItems = [
    { key: 'employment',       label: 'Employment',  value: metrics.employment,  icon: '👥' },
    { key: 'economy',          label: 'Economy',     value: metrics.economy,     icon: '📈' },
    { key: 'publicHappiness',  label: 'Happiness',   value: metrics.publicHappiness, icon: '😊' },
    { key: 'inequality',       label: 'Equality',    value: metrics.inequality,    icon: '⚖️' }, 
    { key: 'governmentBudget', label: 'Budget',      value: metrics.governmentBudget, icon: '💰' },
  ];

  const getColor = (val: number) => {
    if (val >= 70) return '#10b981'; // Success
    if (val >= 40) return '#f59e0b'; // Warning
    return '#ef4444'; // Danger
  };

  return (
    <div className="w-full h-full glass-card rounded-2xl p-8 flex flex-col justify-center gap-10">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
        {metricItems.map((m) => {
          const color = getColor(m.value);
          const circumference = 2 * Math.PI * 40;
          const offset = circumference - (m.value / 100) * circumference;

          return (
            <div key={m.key} className="flex flex-col items-center group">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">{m.icon}</span>
                <span className="font-code text-[11px] text-gray-400 font-bold tracking-[0.2em] uppercase group-hover:text-purple-400 transition-colors">
                  {m.label}
                </span>
              </div>
              
              <div className="relative w-32 h-32 lg:w-40 lg:h-40">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="rgba(255,255,255,0.03)" strokeWidth="6" />
                  <motion.circle
                    cx="50" cy="50" r="40" fill="transparent"
                    stroke={color} strokeWidth="7"
                    strokeLinecap="round" strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    style={{ filter: `drop-shadow(0 0 8px ${color})` }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span 
                    animate={{ color }}
                    className="font-display font-bold text-3xl lg:text-4xl"
                  >
                    {Math.round(m.value)}
                  </motion.span>
                  <span className="font-code text-[9px] text-gray-600 font-bold">%</span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Strategic Target Card (6th slot) */}
        <div className="flex flex-col items-center justify-center rounded-2xl border border-purple-500/10 bg-purple-500/[0.02] p-6 text-center">
          <div className="text-purple-500/40 text-2xl mb-3">🎯</div>
          <div className="font-code text-[10px] text-purple-400/50 uppercase tracking-widest leading-relaxed">
            Target State:<br/>
            <span className="text-purple-400/80">All Metrics &gt; 75</span>
          </div>
          <div className="w-12 h-[1px] bg-purple-900/40 my-3 mx-auto" />
          <div className="font-code text-[9px] text-gray-600 italic">
            "Balance innovation<br/>with social safety"
          </div>
        </div>
      </div>
    </div>
  );
};
