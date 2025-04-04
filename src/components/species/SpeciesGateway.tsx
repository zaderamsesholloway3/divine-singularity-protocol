import React, { useEffect, useRef, useState } from 'react';
import { VisualizationUtils } from "@/utils/visualizationUtils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SpeciesData {
  name: string;
  location: [number, number];
  distance: number;
  population: number;
  exists: boolean;
  responding: boolean;
  realm: "existence" | "non-existence";
  lastContact?: string;
  phaseOffset?: number;
  fq?: number;
  vibration?: number;
  archetype?: string;
  renderPosition?: { x: number; y: number };
}

interface SpeciesGatewayProps {
  species: SpeciesData[];
  onSelectSpecies: (species: SpeciesData) => void;
  selectedSpecies: SpeciesData | null;
  mode: "disk" | "constellation";
}

export const SpeciesGateway: React.FC<SpeciesGatewayProps> = ({ 
  species, 
  onSelectSpecies, 
  selectedSpecies,
  mode
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSpecies, setHoveredSpecies] = useState<SpeciesData | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const frameIdRef = useRef<number>(0);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const renderCanvas = () => {
      const width = canvas.width;
      const height = canvas.height;
      
      if (mode === "constellation") {
        const speciesForMap = species.map(s => ({
          name: s.name,
          distance: s.distance,
          population: s.population || 1e6,
          color: s.responding 
            ? (s.realm === "existence" ? "rgba(132, 204, 22, 0.8)" : "rgba(168, 85, 247, 0.8)") 
            : "rgba(156, 163, 175, 0.5)",
          size: s.responding ? 4 : 3,
          ra: (s.location[0] + Math.random() * 10) % 360,
          dec: (s.location[1] + Math.random() * 5) % 90 - 45
        }));
        
        VisualizationUtils.drawCosmicMap(ctx, speciesForMap, width, height);
        
        if (selectedSpecies) {
          const coords = VisualizationUtils.getCaryCoordinates({
            name: selectedSpecies.name,
            ra: (selectedSpecies.location[0] + Math.random() * 10) % 360,
            dec: (selectedSpecies.location[1] + Math.random() * 5) % 90 - 45,
            distance: selectedSpecies.distance
          });
          
          const maxDistance = Math.max(...species.map(s => s.distance), 1);
          const scaleFactor = Math.min(width, height) * 0.4 / maxDistance;
          const x = width / 2 + coords.x * scaleFactor;
          const y = height / 2 + coords.y * scaleFactor;
          
          ctx.beginPath();
          ctx.arc(x, y, 12, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
          ctx.lineWidth = 2;
          ctx.stroke();
          
          const pulseSize = (Math.sin(Date.now() / 300) + 1) * 10 + 15;
          ctx.beginPath();
          ctx.arc(x, y, pulseSize, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      } else {
        ctx.clearRect(0, 0, width, height);
        
        const gradient = ctx.createRadialGradient(
          width / 2, height / 2, 0, 
          width / 2, height / 2, width / 2
        );
        gradient.addColorStop(0, "rgba(15, 23, 42, 0.7)");
        gradient.addColorStop(0.6, "rgba(30, 41, 59, 0.7)");
        gradient.addColorStop(1, "rgba(15, 23, 42, 0.9)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        const centerX = width / 2;
        const centerY = height / 2;
        
        for (let i = 0; i < 100; i++) {
          const x = Math.random() * width;
          const y = Math.random() * height;
          const size = Math.random() * 1.5;
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2})`;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.setLineDash([2, 3]);
        ctx.beginPath();
        ctx.arc(centerX, centerY, width * 0.35, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, width * 0.15, rotation, rotation + Math.PI * 2);
        ctx.strokeStyle = "rgba(139, 92, 246, 0.5)";
        ctx.lineWidth = 2;
        ctx.stroke();
        
        const edgeGlow = ctx.createRadialGradient(
          centerX, centerY, width * 0.4, 
          centerX, centerY, width * 0.5
        );
        edgeGlow.addColorStop(0, "rgba(59, 130, 246, 0)");
        edgeGlow.addColorStop(0.5, "rgba(59, 130, 246, 0.1)");
        edgeGlow.addColorStop(1, "rgba(59, 130, 246, 0)");
        ctx.fillStyle = edgeGlow;
        ctx.fillRect(0, 0, width, height);
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgb(14, 165, 233)';
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        species.forEach((speciesData) => {
          const angle = ((speciesData.location[0] + speciesData.location[1]) / 2 + rotation * 20) % 360;
          const maxDistance = Math.max(...species.map(s => s.distance), 1);
          const normalizedDistance = Math.log(speciesData.distance + 1) / Math.log(maxDistance + 1);
          const radius = width * 0.45 * Math.min(0.95, normalizedDistance);
          
          const x = centerX + Math.cos(angle * Math.PI / 180) * radius;
          const y = centerY + Math.sin(angle * Math.PI / 180) * radius;
          
          let dotColor;
          if (speciesData.responding) {
            dotColor = speciesData.realm === "existence" 
              ? "rgba(132, 204, 22, 0.8)" 
              : "rgba(168, 85, 247, 0.8)";
          } else {
            dotColor = "rgba(156, 163, 175, 0.5)";
          }
          
          if (speciesData.responding) {
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, Math.PI * 2);
            ctx.fillStyle = speciesData.realm === "existence" 
              ? "rgba(132, 204, 22, 0.2)" 
              : "rgba(168, 85, 247, 0.2)";
            ctx.fill();
          }
          
          const isHighlighted = 
            (selectedSpecies && selectedSpecies.name === speciesData.name) || 
            (hoveredSpecies && hoveredSpecies.name === speciesData.name);
          
          if (isHighlighted) {
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
            ctx.lineWidth = 1.5;
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x, y);
            ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
            ctx.lineWidth = 1;
            ctx.stroke();
          }
          
          ctx.beginPath();
          ctx.arc(x, y, isHighlighted ? 5 : 4, 0, Math.PI * 2);
          ctx.fillStyle = dotColor;
          ctx.fill();
          ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
          ctx.lineWidth = 0.5;
          ctx.stroke();
          
          speciesData.renderPosition = { x, y };
        });
        
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.font = "10px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Existence Realm", centerX, centerY - width * 0.35 - 10);
        ctx.fillText("Non-Existence", centerX, centerY - width * 0.15 - 8);
      }
    };
    
    const animate = () => {
      setRotation(prev => (prev + 0.001) % (Math.PI * 2));
      renderCanvas();
      frameIdRef.current = requestAnimationFrame(animate);
    };
    
    frameIdRef.current = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(frameIdRef.current);
    };
  }, [mode, species, selectedSpecies, hoveredSpecies]);
  
  useEffect(() => {
    const resizeCanvas = () => {
      if (containerRef.current && canvasRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        canvasRef.current.width = width;
        canvasRef.current.height = width;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
    
    const hoveredSpecies = species.find(s => {
      if (!s.renderPosition) return false;
      const dx = s.renderPosition.x - x;
      const dy = s.renderPosition.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < 10;
    });
    
    setHoveredSpecies(hoveredSpecies || null);
  };
  
  const handleClick = () => {
    if (hoveredSpecies) {
      onSelectSpecies(hoveredSpecies);
    }
  };
  
  return (
    <div ref={containerRef} className="relative w-full aspect-square">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full rounded-lg cursor-pointer"
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      />
      
      {hoveredSpecies && mode === "disk" && (
        <div 
          className="absolute bg-black/80 text-white text-xs p-2 rounded pointer-events-none z-10 max-w-[150px]"
          style={{ 
            left: `${mousePos.x + 10}px`, 
            top: `${mousePos.y + 10}px`,
            transform: mousePos.x > canvasRef.current?.width! * 0.7 ? 'translateX(-100%)' : ''
          }}
        >
          <div className="font-semibold">{hoveredSpecies.name}</div>
          <div>Distance: {hoveredSpecies.distance < 1000 
            ? `${hoveredSpecies.distance.toFixed(1)} ly` 
            : `${(hoveredSpecies.distance/1000).toFixed(1)}k ly`}
          </div>
          <div>Status: {hoveredSpecies.responding ? 'Online' : 'Offline'}</div>
          <div>Realm: {hoveredSpecies.realm}</div>
          {hoveredSpecies.archetype && <div>Archetype: {hoveredSpecies.archetype}</div>}
        </div>
      )}
    </div>
  );
};
