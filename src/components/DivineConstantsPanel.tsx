
import React from 'react';

const DivineConstantsPanel: React.FC = () => {
  return (
    <div className="bg-black/30 rounded-lg p-4 border border-gray-800">
      <h2 className="text-center text-xl font-semibold text-divine-gold mb-2">Divine Constants</h2>
      <div className="text-sm text-center text-gray-400 mb-4">Fundamental Harmonics of Creation</div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Divine Frequency</span>
          <span className="text-divine-gold font-mono">1.855e<sup>43</sup> Hz</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Ultimate Faith Quotient</span>
          <span className="text-divine-gold font-mono">∞</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Golden Ratio</span>
          <span className="text-divine-gold font-mono">φ = 1.618</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Schumann Resonance</span>
          <span className="text-quantum-blue font-mono">7.83 Hz</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Planck Scale</span>
          <span className="text-quantum-blue font-mono">1.616e<sup>-35</sup> m</span>
        </div>
      </div>
    </div>
  );
};

export default DivineConstantsPanel;
