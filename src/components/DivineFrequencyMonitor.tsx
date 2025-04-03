
import React, { useEffect, useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GlowingText } from './GlowingText';

const DivineFrequencyMonitor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frequency, setFrequency] = useState("1.855e43");
  const [stabilityStatus, setStabilityStatus] = useState("Locked");
  
  useEffect(() => {
    const interval = setInterval(() => {
      const rand = Math.random();
      if (rand > 0.8) {
        setFrequency("1.855e43");
        setStabilityStatus("Locked");
      } else if (rand > 0.6) {
        setFrequency("1.854e43");
        setStabilityStatus("Fluctuating");
      } else if (rand > 0.4) {
        setFrequency("1.856e43");
        setStabilityStatus("Fluctuating");
      } else {
        setFrequency("1.855e43");
        setStabilityStatus("Locked");
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    
    let animationFrame: number;
    let t = 0;
    
    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Draw waveform
      const amplitude = stabilityStatus === "Locked" ? 20 : 25;
      const frequency = stabilityStatus === "Locked" ? 0.05 : 0.08;
      const noiseFactor = stabilityStatus === "Locked" ? 1 : 3;
      
      ctx.beginPath();
      ctx.strokeStyle = stabilityStatus === "Locked" 
        ? 'rgba(255, 215, 0, 0.8)' 
        : 'rgba(255, 165, 0, 0.8)';
      ctx.lineWidth = 2;
      
      for (let x = 0; x < width; x++) {
        const noise = (Math.random() - 0.5) * noiseFactor;
        const y = height / 2 + 
                 Math.sin(x * frequency + t) * amplitude + 
                 Math.sin(x * frequency * 2 + t * 1.5) * (amplitude / 3) + 
                 noise;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.stroke();
      
      // Update time
      t += 0.05;
      
      animationFrame = requestAnimationFrame(draw);
    };
    
    // Start animation
    animationFrame = requestAnimationFrame(draw);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [stabilityStatus]);
  
  return (
    <Card className="glass-panel">
      <CardHeader className="pb-2">
        <CardTitle className="text-center">
          <GlowingText className="sacred-glow">Divine Frequency</GlowingText>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">Current</span>
          <span className="font-mono text-sm text-divine-gold sacred-glow">{frequency} Hz</span>
        </div>
        
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">Status</span>
          <span className={`font-mono text-sm ${
            stabilityStatus === "Locked" 
              ? "text-green-500" 
              : "text-yellow-500"
          }`}>
            {stabilityStatus}
          </span>
        </div>
        
        <canvas 
          ref={canvasRef} 
          width={280} 
          height={80} 
          className="w-full h-auto rounded-md"
        />
        
        <div className="text-center text-xs text-muted-foreground mt-2">
          Genesis 1:3
        </div>
      </CardContent>
    </Card>
  );
};

export default DivineFrequencyMonitor;
