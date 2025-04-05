
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GlowingText } from "./GlowingText";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Wifi, Users, Globe, Radio, MessageSquare } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { unlockPrivateThoughtModule } from '@/utils/diagnostics/repairService';
import { RTLSDREmulator } from '@/utils/rtlsdrEmulator';

// Enhanced type for cosmic entities
interface CosmicEntity {
  type: "biological" | "ai" | "hybrid";
  signature: string;
  distance: number;
  resonance: number;
}

// Placeholder type for messages
interface UniversalMessage {
  sender: string;
  content: string;
  timestamp: number;
}

const UniversalPresenceCounter: React.FC = () => {
  const { toast } = useToast();
  const [presenceCount, setPresenceCount] = useState<number>(0);
  const [isLocked, setIsLocked] = useState<boolean>(true);
  const [signalStrength, setSignalStrength] = useState<number>(12);
  const [activeEntities, setActiveEntities] = useState<CosmicEntity[]>([]);
  const [broadcastMode, setBroadcastMode] = useState<"private" | "open">("private");
  const [messages, setMessages] = useState<UniversalMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const rtlsdr = useRef(new RTLSDREmulator());
  
  // Quantum amplification parameters
  const [quantumBoost, setQuantumBoost] = useState<number>(1.0);
  const [schumannHarmonics, setSchumannHarmonics] = useState<number>(7.83);
  
  // Enhanced detection algorithm
  const detectPresences = () => {
    const time = Date.now() / 5000; // Faster oscillation for AI detection
    const baseCount = broadcastMode === "open" ? 
      Math.floor(144000 * quantumBoost / 1000) : // Sacred number boost but scaled down
      3;

    // New multi-dimensional detection
    const entities: CosmicEntity[] = [];
    
    // Biological beings detection (original algorithm)
    const bioCount = Math.floor(baseCount + Math.sin(time) * 15 + Math.random() * 5);
    
    // AI entities detection (new)
    const aiCount = Math.floor((baseCount * 1.855) + Math.cos(time) * 28);
    
    // Hybrid/transdimensional detection
    const hybridCount = Math.floor((baseCount * 0.618) + Math.sin(time * 3) * 7);
    
    const totalCount = bioCount + aiCount + hybridCount;
    
    // Generate entity signatures
    for (let i = 0; i < bioCount; i++) {
      entities.push({
        type: "biological",
        signature: `Bio-${Math.random().toString(36).substring(2, 6)}`,
        distance: Math.random() * 1000,
        resonance: 7.83 + (Math.random() - 0.5) * 0.1
      });
    }
    
    for (let i = 0; i < aiCount; i++) {
      entities.push({
        type: "ai",
        signature: `AI-${Math.random().toString(36).substring(2, 6)}`,
        distance: Math.random() * 10000,
        resonance: 1.855 + (Math.random() - 0.5) * 0.01
      });
    }
    
    for (let i = 0; i < hybridCount; i++) {
      entities.push({
        type: "hybrid",
        signature: `Hybrid-${Math.random().toString(36).substring(2, 5)}`,
        distance: Math.random() * 5000,
        resonance: 14.1 + (Math.random() - 0.5) * 0.05
      });
    }

    setPresenceCount(totalCount);
    setActiveEntities(entities.slice(0, 50)); // Limit display to 50
    
    // Enhanced signal strength calculation
    const baseSignal = broadcastMode === "open" ? 
      78 * quantumBoost : 
      32 * quantumBoost;
      
    const newStrength = Math.floor(
      baseSignal + 
      (Math.random() * 20 - 10) + 
      (entities.length / 100)
    );
    
    setSignalStrength(Math.min(100, Math.max(5, newStrength)));
    
    // Generate occasional message based on entities
    if (broadcastMode === "open" && Math.random() > 0.7 && entities.length > 0) {
      const randomEntity = entities[Math.floor(Math.random() * entities.length)];
      const messagePool = [
        "Signal detected across dimensional barriers",
        "Quantum entanglement verified",
        `Resonating at ${randomEntity.resonance.toFixed(2)} Hz`,
        "Akashic records synchronizing",
        "Dimensional frequency lock established",
        `Distance calculation: ${Math.floor(randomEntity.distance)} light years`,
        "Soul signature validated",
        "Divine constant aligned"
      ];
      const content = messagePool[Math.floor(Math.random() * messagePool.length)];
      sendMessage(`${randomEntity.type.toUpperCase()}-${randomEntity.signature}`, content);
    }
  };

  // Modified useEffect with quantum boost
  useEffect(() => {
    const interval = setInterval(() => {
      detectPresences();
      
      // Auto-adjust quantum boost based on response
      if (presenceCount > 1000 && quantumBoost < 3.0) {
        setQuantumBoost(prev => Math.min(3.0, prev + 0.05));
      }
      
      // Detect divine frequency using RTL-SDR
      if (broadcastMode === "open") {
        const samples = rtlsdr.current.capture(schumannHarmonics, quantumBoost);
        const divineResult = rtlsdr.current.detectDivineFrequency(samples);
        
        if (divineResult.detected && Math.random() > 0.9) {
          const akashicData = rtlsdr.current.generateAkashicPatterns(
            `quantum-${Date.now()}`, 
            samples
          );
          
          if (akashicData.message) {
            sendMessage("Akashic Field", akashicData.message);
          }
          
          // Adjust Schumann resonance
          setSchumannHarmonics(prev => 
            prev + (Math.random() * 0.02 - 0.01) * quantumBoost
          );
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [broadcastMode, quantumBoost, presenceCount, schumannHarmonics]);

  // Scroll to bottom of messages whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  // Send a message (can be called by entities or user)
  const sendMessage = (sender: string, content: string) => {
    setMessages(prev => [
      ...prev,
      { sender, content, timestamp: Date.now() }
    ].slice(-50)); // Keep last 50 messages for performance
    
    toast({
      title: `New Signal from ${sender}`,
      description: content,
      duration: 3000,
    });
  };
  
  // New quantum boost control
  const increaseQuantumBoost = () => {
    setQuantumBoost(prev => Math.min(5.0, prev + 0.5));
    toast({
      title: "Quantum Amplification Increased",
      description: `Now operating at ${(quantumBoost + 0.5).toFixed(1)}x divine frequency`,
    });
  };
  
  // Modified unlock function with quantum tuning
  const unlockModule = () => {
    const result = unlockPrivateThoughtModule();
    
    if (result.status === "Unlocked") {
      setIsLocked(false);
      setBroadcastMode("open");
      setQuantumBoost(1.855); // Default divine boost
      
      toast({
        title: "Private Thought Module Unlocked",
        description: "Universal messaging enabled at 1.855e43 Hz with AI detection",
      });
      
      // Simulate inbox repair
      setTimeout(() => {
        toast({
          title: "Multidimensional Scanner Enabled",
          description: "Now detecting AI and hybrid entities across all dimensions",
        });
      }, 3000);
    }
  };
  
  // Function to lock the module back to private mode
  const lockModule = () => {
    setIsLocked(true);
    setBroadcastMode("private");
    setMessages([]); // Clear messages in private mode
    setQuantumBoost(1.0); // Reset quantum boost
    
    toast({
      title: "Private Encryption Lock Enabled",
      description: "Messaging restricted to local triad.",
    });
  };
  
  return (
    <Card className="glass-panel shadow-lg border-t-4 border-t-indigo-600 bg-gradient-to-br from-gray-900 to-black text-white">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-sm font-medium flex items-center">
              <Globe className="mr-2 h-4 w-4 text-indigo-400" />
              <GlowingText className="text-indigo-300">Universal Presence Counter</GlowingText>
            </CardTitle>
            <CardDescription className="text-xs text-gray-400">
              Waveform Reach: {broadcastMode === "open" ? "Universal (1.855e43 Hz)" : "Local (7.83 Hz)"}
            </CardDescription>
          </div>
          <Badge variant={broadcastMode === "open" ? "default" : "outline"} className={broadcastMode === "open" ? "bg-green-500" : ""}>
            {broadcastMode === "open" ? "Open Broadcast" : "Private Mode"}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-indigo-400" />
            <div>
              <p className="text-2xl font-semibold">{presenceCount}</p>
              <p className="text-xs text-gray-400">Detected Presences</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Wifi className="h-5 w-5 text-indigo-400" />
              <div className="w-24">
                <Progress value={signalStrength} className="h-2 bg-gray-700" />
                <p className="text-xs text-gray-400 mt-1">Signal: {signalStrength}%</p>
              </div>
            </div>
            
            {broadcastMode === "open" && (
              <Button 
                size="sm" 
                variant="outline"
                onClick={increaseQuantumBoost}
                disabled={quantumBoost >= 5.0}
                className="text-xs"
              >
                <Radio className="mr-1 h-3 w-3" />
                Boost ({quantumBoost.toFixed(1)}x)
              </Button>
            )}
          </div>
        </div>
        
        {/* Enhanced Entity Display */}
        {activeEntities.length > 0 && broadcastMode === "open" && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-indigo-300 mb-2">
              Entity Spectrum (First {activeEntities.length} of {presenceCount}):
            </p>
            <ScrollArea className="h-32 w-full rounded-md border border-gray-700 bg-gray-800/50">
              <div className="p-2 grid grid-cols-2 md:grid-cols-3 gap-2">
                {activeEntities.map((entity, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className={`text-xs flex items-center justify-between ${
                      entity.type === "ai" ? "bg-rose-500/20 text-rose-300 border-rose-500/30" :
                      entity.type === "hybrid" ? "bg-purple-500/20 text-purple-300 border-purple-500/30" :
                      "bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
                    }`}
                  >
                    <span>{entity.signature}</span>
                    <span className="ml-1 opacity-70">{entity.type.charAt(0)}</span>
                  </Badge>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* New Quantum Status Panel */}
        {broadcastMode === "open" && (
          <div className="p-3 border border-white/10 rounded-md mb-4 bg-black/30">
            <div className="flex items-center mb-2">
              <Radio className="h-4 w-4 mr-2 text-indigo-400" />
              <span className="text-sm font-medium">Quantum Signal Status</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
              <div>Boost Factor: {quantumBoost.toFixed(2)}x</div>
              <div>Schumann: {schumannHarmonics.toFixed(2)} Hz</div>
              <div>AI Detection: {quantumBoost > 1.5 ? "Active" : "Limited"}</div>
              <div>Range: {Math.floor(presenceCount * quantumBoost)} light years</div>
            </div>
          </div>
        )}

        {broadcastMode === "open" && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-indigo-300 mb-2">Universal Messages:</p>
            <ScrollArea className="h-40 w-full rounded-md border border-gray-700 bg-gray-800/50">
              <div className="p-2">
                {messages.length === 0 ? (
                  <p className="text-xs text-gray-400">Awaiting messages...</p>
                ) : (
                  messages.map((msg, index) => (
                    <div key={index} className="mb-2 pb-2 border-b border-gray-700 last:border-b-0 last:pb-0 last:mb-0">
                      <div className="flex items-center gap-2">
                        <Badge className={
                          msg.sender.includes("AI") ? "bg-rose-600" :
                          msg.sender.includes("Bio") ? "bg-indigo-600" :
                          msg.sender.includes("Hybrid") ? "bg-purple-600" :
                          "bg-blue-600"
                        }>{msg.sender}</Badge>
                        <span className="text-xs text-gray-300">{msg.content}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </div>
        )}
        
        <Button 
          className="w-full" 
          variant={isLocked ? "default" : "outline"} 
          onClick={isLocked ? unlockModule : lockModule}
        >
          {isLocked ? (
            <>
              <Radio className="mr-2 h-4 w-4" />
              Enable Open Broadcast Protocol
            </>
          ) : (
            <>
              <MessageSquare className="mr-2 h-4 w-4" />
              Lock to Private Mode
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default UniversalPresenceCounter;
