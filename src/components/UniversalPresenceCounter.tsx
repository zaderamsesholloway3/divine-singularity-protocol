
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
  const [activeSpecies, setActiveSpecies] = useState<string[]>([]);
  const [broadcastMode, setBroadcastMode] = useState<"private" | "open">("private");
  const [messages, setMessages] = useState<UniversalMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Simulate presence and messaging updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulated wave pattern using sine function
      const time = Date.now() / 10000; // Slow oscillation
      const baseCount = broadcastMode === "open" ? 42 : 3;
      const newCount = Math.floor(baseCount + Math.sin(time) * 15 + Math.random() * 5);
      setPresenceCount(Math.max(0, newCount));
      
      // Update signal strength with some randomness
      const baseSignal = broadcastMode === "open" ? 78 : 32;
      const newStrength = Math.floor(baseSignal + (Math.random() * 20 - 10));
      setSignalStrength(Math.min(100, Math.max(5, newStrength)));
      
      // Simulate species detection in open mode
      if (broadcastMode === "open") {
        const possibleSpecies = ["Arcturian", "Pleiadian", "Sirian", "Andromedan", "Lyran", "Venusian", "Orion"];
        
        // Randomly add or remove species based on current time
        const speciesCount = 3 + Math.floor(Math.sin(time * 2) * 2);
        const newSpecies = Array.from(
          new Set(
            Array(speciesCount).fill(null).map(() => 
              possibleSpecies[Math.floor(Math.random() * possibleSpecies.length)]
            )
          )
        );
        
        setActiveSpecies(newSpecies);
        
        // Simulate incoming messages from active species
        if (Math.random() > 0.7) { // 30% chance of a message per interval
          const sender = newSpecies[Math.floor(Math.random() * newSpecies.length)];
          const messagePool = [
            "Greetings from the cosmic lattice!",
            "We resonate at 7.83 Hz with you.",
            "The Akashic records are aligning.",
            "Peace be to your soulstream.",
            "Quantum entanglement confirmed."
          ];
          const content = messagePool[Math.floor(Math.random() * messagePool.length)];
          sendMessage(sender, content);
        }
      } else {
        setActiveSpecies([]);
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, [broadcastMode]);

  // Scroll to bottom of messages whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  // Send a message (can be called by species or user)
  const sendMessage = (sender: string, content: string) => {
    setMessages(prev => [
      ...prev,
      { sender, content, timestamp: Date.now() }
    ].slice(-50)); // Keep last 50 messages for performance
    
    toast({
      title: `New Message from ${sender}`,
      description: content,
      duration: 3000,
    });
  };
  
  const unlockModule = () => {
    const result = unlockPrivateThoughtModule();
    
    if (result.status === "Unlocked") {
      setIsLocked(false);
      setBroadcastMode("open");
      
      toast({
        title: "Private Thought Module Unlocked",
        description: "Universal messaging enabled at 1.855e43 Hz.",
      });
      
      // Simulate inbox repair
      setTimeout(() => {
        toast({
          title: "Messaging Channels Restored",
          description: "All species can now communicate freely.",
        });
      }, 3000);
    }
  };
  
  // Function to lock the module back to private mode
  const lockModule = () => {
    setIsLocked(true);
    setBroadcastMode("private");
    setMessages([]); // Clear messages in private mode
    
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
          <div className="flex items-center gap-2">
            <Wifi className="h-5 w-5 text-indigo-400" />
            <div className="w-24">
              <Progress value={signalStrength} className="h-2 bg-gray-700" />
              <p className="text-xs text-gray-400 mt-1">Signal: {signalStrength}%</p>
            </div>
          </div>
        </div>
        
        {activeSpecies.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-indigo-300 mb-2">Active Species:</p>
            <div className="flex flex-wrap gap-1">
              {activeSpecies.map((species, index) => (
                <Badge key={index} variant="outline" className="text-xs bg-indigo-500/20 text-indigo-300">
                  {species}
                </Badge>
              ))}
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
                        <Badge className="bg-indigo-600">{msg.sender}</Badge>
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
