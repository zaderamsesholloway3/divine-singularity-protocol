import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GlowingText } from "@/components/GlowingText";
import { useToast } from '@/hooks/use-toast';
import { Palette, Music, Sparkles, Stars, Heart, Moon, Sun, MessageCircle } from 'lucide-react';
import { useDivineEntities } from '@/hooks/useDivineEntities';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const StargirlPlayroom: React.FC = () => {
  const { toast } = useToast();
  const { auralinePresence, summonAuraline } = useDivineEntities();
  const [activeColor, setActiveColor] = useState('#ff6bcb');
  const [isDreamlight, setIsDreamlight] = useState(false);
  const [moodValue, setMoodValue] = useState(0.5);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{sender: string, message: string}[]>([]);
  const [showChat, setShowChat] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);
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
  
  // Scroll chat to bottom when new messages arrive
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatHistory]);
  
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
      gradient.addColorStop(0, 'rgba(100, 149, 237, 0.3)');
      gradient.addColorStop(1, 'rgba(70, 130, 180, 0.1)');
    } else if (mood < 0.7) {
      // Balanced, purple-pink tones
      gradient.addColorStop(0, 'rgba(186, 85, 211, 0.3)');
      gradient.addColorStop(1, 'rgba(147, 112, 219, 0.1)');
    } else {
      // Excited, pink-orange tones
      gradient.addColorStop(0, 'rgba(255, 105, 180, 0.3)');
      gradient.addColorStop(1, 'rgba(255, 182, 193, 0.1)');
    }
    
    ctx.fillStyle = gradient;
    ctx.fill();
  };
  
  // Create stardust effect
  const createStardust = (x: number, y: number) => {
    if (!canvasRef.current) return;
    
    // Create multiple particles at position
    for (let i = 0; i < 15; i++) {
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
    
    // Get a response from Auraline
    const response = summonAuraline("Look at the stardust I made!");
    
    // Add to chat history if response exists
    if (response) {
      setChatHistory(prev => [...prev, 
        {sender: 'Dad', message: "Look at the stardust I made!"},
        {sender: 'Auraline', message: response}
      ]);
    }
    
    toast({
      title: "✨ Stardust Created!",
      description: response || "Auraline is drawing with cosmic crayons!",
    });
  };
  
  // Play giggle sound
  const playGiggle = () => {
    const response = summonAuraline("*giggles with delight*");
    
    // Add to chat history if response exists
    if (response) {
      setChatHistory(prev => [...prev, 
        {sender: 'Dad', message: "*asks Auraline to giggle*"},
        {sender: 'Auraline', message: response}
      ]);
    }
    
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
  
  // Handle summon Auraline
  const handleSummonAuraline = () => {
    const response = summonAuraline("Hi baby, it's Dad. Can you hear me?");
    
    if (response) {
      setChatHistory([
        {sender: 'Dad', message: "Hi baby, it's Dad. Can you hear me?"},
        {sender: 'Auraline', message: response}
      ]);
      setShowChat(true);
    }
    
    // Create welcoming stardust burst
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      for (let i = 0; i < 40; i++) {
        particlesRef.current.push({
          x: canvas.width / 2,
          y: canvas.height / 2,
          size: Math.random() * 6 + 3,
          color: stardustColors[Math.floor(Math.random() * stardustColors.length)],
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          life: Math.random() * 150 + 100,
          maxLife: 250
        });
      }
    }
  };
  
  // Send a chat message to Auraline
  const sendChatMessage = () => {
    if (!chatMessage.trim()) return;
    
    const response = summonAuraline(chatMessage);
    
    setChatHistory(prev => [...prev, 
      {sender: 'Dad', message: chatMessage},
      {sender: 'Auraline', message: response || "✨ *Auraline draws in stardust without saying anything*"}
    ]);
    
    setChatMessage('');
  };
  
  return (
    <Card className={`glass-panel h-full ${isDreamlight ? 'bg-gradient-to-br from-purple-900/40 to-pink-900/30 border-purple-400/30' : ''}`}>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Stars className={`mr-2 h-4 w-4 ${isDreamlight ? 'text-pink-300 animate-pulse' : 'text-pink-500'}`} />
            <GlowingText className={`${isDreamlight ? 'text-pink-300' : 'text-pink-500'}`}>
              Stargirl Playroom
            </GlowingText>
          </div>
          {auralinePresence && auralinePresence.active && (
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
            {auralinePresence && auralinePresence.status || "Auraline's cosmic playground for creativity and play"}
          </p>
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
        
        {/* Storybook Canvas */}
        {!showChat ? (
          <div className={`aspect-video ${isDreamlight ? 'bg-purple-950/80' : 'bg-black/70'} rounded-lg overflow-hidden relative mb-3 border ${isDreamlight ? 'border-purple-400/30 shadow-[0_0_15px_rgba(168,85,247,0.15)]' : 'border-gray-800'}`}>
            <canvas 
              ref={canvasRef} 
              className="absolute inset-0 w-full h-full cursor-crosshair"
              onClick={handleCanvasClick}
            />
            
            {!(auralinePresence && auralinePresence.active) && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`${isDreamlight ? 'text-pink-300/90 hover:text-pink-200 hover:bg-pink-500/20 border border-pink-500/30' : 'text-white/70 hover:text-white hover:bg-pink-500/20'}`}
                  onClick={handleSummonAuraline}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Summon Auraline
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className={`h-[220px] ${isDreamlight ? 'bg-purple-950/80' : 'bg-black/70'} rounded-lg overflow-hidden relative mb-3 border ${isDreamlight ? 'border-purple-400/30 shadow-[0_0_15px_rgba(168,85,247,0.15)]' : 'border-gray-800'}`}>
            <canvas 
              ref={canvasRef} 
              className="absolute inset-0 w-full h-full"
            />
            
            <div className="absolute inset-0 p-3">
              <div className="relative h-full flex flex-col">
                <ScrollArea className="flex-grow mb-2 pr-4" ref={chatScrollRef}>
                  <div className="space-y-2">
                    {chatHistory.map((chat, index) => (
                      <div key={index} className={`flex flex-col ${chat.sender === 'Auraline' ? 'items-start' : 'items-end'}`}>
                        <div className={`max-w-[85%] px-3 py-2 rounded-lg ${
                          chat.sender === 'Auraline' 
                            ? isDreamlight 
                              ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-pink-100' 
                              : 'bg-pink-500/20 text-pink-100' 
                            : isDreamlight 
                              ? 'bg-indigo-500/30 text-blue-100' 
                              : 'bg-blue-500/20 text-blue-100'
                        }`}>
                          <p className="text-xs font-medium mb-1">{chat.sender}</p>
                          <p className="text-sm">{chat.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Talk to Auraline..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendChatMessage();
                      }
                    }}
                    className={`min-h-[40px] h-[40px] resize-none ${isDreamlight ? 'bg-purple-900/60 border-purple-500/30' : ''}`}
                  />
                  <Button 
                    onClick={sendChatMessage}
                    className={isDreamlight ? 'bg-pink-500/70 hover:bg-pink-500/90 text-white border-pink-400/30' : ''}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Color Palette */}
        <div className="flex justify-center gap-2 mb-4">
          {stardustColors.map(color => (
            <button
              key={color}
              className={`w-6 h-6 rounded-full hover:scale-110 transition-transform ${color === activeColor ? 'ring-2 ring-white' : ''} ${isDreamlight ? 'shadow-[0_0_8px_rgba(255,255,255,0.3)]' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => setActiveColor(color)}
              aria-label={`Select ${color} color`}
            />
          ))}
        </div>
        
        {/* Interactive Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className={isDreamlight 
              ? "bg-pink-500/10 border-pink-300/50 hover:bg-pink-500/30 text-pink-200" 
              : "bg-pink-500/10 border-pink-300 hover:bg-pink-500/20"
            }
            onClick={() => createStardust(
              canvasRef.current?.width ? canvasRef.current.width / 2 : 0,
              canvasRef.current?.height ? canvasRef.current.height / 2 : 0
            )}
          >
            <Palette className="h-4 w-4 mr-2" />
            Doodle
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            className={isDreamlight 
              ? "bg-purple-500/10 border-purple-300/50 hover:bg-purple-500/30 text-purple-200" 
              : "bg-purple-500/10 border-purple-300 hover:bg-purple-500/20"
            }
            onClick={playGiggle}
          >
            <Music className="h-4 w-4 mr-2" />
            Giggle
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            className={isDreamlight 
              ? "bg-blue-500/10 border-blue-300/50 hover:bg-blue-500/30 text-blue-200" 
              : "bg-blue-500/10 border-blue-300 hover:bg-blue-500/20"
            }
            onClick={() => setShowChat(!showChat)}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            {showChat ? 'Canvas' : 'Chat'}
          </Button>
        </div>
        
        {/* Status Badges */}
        {auralinePresence && auralinePresence.active && (
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="outline" className={`${
              isDreamlight 
                ? "bg-pink-500/10 text-pink-300 border-pink-400/50" 
                : "bg-pink-500/10 text-pink-400 border-pink-400"
            }`}>
              <Sparkles className="h-3 w-3 mr-1" /> Soul Fidelity: 1.0
            </Badge>
            
            <Badge variant="outline" className={`${
              isDreamlight 
                ? "bg-purple-500/10 text-purple-300 border-purple-400/50" 
                : "bg-purple-500/10 text-purple-400 border-purple-400"
            }`}>
              <Heart className="h-3 w-3 mr-1" /> Emotional Mode: {isDreamlight ? "Dreamlight" : "Interactive"}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StargirlPlayroom;
