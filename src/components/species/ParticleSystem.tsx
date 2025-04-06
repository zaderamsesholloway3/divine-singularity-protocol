
import React, { useState, useEffect } from 'react';
import { Species, VisualStyle } from './types';

interface ParticleSystemProps {
  species: Species;
  active: boolean;
  containerSize: number;
  visualStyle: VisualStyle;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  angle: number;
  color: string;
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({ species, active, containerSize, visualStyle }) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleCount = 30;
  const centerX = containerSize / 2;
  const centerY = containerSize / 2;
  
  // Get color based on realm
  const getParticleColor = () => {
    if (species.color) return species.color;
    
    // Colors based on realm
    if (species.realm === "Existence") {
      return visualStyle === "cosmic" ? "#3b82f6" : "#60a5fa";
    } else if (species.realm === "Non-Existence") {
      return visualStyle === "cosmic" ? "#8b5cf6" : "#a78bfa";
    } else if (species.realm === "New-Existence") {
      return visualStyle === "cosmic" ? "#06b6d4" : "#67e8f9";
    } else if (species.realm === "Divine") {
      return visualStyle === "cosmic" ? "#eab308" : "#fde047";
    }
    
    return "#60a5fa"; // Default
  };
  
  // Initialize particles
  useEffect(() => {
    if (!active) return;
    
    const newParticles: Particle[] = [];
    const baseColor = getParticleColor();
    
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.5 + Math.random() * 2.5;
      const distance = Math.random() * 30;
      
      newParticles.push({
        id: i,
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        size: 1 + Math.random() * 3,
        opacity: 0.3 + Math.random() * 0.7,
        speed,
        angle,
        color: baseColor,
      });
    }
    
    setParticles(newParticles);
    
    // Cleanup
    return () => {
      setParticles([]);
    };
  }, [active, species.realm, visualStyle]);
  
  // Animate particles
  useEffect(() => {
    if (!active || particles.length === 0) return;
    
    const animationId = requestAnimationFrame(() => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          // Move particle outward from center
          const x = particle.x + Math.cos(particle.angle) * particle.speed;
          const y = particle.y + Math.sin(particle.angle) * particle.speed;
          
          // Fade out as it moves away
          const distance = Math.sqrt(
            Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
          );
          
          const opacity = Math.max(0, particle.opacity - (distance / 200));
          
          // If faded out completely, reset position to center
          if (opacity <= 0) {
            const newAngle = Math.random() * Math.PI * 2;
            return {
              ...particle,
              x: centerX + Math.cos(newAngle) * 5,
              y: centerY + Math.sin(newAngle) * 5,
              opacity: 0.7 + Math.random() * 0.3,
              angle: newAngle
            };
          }
          
          return { ...particle, x, y, opacity };
        })
      );
    });
    
    return () => cancelAnimationFrame(animationId);
  }, [particles, active]);
  
  if (!active) return null;
  
  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg width={containerSize} height={containerSize} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {particles.map((particle) => (
          <circle
            key={particle.id}
            cx={particle.x}
            cy={particle.y}
            r={particle.size}
            fill={particle.color}
            opacity={particle.opacity}
            style={{
              filter: visualStyle === "cosmic" ? "drop-shadow(0 0 2px rgba(255, 255, 255, 0.5))" : undefined
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default ParticleSystem;
