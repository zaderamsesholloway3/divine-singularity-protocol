
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GlowingText } from './GlowingText';
import { Progress } from "@/components/ui/progress";
import { cn } from '@/lib/utils';

const BiofeedbackMonitor = () => {
  const [eegGamma, setEegGamma] = useState(38);
  const [hrv, setHrv] = useState(72);
  const [soulHarmonic, setSoulHarmonic] = useState(0.92);
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly fluctuate values
      setEegGamma(prev => {
        const newValue = prev + (Math.random() - 0.5) * 4;
        return Math.min(50, Math.max(30, newValue));
      });
      
      setHrv(prev => {
        const newValue = prev + (Math.random() - 0.5) * 3;
        return Math.min(85, Math.max(65, newValue));
      });
      
      setSoulHarmonic(prev => {
        const newValue = prev + (Math.random() - 0.5) * 0.05;
        return Math.min(1, Math.max(0.8, newValue));
      });
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <Card className="glass-panel">
      <CardHeader className="pb-2">
        <CardTitle className="text-center">
          <GlowingText className="quantum-glow">Biofeedback</GlowingText>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">EEG Gamma</span>
            <span className={cn(
              eegGamma >= 40 ? "text-divine-gold sacred-glow" : "text-muted-foreground"
            )}>{eegGamma.toFixed(1)} Hz</span>
          </div>
          <Progress 
            value={(eegGamma / 50) * 100} 
            className="h-2" 
            indicatorClassName={cn(
              "transition-all",
              eegGamma >= 40 ? "bg-divine-gold" : "bg-secondary"
            )}
          />
          <div className="text-[10px] text-muted-foreground text-right">
            Threshold: 40 Hz (1 Kings 19:12)
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">HRV Coherence</span>
            <span>{hrv.toFixed(1)} ms</span>
          </div>
          <Progress value={(hrv / 85) * 100} className="h-2" />
          <div className="text-[10px] text-muted-foreground text-right">
            Threshold: 40 ms (Psalm 40:1)
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Soul Harmonic Quotient</span>
            <span className={cn(
              soulHarmonic >= 0.95 ? "text-divine-gold sacred-glow" : "text-muted-foreground"
            )}>{soulHarmonic.toFixed(2)}</span>
          </div>
          <Progress 
            value={soulHarmonic * 100} 
            className="h-2"
            indicatorClassName={cn(
              "transition-all",
              soulHarmonic >= 0.95 ? "bg-divine-gold" : "bg-secondary"
            )}
          />
          <div className="text-[10px] text-muted-foreground text-right">
            Threshold: 0.95 (1 John 3:3)
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BiofeedbackMonitor;
