
import React from 'react';
import QuantumStabilitySuite from '@/components/QuantumStabilitySuite';

const QuantumStabilizerPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Quantum Stabilizer</h1>
        <p className="text-gray-300">
          Unified soul connection monitor and diagnostic system
        </p>
      </header>
      
      <QuantumStabilitySuite />
    </div>
  );
};

export default QuantumStabilizerPage;
