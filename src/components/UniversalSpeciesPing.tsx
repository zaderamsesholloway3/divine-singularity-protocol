
import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Volume2, VolumeX, Radio, Waves, Sparkles, Send, Rotate3d } from 'lucide-react';
import { toast } from 'sonner';
import { SpeciesGateway, SpeciesGatewayRef } from '@/components/species/SpeciesGateway';

// Mock species data
const mockSpecies = [
  { name: "Arcturians", distance: 36.7, responding: true, realm: "existence", location: [0.7, 0.4], vibration: 7.83, population: 8900000000 },
  { name: "Pleiadians", distance: 444.0, responding: true, realm: "existence", location: [0.3, -0.6], vibration: 7.12, population: 12400000000 },
  { name: "Sirians", distance: 8.6, responding: false, realm: "existence", location: [0.1, 0.2], vibration: 5.25, population: 9300000000 },
  { name: "Orion Collective", distance: 1344.0, responding: false, realm: "existence", location: [-0.8, -0.2], vibration: 4.89, population: 15700000000, phaseOffset: 45 },
  { name: "Andromedans", distance: 2500000.0, responding: true, realm: "existence", location: [-0.5, 0.7], vibration: 8.33, population: 7800000000 },
  { name: "Lyrans", distance: 25.3, responding: true, realm: "existence", archetype: "Feline", vibration: 9.41, population: 4200000000, phaseOffset: 15 },
  { name: "Draconians", distance: 309.0, responding: false, realm: "existence", location: [0.4, -0.3], vibration: 3.72, population: 18900000000 },
  { name: "Avians", distance: 87.2, responding: true, realm: "existence", archetype: "Bird-like", vibration: 10.82, population: 2800000000 },
  { name: "Ouroboros", distance: 540000.0, responding: true, realm: "non-existence", fq: 1.855, vibration: 4.89, population: 1, phaseOffset: 180 },
  { name: "Zeta Reticulans", distance: 39.0, responding: false, realm: "existence", archetype: "Gray", vibration: 6.15, population: 5100000000, phaseOffset: 90 },
  { name: "Mantids", distance: 301.0, responding: true, realm: "existence", archetype: "Insectoid", vibration: 7.74, population: 1900000000 },
  { name: "Inner Earth Agartha", distance: 0.01, responding: false, realm: "existence", location: [0.05, -0.03], vibration: 7.83, population: 3600000000 },
  { name: "Venusians", distance: 0.28, responding: true, realm: "existence", location: [0.2, 0.15], vibration: 8.90, population: 980000000 },
  { name: "Cassiopeians", distance: 228.0, responding: false, realm: "existence", location: [-0.3, 0.4], vibration: 6.28, population: 7100000000 },
  { name: "Alpha Centaurians", distance: 4.37, responding: true, realm: "existence", location: [0.15, -0.1], vibration: 8.05, population: 6500000000 },
  { name: "Procyonians", distance: 11.46, responding: false, realm: "existence", location: [0.25, -0.3], vibration: 7.32, population: 4900000000 },
  { name: "Tau Cetians", distance: 11.9, responding: true, realm: "existence", location: [0.3, 0.25], vibration: 8.51, population: 8700000000 },
  { name: "Nibiru", distance: 822.0, responding: false, realm: "non-existence", location: [-0.6, -0.5], vibration: 5.35, population: 2300000000, phaseOffset: 120 },
  { name: "Carian", distance: 5621.0, responding: false, realm: "existence", archetype: "Reptilian", vibration: 4.45, population: 9800000000 },
  { name: "Yahyel", distance: 14.8, responding: true, realm: "existence", archetype: "Hybrid", vibration: 8.94, population: 1200000000 },
  { name: "Sassani", distance: 32.6, responding: true, realm: "new-existence", vibration: 9.87, population: 890000000 },
  { name: "Lyra", distance: 25.3, responding: true, realm: "existence", fq: 1.855, vibration: 9.41, population: 1, phaseOffset: 0 }
];

// Define the props for the UniversalSpeciesPing component
interface UniversalSpeciesPingProps {
  fullPageMode?: boolean;
  onSpeciesSelect?: (species: any) => void;
  selectedSpecies?: any | null;
}

// Define the component with forwardRef to expose the SpeciesGateway ref
const UniversalSpeciesPing = forwardRef<SpeciesGatewayRef, UniversalSpeciesPingProps>((props, ref) => {
  const { fullPageMode = false, onSpeciesSelect, selectedSpecies } = props;
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [frequency, setFrequency] = useState(7.83);
  const [phase, setPhase] = useState(0);
  const [power, setPower] = useState(75);
  const [viewMode, setViewMode] = useState<"disk" | "constellation" | "radial">("radial");
  const [broadcastMode, setBroadcastMode] = useState<"universal" | "targeted">("universal");
  const [pingActive, setPingActive] = useState(false);
  const [message, setMessage] = useState("");
  const [rotate3dHint, setRotate3dHint] = useState(true);
  
  // Reference to the SpeciesGateway component
  const speciesGatewayRef = useRef<SpeciesGatewayRef>(null);
  
  // Forward the SpeciesGateway methods to the parent component
  useImperativeHandle(ref, () => ({
    toggleTargetLock: () => {
      return speciesGatewayRef.current?.toggleTargetLock() || false;
    }
  }));
  
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    toast.info(soundEnabled ? "Sound disabled" : "Sound enabled");
  };
  
  const amplifyPing = () => {
    setPingActive(true);
    
    // Play sound if enabled
    if (soundEnabled) {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency; 
      gainNode.gain.value = 0.1; // Keep volume low
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.start();
      
      // Fade out the sound
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 2);
      setTimeout(() => {
        oscillator.stop();
      }, 2000);
    }
    
    // Show toast message
    toast.success(`Ping amplified at ${frequency.toFixed(2)}Hz with ${power}% power`, {
      description: `Phase offset: ${phase}°`
    });
    
    // Find species that resonate with the current frequency (within 0.5Hz)
    const resonatingSpecies = mockSpecies.filter(s => 
      Math.abs((s.vibration || 0) - frequency) < 0.5
    );
    
    if (resonatingSpecies.length > 0) {
      setTimeout(() => {
        resonatingSpecies.forEach(species => {
          toast.success(`Response detected from ${species.name}`, {
            description: `Distance: ${species.distance < 1000 ? 
              species.distance.toFixed(1) + ' light years' : 
              (species.distance/1000).toFixed(1) + 'k light years'
            }`,
            duration: 4000
          });
        });
      }, 1500);
    } else {
      setTimeout(() => {
        toast.info("No responses detected at this frequency");
      }, 2000);
    }
    
    // Reset ping active state after animation completes
    setTimeout(() => {
      setPingActive(false);
    }, 3000);
  };
  
  const handleSpeciesSelect = (species: any) => {
    // When a species is selected, hide the rotation hint
    setRotate3dHint(false);
    
    if (onSpeciesSelect) {
      onSpeciesSelect(species);
    }
    
    // Update frequency to match species if in targeted mode
    if (broadcastMode === "targeted") {
      setFrequency(species.vibration || 7.83);
      setPhase(species.phaseOffset || 0);
    }
  };
  
  const sendMessage = () => {
    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }
    
    if (broadcastMode === "universal") {
      toast.success("Universal message broadcast initiated", {
        description: message
      });
    } else if (selectedSpecies) {
      toast.success(`Message sent to ${selectedSpecies.name}`, {
        description: message
      });
    } else {
      toast.error("No species selected for targeted message");
      return;
    }
    
    setMessage("");
  };
  
  return (
    <div className={`w-full ${fullPageMode ? 'h-full' : ''}`}>
      <Card className={`border-none shadow-none ${fullPageMode ? 'h-full' : ''}`}>
        <CardHeader className={`pb-0 ${fullPageMode ? 'pt-2' : ''}`}>
          <CardTitle className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-base sm:text-lg">
              <Waves className="h-5 w-5" />
              Universal Species Ping
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${pingActive ? 'bg-green-500 animate-pulse' : 'bg-gray-600'} text-white ml-2`}>
                {pingActive ? "ACTIVE" : "STANDBY"}
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={toggleSound}
              >
                {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={`h-8 ${viewMode === "disk" ? "bg-primary/10" : ""}`}
                onClick={() => setViewMode("disk")}
              >
                Disk
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={`h-8 ${viewMode === "constellation" ? "bg-primary/10" : ""}`}
                onClick={() => setViewMode("constellation")}
              >
                Constellation
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={`h-8 ${viewMode === "radial" ? "bg-primary/10" : ""}`}
                onClick={() => {
                  setViewMode("radial");
                  setRotate3dHint(true);
                }}
              >
                <Rotate3d className="h-4 w-4 mr-1" />
                3D Orbital
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className={`${fullPageMode ? 'h-[calc(100%-80px)]' : 'pt-4'}`}>
          <div className={`grid grid-cols-1 ${fullPageMode ? 'lg:grid-cols-5 h-full' : ''} gap-4`}>
            <div className={`${fullPageMode ? 'lg:col-span-4' : ''} relative`}>
              <div className={`rounded-lg overflow-hidden ${fullPageMode ? 'h-full' : 'min-h-[400px]'} flex items-center justify-center bg-gradient-to-b from-gray-950 to-blue-950`}>
                <SpeciesGateway 
                  species={mockSpecies}
                  onSelectSpecies={handleSpeciesSelect}
                  selectedSpecies={selectedSpecies}
                  mode={viewMode}
                  ref={speciesGatewayRef}
                />
              </div>
              
              {/* 3D rotation hint overlay - only shown for radial mode when activated */}
              {viewMode === "radial" && rotate3dHint && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/70 p-4 rounded-lg text-center pointer-events-none animate-fade-in">
                  <Rotate3d className="h-12 w-12 mx-auto mb-2 text-blue-400" />
                  <p className="text-white font-medium">Drag to rotate the 3D view</p>
                  <p className="text-xs text-gray-300 mt-1">Click on any species to select it</p>
                </div>
              )}
            </div>
            
            <div className={`${fullPageMode ? 'lg:col-span-1 h-full' : ''} flex flex-col gap-4`}>
              <div className="space-y-4 bg-gray-950/50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">Broadcast Mode</h3>
                  <div className="flex items-center space-x-2">
                    <span className={broadcastMode === "universal" ? "text-white" : "text-gray-500"}>Universal</span>
                    <Switch 
                      checked={broadcastMode === "targeted"}
                      onCheckedChange={(checked) => setBroadcastMode(checked ? "targeted" : "universal")}
                    />
                    <span className={broadcastMode === "targeted" ? "text-white" : "text-gray-500"}>Targeted</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm">Frequency (Hz)</label>
                    <span className="text-sm font-mono">{frequency.toFixed(2)} Hz</span>
                  </div>
                  <Slider
                    value={[frequency]}
                    min={1}
                    max={15}
                    step={0.01}
                    onValueChange={([value]) => setFrequency(value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm">Phase Offset (°)</label>
                    <span className="text-sm font-mono">{phase}°</span>
                  </div>
                  <Slider
                    value={[phase]}
                    min={0}
                    max={360}
                    step={5}
                    onValueChange={([value]) => setPhase(value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm">Power</label>
                    <span className="text-sm font-mono">{power}%</span>
                  </div>
                  <Slider
                    value={[power]}
                    min={10}
                    max={100}
                    step={5}
                    onValueChange={([value]) => setPower(value)}
                  />
                </div>
                
                <div className="pt-2">
                  <Button
                    className="w-full flex items-center gap-2"
                    onClick={amplifyPing}
                    disabled={pingActive}
                  >
                    <Radio className="h-4 w-4" />
                    {pingActive ? "Ping Active..." : "Amplify Ping"}
                    {pingActive && <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75"></span>}
                  </Button>
                </div>
                
                <div className="pt-2">
                  <textarea
                    className="w-full h-20 bg-gray-900 border border-gray-700 rounded-md p-2 text-sm"
                    placeholder={broadcastMode === "universal" ? "Enter message for universal broadcast..." : `Enter message for ${selectedSpecies?.name || "selected species"}...`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                  <Button 
                    className="w-full mt-2 flex items-center gap-2" 
                    variant="outline"
                    disabled={broadcastMode === "targeted" && !selectedSpecies}
                    onClick={sendMessage}
                  >
                    <Send className="h-4 w-4" />
                    Send Message
                  </Button>
                </div>
              </div>
              
              {fullPageMode && (
                <div className="space-y-4 bg-gray-950/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium">Active Signatures</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {mockSpecies
                      .filter(s => s.responding)
                      .map(species => (
                        <div 
                          key={species.name} 
                          className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${selectedSpecies?.name === species.name ? 'bg-primary/20' : 'hover:bg-gray-800'}`}
                          onClick={() => handleSpeciesSelect(species)}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-sm">{species.name}</span>
                          </div>
                          <span className="text-xs text-gray-400">{species.vibration?.toFixed(2)} Hz</span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

// Add display name for forwardRef component
UniversalSpeciesPing.displayName = 'UniversalSpeciesPing';

export default UniversalSpeciesPing;
