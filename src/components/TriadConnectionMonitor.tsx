
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GlowingText } from "./GlowingText";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Signal, Radio, Shield, Send, Wifi, AlertTriangle, Satellite, Volume } from 'lucide-react';
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

const TriadConnectionMonitor = () => {
  const { toast } = useToast();
  const rtlsdr = new RTLSDREmulator();
  
  const [entities, setEntities] = useState<EntityConnection[]>([
    { 
      name: 'Zade', 
      status: 'active', 
      lastContact: new Date().toISOString(), 
      bandwidth: '1.2Tb/s', 
      signalStrength: 0.95,
      species: 'Human',
      distance: 0
    },
    { 
      name: 'Lockheed', 
      status: 'active', 
      lastContact: new Date(Date.now() - 15000).toISOString(), 
      bandwidth: '0.9Tb/s', 
      signalStrength: 0.87,
      species: 'Human',
      distance: 0.01
    },
    { 
      name: 'CIA', 
      status: 'latent', 
      lastContact: new Date(Date.now() - 300000).toISOString(), 
      bandwidth: '0.4Tb/s', 
      signalStrength: 0.62,
      species: 'Human',
      distance: 0.02
    },
    { 
      name: 'Ouroboros', 
      status: 'active', 
      lastContact: new Date().toISOString(), 
      bandwidth: '8.3Tb/s', 
      signalStrength: 0.98,
      species: 'Arcturian',
      distance: 36.7
    }
  ]);

  const [messages, setMessages] = useState<SecureMessage[]>([
    {
      id: '1',
      from: 'Zade',
      to: 'Lockheed',
      content: 'Quantum bridge initialized. Awaiting confirmation.',
      encrypted: 'e8f2a1b5c6d9...',
      timestamp: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: '2',
      from: 'Lockheed',
      to: 'Zade',
      content: 'Confirmation received. Project Ouroboros at 72% resonance.',
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
  const [recipient, setRecipient] = useState('Lockheed');
  const [frequency, setFrequency] = useState(7.83);
  const [isScanning, setIsScanning] = useState(false);
  const [autoScan, setAutoScan] = useState(true);
  const [sdrStatus, setSDRStatus] = useState({
    connected: true,
    sampleRate: '2.4 MS/s',
    frequency: '0.5 - 1766 MHz',
    signalStrength: 0.78
  });

  useEffect(() => {
    // Simulate real-time updates to connection status
    const interval = setInterval(() => {
      setEntities(prev => 
        prev.map(entity => ({
          ...entity,
          signalStrength: Math.max(0.3, Math.min(0.98, entity.signalStrength + (Math.random() - 0.5) * 0.05)),
          lastContact: entity.status !== 'inactive' ? new Date().toISOString() : entity.lastContact,
          status: entity.signalStrength > 0.8 
            ? 'active' 
            : entity.signalStrength > 0.5 
              ? 'latent' 
              : 'inactive'
        }))
      );
      
      // Update SDR status periodically
      setSDRStatus(prev => ({
        ...prev,
        signalStrength: Math.max(0.5, Math.min(0.95, prev.signalStrength + (Math.random() - 0.5) * 0.1))
      }));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

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
              <GlowingText className="quantum-glow">Triad Quantum-Akashic Link Monitor</GlowingText>
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
            <TabsTrigger value="reach">Reach Map</TabsTrigger>
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
                    <h3 className="text-sm font-medium">{entity.name}</h3>
                    {entity.species && entity.species !== 'Human' && (
                      <Badge variant="outline" className="ml-2 text-[0.6rem]">{entity.species}</Badge>
                    )}
                  </div>
                  <Button size="sm" variant="outline" onClick={() => sendPing(entity.name)} disabled={isScanning}>
                    <Wifi className="h-3 w-3 mr-1" />
                    Ping
                  </Button>
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
              </div>
            </div>
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
          
          <TabsContent value="reach" className="space-y-4">
            <div className="border border-muted rounded-md p-3 mb-4">
              <div className="flex items-center mb-3">
                <Signal className="h-4 w-4 mr-2" />
                <h3 className="text-sm font-medium">Quantum Field Reach Map</h3>
              </div>
              
              <div className="relative h-[250px] bg-black/20 rounded-md p-3 overflow-hidden">
                {/* Central source point (Earth) */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full z-10"></div>
                
                {/* Species reach visualization */}
                {speciesReach.map((species, index) => (
                  <div 
                    key={species.name}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full animate-pulse"
                    style={{ 
                      width: `${Math.min(100, Math.log10(species.distance) * 25)}%`, 
                      height: `${Math.min(100, Math.log10(species.distance) * 25)}%`, 
                      backgroundColor: `${species.color}20`,
                      border: `1px solid ${species.color}`,
                      zIndex: 10 - index
                    }}
                  ></div>
                ))}
                
                {/* Grid lines */}
                <div className="absolute inset-0 grid grid-cols-10 grid-rows-10">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={`col-${i}`} className="border-r border-white/5 h-full"></div>
                  ))}
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={`row-${i}`} className="border-b border-white/5 w-full"></div>
                  ))}
                </div>
                
                {/* Entity markers */}
                {entities.map(entity => {
                  // Skip Zade (center)
                  if (entity.name === 'Zade') return null;
                  
                  // Calculate position based on distance
                  const distance = entity.distance || 0;
                  const angle = entity.name.charCodeAt(0) % 360; // Random angle based on name
                  const radius = Math.min(45, Math.log10(distance + 1) * 10);
                  const x = 50 + radius * Math.cos(angle * Math.PI / 180);
                  const y = 50 + radius * Math.sin(angle * Math.PI / 180);
                  
                  return (
                    <div 
                      key={entity.name}
                      className="absolute w-2 h-2 transform -translate-x-1/2 -translate-y-1/2 z-20"
                      style={{ 
                        left: `${x}%`, 
                        top: `${y}%`,
                        backgroundColor: entity.status === 'active' ? 'green' : entity.status === 'latent' ? 'yellow' : 'red'
                      }}
                    >
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 whitespace-nowrap text-[0.6rem] bg-black/50 px-1 rounded">
                        {entity.name}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-3">
                <h4 className="text-xs font-medium mb-2">Species Reach</h4>
                <div className="grid grid-cols-2 gap-2">
                  {speciesReach.map(species => (
                    <div key={species.name} className="flex items-center text-xs">
                      <div className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: species.color }}></div>
                      <span>{species.name}:</span>
                      <span className="ml-1">
                        {species.distance < 1000 
                          ? species.distance.toFixed(1) + ' ly'
                          : (species.distance / 1000).toFixed(0) + ' Kly'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TriadConnectionMonitor;
