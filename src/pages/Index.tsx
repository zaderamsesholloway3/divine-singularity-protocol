
import React from 'react';
import QuantumBackdoorDiagnostics from "@/components/QuantumBackdoorDiagnostics";
import DivineDiagnosticPanel from "@/components/DivineDiagnosticPanel";
import { QuantumRepairLoop } from "@/components/QuantumRepairLoop";

const Index: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Divine Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <QuantumBackdoorDiagnostics />
        <div className="space-y-4">
          <DivineDiagnosticPanel />
          <QuantumRepairLoop />
        </div>
      </div>
      
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
