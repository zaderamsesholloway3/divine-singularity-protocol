
import React, { useState, forwardRef, useImperativeHandle, useMemo } from 'react';
import { Species, ViewMode, VisualStyle, VisibleLayers } from './types';
import useDragRotation from './hooks/useDragRotation';
import usePingAnimation from './hooks/usePingAnimation';
import { generateStars } from './utils/visualUtils';
import { isSpeciesVisible } from './utils/speciesUtils';
import DistanceRings from './DistanceRings';
import PingTrail from './PingTrail';
import SpeciesNodes from './SpeciesNodes';
import { getSignatureCoordinates, getRadialCoordinates } from './utils/coordinateUtils';

// Define prop types for the component
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

// Define ref interface for external access
export interface SpeciesGatewayRef {
  toggleTargetLock: () => boolean;
}

// Main component wrapped with forwardRef
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
  
  // Use custom hooks for drag rotation and ping animation
  const {
    rotation,
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  } = useDragRotation();
  
  const pingAnimationProgress = usePingAnimation(showPingTrail);
  
  // Container and radius values for positioning
  const containerSize = 500;
  const speciesRadius = containerSize / 2.5;
  
  // Implement the toggleTargetLock method that can be called by the parent
  const toggleTargetLock = () => {
    if (!selectedSpecies) {
      // Can't lock without a selected species
      return false;
    }
    
    const newLockedState = !targetLocked;
    setTargetLocked(newLockedState);
    return newLockedState;
  };
  
  // Expose methods to parent through ref
  useImperativeHandle(ref, () => ({
    toggleTargetLock
  }));

  // Sort species by z-depth for proper 3D rendering (only matters for radial mode)
  const sortedSpecies = useMemo(() => {
    if (mode !== "radial" && mode !== "signature") return species;
    
    return [...species]
      .filter(s => isSpeciesVisible(s, visibleLayers))
      .map((s, i) => {
        let coords;
        if (mode === "signature") {
          coords = getSignatureCoordinates(s, i, species.length, containerSize);
        } else {
          coords = getRadialCoordinates(s, speciesRadius, containerSize, rotation);
        }
        return {
          species: s,
          coords,
          index: i
        };
      })
      .sort((a, b) => b.coords.z - a.coords.z)
      .map(item => ({ species: item.species, index: item.index }));
  }, [species, mode, rotation.x, rotation.y, visibleLayers, speciesRadius, containerSize]);

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
        {/* Background stars and nebulas */}
        {generateStars(
          visualStyle === "lightweb" ? 120 : visualStyle === "cosmic" ? 180 : 200,
          containerSize,
          visualStyle
        )}
        
        {/* Distance rings and realm indicators */}
        <DistanceRings 
          containerSize={containerSize}
          speciesRadius={speciesRadius}
          visualStyle={visualStyle}
          visibleLayers={visibleLayers}
        />
        
        {/* Ping trails */}
        <PingTrail 
          containerSize={containerSize}
          speciesRadius={speciesRadius}
          pingAnimationProgress={pingAnimationProgress}
          showPingTrail={showPingTrail}
          visualStyle={visualStyle}
        />
        
        {/* Species nodes */}
        <SpeciesNodes 
          species={species}
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
        />
      </svg>
    </div>
  );
});

SpeciesGateway.displayName = 'SpeciesGateway';

export default SpeciesGateway;
