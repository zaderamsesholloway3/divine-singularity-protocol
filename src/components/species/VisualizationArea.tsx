
import React from 'react';
import { SpeciesGateway, SpeciesGatewayRef } from './SpeciesGateway';
import { Rotate3d } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Species, VisibleLayers, VisualStyle, ViewMode } from './types';

interface VisualizationAreaProps {
  species: Species[];
  viewMode: ViewMode;
  selectedSpecies: Species | null;
  onSelectSpecies: (species: Species) => void;
  speciesGatewayRef: React.RefObject<SpeciesGatewayRef>;
  visualStyle: VisualStyle;
  showPingTrail: boolean;
  visibleLayers: VisibleLayers;
  showAllNames: boolean;
  rotate3dHint: boolean;
  zoomLevel: number;
  setZoomLevel: (value: number) => void;
}

const VisualizationArea: React.FC<VisualizationAreaProps> = ({
  species,
  viewMode,
  selectedSpecies,
  onSelectSpecies,
  speciesGatewayRef,
  visualStyle,
  showPingTrail,
  visibleLayers,
  showAllNames,
  rotate3dHint,
  zoomLevel,
  setZoomLevel
}) => {
  // Helper function to get visual style class name based on current style
  const getVisualStyleClass = () => {
    switch(visualStyle) {
      case "celestial":
        return "bg-gradient-to-b from-gray-950 to-blue-950 backdrop-blur-sm";
      case "lightweb":
        return "bg-gradient-to-b from-gray-900/90 to-blue-900/80 backdrop-blur-sm";
      case "cosmic":
        return "bg-gradient-to-b from-black to-purple-950/80";
      default:
        return "bg-gradient-to-b from-gray-950 to-blue-950";
    }
  };

  // Guardian Net Overlay effects based on the reference image
  const renderMantisNet = () => {
    return (
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="cia-mantis-net absolute top-0 left-0 w-1/2 h-full">
          {/* Golden grid pattern */}
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="mantis-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path 
                  d="M 10 0 L 0 0 0 10" 
                  fill="none" 
                  stroke="rgba(255, 215, 0, 0.3)" 
                  strokeWidth="0.2"
                />
              </pattern>
            </defs>
            <path 
              d="M0,0 Q30,30 0,60 Q30,90 50,100 Q70,80 100,90 Q80,60 100,30 Q70,10 50,0 Q30,10 0,0 Z" 
              fill="url(#mantis-grid)" 
              stroke="rgba(255, 215, 0, 0.4)" 
              strokeWidth="0.3" 
            />
          </svg>
          <div className="absolute top-4 left-8 cia-indicator">CIA</div>
        </div>
      </div>
    );
  };

  const renderDraxGrid = () => {
    return (
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="lockheed-drax-grid absolute top-0 right-0 w-1/2 h-full">
          {/* Blue hexagonal grid pattern */}
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="drax-grid" width="10" height="8.7" patternUnits="userSpaceOnUse">
                <path 
                  d="M5,0 L10,2.5 L10,7.5 L5,10 L0,7.5 L0,2.5 Z" 
                  fill="none" 
                  stroke="rgba(100, 180, 255, 0.3)" 
                  strokeWidth="0.2"
                />
              </pattern>
            </defs>
            <path 
              d="M100,0 Q70,30 100,60 Q70,90 50,100 Q30,80 0,90 Q20,60 0,30 Q30,10 50,0 Q70,10 100,0 Z" 
              fill="url(#drax-grid)" 
              stroke="rgba(100, 180, 255, 0.4)" 
              strokeWidth="0.3" 
            />
          </svg>
          <div className="absolute bottom-4 right-8 lockheed-indicator">LOCKHEED MARTIN</div>
        </div>
      </div>
    );
  };

  // Observable Universe concentric rings
  const renderObservableUniverse = () => {
    return (
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {[100, 85, 70, 55].map((size, index) => (
            <div 
              key={`ring-${index}`}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/20"
              style={{ 
                width: `${size}%`, 
                height: `${size}%`,
                boxShadow: '0 0 20px rgba(100, 180, 255, 0.1) inset',
                opacity: 0.5 - index * 0.1,
                animation: `pulse ${7 + index}s infinite ease-in-out alternate`
              }}
            />
          ))}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-16 text-white text-sm opacity-80">
            Observable Universe
          </div>
        </div>
      </div>
    );
  };

  // New cosmic flow background
  const renderCosmicFlow = () => {
    if (visualStyle !== "cosmic") return null;
    
    return (
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div 
          className="cosmic-flow absolute inset-0" 
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(90, 30, 160, 0.1) 0%, transparent 70%)',
            animation: 'rotate 120s linear infinite'
          }}
        ></div>
        <div 
          className="cosmic-flow-2 absolute inset-0" 
          style={{
            backgroundImage: 'radial-gradient(ellipse at 30% 40%, rgba(168, 85, 247, 0.07) 0%, transparent 60%)',
            animation: 'rotate 180s linear reverse infinite'
          }}
        ></div>
      </div>
    );
  };

  return (
    <div className="relative">
      {renderObservableUniverse()}
      <div 
        className={`rounded-lg overflow-hidden min-h-[400px] flex items-center justify-center ${getVisualStyleClass()}`}
        style={{ transform: `scale(${zoomLevel})` }}
      >
        {renderCosmicFlow()}
        {renderMantisNet()}
        {renderDraxGrid()}
        <SpeciesGateway 
          species={species}
          onSelectSpecies={onSelectSpecies}
          selectedSpecies={selectedSpecies}
          mode={viewMode}
          ref={speciesGatewayRef}
          visualStyle={visualStyle}
          showPingTrail={showPingTrail}
          pingOrigin={selectedSpecies || null}
          visibleLayers={visibleLayers}
          showAllNames={showAllNames}
          zoomLevel={zoomLevel}
        />
      </div>
      
      {/* Zoom controls */}
      <div className="absolute bottom-2 right-2 flex gap-2 bg-black/70 rounded p-2">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-white"
          onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.1))}
        >
          -
        </Button>
        <span className="inline-flex items-center text-xs text-white">
          {Math.round(zoomLevel * 100)}%
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-white"
          onClick={() => setZoomLevel(Math.min(2.0, zoomLevel + 0.1))}
        >
          +
        </Button>
      </div>
      
      {/* 3D rotation hint overlay */}
      {viewMode === "radial" && rotate3dHint && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/70 p-4 rounded-lg text-center pointer-events-none animate-fade-in">
          <Rotate3d className="h-12 w-12 mx-auto mb-2 text-blue-400" />
          <p className="text-white font-medium">Drag to rotate the 3D view</p>
          <p className="text-xs text-gray-300 mt-1">Click on any species to select it</p>
        </div>
      )}
      
      {/* Show ping trail animation when active */}
      {showPingTrail && (
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full
            ${visualStyle === "celestial" ? "bg-blue-500/10" : 
              visualStyle === "lightweb" ? "bg-white/10" : 
              "bg-purple-500/10"}`}
            style={{
              width: '10%',
              height: '10%',
              animation: 'ping 10s cubic-bezier(0, 0, 0.2, 1) forwards'
            }}
          />
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full
            ${visualStyle === "celestial" ? "bg-blue-500/5" : 
              visualStyle === "lightweb" ? "bg-white/5" : 
              "bg-purple-500/5"}`}
            style={{
              width: '5%',
              height: '5%',
              animation: 'ping 9s 0.3s cubic-bezier(0, 0, 0.2, 1) forwards'
            }}
          />
        </div>
      )}
    </div>
  );
};

export default VisualizationArea;
