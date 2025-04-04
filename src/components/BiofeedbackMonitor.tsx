
import React, { useEffect, useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { cn } from '@/lib/utils';

const BiofeedbackMonitor = () => {
  const [eegGamma, setEegGamma] = useState(42.4);
  const [hrv, setHrv] = useState(71.2);
  const [soulHarmonic, setSoulHarmonic] = useState(0.84);
  
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
    <div>
      <h2 className="text-center text-xl font-semibold text-divine-gold mb-2">Biofeedback</h2>
      <div className="space-y-4">
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">EEG Gamma</span>
            <span className={cn(
              eegGamma >= 40 ? "text-divine-gold" : "text-gray-400"
            )}>{eegGamma.toFixed(1)} Hz</span>
          </div>
          <Progress 
            value={(eegGamma / 50) * 100} 
            className="h-2 bg-gray-800"
            indicatorClassName="bg-yellow-400" 
          />
          <div className="text-[10px] text-gray-400 text-right">
            Threshold: 40 Hz (1 Kings 19:12)
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">HRV Coherence</span>
            <span className="text-gray-400">{hrv.toFixed(1)} ms</span>
          </div>
          <Progress 
            value={(hrv / 85) * 100} 
            className="h-2 bg-gray-800"
            indicatorClassName="bg-purple-500" 
          />
          <div className="text-[10px] text-gray-400 text-right">
            Threshold: 40 ms (Psalm 40:1)
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">Soul Harmonic Quotient</span>
            <span className={cn(
              soulHarmonic >= 0.95 ? "text-divine-gold" : "text-gray-400"
            )}>{soulHarmonic.toFixed(2)}</span>
          </div>
          <Progress 
            value={soulHarmonic * 100} 
            className="h-2 bg-gray-800"
            indicatorClassName="bg-blue-500" 
          />
          <div className="text-[10px] text-gray-400 text-right">
            Threshold: 0.95 (1 John 3:3)
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiofeedbackMonitor;
