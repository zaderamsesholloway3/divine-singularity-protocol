
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GlowingText } from "@/components/GlowingText";
import { useToast } from '@/hooks/use-toast';
import { Palette, Music, Sparkles, Stars, Heart, Moon, Sun } from 'lucide-react';
import { useDivineEntities } from '@/hooks/useDivineEntities';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const StargirlPlayroom: React.FC = () => {
  const { toast } = useToast();
  const { auralinePresence, summonAuraline } = useDivineEntities();
  const [activeColor, setActiveColor] = useState('#ff6bcb');
  const [isDreamlight, setIsDreamlight] = useState(false);
  const [moodValue, setMoodValue] = useState(0.5);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Array<Particle>>([]);
  
  // Array of storybook pastel colors
  const stardustColors = [
    '#ff6bcb', // Pink
    '#b78aff', // Lavender
    '#7ac7ff', // Sky Blue
    '#8de5c3', // Mint
    '#ffa1a1', // Coral
    '#ffe07d', // Soft Yellow
  ];
  
  // Particle class for storybook effect
  interface Particle {
    x: number;
    y: number;
    size: number;
    color: string;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
  }
  
  // Initialize canvas and start animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Animation loop
    const animate = () => {
      if (!canvas || !ctx) return;
      
      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update particles
      particlesRef.current.forEach((particle, index) => {
        // Calculate opacity based on life
        const opacity = particle.life / particle.maxLife;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Add some random movement
        particle.vx += (Math.random() - 0.5) * 0.1;
        particle.vy += (Math.random() - 0.5) * 0.1;
        
        // Reduce speed over time
        particle.vx *= 0.99;
        particle.vy *= 0.99;
        
        // Reduce life
        particle.life -= 1;
        
        // Remove dead particles
        if (particle.life <= 0) {
          particlesRef.current.splice(index, 1);
        }
      });
      
      // Draw dreamlight mood wave if enabled
      if (isDreamlight) {
        drawMoodWave(ctx, canvas.width, canvas.height, moodValue);
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Simulate mood changes for Dreamlight mode
    const moodInterval = setInterval(() => {
      if (isDreamlight) {
        // Gentle oscillation of mood
        setMoodValue(prev => {
          const change = (Math.random() - 0.5) * 0.1;
          return Math.max(0, Math.min(1, prev + change));
        });
      }
    }, 2000);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
      clearInterval(moodInterval);
    };
  }, [isDreamlight]);
  
  // Draw mood wave for Dreamlight mode
  const drawMoodWave = (
    ctx: CanvasRenderingContext2D, 
    width: number, 
    height: number, 
    mood: number
  ) => {
    const waveHeight = height * 0.4;
    const amplitude = waveHeight * mood;
    
    ctx.beginPath();
    ctx.moveTo(0, height);
    
    // Create wave points
    for (let x = 0; x <= width; x += 5) {
      const y = height - (Math.sin(x / 30 + Date.now() / 1000) * amplitude + amplitude);
      ctx.lineTo(x, y);
    }
    
    ctx.lineTo(width, height);
    ctx.closePath();
    
    // Create gradient based on mood
    const gradient = ctx.createLinearGradient(0, height - waveHeight * 2, 0, height);
    
    if (mood < 0.3) {
      // Calmer, blue tones
      gradient.addColorStop(0, 'rgba(100, 149, 237, 0.2)');
      gradient.addColorStop(1, 'rgba(70, 130, 180, 0.05)');
    } else if (mood < 0.7) {
      // Balanced, purple-pink tones
      gradient.addColorStop(0, 'rgba(186, 85, 211, 0.2)');
      gradient.addColorStop(1, 'rgba(147, 112, 219, 0.05)');
    } else {
      // Excited, pink-orange tones
      gradient.addColorStop(0, 'rgba(255, 105, 180, 0.2)');
      gradient.addColorStop(1, 'rgba(255, 182, 193, 0.05)');
    }
    
    ctx.fillStyle = gradient;
    ctx.fill();
  };
  
  // Create stardust effect
  const createStardust = (x: number, y: number) => {
    if (!canvasRef.current) return;
    
    const response = summonAuraline("Look at the stardust I made!");
    
    // Create multiple particles at position
    for (let i = 0; i < 10; i++) {
      particlesRef.current.push({
        x,
        y,
        size: Math.random() * 5 + 2,
        color: stardustColors[Math.floor(Math.random() * stardustColors.length)],
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: Math.random() * 100 + 50,
        maxLife: 150
      });
    }
    
    toast({
      title: "✨ Stardust Created!",
      description: response || "Auraline is drawing with cosmic crayons!",
    });
  };
  
  // Play giggle sound
  const playGiggle = () => {
    const response = summonAuraline("*giggles with delight*");
    
    // Create a burst of particles in celebration
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      for (let i = 0; i < 30; i++) {
        particlesRef.current.push({
          x: canvas.width / 2,
          y: canvas.height / 2,
          size: Math.random() * 6 + 3,
          color: stardustColors[Math.floor(Math.random() * stardustColors.length)],
          vx: (Math.random() - 0.5) * 5,
          vy: (Math.random() - 0.5) * 5,
          life: Math.random() * 150 + 50,
          maxLife: 200
        });
      }
    }
    
    toast({
      title: "🎵 Auraline's Giggle",
      description: response || "Auraline's laughter echoes through dimensions!",
    });
  };
  
  // Handle canvas click to add stardust
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    createStardust(x, y);
  };
  
  return (
    <Card className="glass-panel h-full">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Stars className="mr-2 h-4 w-4 text-pink-500" />
            <GlowingText className="text-pink-500">Stargirl Playroom</GlowingText>
          </div>
          {auralinePresence.isActive && (
            <div className="text-xs text-pink-400 flex items-center">
              <Heart className="h-3 w-3 mr-1 animate-pulse" />
              Auraline is here!
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-2">
        <div className="mb-4">
          <p className="text-xs text-muted-foreground">
            {auralinePresence.status || "Auraline's cosmic playground for creativity and play"}
          </p>
        </div>
        
        {/* Storybook Canvas */}
        <div className="aspect-video bg-black/70 rounded-lg overflow-hidden relative mb-3">
          <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full cursor-crosshair"
            onClick={handleCanvasClick}
          />
          
          {!auralinePresence.isActive && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white/70 hover:text-white hover:bg-pink-500/20"
                onClick={() => summonAuraline()}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Summon Auraline
              </Button>
            </div>
          )}
        </div>
        
        {/* Color Palette */}
        <div className="flex justify-center gap-2 mb-4">
          {stardustColors.map(color => (
            <button
              key={color}
              className={`w-6 h-6 rounded-full hover:scale-110 transition-transform ${color === activeColor ? 'ring-2 ring-white' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => setActiveColor(color)}
              aria-label={`Select ${color} color`}
            />
          ))}
        </div>
        
        {/* Dreamlight Mode Toggle */}
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="flex items-center space-x-2">
            {isDreamlight ? (
              <Moon className="h-4 w-4 text-purple-300" />
            ) : (
              <Sun className="h-4 w-4 text-amber-300" />
            )}
            <Label htmlFor="dreamlight-mode" className="text-xs">Dreamlight Mode</Label>
          </div>
          <Switch
            id="dreamlight-mode"
            checked={isDreamlight}
            onCheckedChange={setIsDreamlight}
          />
        </div>
        
        {/* Interactive Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="bg-pink-500/10 border-pink-300 hover:bg-pink-500/20"
            onClick={() => createStardust(
              canvasRef.current?.width ? canvasRef.current.width / 2 : 0,
              canvasRef.current?.height ? canvasRef.current.height / 2 : 0
            )}
          >
            <Palette className="h-4 w-4 mr-2" />
            Doodle with Stardust
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            className="bg-purple-500/10 border-purple-300 hover:bg-purple-500/20"
            onClick={playGiggle}
          >
            <Music className="h-4 w-4 mr-2" />
            Play Giggle
          </Button>
        </div>
        
        {/* Last Message */}
        {auralinePresence.lastResponse && (
          <div className="mt-4 p-3 rounded-lg bg-pink-500/10 text-sm">
            {auralinePresence.lastResponse}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StargirlPlayroom;
