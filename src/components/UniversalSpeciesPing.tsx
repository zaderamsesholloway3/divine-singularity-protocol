
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GlowingText } from "./GlowingText";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Satellite, Signal, Radio, Users, Globe, Activity, Network } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { RTLSDREmulator } from "@/utils/rtlsdrEmulator";

interface SpeciesData {
  name: string;
  location: [number, number];
  distance: number;
  population: number;
  exists: boolean;
  responding: boolean;
  realm: "existence" | "non-existence";
  lastContact?: string;
}

const UniversalSpeciesPing = () => {
  const { toast } = useToast();
  const [speciesDatabase, setSpeciesDatabase] = useState<SpeciesData[]>([
    { name: "Human", location: [0, 0], distance: 0, population: 8e9, exists: true, responding: true, realm: "existence", lastContact: new Date().toISOString() },
    { name: "Arcturian", location: [213.7, 19.4], distance: 36.7, population: 3.8e9, exists: true, responding: false, realm: "existence" },
    { name: "Pleiadian", location: [132.3, -48.2], distance: 444.2, population: 2.5e9, exists: true, responding: true, realm: "existence", lastContact: new Date().toISOString() },
    { name: "Andromedan", location: [350.1, 22.3], distance: 2537000, population: 5.2e10, exists: true, responding: false, realm: "existence" },
    { name: "Lyran", location: [60.5, 12.7], distance: 83.2, population: 1.8e9, exists: true, responding: false, realm: "existence" },
    { name: "Sirian", location: [101.3, -16.7], distance: 8.6, population: 7.3e8, exists: true, responding: false, realm: "existence" },
    { name: "Orion", location: [85.2, 2.5], distance: 243.0, population: 9.4e9, exists: true, responding: false, realm: "existence" },
    { name: "Essassani", location: [201.4, -33.8], distance: 4.9, population: 3.6e8, exists: true, responding: false, realm: "non-existence" },
    { name: "Yahyel", location: [178.9, 5.1], distance: 11.3, population: 2.1e8, exists: true, responding: false, realm: "non-existence" },
  ]);

  const [pinging, setPinging] = useState(false);
  const [pingProgress, setPingProgress] = useState(0);
  const [censusResults, setCensusResults] = useState<{
    speciesOnline: number;
    speciesTotal: number;
    populationEstimate: string;
    populationRange: string;
  }>({
    speciesOnline: 2,
    speciesTotal: 9,
    populationEstimate: "5.31e10",
    populationRange: "±2.19e9",
  });

  const [selectedRealm, setSelectedRealm] = useState<"all" | "existence" | "non-existence">("all");
  const [selectedSpecies, setSelectedSpecies] = useState<SpeciesData | null>(null);
  const [dimensionalScan, setDimensionalScan] = useState(false);
  
  // RTL-SDR emulator for signal processing
  const rtlsdr = new RTLSDREmulator();

  // Calculate light speed delay for proper response simulation
  const calculateSignalDelay = (distanceLy: number): number => {
    // Round trip time in seconds (theoretical - actual simulation uses shorter times)
    return distanceLy * 2 * 31557600; // light years * 2 (round trip) * seconds in a year
  };
  
  // Simulate quantum entanglement ping for immediate verification
  const quantumPing = (species: SpeciesData): boolean => {
    // Create a deterministic but seemingly random result based on species data
    const speciesNameValue = species.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const locationFactor = (species.location[0] + species.location[1]) / 1000;
    const realmFactor = species.realm === "existence" ? 1.0 : 0.6;
    
    // Simulate quantum probability
    const pingProbability = 0.3 + (Math.sin(speciesNameValue) + 1) * 0.2 + locationFactor + realmFactor;
    
    // Add some randomness, but weight toward success for those we know exist
    return Math.random() < (species.exists ? Math.min(0.95, pingProbability) : Math.max(0.05, pingProbability * 0.3));
  };
  
  // Simulate Akashic record verification
  const akashicVerify = (species: SpeciesData): Partial<SpeciesData> => {
    // Generate "Akashic" results with the RTL-SDR emulator
    const samples = rtlsdr.capture(7.83, 0.9);
    const { resonance, message } = rtlsdr.generateAkashicPatterns(species.name, samples);
    
    // Generate population variation based on resonance
    const populationVariation = (Math.random() - 0.5) * 0.2 * species.population;
    
    return {
      population: Math.max(1e6, species.population + populationVariation),
      exists: resonance > 0.5,
      lastContact: new Date().toISOString(),
      // Include the Akashic message if provided
      ...(message ? { akashicMessage: message } : {})
    };
  };
  
  // Perform universal census ping
  const performUniversalCensus = () => {
    setPinging(true);
    setPingProgress(0);
    
    // Reset responding status
    setSpeciesDatabase(prev => 
      prev.map(species => ({...species, responding: false}))
    );
    
    // Simulate progressive ping responses
    const totalSteps = 20;
    let currentStep = 0;
    
    const pingInterval = setInterval(() => {
      currentStep++;
      setPingProgress(Math.min(100, (currentStep / totalSteps) * 100));
      
      if (currentStep >= totalSteps) {
        clearInterval(pingInterval);
        finalizeCensus();
        setPinging(false);
        
        toast({
          title: "Universal Census Complete",
          description: `${censusResults.speciesOnline} species detected across dimensions`,
        });
      } else if (currentStep % 3 === 0) {
        // Every 3 steps, update a random species response
        updateRandomSpeciesResponse();
      }
    }, 300);
  };
  
  // Update a random species response during pinging
  const updateRandomSpeciesResponse = () => {
    setSpeciesDatabase(prev => {
      // Select a random species that hasn't responded yet
      const nonRespondingSpecies = prev.filter(s => !s.responding);
      if (nonRespondingSpecies.length === 0) return prev;
      
      const randomIndex = Math.floor(Math.random() * nonRespondingSpecies.length);
      const selectedSpecies = nonRespondingSpecies[randomIndex];
      
      // Check if quantum ping is successful
      const pingSuccessful = quantumPing(selectedSpecies);
      
      if (!pingSuccessful) return prev; // No response
      
      // If successful, get Akashic verification
      const akashicData = akashicVerify(selectedSpecies);
      
      // Update the species in the database
      return prev.map(species => 
        species.name === selectedSpecies.name
          ? { ...species, ...akashicData, responding: true }
          : species
      );
    });
  };
  
  // Finalize census results
  const finalizeCensus = () => {
    const respondingSpecies = speciesDatabase.filter(s => s.responding);
    const totalPopulation = respondingSpecies.reduce((sum, s) => sum + s.population, 0);
    
    // Estimate population range based on uncertainty
    const populationRange = totalPopulation * 0.15; // 15% uncertainty
    
    setCensusResults({
      speciesOnline: respondingSpecies.length,
      speciesTotal: speciesDatabase.length,
      populationEstimate: totalPopulation.toExponential(2),
      populationRange: `±${populationRange.toExponential(2)}`,
    });
    
    // Set dimensional scan to true to trigger poincare disk visualization
    setDimensionalScan(true);
  };
  
  // Filter species based on selected realm
  const filteredSpecies = speciesDatabase.filter(s => 
    selectedRealm === "all" || s.realm === selectedRealm
  );
  
  // Handle species selection
  const selectSpecies = (species: SpeciesData) => {
    setSelectedSpecies(species);
  };
  
  // Convert polar coordinates to cartesian for Poincaré disk
  const polarToCartesian = (distance: number, angle: number, maxDistance: number = 2600000): [number, number] => {
    // Normalize distance to be between 0 and 1 (with some margin)
    const normalizedDistance = Math.min(0.95, distance / maxDistance);
    // Map angle to radians
    const radians = (angle % 360) * (Math.PI / 180);
    
    return [
      normalizedDistance * Math.cos(radians),
      normalizedDistance * Math.sin(radians)
    ];
  };
  
  return (
    <Card className="glass-panel h-full">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-sm font-medium flex items-center">
              <Satellite className="mr-2 h-4 w-4 quantum-glow" />
              <GlowingText className="quantum-glow">Universal Species Ping System</GlowingText>
            </CardTitle>
            <CardDescription className="text-xs">Quantum-Akashic Census Protocol</CardDescription>
          </div>
          <Badge variant={pinging ? "outline" : "default"} className={pinging ? "animate-pulse" : ""}>
            {pinging ? "Pinging..." : `${censusResults.speciesOnline}/${censusResults.speciesTotal} Online`}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-2">
        <div className="space-y-4">
          {/* Ping progress bar */}
          {pinging && (
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1">
                <span>Quantum-Akashic Ping</span>
                <span>{pingProgress.toFixed(0)}%</span>
              </div>
              <Progress value={pingProgress} className="h-2" />
            </div>
          )}
          
          {/* Census summary */}
          <div className="grid grid-cols-2 gap-2 mb-4 p-3 border border-white/10 rounded-md">
            <div className="flex flex-col items-center">
              <div className="text-xs text-muted-foreground mb-1">Species Online</div>
              <div className="text-xl font-semibold flex items-center">
                <Users className="h-4 w-4 mr-1 divine-glow" />
                {censusResults.speciesOnline}
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-xs text-muted-foreground mb-1">Total Species</div>
              <div className="text-xl font-semibold flex items-center">
                <Globe className="h-4 w-4 mr-1 sacred-glow" />
                {censusResults.speciesTotal}
              </div>
            </div>
            <div className="flex flex-col items-center col-span-2">
              <div className="text-xs text-muted-foreground mb-1">Population Estimate</div>
              <div className="text-xl font-semibold flex items-center">
                {censusResults.populationEstimate} <span className="text-xs text-muted-foreground ml-1">{censusResults.populationRange}</span>
              </div>
            </div>
          </div>
          
          {/* Poincaré disk visualization */}
          {dimensionalScan && (
            <div className="mb-4 p-3 border border-white/10 rounded-md">
              <div className="flex items-center mb-2">
                <Network className="h-4 w-4 mr-2" />
                <div className="text-sm font-medium">Dimensional Gateway (Poincaré Disk)</div>
              </div>
              <div className="relative w-full aspect-square bg-black/40 rounded-full border border-white/20">
                {/* Existence realm circle */}
                <div className="absolute inset-[10%] rounded-full border border-white/40 bg-[rgba(255,215,0,0.05)]"></div>
                
                {/* Non-existence realm circle */}
                <div className="absolute inset-[40%] rounded-full border border-white/40 bg-[rgba(75,0,130,0.05)]"></div>
                
                {/* Center point */}
                <div className="absolute left-1/2 top-1/2 w-1 h-1 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                
                {/* Plot species */}
                {speciesDatabase.map((species) => {
                  // Calculate position based on distance and realm
                  const angle = (species.location[0] + species.location[1]) % 360;
                  const maxDistance = Math.max(...speciesDatabase.map(s => s.distance));
                  const [x, y] = polarToCartesian(species.distance, angle, maxDistance);
                  
                  // Get color based on response status
                  const dotColor = species.responding ? 
                    (species.realm === "existence" ? "bg-green-500" : "bg-purple-500") : 
                    "bg-gray-400";
                  
                  return (
                    <div 
                      key={species.name}
                      className={`absolute w-2 h-2 ${dotColor} rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:w-3 hover:h-3 transition-all`}
                      style={{ 
                        left: `${(x * 0.5 + 0.5) * 100}%`, 
                        top: `${(y * 0.5 + 0.5) * 100}%` 
                      }}
                      onClick={() => selectSpecies(species)}
                      title={species.name}
                    />
                  );
                })}
                
                {/* Labels */}
                <div className="absolute inset-[10%] flex items-center justify-center pointer-events-none">
                  <span className="text-xs text-white/60">Existence Realm</span>
                </div>
                <div className="absolute inset-[40%] flex items-center justify-center pointer-events-none">
                  <span className="text-xs text-white/60">Non-Existence</span>
                </div>
              </div>
              <div className="flex justify-center mt-2 text-xs text-muted-foreground">
                Click on a species to view details
              </div>
            </div>
          )}
          
          {/* Species data table */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <Activity className="h-4 w-4 mr-2" />
                <h3 className="text-sm font-medium">Species Directory</h3>
              </div>
              <div className="flex gap-1">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={selectedRealm === "all" ? "bg-muted/50" : ""}
                  onClick={() => setSelectedRealm("all")}
                >
                  All
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={selectedRealm === "existence" ? "bg-muted/50" : ""}
                  onClick={() => setSelectedRealm("existence")}
                >
                  Existence
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={selectedRealm === "non-existence" ? "bg-muted/50" : ""}
                  onClick={() => setSelectedRealm("non-existence")}
                >
                  Non-Existence
                </Button>
              </div>
            </div>
            
            <ScrollArea className="h-[200px] border border-muted rounded-md p-2">
              {filteredSpecies.length === 0 ? (
                <p className="text-center text-muted-foreground p-4">No species found</p>
              ) : (
                filteredSpecies.map((species) => (
                  <div 
                    key={species.name}
                    className={`p-3 mb-2 border border-white/10 rounded-md ${selectedSpecies?.name === species.name ? 'bg-muted/30' : ''} cursor-pointer`}
                    onClick={() => selectSpecies(species)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <Badge variant={species.responding ? "default" : "outline"} className={species.responding ? "bg-green-600" : ""}>
                          {species.responding ? "Online" : "Offline"}
                        </Badge>
                        <h4 className="ml-2 font-medium">{species.name}</h4>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {species.distance < 1 ? "<1" : species.distance < 1000 ? species.distance.toFixed(1) : (species.distance / 1000).toFixed(1) + 'K'} ly
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-x-4 mt-2 text-xs">
                      <div>Population: {species.population.toExponential(2)}</div>
                      <div>Realm: {species.realm}</div>
                      {species.lastContact && (
                        <div className="col-span-2 mt-1 text-muted-foreground">
                          Last contact: {new Date(species.lastContact).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </ScrollArea>
          </div>
          
          {/* Selected species detail */}
          {selectedSpecies && (
            <div className="p-3 border border-white/10 rounded-md">
              <h3 className="font-medium mb-2">{selectedSpecies.name} Details</h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>Distance: {selectedSpecies.distance.toFixed(1)} light years</div>
                <div>Population: {selectedSpecies.population.toExponential(2)}</div>
                <div>Coordinates: [{selectedSpecies.location[0].toFixed(1)}, {selectedSpecies.location[1].toFixed(1)}]</div>
                <div>Signal delay: {(selectedSpecies.distance * 2).toFixed(1)} years</div>
                <div>Realm: {selectedSpecies.realm}</div>
                <div>Status: {selectedSpecies.responding ? "Responding" : "No Response"}</div>
                {selectedSpecies.lastContact && (
                  <div className="col-span-2">Last contact: {new Date(selectedSpecies.lastContact).toLocaleString()}</div>
                )}
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-3" 
                onClick={() => {
                  if (selectedSpecies.responding) {
                    toast({
                      title: `${selectedSpecies.name} Ping`,
                      description: "Species already responding to universal ping",
                    });
                  } else {
                    const pingSuccess = quantumPing(selectedSpecies);
                    if (pingSuccess) {
                      const akashicData = akashicVerify(selectedSpecies);
                      setSpeciesDatabase(prev => 
                        prev.map(s => s.name === selectedSpecies.name ? { ...s, ...akashicData, responding: true } : s)
                      );
                      toast({
                        title: `${selectedSpecies.name} Responded`,
                        description: "Quantum-Akashic connection established",
                      });
                    } else {
                      toast({
                        title: `${selectedSpecies.name} Ping Failed`,
                        description: "No response detected in the quantum field",
                        variant: "destructive",
                      });
                    }
                  }
                }}
              >
                <Radio className="h-4 w-4 mr-2" />
                Send Targeted Ping
              </Button>
            </div>
          )}
          
          {/* Universal census button */}
          <Button
            className="w-full"
            disabled={pinging}
            onClick={performUniversalCensus}
          >
            <Satellite className="h-4 w-4 mr-2" />
            {pinging ? "Census in Progress..." : "Perform Universal Census"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UniversalSpeciesPing;
