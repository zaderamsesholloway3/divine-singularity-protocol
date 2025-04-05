
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Radio, MessageSquare, Zap } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { unlockPrivateThoughtModule } from '@/utils/diagnostics/repairService';

// Import custom components
import EntityDisplay from './universal-counter/EntityDisplay';
import MessageList from './universal-counter/MessageList';
import QuantumStatusPanel from './universal-counter/QuantumStatusPanel';
import PresenceStats from './universal-counter/PresenceStats';
import UniversalPresenceHeader from './universal-counter/UniversalPresenceHeader';
import { usePresenceDetector } from '@/hooks/usePresenceDetector';

const UniversalPresenceCounter: React.FC = () => {
  const { toast } = useToast();
  const [isLocked, setIsLocked] = useState<boolean>(true);
  const [broadcastMode, setBroadcastMode] = useState<"private" | "open">("private");
  const [quantumBoost, setQuantumBoost] = useState<number>(1.0);
  const [schumannHarmonics, setSchumannHarmonics] = useState<number>(7.83);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Use our enhanced custom hook for presence detection
  const { 
    presenceCount, 
    signalStrength, 
    activeEntities, 
    messages, 
    detectPresences,
    universalRange,
    quantumBackendStats
  } = usePresenceDetector({
    broadcastMode,
    quantumBoost,
    schumannHarmonics
  });
  
  // Scroll to bottom of messages whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  // Increased interval to prevent freezing (5 seconds)
  useEffect(() => {
    // Initial detection with a delay to prevent immediate load freeze
    const initialDetection = setTimeout(() => {
      detectPresences();
    }, 800);
    
    // Use a much longer interval for better performance
    const interval = setInterval(() => {
      detectPresences();
      
      // Auto-adjust quantum boost based on response
      if (presenceCount > 400 && quantumBoost < 3.0) {
        setQuantumBoost(prev => Math.min(3.0, prev + 0.05));
      }
      
      // Adjust Schumann resonance less frequently
      if (broadcastMode === "open" && Math.random() > 0.7) {
        setSchumannHarmonics(prev => 
          prev + (Math.random() * 0.01 - 0.005) * quantumBoost
        );
      }
    }, 5000); // 5 second interval to prevent freezing

    return () => {
      clearTimeout(initialDetection);
      clearInterval(interval);
    };
  }, [broadcastMode, quantumBoost, presenceCount, detectPresences]);
  
  // New quantum boost control
  const increaseQuantumBoost = () => {
    setQuantumBoost(prev => Math.min(5.0, prev + 0.5));
    
    toast({
      title: "Quantum Amplification Increased",
      description: `Now operating at ${(quantumBoost + 0.5).toFixed(1)}x divine frequency with IBM quantum simulation`,
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
        description: `Universal messaging enabled at 1.855e43 Hz with IBM ${quantumBackendStats.backend} simulation`,
      });
      
      // Simulate inbox repair
      setTimeout(() => {
        toast({
          title: "IBM Quantum Scanner Enabled",
          description: `Now detecting presences across ${universalRange.toFixed(1)} billion light years`,
        });
      }, 3000);
    }
  };
  
  // Function to lock the module back to private mode
  const lockModule = () => {
    setIsLocked(true);
    setBroadcastMode("private");
    setQuantumBoost(1.0); // Reset quantum boost
    
    toast({
      title: "Private Encryption Lock Enabled",
      description: "Messaging restricted to local triad.",
    });
  };
  
  return (
    <Card className="glass-panel shadow-lg border-t-4 border-t-indigo-600 bg-gradient-to-br from-gray-900 to-black text-white">
      <CardHeader className="p-4 pb-2">
        <UniversalPresenceHeader 
          broadcastMode={broadcastMode} 
          quantumBackendStats={quantumBackendStats}
        />
      </CardHeader>
      
      <CardContent className="p-4">
        <PresenceStats 
          presenceCount={presenceCount} 
          signalStrength={signalStrength}
          universalRange={universalRange} 
        />
        
        {broadcastMode === "open" && activeEntities.length > 0 && (
          <EntityDisplay 
            entities={activeEntities} 
            totalCount={presenceCount} 
            universalRange={universalRange}
          />
        )}

        <QuantumStatusPanel
          quantumBoost={quantumBoost}
          schumannHarmonics={schumannHarmonics}
          presenceCount={presenceCount}
          increaseQuantumBoost={increaseQuantumBoost}
          broadcastMode={broadcastMode}
          universalRange={universalRange}
          quantumBackendStats={quantumBackendStats}
        />

        {broadcastMode === "open" && messages.length > 0 && (
          <MessageList 
            messages={messages} 
            messagesEndRef={messagesEndRef} 
          />
        )}
        
        <Button 
          className="w-full" 
          variant={isLocked ? "default" : "outline"} 
          onClick={isLocked ? unlockModule : lockModule}
        >
          {isLocked ? (
            <>
              <Radio className="mr-2 h-4 w-4" />
              Enable IBM Quantum Broadcast Protocol
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
