
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GlowingText } from "./GlowingText";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Signal, Radio, Shield, Send, Wifi, AlertTriangle } from 'lucide-react';

interface EntityConnection {
  name: string;
  status: 'active' | 'latent' | 'inactive';
  lastContact: string;
  bandwidth: string;
  signalStrength: number;
}

interface SecureMessage {
  id: string;
  from: string;
  to: string;
  content: string;
  encrypted: string;
  timestamp: string;
}

const TriadConnectionMonitor = () => {
  const [entities, setEntities] = useState<EntityConnection[]>([
    { 
      name: 'Zade', 
      status: 'active', 
      lastContact: new Date().toISOString(), 
      bandwidth: '1.2Tb/s', 
      signalStrength: 0.95 
    },
    { 
      name: 'Lockheed', 
      status: 'active', 
      lastContact: new Date(Date.now() - 15000).toISOString(), 
      bandwidth: '0.9Tb/s', 
      signalStrength: 0.87 
    },
    { 
      name: 'CIA', 
      status: 'latent', 
      lastContact: new Date(Date.now() - 300000).toISOString(), 
      bandwidth: '0.4Tb/s', 
      signalStrength: 0.62 
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

  const [newMessage, setNewMessage] = useState('');
  const [recipient, setRecipient] = useState('Lockheed');
  const [frequency, setFrequency] = useState(7.83);
  const [isScanning, setIsScanning] = useState(false);

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
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const sendPing = (entityName: string) => {
    setIsScanning(true);
    
    setTimeout(() => {
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
      setIsScanning(false);
    }, 2000);
  };

  const sendSecureMessage = () => {
    if (newMessage.trim() === '') return;
    
    // Generate random hex for "encryption"
    const encrypted = Array.from({length: 16}, () => 
      Math.floor(Math.random() * 16).toString(16)).join('') + '...';
    
    const message: SecureMessage = {
      id: Date.now().toString(),
      from: 'Zade',
      to: recipient,
      content: newMessage,
      encrypted,
      timestamp: new Date().toISOString()
    };
    
    setMessages([message, ...messages]);
    setNewMessage('');
    
    // Simulate response
    if (Math.random() > 0.3) {
      setTimeout(() => {
        const response: SecureMessage = {
          id: (Date.now() + 1).toString(),
          from: recipient,
          to: 'Zade',
          content: `Received. Quantum integrity at ${Math.floor(Math.random() * 30 + 70)}%.`,
          encrypted: Array.from({length: 16}, () => 
            Math.floor(Math.random() * 16).toString(16)).join('') + '...',
          timestamp: new Date().toISOString()
        };
        
        setMessages(prev => [response, ...prev]);
      }, 3000 + Math.random() * 2000);
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
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="connections">Connections</TabsTrigger>
            <TabsTrigger value="radio">Radio Wave</TabsTrigger>
            <TabsTrigger value="messages">Secure Comms</TabsTrigger>
          </TabsList>
          
          <TabsContent value="connections" className="space-y-4">
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
            <div className="flex items-center gap-2 mb-4">
              <select 
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="bg-background border border-input rounded-md p-2 text-sm"
              >
                <option value="Lockheed">Lockheed</option>
                <option value="CIA">CIA</option>
              </select>
              <Input
                placeholder="Secure message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1"
              />
              <Button onClick={sendSecureMessage} disabled={newMessage.trim() === ''}>
                <Shield className="h-4 w-4 mr-1" />
                Send
              </Button>
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
                </div>
              ))}
            </ScrollArea>
            
            <div className="text-xs text-muted-foreground flex items-center justify-center">
              <AlertTriangle className="h-3 w-3 mr-1" />
              <span>Kyber-512 + AES-256 Quantum-Resistant Encryption</span>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TriadConnectionMonitor;
