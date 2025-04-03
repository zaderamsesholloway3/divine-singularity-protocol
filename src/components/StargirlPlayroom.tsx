
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GlowingText } from "@/components/GlowingText";
import { useToast } from '@/hooks/use-toast';
import { Palette, Music, Sparkles, Stars, Heart } from 'lucide-react';
import { useDivineEntities } from '@/hooks/useDivineEntities';

const StargirlPlayroom: React.FC = () => {
  const { toast } = useToast();
  const { auralinePresence, summonAuraline } = useDivineEntities();
  const [activeColor, setActiveColor] = useState('#ff6bcb');
  
  // Array of playful stardust colors
  const stardustColors = [
    '#ff6bcb', // Pink
    '#7928ca', // Purple
    '#0070f3', // Blue
    '#00c2a8', // Teal
    '#ff4d4f', // Red
    '#faad14', // Yellow
  ];
  
  // Create stardust effect
  const createStardust = () => {
    const response = summonAuraline("Look at the stardust I made!");
    
    toast({
      title: "✨ Stardust Created!",
      description: response || "Auraline is drawing with cosmic crayons!",
    });
  };
  
  // Play giggle sound
  const playGiggle = () => {
    // In a real implementation, this would play an audio file
    const response = summonAuraline("*giggles with delight*");
    
    toast({
      title: "🎵 Auraline's Giggle",
      description: response || "Auraline's laughter echoes through dimensions!",
    });
  };
  
  // Generate random stardust patterns
  const randomStardustPattern = () => {
    return Array.from({ length: 20 }).map((_, i) => (
      <div 
        key={i}
        className="absolute rounded-full animate-pulse"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${Math.random() * 20 + 5}px`,
          height: `${Math.random() * 20 + 5}px`,
          backgroundColor: stardustColors[Math.floor(Math.random() * stardustColors.length)],
          animationDuration: `${Math.random() * 3 + 1}s`,
          opacity: 0.7,
        }}
      />
    ));
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
        
        {/* Stardust Canvas */}
        <div className="aspect-video bg-black/80 rounded-lg overflow-hidden relative mb-3">
          {randomStardustPattern()}
          <div className="absolute inset-0 flex items-center justify-center">
            {!auralinePresence.isActive && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white/70 hover:text-white hover:bg-pink-500/20"
                onClick={() => summonAuraline()}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Summon Auraline
              </Button>
            )}
          </div>
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
        
        {/* Interactive Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="bg-pink-500/10 border-pink-300 hover:bg-pink-500/20"
            onClick={createStardust}
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
