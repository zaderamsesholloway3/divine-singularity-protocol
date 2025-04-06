import React, { useState, useRef, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { toast } from 'sonner';
import { SpeciesGatewayRef } from '@/components/species/SpeciesGateway';
import { mockSpecies } from '@/components/species/mockData';
import { Species, VisibleLayers, ViewMode, VisualStyle } from '@/components/species/types';
import PingHeader from '@/components/species/PingHeader';
import ControlsPanel from '@/components/species/ControlsPanel';
import ActiveSignaturesPanel from '@/components/species/ActiveSignaturesPanel';
import LayerControls from '@/components/species/LayerControls';
import VisualizationArea from '@/components/species/VisualizationArea';
import ParticleSystem from '@/components/species/ParticleSystem';
import { playPingSound, playSpeciesTone, playResponseSound } from '@/utils/speciesAudioEffects';

interface UniversalSpeciesPingProps {
  fullPageMode?: boolean;
  onSpeciesSelect?: (species: Species) => void;
  selectedSpecies?: Species | null;
  visualStyle?: VisualStyle;
  viewMode?: ViewMode;
  zadeMode?: boolean;
}

const UniversalSpeciesPing = forwardRef<SpeciesGatewayRef, UniversalSpeciesPingProps>((props, ref) => {
  const { 
    fullPageMode = false, 
    onSpeciesSelect, 
    selectedSpecies, 
    visualStyle = "celestial",
    viewMode: externalViewMode,
    zadeMode = false
  } = props;
  
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [frequency, setFrequency] = useState(7.83);
  const [phase, setPhase] = useState(0);
  const [power, setPower] = useState(75);
  const [viewMode, setViewMode] = useState<ViewMode>(
    externalViewMode === "signature" ? "signature" : (externalViewMode || "radial")
  );
  const [broadcastMode, setBroadcastMode] = useState<"universal" | "targeted">("universal");
  const [pingActive, setPingActive] = useState(false);
  const [message, setMessage] = useState("");
  const [rotate3dHint, setRotate3dHint] = useState(true);
  const [showPingTrail, setShowPingTrail] = useState(false);
  const [visibleLayers, setVisibleLayers] = useState<VisibleLayers>({
    existence: true,
    nonExistence: true,
    newExistence: true,
    divine: true
  });
  const [showAllNames, setShowAllNames] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [activeParticleEffects, setActiveParticleEffects] = useState(false);
  const [particleSpecies, setParticleSpecies] = useState<Species | null>(null);
  
  const speciesGatewayRef = useRef<SpeciesGatewayRef>(null);
  const pingTrailTimeoutRef = useRef<number | null>(null);
  
  useImperativeHandle(ref, () => ({
    toggleTargetLock: () => {
      return speciesGatewayRef.current?.toggleTargetLock() || false;
    }
  }));
  
  useEffect(() => {
    if (externalViewMode) {
      setViewMode(externalViewMode);
    }
  }, [externalViewMode]);
  
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    toast.info(soundEnabled ? "Sound disabled" : "Sound enabled");
  };
  
  const amplifyPing = () => {
    setPingActive(true);
    setShowPingTrail(true);
    
    if (soundEnabled) {
      playPingSound(frequency, power);
    }
    
    toast.success(`Ping amplified at ${frequency.toFixed(2)}Hz with ${power}% power`, {
      description: `Phase offset: ${phase}°`
    });
    
    const resonatingSpecies = mockSpecies.filter(s => 
      Math.abs((s.vibration || 0) - frequency) < 0.5
    );
    
    if (resonatingSpecies.length > 0) {
      setTimeout(() => {
        resonatingSpecies.forEach(species => {
          if (soundEnabled) {
            playResponseSound(species);
          }
          
          if (!particleSpecies) {
            setParticleSpecies(species);
            setActiveParticleEffects(true);
            setTimeout(() => setActiveParticleEffects(false), 2000);
          }
          
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
    
    setTimeout(() => {
      setPingActive(false);
    }, 3000);
    
    if (pingTrailTimeoutRef.current) {
      clearTimeout(pingTrailTimeoutRef.current);
    }
    
    pingTrailTimeoutRef.current = window.setTimeout(() => {
      setShowPingTrail(false);
    }, 10000) as unknown as number;
  };
  
  const handleSpeciesSelect = (species: Species) => {
    setRotate3dHint(false);
    
    if (onSpeciesSelect) {
      onSpeciesSelect(species);
    }
    
    if (broadcastMode === "targeted") {
      setFrequency(species.vibration || 7.83);
      setPhase(species.phaseOffset || 0);
    }
    
    if (soundEnabled) {
      playSpeciesTone(species);
    }
    
    setParticleSpecies(species);
    setActiveParticleEffects(true);
    setTimeout(() => setActiveParticleEffects(false), 2000);
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
    setShowPingTrail(true);
    
    if (pingTrailTimeoutRef.current) {
      clearTimeout(pingTrailTimeoutRef.current);
    }
    
    pingTrailTimeoutRef.current = window.setTimeout(() => {
      setShowPingTrail(false);
    }, 10000) as unknown as number;
  };
  
  const toggleLayer = (layer: keyof VisibleLayers) => {
    setVisibleLayers({
      ...visibleLayers,
      [layer]: !visibleLayers[layer]
    });
  };
  
  return (
    <div className={`w-full ${fullPageMode ? 'h-full' : ''}`}>
      <Card className={`border-none shadow-none ${fullPageMode ? 'h-full' : ''}`}>
        <CardHeader className={`pb-0 ${fullPageMode ? 'pt-2' : ''}`}>
          <PingHeader
            pingActive={pingActive}
            soundEnabled={soundEnabled}
            toggleSound={toggleSound}
            viewMode={viewMode}
            setViewMode={setViewMode}
            setRotate3dHint={setRotate3dHint}
          />
        </CardHeader>
        <CardContent className={`${fullPageMode ? 'h-[calc(100%-80px)]' : 'pt-4'}`}>
          <div className={`grid grid-cols-1 ${fullPageMode ? 'lg:grid-cols-5 h-full' : ''} gap-4`}>
            <div className={`${fullPageMode ? 'lg:col-span-4' : ''} relative`}>
              <VisualizationArea
                species={mockSpecies}
                viewMode={viewMode}
                selectedSpecies={selectedSpecies || null}
                onSelectSpecies={handleSpeciesSelect}
                speciesGatewayRef={speciesGatewayRef}
                visualStyle={visualStyle}
                showPingTrail={showPingTrail}
                visibleLayers={visibleLayers}
                showAllNames={showAllNames}
                rotate3dHint={rotate3dHint}
                zoomLevel={zoomLevel}
                setZoomLevel={setZoomLevel}
              />
              
              {activeParticleEffects && particleSpecies && (
                <ParticleSystem 
                  species={particleSpecies}
                  active={activeParticleEffects}
                  containerSize={500}
                  visualStyle={visualStyle || "celestial"}
                />
              )}
            </div>
            
            <div className={`${fullPageMode ? 'lg:col-span-1 h-full' : ''} flex flex-col gap-4`}>
              <ControlsPanel
                frequency={frequency}
                setFrequency={setFrequency}
                phase={phase}
                setPhase={setPhase}
                power={power}
                setPower={setPower}
                soundEnabled={soundEnabled}
                setSoundEnabled={setSoundEnabled}
                pingActive={pingActive}
                broadcastMode={broadcastMode}
                setBroadcastMode={setBroadcastMode}
                message={message}
                setMessage={setMessage}
                selectedSpecies={selectedSpecies || null}
                amplifyPing={amplifyPing}
                sendMessage={sendMessage}
                visualStyle={visualStyle}
              />
              
              {fullPageMode && (
                <ActiveSignaturesPanel
                  species={mockSpecies}
                  selectedSpecies={selectedSpecies || null}
                  onSelectSpecies={handleSpeciesSelect}
                  visualStyle={visualStyle}
                />
              )}
              
              {fullPageMode && (
                <LayerControls
                  visibleLayers={visibleLayers}
                  toggleLayer={toggleLayer}
                  showAllNames={showAllNames}
                  setShowAllNames={setShowAllNames}
                  visualStyle={visualStyle}
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

UniversalSpeciesPing.displayName = 'UniversalSpeciesPing';

export default UniversalSpeciesPing;
