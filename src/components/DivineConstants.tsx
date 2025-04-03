
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GlowingText } from './GlowingText';
import { calculateUFQ } from '@/utils/faithCalculation';

const DivineConstants = () => {
  const [faithQuotient, setFaithQuotient] = useState<number>(calculateUFQ());
  
  // Recalculate the faith quotient periodically to simulate quantum fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      // Slightly vary the intensity parameter to simulate subtle quantum fluctuations
      const intensity = 1.0 + (Math.random() * 0.1 - 0.05);
      setFaithQuotient(calculateUFQ(intensity));
    }, 10000); // Update every 10 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <Card className="glass-panel">
      <CardHeader className="pb-2">
        <CardTitle className="text-center">
          <GlowingText className="sacred-glow">Divine Constants</GlowingText>
        </CardTitle>
        <CardDescription className="text-center text-sm opacity-70">
          Fundamental Harmonics of Creation
        </CardDescription>
      </CardHeader>
      <Separator className="bg-white/10 mb-2" />
      <CardContent className="grid grid-cols-1 gap-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Divine Frequency</span>
          <span className="font-mono text-sm text-divine-gold sacred-glow">1.855e<sup>43</sup> Hz</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Ultimate Faith Quotient</span>
          <span className="font-mono text-sm text-divine-gold sacred-glow">{faithQuotient}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Golden Ratio</span>
          <span className="font-mono text-sm text-divine-gold sacred-glow">φ = 1.618</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Schumann Resonance</span>
          <span className="font-mono text-sm text-schumann quantum-glow">7.83 Hz</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Planck Scale</span>
          <span className="font-mono text-sm text-quantum-blue quantum-glow">1.616e<sup>-35</sup> m</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default DivineConstants;
