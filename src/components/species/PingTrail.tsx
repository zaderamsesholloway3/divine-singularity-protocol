
import React from 'react';
import { VisualStyle } from './types';

interface PingTrailProps {
  containerSize: number;
  speciesRadius: number;
  pingAnimationProgress: number;
  showPingTrail: boolean;
  visualStyle: VisualStyle;
}

const PingTrail: React.FC<PingTrailProps> = ({ 
  containerSize, 
  speciesRadius, 
  pingAnimationProgress, 
  showPingTrail, 
  visualStyle 
}) => {
  if (!showPingTrail) return null;
  
  const center = containerSize / 2;
  const maxRadius = speciesRadius * pingAnimationProgress;
  
  const pingColor = visualStyle === "cosmic" ? "rgba(168, 85, 247, " : 
                   visualStyle === "lightweb" ? "rgba(255, 255, 255, " :
                   "rgba(56, 189, 248, ";
  
  // Create multiple rings with varying opacity
  const ringsCount = 3;
  const rings = [];
  
  for (let i = 0; i < ringsCount; i++) {
    const adjustedProgress = Math.max(0, pingAnimationProgress - (i * 0.05));
    const radius = speciesRadius * adjustedProgress * 0.9;
    const opacity = Math.max(0, 0.2 - (pingAnimationProgress * 0.2));
    
    rings.push(
      <circle
        key={`ping-trail-${i}`}
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke={`${pingColor}${opacity})`}
        strokeWidth={1.5 - (i * 0.4)}
      />
    );
  }
  
  return <>{rings}</>;
};

export default PingTrail;
