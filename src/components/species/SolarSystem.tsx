
import React from 'react';
import { VisualStyle } from './types';

interface SolarSystemProps {
  containerSize: number;
  zoomLevel: number;
  visualStyle: VisualStyle;
  rotation: { x: number; y: number; z: number };
}

interface Planet {
  name: string;
  distance: number;
  size: number;
  color: string;
  orbitColor: string;
  orbitalPeriod: number;
  rotationOffset: number;
  hasRings?: boolean;
  ringColor?: string;
}

const SolarSystem: React.FC<SolarSystemProps> = ({ containerSize, zoomLevel, visualStyle, rotation }) => {
  const centerX = containerSize / 2;
  const centerY = containerSize / 2;
  const solarSystemScale = Math.min(3.0, zoomLevel) - 0.5; // Scale based on zoom level
  
  // Define planets with their properties
  const planets: Planet[] = [
    { name: "Mercury", distance: 20, size: 2, color: "#c6c6c6", orbitColor: "#555555", orbitalPeriod: 88, rotationOffset: 0 },
    { name: "Venus", distance: 30, size: 4, color: "#e6c686", orbitColor: "#666666", orbitalPeriod: 225, rotationOffset: 40 },
    { name: "Earth", distance: 45, size: 4.5, color: "#6b93d6", orbitColor: "#777777", orbitalPeriod: 365, rotationOffset: 120 },
    { name: "Mars", distance: 60, size: 3, color: "#c1440e", orbitColor: "#888888", orbitalPeriod: 687, rotationOffset: 220 },
    { name: "Jupiter", distance: 85, size: 10, color: "#eabd85", orbitColor: "#999999", orbitalPeriod: 4333, rotationOffset: 65 },
    { name: "Saturn", distance: 110, size: 8.5, color: "#e3e0c0", orbitColor: "#aaaaaa", orbitalPeriod: 10759, rotationOffset: 165, hasRings: true, ringColor: "#d5cea6" },
    { name: "Uranus", distance: 135, size: 6, color: "#9db4c0", orbitColor: "#bbbbbb", orbitalPeriod: 30687, rotationOffset: 290 },
    { name: "Neptune", distance: 155, size: 6, color: "#4b70dd", orbitColor: "#cccccc", orbitalPeriod: 60190, rotationOffset: 10 }
  ];

  // Sun properties
  const sunSize = 15 * solarSystemScale;
  const sunGlow = visualStyle === "cosmic" ? "drop-shadow(0 0 8px rgba(255,180,0,0.8))" : 
                  visualStyle === "lightweb" ? "drop-shadow(0 0 6px rgba(255,255,200,0.6))" :
                  "drop-shadow(0 0 5px rgba(255,200,100,0.7))";
  
  // Calculate perspective tilt based on rotation
  const perspectiveX = rotation.x * 0.15;
  const perspectiveY = rotation.y * 0.15;
  
  // Transform orbit circles based on perspective
  const transformOrbit = (distance: number) => {
    return `translate(${centerX}, ${centerY}) rotateX(${perspectiveX}deg) rotateY(${perspectiveY}deg)`;
  };

  return (
    <g className="solar-system" transform={`scale(${solarSystemScale})`}>
      {/* Render orbital paths */}
      {planets.map((planet) => (
        <circle
          key={`${planet.name}-orbit`}
          cx={0}
          cy={0}
          r={planet.distance}
          fill="none"
          stroke={planet.orbitColor}
          strokeWidth={0.5}
          strokeOpacity={0.5}
          strokeDasharray={planet.name === "Earth" ? "none" : "2,2"}
          transform={transformOrbit(planet.distance)}
          className="solar-system-orbit"
        />
      ))}
      
      {/* Sun at the center */}
      <circle
        cx={centerX}
        cy={centerY}
        r={sunSize}
        fill="url(#sunGradient)"
        style={{ filter: sunGlow }}
      />
      
      {/* Planets */}
      {planets.map((planet) => {
        // Calculate planet position based on rotation offset
        const angle = planet.rotationOffset * (Math.PI / 180);
        const planetX = centerX + planet.distance * Math.cos(angle);
        const planetY = centerY + planet.distance * Math.sin(angle);
        
        return (
          <g key={planet.name}>
            {/* Planet */}
            <circle
              cx={planetX}
              cy={planetY}
              r={planet.size}
              fill={planet.color}
              stroke="#333"
              strokeWidth={0.3}
              className="solar-system-planet"
            />
            
            {/* Saturn rings if applicable */}
            {planet.hasRings && (
              <ellipse
                cx={planetX}
                cy={planetY}
                rx={planet.size * 1.8}
                ry={planet.size * 0.5}
                fill="none"
                stroke={planet.ringColor}
                strokeWidth={1.5}
                transform={`rotate(${-planet.rotationOffset + 75}, ${planetX}, ${planetY})`}
              />
            )}
            
            {/* Planet name label */}
            <text
              x={planetX}
              y={planetY + planet.size + 4}
              fontSize={planet.size * 0.8}
              fill="white"
              textAnchor="middle"
              opacity={0.8}
              style={{ textShadow: "0 0 2px black" }}
            >
              {planet.name}
            </text>
          </g>
        );
      })}
      
      {/* Sun gradient definition */}
      <defs>
        <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#fff9a6" />
          <stop offset="50%" stopColor="#ffd252" />
          <stop offset="100%" stopColor="#ff7b00" />
        </radialGradient>
      </defs>
    </g>
  );
};

export default SolarSystem;
