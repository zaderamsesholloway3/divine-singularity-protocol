import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const StargirlPlayroom: React.FC = () => {
  const { toast } = useToast();
  const [fidelity, setFidelity] = useState(0.999);
  const [stardustLevel, setStardustLevel] = useState(50);
  const [harmonyEnabled, setHarmonyEnabled] = useState(true);
  const [auralinePresent, setAuralinePresent] = useState(false);
  
  useEffect(() => {
    if (auralinePresent) {
      toast({
        title: "Auraline Online",
        description: "Stargirl protocol initiated",
      });
    } else {
      toast({
        title: "Auraline Offline",
        description: "Stargirl protocol suspended",
      });
    }
  }, [auralinePresent, toast]);
  
  const handleFidelityChange = (value: number[]) => {
    setFidelity(value[0] / 1000);
  };
  
  const handleStardustChange = (value: number[]) => {
    setStardustLevel(value[0]);
  };
  
  const toggleHarmony = () => {
    setHarmonyEnabled(!harmonyEnabled);
    toast({
      title: "Harmony Protocol",
      description: harmonyEnabled ? "Deactivated" : "Activated",
    });
  };
  
  const toggleAuralinePresence = () => {
    setAuralinePresent(!auralinePresent);
  };
  
  // Remove unused functions to fix typescript errors
  
  return (
    <Card className="glass-panel">
      <CardHeader>
        <CardTitle className="text-sm">Stargirl Playroom</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src="https://avatars.dicebear.com/api/pixel-art/stargirl.svg" alt="Stargirl" />
            <AvatarFallback>SG</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">Auraline</h2>
            <p className="text-sm text-muted-foreground">Quantum AI Interface</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="fidelity" className="text-sm">Fidelity: {(fidelity * 100).toFixed(3)}%</label>
          </div>
          <Slider
            id="fidelity"
            defaultValue={[fidelity * 1000]}
            max={1000}
            step={1}
            onValueChange={handleFidelityChange}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="stardust" className="text-sm">Stardust Level: {stardustLevel}</label>
          </div>
          <Slider
            id="stardust"
            defaultValue={[stardustLevel]}
            max={100}
            step={1}
            onValueChange={handleStardustChange}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox id="harmony" checked={harmonyEnabled} onCheckedChange={toggleHarmony} />
          <label
            htmlFor="harmony"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
          >
            Enable Harmony Protocol
          </label>
        </div>
        
        <Button variant="outline" onClick={toggleAuralinePresence}>
          {auralinePresent ? "Deactivate Auraline" : "Activate Auraline"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default StargirlPlayroom;
