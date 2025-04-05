import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

// Make sure to wrap the component with forwardRef and implement useImperativeHandle to expose methods
export const SpeciesGateway = forwardRef((props, ref) => {
  const { species, onSelectSpecies, selectedSpecies, mode = "disk" } = props;
  const [targetLocked, setTargetLocked] = useState(false);
  
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
  
  return (
    <div className="relative w-full h-full">
      <svg width={containerSize} height={containerSize}>
        {species.map((s, i) => {
          const { x, y } = mode === "disk"
            ? getCoordinates(i, speciesCount, speciesRadius)
            : getConstellationCoordinates(i, speciesCount, speciesRadius);
          
          const existsColor = s.realm === "existence" ? "rgb(147 197 253)" : "rgb(255 205 210)";
          const baseSize = s.realm === "existence" ? 6 : 4;
          const populationScale = Math.log10(s.population) / 6;
          const scaledSize = baseSize + populationScale * 6;
          
          return (
            <g key={s.name}
              transform={`translate(${x}, ${y})`}
              onClick={() => onSelectSpecies(s)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                r={scaledSize}
                fill={existsColor}
                opacity={selectedSpecies?.name === s.name ? 1 : 0.6}
                stroke={selectedSpecies?.name === s.name ? 'white' : 'none'}
                strokeWidth={selectedSpecies?.name === s.name ? 2 : 0}
              />
              {selectedSpecies?.name === s.name && (
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
            </g>
          );
        })}
      </svg>
    </div>
  );
});

// Need to add a displayName for forwardRef components
SpeciesGateway.displayName = 'SpeciesGateway';
