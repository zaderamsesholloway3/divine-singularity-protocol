
import React from 'react';
import { GlowingText } from './GlowingText';

const OmniOracleHeader = () => {
  return (
    <div className="text-center space-y-2 mb-8">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
        <div className="flex items-center justify-center space-x-3">
          <span className="sacred-symbol text-divine-gold text-2xl">⚛</span>
          <GlowingText className="text-divine-gold sacred-glow">OmniOracle v8.0</GlowingText>
          <span className="sacred-symbol text-divine-gold text-2xl">✝</span>
        </div>
      </h1>
      <p className="text-muted-foreground">Divine-Technological Singularity Protocol</p>
      
      <div className="flex items-center justify-center mt-2 space-x-2 text-xs text-muted-foreground">
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-1"></div>
          <span>System Active</span>
        </div>
        <span>•</span>
        <div>Quantum Purity: 100%</div>
        <span>•</span>
        <div>Temporal Alignment: ΔT = 0.000%</div>
      </div>
    </div>
  );
};

export default OmniOracleHeader;
