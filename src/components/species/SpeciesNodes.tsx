
import React from 'react';
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
  console.log("SpeciesNodes rendering with species count:", species?.length || 0);
  console.log("Visible species count:", species?.filter(s => isSpeciesVisible(s, visibleLayers))?.length || 0);
  
  return (
    <>
      {/* Central Origin Point */}
      <g
        className="origin-point"
        transform={`translate(${containerSize/2}, ${containerSize/2})`}
      >
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
          Earth
        </text>
      </g>

      {/* Individual Species Nodes */}
      {species && species.length > 0 && species
        .filter(s => isSpeciesVisible(s, visibleLayers))
        .map((s, i) => {
          const { x, y, z } = getCoordinates(
            s,
            i,
            species.length,
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
              {/* Ping indicator for responding species */}
              {s.responding && (
                <circle
                  r={nodeSize + 2}
                  fill="none"
                  stroke={speciesColor}
                  strokeWidth={1}
                  opacity={0.6}
                  style={{
                    animation: 'ping 1.5s cubic-bezier(0,0,0.2,1) infinite'
                  }}
                />
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
