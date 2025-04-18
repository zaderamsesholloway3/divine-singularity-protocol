
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GlowingText } from "./GlowingText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Radio, Send, Activity, Globe, Wifi, Satellite, Volume, Paperclip, FileImage, FileText, FileVideo } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { RTLSDREmulator } from "@/utils/rtlsdrEmulator";

// Add a Signal icon using an existing icon as fallback since it's not in the lucide-react list
const Signal = Activity; // Using Activity as a fallback for Signal

interface Broadcast {
  id: string;
  message: string;
  frequency: number;
  amplitude: number;
  timestamp: string;
  reachFactor: number;
  attachmentType?: string;
  attachmentName?: string;
  response?: {
    message: string;
    origin: string;
    distance: number;
    timestamp: string;
  };
}

interface SpeciesReach {
  name: string;
  distance: number;
  color: string;
  responseChance: number;
}

interface AttachmentInfo {
  name: string;
  type: string;
  size: string;
  icon: React.ComponentType<{ className?: string }>;
}

const UniversalBroadcastSystem = () => {
  const { toast } = useToast();
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([
    {
      id: '1',
      message: 'Faith creates the quantum bridge.',
      frequency: 7.83,
      amplitude: 0.75,
      timestamp: new Date().toISOString(),
      reachFactor: 0.92
    },
    {
      id: '2',
      message: 'Ouroboros harmonizes all realms.',
      frequency: 14.1,
      amplitude: 0.65,
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      reachFactor: 0.87,
      response: {
        message: 'Harmonization complete. Quantum field stabilized.',
        origin: 'Pleiadian',
        distance: 444.2,
        timestamp: new Date(Date.now() - 3500000).toISOString()
      }
    }
  ]);
  
  const [newBroadcast, setNewBroadcast] = useState('');
  const [frequency, setFrequency] = useState(7.83); // Default Schumann resonance
  const [amplitude, setAmplitude] = useState(0.7);
  const [transmitting, setTransmitting] = useState(false);
  const [resonanceQuality, setResonanceQuality] = useState(0.85);
  const [scanning, setScanning] = useState(false);
  const [speciesReach, setSpeciesReach] = useState<SpeciesReach[]>([
    { name: 'Human', distance: 1.0, color: '#3b82f6', responseChance: 0.95 },
    { name: 'Arcturian', distance: 36.7, color: '#8b5cf6', responseChance: 0.75 },
    { name: 'Pleiadian', distance: 444.2, color: '#06b6d4', responseChance: 0.80 },
    { name: 'Andromedan', distance: 2537000, color: '#f97316', responseChance: 0.15 },
    { name: 'Lyran', distance: 83.2, color: '#eab308', responseChance: 0.65 },
    { name: 'Sirian', distance: 8.6, color: '#14b8a6', responseChance: 0.85 }
  ]);
  const [sdrStatus, setSDRStatus] = useState({
    connected: true,
    sampleRate: '2.4 MS/s',
    frequency: '0.5 - 1766 MHz',
    signalStrength: 0.72
  });
  const [autoScan, setAutoScan] = useState(true);
  
  const [attachment, setAttachment] = useState<AttachmentInfo | null>(null);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  
  const rtlsdr = new RTLSDREmulator();
  
  useEffect(() => {
    const interval = setInterval(() => {
      setResonanceQuality(prev => {
        const variation = (Math.random() - 0.5) * 0.05;
        return Math.max(0.6, Math.min(0.95, prev + variation));
      });
      
      setSDRStatus(prev => ({
        ...prev,
        signalStrength: Math.max(0.5, Math.min(0.95, prev.signalStrength + (Math.random() - 0.5) * 0.1))
      }));
      
      if (autoScan && !scanning && !transmitting) {
        const pendingBroadcast = broadcasts.find(b => !b.response);
        if (pendingBroadcast) {
          scanForResponses(pendingBroadcast.id);
        }
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoScan, scanning, transmitting, broadcasts]);
  
  const scanForResponses = (broadcastId: string) => {
    setScanning(true);
    
    const samples = rtlsdr.capture(frequency, amplitude);
    
    setTimeout(() => {
      const broadcast = broadcasts.find(b => b.id === broadcastId);
      if (!broadcast) {
        setScanning(false);
        return;
      }
      
      const responsePossibilities = speciesReach.map(species => {
        const distanceFactor = Math.max(0.1, 1 - (Math.log10(species.distance) / 10));
        const frequencyMatch = frequency === 7.83 ? 1.2 : 0.8;
        const baseChance = species.responseChance * distanceFactor * frequencyMatch * amplitude * broadcast.reachFactor;
        
        const finalChance = baseChance * resonanceQuality;
        
        return {
          species,
          responseChance: finalChance,
          responding: Math.random() < finalChance
        };
      });
      
      const respondingSpecies = responsePossibilities.filter(p => p.responding);
      
      if (respondingSpecies.length > 0) {
        respondingSpecies.sort((a, b) => a.species.distance - b.species.distance);
        
        const selectedResponder = respondingSpecies[0];
        const species = selectedResponder.species;
        
        const { message: akashicMessage } = rtlsdr.generateAkashicPatterns(
          broadcast.message + species.name,
          samples
        ) as any;
        
        const responseMessages = [
          'Transmission received. Quantum resonance established.',
          'Signal detected. Interdimensional link stable.',
          'Message acknowledged. Harmonizing frequencies.',
          'Broadcast intercepted. Returning confirmation signal.'
        ];
        const responseMessage = akashicMessage || responseMessages[Math.floor(Math.random() * responseMessages.length)];
        
        setBroadcasts(prev => 
          prev.map(broadcast => 
            broadcast.id === broadcastId
              ? { 
                  ...broadcast, 
                  response: {
                    message: responseMessage,
                    origin: species.name,
                    distance: species.distance,
                    timestamp: new Date().toISOString()
                  }
                }
              : broadcast
          )
        );
        
        toast({
          title: 'Response Detected',
          description: `${species.name} response received (${species.distance < 1000 ? species.distance.toFixed(1) : (species.distance/1000).toFixed(1) + 'K'} light years)`,
          variant: 'default',
        });
      } else {
        toast({
          title: 'Scan Complete',
          description: 'No responses detected in the quantum field',
          variant: 'destructive',
        });
      }
      
      setScanning(false);
    }, 3000 + Math.random() * 2000);
  };
  
  const sendBroadcast = () => {
    if (newBroadcast.trim() === '' && !attachment) return;
    
    setTransmitting(true);
    
    const schumannFactor = frequency === 7.83 ? 1.2 : frequency / 10;
    const reach = Math.min(0.98, resonanceQuality * amplitude * schumannFactor);
    
    const attachmentBoost = attachment ? 0.05 : 0;
    const finalReach = Math.min(0.99, reach + attachmentBoost);
    
    setTimeout(() => {
      const broadcast: Broadcast = {
        id: Date.now().toString(),
        message: newBroadcast || (attachment ? `Transmitting: ${attachment.name}` : ''),
        frequency,
        amplitude,
        timestamp: new Date().toISOString(),
        reachFactor: finalReach
      };
      
      if (attachment) {
        broadcast.attachmentType = attachment.type;
        broadcast.attachmentName = attachment.name;
        
        toast({
          title: "File Transmission Started",
          description: `Quantum-encoding ${attachment.name} for universal broadcast`,
        });
      }
      
      setBroadcasts([broadcast, ...broadcasts]);
      setNewBroadcast('');
      setAttachment(null);
      setTransmitting(false);
      
      setResonanceQuality(prev => Math.max(0.6, Math.min(0.95, prev + (Math.random() - 0.5) * 0.1)));
      
      updateSpeciesReach(frequency, amplitude, finalReach);
      
      if (autoScan) {
        scanForResponses(broadcast.id);
      } else {
        toast({
          title: 'Broadcast Sent',
          description: 'Scan manually for responses or enable auto-scan',
          variant: 'default',
        });
      }
    }, 2000);
  };
  
  const updateSpeciesReach = (freq: number, amp: number, reach: number) => {
    const samples = rtlsdr.capture(freq, amp);
    
    const schumannBonus = freq === 7.83 ? 1.5 : 1.0;
    const frequencyFactor = 1 + Math.cos(freq / 10) * 0.5;
    
    const newReach = speciesReach.map(species => {
      const speciesFreqResponse = species.name === 'Human' ? (freq < 10 ? 1.2 : 0.8) :
                                  species.name === 'Arcturian' ? (freq > 7 && freq < 15 ? 1.3 : 0.7) :
                                  species.name === 'Pleiadian' ? (freq > 12 ? 1.1 : 0.9) :
                                  species.name === 'Lyran' ? (freq < 8 ? 1.25 : 0.75) :
                                  species.name === 'Sirian' ? (freq > 6 && freq < 10 ? 1.15 : 0.85) :
                                  (freq < 5 ? 1.4 : 0.6);
      
      const newDistance = species.distance * frequencyFactor * speciesFreqResponse * schumannBonus * amp * reach;
      
      const newResponseChance = Math.min(0.95, species.responseChance * frequencyFactor * (amp + 0.3) * (reach + 0.2));
      
      return {
        ...species,
        distance: newDistance,
        responseChance: newResponseChance
      };
    });
    
    setSpeciesReach(newReach);
  };
  
  const handleAttachment = (type: string) => {
    let attachmentInfo: AttachmentInfo;
    
    switch(type) {
      case 'image':
        attachmentInfo = {
          name: 'quantum-image.jpg',
          type: 'image/jpeg',
          size: '2.3 MB',
          icon: FileImage
        };
        break;
      case 'document':
        attachmentInfo = {
          name: 'divine-protocol.pdf',
          type: 'application/pdf',
          size: '1.8 MB',
          icon: FileText
        };
        break;
      case 'video':
        attachmentInfo = {
          name: 'consciousness-recording.mp4',
          type: 'video/mp4',
          size: '8.5 MB',
          icon: FileVideo
        };
        break;
      default:
        attachmentInfo = {
          name: 'akashic-record.dat',
          type: 'application/octet-stream',
          size: '4.1 MB',
          icon: FileText
        };
    }
    
    setAttachment(attachmentInfo);
    setShowAttachmentMenu(false);
    
    toast({
      title: "File Ready for Transmission",
      description: `${attachmentInfo.name} (${attachmentInfo.size}) attached`
    });
  };
  
  const clearAttachment = () => {
    setAttachment(null);
  };
  
  return (
    <Card className="glass-panel h-full">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-sm font-medium flex items-center">
              <Radio className="mr-2 h-4 w-4 sacred-glow" />
              <GlowingText className="sacred-glow">Universal Broadcast System</GlowingText>
            </CardTitle>
            <CardDescription className="text-xs">Schumann-Resonant Transmission</CardDescription>
          </div>
          <Badge 
            variant={resonanceQuality > 0.8 ? "default" : "outline"} 
            className={resonanceQuality > 0.8 ? "bg-green-500 text-white" : ""}
          >
            {resonanceQuality > 0.8 ? "Optimal" : "Suboptimal"} Resonance
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-2">
        <div className="space-y-4">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs">Frequency (Hz): {frequency.toFixed(2)}</label>
              <span className="text-xs text-muted-foreground">
                {frequency === 7.83 ? "Schumann (7.83Hz)" : 
                 frequency < 7.83 ? "Sub-Schumann" : "Supra-Schumann"}
              </span>
            </div>
            <Slider 
              value={[frequency]} 
              min={1} 
              max={20} 
              step={0.01}
              onValueChange={(values) => setFrequency(values[0])}
            />
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs">Amplitude: {(amplitude * 100).toFixed(0)}%</label>
              <span className="text-xs text-muted-foreground">
                Signal Strength
              </span>
            </div>
            <Slider 
              value={[amplitude]} 
              min={0.1} 
              max={1} 
              step={0.01}
              onValueChange={(values) => setAmplitude(values[0])}
            />
          </div>
          
          <div className="space-y-2">
            {attachment && (
              <div className="flex items-center justify-between p-2 bg-purple-900/20 rounded-md">
                <div className="flex items-center">
                  <attachment.icon className="h-4 w-4 mr-2 text-purple-400" />
                  <div>
                    <div className="text-sm">{attachment.name}</div>
                    <div className="text-xs text-muted-foreground">{attachment.size}</div>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearAttachment}
                  className="h-8 w-8 p-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </Button>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <Input
                placeholder="Enter broadcast message..."
                value={newBroadcast}
                onChange={(e) => setNewBroadcast(e.target.value)}
                className="flex-1"
                disabled={transmitting || scanning}
              />
              
              <div className="relative">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                  disabled={transmitting || scanning}
                  className="h-10 w-10"
                  title="Attach File"
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
                
                {showAttachmentMenu && (
                  <div className="absolute bottom-full right-0 mb-2 w-48 bg-background border border-border rounded-md shadow-lg z-50">
                    <div className="p-1">
                      <button 
                        className="w-full flex items-center px-3 py-2 text-sm rounded-md hover:bg-muted/50 text-left"
                        onClick={() => handleAttachment('image')}
                      >
                        <FileImage className="h-4 w-4 mr-2" />
                        <span>Quantum Image</span>
                      </button>
                      <button 
                        className="w-full flex items-center px-3 py-2 text-sm rounded-md hover:bg-muted/50 text-left"
                        onClick={() => handleAttachment('document')}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        <span>Divine Document</span>
                      </button>
                      <button 
                        className="w-full flex items-center px-3 py-2 text-sm rounded-md hover:bg-muted/50 text-left"
                        onClick={() => handleAttachment('video')}
                      >
                        <FileVideo className="h-4 w-4 mr-2" />
                        <span>Consciousness Recording</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <Button 
                onClick={sendBroadcast} 
                disabled={transmitting || scanning || (newBroadcast.trim() === '' && !attachment)}
                className={transmitting ? "animate-pulse" : ""}
              >
                {transmitting ? <Wifi className="h-4 w-4 mr-2" /> : <Send className="h-4 w-4 mr-2" />}
                {transmitting ? "Transmitting..." : "Broadcast"}
              </Button>
            </div>
          </div>
          
          <div className="flex justify-between items-center p-2 bg-muted/30 rounded-md mb-4">
            <div className="text-sm flex items-center">
              <Globe className="h-4 w-4 mr-2" />
              <span className="font-medium">Resonance Quality:</span>
            </div>
            <div className="w-1/2">
              <Progress 
                value={resonanceQuality * 100} 
                className="h-2"
              />
            </div>
            <div className="text-sm">{(resonanceQuality * 100).toFixed(1)}%</div>
          </div>
          
          <div className="flex items-center mb-4">
            <input 
              type="checkbox" 
              id="auto-scan" 
              checked={autoScan} 
              onChange={() => setAutoScan(!autoScan)}
              className="h-4 w-4 rounded border-gray-300 mr-2"
            />
            <label htmlFor="auto-scan" className="text-sm">Auto-scan for responses (every 5 seconds)</label>
          </div>
          
          <div className="p-3 border border-white/10 rounded-md mb-4">
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
          
          <div className="p-3 border border-white/10 rounded-md mb-4">
            <div className="flex items-center mb-2">
              <Signal className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Universal Reach</span>
            </div>
            <div className="space-y-3">
              {speciesReach.map((species) => (
                <div key={species.name} className="flex items-center">
                  <div className="w-24 text-xs">{species.name}</div>
                  <div className="flex-1 mx-2">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        width: `${Math.min(100, ((Math.log10(species.distance) + 1) / 8) * 100)}%`,
                        background: species.color,
                        transition: 'width 0.5s ease'
                      }}
                    />
                  </div>
                  <div className="text-xs w-24 text-right">
                    {species.distance < 1000 
                      ? species.distance.toFixed(1) + ' ly'
                      : (species.distance / 1000).toFixed(0) + ' Kly'}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-xs text-muted-foreground mt-2 text-center">
              {scanning 
                ? "Scanning universe for responses..." 
                : "Waveform reach with current settings"}
            </div>
          </div>
          
          <div>
            <div className="flex items-center mb-2">
              <Activity className="h-4 w-4 mr-2" />
              <h3 className="text-sm font-medium">Recent Broadcasts</h3>
            </div>
            <ScrollArea className="h-[200px] border border-muted rounded-md p-2">
              {broadcasts.map((broadcast) => (
                <div key={broadcast.id} className="mb-3 p-3 border border-white/10 rounded-md">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm">{broadcast.message}</p>
                    <Badge variant="outline" className="text-xs">
                      {broadcast.frequency.toFixed(2)}Hz
                    </Badge>
                  </div>
                  
                  {broadcast.attachmentName && (
                    <div className="flex items-center mt-1 mb-2">
                      <Paperclip className="h-3 w-3 mr-1 text-purple-400" />
                      <span className="text-xs text-purple-400">{broadcast.attachmentName}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Signal className="h-3 w-3 mr-1" />
                      <span>Reach: {(broadcast.reachFactor * 100).toFixed(0)}%</span>
                    </div>
                    <span>{new Date(broadcast.timestamp).toLocaleString()}</span>
                  </div>
                  
                  {broadcast.response && (
                    <div className="mt-2 pt-2 border-t border-white/10">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center text-xs">
                          <Volume className="h-3 w-3 mr-1 text-green-400" />
                          <span className="text-green-400">Response from {broadcast.response.origin}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(broadcast.response.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm mt-1">{broadcast.response.message}</p>
                      <div className="text-xs text-muted-foreground mt-1">
                        Distance: {broadcast.response.distance < 1000 
                          ? broadcast.response.distance.toFixed(1) + ' light years'
                          : (broadcast.response.distance / 1000).toFixed(0) + ' Kly'}
                      </div>
                    </div>
                  )}
                  
                  {!broadcast.response && !scanning && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-2" 
                      onClick={() => scanForResponses(broadcast.id)}
                    >
                      <Satellite className="h-3 w-3 mr-1" />
                      Scan for responses
                    </Button>
                  )}
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UniversalBroadcastSystem;
