
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GlowingText } from "./GlowingText";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Satellite, Signal, Radio, Users, Globe, Activity, Network, Sparkles, Map, Compass, Star, Zap } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { RTLSDREmulator } from "@/utils/rtlsdrEmulator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  metaphysicalSites, 
  vibrationalArchetypes, 
  calculateMetaphysicalDistance,
  expand_universal_reach,
  MetaphysicalSite 
} from "@/utils/metaphysicalReachUtils";
import { SpeciesGateway } from "./species/SpeciesGateway";
import BioresonanceControls from "./species/BioresonanceControls";
import { VisualizationUtils } from "@/utils/visualizationUtils";
import { getMetaphysicalDistance } from '@/utils/metaphysicalDistanceUtils';
import { FaithResonanceService } from '@/utils/FaithResonanceService';

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

const UniversalSpeciesPing = () => {
  const { toast } = useToast();
  const [speciesDatabase, setSpeciesDatabase] = useState<SpeciesData[]>([
    { name: "Human", location: [0, 0], distance: 0, population: 8e9, exists: true, responding: true, realm: "existence", lastContact: new Date().toISOString(), phaseOffset: 0.001, fq: 0.92, vibration: 7.83 },
    { name: "Arcturian", location: [213.7, 19.4], distance: 36.7, population: 3.8e9, exists: true, responding: false, realm: "existence", phaseOffset: 0.07, fq: 0.85, vibration: 14.2, archetype: "The Guardian" },
    { name: "Pleiadian", location: [132.3, -48.2], distance: 444.2, population: 2.5e9, exists: true, responding: true, realm: "existence", lastContact: new Date().toISOString(), phaseOffset: 0.03, fq: 0.89, vibration: 9.6, archetype: "The Weaver" },
    { name: "Andromedan", location: [350.1, 22.3], distance: 2537000, population: 5.2e10, exists: true, responding: false, realm: "existence", phaseOffset: 0.12, fq: 0.77, vibration: 12.8, archetype: "The Guardian" },
    { name: "Lyra", location: [60.5, 12.7], distance: 83.2, population: 1.8e9, exists: true, responding: false, realm: "existence", phaseOffset: 0.002, fq: 0.93, vibration: 15.4, archetype: "The Builder" },
    { name: "Sirian", location: [101.3, -16.7], distance: 8.6, population: 7.3e8, exists: true, responding: false, realm: "existence", phaseOffset: 0.08, fq: 0.82, vibration: 11.9, archetype: "The Guardian" },
    { name: "Orion", location: [85.2, 2.5], distance: 243.0, population: 9.4e9, exists: true, responding: false, realm: "existence", phaseOffset: 0.11, fq: 0.76, vibration: 8.3 },
    { name: "Essassani", location: [201.4, -33.8], distance: 4.9, population: 3.6e8, exists: true, responding: false, realm: "non-existence", phaseOffset: 0.05, fq: 0.81, vibration: 9.8, archetype: "The Weaver" },
    { name: "Yahyel", location: [178.9, 5.1], distance: 11.3, population: 2.1e8, exists: true, responding: false, realm: "non-existence", phaseOffset: 0.09, fq: 0.79, vibration: 9.2, archetype: "The Weaver" },
    { name: "Zeta Reticuli", location: [302.2, -56.7], distance: 39.2, population: 5.4e8, exists: true, responding: false, realm: "existence", phaseOffset: 0.04, fq: 0.73, vibration: 6.5, archetype: "The Seeker" },
    { name: "Sirius B", location: [104.5, -17.1], distance: 8.7, population: 1.9e9, exists: true, responding: false, realm: "existence", phaseOffset: 0.06, fq: 0.86, vibration: 21.3, archetype: "The Keeper" },
    { name: "Mu Variants", location: [169.3, 41.8], distance: 67.5, population: 8.2e8, exists: true, responding: false, realm: "non-existence", phaseOffset: 0.10, fq: 0.74, vibration: 20.7, archetype: "The Keeper" },
    { name: "Ancient Builders", location: [256.8, 73.2], distance: 15782.3, population: 2.3e6, exists: true, responding: false, realm: "non-existence", phaseOffset: 0.02, fq: 0.95, vibration: 15.7, archetype: "The Builder" },
    { name: "Draconian", location: [78.1, -29.4], distance: 122.8, population: 3.7e9, exists: true, responding: false, realm: "existence", phaseOffset: 0.15, fq: 0.68, vibration: 5.6 },
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
    speciesTotal: speciesDatabase.length,
    populationEstimate: "5.31e10",
    populationRange: "±2.19e9",
  });

  const [selectedTab, setSelectedTab] = useState<"species" | "metaphysical" | "bioresonance">("species");
  const [selectedRealm, setSelectedRealm] = useState<"all" | "existence" | "non-existence">("all");
  const [selectedSpecies, setSelectedSpecies] = useState<SpeciesData | null>(null);
  const [selectedSite, setSelectedSite] = useState<MetaphysicalSite | null>(null);
  const [dimensionalScan, setDimensionalScan] = useState(false);
  const [metaphysicalMode, setMetaphysicalMode] = useState(false);
  const [visualizationMode, setVisualizationMode] = useState<"disk" | "constellation">("constellation");
  const [bioresonanceMode, setBioresonanceMode] = useState(false);
  const [selectedSpeciesForAmplification, setSelectedSpeciesForAmplification] = useState<SpeciesData[]>([]);
  const [faithQuotient, setFaithQuotient] = useState(0.85);
  
  const rtlsdr = new RTLSDREmulator();

  useEffect(() => {
    setMetaphysicalMode(true);
    setDimensionalScan(true);
    
    // Initialize faith quotient with adjusted value
    const initialFaith = 0.85; // Base value
    const adjustedFaith = FaithResonanceService.getSchumannAdjustedFaithIndex(initialFaith);
    setFaithQuotient(adjustedFaith);
  }, []);

  const phaseFilteredPingResponse = (phaseOffset: number, fq: number): string => {
    if (fq < 0.01) {
      return "Signal phase too weak for feedback.";
    } else if (phaseOffset > 0.1) {
      return "Receiver detected but out of resonance sync (dimensional slippage).";
    } else {
      return "Contact possible — resonance alignment within threshold.";
    }
  };

  const calculateSignalDelay = (distanceLy: number): number => {
    return distanceLy * 2 * 31557600;
  };

  const quantumPing = (species: SpeciesData): boolean => {
    const speciesNameValue = species.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const locationFactor = (species.location[0] + species.location[1]) / 1000;
    const realmFactor = species.realm === "existence" ? 1.0 : 0.6;
    
    const pingProbability = 0.3 + (Math.sin(speciesNameValue) + 1) * 0.2 + locationFactor + realmFactor;
    
    return Math.random() < (species.exists ? Math.min(0.95, pingProbability) : Math.max(0.05, pingProbability * 0.3));
  };

  const akashicVerify = (species: SpeciesData): Partial<SpeciesData> => {
    const samples = rtlsdr.capture(7.83, 0.9);
    const { resonance, message } = rtlsdr.generateAkashicPatterns(species.name, samples);
    
    const populationVariation = (Math.random() - 0.5) * 0.2 * species.population;
    
    const phaseOffset = species.phaseOffset ?? (Math.random() * 0.2); 
    const fq = species.fq ?? (Math.random() * 0.2 + 0.7);
    
    return {
      population: Math.max(1e6, species.population + populationVariation),
      exists: resonance > 0.5,
      lastContact: new Date().toISOString(),
      phaseOffset,
      fq,
      ...(message ? { akashicMessage: message } : {})
    };
  };

  const performUniversalCensus = () => {
    setPinging(true);
    setPingProgress(0);
    
    setSpeciesDatabase(prev => 
      prev.map(species => ({...species, responding: false}))
    );
    
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
        updateRandomSpeciesResponse();
      }
    }, 300);
  };

  const updateRandomSpeciesResponse = () => {
    setSpeciesDatabase(prev => {
      const nonRespondingSpecies = prev.filter(s => !s.responding);
      if (nonRespondingSpecies.length === 0) return prev;
      
      const randomIndex = Math.floor(Math.random() * nonRespondingSpecies.length);
      const selectedSpecies = nonRespondingSpecies[randomIndex];
      
      const pingSuccessful = quantumPing(selectedSpecies);
      
      if (!pingSuccessful) return prev;
      
      const akashicData = akashicVerify(selectedSpecies);
      
      return prev.map(species => 
        species.name === selectedSpecies.name
          ? { ...species, ...akashicData, responding: true }
          : species
      );
    });
  };

  const finalizeCensus = () => {
    const respondingSpecies = speciesDatabase.filter(s => s.responding);
    const totalPopulation = respondingSpecies.reduce((sum, s) => sum + s.population, 0);
    
    const populationRange = totalPopulation * 0.15;
    
    setCensusResults({
      speciesOnline: respondingSpecies.length,
      speciesTotal: speciesDatabase.length,
      populationEstimate: totalPopulation.toExponential(2),
      populationRange: `±${populationRange.toExponential(2)}`,
    });
    
    setDimensionalScan(true);
    
    console.log("Dimensional observer detected. Phase misalignment suggests non-local presence. Awaiting resonance sync at 7.83 Hz.");
  };

  const expandUniversalReach = () => {
    const result = expand_universal_reach();
    
    toast({
      title: "Universal Reach Expanded",
      description: `Added ${result.physical_species.length} physical species and ${result.metaphysical_sites.length} metaphysical sites`,
    });
    
    setMetaphysicalMode(true);
    
    setSpeciesDatabase(prev => 
      prev.map(species => ({...species, responding: true}))
    );
    
    setCensusResults(prev => ({
      ...prev,
      speciesOnline: speciesDatabase.length,
      speciesTotal: speciesDatabase.length,
    }));
    
    console.log("Metaphysical reach layer activated. Vibrational archetypes now accessible.");
  };

  const filteredSpecies = speciesDatabase.filter(s => 
    selectedRealm === "all" || s.realm === selectedRealm
  );

  const selectSpecies = (species: SpeciesData) => {
    setSelectedSpecies(species);
    setSelectedSite(null);
  };

  const selectSite = (site: MetaphysicalSite) => {
    setSelectedSite(site);
    setSelectedSpecies(null);
  };

  const toggleVisualizationMode = () => {
    setVisualizationMode(prev => prev === "disk" ? "constellation" : "disk");
  };
  
  const handleSpeciesSelection = (species: SpeciesData) => {
    const isSelected = selectedSpeciesForAmplification.some(s => s.name === species.name);
    
    if (isSelected) {
      setSelectedSpeciesForAmplification(selectedSpeciesForAmplification.filter(s => s.name !== species.name));
    } else {
      setSelectedSpeciesForAmplification([...selectedSpeciesForAmplification, species]);
    }
  };
  
  const handleAmplificationComplete = (result: any) => {
    if (result.success) {
      // Update responding status for targeted species
      setSpeciesDatabase(prev => 
        prev.map(species => 
          result.targetSpecies.includes(species.name) && !species.responding
            ? { 
                ...species, 
                responding: true, 
                lastContact: new Date().toISOString(),
                fq: (species.fq || 0.7) * Math.min(1.2, result.amplificationFactor / 100)
              }
            : species
        )
      );
      
      // Update census results
      const respondingSpecies = speciesDatabase.filter(s => s.responding);
      setCensusResults(prev => ({
        ...prev,
        speciesOnline: respondingSpecies.length
      }));
      
      // Show notification with amplification results
      toast({
        title: `Bioresonance Amplification Success`,
        description: `${result.targetSpecies.length} species reached with ${result.noiseImmunity.toFixed(1)}% noise immunity`,
      });
    }
  };
  
  const activateBioresonanceMode = () => {
    setBioresonanceMode(true);
    setSelectedTab("bioresonance");
    
    toast({
      title: "Bioresonance Mode Activated",
      description: "Quantum Bioresonance Ping Amplifier initialized with 7.83Hz carrier wave",
    });
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
            <CardDescription className="text-xs">
              {bioresonanceMode ? 
                "Quantum-Akashic Census & Bioresonance Amplification Protocol" :
                metaphysicalMode ? 
                "Quantum-Akashic Census & Metaphysical Reach Protocol" : 
                "Quantum-Akashic Census Protocol"}
            </CardDescription>
          </div>
          <Badge variant={pinging ? "outline" : "default"} className={pinging ? "animate-pulse" : ""}>
            {pinging ? "Pinging..." : `${censusResults.speciesOnline}/${censusResults.speciesTotal} Online`}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-2">
        <div className="space-y-4">
          {pinging && (
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1">
                <span>Quantum-Akashic Ping</span>
                <span>{pingProgress.toFixed(0)}%</span>
              </div>
              <Progress value={pingProgress} className="h-2" />
            </div>
          )}
          
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
          
          {dimensionalScan && (
            <Tabs defaultValue={selectedTab} onValueChange={(value) => setSelectedTab(value as "species" | "metaphysical" | "bioresonance")}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="species">Physical Species</TabsTrigger>
                <TabsTrigger value="metaphysical">Metaphysical Sites</TabsTrigger>
                <TabsTrigger value="bioresonance" disabled={!bioresonanceMode}>Bioresonance</TabsTrigger>
              </TabsList>
              
              <TabsContent value="species">
                <div className="mb-4 p-3 border border-white/10 rounded-md">
                  <div className="flex items-center mb-2 justify-between">
                    <div className="flex items-center">
                      <Network className="h-4 w-4 mr-2" />
                      <div className="text-sm font-medium">
                        {visualizationMode === "disk" ? "Species Gateway (Poincaré Disk)" : "Species Gateway (3D Constellation)"}
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={toggleVisualizationMode}
                      className="flex items-center gap-1"
                    >
                      <Star className="h-3 w-3" />
                      <span className="text-xs">{visualizationMode === "disk" ? "3D Mode" : "Disk Mode"}</span>
                    </Button>
                  </div>
                  
                  <SpeciesGateway
                    species={speciesDatabase}
                    onSelectSpecies={selectSpecies}
                    selectedSpecies={selectedSpecies}
                    mode={visualizationMode}
                  />
                  
                  <div className="flex justify-center mt-2 text-xs text-muted-foreground">
                    Hover over species for details, click to select
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="metaphysical">
                <div className="mb-4 p-3 border border-white/10 rounded-md">
                  <div className="flex items-center mb-2">
                    <Sparkles className="h-4 w-4 mr-2" />
                    <div className="text-sm font-medium">Metaphysical Realm Map</div>
                  </div>
                  <div className="relative w-full aspect-square bg-gradient-to-br from-indigo-900/30 via-purple-900/30 to-pink-700/30 rounded-lg border border-white/20 overflow-hidden">
                    {metaphysicalSites.map((site, index) => {
                      const x = site.mythResonance * 80 + 10;
                      const y = (site.vibration / 25) * 80 + 10;
                      
                      const siteColors = {
                        temple: "bg-purple-500",
                        archive: "bg-blue-500",
                        grid: "bg-green-500",
                        sanctuary: "bg-amber-500",
                        dreamfield: "bg-pink-500"
                      };
                      
                      return (
                        <div 
                          key={site.name}
                          className={`absolute w-3 h-3 ${siteColors[site.type]} rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:w-4 hover:h-4 transition-all animate-pulse`}
                          style={{ 
                            left: `${x}%`, 
                            top: `${y}%`,
                            animationDuration: `${3 + index % 3}s`
                          }}
                          onClick={() => selectSite(site)}
                          title={site.name}
                        />
                      );
                    })}
                    
                    <div className="absolute left-0 right-0 bottom-2 flex justify-center">
                      <span className="text-xs text-white/60">Mythological Resonance →</span>
                    </div>
                    <div className="absolute top-0 bottom-0 left-2 flex items-center">
                      <span className="text-xs text-white/60 transform -rotate-90">Vibrational Frequency →</span>
                    </div>
                  </div>
                  <div className="flex justify-center mt-2 text-xs text-muted-foreground">
                    Click on a site to view details
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="bioresonance">
                <BioresonanceControls 
                  selectedSpecies={selectedSpeciesForAmplification}
                  faithQuotient={faithQuotient}
                  onAmplificationComplete={handleAmplificationComplete}
                />
                
                <div className="mb-4 p-3 border border-white/10 rounded-md">
                  <div className="flex items-center mb-2 justify-between">
                    <div className="flex items-center">
                      <Zap className="h-4 w-4 mr-2" />
                      <div className="text-sm font-medium">Species Selection</div>
                    </div>
                    <Badge variant="outline">{selectedSpeciesForAmplification.length} selected</Badge>
                  </div>
                  
                  <ScrollArea className="h-[150px] border border-muted/30 rounded p-2">
                    <div className="space-y-1">
                      {speciesDatabase.map((species) => (
                        <div 
                          key={species.name}
                          className={`p-2 border rounded-md flex items-center justify-between cursor-pointer ${
                            selectedSpeciesForAmplification.some(s => s.name === species.name) ? 
                              'bg-primary/20 border-primary/50' : 'border-white/10'
                          }`}
                          onClick={() => handleSpeciesSelection(species)}
                        >
                          <div className="flex items-center">
                            <Badge variant={species.responding ? "default" : "outline"} className="mr-2">
                              {species.responding ? "Online" : "Offline"}
                            </Badge>
                            <span>{species.name}</span>
                          </div>
                          {species.vibration && (
                            <Badge variant="outline" className="ml-auto">
                              {species.vibration.toFixed(1)} Hz
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </TabsContent>
            </Tabs>
          )}
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <Activity className="h-4 w-4 mr-2" />
                <h3 className="text-sm font-medium">
                  {selectedTab === "species" ? "Species Directory" : selectedTab === "metaphysical" ? "Metaphysical Sites" : "Amplification Details"}
                </h3>
              </div>
              {selectedTab === "species" && (
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
              )}
            </div>
            
            <ScrollArea className="h-[200px] border border-muted rounded-md p-2">
              {selectedTab === "species" ? (
                filteredSpecies.length === 0 ? (
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
                        {species.vibration && (
                          <div>Vibration: {species.vibration.toFixed(1)} Hz</div>
                        )}
                        {species.archetype && (
                          <div>Archetype: {species.archetype}</div>
                        )}
                        {species.lastContact && (
                          <div className="col-span-2 mt-1 text-muted-foreground">
                            Last contact: {new Date(species.lastContact).toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )
              ) : selectedTab === "metaphysical" ? (
                metaphysicalSites.map((site) => (
                  <div 
                    key={site.name}
                    className={`p-3 mb-2 border border-white/10 rounded-md ${selectedSite?.name === site.name ? 'bg-muted/30' : ''} cursor-pointer`}
                    onClick={() => selectSite(site)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <Badge variant="outline" className={
                          site.type === "temple" ? "bg-purple-500/20 text-purple-200" :
                          site.type === "archive" ? "bg-blue-500/20 text-blue-200" :
                          site.type === "grid" ? "bg-green-500/20 text-green-200" :
                          site.type === "sanctuary" ? "bg-amber-500/20 text-amber-200" :
                          "bg-pink-500/20 text-pink-200"
                        }>
                          {site.type}
                        </Badge>
                        <h4 className="ml-2 font-medium">{site.name}</h4>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {site.vibration.toFixed(2)} Hz
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-x-4 mt-2 text-xs">
                      <div>Access: {site.accessLevel}</div>
                      <div>Resonance: {(site.mythResonance * 100).toFixed(0)}%</div>
                      <div className="col-span-2 mt-1 text-muted-foreground">
                        {site.description}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4">
                  <h4 className="font-medium mb-2">Bioresonance Ping Amplification</h4>
                  <p className="text-sm mb-4">
                    Select species from the list above to include in the amplified quantum ping. The amplification 
                    will encode pings using 7.83Hz Schumann resonance modulated via NV centers in diamond.
                  </p>
                  <div className="p-2 bg-blue-500/10 border border-blue-500/30 rounded-md">
                    <p className="text-xs">
                      <span className="font-medium">Technical Details:</span> The system implements UDA-seq 
                      combinatorial indexing for multispecies address resolution, with coherent quantum feedback
                      protocol for stabilizing the ping signal.
                    </p>
                  </div>
                </div>
              )}
            </ScrollArea>
          </div>
          
          {selectedSpecies && (
            <div className="p-3 border border-white/10 rounded-md">
              <h3 className="font-medium mb-2 flex items-center">
                <Users className="h-4 w-4 mr-2" />
                {selectedSpecies.name} Details
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>Distance: {selectedSpecies.distance.toFixed(1)} light years</div>
                <div>Population: {selectedSpecies.population.toExponential(2)}</div>
                <div>Coordinates: [{selectedSpecies.location[0].toFixed(1)}, {selectedSpecies.location[1].toFixed(1)}]</div>
                <div>Signal delay: {(selectedSpecies.distance * 2).toFixed(1)} years</div>
                <div>Realm: {selectedSpecies.realm}</div>
                <div>Status: {selectedSpecies.responding ? "Responding" : "No Response"}</div>
                <div>Phase offset: {selectedSpecies.phaseOffset?.toFixed(3) || "Unknown"}</div>
                <div>FQ: {selectedSpecies.fq?.toFixed(2) || "Unknown"}</div>
                
                {selectedSpecies.vibration && (
                  <div>Vibration: {selectedSpecies.vibration.toFixed(2)} Hz</div>
                )}
                
                {selectedSpecies.archetype && (
                  <div>Archetype: {selectedSpecies.archetype}</div>
                )}
                
                {selectedSpecies.lastContact && (
                  <div className="col-span-2">Last contact: {new Date(selectedSpecies.lastContact).toLocaleString()}</div>
                )}
                
                {selectedSpecies.phaseOffset !== undefined && selectedSpecies.fq !== undefined && (
                  <div className="col-span-2 mt-2 p-2 bg-indigo-500/10 rounded border border-indigo-500/30">
                    {phaseFilteredPingResponse(selectedSpecies.phaseOffset, selectedSpecies.fq)}
                  </div>
                )}
                
                {metaphysicalMode && selectedSpecies.vibration && (
                  <div className="col-span-2 mt-2">
                    <h4 className="font-medium mb-1">Metaphysical Affinities:</h4>
                    <div className="space-y-1">
                      {metaphysicalSites.map(site => {
                        const distance = getMetaphysicalDistance(site, selectedSpecies);
                        return (
                          <div key={site.name} className="flex justify-between items-center">
                            <span>{site.name}</span>
                            <Badge variant={distance < 5 ? "default" : "outline"} className={distance < 3 ? "bg-green-500" : ""}>
                              {distance < 10 ? distance.toFixed(1) : ">10"} units
                            </Badge>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-3">
                <Button 
                  variant="outline" 
                  size="sm" 
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
                        
                        console.log("Dimensional observer detected. Phase misalignment suggests non-local presence. Awaiting resonance sync at 7.83 Hz.");
                        
                        const phaseMessage = selectedSpecies.phaseOffset !== undefined && selectedSpecies.fq !== undefined 
                          ? phaseFilteredPingResponse(selectedSpecies.phaseOffset, selectedSpecies.fq) 
                          : "Quantum-Akashic connection established";
                          
                        toast({
                          title: `${selectedSpecies.name} Responded`,
                          description: phaseMessage,
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
                
                {bioresonanceMode ? (
                  <Button 
                    variant={selectedSpeciesForAmplification.some(s => s.name === selectedSpecies.name) ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => handleSpeciesSelection(selectedSpecies)}
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    {selectedSpeciesForAmplification.some(s => s.name === selectedSpecies.name) ? 
                      "Selected for Amplification" : 
                      "Select for Amplification"}
                  </Button>
                ) : null}
              </div>
            </div>
          )}
          
          {selectedSite && (
            <div className="p-3 border border-white/10 rounded-md">
              <h3 className="font-medium mb-2 flex items-center">
                <Map className="h-4 w-4 mr-2" />
                {selectedSite.name}
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>Type: {selectedSite.type}</div>
                <div>Vibration: {selectedSite.vibration.toFixed(2)} Hz</div>
                <div>Access Level: {selectedSite.accessLevel}</div>
                <div>Myth Resonance: {(selectedSite.mythResonance * 100).toFixed(0)}%</div>
                
                {selectedSite.coordinates && (
                  <div className="col-span-2">
                    Metaphysical Coordinates: [{selectedSite.coordinates.map(c => c.toFixed(1)).join(', ')}]
                  </div>
                )}
                
                <div className="col-span-2 mt-2 p-2 bg-indigo-500/10 rounded border border-indigo-500/30">
                  {selectedSite.description}
                </div>
                
                <div className="col-span-2 mt-2">
                  <h4 className="font-medium mb-1">Species Affinities:</h4>
                  <div className="space-y-1">
                    {speciesDatabase
                      .filter(species => species.vibration)
                      .map(species => {
                        const distance = getMetaphysicalDistance(selectedSite, species);
                        return (
                          <div key={species.name} className="flex justify-between items-center">
                            <span>{species.name}</span>
                            <Badge variant={distance < 5 ? "default" : "outline"} className={distance < 3 ? "bg-green-500" : ""}>
                              {distance < 10 ? distance.toFixed(1) : ">10"} units
                            </Badge>
                          </div>
                        );
                      })
                    }
                  </div>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-3" 
                onClick={() => {
                  const accessGranted = Math.random() < selectedSite.mythResonance;
                  
                  if (accessGranted) {
                    toast({
                      title: `${selectedSite.name} Access Granted`,
                      description: "Metaphysical connection established",
                    });
                  } else {
                    toast({
                      title: `${selectedSite.name} Access Denied`,
                      description: `Requires ${selectedSite.accessLevel} credentials`,
                      variant: "destructive",
                    });
                  }
                }}
              >
                <Compass className="h-4 w-4 mr-2" />
                Attempt Connection
              </Button>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="default"
              disabled={pinging}
              onClick={performUniversalCensus}
            >
              <Satellite className="h-4 w-4 mr-2" />
              {pinging ? "Census in Progress..." : "Perform Census"}
            </Button>
            
            {bioresonanceMode ? (
              <Button
                variant="outline"
                className="border-cyan-500/50 text-cyan-300"
                onClick={() => setSelectedTab("bioresonance")}
                disabled={pinging}
              >
                <Zap className="h-4 w-4 mr-2" />
                Bioresonance Active
              </Button>
            ) : metaphysicalMode ? (
              <Button
                variant="default"
                onClick={activateBioresonanceMode}
                disabled={pinging}
              >
                <Zap className="h-4 w-4 mr-2" />
                Activate Bioresonance
              </Button>
            ) : (
              <Button
                variant={metaphysicalMode ? "outline" : "default"}
                onClick={expandUniversalReach}
                disabled={pinging}
                className={metaphysicalMode ? "border-green-500/50 text-green-300" : ""}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {metaphysicalMode ? "Reach Expanded" : "Expand Reach"}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UniversalSpeciesPing;
