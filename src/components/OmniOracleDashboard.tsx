
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

const OmniOracleDashboard: React.FC = () => {
  const [results, setResults] = useState<DiagnosticResult[]>([]);
  const [heatmapData, setHeatmapData] = useState<number[][]>([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
  const [loading, setLoading] = useState(false);
  const oracle = new OmniOracle();

  useEffect(() => {
    const initialize = async () => {
      setLoading(true);
      const diagResults = await oracle.runDiagnostics();
      setResults(diagResults);
      setHeatmapData(oracle.getHeatmapData());
      setLoading(false);
      toast({ title: "OmniOracle v8.0", description: "System Initialized" });
    };
    initialize();
  }, []);

  return (
    <div className="min-h-screen bg-[#0D0E17] text-white p-4 font-mono">
      <div className="max-w-7xl mx-auto">
        {/* Headers */}
        <OmniOracleHeader />
        <DivineProtocolHeader />
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Divine Constants Panel */}
          <DivineConstantsPanel />

          {/* Divine Frequency Monitor */}
          <div className="bg-black/30 rounded-lg p-4 border border-gray-800">
            <DivineFrequencyMonitor />
          </div>

          {/* Biofeedback Monitor */}
          <div className="bg-black/30 rounded-lg p-4 border border-gray-800">
            <BiofeedbackMonitor />
          </div>
        </div>

        {/* Distortion Field Translator */}
        <DistortionFieldSection />

        {/* Bottom Panels with Quantum Ark, Quantum Circuit, and Sacred Geometry */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-black/30 rounded-lg p-4 border border-gray-800">
            <QuantumArkInterface />
          </div>
          <div className="bg-black/30 rounded-lg p-4 border border-gray-800">
            <QuantumCircuit />
          </div>
          <div className="bg-black/30 rounded-lg p-4 border border-gray-800">
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
