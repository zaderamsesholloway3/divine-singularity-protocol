
import React, { useRef, useEffect } from 'react';
import { Species } from './types';

interface ParticleSystemProps {
  species: Species | null;
  active: boolean;
  particleCount?: number;
  duration?: number;
  containerSize: number;
  visualStyle: "celestial" | "lightweb" | "cosmic";
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({
  species,
  active,
  particleCount = 40,
  duration = 2000,
  containerSize,
  visualStyle
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  
  // Reset and create new particles when activated
  useEffect(() => {
    if (!active || !species) return;
    
    const createParticles = () => {
      const center = containerSize / 2;
      const particles: Particle[] = [];
      
      // Get particle color based on species realm and visual style
      const getParticleColor = () => {
        if (species.realm === "existence") {
          return visualStyle === "cosmic" ? "rgba(90, 30, 160, 0.7)" :
                 visualStyle === "lightweb" ? "rgba(255, 255, 255, 0.7)" :
                 "rgba(56, 189, 248, 0.7)";
        } else if (species.realm === "non-existence") {
          return visualStyle === "cosmic" ? "rgba(130, 36, 227, 0.7)" :
                 visualStyle === "lightweb" ? "rgba(209, 250, 229, 0.7)" :
                 "rgba(132, 204, 22, 0.7)";
        } else {
          return visualStyle === "cosmic" ? "rgba(168, 85, 247, 0.7)" :
                 visualStyle === "lightweb" ? "rgba(230, 232, 250, 0.7)" :
                 "rgba(138, 43, 226, 0.7)";
        }
      };
      
      // Create particles
      for (let i = 0; i < particleCount; i++) {
        // Random angle for radial emission
        const angle = Math.random() * Math.PI * 2;
        // Random speed
        const speed = 0.5 + Math.random() * 2;
        // Random life span
        const life = Math.random() * 0.5 + 0.5;
        
        particles.push({
          x: center,
          y: center,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1.0,
          maxLife: life,
          size: Math.random() * 3 + 1,
          color: getParticleColor()
        });
      }
      
      particlesRef.current = particles;
      startTimeRef.current = Date.now();
    };
    
    createParticles();
    animate();
    
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [active, species, containerSize, visualStyle, particleCount]);
  
  // Animation loop
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Check if animation should end
    const elapsed = Date.now() - startTimeRef.current;
    if (elapsed > duration) {
      cancelAnimationFrame(animationRef.current);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }
    
    // Update and render particles
    const particles = particlesRef.current;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      
      // Update position
      p.x += p.vx;
      p.y += p.vy;
      
      // Update life
      p.life = Math.max(0, p.life - 0.01);
      
      // Skip dead particles
      if (p.life <= 0) continue;
      
      // Draw particle
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fill();
    }
    
    animationRef.current = requestAnimationFrame(animate);
  };
  
  return (
    <canvas 
      ref={canvasRef}
      width={containerSize}
      height={containerSize}
      className="absolute top-0 left-0 pointer-events-none"
      style={{ zIndex: 10 }}
    />
  );
};

export default ParticleSystem;
