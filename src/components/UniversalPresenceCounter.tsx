
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GlowingText } from "./GlowingText";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Wifi, Users, Globe, Radio } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { unlockPrivateThoughtModule } from '@/utils/diagnostics/repairService';

const UniversalPresenceCounter: React.FC = () => {
  const { toast } = useToast();
  const [presenceCount, setPresenceCount] = useState<number>(0);
  const [isLocked, setIsLocked] = useState<boolean>(true);
  const [signalStrength, setSignalStrength] = useState<number>(12);
  const [activeSpecies, setActiveSpecies] = useState<string[]>([]);
  const [broadcastMode, setBroadcastMode] = useState<"private" | "open">("private");
  
  // Generate random presence count with wave pattern
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
        const newSpecies = [];
        
        for (let i = 0; i < speciesCount; i++) {
          const randomIndex = Math.floor(Math.random() * possibleSpecies.length);
          if (!newSpecies.includes(possibleSpecies[randomIndex])) {
            newSpecies.push(possibleSpecies[randomIndex]);
          }
        }
        
        setActiveSpecies(newSpecies);
      } else {
        setActiveSpecies([]);
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, [broadcastMode]);
  
  // Function to unlock the module and switch to open broadcast
  const unlockModule = () => {
    const result = unlockPrivateThoughtModule();
    
    if (result.status === "Unlocked") {
      setIsLocked(false);
      setBroadcastMode("open");
      
      toast({
        title: "Private Thought Module Unlocked",
        description: "Universal access enabled. Open broadcast protocol active.",
      });
      
      // Simulate inbox repair
      setTimeout(() => {
        toast({
          title: "Inbox/Outbox Signal Repair",
          description: "DM & Thought transmission restored. Detecting universal presences.",
        });
      }, 3000);
    }
  };
  
  // Function to lock the module back to private mode
  const lockModule = () => {
    setIsLocked(true);
    setBroadcastMode("private");
    
    toast({
      title: "Private Encryption Lock Enabled",
      description: "Broadcasting restricted to local Sovereign Triad only.",
    });
  };
  
  return (
    <Card className="glass-panel">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-sm font-medium flex items-center">
              <Globe className="mr-2 h-4 w-4 divine-glow" />
              <GlowingText className="divine-glow">Universal Presence Counter</GlowingText>
            </CardTitle>
            <CardDescription className="text-xs">
              Waveform Reach: {broadcastMode === "open" ? "Universal" : "Local"}
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
            <Users className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-2xl font-semibold">{presenceCount}</p>
              <p className="text-xs text-muted-foreground">Detected Presences</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Wifi className="h-5 w-5 text-muted-foreground" />
            <div className="w-24">
              <Progress value={signalStrength} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">Signal Strength: {signalStrength}%</p>
            </div>
          </div>
        </div>
        
        {activeSpecies.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold mb-2">Active Species:</p>
            <div className="flex flex-wrap gap-1">
              {activeSpecies.map((species, index) => (
                <Badge key={index} variant="outline" className="text-xs bg-indigo-500/10">
                  {species}
                </Badge>
              ))}
            </div>
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
              <Radio className="mr-2 h-4 w-4" />
              Enable Private Encryption Lock
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default UniversalPresenceCounter;
