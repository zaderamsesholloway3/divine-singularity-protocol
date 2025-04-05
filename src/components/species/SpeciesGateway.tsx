
import React, { useState, forwardRef, useImperativeHandle } from 'react';

// Define prop types for the component
interface SpeciesGatewayProps {
  species: any[];
  onSelectSpecies: (species: any) => void;
  selectedSpecies: any | null;
  mode?: "disk" | "constellation";
}

// Define ref interface for external access
export interface SpeciesGatewayRef {
  toggleTargetLock: () => boolean;
}

// Make sure to wrap the component with forwardRef and implement useImperativeHandle to expose methods
export const SpeciesGateway = forwardRef<SpeciesGatewayRef, SpeciesGatewayProps>((props, ref) => {
  const { species, onSelectSpecies, selectedSpecies, mode = "disk" } = props;
  const [targetLocked, setTargetLocked] = useState(false);
  const [hoveredSpecies, setHoveredSpecies] = useState<any | null>(null);
  
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
  
  const getCoordinates = (index: number, total: number, radius: number) => {
    const angle = (index / total) * 2 * Math.PI;
    const x = radius + radius * Math.cos(angle);
    const y = radius + radius * Math.sin(angle);
    return { x, y };
  };
  
  const getConstellationCoordinates = (index: number, total: number, radius: number) => {
    const goldenRatio = 1.61803398875;
    const angle = index * goldenRatio * 2 * Math.PI;
    const x = radius + radius * Math.cos(angle);
    const y = radius + radius * Math.sin(angle);
    return { x, y };
  };
  
  const containerSize = 500;
  const speciesCount = species.length;
  const speciesRadius = containerSize / 2.5;
  
  // Create a starry background
  const generateStars = (count: number) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      const x = Math.random() * containerSize;
      const y = Math.random() * containerSize;
      const size = Math.random() * 1.5 + 0.5;
      const opacity = Math.random() * 0.8 + 0.2;
      
      stars.push(
        <circle
          key={`star-${i}`}
          cx={x}
          cy={y}
          r={size}
          fill="white"
          opacity={opacity}
        />
      );
    }
    return stars;
  };
  
  // Create distance rings
  const generateDistanceRings = () => {
    const rings = [];
    const center = containerSize / 2;
    
    // Add an outer boundary ring (like in the image)
    rings.push(
      <circle
        key="boundary-ring"
        cx={center}
        cy={center}
        r={speciesRadius}
        fill="none"
        stroke="rgba(180, 160, 255, 0.3)" // Purple-ish color as in image
        strokeWidth={1}
        strokeDasharray="2 4"
      />
    );
    
    // Add a title for the disk
    if (mode === "disk") {
      rings.push(
        <text
          key="disk-title"
          x={center}
          y={center - speciesRadius - 10}
          fontSize="14"
          textAnchor="middle"
          fill="rgba(255, 255, 255, 0.8)"
        >
          {selectedSpecies ? `${selectedSpecies.name} Selected` : "Non-Existence"}
        </text>
      );
    }
    
    return rings;
  };

  return (
    <div className="relative w-full h-full flex justify-center">
      <svg 
        width={containerSize} 
        height={containerSize} 
        className="bg-gradient-to-b from-gray-950 to-blue-950"
      >
        {/* Background stars */}
        {generateStars(150)}
        
        {/* Distance rings */}
        {generateDistanceRings()}
        
        {/* Species visualization */}
        {species.map((s, i) => {
          const { x, y } = mode === "disk"
            ? getCoordinates(i, speciesCount, speciesRadius)
            : getConstellationCoordinates(i, speciesCount, speciesRadius);
          
          const existsColor = s.realm === "existence" ? "rgb(147, 197, 253)" : "rgb(253, 205, 210)";
          const baseSize = s.realm === "existence" ? 6 : 4;
          const populationScale = Math.log10(s.population) / 6;
          const scaledSize = baseSize + populationScale * 6;
          
          const isSelected = selectedSpecies?.name === s.name;
          const isHovered = hoveredSpecies?.name === s.name;
          
          return (
            <g key={s.name}
              transform={`translate(${x}, ${y})`}
              onClick={() => onSelectSpecies(s)}
              onMouseEnter={() => setHoveredSpecies(s)}
              onMouseLeave={() => setHoveredSpecies(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Connection line to selected species */}
              {isSelected && (
                <line
                  x1={0}
                  y1={0}
                  x2={containerSize/2 - x}
                  y2={containerSize/2 - y}
                  stroke="rgba(255, 255, 255, 0.5)"
                  strokeWidth={1}
                />
              )}
              
              {/* Species circle */}
              <circle
                r={scaledSize}
                fill={s.responding ? "rgb(132, 204, 22)" : existsColor}
                opacity={isSelected || isHovered ? 1 : 0.7}
                stroke={isSelected ? 'white' : (isHovered ? 'rgba(255, 255, 255, 0.5)' : 'none')}
                strokeWidth={isSelected ? 2 : (isHovered ? 1 : 0)}
              />
              
              {/* Species name label for selected or hovered */}
              {(isSelected || isHovered) && (
                <text
                  x={0}
                  y={scaledSize + 12}
                  fontSize="10"
                  textAnchor="middle"
                  fill="white"
                  style={{ pointerEvents: 'none' }}
                >
                  {s.name}
                </text>
              )}
              
              {/* Tooltip for hovered species */}
              {isHovered && (
                <foreignObject
                  x={10}
                  y={10}
                  width={180}
                  height={120}
                  style={{ pointerEvents: 'none' }}
                >
                  <div className="bg-black bg-opacity-80 p-2 rounded text-white text-xs border border-gray-700">
                    <div className="font-bold mb-1">{s.name}</div>
                    <div>Distance: {s.distance.toFixed(1)} ly</div>
                    <div>Status: {s.responding ? "Online" : "Offline"}</div>
                    <div>Realm: {s.realm}</div>
                    {s.archetype && <div>Archetype: {s.archetype}</div>}
                  </div>
                </foreignObject>
              )}
              
              {/* Target lock indicator */}
              {isSelected && targetLocked && (
                <g>
                  <circle
                    r={scaledSize + 6}
                    fill="none"
                    stroke="rgba(255, 100, 100, 0.7)"
                    strokeWidth={1.5}
                    strokeDasharray="3 3"
                  />
                  <text
                    x={0}
                    y={-scaledSize - 8}
                    fontSize="9"
                    textAnchor="middle"
                    fill="rgba(255, 100, 100, 0.9)"
                    style={{ pointerEvents: 'none' }}
                  >
                    TARGET LOCKED
                  </text>
                </g>
              )}
            </g>
          );
        })}
        
        {/* Center point (Earth/Human) */}
        <circle
          cx={containerSize/2}
          cy={containerSize/2}
          r={8}
          fill="rgba(56, 189, 248, 0.8)"
          stroke="white"
          strokeWidth={1}
        />
        <text
          x={containerSize/2}
          y={containerSize/2 + 20}
          fontSize="10"
          textAnchor="middle"
          fill="white"
        >
          Human Origin
        </text>
      </svg>
    </div>
  );
});

// Need to add a displayName for forwardRef components
SpeciesGateway.displayName = 'SpeciesGateway';
