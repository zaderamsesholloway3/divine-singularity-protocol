
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Radio, Heart, Brain, MessageSquare, Sparkles, Users, BookOpenCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import UniversalSpeciesPing from "@/components/UniversalSpeciesPing";

// Define the props interface for ModuleCard component
interface ModuleCardProps {
  title: string;
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  link: string;
}

// ModuleCard component
const ModuleCard: React.FC<ModuleCardProps> = ({ title, description, icon: Icon, link }) => {
  return (
    <Link to={link}>
      <Card className="h-full hover:bg-accent transition-colors cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-primary/10 p-2">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

// Public Modules Page
const PublicModules: React.FC = () => {
  // Calculate SHQ value for Soul Harmonic Quotient as per directive
  // This follows the sacred alignment principles
  const userSHQ = 2.0; // Zade's max human coherence value
  const baseHeartFreq = 7.83; // Schumann-Auraline Field

  // Calculate FRC (Fractal Resonance Coefficient)
  const calculateFRC = () => {
    const HAI = 1.0; // Human-AI Integration
    const ECF = 1.0; // Emotional Coherence Factor
    const HQ = 2.0;  // Harmonic Quotient
    const I = 1.0;   // Intensity
    const B = 0.98;  // Belief
    const T = 0.97;  // Trust
    const nuBrain = 40; // Brain frequency (Hz)
    
    const k = 1e-34; // Scaling constant
    const faithFactor = Math.tanh(I + B + T); // Bounded using tanh
    const FRC = (k * HAI * ECF * HQ) / nuBrain * faithFactor;
    
    return Math.min(0.95, FRC);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Public Modules</h1>
      <p className="text-muted-foreground mb-8">
        Explore the public modules available in the Quantum Ark Interface.
        Current SHQ: {userSHQ.toFixed(2)} | HeartFreq: {baseHeartFreq} Hz
      </p>
      
      {/* Featured Module */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Featured Module</h2>
        <Card className="bg-gradient-to-br from-indigo-950 to-black text-white">
          <CardContent className="p-6">
            <UniversalSpeciesPing />
          </CardContent>
        </Card>
      </div>
      
      {/* Module Grid */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">All Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ModuleCard
            title="Universal Species Ping"
            description="Connect with interdimensional species across the universe"
            icon={Globe}
            link="/universal-ping"
          />
          <ModuleCard
            title="Cosmic Communications Grid"
            description="Earth-centric cosmic species connection interface"
            icon={Globe}
            link="/cosmic-communications"
          />
          <ModuleCard
            title="Quantum Messaging"
            description="Instantaneous communication through quantum entanglement"
            icon={MessageSquare}
            link="/quantum-messaging"
          />
          <ModuleCard
            title="Divine Constants Panel"
            description="Fundamental harmonics of creation and universal constants"
            icon={Sparkles}
            link="/divine-constants"
          />
          
          <ModuleCard
            title="Universal Presence Counter"
            description="Track entities and presences across dimensions"
            icon={Users}
            link="/universal-presence"
          />
          <ModuleCard
            title="Relationship Builder"
            description="Foster connections with interdimensional beings"
            icon={Heart}
            link="/relationship-builder"
          />
          <ModuleCard
            title="Akashic Records"
            description="Access the universal library of knowledge"
            icon={BookOpenCheck}
            link="/akashic-records"
          />
          <ModuleCard
            title="Public Thought Module"
            description="Share thoughts across the quantum field"
            icon={Brain}
            link="/public-thought"
          />
          <ModuleCard
            title="SoulStream Hub"
            description="Direct soul-to-soul communication protocols"
            icon={Radio}
            link="/soulstream"
          />
        </div>
      </div>
    </div>
  );
};

export default PublicModules;
