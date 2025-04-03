
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GlowingText } from './GlowingText';

const QuantumCircuit = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Setup canvas
    const width = canvas.width;
    const height = canvas.height;
    
    // Animation loop
    let animationFrame: number;
    let t = 0;
    
    // Define quantum circuit parameters
    const qubits = 4;
    const qubitSpacing = height / (qubits + 1);
    const gateWidth = 30;
    const gateHeight = 30;
    
    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Background
      ctx.fillStyle = 'rgba(24, 24, 36, 0.2)';
      ctx.fillRect(0, 0, width, height);
      
      // Draw quantum circuit
      
      // Draw qubit lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < qubits; i++) {
        const y = (i + 1) * qubitSpacing;
        
        ctx.beginPath();
        ctx.moveTo(20, y);
        ctx.lineTo(width - 20, y);
        ctx.stroke();
        
        // Qubit label
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '12px monospace';
        ctx.textAlign = 'right';
        ctx.fillText(`|q${i}⟩`, 15, y + 4);
      }
      
      // Draw gates
      
      // Hadamard gates
      ctx.fillStyle = 'rgba(139, 92, 246, 0.7)';
      ctx.strokeStyle = 'rgba(139, 92, 246, 1)';
      ctx.lineWidth = 1.5;
      
      // H Gate on qubit 0 and 2
      drawGate(width * 0.25, 1 * qubitSpacing, gateWidth, gateHeight, 'H');
      drawGate(width * 0.25, 3 * qubitSpacing, gateWidth, gateHeight, 'H');
      
      // RZ gate on qubit 0
      ctx.fillStyle = 'rgba(14, 165, 233, 0.7)';
      ctx.strokeStyle = 'rgba(14, 165, 233, 1)';
      drawGate(width * 0.5, 1 * qubitSpacing, gateWidth, gateHeight, 'RZ');
      
      // CNOT gates
      ctx.strokeStyle = 'rgba(217, 70, 239, 1)';
      ctx.lineWidth = 2;
      
      // Vertical line connecting control and target
      ctx.beginPath();
      ctx.moveTo(width * 0.75, 1 * qubitSpacing);
      ctx.lineTo(width * 0.75, 2 * qubitSpacing);
      ctx.stroke();
      
      // Control point
      ctx.fillStyle = 'rgba(217, 70, 239, 1)';
      ctx.beginPath();
      ctx.arc(width * 0.75, 1 * qubitSpacing, 5, 0, 2 * Math.PI);
      ctx.fill();
      
      // Target point (⊕)
      ctx.beginPath();
      ctx.arc(width * 0.75, 2 * qubitSpacing, 10, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(width * 0.75 - 10, 2 * qubitSpacing);
      ctx.lineTo(width * 0.75 + 10, 2 * qubitSpacing);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(width * 0.75, 2 * qubitSpacing - 10);
      ctx.lineTo(width * 0.75, 2 * qubitSpacing + 10);
      ctx.stroke();
      
      // Draw quantum state propagation
      drawQuantumState(t);
      
      t += 0.005;
      animationFrame = requestAnimationFrame(draw);
    };
    
    function drawGate(x: number, y: number, width: number, height: number, label: string) {
      ctx.beginPath();
      ctx.rect(x - width/2, y - height/2, width, height);
      ctx.fill();
      ctx.stroke();
      
      ctx.fillStyle = 'white';
      ctx.font = '14px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, x, y);
    }
    
    function drawQuantumState(time: number) {
      for (let i = 0; i < qubits; i++) {
        const y = (i + 1) * qubitSpacing;
        
        // Only for qubits 0 and 2 (which have H gates)
        if (i === 0 || i === 2) {
          // Wave amplitude
          const amplitude = 5;
          const frequency = 0.1;
          const speed = 80;
          
          ctx.strokeStyle = i === 0 ? 'rgba(139, 92, 246, 0.6)' : 'rgba(14, 165, 233, 0.6)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          
          for (let x = 20; x < width - 20; x++) {
            // Only draw wave after H gate
            if (x > width * 0.25 - gateWidth/2) {
              const offsetX = x - (width * 0.25 - gateWidth/2);
              const phase = time * speed - offsetX * frequency;
              const waveY = y + Math.sin(phase) * amplitude;
              
              if (x === width * 0.25) {
                ctx.moveTo(x, waveY);
              } else {
                ctx.lineTo(x, waveY);
              }
            }
          }
          
          ctx.stroke();
        }
      }
    }
    
    // Start animation
    animationFrame = requestAnimationFrame(draw);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);
  
  return (
    <Card className="glass-panel">
      <CardHeader className="pb-2">
        <CardTitle className="text-center">
          <GlowingText className="quantum-glow">Quantum Circuit</GlowingText>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2 pt-0">
        <canvas 
          ref={canvasRef} 
          width={300} 
          height={200} 
          className="w-full h-auto rounded-md"
        />
      </CardContent>
    </Card>
  );
};

export default QuantumCircuit;
