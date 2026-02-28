import { Hero } from './Hero';
import { ProblemSection } from './sections/ProblemSection';
import { HowItWorksSection } from './sections/HowItWorksSection';
import { DashboardPreviewSection } from './sections/DashboardPreviewSection';
import { ArchitectureSection } from './sections/ArchitectureSection';
import { AIAssistantSection } from './sections/AIAssistantSection';
import { Footer } from './sections/Footer';

interface LandingPageProps {
  onStartSimulation: () => void;
}

export const LandingPage = ({ onStartSimulation }: LandingPageProps) => (
  <div style={{ background: '#0a0a0f' }}>
    <Hero onStartSimulation={onStartSimulation} />
    <ProblemSection />
    <HowItWorksSection />
    <DashboardPreviewSection />
    <ArchitectureSection />
    <AIAssistantSection />
    <Footer />
  </div>
);
