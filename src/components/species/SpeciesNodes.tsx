
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
  rotation: { x: number, y: number, z: number };
  visualStyle: VisualStyle;
  visibleLayers: {
    existence: boolean;
    nonExistence: boolean;
    newExistence: boolean;
    divine: boolean;
  };
  showAllNames?: boolean;
  zoomLevel?: number;
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
  showAllNames = false,
  zoomLevel = 1.0
}) => {
  useEffect(() => {
    console.log("SpeciesNodes rendering with species count:", species.length);
    console.log("Current zoom level in SpeciesNodes:", zoomLevel);
  }, [species, zoomLevel]);
  
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
  
  // Only show species at certain zoom levels
  const zoomedSpecies = visibleSpecies.filter(s => {
    if (zoomLevel >= 1.5) {
      // Only show very close species when zoomed in (showing solar system)
      return s.distance < 50; // Increased this value to show more nearby species
    }
    if (zoomLevel >= 1.0) {
      // Show nearby species when at normal zoom
      return s.distance < 10000;
    }
    // Show all species when zoomed out
    return true;
  });
  
  console.log("Visible species count:", zoomedSpecies.length);
  
  // Calculate node size based on zoom level
  const getNodeSize = (isSelected: boolean, isHovered: boolean) => {
    const baseSize = isSelected ? 8 : isHovered ? 7 : 6;
    
    // Increase size when zoomed out, decrease when zoomed in
    if (zoomLevel < 1.0) {
      return baseSize * (1 / zoomLevel) * 0.8; // Enlarge when zoomed out
    }
    return baseSize * Math.max(0.7, 1 / zoomLevel); // Shrink when zoomed in
  };
  
  // Determine if we should show the origin marker
  const showOriginMarker = zoomLevel < 1.8;
  
  return (
    <>
      {/* Central Origin Point - Solar System */}
      {showOriginMarker && (
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
            {zoomLevel < 1.0 ? "Milky Way Galaxy" : "Solar System"}
          </text>
        </g>
      )}

      {/* Connection Lines from Origin to Species */}
      {zoomedSpecies.map((s, i) => {
        const { x, y } = getCoordinates(
          s,
          i,
          zoomedSpecies.length,
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
      {zoomedSpecies.map((s, i) => {
        const { x, y, z } = getCoordinates(
          s,
          i,
          zoomedSpecies.length,
          mode,
          speciesRadius,
          containerSize,
          rotation
        );
        
        const isSelected = selectedSpecies?.id === s.id;
        const isHovered = hoveredSpecies?.id === s.id;
        const speciesColor = getSpeciesColor(s, visualStyle);
        const shouldShowName = showAllNames || isSelected || isHovered;
        const nodeSize = getNodeSize(isSelected, isHovered);
        
        return (
          <g 
            key={s.id}
            transform={`translate(${x}, ${y})`}
            onClick={() => onSelectSpecies(s)}
            onMouseEnter={() => setHoveredSpecies(s)}
            onMouseLeave={() => setHoveredSpecies(null)}
            style={{ cursor: 'pointer' }}
            className="species-marker"
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
                fontSize={Math.max(7, 8 / zoomLevel)}
                textAnchor="middle"
                fill="white"
                style={{ 
                  filter: visualStyle === "lightweb" ? "drop-shadow(0 0 1px rgba(255,255,255,0.5))" : "",
                  textShadow: "0 0 2px rgba(0,0,0,0.9)",
                  pointerEvents: "none"
                }}
              >
                {s.name}
              </text>
            )}
          </g>
        );
      })}

      {/* Milky Way Indicator (shown when zoomed out) */}
      {zoomLevel < 0.8 && (
        <g className="milky-way-indicator" transform={`translate(${originX}, ${originY})`}>
          <ellipse 
            rx={200 * (1/zoomLevel) * 0.3}
            ry={70 * (1/zoomLevel) * 0.3}
            fill="rgba(255,255,255,0.05)"
            stroke="rgba(120,180,255,0.15)"
            strokeWidth={1}
            transform={`rotate(${45 + rotation.x * 0.2}, 0, 0)`}
          />
          <ellipse 
            rx={180 * (1/zoomLevel) * 0.3}
            ry={60 * (1/zoomLevel) * 0.3}
            fill="none"
            stroke="rgba(180,220,255,0.1)"
            strokeWidth={0.5}
            strokeDasharray="2,3"
            transform={`rotate(${45 + rotation.x * 0.2}, 0, 0)`}
          />
        </g>
      )}
    </>
  );
};

export default SpeciesNodes;
