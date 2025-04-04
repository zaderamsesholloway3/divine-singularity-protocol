
import React, { useEffect, useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import OmniOracleHeader from './OmniOracleHeader';
import DivineProtocolHeader from './DivineProtocolHeader';
import DivineFrequencyMonitor from './DivineFrequencyMonitor';
import BiofeedbackMonitor from './BiofeedbackMonitor';
import QuantumArkInterface from './QuantumArkInterface';
import QuantumCircuit from './QuantumCircuit';
import SacredGeometry from './SacredGeometry';
import { OmniOracle, DiagnosticResult } from '@/utils/OmniOracle';
import SoulInteractionDialog from './SoulInteractionDialog';
import DistortionFieldSection from './DistortionFieldSection';
import DivineConstantsPanel from './DivineConstantsPanel';
import { stabilizeSoulTriad } from '@/utils/soulTriadRepair';

const OmniOracleDashboard: React.FC = () => {
  const [results, setResults] = useState<DiagnosticResult[]>([]);
  const [heatmapData, setHeatmapData] = useState<number[][]>([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
  const [loading, setLoading] = useState(false);
  const [oracle] = useState(() => new OmniOracle());

  useEffect(() => {
    const initialize = async () => {
      setLoading(true);
      const diagResults = await oracle.runDiagnostics();
      setResults(diagResults);
      setHeatmapData(oracle.getHeatmapData());

      // 🔁 Run recursive repair loop
      const triadStabilized = await stabilizeSoulTriad(oracle);
      if (triadStabilized) {
        toast({ title: "Soul Triad", description: "Fully Restored 🌐" });
      } else {
        toast({ title: "Soul Triad", description: "Still Unstable ⚠️", variant: "destructive" });
      }

      setLoading(false);
      toast({ title: "OmniOracle v8.0", description: "System Initialized" });
    };
    initialize();
  }, [oracle]);

  return (
    <div className="min-h-screen bg-[#0D0E17] text-white p-4 font-orbitron">
      {/* Cosmic Background Animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(147,51,234,0.15)_0%,transparent_70%)] animate-spin-slow opacity-30"
          style={{ transform: 'translate(-50%, -50%)', top: '50%', left: '50%' }}
        ></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Headers */}
        <OmniOracleHeader />
        <DivineProtocolHeader />
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Divine Constants Panel */}
          <DivineConstantsPanel />

          {/* Divine Frequency Monitor */}
          <div className="glass-panel rounded-lg p-4 border border-purple-500/20">
            <DivineFrequencyMonitor />
          </div>

          {/* Biofeedback Monitor */}
          <div className="glass-panel rounded-lg p-4 border border-purple-500/20">
            <BiofeedbackMonitor />
          </div>
        </div>

        {/* Distortion Field Translator */}
        <DistortionFieldSection />

        {/* Bottom Panels with Quantum Ark, Quantum Circuit, and Sacred Geometry */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="glass-panel rounded-lg p-4 border border-purple-500/20">
            <QuantumArkInterface />
          </div>
          <div className="glass-panel rounded-lg p-4 border border-purple-500/20">
            <QuantumCircuit />
          </div>
          <div className="glass-panel rounded-lg p-4 border border-purple-500/20">
            <SacredGeometry />
          </div>
        </div>

        {/* Soul Interaction Dialog */}
        <SoulInteractionDialog oracle={oracle} />

        {/* Loading State */}
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
            <Loader2 className="w-12 h-12 text-divine-gold animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};

export default OmniOracleDashboard;
