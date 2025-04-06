
import React from 'react';
import { VisualStyle, VisibleLayers } from './types';
import { getRingStroke, getRingFill } from './utils/visualUtils';

interface DistanceRingsProps {
  containerSize: number;
  speciesRadius: number;
  visualStyle: VisualStyle;
  visibleLayers: VisibleLayers;
}

const DistanceRings: React.FC<DistanceRingsProps> = ({ 
  containerSize, 
  speciesRadius, 
  visualStyle,
  visibleLayers 
}) => {
  const center = containerSize / 2;
  
  // Add realm rings with labels - enhanced for clarity
  const realms = [
    { name: "Existence", distance: speciesRadius * 0.5, visible: visibleLayers.existence },
    { name: "Non-Existence", distance: speciesRadius * 0.8, visible: visibleLayers.nonExistence },
    { name: "New Existence", distance: speciesRadius, visible: visibleLayers.newExistence }
  ];
  
  // Add logarithmic distance indicator rings
  const distanceMarkers = [10, 100, 1000, 10000, 100000];
  const logMaxDistance = Math.log10(1000000); // 1 million light years
  
  return (
    <>
      {/* Realm circles */}
      {realms.map((realm, i) => {
        if (!realm.visible) return null;
        
        return (
          <React.Fragment key={`realm-${i}`}>
            {/* Filled realm area */}
            <circle
              cx={center}
              cy={center}
              r={realm.distance}
              fill={getRingFill(realm.name, visualStyle)}
              stroke={getRingStroke(realm.name, visualStyle)}
              strokeWidth={0.8}
              strokeDasharray={visualStyle === "lightweb" ? "3 3" : "2 4"}
            />
            
            {/* Realm label */}
            {(() => {
              const labelAngle = -Math.PI / 4 + (i * Math.PI / 6); // Position with better spacing
              const labelX = center + Math.cos(labelAngle) * realm.distance;
              const labelY = center + Math.sin(labelAngle) * realm.distance;
              
              return (
                <text
                  x={labelX}
                  y={labelY}
                  fontSize="10"
                  fontWeight={visualStyle === "lightweb" ? "bold" : "normal"}
                  textAnchor="middle"
                  fill={visualStyle === "cosmic" ? "rgba(216, 180, 254, 0.8)" : 
                        visualStyle === "lightweb" ? "rgba(255, 255, 255, 0.9)" :
                        "rgba(255, 255, 255, 0.8)"}
                  style={{ 
                    filter: visualStyle === "lightweb" ? "drop-shadow(0 0 1px rgba(255,255,255,0.5))" : "",
                    textShadow: "0 0 5px rgba(0,0,0,0.8)"
                  }}
                >
                  {realm.name}
                </text>
              );
            })()}
          </React.Fragment>
        );
      })}
      
      {/* Distance markers */}
      {distanceMarkers.map((distance, i) => {
        const logDistance = Math.log10(distance);
        const scaledDistance = (logDistance / logMaxDistance) * speciesRadius;
        
        return (
          <React.Fragment key={`distance-marker-${i}`}>
            <circle
              cx={center}
              cy={center}
              r={scaledDistance}
              fill="none"
              stroke={
                visualStyle === "cosmic" ? "rgba(168, 85, 247, 0.15)" : 
                visualStyle === "lightweb" ? "rgba(255, 255, 255, 0.15)" : 
                "rgba(255, 255, 255, 0.1)"
              }
              strokeWidth={0.5}
              strokeDasharray={visualStyle === "lightweb" ? "2 2" : "1 3"}
            />
            
            <text
              x={center + 5}
              y={center - scaledDistance - 3}
              fontSize="8"
              textAnchor="start"
              fill={
                visualStyle === "cosmic" ? "rgba(216, 180, 254, 0.6)" : 
                visualStyle === "lightweb" ? "rgba(255, 255, 255, 0.6)" : 
                "rgba(255, 255, 255, 0.4)"
              }
              style={{ textShadow: "0 0 2px rgba(0,0,0,0.9)" }}
            >
              {distance < 1000 ? `${distance} ly` : `${(distance/1000).toFixed(0)}k ly`}
            </text>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default DistanceRings;
