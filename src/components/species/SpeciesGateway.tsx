
import React, { useState, forwardRef, useImperativeHandle, useMemo } from 'react';
import { Species, ViewMode, VisualStyle, VisibleLayers } from './types';
import useDragRotation from './hooks/useDragRotation';
import usePingAnimation from './hooks/usePingAnimation';
import { isSpeciesVisible } from './utils/speciesUtils';
import DistanceRings from './DistanceRings';
import PingTrail from './PingTrail';
import SpeciesNodes from './SpeciesNodes';
import { getCoordinates } from './utils/coordinateUtils';

interface SpeciesGatewayProps {
  species: Species[];
  onSelectSpecies: (species: Species) => void;
  selectedSpecies: Species | null;
  mode?: ViewMode;
  visualStyle?: VisualStyle;
  showPingTrail?: boolean;
  pingOrigin?: Species | null;
  visibleLayers?: VisibleLayers;
  showAllNames?: boolean;
  zoomLevel?: number;
}

export interface SpeciesGatewayRef {
  toggleTargetLock: () => boolean;
  getRotation?: () => { x: number; y: number; z: number };
}

export const SpeciesGateway = forwardRef<SpeciesGatewayRef, SpeciesGatewayProps>((props, ref) => {
  const { 
    species, 
    onSelectSpecies, 
    selectedSpecies, 
    mode = "radial", 
    visualStyle = "celestial", 
    showPingTrail = false,
    pingOrigin = null,
    visibleLayers = { existence: true, nonExistence: true, newExistence: true, divine: true },
    showAllNames = false,
    zoomLevel = 1.0
  } = props;
  
  const [targetLocked, setTargetLocked] = useState(false);
  const [hoveredSpecies, setHoveredSpecies] = useState<Species | null>(null);
  
  const {
    rotation,
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  } = useDragRotation({ x: 15, y: 0 });
  
  const pingAnimationProgress = usePingAnimation(showPingTrail);
  
  const containerSize = 500;
  const speciesRadius = containerSize / 2.5;
  
  const toggleTargetLock = () => {
    if (!selectedSpecies) {
      return false;
    }
    
    const newLockedState = !targetLocked;
    setTargetLocked(newLockedState);
    return newLockedState;
  };
  
  const getRotation = () => {
    return { ...rotation, z: 0 };
  };
  
  useImperativeHandle(ref, () => ({
    toggleTargetLock,
    getRotation
  }));

  // Debugging logs to identify issues with species data
  console.log("SpeciesGateway received species count:", species?.length || 0);
  
  if (!species || species.length === 0) {
    console.warn("No species data provided to SpeciesGateway or empty array");
  }

  // Continue with the component rendering
  return (
    <div 
      className="relative w-full h-full flex justify-center"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      <svg 
        width={containerSize} 
        height={containerSize} 
        style={{ 
          filter: visualStyle === "cosmic" ? "brightness(1.1) contrast(1.2)" :
                 visualStyle === "lightweb" ? "brightness(1.15) contrast(1.05)" :
                 "brightness(1.05) contrast(1.1)",
          boxShadow: visualStyle === "cosmic" ? "0 0 30px rgba(130, 0, 255, 0.1)" :
                    visualStyle === "lightweb" ? "0 0 30px rgba(255, 255, 255, 0.1)" :
                    "0 0 20px rgba(180, 180, 255, 0.2)"
        }}
        className={visualStyle === "lightweb" ? "bg-gradient-to-b from-gray-900/60 to-blue-900/40" : ""}
      >
        <DistanceRings 
          containerSize={containerSize}
          speciesRadius={speciesRadius}
          visualStyle={visualStyle}
          visibleLayers={visibleLayers}
        />
        
        <PingTrail 
          containerSize={containerSize}
          speciesRadius={speciesRadius}
          pingAnimationProgress={pingAnimationProgress}
          showPingTrail={showPingTrail}
          visualStyle={visualStyle}
        />
        
        <SpeciesNodes 
          species={species || []}
          selectedSpecies={selectedSpecies}
          hoveredSpecies={hoveredSpecies}
          setHoveredSpecies={setHoveredSpecies}
          onSelectSpecies={onSelectSpecies}
          mode={mode}
          speciesRadius={speciesRadius}
          containerSize={containerSize}
          rotation={rotation}
          visualStyle={visualStyle}
          visibleLayers={visibleLayers}
          showAllNames={showAllNames}
        />
      </svg>
    </div>
  );
});

SpeciesGateway.displayName = 'SpeciesGateway';

export default SpeciesGateway;
