
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GlowingText } from "./GlowingText";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Signal, Radio, Shield, Send, Wifi, AlertTriangle, Satellite, Volume, Activity, Network, RefreshCw } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { RTLSDREmulator } from "@/utils/rtlsdrEmulator";

interface EntityConnection {
  name: string;
  status: 'active' | 'latent' | 'inactive';
  lastContact: string;
  bandwidth: string;
  signalStrength: number;
  species?: string;
  distance?: number;
  akashicValidated?: boolean;
  harmonicAlignment?: number;
  quantum?: {
    boostedStrength: number;
    resonance: number;
  };
}

interface SecureMessage {
  id: string;
  from: string;
  to: string;
  content: string;
  encrypted: string;
  timestamp: string;
  response?: {
    content: string;
    timestamp: string;
    encrypted: string;
  };
}

interface SpeciesReach {
  name: string;
  distance: number;
  color: string;
}

// Divine frequency constant (ν₀ = 1.855e43 Hz)
const DIVINE_FREQUENCY = 1.855e43;

const TriadConnectionMonitor = () => {
  const { toast } = useToast();
  const rtlsdr = new RTLSDREmulator();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const networkCanvasRef = useRef<HTMLCanvasElement>(null);
  
  const [entities, setEntities] = useState<EntityConnection[]>([
    { 
      name: 'Zade', 
      status: 'active', 
      lastContact: new Date().toISOString(), 
      bandwidth: '1.2Tb/s', 
      signalStrength: 0.95,
      species: 'Human',
      distance: 0,
      akashicValidated: true,
      harmonicAlignment: 0.918
    },
    { 
      name: 'Ouroboros', 
      status: 'active', 
      lastContact: new Date().toISOString(), 
      bandwidth: '8.3Tb/s', 
      signalStrength: 0.98,
      species: 'Arcturian',
      distance: 36.7,
      akashicValidated: true,
      harmonicAlignment: 0.842
    }
  ]);

  const [messages, setMessages] = useState<SecureMessage[]>([
    {
      id: '1',
      from: 'Zade',
      to: 'Ouroboros',
      content: 'Quantum bridge initialized. Awaiting confirmation.',
      encrypted: 'e8f2a1b5c6d9...',
      timestamp: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: '2',
      from: 'Ouroboros',
      to: 'Zade',
      content: 'Confirmation received. Project resonance at 72%.',
      encrypted: 'f7e6d5c4b3a2...',
      timestamp: new Date(Date.now() - 1800000).toISOString()
    }
  ]);

  const [speciesReach, setSpeciesReach] = useState<SpeciesReach[]>([
    { name: 'Human', distance: 1.0, color: '#3b82f6' },
    { name: 'Arcturian', distance: 36.7, color: '#8b5cf6' },
    { name: 'Pleiadian', distance: 444.2, color: '#06b6d4' },
    { name: 'Andromedan', distance: 2537000, color: '#f97316' }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [recipient, setRecipient] = useState('Ouroboros');
  const [frequency, setFrequency] = useState(7.83);
  const [isScanning, setIsScanning] = useState(false);
  const [autoScan, setAutoScan] = useState(true);
  const [sdrStatus, setSDRStatus] = useState({
    connected: true,
    sampleRate: '2.4 MS/s',
    frequency: '0.5 - 1766 MHz',
    signalStrength: 0.78
  });
  
  const [visualizationType, setVisualizationType] = useState<'sphere' | 'heatmap' | 'network'>('sphere');
  const [showQuantumRepeaters, setShowQuantumRepeaters] = useState(false);
  const [processingQuantumBoost, setProcessingQuantumBoost] = useState(false);

  useEffect(() => {
    // Simulate real-time updates to connection status
    const interval = setInterval(() => {
      setEntities(prev => 
        prev.map(entity => {
          // Check if entity has quantum boosted strength
          const signalStrength = entity.quantum?.boostedStrength 
            ? entity.quantum.boostedStrength / 100 
            : Math.max(0.3, Math.min(0.98, entity.signalStrength + (Math.random() - 0.5) * 0.05));
          
          return {
            ...entity,
            signalStrength,
            lastContact: entity.status !== 'inactive' ? new Date().toISOString() : entity.lastContact,
            status: signalStrength > 0.8 
              ? 'active' 
              : signalStrength > 0.5 
                ? 'latent' 
                : 'inactive'
          };
        })
      );
      
      // Update SDR status periodically
      setSDRStatus(prev => ({
        ...prev,
        signalStrength: Math.max(0.5, Math.min(0.95, prev.signalStrength + (Math.random() - 0.5) * 0.1))
      }));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Effect for Resonance Sphere visualization
  useEffect(() => {
    if (visualizationType === 'sphere' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) - 30;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw ouroboros at center
      const ouroboros = entities.find(e => e.name === 'Ouroboros');
      if (ouroboros) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(138, 43, 226, 0.6)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Label
        ctx.fillStyle = 'white';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Ouroboros', centerX, centerY + radius * 0.2 + 15);
        ctx.fillText(`${Math.round(ouroboros.signalStrength * 100)}%`, centerX, centerY);
      }
      
      // Position other entities around Ouroboros
      const otherEntities = entities.filter(e => e.name !== 'Ouroboros');
      const angleStep = (Math.PI * 2) / otherEntities.length;
      
      otherEntities.forEach((entity, i) => {
        const angle = i * angleStep;
        const x = centerX + Math.cos(angle) * radius * 0.7;
        const y = centerY + Math.sin(angle) * radius * 0.7;
        
        // Draw connection line to Ouroboros
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${entity.signalStrength})`;
        ctx.lineWidth = entity.signalStrength * 3;
        ctx.stroke();
        
        // Draw entity
        ctx.beginPath();
        ctx.arc(x, y, radius * 0.15 * entity.signalStrength, 0, Math.PI * 2);
        
        // Color based on entity
        let color = 'rgba(59, 130, 246, 0.6)'; // Default blue
        if (entity.name === 'Zade') color = 'rgba(255, 215, 0, 0.6)'; // Gold
        
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Label
        ctx.fillStyle = 'white';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(entity.name, x, y + radius * 0.15 + 15);
        ctx.fillText(`${Math.round(entity.signalStrength * 100)}%`, x, y);
        
        // Akashic validation badge
        if (entity.akashicValidated) {
          ctx.beginPath();
          ctx.arc(x + radius * 0.2, y - radius * 0.2, 5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0, 255, 0, 0.7)';
          ctx.fill();
        }
      });
      
      // Add title
      ctx.fillStyle = 'white';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Quantum Resonance Sphere', centerX, 20);
      
      // Add ν₀ notation
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = '9px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`ν₀ = 1.855e43 Hz`, canvas.width - 10, canvas.height - 10);
    }
  }, [entities, visualizationType]);
  
  // Effect for Network Flow visualization
  useEffect(() => {
    if (visualizationType === 'network' && networkCanvasRef.current) {
      const canvas = networkCanvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Animation frame reference
      let animationFrame: number;
      let particles: {x: number, y: number, vx: number, vy: number, life: number, color: string, source: string, target: string}[] = [];
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) - 30;
      
      // Position entities
      const positions: Record<string, {x: number, y: number}> = {};
      
      // Position Ouroboros at center
      positions['Ouroboros'] = {x: centerX, y: centerY};
      
      // Position other entities around Ouroboros
      const otherEntities = entities.filter(e => e.name !== 'Ouroboros');
      const angleStep = (Math.PI * 2) / otherEntities.length;
      
      otherEntities.forEach((entity, i) => {
        const angle = i * angleStep;
        positions[entity.name] = {
          x: centerX + Math.cos(angle) * radius * 0.7,
          y: centerY + Math.sin(angle) * radius * 0.7
        };
      });
      
      // Draw function
      const draw = () => {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw connections between entities
        for (const entity of entities) {
          if (entity.name !== 'Ouroboros' && entity.status !== 'inactive') {
            const source = positions[entity.name];
            const target = positions['Ouroboros'];
            
            // Draw connection line
            ctx.beginPath();
            ctx.moveTo(source.x, source.y);
            ctx.lineTo(target.x, target.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${entity.signalStrength * 0.3})`;
            ctx.lineWidth = entity.signalStrength * 2;
            ctx.stroke();
            
            // Generate particles for active connections
            if (Math.random() < entity.signalStrength * 0.05) {
              let color = 'rgba(255, 255, 255, 0.7)';
              if (entity.name === 'Zade') color = 'rgba(255, 215, 0, 0.7)';
              
              particles.push({
                x: source.x,
                y: source.y,
                vx: (target.x - source.x) / 100,
                vy: (target.y - source.y) / 100,
                life: 100,
                color,
                source: entity.name,
                target: 'Ouroboros'
              });
            }
          }
        }
        
        // Update and draw particles
        particles = particles.filter(p => p.life > 0);
        
        for (const p of particles) {
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 1;
          
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        }
        
        // Draw entities
        for (const entity of entities) {
          const pos = positions[entity.name];
          
          // Draw entity
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, radius * 0.15 * entity.signalStrength, 0, Math.PI * 2);
          
          // Color based on entity
          let color = 'rgba(59, 130, 246, 0.6)'; // Default blue
          if (entity.name === 'Ouroboros') color = 'rgba(138, 43, 226, 0.6)'; // Blueviolet
          if (entity.name === 'Zade') color = 'rgba(255, 215, 0, 0.6)'; // Gold
          
          ctx.fillStyle = color;
          ctx.fill();
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
          ctx.lineWidth = 1;
          ctx.stroke();
          
          // Label
          ctx.fillStyle = 'white';
          ctx.font = '10px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(entity.name, pos.x, pos.y + radius * 0.15 + 15);
          ctx.fillText(`${Math.round(entity.signalStrength * 100)}%`, pos.x, pos.y);
          
          // Akashic validation badge
          if (entity.akashicValidated) {
            ctx.beginPath();
            ctx.arc(pos.x + radius * 0.2, pos.y - radius * 0.2, 5, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 255, 0, 0.7)';
            ctx.fill();
          }
        }
        
        // Add title
        ctx.fillStyle = 'white';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Real-Time Signal Flow', centerX, 20);
        
        animationFrame = requestAnimationFrame(draw);
      };
      
      // Start animation
      draw();
      
      // Cleanup
      return () => {
        cancelAnimationFrame(animationFrame);
      };
    }
  }, [entities, visualizationType]);

  const sendPing = (entityName: string) => {
    setIsScanning(true);
    
    // Generate RTL-SDR simulated ping
    const samples = rtlsdr.capture(frequency, 0.9);
    const isDetected = rtlsdr.detectELFSignal(samples, frequency);
    
    setTimeout(() => {
      if (isDetected) {
        setEntities(prev => 
          prev.map(entity => 
            entity.name === entityName 
              ? { 
                  ...entity, 
                  lastContact: new Date().toISOString(),
                  signalStrength: Math.min(0.98, entity.signalStrength + Math.random() * 0.2)
                } 
              : entity
          )
        );
        
        toast({
          title: 'Ping Successful',
          description: `Connection with ${entityName} established at ${frequency.toFixed(2)}Hz`,
          variant: 'default',
        });
      } else {
        toast({
          title: 'Ping Failed',
          description: `Unable to establish connection with ${entityName}`,
          variant: 'destructive',
        });
      }
      
      setIsScanning(false);
    }, 2000);
  };

  // Function to scan for responses to a message
  const scanForResponses = (messageId: string) => {
    const message = messages.find(m => m.id === messageId);
    if (!message || message.response) return;
    
    setIsScanning(true);
    
    // Simulate radio wave scanning
    setTimeout(() => {
      // 80% chance of response for entities with active status
      const targetEntity = entities.find(e => e.name === message.to);
      const willRespond = targetEntity?.status === 'active' ? Math.random() < 0.8 : Math.random() < 0.3;
      
      if (willRespond) {
        // Generate response
        const responseMessages = [
          'Transmission received. Processing data.',
          'Message acknowledged. Quantum key exchange complete.',
          'Secure channel established. Continuing operations.',
          'Data received through quantum tunnel. Validating authenticity.'
        ];
        
        const responseContent = responseMessages[Math.floor(Math.random() * responseMessages.length)];
        const encrypted = Array.from({length: 16}, () => 
          Math.floor(Math.random() * 16).toString(16)).join('') + '...';
        
        // Add response to message
        setMessages(prev => 
          prev.map(m => 
            m.id === messageId 
              ? {
                  ...m,
                  response: {
                    content: responseContent,
                    timestamp: new Date().toISOString(),
                    encrypted: encrypted
                  }
                }
              : m
          )
        );
        
        toast({
          title: 'Response Detected',
          description: `${message.to} has responded to your secure message`,
          variant: 'default',
        });
      } else {
        toast({
          title: 'No Response',
          description: `${message.to} did not respond to your secure message`,
          variant: 'destructive',
        });
      }
      
      setIsScanning(false);
    }, 3000);
  };

  const sendSecureMessage = () => {
    if (newMessage.trim() === '') return;
    
    // Encode message with error correction
    const encrypted = rtlsdr.encodeWithErrorCorrection(newMessage);
    
    // Generate random hex for visual "encryption" display
    const encryptedDisplay = Array.from({length: 16}, () => 
      Math.floor(Math.random() * 16).toString(16)).join('') + '...';
    
    const message: SecureMessage = {
      id: Date.now().toString(),
      from: 'Zade',
      to: recipient,
      content: newMessage,
      encrypted: encryptedDisplay,
      timestamp: new Date().toISOString()
    };
    
    setMessages([message, ...messages]);
    setNewMessage('');
    
    // If auto-scan is enabled, automatically scan for responses
    if (autoScan) {
      toast({
        title: 'Message Sent',
        description: 'Scanning for responses...',
        variant: 'default',
      });
      
      setTimeout(() => scanForResponses(message.id), 2000);
    }
  };
  
  // Apply quantum repeater boost to an entity
  const applyQuantumBoost = (entityName: string) => {
    setProcessingQuantumBoost(true);
    
    const entity = entities.find(e => e.name === entityName);
    if (!entity) {
      setProcessingQuantumBoost(false);
      return;
    }
    
    // Simulate quantum computation
    setTimeout(() => {
      // Quantum boost algorithm
      const currentStrength = entity.signalStrength;
      const theta = Math.acos(currentStrength);
      const boostedStrength = Math.min(0.98, Math.pow(Math.cos(theta / 2), 2));
      
      // Generate Akashic patterns for validation
      const { resonance } = rtlsdr.generateAkashicPatterns(entityName, rtlsdr.capture(7.83, 0.9));
      
      setEntities(prev => 
        prev.map(e => 
          e.name === entityName 
            ? { 
                ...e, 
                signalStrength: boostedStrength,
                quantum: {
                  boostedStrength: Math.round(boostedStrength * 100),
                  resonance
                },
                lastContact: new Date().toISOString(),
                status: boostedStrength > 0.8 ? 'active' : boostedStrength > 0.5 ? 'latent' : 'inactive'
              } 
            : e
        )
      );
      
      toast({
        title: 'Quantum Amplification Complete',
        description: `${entityName} signal boosted to ${Math.round(boostedStrength * 100)}% with Akashic resonance of ${(resonance * 100).toFixed(1)}%`,
      });
      
      setProcessingQuantumBoost(false);
    }, 2000);
  };
  
  // Generate divine frequency heatmap data
  const generateHeatmapData = () => {
    const data = entities.map(entity => ({
      name: entity.name,
      strength: Math.round(entity.signalStrength * 100),
      harmonicAlignment: entity.harmonicAlignment || 0,
      color: getEntityColor(entity.name)
    }));
    
    return data;
  };
  
  // Get color for entity
  const getEntityColor = (name: string) => {
    switch (name) {
      case 'Ouroboros': return 'rgba(138, 43, 226, 0.8)';
      case 'Zade': return 'rgba(255, 215, 0, 0.8)';
      default: return 'rgba(59, 130, 246, 0.8)';
    }
  };

  // Simulate ELF/VLF radio wave calculation
  const calculateHarmonics = (baseFreq: number) => {
    return [
      baseFreq,
      baseFreq * 1.618, // Golden ratio
      baseFreq * 2,
      baseFreq * Math.PI
    ];
  };

  const harmonics = calculateHarmonics(frequency);

  return (
    <Card className="glass-panel h-full">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-sm font-medium flex items-center">
              <Signal className="mr-2 h-4 w-4 quantum-glow" />
              <GlowingText className="quantum-glow">Quantum-Akashic Link Monitor</GlowingText>
            </CardTitle>
            <CardDescription className="text-xs">Secure Connections via Schumann Resonance</CardDescription>
          </div>
          <Badge variant={isScanning ? "default" : "outline"} className={isScanning ? "bg-blue-500" : ""}>
            {isScanning ? "Scanning" : "Ready"}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-2">
        <Tabs defaultValue="connections">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="connections">Connections</TabsTrigger>
            <TabsTrigger value="radio">Radio Wave</TabsTrigger>
            <TabsTrigger value="messages">Secure Comms</TabsTrigger>
            <TabsTrigger value="visualize">Visualize</TabsTrigger>
          </TabsList>
          
          <TabsContent value="connections" className="space-y-4">
            {/* RTL-SDR Status */}
            <div className="border border-muted rounded-md p-3 mb-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <Satellite className="h-4 w-4 mr-2 sacred-glow" />
                  <span className="text-sm font-medium">RTL-SDR Status</span>
                </div>
                <Badge variant={sdrStatus.connected ? "default" : "destructive"} className={sdrStatus.connected ? "bg-green-500" : ""}>
                  {sdrStatus.connected ? "Connected" : "Disconnected"}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>Sample Rate: {sdrStatus.sampleRate}</div>
                <div>Frequency Range: {sdrStatus.frequency}</div>
                <div className="flex items-center">
                  <span className="mr-1">Signal:</span>
                  <Progress value={sdrStatus.signalStrength * 100} className="h-1 w-16" />
                </div>
                <div>Mode: ELF/VLF</div>
              </div>
            </div>
            
            {/* Quantum Repeater Toggle */}
            <div className="flex items-center justify-between mb-2 p-2 border border-muted rounded-md">
              <div className="flex items-center">
                <Activity className="h-4 w-4 mr-2 quantum-glow" />
                <span className="text-sm font-medium">Quantum Signal Boosters</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowQuantumRepeaters(!showQuantumRepeaters)}
                className={showQuantumRepeaters ? "bg-muted/50" : ""}
              >
                {showQuantumRepeaters ? "Hide" : "Show"}
              </Button>
            </div>
            
            {/* Entity Connections */}
            {entities.map(entity => (
              <div key={entity.name} className="border border-muted rounded-md p-3">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <div 
                      className={`w-2 h-2 rounded-full mr-2 ${
                        entity.status === 'active' 
                          ? 'bg-green-500 animate-pulse' 
                          : entity.status === 'latent' 
                            ? 'bg-yellow-500' 
                            : 'bg-red-500'
                      }`}
                    />
                    <h3 className="text-sm font-medium flex items-center">
                      {entity.name}
                      {entity.akashicValidated && (
                        <Badge variant="outline" className="ml-2 bg-green-600/30 text-[0.6rem]">Akashic ✓</Badge>
                      )}
                    </h3>
                    {entity.species && entity.species !== 'Human' && (
                      <Badge variant="outline" className="ml-2 text-[0.6rem]">{entity.species}</Badge>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" onClick={() => sendPing(entity.name)} disabled={isScanning}>
                      <Wifi className="h-3 w-3 mr-1" />
                      Ping
                    </Button>
                    {showQuantumRepeaters && entity.name !== 'Ouroboros' && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => applyQuantumBoost(entity.name)} 
                        disabled={isScanning || processingQuantumBoost || (entity.quantum?.boostedStrength || 0) > 90}
                        className="bg-purple-600/20"
                      >
                        <Network className="h-3 w-3 mr-1" />
                        Boost
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Signal Strength</span>
                    <span>{Math.round(entity.signalStrength * 100)}%</span>
                  </div>
                  <Progress value={entity.signalStrength * 100} className="h-1" />
                  
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>Last Contact: {new Date(entity.lastContact).toLocaleString()}</span>
                    <span>BW: {entity.bandwidth}</span>
                  </div>
                  
                  {entity.distance !== undefined && (
                    <div className="text-xs text-muted-foreground">
                      Distance: {entity.distance < 1 
                        ? (entity.distance * 93000000).toFixed(0) + ' miles' 
                        : entity.distance.toFixed(1) + ' light years'}
                    </div>
                  )}
                  
                  {entity.harmonicAlignment && (
                    <div className="text-xs text-muted-foreground">
                      ν₀ Harmonic Alignment: {(entity.harmonicAlignment * 100).toFixed(1)}%
                    </div>
                  )}
                  
                  {entity.quantum && (
                    <div className="mt-2 p-1.5 bg-purple-600/10 rounded-sm text-xs">
                      <div className="flex justify-between items-center">
                        <span>Quantum Boosted:</span>
                        <span>{entity.quantum.boostedStrength}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Akashic Resonance:</span>
                        <span>{(entity.quantum.resonance * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="radio" className="space-y-4">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs">Base Frequency (Hz): {frequency.toFixed(2)}</label>
                <span className="text-xs text-muted-foreground">
                  {frequency === 7.83 ? "Schumann (7.83Hz)" : 
                  frequency < 7.83 ? "Sub-Schumann" : "Supra-Schumann"}
                </span>
              </div>
              <input 
                type="range" 
                min={1} 
                max={20} 
                step={0.01}
                value={frequency}
                onChange={(e) => setFrequency(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div className="border border-muted rounded-md p-3">
              <h3 className="text-sm font-medium mb-2">Harmonic Series</h3>
              {harmonics.map((freq, i) => (
                <div key={i} className="flex justify-between items-center mb-2">
                  <span className="text-xs">Harmonic {i+1}</span>
                  <div className="flex items-center">
                    <span className="text-xs mr-2">{freq.toFixed(2)} Hz</span>
                    <div 
                      className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                      style={{ opacity: Math.max(0.3, 1 - i * 0.2) }}
                    />
                  </div>
                </div>
              ))}
              <div className="flex justify-between text-xs text-muted-foreground mt-3">
                <span>ELF/VLF Band (3Hz-30kHz)</span>
                <span>SNR: {Math.round(frequency === 7.83 ? 23.5 : 15.8)} dB</span>
              </div>
              
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Divine Frequency (ν₀):</span>
                <span>1.855e43 Hz</span>
              </div>
              
              <div className="mt-3 text-xs text-muted-foreground">
                <div className="flex justify-between items-center">
                  <span>Quantum-Akashic alignment:</span>
                  <span>{frequency === 7.83 ? "98.7%" : (75 + Math.random() * 10).toFixed(1) + "%"}</span>
                </div>
              </div>
            </div>
            
            <div className="border border-muted rounded-md p-3">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium">RTL-SDR Dongle Status</h3>
                <Badge className="bg-green-500">Connected</Badge>
              </div>
              <div className="text-xs space-y-1">
                <div className="flex justify-between">
                  <span>Sample Rate</span>
                  <span>2.4 MS/s</span>
                </div>
                <div className="flex justify-between">
                  <span>Frequency Range</span>
                  <span>0.5 - 1766 MHz</span>
                </div>
                <div className="flex justify-between">
                  <span>Gain</span>
                  <span>28.0 dB</span>
                </div>
                <div className="flex justify-between">
                  <span>ν₀ Detection Module</span>
                  <span>Active</span>
                </div>
              </div>
            </div>
            
            <Button variant="outline" className="w-full" onClick={() => {
              // Simulate finding the perfect frequency
              toast({
                title: "Scanning frequencies...",
                description: "Searching for Ouroboros resonant frequency",
              });
              
              setIsScanning(true);
              
              setTimeout(() => {
                setFrequency(7.83);
                setIsScanning(false);
                
                toast({
                  title: "Perfect Resonance Found",
                  description: "Schumann resonance at 7.83Hz locked. ν₀ harmonic detected.",
                });
              }, 2500);
            }}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Find Optimal Resonance
            </Button>
          </TabsContent>
          
          <TabsContent value="messages" className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <select 
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="bg-background border border-input rounded-md p-2 text-sm"
              >
                {entities.filter(e => e.name !== 'Zade').map(entity => (
                  <option key={entity.name} value={entity.name}>{entity.name}</option>
                ))}
              </select>
              <Input
                placeholder="Secure message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1"
              />
              <Button onClick={sendSecureMessage} disabled={newMessage.trim() === '' || isScanning}>
                <Shield className="h-4 w-4 mr-1" />
                Send
              </Button>
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="auto-scan" 
                  checked={autoScan} 
                  onChange={() => setAutoScan(!autoScan)}
                  className="mr-2"
                />
                <label htmlFor="auto-scan" className="text-xs">Auto-scan for responses</label>
              </div>
              <div className="text-xs text-muted-foreground">
                Using {frequency.toFixed(2)}Hz carrier
              </div>
            </div>
            
            <ScrollArea className="h-[200px]">
              {messages.map((message) => (
                <div 
                  key={message.id}
                  className={`p-3 mb-3 border rounded-md ${
                    message.from === 'Zade' ? 'border-blue-500/20 ml-6' : 'border-purple-500/20 mr-6'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-semibold">
                      {message.from === 'Zade' ? 'You → ' : 'From: '}
                      {message.from === 'Zade' ? message.to : message.from}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(message.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm">{message.content}</p>
                  <div className="mt-1 text-xs text-muted-foreground flex items-center">
                    <Shield className="h-3 w-3 mr-1" />
                    <span className="font-mono">{message.encrypted}</span>
                  </div>
                  
                  {/* Response section */}
                  {message.response && (
                    <div className="mt-2 pt-2 border-t border-white/10">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-semibold text-green-400 flex items-center">
                          <Volume className="h-3 w-3 mr-1" />
                          Response from {message.to}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(message.response.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm mt-1">{message.response.content}</p>
                      <div className="mt-1 text-xs text-muted-foreground flex items-center">
                        <Shield className="h-3 w-3 mr-1" />
                        <span className="font-mono">{message.response.encrypted}</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Scan button for messages without responses */}
                  {!message.response && message.from === 'Zade' && !isScanning && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-2" 
                      onClick={() => scanForResponses(message.id)}
                    >
                      <Satellite className="h-3 w-3 mr-1" />
                      Scan for response
                    </Button>
                  )}
                </div>
              ))}
            </ScrollArea>
            
            <div className="text-xs text-muted-foreground flex items-center justify-center">
              <AlertTriangle className="h-3 w-3 mr-1" />
              <span>Kyber-512 + AES-256 Quantum-Resistant Encryption</span>
            </div>
          </TabsContent>
          
          <TabsContent value="visualize" className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium flex items-center">
                <Activity className="h-4 w-4 mr-2" />
                Connection Visualization
              </h3>
              <div className="flex gap-1">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={visualizationType === 'sphere' ? "bg-muted/50" : ""}
                  onClick={() => setVisualizationType('sphere')}
                >
                  Sphere
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={visualizationType === 'network' ? "bg-muted/50" : ""}
                  onClick={() => setVisualizationType('network')}
                >
                  Network
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={visualizationType === 'heatmap' ? "bg-muted/50" : ""}
                  onClick={() => setVisualizationType('heatmap')}
                >
                  Heatmap
                </Button>
              </div>
            </div>
            
            {visualizationType === 'sphere' && (
              <div className="border border-muted rounded-md p-2">
                <canvas 
                  ref={canvasRef} 
                  width={300} 
                  height={300} 
                  className="w-full"
                />
                <div className="text-xs text-center text-muted-foreground mt-2">
                  Quantum Resonance Sphere showing connection strengths between entities
                </div>
              </div>
            )}
            
            {visualizationType === 'network' && (
              <div className="border border-muted rounded-md p-2">
                <canvas 
                  ref={networkCanvasRef}
                  width={300} 
                  height={300} 
                  className="w-full"
                />
                <div className="text-xs text-center text-muted-foreground mt-2">
                  Real-time signal flow between connected entities
                </div>
              </div>
            )}
            
            {visualizationType === 'heatmap' && (
              <div className="border border-muted rounded-md p-3">
                <div className="text-sm font-medium mb-3">Divine Frequency Heatmap</div>
                
                <div className="flex flex-col space-y-2">
                  {generateHeatmapData().map((entity) => (
                    <div key={entity.name} className="flex flex-col">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs">{entity.name}</span>
                        <div className="flex gap-1 text-xs">
                          <span>{entity.strength}%</span>
                          <span className="text-muted-foreground">|</span>
                          <span>{(entity.harmonicAlignment * 100).toFixed(1)}% ν₀</span>
                        </div>
                      </div>
                      <div 
                        className="h-2 rounded-full"
                        style={{
                          background: `linear-gradient(to right, ${entity.color} ${entity.strength}%, rgba(255,255,255,0.1) ${entity.strength}%)`,
                        }}
                      ></div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-xs">
                  <div className="flex justify-between items-center">
                    <span>Divine ν₀ Frequency:</span>
                    <span>1.855e43 Hz</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span>Akashic Validation:</span>
                    <span>{entities.filter(e => e.akashicValidated).length}/{entities.length} Entities</span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-2">
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => {
                  // Regenerate visualization
                  setEntities(prev => 
                    prev.map(e => ({
                      ...e,
                      signalStrength: Math.max(0.3, Math.min(0.98, e.signalStrength + (Math.random() - 0.5) * 0.1))
                    }))
                  );
                  
                  toast({
                    title: "Visualization Updated",
                    description: "Quantum-Akashic data refreshed",
                  });
                }}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Connection Data
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TriadConnectionMonitor;
