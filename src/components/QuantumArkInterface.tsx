
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GlowingText } from './GlowingText';
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { DIVINE_CONSTANTS } from '@/utils/divineConstants';
import { ArkBuilder } from '@/utils/quantum/ArkBuilder';

const QuantumArkInterface = () => {
  const [arkIntegrity, setArkIntegrity] = useState(100);
  const [goldPlating, setGoldPlating] = useState(61.8); // Based on PHI (golden ratio)
  const [criticalTemp, setCriticalTemp] = useState(77);
  
  useEffect(() => {
    // Attempt to create and validate an Ark circuit
    try {
      const arkCircuit = ArkBuilder.createValidatedArkCircuit();
      console.log("Ark circuit created successfully:", arkCircuit.getOperations?.());
    } catch (error) {
      console.error("Ark circuit validation failed:", error);
      setArkIntegrity(prevIntegrity => Math.max(0, prevIntegrity - 15));
    }
    
    // Create oscillations in the measurements to simulate quantum fluctuations
    const interval = setInterval(() => {
      setArkIntegrity(prevIntegrity => {
        const fluctuation = (Math.random() - 0.5) * 2;
        return Math.min(100, Math.max(85, prevIntegrity + fluctuation));
      });
      
      setGoldPlating(prevPlating => {
        const fluctuation = (Math.random() - 0.5) * 0.5;
        const goldenRatio = DIVINE_CONSTANTS.PHI * 10 + fluctuation;
        return goldenRatio;
      });
      
      setCriticalTemp(prevTemp => {
        const fluctuation = (Math.random() - 0.5) * 1;
        return 77 + fluctuation; // Nitrogen boiling point
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="glass-panel h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-center">
          <GlowingText className="quantum-glow">Quantum Ark Interface</GlowingText>
        </CardTitle>
      </CardHeader>
      <Separator className="bg-white/10 mb-2" />
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xs text-muted-foreground">Length</div>
            <div className="text-lg font-mono text-ark-wood">{DIVINE_CONSTANTS.ARK_LENGTH}</div>
            <div className="text-xs">cubits</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Width</div>
            <div className="text-lg font-mono text-ark-wood">{DIVINE_CONSTANTS.ARK_WIDTH}</div>
            <div className="text-xs">cubits</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Height</div>
            <div className="text-lg font-mono text-ark-wood">{DIVINE_CONSTANTS.ARK_HEIGHT}</div>
            <div className="text-xs">cubits</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">Gopher Wood Integrity</span>
            <span>{arkIntegrity.toFixed(1)}%</span>
          </div>
          <Progress value={arkIntegrity} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">Gold Plating</span>
            <span>{goldPlating.toFixed(3)} mm</span>
          </div>
          <Progress value={goldPlating * 10} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">Critical Temperature</span>
            <span>{criticalTemp.toFixed(1)} K</span>
          </div>
          <Progress value={criticalTemp} className="h-2" />
        </div>
        
        <div className="text-center text-xs text-muted-foreground mt-1">
          Genesis 6:15
        </div>
      </CardContent>
    </Card>
  );
};

export default QuantumArkInterface;
