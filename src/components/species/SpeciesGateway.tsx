import React, { useState, forwardRef, useImperativeHandle, useMemo } from 'react';

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
  
  // Enhanced radial layout based on Lyra's code - positions based on distance and accurate angles
  const getRadialCoordinates = (species: any, radius: number, containerSize: number) => {
    // Center point of the container
    const center = containerSize / 2;
    
    // Use species location (ra/dec) for angle if available, otherwise use deterministic value from name or distance
    const getAngle = () => {
      if (species.location) {
        return Math.atan2(species.location[1], species.location[0]);
      }
      
      // Use a hash of the name for a consistent angle
      let nameHash = 0;
      for (let i = 0; i < species.name.length; i++) {
        nameHash = ((nameHash << 5) - nameHash) + species.name.charCodeAt(i);
        nameHash |= 0; // Convert to 32bit integer
      }
      
      // Map the hash to an angle between 0 and 2π
      return (Math.abs(nameHash) % 360) * (Math.PI / 180);
    };
    
    // Calculate angle in radians
    const angle = getAngle();
    
    // Use logarithmic scale for better visualization of distances
    const maxDistance = 1000000; // 1 million light years as max visual distance
    const minRadius = radius * 0.1; // Keep some minimum distance from center
    
    // Log scaling to handle very large distances while keeping visualization manageable
    const logMaxDistance = Math.log10(maxDistance + 1);
    const logDistance = Math.log10(species.distance + 1);
    const distanceFactor = Math.min(logDistance / logMaxDistance, 0.9); // Cap at 90% of radius
    
    const actualRadius = minRadius + (radius - minRadius) * distanceFactor;
    
    // Calculate x,y position based on angle and scaled distance
    const x = center + Math.cos(angle) * actualRadius;
    const y = center + Math.sin(angle) * actualRadius;
    
    return { x, y };
  };
  
  const containerSize = 500;
  const speciesRadius = containerSize / 2.5;
  
  // Create a starry background with nebula effect - enhanced with Lyra's style
  const generateStars = (count: number) => {
    const stars = [];
    
    // Generate smaller distant stars
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
      
      // Add occasional star glow for brighter stars
      if (Math.random() > 0.85) {
        stars.push(
          <circle
            key={`star-glow-${i}`}
            cx={x}
            cy={y}
            r={size * 3}
            fill="rgba(255, 255, 255, 0.3)"
            opacity={0.5}
          />
        );
      }
    }
    
    // Add nebula effects with colors matching the realm colors
    const nebulae = [
      { color: "rgba(56, 189, 248, 0.1)", x: containerSize * 0.3, y: containerSize * 0.7, size: containerSize * 0.4 }, // Existence (blue)
      { color: "rgba(132, 204, 22, 0.1)", x: containerSize * 0.7, y: containerSize * 0.2, size: containerSize * 0.35 }, // Non-Existence (green)
      { color: "rgba(138, 43, 226, 0.05)", x: containerSize * 0.8, y: containerSize * 0.8, size: containerSize * 0.3 }  // New-Existence (purple)
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
    
    // Add realm rings with labels - enhanced from Lyra's concept
    const realms = [
      { name: "Existence", distance: speciesRadius * 0.5, color: "rgba(56, 189, 248, 0.15)" },       // Blue
      { name: "Non-Existence", distance: speciesRadius * 0.8, color: "rgba(132, 204, 22, 0.15)" },   // Green
      { name: "New Existence", distance: speciesRadius, color: "rgba(138, 43, 226, 0.15)" }          // Purple
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
      const labelAngle = -Math.PI / 4 + (i * Math.PI / 6); // Position with better spacing
      const labelX = center + Math.cos(labelAngle) * realm.distance;
      const labelY = center + Math.sin(labelAngle) * realm.distance;
      
      rings.push(
        <text
          key={`realm-label-${i}`}
          x={labelX}
          y={labelY}
          fontSize="10"
          textAnchor="middle"
          fill="rgba(255, 255, 255, 0.8)"
        >
          {realm.name}
        </text>
      );
    });
    
    // Add logarithmic distance indicator rings - like Lyra's design
    const distanceMarkers = [10, 100, 1000, 10000, 100000];
    const logMaxDistance = Math.log10(1000000); // 1 million light years
    
    distanceMarkers.forEach((distance, i) => {
      const logDistance = Math.log10(distance);
      const scaledDistance = (logDistance / logMaxDistance) * speciesRadius;
      
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
          x={center + 5}
          y={center - scaledDistance - 3}
          fontSize="8"
          textAnchor="start"
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

  // Determine special frequency entities (like Lyra at 1.855e43 Hz)
  const isDivineFrequency = (species: any) => {
    return species.fq && Math.abs(species.fq - 1.855) < 0.01;
  };

  // Get color based on species characteristics
  const getSpeciesColor = (species: any) => {
    if (isDivineFrequency(species)) {
      return species.responding ? "rgb(217, 70, 239)" : "rgb(168, 85, 247)"; // Magenta for divine frequency
    }
    
    if (species.responding) {
      return "rgb(132, 204, 22)"; // Green for responding
    }
    
    // Colors based on realm
    if (species.realm === "existence") {
      return "rgb(56, 189, 248)"; // Blue for existence realm
    } else if (species.realm === "non-existence") {
      return "rgb(132, 204, 22)"; // Green for non-existence
    } else {
      return "rgb(138, 43, 226)"; // Purple for new-existence
    }
  };

  const speciesCount = species.length;

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
          
          // Determine species appearance
          const speciesColor = getSpeciesColor(s);
          const isSpecial = isDivineFrequency(s);
          
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
                stroke={isSelected || isHovered ? "rgba(255, 255, 255, 0.6)" : "rgba(136, 136, 255, 0.25)"}
                strokeWidth={isSelected ? 1.5 : 0.8}
                strokeDasharray={isSelected ? "none" : "2,3"}
              />
              
              {/* Distance text along the line */}
              {(isSelected || isHovered) && (
                <text
                  x={(center - x) / 2}
                  y={(center - y) / 2}
                  fontSize="9"
                  textAnchor="middle"
                  fill="rgba(255, 255, 255, 0.8)"
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
                  stroke={isSpecial ? "rgba(217, 70, 239, 0.3)" : "rgba(132, 204, 22, 0.3)"}
                  strokeWidth={1.5}
                  className="animate-pulse"
                />
              )}
              
              {/* Species circle */}
              <circle
                r={scaledSize}
                fill={speciesColor}
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
              
              {/* Special indicator for divine frequency-matched species (1.855e+43 Hz) */}
              {isSpecial && (
                <g>
                  <path
                    d="M-5,-5 L5,5 M-5,5 L5,-5"
                    stroke="rgba(255, 215, 0, 0.9)"
                    strokeWidth={1.5}
                    transform={`translate(0, ${-scaledSize - 10})`}
                  />
                  <circle
                    r={scaledSize + 2}
                    fill="none"
                    stroke="rgba(217, 70, 239, 0.4)"
                    strokeWidth={1}
                    strokeDasharray="1 1"
                    className="animate-pulse"
                  />
                </g>
              )}
              
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
              
              {/* Realm label for selected or hovered species */}
              {(isSelected || isHovered) && (
                <text
                  x={0}
                  y={scaledSize + 24}
                  fontSize="8"
                  textAnchor="middle"
                  fill="rgba(255, 255, 255, 0.7)"
                  style={{ pointerEvents: 'none' }}
                >
                  {s.realm}
                </text>
              )}
              
              {/* Archetype label for selected or responding species */}
              {((isSelected || isHovered) && s.archetype) && (
                <text
                  x={0}
                  y={scaledSize + 36}
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
                  height={160}
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
                    {isDivineFrequency(s) && (
                      <div className="flex justify-between text-purple-300">
                        <span>Divine Frequency:</span>
                        <span>1.855e+43 Hz</span>
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
            </g>
          );
        })}
        
        {/* Center point - Human Origin / Cary, NC */}
        <g>
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
        </g>
        
        {/* Add legend for special entities */}
        <g transform={`translate(10, ${containerSize - 60})`}>
          <rect
            x={0}
            y={0}
            width={180}
            height={50}
            fill="rgba(0, 0, 0, 0.6)"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth={1}
            rx={4}
          />
          
          {/* Divine frequency legend item */}
          <g transform="translate(10, 15)">
            <circle cx={5} cy={0} r={5} fill="rgba(217, 70, 239, 0.8)" />
            <path d="M3,-3 L7,1 M3,1 L7,-3" stroke="rgba(255, 215, 0, 0.9)" strokeWidth={1} />
            <text x={15} y={3} fontSize="8" fill="rgba(255, 255, 255, 0.9)">
              Divine Frequency (1.855e+43 Hz)
            </text>
          </g>
          
          {/* Online status legend item */}
          <g transform="translate(10, 35)">
            <circle cx={5} cy={0} r={5} fill="rgba(132, 204, 22, 0.8)" />
            <text x={15} y={3} fontSize="8" fill="rgba(255, 255, 255, 0.9)">
              Responding Entity
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
});

// Need to add a displayName for forwardRef components
SpeciesGateway.displayName = 'SpeciesGateway';
