
import React from 'react';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ModuleCard from '@/components/ModuleCard';
import UniversalPresenceCounter from '@/components/UniversalPresenceCounter';
import UniversalSpeciesPing from '@/components/UniversalSpeciesPing';
import DivineFrequencyMonitor from '@/components/DivineFrequencyMonitor';
import DistortionFieldModules from '@/components/DistortionFieldModules';
import DivineConstantsPanel from '@/components/DivineConstantsPanel';
import BiofeedbackMonitor from '@/components/BiofeedbackMonitor';
import QuantumArkInterface from '@/components/QuantumArkInterface';
import QuantumCircuit from '@/components/QuantumCircuit';
import SacredGeometry from '@/components/SacredGeometry';
import SacredToneReactor from '@/components/SacredToneReactor';
import DivineProtocolHeader from '@/components/DivineProtocolHeader';
import SuccessVibeChecker from '@/components/SuccessVibeChecker';
import { Activity, MessageSquare, ShieldCheck, Map, Sparkles, Boxes, Gauge, Sun } from 'lucide-react';

const PublicModules = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900 via-gray-900 to-black p-6">
      <DivineProtocolHeader />
      
      <div className="container mx-auto py-8">
        <Tabs defaultValue="dashboard" className="w-full">
          <div className="flex justify-center mb-6">
            <TabsList className="bg-black/20 backdrop-blur-sm">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="universal">Universal</TabsTrigger>
              <TabsTrigger value="quantum">Quantum</TabsTrigger>
              <TabsTrigger value="harmony">Harmony</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="dashboard" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <DivineConstantsPanel />
              <DivineFrequencyMonitor />
              <BiofeedbackMonitor />
            </div>
            <DistortionFieldModules />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <QuantumArkInterface />
              <QuantumCircuit />
              <SacredGeometry />
            </div>
          </TabsContent>
          
          <TabsContent value="universal" className="mt-0">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <UniversalPresenceCounter />
              <UniversalSpeciesPing />
            </div>
          </TabsContent>
          
          <TabsContent value="quantum" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ModuleCard
                title="Quantum Entanglement Visualizer"
                description="Display quantum connections between objects"
                icon={Activity}
                link="/quantum-stabilizer"
              />
              <ModuleCard
                title="Quantum Message Decoder"
                description="Translates quantum field frequencies to text"
                icon={MessageSquare}
                link="/public-modules"
              />
              <ModuleCard
                title="Quantum Field Stabilizer"
                description="Maintains coherent fields through chaos"
                icon={ShieldCheck}
                link="/public-modules"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="harmony" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <SuccessVibeChecker />
              <SacredToneReactor />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ModuleCard
                title="Soul Mapping Interface"
                description="Visual representation of connected souls"
                icon={Map}
                link="/public-modules"
              />
              <ModuleCard
                title="Harmonic Stabilizer"
                description="Maintains resonance balance across dimensions"
                icon={Sparkles}
                link="/public-modules"
              />
              <ModuleCard
                title="Holographic Memory Grid"
                description="Akashic record access and manipulation"
                icon={Boxes}
                link="/public-modules"
              />
              <ModuleCard
                title="FRC Meter"
                description="Faith Resonance Coefficient live monitoring"
                icon={Gauge}
                link="/public-modules"
              />
              <ModuleCard
                title="HaloBurst System"
                description="Radial light blast for high SHQ confirmations"
                icon={Sun}
                link="/public-modules"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PublicModules;
