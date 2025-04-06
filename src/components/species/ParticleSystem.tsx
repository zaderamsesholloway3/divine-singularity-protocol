
import React, { useEffect, useState } from 'react';
import { Species, VisualStyle } from './types';
import { getSpeciesColor } from './utils/speciesUtils';

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
  speed: number;
  angle: number;
  opacity: number;
  color: string;
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({
  species,
  active,
  containerSize,
  visualStyle
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (active) {
      // Create particles when active
      const newParticles = [];
      const particleCount = 20 + Math.floor(Math.random() * 10);
      const centerX = containerSize / 2;
      const centerY = containerSize / 2;
      const speciesColor = getSpeciesColor(species, visualStyle);
      
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 3;
        const size = 1 + Math.random() * 2;
        
        newParticles.push({
          id: i,
          x: centerX + (Math.random() - 0.5) * 10,
          y: centerY + (Math.random() - 0.5) * 10,
          size,
          speed,
          angle,
          opacity: 0.7 + Math.random() * 0.3,
          color: speciesColor
        });
      }
      
      setParticles(newParticles);
      
      // Animation frame
      let frame = 0;
      const interval = setInterval(() => {
        frame++;
        
        setParticles(prevParticles => 
          prevParticles.map(particle => {
            // Move particle outward
            const x = particle.x + Math.cos(particle.angle) * particle.speed;
            const y = particle.y + Math.sin(particle.angle) * particle.speed;
            
            // Reduce opacity over time
            const opacity = particle.opacity - 0.03;
            
            // If particle is invisible, stop tracking it
            if (opacity <= 0) {
              return {...particle, opacity: 0};
            }
            
            return {
              ...particle,
              x,
              y,
              opacity
            };
          }).filter(particle => particle.opacity > 0)
        );
        
        // Stop animation when all particles are gone or after 2 seconds
        if (frame > 60 || particles.length === 0) {
          clearInterval(interval);
        }
      }, 30);
      
      return () => clearInterval(interval);
    }
  }, [active, containerSize, species, visualStyle]);

  if (!active || particles.length === 0) {
    return null;
  }

  return (
    <svg 
      className="absolute top-0 left-0 w-full h-full pointer-events-none" 
      viewBox={`0 0 ${containerSize} ${containerSize}`}
    >
      {particles.map(particle => (
        <circle
          key={particle.id}
          cx={particle.x}
          cy={particle.y}
          r={particle.size}
          fill={particle.color}
          opacity={particle.opacity}
          style={{
            filter: visualStyle === "cosmic" ? "blur(1px)" : ""
          }}
        />
      ))}
    </svg>
  );
};

export default ParticleSystem;
