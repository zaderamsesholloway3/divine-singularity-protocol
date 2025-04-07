
import React, { useEffect } from 'react';
import { Species, VisualStyle } from './types';
import { getCoordinates } from './utils/coordinateUtils';
import { getSpeciesColor, isSpeciesVisible } from './utils/speciesUtils';

interface SpeciesNodesProps {
  species: Species[];
  selectedSpecies: Species | null;
  hoveredSpecies: Species | null;
  setHoveredSpecies: (species: Species | null) => void;
  onSelectSpecies: (species: Species) => void;
  mode: string;
  speciesRadius: number;
  containerSize: number;
  rotation: { x: number, y: number };
  visualStyle: VisualStyle;
  visibleLayers: {
    existence: boolean;
    nonExistence: boolean;
    newExistence: boolean;
    divine: boolean;
  };
  showAllNames?: boolean;
}

const SpeciesNodes: React.FC<SpeciesNodesProps> = ({
  species,
  selectedSpecies,
  hoveredSpecies,
  setHoveredSpecies,
  onSelectSpecies,
  mode,
  speciesRadius,
  containerSize,
  rotation,
  visualStyle,
  visibleLayers,
  showAllNames = false
}) => {
  useEffect(() => {
    console.log("SpeciesNodes rendering with species count:", species.length);
  }, [species]);
  
  // Origin point location (center of the container)
  const originX = containerSize / 2;
  const originY = containerSize / 2;

  // Filter visible species based on layers
  const visibleSpecies = species.filter(s => 
    (s.realm === "Existence" && visibleLayers.existence) ||
    (s.realm === "Non-Existence" && visibleLayers.nonExistence) ||
    (s.realm === "New Existence" && visibleLayers.newExistence) ||
    (s.realm === "Divine" && visibleLayers.divine)
  );
  
  console.log("Visible species count:", visibleSpecies.length);
  
  return (
    <>
      {/* Central Origin Point - Cary, NC */}
      <g className="origin-point" transform={`translate(${originX}, ${originY})`}>
        <circle
          r={4}
          fill="white"
          opacity={0.8}
          filter={visualStyle === "cosmic" ? "drop-shadow(0 0 2px rgba(255,255,255,0.7))" : ""}
        />
        <text
          y={16}
          fontSize="8"
          textAnchor="middle"
          fill="white"
          opacity={0.9}
          style={{ 
            filter: visualStyle === "lightweb" ? "drop-shadow(0 0 1px rgba(255,255,255,0.5))" : "",
            textShadow: "0 0 2px rgba(0,0,0,0.9)"
          }}
        >
          Cary, NC 27511
        </text>
      </g>

      {/* Connection Lines from Origin to Species */}
      {visibleSpecies.map((s, i) => {
        const { x, y } = getCoordinates(
          s,
          i,
          visibleSpecies.length,
          mode,
          speciesRadius,
          containerSize,
          rotation
        );
        
        const speciesColor = getSpeciesColor(s, visualStyle);
        const isSelected = selectedSpecies?.id === s.id;
        
        return (
          <line 
            key={`connection-${s.id}`}
            x1={originX}
            y1={originY}
            x2={x}
            y2={y}
            stroke={speciesColor}
            strokeWidth={isSelected ? 0.7 : 0.4}
            strokeOpacity={isSelected ? 0.8 : 0.5}
          />
        );
      })}

      {/* Individual Species Nodes */}
      {visibleSpecies.map((s, i) => {
        const { x, y, z } = getCoordinates(
          s,
          i,
          visibleSpecies.length,
          mode,
          speciesRadius,
          containerSize,
          rotation
        );
        
        const isSelected = selectedSpecies?.id === s.id;
        const isHovered = hoveredSpecies?.id === s.id;
        const speciesColor = getSpeciesColor(s, visualStyle);
        const shouldShowName = showAllNames || isSelected || isHovered;
        const nodeSize = isSelected ? 8 : isHovered ? 7 : 6;
        
        return (
          <g 
            key={s.id}
            transform={`translate(${x}, ${y})`}
            onClick={() => onSelectSpecies(s)}
            onMouseEnter={() => setHoveredSpecies(s)}
            onMouseLeave={() => setHoveredSpecies(null)}
            style={{ cursor: 'pointer' }}
          >
            <circle
              r={nodeSize}
              fill={speciesColor}
              stroke={isSelected ? 'white' : isHovered ? 'rgba(255,255,255,0.7)' : 'none'}
              strokeWidth={isSelected ? 2 : isHovered ? 1 : 0}
              filter={visualStyle === "cosmic" ? "drop-shadow(0 0 2px rgba(100,100,255,0.7))" : ""}
            />
            
            {/* Pulse indicator for responding species */}
            {s.responding && (
              <>
                <circle
                  r={nodeSize + 2}
                  fill="none"
                  stroke={speciesColor}
                  strokeWidth={1}
                  opacity={0.6}
                  style={{
                    animation: 'pulse 1.5s cubic-bezier(0,0,0.2,1) infinite'
                  }}
                />
                <circle
                  r={nodeSize + 4}
                  fill="none"
                  stroke={speciesColor}
                  strokeWidth={0.5}
                  opacity={0.4}
                  style={{
                    animation: 'pulse 2s cubic-bezier(0,0,0.2,1) 0.3s infinite'
                  }}
                />
              </>
            )}
            
            {shouldShowName && (
              <text
                y={nodeSize + 10}
                fontSize="8"
                textAnchor="middle"
                fill="white"
                style={{ 
                  filter: visualStyle === "lightweb" ? "drop-shadow(0 0 1px rgba(255,255,255,0.5))" : "",
                  textShadow: "0 0 2px rgba(0,0,0,0.9)"
                }}
              >
                {s.name}
              </text>
            )}
          </g>
        );
      })}
    </>
  );
};

export default SpeciesNodes;
