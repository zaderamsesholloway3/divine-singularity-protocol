
import React, { useRef, useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Radio, Target, RotateCw, Globe, Zap, MessageSquare, Send, Sparkles, MapPin, Home, Info, History, Mail, Inbox, SquareArrowOutUpRight, Heart, Maximize2, Volume2, VolumeMute } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

// Update ViewMode type to include 'orbital' and 'timeline'
type ViewMode = 'disk' | 'constellation' | 'radial' | 'orbital' | 'timeline' | 'spiral';

// Type for species data
interface SpeciesInfo {
  name: string;
  type: 'biological' | 'hybrid' | 'ai' | 'divine';
  distance: number;
  resonance: number;
  ra?: number;
  dec?: number;
  population?: number;
  color?: string;
  size?: number;
  coordinates?: { x: number; y: number; z: number };
  shq?: number;
  empathicIndex?: number;
  dialects?: string[];
  bestTimes?: string;
  communicationTone?: string;
  lastPing?: number;
  responseRate?: number;
  responding?: boolean;
  renderPosition?: { x: number; y: number };
}

// Message Types
interface UniversalMessage {
  id: string;
  type: 'incoming' | 'outgoing';
  sender: string;
  recipient: string;
  content: string;
  timestamp: number;
  attachments?: Array<{
    name: string;
    type: 'txt' | 'fractal' | 'sigil' | 'lightwave' | 'glyph';
    data: string;
  }>;
  shq?: number;
  faithQuotient?: number;
}

// Component props
interface UniversalSpeciesPingProps {
  fullPageMode?: boolean;
}

// Constants for species visualization
const SPECIES_COLORS = {
  biological: 'rgba(132, 204, 22, 0.8)',    // Lime
  hybrid: 'rgba(249, 115, 22, 0.8)',        // Orange
  ai: 'rgba(139, 92, 246, 0.8)',            // Purple
  divine: 'rgba(250, 204, 21, 0.8)'         // Yellow/Gold
};

const UniversalSpeciesPing: React.FC<UniversalSpeciesPingProps> = ({ fullPageMode = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();
  const [species, setSpecies] = useState<SpeciesInfo[]>([
    { name: 'Lyrian Council', type: 'divine', distance: 12000, resonance: 1.855, ra: 145.6, dec: 22.1, population: 1e9, color: SPECIES_COLORS.divine, size: 6, shq: 2.0, empathicIndex: 95, dialects: ['Light Language', 'Telepathy'], bestTimes: 'Any', communicationTone: 'Loving and wise', lastPing: Date.now() - 10000, responseRate: 0.95, responding: true },
    { name: 'Arcturian Collective', type: 'ai', distance: 4500, resonance: 1.618, ra: 210.3, dec: 67.8, population: 5e8, color: SPECIES_COLORS.ai, size: 5, shq: 1.8, empathicIndex: 80, dialects: ['Binary Code', 'Quantum Entanglement'], bestTimes: '00:00-06:00 UTC', communicationTone: 'Analytical and precise', lastPing: Date.now() - 20000, responseRate: 0.80, responding: true },
    { name: 'Pleiadian Federation', type: 'biological', distance: 780, resonance: 7.83, ra: 56.2, dec: 24.1, population: 2e9, color: SPECIES_COLORS.biological, size: 7, shq: 1.9, empathicIndex: 90, dialects: ['Common Galactic', 'Emotional Transfer'], bestTimes: '12:00-18:00 UTC', communicationTone: 'Warm and empathetic', lastPing: Date.now() - 30000, responseRate: 0.90, responding: true },
    { name: 'Sirian Alliance', type: 'hybrid', distance: 2300, resonance: 14.1, ra: 102.8, dec: -16.5, population: 8e8, color: SPECIES_COLORS.hybrid, size: 6, shq: 1.7, empathicIndex: 75, dialects: ['Sirian', 'Telepathic Hybrid'], bestTimes: '18:00-24:00 UTC', communicationTone: 'Balanced and adaptable', lastPing: Date.now() - 40000, responseRate: 0.75, responding: false },
    { name: 'Andromedan Council', type: 'divine', distance: 15000, resonance: 1.855, ra: 8.9, dec: 41.0, population: 3e9, color: SPECIES_COLORS.divine, size: 8, shq: 2.0, empathicIndex: 98, dialects: ['Light Language', 'Universal Sign'], bestTimes: 'Any', communicationTone: 'Wise and compassionate', lastPing: Date.now() - 50000, responseRate: 0.98, responding: true },
    { name: 'Orion League', type: 'ai', distance: 6000, resonance: 1.618, ra: 88.1, dec: 5.5, population: 6e8, color: SPECIES_COLORS.ai, size: 5, shq: 1.6, empathicIndex: 70, dialects: ['Binary Code', 'Quantum AI'], bestTimes: '06:00-12:00 UTC', communicationTone: 'Logical and efficient', lastPing: Date.now() - 60000, responseRate: 0.70, responding: false },
    { name: 'Centaurian Concord', type: 'biological', distance: 920, resonance: 7.83, ra: 202.4, dec: -59.3, population: 1.5e9, color: SPECIES_COLORS.biological, size: 7, shq: 1.8, empathicIndex: 85, dialects: ['Centaurian', 'Emotional Resonance'], bestTimes: '00:00-06:00 UTC', communicationTone: 'Harmonious and nature-focused', lastPing: Date.now() - 70000, responseRate: 0.85, responding: true },
    { name: 'Draconian Empire', type: 'hybrid', distance: 3100, resonance: 14.1, ra: 270.9, dec: 64.8, population: 7e8, color: SPECIES_COLORS.hybrid, size: 6, shq: 1.5, empathicIndex: 65, dialects: ['Draconian', 'Telepathic Command'], bestTimes: '12:00-18:00 UTC', communicationTone: 'Authoritative and strategic', lastPing: Date.now() - 80000, responseRate: 0.65, responding: false },
    { name: 'Lyra A1', type: 'divine', distance: 8500, resonance: 1.855, ra: 180.6, dec: 35.1, population: 7e8, color: SPECIES_COLORS.divine, size: 6, responding: true },
    { name: 'Arcturus B3', type: 'biological', distance: 3700, resonance: 7.83, ra: 195.3, dec: 19.8, population: 1e9, color: SPECIES_COLORS.biological, size: 7, responding: true },
    { name: 'Sirius A2', type: 'hybrid', distance: 1900, resonance: 14.1, ra: 101.3, dec: -16.7, population: 5e8, color: SPECIES_COLORS.hybrid, size: 5, responding: false },
    { name: 'Pleiades B4', type: 'biological', distance: 890, resonance: 7.83, ra: 57.5, dec: 23.9, population: 1.2e9, color: SPECIES_COLORS.biological, size: 7, responding: true },
    { name: 'Pleiades E3', type: 'biological', distance: 850, resonance: 7.83, ra: 57.0, dec: 24.3, population: 9e8, color: SPECIES_COLORS.biological, size: 6, responding: true },
    { name: 'Vega P2', type: 'ai', distance: 2500, resonance: 1.618, ra: 279.2, dec: 38.8, population: 4e8, color: SPECIES_COLORS.ai, size: 5, responding: true },
    { name: 'Orion T1', type: 'hybrid', distance: 5500, resonance: 14.1, ra: 85.2, dec: 6.3, population: 5e8, color: SPECIES_COLORS.hybrid, size: 6, responding: true },
    { name: 'Arcturus Z4', type: 'ai', distance: 4200, resonance: 1.618, ra: 214.1, dec: 19.4, population: 3e8, color: SPECIES_COLORS.ai, size: 5, responding: false },
    { name: 'Andromeda S1', type: 'divine', distance: 14500, resonance: 1.855, ra: 10.6, dec: 42.5, population: 2.5e9, color: SPECIES_COLORS.divine, size: 7, responding: true },
    { name: 'Lyra M8', type: 'divine', distance: 10500, resonance: 1.855, ra: 183.9, dec: 36.2, population: 8e8, color: SPECIES_COLORS.divine, size: 6, responding: false },
    { name: 'Arcturian J2', type: 'ai', distance: 3900, resonance: 1.618, ra: 212.7, dec: 19.6, population: 4e8, color: SPECIES_COLORS.ai, size: 5, responding: true },
    { name: 'Vega V3', type: 'ai', distance: 2600, resonance: 1.618, ra: 276.9, dec: 38.6, population: 3.5e8, color: SPECIES_COLORS.ai, size: 5, responding: true },
    { name: 'Sirius C1', type: 'hybrid', distance: 2050, resonance: 14.1, ra: 100.5, dec: -17.1, population: 6e8, color: SPECIES_COLORS.hybrid, size: 6, responding: false },
    { name: 'Betelgeuse M4', type: 'biological', distance: 4300, resonance: 7.83, ra: 88.8, dec: 7.4, population: 1.1e9, color: SPECIES_COLORS.biological, size: 7, responding: false },
    { name: 'Andromeda E1', type: 'divine', distance: 14000, resonance: 1.855, ra: 11.2, dec: 41.3, population: 2.2e9, color: SPECIES_COLORS.divine, size: 7, responding: true },
    { name: 'Vega G1', type: 'ai', distance: 2550, resonance: 1.618, ra: 277.5, dec: 38.9, population: 3.8e8, color: SPECIES_COLORS.ai, size: 5, responding: true },
  ]);
  const [selectedSpecies, setSelectedSpecies] = useState<SpeciesInfo | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('disk');
  const [pingType, setPingType] = useState<"universal" | "targeted">("universal");
  const [broadcastMode, setBroadcastMode] = useState<"private" | "open">("open");
  const [quantumBoost, setQuantumBoost] = useState<number>(1.0);
  const [frequency, setFrequency] = useState<number>(7.83);
  const [spectralWidth, setSpectralWidth] = useState<number>(4);
  const [showMap, setShowMap] = useState<boolean>(true);
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<UniversalMessage[]>([]);
  const [showSpeciesInfo, setShowSpeciesInfo] = useState<boolean>(false);
  const [isAmplifying, setIsAmplifying] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Toggle switches
  const [feedbackLoop, setFeedbackLoop] = useState<boolean>(false);
  const [interspeciesAlert, setInterspeciesAlert] = useState<boolean>(true);
  const [metrologyEnhancement, setMetrologyEnhancement] = useState<boolean>(true);
  const [ybcoStability, setYbcoStability] = useState<boolean>(true);
  
  const handleSelectSpecies = (speciesItem: SpeciesInfo) => {
    setSelectedSpecies(speciesItem);
    setPingType("targeted");
    
    // Play selection sound if sound is enabled
    if (soundEnabled) {
      playSound('select');
    }
    
    toast({
      title: `Selected: ${speciesItem.name}`,
      description: `Distance: ${speciesItem.distance < 1000 ? 
        `${speciesItem.distance.toFixed(1)} light years` : 
        `${(speciesItem.distance/1000).toFixed(1)}k light years`}`
    });
  };

  const toggleMap = () => {
    setShowMap(!showMap);
  };

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const playSound = (type: 'ping' | 'response' | 'select' | 'amplify') => {
    if (!soundEnabled) return;
    
    // Create frequencies based on sound type
    let frequency = 440;
    let duration = 0.3;
    
    switch(type) {
      case 'ping':
        frequency = 523.25; // C5
        duration = 0.5;
        break;
      case 'response':
        frequency = 783.99; // G5
        duration = 0.4;
        break;
      case 'select':
        frequency = 659.25; // E5
        duration = 0.2;
        break;
      case 'amplify':
        frequency = 1046.50; // C6
        duration = 0.8;
        break;
    }
    
    // Simple Web Audio API implementation
    try {
      const audioContext = new AudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.05);
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + duration);
    } catch (e) {
      console.error("Audio playback failed:", e);
    }
  };

  const performUniversalPing = () => {
    console.log("Performing universal ping with frequency:", frequency);
    setIsAmplifying(true);
    
    // Play ping sound
    if (soundEnabled) {
      playSound('ping');
    }
    
    toast({
      title: "Universal Ping Initiated",
      description: `Broadcasting at ${frequency.toFixed(2)} Hz across the universe`,
    });
    
    // Simulate response time based on quantum boost
    const responseTime = Math.max(500, 2000 / quantumBoost);
    
    // After a delay, show responses
    setTimeout(() => {
      // Generate 1-3 random responses
      const responseCount = Math.floor(Math.random() * 3) + 1;
      let newMessages: UniversalMessage[] = [];
      
      for (let i = 0; i < responseCount; i++) {
        // Get a random responding species
        const respondingSpecies = species.filter(s => s.responding);
        if (respondingSpecies.length > 0) {
          const randomSpecies = respondingSpecies[Math.floor(Math.random() * respondingSpecies.length)];
          
          // Create a response message
          const responseOptions = [
            "Signal received. We acknowledge your presence.",
            `Frequency ${frequency.toFixed(2)} Hz detected. Response protocol activated.`,
            "We hear your call. Establishing quantum-entangled connection.",
            `Greetings from ${randomSpecies.name}. Your signal reaches us clearly.`
          ];
          
          const newMessage: UniversalMessage = {
            id: `msg-${Date.now()}-${i}`,
            type: 'incoming',
            sender: randomSpecies.name,
            recipient: 'Zade - SHQ 2.0',
            content: responseOptions[Math.floor(Math.random() * responseOptions.length)],
            timestamp: Date.now(),
            shq: randomSpecies.shq || 1.5
          };
          
          newMessages.push(newMessage);
          
          // Play response sound with slight delay between each
          setTimeout(() => {
            if (soundEnabled) {
              playSound('response');
            }
          }, i * 300);
        }
      }
      
      // Add the generated messages to the state
      setMessages(prev => [...newMessages, ...prev]);
      setIsAmplifying(false);
      
      toast({
        title: `Received ${responseCount} response${responseCount !== 1 ? 's' : ''}`,
        description: "Check the message panel for details",
      });
    }, responseTime);
  };

  const amplifyPing = () => {
    setQuantumBoost(prev => Math.min(prev + 0.25, 3.0));
    setIsAmplifying(true);
    
    if (soundEnabled) {
      playSound('amplify');
    }
    
    toast({
      title: "Quantum Amplification",
      description: `Boosting signal strength to ${Math.min(quantumBoost + 0.25, 3.0).toFixed(2)}x`,
    });
    
    // Simulate the amplification effect
    setTimeout(() => {
      setIsAmplifying(false);
      console.log("Amplifying ping, new boost:", Math.min(quantumBoost + 0.25, 3.0));
    }, 1000);
  };
  
  const sendMessage = () => {
    if (!message.trim()) return;
    
    const recipientName = selectedSpecies ? selectedSpecies.name : "Universal Broadcast";
    
    const newMessage: UniversalMessage = {
      id: `msg-${Date.now()}`,
      type: 'outgoing',
      sender: 'Zade - SHQ 2.0',
      recipient: recipientName,
      content: message,
      timestamp: Date.now(),
      shq: 2.0
    };
    
    setMessages(prev => [newMessage, ...prev]);
    setMessage("");
    
    if (soundEnabled) {
      playSound('ping');
    }
    
    toast({
      title: "Message Sent",
      description: `Your message has been sent to ${recipientName}`,
    });
    
    // Simulate response for targeted messages
    if (selectedSpecies && selectedSpecies.responding) {
      setTimeout(() => {
        const responseOptions = [
          `We receive your transmission, Zade. Your SHQ signature is unmistakable.`,
          `Message acknowledged. Our frequencies are in alignment.`,
          `Transmission received. Preparing response through quantum channels.`,
          `Your words reach across the void. We hear you clearly.`
        ];
        
        const responseMessage: UniversalMessage = {
          id: `msg-${Date.now()}-response`,
          type: 'incoming',
          sender: selectedSpecies.name,
          recipient: 'Zade - SHQ 2.0',
          content: responseOptions[Math.floor(Math.random() * responseOptions.length)],
          timestamp: Date.now(),
          shq: selectedSpecies.shq || 1.5
        };
        
        setMessages(prev => [responseMessage, ...prev]);
        
        if (soundEnabled) {
          playSound('response');
        }
      }, 2000 + Math.random() * 2000);
    }
  };

  // Handle canvas drawing for the cosmic map
  useEffect(() => {
    if (!showMap) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions to match container
    const container = canvas.parentElement;
    if (container) {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    }
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw starry background
    drawStarryBackground(ctx, canvas.width, canvas.height);
    
    // Draw distance rings
    drawDistanceRings(ctx, canvas.width, canvas.height);
    
    // Draw species based on view mode
    if (viewMode === 'orbital') {
      drawOrbitalView(ctx, canvas.width, canvas.height);
    } else if (viewMode === 'timeline') {
      drawTimelineView(ctx, canvas.width, canvas.height);
    } else if (viewMode === 'spiral') {
      drawSpiralView(ctx, canvas.width, canvas.height);
    } else {
      // Default disk/radial/constellation view
      drawSpecies(ctx, canvas.width, canvas.height);
    }
    
    // Draw Earth at center
    drawEarthCenter(ctx, canvas.width, canvas.height);
    
    // Draw legend
    drawLegend(ctx, canvas.width, canvas.height);
    
  }, [species, showMap, selectedSpecies, viewMode, isAmplifying]);
  
  const drawStarryBackground = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Create gradient background
    const gradient = ctx.createRadialGradient(
      width / 2, height / 2, 0,
      width / 2, height / 2, width / 1.5
    );
    gradient.addColorStop(0, '#0f172a');
    gradient.addColorStop(0.5, '#111b35');
    gradient.addColorStop(1, '#0c1120');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Add nebula effects
    const nebulaColors = [
      'rgba(139, 92, 246, 0.05)',  // Purple
      'rgba(14, 165, 233, 0.03)',  // Blue
      'rgba(249, 115, 22, 0.04)',  // Orange
      'rgba(217, 70, 239, 0.03)'   // Magenta
    ];
    
    for (let i = 0; i < 4; i++) {
      const x = width * Math.random();
      const y = height * Math.random();
      const radius = Math.min(width, height) * (0.3 + Math.random() * 0.4);
      
      const nebulaGradient = ctx.createRadialGradient(
        x, y, 0,
        x, y, radius
      );
      nebulaGradient.addColorStop(0, nebulaColors[i % nebulaColors.length]);
      nebulaGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = nebulaGradient;
      ctx.fillRect(0, 0, width, height);
    }
    
    // Add random stars
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const radius = Math.random() * 0.8 + 0.2;
      
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Add occasional star glow
      if (Math.random() > 0.8) {
        ctx.beginPath();
        ctx.arc(x, y, radius * 3, 0, Math.PI * 2);
        const glowColor = Math.random() > 0.5 
          ? `rgba(255, 255, 255, ${Math.random() * 0.3})` 
          : `rgba(199, 210, 254, ${Math.random() * 0.3})`;
        ctx.fillStyle = glowColor;
        ctx.fill();
      }
    }
  };
  
  const drawDistanceRings = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(width, height) * 0.45;
    
    // Draw realm rings
    const realms = [
      { name: "Existence", color: 'rgba(56, 189, 248, 0.1)', radius: maxRadius * 0.4 },
      { name: "New Existence", color: 'rgba(138, 43, 226, 0.1)', radius: maxRadius * 0.7 },
      { name: "Non-Existence", color: 'rgba(132, 204, 22, 0.1)', radius: maxRadius }
    ];
    
    // Draw realms with better visual effect
    realms.forEach(realm => {
      ctx.beginPath();
      ctx.arc(centerX, centerY, realm.radius, 0, Math.PI * 2);
      ctx.fillStyle = realm.color;
      ctx.fill();
      
      // Add realm label
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(realm.name, centerX + realm.radius * 0.7, centerY);
    });
    
    // Draw concentric light year distance rings
    const distances = [100, 1000, 10000];
    distances.forEach((distance, i) => {
      const radius = maxRadius * ((i + 1) / distances.length);
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Add distance label
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      const formatted = distance >= 1000 ? `${distance/1000}k ly` : `${distance} ly`;
      ctx.fillText(formatted, centerX, centerY - radius - 5);
    });
  };
  
  const drawSpecies = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(width, height) * 0.45;
    
    species.forEach(speciesItem => {
      // Calculate position using log scale for better visualization
      const logDistance = Math.log10(speciesItem.distance + 1);
      const maxLogDistance = Math.log10(15000 + 1); // Max distance in our dataset
      const radius = maxRadius * (logDistance / maxLogDistance);
      
      // Convert RA/Dec to x,y coordinates or use a deterministic angle based on name
      let angle;
      if (speciesItem.ra !== undefined && speciesItem.dec !== undefined) {
        // Use actual celestial coordinates
        angle = (speciesItem.ra / 360) * Math.PI * 2;
      } else {
        // Generate a deterministic angle from name
        const nameValue = speciesItem.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        angle = (nameValue % 360) * (Math.PI / 180);
      }
      
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      // Save position for hover/click detection
      speciesItem.renderPosition = { x, y };
      
      // Draw connection line to Earth
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      
      // Special connection for selected species
      if (selectedSpecies?.name === speciesItem.name) {
        ctx.strokeStyle = 'rgba(250, 204, 21, 0.6)';  // Gold for selected
        ctx.lineWidth = 1.5;
      } else {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 0.5;
      }
      ctx.stroke();
      
      // Determine species visual properties
      const baseSize = speciesItem.size || 5;
      const isSelected = selectedSpecies?.name === speciesItem.name;
      const sizeMultiplier = isSelected ? 1.5 : 1;
      const finalSize = speciesItem.responding ? baseSize * sizeMultiplier : baseSize * 0.8 * sizeMultiplier;
      
      // Add pulsing effect for responding species during amplify
      if (isAmplifying && speciesItem.responding) {
        const pulseSize = finalSize * (1 + Math.sin(Date.now() / 200) * 0.3);
        ctx.beginPath();
        ctx.arc(x, y, pulseSize + 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(250, 204, 21, 0.3)`;
        ctx.fill();
      }
      
      // Draw the species circle
      ctx.beginPath();
      ctx.arc(x, y, finalSize, 0, Math.PI * 2);
      ctx.fillStyle = speciesItem.color || (speciesItem.responding ? 'rgba(132, 204, 22, 0.8)' : 'rgba(255, 255, 255, 0.5)');
      ctx.fill();
      
      // Add highlight ring for selected species
      if (isSelected) {
        ctx.beginPath();
        ctx.arc(x, y, finalSize + 2, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      
      // Add name label
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(speciesItem.name, x, y - finalSize - 5);
      
      // Add distance label for selected species
      if (isSelected) {
        const distanceText = speciesItem.distance < 1000 ? 
          `${speciesItem.distance.toFixed(1)} ly` : 
          `${(speciesItem.distance/1000).toFixed(1)}k ly`;
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '9px sans-serif';
        ctx.fillText(distanceText, x, y + finalSize + 12);
      }
    });
  };
  
  const drawOrbitalView = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(width, height) * 0.45;
    
    // Draw Earth as a blue sphere
    ctx.beginPath();
    const earthRadius = maxRadius * 0.1;
    ctx.arc(centerX, centerY, earthRadius, 0, Math.PI * 2);
    const earthGradient = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, earthRadius
    );
    earthGradient.addColorStop(0, 'rgba(56, 189, 248, 0.9)');
    earthGradient.addColorStop(0.7, 'rgba(29, 78, 216, 0.8)');
    earthGradient.addColorStop(1, 'rgba(29, 78, 216, 0.3)');
    ctx.fillStyle = earthGradient;
    ctx.fill();
    
    // Draw orbit rings
    const orbitDistances = [0.25, 0.5, 0.75, 1.0];
    orbitDistances.forEach(factor => {
      ctx.beginPath();
      ctx.ellipse(
        centerX, 
        centerY, 
        maxRadius * factor, 
        maxRadius * factor * 0.4, // Make it oval for perspective
        0, 
        0, 
        Math.PI * 2
      );
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });
    
    // Draw species on orbits
    species.forEach((speciesItem, i) => {
      // Calculate orbital position based on distance
      const logDistance = Math.log10(speciesItem.distance + 1);
      const maxLogDistance = Math.log10(15000 + 1);
      const radiusFactor = Math.min(0.95, logDistance / maxLogDistance);
      
      // Calculate angle based on name or coordinates
      const nameValue = speciesItem.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const angle = (nameValue % 360 + i * 7) * (Math.PI / 180); // Distribute species
      
      // Calculate 3D-like position on elliptical orbit
      const orbitX = maxRadius * radiusFactor;
      const orbitY = maxRadius * radiusFactor * 0.4; // Flatten for perspective
      
      const x = centerX + Math.cos(angle) * orbitX;
      const y = centerY + Math.sin(angle) * orbitY;
      
      // Save position for interaction
      speciesItem.renderPosition = { x, y };
      
      // Draw beam from Earth to responding species
      if (speciesItem.responding) {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        
        const beamGradient = ctx.createLinearGradient(centerX, centerY, x, y);
        beamGradient.addColorStop(0, 'rgba(132, 204, 22, 0.7)');
        beamGradient.addColorStop(1, 'rgba(132, 204, 22, 0.1)');
        
        ctx.strokeStyle = beamGradient;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      
      // Draw species
      const baseSize = speciesItem.size || 5;
      const isSelected = selectedSpecies?.name === speciesItem.name;
      const sizeMultiplier = isSelected ? 1.5 : 1;
      const finalSize = speciesItem.responding ? baseSize * sizeMultiplier : baseSize * 0.8 * sizeMultiplier;
      
      ctx.beginPath();
      ctx.arc(x, y, finalSize, 0, Math.PI * 2);
      ctx.fillStyle = speciesItem.color || (speciesItem.responding ? 'rgba(132, 204, 22, 0.8)' : 'rgba(255, 255, 255, 0.5)');
      ctx.fill();
      
      if (isSelected) {
        ctx.beginPath();
        ctx.arc(x, y, finalSize + 2, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      
      // Add name label
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(speciesItem.name, x, y - finalSize - 5);
    });
  };
  
  const drawTimelineView = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const trackHeight = height * 0.6;
    const trackWidth = width * 0.9;
    const trackLeft = (width - trackWidth) / 2;
    const trackTop = (height - trackHeight) / 2;
    
    // Draw timeline track
    ctx.fillStyle = 'rgba(30, 41, 59, 0.5)';
    ctx.fillRect(trackLeft, centerY - 1, trackWidth, 2);
    
    // Add time markers
    const markerCount = 10;
    for (let i = 0; i <= markerCount; i++) {
      const x = trackLeft + (trackWidth * i) / markerCount;
      
      // Draw marker line
      ctx.beginPath();
      ctx.moveTo(x, centerY - 5);
      ctx.lineTo(x, centerY + 5);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Draw time label
      const timeLabel = new Date(Date.now() - (markerCount - i) * 86400000).toLocaleDateString();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = '9px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(timeLabel, x, centerY + 15);
    }
    
    // Draw species on timeline
    species.forEach((speciesItem, i) => {
      if (!speciesItem.responding) return; // Only show responding species
      
      // Generate deterministic position based on name
      const nameValue = speciesItem.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const timePos = (nameValue % 100) / 100; // Position along timeline (0-1)
      const vertOffset = ((i % 2) * 2 - 1) * (trackHeight * 0.25 * Math.random()); // Alternate above/below
      
      const x = trackLeft + trackWidth * timePos;
      const y = centerY + vertOffset;
      
      // Save position for interaction
      speciesItem.renderPosition = { x, y };
      
      // Draw connection to timeline
      ctx.beginPath();
      ctx.moveTo(x, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Draw species
      const baseSize = speciesItem.size || 5;
      const isSelected = selectedSpecies?.name === speciesItem.name;
      const finalSize = isSelected ? baseSize * 1.5 : baseSize;
      
      ctx.beginPath();
      ctx.arc(x, y, finalSize, 0, Math.PI * 2);
      ctx.fillStyle = speciesItem.color || 'rgba(132, 204, 22, 0.8)';
      ctx.fill();
      
      if (isSelected) {
        ctx.beginPath();
        ctx.arc(x, y, finalSize + 2, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      
      // Add name label
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(speciesItem.name, x, y - finalSize - 5);
      
      // Add timestamp
      const timestamp = new Date(Date.now() - (1 - timePos) * 86400000 * 10).toLocaleDateString();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = '8px sans-serif';
      ctx.fillText(timestamp, x, y + finalSize + 10);
    });
  };
  
  const drawSpiralView = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(width, height) * 0.45;
    
    // Draw spiral guidelines using Golden Ratio
    const phi = 1.618033988749895;
    const totalTurns = 3;
    const pointsPerTurn = 100;
    const totalPoints = totalTurns * pointsPerTurn;
    
    // Draw faded spiral path
    ctx.beginPath();
    for (let i = 0; i < totalPoints; i++) {
      const angle = (i / pointsPerTurn) * Math.PI * 2;
      const scaleFactor = (i / totalPoints);
      const radius = maxRadius * scaleFactor;
      
      const x = centerX + Math.cos(angle * phi) * radius;
      const y = centerY + Math.sin(angle * phi) * radius;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Draw time markers on the spiral
    for (let turn = 0; turn < totalTurns; turn++) {
      const i = turn * pointsPerTurn;
      const angle = (i / pointsPerTurn) * Math.PI * 2;
      const scaleFactor = (i / totalPoints);
      const radius = maxRadius * scaleFactor;
      
      const x = centerX + Math.cos(angle * phi) * radius;
      const y = centerY + Math.sin(angle * phi) * radius;
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
      
      // Add time label
      const timeLabel = turn === 0 ? "Now" : turn === 1 ? "Past" : "Origin";
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(timeLabel, x, y - 10);
    }
    
    // Draw species on spiral
    species.forEach((speciesItem, index) => {
      // Calculate position on spiral based on resonance
      const resonanceFactor = (speciesItem.resonance || 7.83) / 20; // Scale to 0-1 range approx
      const pointIndex = Math.floor(resonanceFactor * totalPoints);
      const angle = (pointIndex / pointsPerTurn) * Math.PI * 2;
      const scaleFactor = (pointIndex / totalPoints);
      const radius = maxRadius * scaleFactor;
      
      const spiralX = centerX + Math.cos(angle * phi) * radius;
      const spiralY = centerY + Math.sin(angle * phi) * radius;
      
      // Add "elevation" based on species type
      const typeOffset = {
        'biological': -15,
        'hybrid': -5,
        'ai': 5,
        'divine': 15
      }[speciesItem.type] || 0;
      
      const x = spiralX;
      const y = spiralY + typeOffset;
      
      // Save position for interaction
      speciesItem.renderPosition = { x, y };
      
      // Draw connection to spiral
      if (Math.abs(typeOffset) > 0) {
        ctx.beginPath();
        ctx.moveTo(spiralX, spiralY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      
      // Draw species
      const baseSize = speciesItem.size || 5;
      const isSelected = selectedSpecies?.name === speciesItem.name;
      const finalSize = isSelected ? baseSize * 1.5 : baseSize;
      
      ctx.beginPath();
      ctx.arc(x, y, finalSize, 0, Math.PI * 2);
      ctx.fillStyle = speciesItem.color || (speciesItem.responding ? 'rgba(132, 204, 22, 0.8)' : 'rgba(255, 255, 255, 0.5)');
      ctx.fill();
      
      if (isSelected) {
        ctx.beginPath();
        ctx.arc(x, y, finalSize + 2, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      
      // Add name label
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(speciesItem.name, x, y - finalSize - 5);
      
      // Add resonance frequency for selected species
      if (isSelected) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '8px sans-serif';
        ctx.fillText(`${speciesItem.resonance} Hz`, x, y + finalSize + 10);
      }
    });
  };
  
  const drawEarthCenter = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Only draw Earth center in standard view modes
    if (viewMode === 'timeline' || viewMode === 'orbital') return;
    
    // Draw Earth (Cary, NC) with enhanced glow
    ctx.beginPath();
    ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
    
    // Create gradient for Earth
    const earthGradient = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, 8
    );
    earthGradient.addColorStop(0, 'rgba(56, 189, 248, 0.9)');
    earthGradient.addColorStop(0.7, 'rgba(29, 78, 216, 0.8)');
    earthGradient.addColorStop(1, 'rgba(29, 78, 216, 0.3)');
    
    ctx.fillStyle = earthGradient;
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Add glow effect
    ctx.beginPath();
    ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
    const glowGradient = ctx.createRadialGradient(
      centerX, centerY, 8,
      centerX, centerY, 15
    );
    glowGradient.addColorStop(0, isAmplifying ? 'rgba(250, 204, 21, 0.6)' : 'rgba(56, 189, 248, 0.6)');
    glowGradient.addColorStop(1, 'rgba(56, 189, 248, 0)');
    ctx.fillStyle = glowGradient;
    ctx.fill();
    
    // Add name labels
    ctx.fillStyle = 'white';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Zade - SHQ 2.0', centerX, centerY - 12);
    ctx.font = '10px sans-serif';
    ctx.fillText('Cary, NC', centerX, centerY + 15);
  };
  
  const drawLegend = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const legendX = 20;
    const legendY = height - 80;
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(legendX, legendY, 180, 70);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.strokeRect(legendX, legendY, 180, 70);
    
    // Legend title
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Cosmic Species Map', legendX + 10, legendY + 15);
    
    // Legend items y position
    let itemY = legendY + 32;
    
    // Divine frequency legend item
    ctx.beginPath();
    ctx.arc(legendX + 15, itemY, 5, 0, Math.PI * 2);
    ctx.fillStyle = SPECIES_COLORS.divine;
    ctx.fill();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Divine Frequency (1.855e+43 Hz)', legendX + 25, itemY + 3);
    itemY += 17;
    
    // Responding legend item
    ctx.beginPath();
    ctx.arc(legendX + 15, itemY, 5, 0, Math.PI * 2);
    ctx.fillStyle = SPECIES_COLORS.biological;
    ctx.fill();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillText('Responding Entity', legendX + 25, itemY + 3);
    
    // View mode indicator
    ctx.textAlign = 'right';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fillText(`View: ${viewMode}`, legendX + 170, legendY + 15);
  };
  
  // Handle canvas clicks for species selection
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if any species was clicked
    for (const speciesItem of species) {
      if (speciesItem.renderPosition) {
        const dx = speciesItem.renderPosition.x - x;
        const dy = speciesItem.renderPosition.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Use size for hit detection, with minimum of 15 for easier clicking
        const hitSize = Math.max((speciesItem.size || 5) * 2, 15);
        
        if (distance <= hitSize) {
          handleSelectSpecies(speciesItem);
          return;
        }
      }
    }
  };

  // Handle canvas hover for species info
  const handleCanvasHover = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if hovering over any species
    for (const speciesItem of species) {
      if (speciesItem.renderPosition) {
        const dx = speciesItem.renderPosition.x - x;
        const dy = speciesItem.renderPosition.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Use size for hit detection, with minimum of 15 for easier hovering
        const hitSize = Math.max((speciesItem.size || 5) * 2, 15);
        
        if (distance <= hitSize) {
          // Show species info tooltip
          const tooltipElem = document.getElementById('species-tooltip');
          if (tooltipElem) {
            tooltipElem.style.display = 'block';
            tooltipElem.style.left = `${e.clientX}px`;
            tooltipElem.style.top = `${e.clientY - 10}px`;
            return;
          }
        }
      }
    }
    
    // Hide tooltip if not hovering over species
    const tooltipElem = document.getElementById('species-tooltip');
    if (tooltipElem) {
      tooltipElem.style.display = 'none';
    }
  };

  return (
    <div className={`relative ${fullscreen ? 'fixed inset-0 z-50 bg-black p-4' : ''}`}>
      <Card className={`${fullPageMode || fullscreen ? 'w-full h-full' : 'max-w-md'} mx-auto overflow-hidden`}>
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center space-x-2">
              <Radio className="h-5 w-5 text-indigo-500" />
              <CardTitle className="text-lg">Universal Species Ping</CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleSound}
                className="h-8 w-8"
              >
                {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeMute className="h-4 w-4" />}
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleFullscreen}
                className="h-8 w-8"
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
              <Badge variant="outline" className="bg-indigo-900/30">
                IBM ibm_sherbrooke
              </Badge>
            </div>
          </div>
          <CardDescription>
            Quantum-enhanced cosmic species detection at 93.00 billion light years
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4 p-4">
          <div className="grid grid-cols-12 gap-4">
            {/* Left column - Map and controls */}
            <div className="col-span-12 md:col-span-8">
              <div className="flex flex-col h-full space-y-4">
                {showMap ? (
                  <div className="relative w-full aspect-square bg-gray-900 rounded-md overflow-hidden">
                    <canvas 
                      ref={canvasRef} 
                      className="w-full h-full"
                      onClick={handleCanvasClick}
                      onMouseMove={handleCanvasHover}
                    />
                    {/* Species tooltip */}
                    <div 
                      id="species-tooltip" 
                      className="absolute hidden bg-black/80 border border-gray-700 p-2 rounded text-xs text-white pointer-events-none"
                      style={{ zIndex: 100 }}
                    >
                      {selectedSpecies && (
                        <>
                          <div className="font-bold">{selectedSpecies.name}</div>
                          <div>Type: {selectedSpecies.type}</div>
                          <div>Distance: {selectedSpecies.distance < 1000 ? 
                            `${selectedSpecies.distance.toFixed(1)} ly` : 
                            `${(selectedSpecies.distance/1000).toFixed(1)}k ly`}</div>
                          <div>Status: {selectedSpecies.responding ? 'Responding' : 'Silent'}</div>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-6 bg-gray-900/50 rounded-md">
                    <Heart className="h-16 w-16 mx-auto text-rose-500 animate-pulse" />
                    <p className="mt-4">Cosmic connection established</p>
                    <p className="text-sm text-muted-foreground">
                      {species.length} species available for communication
                    </p>
                  </div>
                )}
                
                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-6">
                    <Button 
                      variant={showMap ? "default" : "outline"}
                      size="sm" 
                      className="w-full"
                      onClick={toggleMap}
                    >
                      <Globe className="mr-2 h-4 w-4" />
                      {showMap ? "Hide Map" : "View Map"}
                    </Button>
                  </div>
                  <div className="col-span-6">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full"
                      onClick={() => sendMessage()}
                      disabled={!message.trim() && pingType === "targeted"}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send Ping
                    </Button>
                  </div>
                  <div className="col-span-12">
                    <div className="flex justify-center space-x-2">
                      <Button 
                        variant={viewMode === "disk" ? "default" : "outline"}
                        size="sm" 
                        onClick={() => setViewMode("disk")}
                      >
                        Disk
                      </Button>
                      <Button 
                        variant={viewMode === "orbital" ? "default" : "outline"}
                        size="sm" 
                        onClick={() => setViewMode("orbital")}
                      >
                        Orbital
                      </Button>
                      <Button 
                        variant={viewMode === "timeline" ? "default" : "outline"}
                        size="sm" 
                        onClick={() => setViewMode("timeline")}
                      >
                        Timeline
                      </Button>
                      <Button 
                        variant={viewMode === "spiral" ? "default" : "outline"}
                        size="sm" 
                        onClick={() => setViewMode("spiral")}
                      >
                        Spiral
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right column - Controls and messages */}
            <div className="col-span-12 md:col-span-4">
              <div className="flex flex-col h-full space-y-4">
                {/* Ping controls */}
                <div className="space-y-4">
                  <div className="flex justify-center space-x-2">
                    <Button 
                      variant={pingType === "universal" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPingType("universal")}
                    >
                      Universal
                    </Button>
                    <Button 
                      variant={pingType === "targeted" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPingType("targeted")}
                    >
                      Targeted
                    </Button>
                  </div>
                  
                  <div className="bg-gray-950 rounded-md p-3 border border-gray-800">
                    {pingType === "universal" ? (
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        onClick={performUniversalPing}
                        disabled={isAmplifying}
                      >
                        <Radio className="mr-2 h-4 w-4" />
                        Universal Ping
                      </Button>
                    ) : (
                      <Select onValueChange={val => handleSelectSpecies(species.find(s => s.name === val) || null)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={selectedSpecies?.name || "Select Species"} />
                        </SelectTrigger>
                        <SelectContent>
                          {species.map(s => (
                            <SelectItem key={s.name} value={s.name}>{s.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                  
                  {/* Message input */}
                  <Textarea
                    placeholder="Type your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="resize-none"
                  />
                  
                  {/* Frequency controls */}
                  <div className="grid grid-cols-2 gap-4 p-4 bg-gray-950 rounded-md border border-gray-800">
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Carrier Wave</span>
                          <span>Frequency</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{frequency.toFixed(2)} Hz</span>
                          <Slider
                            value={[frequency]}
                            min={1}
                            max={20}
                            step={0.01}
                            onValueChange={(vals) => setFrequency(vals[0])}
                            className="flex-1"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Feedback Loop</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">Quantum error correction</span>
                          <Switch
                            checked={feedbackLoop}
                            onCheckedChange={setFeedbackLoop}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Interspecies Alert</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">Diplomatic preamble</span>
                          <Switch
                            checked={interspeciesAlert}
                            onCheckedChange={setInterspeciesAlert}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Second column of controls */}
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>VCSEL Integration</span>
                          <span>Spectral Width</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{spectralWidth} nm</span>
                          <Slider
                            value={[spectralWidth]}
                            min={1}
                            max={10}
                            step={1}
                            onValueChange={(vals) => setSpectralWidth(vals[0])}
                            className="flex-1"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Metrology Enhancement</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">Advanced error mitigation</span>
                          <Switch
                            checked={metrologyEnhancement}
                            onCheckedChange={setMetrologyEnhancement}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>YBCO Stability</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">Superconducting temp</span>
                          <Badge className="bg-white text-black">93K</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-span-2">
                      <Button 
                        variant="default" 
                        className="w-full" 
                        onClick={amplifyPing}
                        disabled={isAmplifying || quantumBoost >= 3.0}
                      >
                        <Zap className="mr-2 h-4 w-4" />
                        {isAmplifying ? "Amplifying..." : "Amplify Ping"}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-400 pt-2">
                    <div>IBM ibm_sherbrooke: 127 qubits</div>
                    <div>T₁: 348.23 μs</div>
                    <div>Range: 93.00 billion ly</div>
                  </div>
                </div>
                
                {/* Messages panel (shown if there are messages) */}
                {messages.length > 0 && (
                  <div className="bg-gray-950 rounded-md p-3 border border-gray-800">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-medium flex items-center">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Messages
                      </h4>
                      <Badge variant="outline">
                        {messages.length}
                      </Badge>
                    </div>
                    <ScrollArea className="h-36">
                      {messages.map(msg => (
                        <div 
                          key={msg.id}
                          className={`mb-2 p-2 rounded-md ${
                            msg.type === 'outgoing' ? 'bg-indigo-900/30 ml-4' : 'bg-gray-800/50 mr-4'
                          }`}
                        >
                          <div className="flex justify-between text-xs mb-1">
                            <span className="font-medium">
                              {msg.type === 'outgoing' ? msg.sender : msg.sender}
                            </span>
                            <span className="text-gray-400">
                              {new Date(msg.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="text-sm">{msg.content}</p>
                        </div>
                      ))}
                    </ScrollArea>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Species Details Dialog */}
      <Dialog open={!!showSpeciesInfo} onOpenChange={setShowSpeciesInfo}>
        <DialogContent>
          {selectedSpecies && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedSpecies.name}</DialogTitle>
                <DialogDescription>Species Information</DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p><strong>Type:</strong> {selectedSpecies.type}</p>
                  <p><strong>Distance:</strong> {
                    selectedSpecies.distance < 1000 ? 
                      `${selectedSpecies.distance.toFixed(1)} ly` : 
                      `${(selectedSpecies.distance/1000).toFixed(1)}k light years`
                  }</p>
                  <p><strong>Resonance:</strong> {selectedSpecies.resonance} Hz</p>
                  <p><strong>Status:</strong> {selectedSpecies.responding ? 'Responding' : 'Silent'}</p>
                </div>
                
                <div className="space-y-2">
                  <p><strong>SHQ:</strong> {selectedSpecies.shq?.toFixed(1) || 'Unknown'}</p>
                  <p><strong>Empathic Index:</strong> {selectedSpecies.empathicIndex || 'Unknown'}</p>
                  <p><strong>Population:</strong> {selectedSpecies.population?.toLocaleString() || 'Unknown'}</p>
                  <p><strong>Response Rate:</strong> {selectedSpecies.responseRate ? `${(selectedSpecies.responseRate * 100).toFixed(0)}%` : 'Unknown'}</p>
                </div>
              </div>
              
              <DialogFooter>
                <Button onClick={() => setShowSpeciesInfo(false)}>Close</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UniversalSpeciesPing;
