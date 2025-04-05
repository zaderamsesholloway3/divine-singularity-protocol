
import React, { useRef, useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Radio, Target, RotateCw, Globe, Zap } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { GlowingText } from "./GlowingText";
import { SpeciesGateway, SpeciesGatewayRef } from "./species/SpeciesGateway";
import BioresonanceControls from "./species/BioresonanceControls";

interface QuantumBoostParameters {
  t1: number;
  qubits: number;
  backend: string;
}

const ibmQuantumSimulation: QuantumBoostParameters = {
  t1: 348.23,
  qubits: 127,
  backend: "ibm_sherbrooke"
};

interface SpeciesData {
  name: string;
  location: [number, number];
  distance: number;
  population: number;
  exists: boolean;
  responding: boolean;
  realm: "existence" | "non-existence";
  lastContact?: string;
  phaseOffset?: number;
  fq?: number;
  vibration?: number;
  archetype?: string;
}

const UniversalSpeciesPing: React.FC = () => {
  const { toast } = useToast();
  
  const speciesGatewayRef = useRef<SpeciesGatewayRef>(null);
  
  const [species, setSpecies] = useState<SpeciesData[]>([]);
  const [selectedSpecies, setSelectedSpecies] = useState<SpeciesData | null>(null);
  const [pinging, setPinging] = useState<boolean>(false);
  const [pingProgress, setPingProgress] = useState<number>(0);
  const [pingMode, setPingMode] = useState<"universal" | "targeted">("universal");
  const [viewMode, setViewMode] = useState<"disk" | "constellation">("disk");
  const [quantumBoost, setQuantumBoost] = useState<number>(1.0);
  const [pingRange, setPingRange] = useState<number>(0.61);
  const [quantumBackendStats] = useState<QuantumBoostParameters>(ibmQuantumSimulation);
  const [targetLocked, setTargetLocked] = useState<boolean>(false);

  useEffect(() => {
    const realms: ("existence" | "non-existence")[] = ["existence", "non-existence"];
    const archetypes = ["Crystalline", "Biomechanical", "Plasma", "Photonic", "Quantum", "Vibrational", "Geometric"];
    
    const generatedSpecies: SpeciesData[] = Array.from({ length: 28 }).map((_, i) => {
      const realm = realms[Math.floor(Math.random() * realms.length)];
      const distance = realm === "existence" 
        ? Math.random() * 500000 + 10000 
        : Math.random() * 200000 + 1000;
      
      return {
        name: `Species-${String.fromCharCode(65 + i % 26)}${Math.floor(i / 26) + 1}`,
        location: [Math.random() * 360, (Math.random() * 180) - 90],
        distance,
        population: Math.floor(Math.random() * 1e12 + 1e6),
        exists: Math.random() > 0.2,
        responding: Math.random() > 0.3,
        realm,
        lastContact: "2024-03-28T14:32:45Z",
        phaseOffset: Math.random() * 45,
        fq: Math.random() * 0.5 + 0.5,
        vibration: 7.83 + (Math.random() - 0.5) * 2,
        archetype: archetypes[Math.floor(Math.random() * archetypes.length)]
      };
    });
    
    setSpecies(generatedSpecies);
  }, []);

  const startPing = () => {
    if (pingMode === "targeted" && !selectedSpecies) {
      toast({
        title: "No Species Selected",
        description: "Please select a species for targeted ping",
      });
      return;
    }
    
    if (pingMode === "targeted" && !targetLocked) {
      if (speciesGatewayRef.current) {
        const locked = speciesGatewayRef.current.toggleTargetLock();
        setTargetLocked(locked);
        
        if (!locked) {
          toast({
            title: "Target Lock Failed",
            description: "Please select a species and try again",
          });
          return;
        }
      }
    }
    
    setPinging(true);
    setPingProgress(0);
    
    const pingDuration = pingMode === "targeted" ? 3000 : 5000;
    const pingSpeed = pingDuration / (quantumBoost * 1.5);
    const interval = Math.max(50, pingSpeed / 100);
    
    const timer = setInterval(() => {
      setPingProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          handlePingComplete();
          return 100;
        }
        return prev + (100 / (pingSpeed / interval));
      });
    }, interval);
  };

  const toggleTargetLock = () => {
    if (speciesGatewayRef.current) {
      const isLocked = speciesGatewayRef.current.toggleTargetLock();
      setTargetLocked(isLocked);
    }
  };

  const handlePingComplete = () => {
    setPinging(false);
    
    const pingResults = Math.random() > 0.2;
    const detectedSpecies = pingMode === "targeted" ? 1 : Math.floor(Math.random() * 8) + 2;
    
    if (pingResults) {
      toast({
        title: pingMode === "targeted" ? "Targeted Ping Complete" : "Universal Ping Complete",
        description: pingMode === "targeted" 
          ? `Contact established with ${selectedSpecies?.name}` 
          : `Detected ${detectedSpecies} species within ${pingRange.toFixed(1)} billion light years`,
      });
      
      if (pingMode === "targeted" && selectedSpecies) {
        setSpecies(prev => 
          prev.map(s => 
            s.name === selectedSpecies.name 
              ? { ...s, responding: true, lastContact: new Date().toISOString() } 
              : s
          )
        );
      } else {
        const updatedSpecies = [...species];
        for (let i = 0; i < Math.min(detectedSpecies, updatedSpecies.length); i++) {
          const randIndex = Math.floor(Math.random() * updatedSpecies.length);
          updatedSpecies[randIndex] = { 
            ...updatedSpecies[randIndex], 
            responding: true,
            lastContact: new Date().toISOString() 
          };
        }
        setSpecies(updatedSpecies);
      }
    } else {
      toast({
        title: "Ping Failed",
        description: pingMode === "targeted" 
          ? `No response from ${selectedSpecies?.name}` 
          : "No species detected in range",
        variant: "destructive",
      });
    }
  };

  const handleSelectSpecies = (species: SpeciesData) => {
    setSelectedSpecies(species);
    
    if (species) {
      toast({
        title: "Species Selected",
        description: `${species.name} - ${species.realm === "existence" ? "Existence Realm" : "Non-Existence Realm"}`,
      });
      
      setTargetLocked(false);
    }
  };

  const increaseQuantumBoost = () => {
    setQuantumBoost(prev => {
      const newBoost = Math.min(5.0, prev + 0.5);
      updatePingRange(newBoost);
      
      toast({
        title: "Quantum Boost Increased",
        description: `Now operating at ${newBoost.toFixed(1)}x with IBM ${quantumBackendStats.backend}`,
      });
      
      return newBoost;
    });
  };

  const updatePingRange = (boost: number) => {
    const quantumRangeBoost = quantumBackendStats.t1 * quantumBackendStats.qubits / 100;
    const simulatedRange = 0.61 * boost * quantumRangeBoost;
    const cappedRange = Math.min(93, simulatedRange);
    setPingRange(Number(cappedRange.toFixed(2)));
  };

  useEffect(() => {
    updatePingRange(quantumBoost);
  }, [quantumBoost, quantumBackendStats]);

  return (
    <Card className="glass-panel bg-gradient-to-br from-gray-900 to-black text-white">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-sm font-medium flex items-center">
              <Radio className="mr-2 h-4 w-4 divine-glow" />
              <GlowingText className="divine-glow">Universal Species Ping</GlowingText>
              <Badge variant="outline" className="ml-2 text-[0.6rem] bg-indigo-500/10">
                <Zap className="h-3 w-3 mr-1 text-indigo-400" />
                IBM {quantumBackendStats.backend}
              </Badge>
            </CardTitle>
            <CardDescription className="text-xs">
              Quantum-enhanced cosmic species detection at {pingRange.toFixed(2)} billion light years
            </CardDescription>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 w-7 p-0" 
              onClick={() => setViewMode(prev => prev === "disk" ? "constellation" : "disk")}
            >
              <Globe className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <SpeciesGateway 
          species={species} 
          onSelectSpecies={handleSelectSpecies}
          selectedSpecies={selectedSpecies}
          mode={viewMode}
          ref={speciesGatewayRef}
        />
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium">Ping Type:</span>
              <div className="flex items-center gap-1">
                <Badge
                  variant={pingMode === "universal" ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => {
                    setPingMode("universal");
                    setTargetLocked(false);
                  }}
                >
                  Universal
                </Badge>
                <Badge
                  variant={pingMode === "targeted" ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setPingMode("targeted")}
                >
                  Targeted
                </Badge>
              </div>
            </div>
            
            {pinging ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span>Pinging {pingMode === "targeted" && selectedSpecies ? selectedSpecies.name : "Universe"}...</span>
                  <span>{pingProgress}%</span>
                </div>
                <Progress value={pingProgress} className="h-1.5" />
              </div>
            ) : (
              <div className="space-y-2">
                {pingMode === "targeted" && (
                  <div className="text-xs flex justify-between">
                    <span>Target:</span>
                    <span className="font-medium">{selectedSpecies?.name || "None Selected"}</span>
                  </div>
                )}
                <div className="flex gap-2">
                  <Button 
                    className="w-full text-xs" 
                    size="sm" 
                    onClick={startPing}
                    disabled={(pingMode === "targeted" && !selectedSpecies) || pinging}
                  >
                    <RotateCw className="mr-1 h-3 w-3" />
                    {pingMode === "targeted" ? "Targeted Ping" : "Universal Ping"}
                  </Button>
                  
                  {pingMode === "targeted" && (
                    <Button 
                      className={`text-xs ${targetLocked ? "bg-red-600 hover:bg-red-700" : ""}`} 
                      size="sm" 
                      variant={targetLocked ? "default" : "outline"}
                      disabled={!selectedSpecies}
                      onClick={toggleTargetLock}
                    >
                      <Target className="mr-1 h-3 w-3" />
                      {targetLocked ? "Locked" : "Lock Target"}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <BioresonanceControls
            selectedSpecies={selectedSpecies ? [selectedSpecies] : []}
            faithQuotient={0.8}
            onAmplificationComplete={(result) => {
              if (result.success && quantumBoost < 5) {
                increaseQuantumBoost();
              }
            }}
          />
        </div>
        
        <div className="mt-4 border-t border-gray-700 pt-2">
          <div className="text-xs text-gray-400 flex justify-between">
            <div>
              <span className="font-semibold">IBM {quantumBackendStats.backend}:</span> {quantumBackendStats.qubits} qubits
            </div>
            <div>T₁: {quantumBackendStats.t1.toFixed(2)} μs</div>
            <div>Range: {pingRange.toFixed(2)} billion ly</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UniversalSpeciesPing;
