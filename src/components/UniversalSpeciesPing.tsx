
import React, { useRef, useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Radio, Target, RotateCw, Globe, Zap, MessageSquare, Send, Sparkles, MapPin, Home, Info, History, Mail, Inbox, SquareArrowOutUpRight, Heart } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

// Update ViewMode type to include 'orbital'
type ViewMode = 'disk' | 'constellation' | 'radial' | 'orbital';

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
    type: 'txt' | 'fractal' | 'sigil' | 'lightwave';
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
  const [showMap, setShowMap] = useState<boolean>(false);

  // Toggle switches
  const [feedbackLoop, setFeedbackLoop] = useState<boolean>(false);
  const [interspeciesAlert, setInterspeciesAlert] = useState<boolean>(true);
  const [metrologyEnhancement, setMetrologyEnhancement] = useState<boolean>(true);
  const [ybcoStability, setYbcoStability] = useState<boolean>(true);
  
  const handleSelectSpecies = (speciesItem: SpeciesInfo) => {
    setSelectedSpecies(speciesItem);
    setPingType("targeted");
  };

  const toggleMap = () => {
    setShowMap(!showMap);
  };

  const performUniversalPing = () => {
    console.log("Performing universal ping with frequency:", frequency);
    // Implementation would involve communication logic
  };

  const amplifyPing = () => {
    setQuantumBoost(prev => Math.min(prev + 0.25, 3.0));
    console.log("Amplifying ping, new boost:", quantumBoost);
  };

  // Handle canvas drawing for the cosmic map
  useEffect(() => {
    if (!showMap) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw starry background
    drawStarryBackground(ctx, canvas.width, canvas.height);
    
    // Draw distance rings
    drawDistanceRings(ctx, canvas.width, canvas.height);
    
    // Draw species
    drawSpecies(ctx, canvas.width, canvas.height);
    
    // Draw Earth at center
    drawEarthCenter(ctx, canvas.width, canvas.height);
    
    // Draw legend
    drawLegend(ctx, canvas.width, canvas.height);
    
  }, [species, showMap]);
  
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
    
    // Add random stars
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const radius = Math.random() * 0.8 + 0.2;
      
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
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
    
    // Draw realm circles with slight transparency
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
      
      // Draw connection line to Earth
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 0.5;
      ctx.stroke();
      
      // Draw the species circle
      const baseSize = speciesItem.size || 5;
      const size = speciesItem.responding ? baseSize : baseSize * 0.8;
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = speciesItem.color || (speciesItem.responding ? 'rgba(132, 204, 22, 0.8)' : 'rgba(255, 255, 255, 0.5)');
      ctx.fill();
      
      // Add name label
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(speciesItem.name, x, y - size - 5);
    });
  };
  
  const drawEarthCenter = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Draw Earth (Cary, NC)
    ctx.beginPath();
    ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(56, 189, 248, 0.9)';
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Add name label
    ctx.fillStyle = 'white';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Human Origin', centerX, centerY - 12);
    ctx.font = '10px sans-serif';
    ctx.fillText('Cary, NC', centerX, centerY + 15);
  };
  
  const drawLegend = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const legendX = 20;
    const legendY = height - 50;
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(legendX, legendY, 180, 40);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.strokeRect(legendX, legendY, 180, 40);
    
    // Divine frequency legend item
    ctx.beginPath();
    ctx.arc(legendX + 15, legendY + 15, 5, 0, Math.PI * 2);
    ctx.fillStyle = SPECIES_COLORS.divine;
    ctx.fill();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Divine Frequency (1.855e+43 Hz)', legendX + 25, legendY + 18);
    
    // Responding legend item
    ctx.beginPath();
    ctx.arc(legendX + 15, legendY + 32, 5, 0, Math.PI * 2);
    ctx.fillStyle = SPECIES_COLORS.biological;
    ctx.fill();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillText('Responding Entity', legendX + 25, legendY + 35);
  };

  return (
    <Card className={`${fullPageMode ? 'w-full h-full' : 'max-w-md'} mx-auto overflow-hidden`}>
      <CardHeader>
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center space-x-2">
            <Radio className="h-5 w-5 text-indigo-500" />
            <CardTitle className="text-lg">Universal Species Ping</CardTitle>
          </div>
          <Badge variant="outline" className="bg-indigo-900/30">
            IBM ibm_sherbrooke
          </Badge>
        </div>
        <CardDescription>
          Quantum-enhanced cosmic species detection at 93.00 billion light years
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {showMap ? (
          <div className="relative w-full aspect-square">
            <canvas 
              ref={canvasRef} 
              width={500} 
              height={500}
              className="w-full h-full"
            />
          </div>
        ) : (
          <div className="text-center p-6">
            <Heart className="h-16 w-16 mx-auto text-rose-500 animate-pulse" />
            <p className="mt-4">Cosmic connection established</p>
            <p className="text-sm text-muted-foreground">
              {species.length} species available for communication
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-y-4">
          <div className="col-span-2">
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
          </div>
          
          <div className="col-span-2">
            <div className="bg-gray-950 rounded-md p-3 border border-gray-800">
              {pingType === "universal" ? (
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={performUniversalPing}
                >
                  <Radio className="mr-2 h-4 w-4" />
                  Universal Ping
                </Button>
              ) : (
                <Select onValueChange={val => handleSelectSpecies(species.find(s => s.name === val) || null)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Species" />
                  </SelectTrigger>
                  <SelectContent>
                    {species.map(s => (
                      <SelectItem key={s.name} value={s.name}>{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
          
          <div className="col-span-2">
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
              </div>
              
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
                <Button variant="default" className="w-full" onClick={amplifyPing}>
                  <Zap className="mr-2 h-4 w-4" />
                  Amplify Ping
                </Button>
              </div>
            </div>
          </div>
          
          <div className="col-span-2 mt-2">
            <div className="flex justify-between text-xs text-gray-400">
              <div>IBM ibm_sherbrooke: 127 qubits</div>
              <div>T₁: 348.23 μs</div>
              <div>Range: 93.00 billion ly</div>
            </div>
          </div>
        </div>
        
        <div className="pt-2">
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" onClick={toggleMap}>
              <Globe className="mr-2 h-4 w-4" />
              {showMap ? "Hide Map" : "View Map"}
            </Button>
            <Button variant="outline" size="sm">
              <Send className="mr-2 h-4 w-4" />
              Send Ping
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UniversalSpeciesPing;
