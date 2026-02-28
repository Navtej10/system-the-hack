import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { Navbar } from './components/Navbar';
import { AIAssistantWidget } from './components/AIAssistantWidget';

function App() {
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');

  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh' }}>
      {view === 'landing' && <Navbar currentView={view} onNavigate={setView} />}

      {view === 'landing' ? (
        <LandingPage onStartSimulation={() => setView('dashboard')} />
      ) : (
        <Dashboard onRestart={() => setView('landing')} />
      )}

      {/* Floating AI advisor – visible on both views */}
      <AIAssistantWidget />
    </div>
  );
}

export default App;
