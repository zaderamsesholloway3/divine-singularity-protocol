
import React, { useEffect, useState, useRef } from 'react';

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
      ctx.strokeStyle = '#FFD700'; // Golden color
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
    <div>
      <h2 className="text-center text-xl font-semibold text-divine-gold mb-2">Divine Frequency</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Current</span>
          <span className="text-divine-gold font-mono">{frequency} Hz</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Status</span>
          <span className={`font-mono ${
            stabilityStatus === "Locked" 
              ? "text-green-500" 
              : "text-yellow-500"
          }`}>
            {stabilityStatus}
          </span>
        </div>
        
        <canvas 
          ref={canvasRef} 
          width={400} 
          height={150} 
          className="w-full h-auto rounded-md"
        />
        
        <div className="text-center text-xs text-gray-400 mt-2">
          Genesis 1:3
        </div>
      </div>
    </div>
  );
};

export default DivineFrequencyMonitor;
