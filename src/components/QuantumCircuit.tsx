
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GlowingText } from './GlowingText';
import { MockQuantumCircuit } from '@/utils/MockQuantumCircuit';
import { DIVINE_CONSTANTS } from '@/utils/divineConstants';

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
    
    // Define quantum circuit parameters - updated to 7-church architecture
    const qubits = DIVINE_CONSTANTS.NUM_CHURCHES; // Seven churches of Revelation
    const qubitSpacing = height / (qubits + 1);
    const gateWidth = 30;
    const gateHeight = 30;
    
    // Create the quantum circuit with 7-church architecture
    const circuit = new MockQuantumCircuit(qubits);
    circuit.h(circuit.range(qubits)); // Apply Hadamard to all qubits (Genesis 1:1 creation operator)
    circuit.rz(DIVINE_CONSTANTS.PHI * Math.PI, [0, 3, 6]); // Trinitarian phase gates
    circuit.cx(0, qubits - 1); // Alpha-Omega connection (first and last qubit)
    
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
      
      // Draw gates - implementing the 7-church architecture
      
      // Hadamard gates on all qubits (Genesis 1:1 creation operator)
      ctx.fillStyle = 'rgba(139, 92, 246, 0.7)';
      ctx.strokeStyle = 'rgba(139, 92, 246, 1)';
      ctx.lineWidth = 1.5;
      
      // Apply H-gates to all 7 qubits
      for (let i = 0; i < qubits; i++) {
        drawGate(width * 0.25, (i + 1) * qubitSpacing, gateWidth, gateHeight, 'H');
      }
      
      // RZ gates on qubits 0, 3, and 6 (Trinitarian phase gates)
      ctx.fillStyle = 'rgba(14, 165, 233, 0.7)';
      ctx.strokeStyle = 'rgba(14, 165, 233, 1)';
      drawGate(width * 0.5, 1 * qubitSpacing, gateWidth, gateHeight, 'RZ');
      drawGate(width * 0.5, 4 * qubitSpacing, gateWidth, gateHeight, 'RZ');
      drawGate(width * 0.5, 7 * qubitSpacing, gateWidth, gateHeight, 'RZ');
      
      // CNOT gates - connecting alpha and omega (first and seventh)
      ctx.strokeStyle = 'rgba(217, 70, 239, 1)';
      ctx.lineWidth = 2;
      
      // Vertical line connecting control and target (1 and 7)
      ctx.beginPath();
      ctx.moveTo(width * 0.75, 1 * qubitSpacing);
      ctx.lineTo(width * 0.75, 7 * qubitSpacing);
      ctx.stroke();
      
      // Control point on qubit 0
      ctx.fillStyle = 'rgba(217, 70, 239, 1)';
      ctx.beginPath();
      ctx.arc(width * 0.75, 1 * qubitSpacing, 5, 0, 2 * Math.PI);
      ctx.fill();
      
      // Target point (⊕) on qubit 6
      ctx.beginPath();
      ctx.arc(width * 0.75, 7 * qubitSpacing, 10, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(width * 0.75 - 10, 7 * qubitSpacing);
      ctx.lineTo(width * 0.75 + 10, 7 * qubitSpacing);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(width * 0.75, 7 * qubitSpacing - 10);
      ctx.lineTo(width * 0.75, 7 * qubitSpacing + 10);
      ctx.stroke();
      
      // Additional entanglement between qubits 2 and 4 (middle churches)
      ctx.beginPath();
      ctx.moveTo(width * 0.6, 3 * qubitSpacing);
      ctx.lineTo(width * 0.6, 5 * qubitSpacing);
      ctx.stroke();
      
      // Control point
      ctx.beginPath();
      ctx.arc(width * 0.6, 3 * qubitSpacing, 5, 0, 2 * Math.PI);
      ctx.fill();
      
      // Target point (⊕)
      ctx.beginPath();
      ctx.arc(width * 0.6, 5 * qubitSpacing, 10, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(width * 0.6 - 10, 5 * qubitSpacing);
      ctx.lineTo(width * 0.6 + 10, 5 * qubitSpacing);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(width * 0.6, 5 * qubitSpacing - 10);
      ctx.lineTo(width * 0.6, 5 * qubitSpacing + 10);
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
      // Draw waves for all qubits (more elaborate wave pattern for 7-church architecture)
      for (let i = 0; i < qubits; i++) {
        const y = (i + 1) * qubitSpacing;
        
        // Wave amplitude decreases with qubit number to show hierarchical effect
        const amplitude = 5 - Math.min(4, i * 0.5);
        const frequency = 0.1 + (i % 3) * 0.02; // Slight frequency variation
        const speed = 80 + i * 5;
        
        // Different colors for different types of qubits
        if (i === 0 || i === 3 || i === 6) {
          // Trinitarian qubits (0, 3, 6)
          ctx.strokeStyle = 'rgba(139, 92, 246, 0.6)'; // Purple
        } else if (i === 1 || i === 5) {
          // Messenger qubits (1, 5)
          ctx.strokeStyle = 'rgba(14, 165, 233, 0.6)'; // Blue
        } else {
          // Witness qubits (2, 4)
          ctx.strokeStyle = 'rgba(249, 115, 22, 0.6)'; // Orange
        }
        
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        for (let x = 20; x < width - 20; x++) {
          // Only draw wave after H gate position
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
          <GlowingText className="quantum-glow">Seven-Church Quantum Circuit</GlowingText>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2 pt-0">
        <canvas 
          ref={canvasRef} 
          width={300} 
          height={300} 
          className="w-full h-auto rounded-md"
        />
      </CardContent>
    </Card>
  );
};

export default QuantumCircuit;
