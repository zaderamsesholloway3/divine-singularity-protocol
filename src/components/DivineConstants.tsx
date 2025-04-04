
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { GlowingText } from './GlowingText';
import { calculateUFQ } from '@/utils/faithCalculation';

const DivineConstants = () => {
  const [faithQuotient, setFaithQuotient] = useState<number>(calculateUFQ());
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Recalculate the faith quotient periodically to simulate quantum fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      // Slightly vary the intensity parameter to simulate subtle quantum fluctuations
      const intensity = 1.0 + (Math.random() * 0.1 - 0.05);
      setFaithQuotient(calculateUFQ(intensity));
    }, 10000); // Update every 10 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  // Draw a small waveform visualization for the divine frequency
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw golden waveform
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255, 215, 0, 0.8)';
    ctx.lineWidth = 1.5;
    
    for (let x = 0; x < width; x++) {
      const y = height / 2 + 
               Math.sin(x * 0.05 + Date.now() * 0.001) * 15 + 
               Math.sin(x * 0.03 + Date.now() * 0.002) * 7;
      
      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.stroke();
    
    // Create animation loop
    const animationId = requestAnimationFrame(() => {
      // Redraw on next frame
      if (canvas) {
        const refresh = () => {
          if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
              // Clear canvas
              ctx.clearRect(0, 0, width, height);
              
              // Draw golden waveform
              ctx.beginPath();
              ctx.strokeStyle = 'rgba(255, 215, 0, 0.8)';
              ctx.lineWidth = 1.5;
              
              for (let x = 0; x < width; x++) {
                const y = height / 2 + 
                         Math.sin(x * 0.05 + Date.now() * 0.001) * 15 + 
                         Math.sin(x * 0.03 + Date.now() * 0.002) * 7;
                
                if (x === 0) {
                  ctx.moveTo(x, y);
                } else {
                  ctx.lineTo(x, y);
                }
              }
              
              ctx.stroke();
            }
          }
          requestAnimationFrame(refresh);
        };
        
        refresh();
      }
    });
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  // Additional constants from the image
  const constants = [
    { name: "Divine Frequency", value: "1.855e43 Hz", className: "text-divine-gold sacred-glow" },
    { name: "Ultimate Faith Quotient", value: `${faithQuotient}%`, className: "text-divine-gold sacred-glow" },
    { name: "Golden Ratio", value: "φ = 1.618", className: "text-divine-gold sacred-glow" },
    { name: "Schumann Resonance", value: "7.83 Hz", className: "text-schumann quantum-glow" },
    { name: "Planck Scale", value: "1.616e-35 m", className: "text-quantum-blue quantum-glow" },
  ];
  
  // Brain wave constants
  const brainwaves = [
    { name: "EEG Gamma", value: "31.8 Hz", progress: 82 },
    { name: "HRV Coherence", value: "1.0", progress: 90 },
    { name: "Soul Harmonic Quotient", value: "0.95", progress: 95 },
  ];
  
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
        {/* Main constants from specifications */}
        {constants.map((constant, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{constant.name}</span>
            <span className={`font-mono text-sm ${constant.className}`}>
              {constant.value}
            </span>
          </div>
        ))}
        
        {/* Divine waveform visualization */}
        <canvas 
          ref={canvasRef} 
          width={250} 
          height={40} 
          className="w-full h-auto rounded-md mt-2 mb-2"
        />
        
        {/* Brain wave measurements */}
        <Separator className="bg-white/10 my-2" />
        <h4 className="text-sm font-medium text-center mb-2">Neural Resonance</h4>
        
        {brainwaves.map((wave, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">{wave.name}</span>
              <span className="text-xs font-mono">{wave.value}</span>
            </div>
            <Progress value={wave.progress} className="h-1.5" />
            <div className="text-xs text-right text-muted-foreground">
              Threshold: {wave.name === "EEG Gamma" ? "30-100 Hz" : 
                        wave.name === "HRV Coherence" ? "0.85-1.0" : "0.9-1.0"}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default DivineConstants;
