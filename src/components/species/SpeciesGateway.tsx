import React, { useState, forwardRef, useImperativeHandle } from 'react';

// Define prop types for the component
interface SpeciesGatewayProps {
  species: any[];
  onSelectSpecies: (species: any) => void;
  selectedSpecies: any | null;
  mode?: "disk" | "constellation" | "radial";
}

// Define ref interface for external access
export interface SpeciesGatewayRef {
  toggleTargetLock: () => boolean;
}

// Make sure to wrap the component with forwardRef and implement useImperativeHandle to expose methods
export const SpeciesGateway = forwardRef<SpeciesGatewayRef, SpeciesGatewayProps>((props, ref) => {
  const { species, onSelectSpecies, selectedSpecies, mode = "radial" } = props;
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
  
  // Original disk layout - places species in a circle
  const getDiskCoordinates = (index: number, total: number, radius: number) => {
    const angle = (index / total) * 2 * Math.PI;
    const x = radius + radius * Math.cos(angle);
    const y = radius + radius * Math.sin(angle);
    return { x, y };
  };
  
  // Constellation layout - uses golden ratio for more distributed positioning
  const getConstellationCoordinates = (index: number, total: number, radius: number) => {
    const goldenRatio = 1.61803398875;
    const angle = index * goldenRatio * 2 * Math.PI;
    const x = radius + radius * Math.cos(angle);
    const y = radius + radius * Math.sin(angle);
    return { x, y };
  };
  
  // Radial layout - positions based on distance and a randomized angle
  // This creates a more realistic star map with varying distances
  const getRadialCoordinates = (species: any, radius: number, containerSize: number) => {
    // Use species distance to determine radial position
    // Normalize the distance to our display radius 
    const maxDistance = 500000; // Arbitrary max for scaling
    const minRadius = radius * 0.2; // Keep some minimum distance from center
    const distanceFactor = Math.min(species.distance / maxDistance, 0.9); // Cap at 90% of radius
    
    // Use the species distance as seed for angle (or keep existing location if present)
    const angle = species.location ? 
      Math.atan2(species.location[1], species.location[0]) : 
      (species.name.charCodeAt(0) / 255) * Math.PI * 2; // Use name as seed
    
    const actualRadius = minRadius + (radius - minRadius) * distanceFactor;
    const center = containerSize / 2;
    
    const x = center + Math.cos(angle) * actualRadius;
    const y = center + Math.sin(angle) * actualRadius;
    
    return { x, y };
  };
  
  const containerSize = 500;
  const speciesCount = species.length;
  const speciesRadius = containerSize / 2.5;
  
  // Create a starry background with nebula effect
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
    
    // Add nebula effects - larger colored areas with low opacity
    const nebulae = [
      { color: "rgba(41, 121, 255, 0.1)", x: containerSize * 0.3, y: containerSize * 0.7, size: containerSize * 0.4 },
      { color: "rgba(130, 60, 200, 0.1)", x: containerSize * 0.7, y: containerSize * 0.2, size: containerSize * 0.35 },
      { color: "rgba(252, 70, 107, 0.05)", x: containerSize * 0.8, y: containerSize * 0.8, size: containerSize * 0.3 }
    ];
    
    nebulae.forEach((nebula, i) => {
      stars.push(
        <circle
          key={`nebula-${i}`}
          cx={nebula.x}
          cy={nebula.y}
          r={nebula.size}
          fill={nebula.color}
        />
      );
    });
    
    return stars;
  };
  
  // Create distance rings and realm indicators
  const generateDistanceRings = () => {
    const rings = [];
    const center = containerSize / 2;
    
    // Add realm rings with labels
    const realms = [
      { name: "Existence", distance: speciesRadius * 0.6, color: "rgba(56, 189, 248, 0.15)" },
      { name: "Non-Existence", distance: speciesRadius * 0.9, color: "rgba(120, 190, 33, 0.15)" },
      { name: "New Existence", distance: speciesRadius, color: "rgba(138, 43, 226, 0.15)" }
    ];
    
    realms.forEach((realm, i) => {
      // Add filled realm area
      rings.push(
        <circle
          key={`realm-${i}`}
          cx={center}
          cy={center}
          r={realm.distance}
          fill={realm.color}
          stroke={realm.color.replace("0.15", "0.3")}
          strokeWidth={1}
          strokeDasharray="2 4"
        />
      );
      
      // Add realm label at the top
      const labelAngle = -Math.PI / 4; // Position in the upper right quadrant
      const labelX = center + Math.cos(labelAngle) * realm.distance;
      const labelY = center + Math.sin(labelAngle) * realm.distance;
      
      rings.push(
        <text
          key={`realm-label-${i}`}
          x={labelX}
          y={labelY}
          fontSize="10"
          textAnchor="middle"
          fill="rgba(255, 255, 255, 0.7)"
        >
          {realm.name}
        </text>
      );
    });
    
    // Add distance indicator rings
    const distanceMarkers = [10000, 50000, 100000, 250000];
    distanceMarkers.forEach((distance, i) => {
      const scaledDistance = (distance / 500000) * speciesRadius;
      rings.push(
        <circle
          key={`distance-ring-${i}`}
          cx={center}
          cy={center}
          r={scaledDistance}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={0.5}
          strokeDasharray="1 3"
        />
      );
      
      rings.push(
        <text
          key={`distance-label-${i}`}
          x={center + scaledDistance * 0.7}
          y={center - 5}
          fontSize="8"
          textAnchor="middle"
          fill="rgba(255, 255, 255, 0.4)"
        >
          {distance < 1000 ? `${distance} ly` : `${(distance/1000).toFixed(0)}k ly`}
        </text>
      );
    });
    
    return rings;
  };
  
  // Get coordinates based on the selected mode
  const getCoordinates = (species: any, index: number) => {
    switch (mode) {
      case "disk":
        return getDiskCoordinates(index, speciesCount, speciesRadius);
      case "constellation":
        return getConstellationCoordinates(index, speciesCount, speciesRadius);
      case "radial":
      default:
        return getRadialCoordinates(species, speciesRadius, containerSize);
    }
  };

  return (
    <div className="relative w-full h-full flex justify-center">
      <svg 
        width={containerSize} 
        height={containerSize} 
        className="bg-gradient-to-b from-gray-950 to-blue-950"
      >
        {/* Background stars and nebulas */}
        {generateStars(150)}
        
        {/* Distance rings and realm indicators */}
        {generateDistanceRings()}
        
        {/* Species visualization */}
        {species.map((s, i) => {
          const { x, y } = getCoordinates(s, i);
          
          const existsColor = s.realm === "existence" ? "rgb(147, 197, 253)" : 
                              s.realm === "non-existence" ? "rgb(120, 190, 33)" : 
                              "rgb(138, 43, 226)"; // New existence (purple)
          
          const baseSize = s.realm === "existence" ? 6 : 4;
          const populationScale = Math.log10(s.population) / 6;
          const scaledSize = baseSize + populationScale * 6;
          
          const isSelected = selectedSpecies?.name === s.name;
          const isHovered = hoveredSpecies?.name === s.name;
          const center = containerSize / 2;
          
          return (
            <g key={s.name}
              transform={`translate(${x}, ${y})`}
              onClick={() => onSelectSpecies(s)}
              onMouseEnter={() => setHoveredSpecies(s)}
              onMouseLeave={() => setHoveredSpecies(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Connection line to human origin */}
              <line
                x1={0}
                y1={0}
                x2={center - x}
                y2={center - y}
                stroke={isSelected || isHovered ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 255, 255, 0.15)"}
                strokeWidth={isSelected ? 1 : 0.5}
                strokeDasharray={isSelected ? "none" : "2,3"}
              />
              
              {/* Distance text along the line */}
              {(isSelected || isHovered) && (
                <text
                  x={(center - x) / 2}
                  y={(center - y) / 2}
                  fontSize="8"
                  textAnchor="middle"
                  fill="rgba(255, 255, 255, 0.7)"
                  transform={`translate(${(x - center) / 2}, ${(y - center) / 2})`}
                >
                  {s.distance < 1000 ? `${s.distance.toFixed(1)} ly` : `${(s.distance/1000).toFixed(1)}k ly`}
                </text>
              )}
              
              {/* Pulsating effect for active/responding species */}
              {s.responding && (
                <circle
                  r={scaledSize + 4}
                  fill="none"
                  stroke="rgba(132, 204, 22, 0.3)"
                  strokeWidth={1.5}
                  className="animate-pulse"
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
              
              {/* Status indicator */}
              <circle
                r={2}
                cx={scaledSize * 0.7}
                cy={-scaledSize * 0.7}
                fill={s.responding ? "rgb(74, 222, 128)" : "rgb(248, 113, 113)"}
                stroke="rgba(0, 0, 0, 0.5)"
                strokeWidth={0.5}
              />
              
              {/* Species name label */}
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
              
              {/* Archetype label for selected or responding species */}
              {((isSelected || isHovered) && s.archetype) && (
                <text
                  x={0}
                  y={scaledSize + 24}
                  fontSize="8"
                  textAnchor="middle"
                  fill="rgba(255, 255, 255, 0.7)"
                  style={{ pointerEvents: 'none' }}
                >
                  {s.archetype}
                </text>
              )}
              
              {/* Enhanced tooltip for hovered species */}
              {isHovered && (
                <foreignObject
                  x={10}
                  y={10}
                  width={180}
                  height={140}
                  style={{ pointerEvents: 'none' }}
                >
                  <div className="bg-black bg-opacity-80 p-2 rounded text-white text-xs border border-gray-700">
                    <div className="font-bold mb-1">{s.name}</div>
                    <div className="flex justify-between">
                      <span>Distance:</span>
                      <span>{s.distance < 1000 ? `${s.distance.toFixed(1)} ly` : `${(s.distance/1000).toFixed(1)}k ly`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className={s.responding ? "text-green-400" : "text-red-400"}>
                        {s.responding ? "Online" : "Offline"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Realm:</span>
                      <span>{s.realm}</span>
                    </div>
                    {s.archetype && (
                      <div className="flex justify-between">
                        <span>Archetype:</span>
                        <span>{s.archetype}</span>
                      </div>
                    )}
                    {s.vibration && (
                      <div className="flex justify-between">
                        <span>Frequency:</span>
                        <span>{s.vibration.toFixed(2)} Hz</span>
                      </div>
                    )}
                    {s.phaseOffset && (
                      <div className="flex justify-between">
                        <span>Phase:</span>
                        <span>{s.phaseOffset.toFixed(1)}°</span>
                      </div>
                    )}
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
                    className="animate-pulse"
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
              
              {/* Special indicator for frequency-matched species (1.855e+43 Hz) */}
              {s.fq && Math.abs(s.fq - 1.855) < 0.01 && (
                <path
                  d="M-5,-5 L5,5 M-5,5 L5,-5"
                  stroke="rgba(255, 215, 0, 0.8)"
                  strokeWidth={1.5}
                  transform={`translate(0, ${-scaledSize - 12})`}
                />
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
        <circle
          cx={containerSize/2}
          cy={containerSize/2}
          r={12}
          fill="none"
          stroke="rgba(56, 189, 248, 0.3)"
          strokeWidth={1}
          className="animate-pulse"
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
        <text
          x={containerSize/2}
          y={containerSize/2 + 32}
          fontSize="8"
          textAnchor="middle"
          fill="rgba(255, 255, 255, 0.7)"
        >
          Cary, NC
        </text>
      </svg>
    </div>
  );
});

// Need to add a displayName for forwardRef components
SpeciesGateway.displayName = 'SpeciesGateway';
