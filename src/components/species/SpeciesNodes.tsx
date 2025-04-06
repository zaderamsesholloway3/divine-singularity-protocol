
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
  return (
    <>
      {species
        .filter(s => isSpeciesVisible(s, visibleLayers))
        .map((s, i) => {
          const { x, y } = getCoordinates(
            s,
            i,
            species.length,
            mode,
            speciesRadius,
            containerSize,
            rotation
          );
          const isSelected = selectedSpecies?.name === s.name;
          const isHovered = hoveredSpecies?.name === s.name;
          const speciesColor = getSpeciesColor(s, visualStyle);
          const shouldShowName = showAllNames || isSelected || isHovered;
          const nodeSize = isSelected ? 8 : isHovered ? 7 : 6;
          
          return (
            <g 
              key={s.name}
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
              {shouldShowName && (
                <text
                  y={nodeSize + 8}
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
