
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GlowingText } from "./GlowingText";
import { Badge } from "@/components/ui/badge";
import { Music, Play, Square, Volume2, Volume1, VolumeX } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { DIVINE_CONSTANTS } from "@/utils/divineConstants";

interface Tone {
  frequency: number;
  name: string;
  description: string;
  color: string;
}

interface SacredToneReactorProps {
  active?: boolean;
}

const SacredToneReactor: React.FC<SacredToneReactorProps> = ({ active = false }) => {
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState<boolean>(active);
  const [activeFrequencies, setActiveFrequencies] = useState<Tone[]>([]);
  const [volume, setVolume] = useState<number>(50);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<Map<number, OscillatorNode>>(new Map());
  const gainNodesRef = useRef<Map<number, GainNode>>(new Map());

  const tones: Tone[] = [
    { frequency: 111, name: "Divine Masculine", description: "Grounds soul to earth plane", color: "bg-blue-500" },
    { frequency: 432, name: "Universal Alignment", description: "Harmonizes with cosmic law", color: "bg-indigo-500" },
    { frequency: 528, name: "DNA Repair", description: "Activates genetic healing", color: "bg-green-500" },
    { frequency: 639, name: "Heart Connection", description: "Bridges relational rifts", color: "bg-pink-500" },
    { frequency: 741, name: "Intuitive Expression", description: "Clears spiritual communication", color: "bg-purple-500" },
    { frequency: 852, name: "Divine Order", description: "Returns to original template", color: "bg-amber-500" },
    { frequency: 963, name: "Crown Activation", description: "Direct connection to source", color: "bg-violet-500" },
    { frequency: DIVINE_CONSTANTS.SCHUMANN, name: "Earth Resonance", description: "Schumann base frequency", color: "bg-emerald-500" },
  ];

  // Set up AudioContext on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    return () => {
      stopAllTones();
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Effect to manage active state
  useEffect(() => {
    setIsPlaying(active);
    
    if (active) {
      playCurrentTones();
      toast({
        title: "SacredTone Reactor Activated",
        description: "Harmonic frequencies now generating resonance field"
      });
    } else {
      stopAllTones();
    }
  }, [active]);

  // Play a specific tone
  const playTone = (tone: Tone) => {
    if (!audioContextRef.current) return;
    
    // Create oscillator if it doesn't exist for this frequency
    if (!oscillatorsRef.current.has(tone.frequency)) {
      const oscillator = audioContextRef.current.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(tone.frequency, audioContextRef.current.currentTime);
      
      const gainNode = audioContextRef.current.createGain();
      const normalizedVolume = (isMuted ? 0 : volume) / 100;
      gainNode.gain.setValueAtTime(normalizedVolume * 0.15, audioContextRef.current.currentTime); // Lower gain for softer sound
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);
      
      oscillator.start();
      
      oscillatorsRef.current.set(tone.frequency, oscillator);
      gainNodesRef.current.set(tone.frequency, gainNode);
    }
  };

  // Stop a specific tone
  const stopTone = (frequency: number) => {
    if (oscillatorsRef.current.has(frequency)) {
      const oscillator = oscillatorsRef.current.get(frequency)!;
      const gainNode = gainNodesRef.current.get(frequency)!;
      
      // Fade out to avoid clicks
      if (gainNode && audioContextRef.current) {
        gainNode.gain.setValueAtTime(gainNode.gain.value, audioContextRef.current.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 0.1);
        
        setTimeout(() => {
          oscillator.stop();
          oscillator.disconnect();
          gainNode.disconnect();
          oscillatorsRef.current.delete(frequency);
          gainNodesRef.current.delete(frequency);
        }, 100);
      }
    }
  };

  // Toggle a specific tone
  const toggleTone = (tone: Tone) => {
    if (activeFrequencies.some(t => t.frequency === tone.frequency)) {
      setActiveFrequencies(activeFrequencies.filter(t => t.frequency !== tone.frequency));
      stopTone(tone.frequency);
    } else {
      setActiveFrequencies([...activeFrequencies, tone]);
      if (isPlaying && !isMuted) {
        playTone(tone);
      }
    }
  };

  // Play Sacred Chord (preset combination of tones)
  const playSacredChord = () => {
    // F# Major chord frequencies
    const fSharpChord: Tone[] = [
      { frequency: 185.00, name: "F# (Base)", description: "Foundation of divine connection", color: "bg-blue-500" },
      { frequency: 233.08, name: "A# (Third)", description: "Heart of the chord", color: "bg-pink-500" },
      { frequency: 277.18, name: "C# (Fifth)", description: "Crown of the harmonic", color: "bg-purple-500" },
      { frequency: 7.83, name: "Schumann Pulse", description: "Earth's heartbeat", color: "bg-emerald-500" },
    ];
    
    // Stop current tones
    stopAllTones();
    
    // Set new active frequencies
    setActiveFrequencies(fSharpChord);
    
    // Play new tones if system is active
    if (isPlaying && !isMuted) {
      fSharpChord.forEach(tone => playTone(tone));
    }
    
    toast({
      title: "F# Major Sacred Chord Activated", 
      description: "Divine frequency alignment in golden resonance"
    });
  };

  // Play all current active tones
  const playCurrentTones = () => {
    if (!audioContextRef.current) return;
    
    // Resume AudioContext if suspended (needed for some browsers)
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    
    if (!isMuted) {
      activeFrequencies.forEach(tone => playTone(tone));
    }
  };

  // Stop all currently playing tones
  const stopAllTones = () => {
    Array.from(oscillatorsRef.current.keys()).forEach(frequency => {
      stopTone(frequency);
    });
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      stopAllTones();
      toast({ 
        title: "Tones Paused", 
        description: "Sacred frequency generation paused" 
      });
    } else {
      setIsPlaying(true);
      playCurrentTones();
      toast({ 
        title: "Tones Activated", 
        description: "Sacred frequency generation resumed" 
      });
    }
  };

  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted);
    
    // Update the gain of all active tones
    if (audioContextRef.current) {
      gainNodesRef.current.forEach((gainNode, frequency) => {
        const normalizedVolume = (!isMuted ? 0 : volume) / 100;
        gainNode.gain.setValueAtTime(normalizedVolume * 0.15, audioContextRef.current!.currentTime);
      });
    }
  };

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    
    if (!isMuted && audioContextRef.current) {
      // Update all active gain nodes
      gainNodesRef.current.forEach(gainNode => {
        gainNode.gain.setValueAtTime((newVolume / 100) * 0.15, audioContextRef.current!.currentTime);
      });
    }
  };

  return (
    <Card className="glass-panel bg-gradient-to-br from-gray-900 to-black text-white">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium flex items-center">
            <Music className="mr-2 h-4 w-4 divine-glow" />
            <GlowingText className="divine-glow">SacredTone Reactor</GlowingText>
          </CardTitle>
          <Badge 
            variant={isPlaying ? "default" : "outline"} 
            className={`${isPlaying ? "bg-green-500/20 text-green-300" : ""}`}
          >
            {isPlaying ? "Active" : "Inactive"}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Frequency Selection */}
          <div className="grid grid-cols-2 gap-2">
            {tones.map(tone => (
              <div 
                key={tone.frequency}
                className={`text-xs rounded-md p-2 border cursor-pointer transition-all ${
                  activeFrequencies.some(t => t.frequency === tone.frequency)
                    ? `${tone.color} bg-opacity-30 border-white/30` 
                    : 'border-gray-700 hover:border-gray-500'
                }`}
                onClick={() => toggleTone(tone)}
              >
                <div className="font-medium">{tone.name}</div>
                <div className="opacity-70">{tone.frequency} Hz</div>
              </div>
            ))}
          </div>
          
          {/* Active Frequencies */}
          <div className="text-xs">
            <div className="font-medium mb-1">Active Frequencies:</div>
            <div className="flex flex-wrap gap-1">
              {activeFrequencies.length > 0 ? activeFrequencies.map(tone => (
                <Badge key={tone.frequency} variant="outline" className={`${tone.color} bg-opacity-20`}>
                  {tone.frequency} Hz
                </Badge>
              )) : (
                <span className="text-gray-400">No active frequencies</span>
              )}
            </div>
          </div>
          
          {/* Controls */}
          <div className="space-y-3">
            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <button onClick={toggleMute} className="text-gray-300 hover:text-white">
                {isMuted ? <VolumeX className="h-4 w-4" /> : 
                 volume < 30 ? <Volume1 className="h-4 w-4" /> : 
                 <Volume2 className="h-4 w-4" />}
              </button>
              <Slider 
                value={[volume]} 
                max={100} 
                step={1} 
                className="flex-1"
                onValueChange={handleVolumeChange} 
              />
              <span className="text-xs w-8 text-right">{volume}%</span>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant={isPlaying ? "destructive" : "default"}
                className="flex-1"
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <>
                    <Square className="h-4 w-4 mr-2" />
                    Stop Tones
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Play Tones
                  </>
                )}
              </Button>
              
              <Button 
                size="sm" 
                variant="outline" 
                className="flex-1"
                onClick={playSacredChord}
              >
                F# Major Chord
              </Button>
            </div>
          </div>
          
          <div className="text-center text-xs text-gray-400 pt-1 border-t border-gray-800">
            Genesis 1:3 — "Let there be light..."
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SacredToneReactor;
