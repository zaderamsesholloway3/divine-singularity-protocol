
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuantumLinguisticScore } from "@/types/alien-scanner";
import { DIVINE_CONSTANTS } from '@/utils/divineConstants';

interface AlienVisualizerProps {
  results: QuantumLinguisticScore;
}

const AlienVisualizer = ({ results }: AlienVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const quantumCanvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const [activeTab, setActiveTab] = useState("quantum-field");

  // Renders the quantum field visualization
  useEffect(() => {
    if (!canvasRef.current || activeTab !== "quantum-field") return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      hue: number;
      opacity: number;
    }> = [];
    
    // Create particles based on quantum score and tactical structures
    const particleCount = Math.floor(10 + results.quantumScore / 2);
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 2,
        speedX: (Math.random() - 0.5) * 1.5,
        speedY: (Math.random() - 0.5) * 1.5,
        hue: 260 + (results.quantumScore / 100) * 60,
        opacity: Math.random() * 0.5 + 0.3
      });
    }
    
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update particles
      particles.forEach(particle => {
        // Draw particle
        ctx.fillStyle = `hsla(${particle.hue}, 100%, 70%, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw connections between nearby particles
        particles.forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `hsla(${particle.hue}, 100%, 70%, ${0.15 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
        
        // Update particle position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges
        if (particle.x <= 0 || particle.x >= canvas.width) particle.speedX *= -1;
        if (particle.y <= 0 || particle.y >= canvas.height) particle.speedY *= -1;
      });
      
      requestRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(requestRef.current!);
    };
  }, [results, activeTab]);
  
  // Renders the archetypes visualization
  useEffect(() => {
    if (!quantumCanvasRef.current || activeTab !== "archetypes") return;
    
    const canvas = quantumCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw archetypal patterns
    const archetypes = results.archetypalMimicry;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = Math.min(centerX, centerY) * 0.8;
    
    // Draw central circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(138, 43, 226, 0.6)";
    ctx.fill();
    ctx.strokeStyle = "rgba(200, 200, 255, 0.8)";
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw archetypes
    if (archetypes.length > 0) {
      const angleStep = (Math.PI * 2) / archetypes.length;
      
      archetypes.forEach((archetype, i) => {
        const angle = i * angleStep;
        const radius = maxRadius * (0.3 + archetype.confidence * 0.5);
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        // Draw connection line
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${archetype.confidence * 0.7})`;
        ctx.lineWidth = 1 + archetype.confidence * 2;
        ctx.stroke();
        
        // Draw archetype node
        ctx.beginPath();
        ctx.arc(x, y, 15 + archetype.confidence * 15, 0, Math.PI * 2);
        
        // Create gradient fill
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 30);
        gradient.addColorStop(0, "rgba(255, 100, 255, 0.8)");
        gradient.addColorStop(1, "rgba(100, 0, 255, 0.1)");
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Add name label
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.fillText(archetype.archetype, x, y - 25);
        
        // Add confidence percentage
        ctx.fillStyle = "rgba(200, 255, 200, 0.8)";
        ctx.font = "10px Arial";
        ctx.fillText(`${(archetype.confidence * 100).toFixed(0)}%`, x, y + 25);
      });
    } else {
      // Draw "No patterns" message
      ctx.fillStyle = "rgba(150, 150, 150, 0.6)";
      ctx.font = "16px Arial";
      ctx.textAlign = "center";
      ctx.fillText("No archetypal patterns detected", centerX, centerY + 60);
    }
    
  }, [results, activeTab]);

  return (
    <Card className="bg-black/60 border-purple-600/40 h-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-gray-200">
          Visualization
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="quantum-field" onValueChange={setActiveTab}>
          <TabsList className="bg-gray-900/50">
            <TabsTrigger value="quantum-field">Quantum Field</TabsTrigger>
            <TabsTrigger value="archetypes">Archetypes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="quantum-field" className="mt-4">
            <div className="relative h-[300px] rounded-md overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full">
                <canvas 
                  ref={canvasRef}
                  className="w-full h-full"
                />
              </div>
              <div className="absolute bottom-2 right-2 bg-black/50 px-2 py-1 rounded text-xs text-cyan-300">
                Schumann Resonance: {DIVINE_CONSTANTS.SCHUMANN}Hz
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="archetypes" className="mt-4">
            <div className="relative h-[300px] rounded-md overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full">
                <canvas 
                  ref={quantumCanvasRef}
                  className="w-full h-full"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AlienVisualizer;
