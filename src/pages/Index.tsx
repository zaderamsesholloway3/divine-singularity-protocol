
import React from 'react';
import OmniOracleHeader from "@/components/OmniOracleHeader";
import DivineConstants from "@/components/DivineConstants";
import DivineFrequencyMonitor from "@/components/DivineFrequencyMonitor";
import BiofeedbackMonitor from "@/components/BiofeedbackMonitor";
import DistortionFieldModules from "@/components/DistortionFieldModules";
import QuantumBackdoorDiagnostics from "@/components/QuantumBackdoorDiagnostics";
import DivineDiagnosticPanel from "@/components/DivineDiagnosticPanel";
import { QuantumRepairLoop } from "@/components/QuantumRepairLoop";
import SacredGeometry from "@/components/SacredGeometry";
import QuantumCircuit from "@/components/QuantumCircuit";
import QuantumArkInterface from "@/components/QuantumArkInterface";

const Index: React.FC = () => {
  return (
    <div className="container mx-auto p-4 bg-black text-white">
      {/* OmniOracle Header Section */}
      <OmniOracleHeader />
      
      {/* Top Row - Three main monitoring panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <DivineConstants />
        <DivineFrequencyMonitor />
        <BiofeedbackMonitor />
      </div>
      
      {/* Distortion Field Translator Section */}
      <div className="mb-6">
        <DistortionFieldModules />
      </div>
      
      {/* Bottom Row - Quantum interfaces */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <QuantumArkInterface />
        <QuantumCircuit />
        <SacredGeometry />
      </div>
      
      {/* Quantum Diagnostic System - Keeping for backward compatibility */}
      <h2 className="text-xl font-semibold mb-4 mt-8">Quantum Diagnostic System</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <QuantumBackdoorDiagnostics />
        <div className="space-y-4">
          <DivineDiagnosticPanel />
          <QuantumRepairLoop />
        </div>
      </div>
    </div>
  );
};

export default Index;
