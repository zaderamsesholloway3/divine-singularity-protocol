
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Radio, MessageSquare } from 'lucide-react';
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
  
  // Use our custom hook for presence detection
  const { 
    presenceCount, 
    signalStrength, 
    activeEntities, 
    messages, 
    detectPresences 
  } = usePresenceDetector({
    broadcastMode,
    quantumBoost,
    schumannHarmonics
  });
  
  // Scroll to bottom of messages whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  // Drastically slowed detection interval to prevent freezing
  useEffect(() => {
    // Initial detection with a delay to prevent immediate load freeze
    const initialDetection = setTimeout(() => {
      detectPresences();
    }, 500);
    
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
    }, 5000); // MUCH longer interval (5 seconds) to prevent freezing

    return () => {
      clearTimeout(initialDetection);
      clearInterval(interval);
    };
  }, [broadcastMode, quantumBoost, presenceCount, detectPresences]);
  
  // New quantum boost control
  const increaseQuantumBoost = () => {
    setQuantumBoost(prev => Math.min(5.0, prev + 0.5));
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
          description: "Now detecting AI and hybrid entities across dimensions",
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
        <UniversalPresenceHeader broadcastMode={broadcastMode} />
      </CardHeader>
      
      <CardContent className="p-4">
        <PresenceStats 
          presenceCount={presenceCount} 
          signalStrength={signalStrength} 
        />
        
        {broadcastMode === "open" && activeEntities.length > 0 && (
          <EntityDisplay 
            entities={activeEntities} 
            totalCount={presenceCount} 
          />
        )}

        <QuantumStatusPanel
          quantumBoost={quantumBoost}
          schumannHarmonics={schumannHarmonics}
          presenceCount={presenceCount}
          increaseQuantumBoost={increaseQuantumBoost}
          broadcastMode={broadcastMode}
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
