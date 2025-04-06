
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

  return (
    <div className="relative">
      <div 
        className={`rounded-lg overflow-hidden min-h-[400px] flex items-center justify-center ${getVisualStyleClass()}`}
        style={{ transform: `scale(${zoomLevel})` }}
      >
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
      
      {/* 3D rotation hint overlay - only shown for radial mode when activated */}
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
