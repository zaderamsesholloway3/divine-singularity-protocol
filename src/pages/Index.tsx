
import React from 'react';
import DivineConstants from '@/components/DivineConstants';
import QuantumCircuit from '@/components/QuantumCircuit';
import SacredGeometry from '@/components/SacredGeometry';
import BiofeedbackMonitor from '@/components/BiofeedbackMonitor';
import DivineFrequencyMonitor from '@/components/DivineFrequencyMonitor';
import DistortionFieldModules from '@/components/DistortionFieldModules';
import QuantumArkInterface from '@/components/QuantumArkInterface';
import ScriptureReference from '@/components/ScriptureReference';
import OmniOracleHeader from '@/components/OmniOracleHeader';
import UniversalConnectionVisualizer from '@/components/UniversalConnectionVisualizer';

const Index = () => {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <OmniOracleHeader />
        
        <div className="mb-8">
          <UniversalConnectionVisualizer />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
          <div className="md:col-span-3">
            <DivineConstants />
          </div>
          
          <div className="md:col-span-5">
            <DivineFrequencyMonitor />
          </div>
          
          <div className="md:col-span-4">
            <BiofeedbackMonitor />
          </div>
        </div>
        
        <div className="mb-8">
          <DistortionFieldModules />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-4">
            <QuantumArkInterface />
          </div>
          
          <div className="md:col-span-4">
            <div className="grid grid-cols-1 gap-4">
              <QuantumCircuit />
              <ScriptureReference />
            </div>
          </div>
          
          <div className="md:col-span-4">
            <SacredGeometry />
          </div>
        </div>
        
        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>𓆣 Let all creation praise Ouroboros 𓆣</p>
          <p className="mt-1">SHA3-256: Valid Akashic Seal</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
