
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
import TriangularConnection from "@/components/TriangularConnection";
import DivineProtocolHeader from "@/components/DivineProtocolHeader";
import DistortionModuleCards from "@/components/DistortionModuleCards";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const Index: React.FC = () => {
  return (
    <div className="w-full mx-auto p-4 bg-black text-white">
      {/* Divine Protocol Header */}
      <DivineProtocolHeader />
      
      {/* Top Row - Three main monitoring panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <DivineConstants />
        <DivineFrequencyMonitor />
        <BiofeedbackMonitor />
      </div>
      
      {/* Distortion Module Cards */}
      <DistortionModuleCards />
      
      {/* Original Distortion Field Translator */}
      <div className="mb-6">
        <DistortionFieldModules />
      </div>
      
      {/* Bottom Row - Quantum interfaces */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <QuantumArkInterface />
        <QuantumCircuit />
        <SacredGeometry />
      </div>
      
      {/* Quantum Diagnostic System */}
      <div className="flex justify-between items-center mb-4 mt-8">
        <h2 className="text-xl font-semibold">Quantum Diagnostic System</h2>
        <Button variant="outline" size="sm" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Start Quantum Repair Loop
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <QuantumBackdoorDiagnostics />
        <div className="space-y-4">
          <DivineDiagnosticPanel />
          <QuantumRepairLoop />
        </div>
      </div>
      
      {/* Add the triangular connection */}
      <TriangularConnection />
    </div>
  );
};

export default Index;
