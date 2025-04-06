
import React, { useState, forwardRef, useImperativeHandle, useMemo, useEffect } from 'react';
import { Species, ViewMode, VisualStyle, VisibleLayers } from './types';

// Define prop types for the component
interface SpeciesGatewayProps {
  species: Species[];
  onSelectSpecies: (species: Species) => void;
  selectedSpecies: Species | null;
  mode?: ViewMode;
  visualStyle?: VisualStyle;
  showPingTrail?: boolean;
  pingOrigin?: Species | null;
  visibleLayers?: VisibleLayers;
  showAllNames?: boolean;
  zoomLevel?: number;
}

// Define ref interface for external access
export interface SpeciesGatewayRef {
  toggleTargetLock: () => boolean;
}

// Make sure to wrap the component with forwardRef and implement useImperativeHandle to expose methods
export const SpeciesGateway = forwardRef<SpeciesGatewayRef, SpeciesGatewayProps>((props, ref) => {
  const { 
    species, 
    onSelectSpecies, 
    selectedSpecies, 
    mode = "radial", 
    visualStyle = "celestial", 
    showPingTrail = false,
    pingOrigin = null,
    visibleLayers = { existence: true, nonExistence: true, newExistence: true, divine: true },
    showAllNames = false,
    zoomLevel = 1.0
  } = props;
  
  const [targetLocked, setTargetLocked] = useState(false);
  const [hoveredSpecies, setHoveredSpecies] = useState<Species | null>(null);
  
  // 3D rotation state
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  // Animation for ping trails
  const [pingAnimationProgress, setPingAnimationProgress] = useState(0);
  
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
  
  // Animate ping trails
  useEffect(() => {
    let animationFrame: number;
    let startTime: number;
    
    if (showPingTrail) {
      startTime = Date.now();
      const animatePing = () => {
        const elapsed = Date.now() - startTime;
        const duration = 10000; // 10 seconds
        const progress = Math.min(elapsed / duration, 1);
        
        setPingAnimationProgress(progress);
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animatePing);
        }
      };
      
      animationFrame = requestAnimationFrame(animatePing);
    } else {
      setPingAnimationProgress(0);
    }
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [showPingTrail]);
  
  // Mouse/Touch handlers for 3D rotation
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    // Calculate rotation based on mouse movement
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    setRotation({
      x: rotation.x + (deltaY * 0.01),
      y: rotation.y + (deltaX * 0.01)
    });
    
    setDragStart({ x: e.clientX, y: e.clientY });
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    
    const deltaX = e.touches[0].clientX - dragStart.x;
    const deltaY = e.touches[0].clientY - dragStart.y;
    
    setRotation({
      x: rotation.x + (deltaY * 0.01),
      y: rotation.y + (deltaX * 0.01)
    });
    
    setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
  };
  
  // Original disk layout - places species in a circle with improved spacing based on Lyra's code
  const getDiskCoordinates = (index: number, total: number, radius: number) => {
    // Use evenly distributed angles to create a perfect orbital ring
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
  
  // Enhanced radial layout with 3D rotation support
  const getRadialCoordinates = (speciesData: Species, radius: number, containerSize: number) => {
    // Center point of the container
    const center = containerSize / 2;
    
    // Use species location (ra/dec) for angle if available, otherwise use deterministic value from name or distance
    const getAngle = () => {
      if (speciesData.location) {
        return Math.atan2(speciesData.location[1], speciesData.location[0]);
      }
      
      // Use a hash of the name for a consistent angle
      let nameHash = 0;
      for (let i = 0; i < speciesData.name.length; i++) {
        nameHash = ((nameHash << 5) - nameHash) + speciesData.name.charCodeAt(i);
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
    const logDistance = Math.log10(speciesData.distance + 1);
    const distanceFactor = Math.min(logDistance / logMaxDistance, 0.9); // Cap at 90% of radius
    
    const actualRadius = minRadius + (radius - minRadius) * distanceFactor;
    
    // For 3D effect, calculate coordinates with rotation
    const x0 = Math.cos(angle) * actualRadius;
    const y0 = Math.sin(angle) * actualRadius;
    const z0 = (Math.random() - 0.5) * actualRadius * 0.2; // Small z variation for initial 3D effect
    
    // Apply 3D rotation transformations
    const cosX = Math.cos(rotation.x);
    const sinX = Math.sin(rotation.x);
    const cosY = Math.cos(rotation.y);
    const sinY = Math.sin(rotation.y);
    
    // Rotate around X axis
    const y1 = y0 * cosX - z0 * sinX;
    const z1 = y0 * sinX + z0 * cosX;
    
    // Rotate around Y axis
    const x2 = x0 * cosY + z1 * sinY;
    const z2 = -x0 * sinY + z1 * cosY;
    
    // Project to 2D space with perspective effect
    const perspective = 1000; // Perspective factor
    const scale = perspective / (perspective + z2);
    
    const x = center + x2 * scale;
    const y = center + y1 * scale;
    
    // Store z-value for depth sorting
    return { x, y, z: z2 };
  };

  // Signature view mode - clustered network diagram
  const getSignatureCoordinates = (speciesData: Species, index: number, total: number, containerSize: number) => {
    const center = containerSize / 2;
    const radius = containerSize * 0.4;
    
    // Group species by realm for clustered layout
    const realm = speciesData.realm || 'unknown';
    let realmOffset = { x: 0, y: 0 };
    
    switch(realm) {
      case 'existence':
        realmOffset = { x: -radius * 0.3, y: radius * 0.2 };
        break;
      case 'non-existence':
        realmOffset = { x: radius * 0.3, y: radius * 0.2 };
        break;
      case 'new-existence':
        realmOffset = { x: 0, y: -radius * 0.3 };
        break;
      default:
        realmOffset = { x: 0, y: 0 };
    }
    
    // Use deterministic positioning based on name hash
    let nameHash = 0;
    for (let i = 0; i < speciesData.name.length; i++) {
      nameHash = ((nameHash << 5) - nameHash) + speciesData.name.charCodeAt(i);
    }
    nameHash = Math.abs(nameHash);
    
    // Create clustered positions within realm group
    const angle = (nameHash % 360) * (Math.PI / 180);
    const distance = (nameHash % 100) / 300 * radius + radius * 0.15;
    
    const x = center + realmOffset.x + Math.cos(angle) * distance;
    const y = center + realmOffset.y + Math.sin(angle) * distance;
    
    return { x, y, z: 0 };
  };
  
  const containerSize = 500;
  const speciesRadius = containerSize / 2.5;
  
  // Create a starry background with nebula effect based on visual style
  const generateStars = (count: number) => {
    const stars: React.ReactNode[] = [];
    
    // Visual style specific adjustments
    const starOpacityBase = visualStyle === "lightweb" ? 0.7 : visualStyle === "cosmic" ? 0.5 : 0.8;
    const starSizeMultiplier = visualStyle === "lightweb" ? 1.2 : visualStyle === "cosmic" ? 0.8 : 1.0;
    
    // Generate smaller distant stars
    for (let i = 0; i < count; i++) {
      const x = Math.random() * containerSize;
      const y = Math.random() * containerSize;
      const size = Math.random() * 1.5 * starSizeMultiplier + 0.5;
      const opacity = Math.random() * 0.8 * starOpacityBase + 0.2;
      
      // Star color varies by visual style
      const starColor = visualStyle === "celestial" ? "white" : 
                         visualStyle === "lightweb" ? "rgb(220, 220, 255)" : 
                         "rgb(180, 180, 220)";
      
      stars.push(
        <circle
          key={`star-${i}`}
          cx={x}
          cy={y}
          r={size}
          fill={starColor}
          opacity={opacity}
          filter={visualStyle === "lightweb" ? "blur(0.5px)" : "none"}
        />
      );
      
      // Add occasional star glow
      if (Math.random() > (visualStyle === "cosmic" ? 0.9 : 0.85)) {
        const glowSize = visualStyle === "cosmic" ? 2 : visualStyle === "lightweb" ? 4 : 3;
        const glowOpacity = visualStyle === "cosmic" ? 0.3 : visualStyle === "lightweb" ? 0.7 : 0.5;
        
        stars.push(
          <circle
            key={`star-glow-${i}`}
            cx={x}
            cy={y}
            r={size * glowSize}
            fill={
              visualStyle === "cosmic" ? "rgba(138, 43, 226, 0.3)" : 
              visualStyle === "lightweb" ? "rgba(255, 255, 255, 0.3)" :
              "rgba(255, 255, 255, 0.3)"
            }
            opacity={glowOpacity}
          />
        );
      }
    }
    
    // Add nebula effects with colors matching the visual style
    const nebulae = [
      // Existence realm (blue)
      { 
        color: visualStyle === "cosmic" ? "rgba(90, 30, 160, 0.08)" :
               visualStyle === "lightweb" ? "rgba(255, 255, 255, 0.08)" :
               "rgba(56, 189, 248, 0.1)", 
        x: containerSize * 0.3, 
        y: containerSize * 0.7, 
        size: containerSize * 0.4 
      },
      // Non-Existence (green/gold)
      { 
        color: visualStyle === "cosmic" ? "rgba(216, 180, 254, 0.06)" :
               visualStyle === "lightweb" ? "rgba(200, 255, 200, 0.06)" :
               "rgba(132, 204, 22, 0.1)",
        x: containerSize * 0.7, 
        y: containerSize * 0.2, 
        size: containerSize * 0.35 
      },
      // New-Existence or Divine (purple/white)
      { 
        color: visualStyle === "cosmic" ? "rgba(168, 85, 247, 0.05)" :
               visualStyle === "lightweb" ? "rgba(220, 220, 255, 0.05)" :
               "rgba(138, 43, 226, 0.05)",
        x: containerSize * 0.8, 
        y: containerSize * 0.8, 
        size: containerSize * 0.3 
      }
    ];
    
    nebulae.forEach((nebula, i) => {
      stars.push(
        <circle
          key={`nebula-${i}`}
          cx={nebula.x}
          cy={nebula.y}
          r={nebula.size}
          fill={nebula.color}
          filter={visualStyle === "lightweb" ? "blur(20px)" : visualStyle === "cosmic" ? "blur(15px)" : "blur(10px)"}
        />
      );
    });
    
    return stars;
  };
  
  // Create distance rings and realm indicators based on visual style
  const generateDistanceRings = () => {
    const rings: React.ReactNode[] = [];
    const center = containerSize / 2;
    
    // Customize appearance based on visual style
    const getRingStroke = (realm: string) => {
      switch (visualStyle) {
        case "cosmic":
          return realm === "Existence" ? "rgba(90, 30, 160, 0.3)" :
                realm === "Non-Existence" ? "rgba(216, 180, 254, 0.3)" :
                "rgba(168, 85, 247, 0.3)";
        case "lightweb":
          return realm === "Existence" ? "rgba(255, 255, 255, 0.3)" :
                realm === "Non-Existence" ? "rgba(200, 255, 200, 0.2)" :
                "rgba(220, 220, 255, 0.25)";
        default: // celestial
          return realm === "Existence" ? "rgba(56, 189, 248, 0.3)" :
                realm === "Non-Existence" ? "rgba(132, 204, 22, 0.3)" :
                "rgba(138, 43, 226, 0.3)";
      }
    };
    
    const getRingFill = (realm: string) => {
      switch (visualStyle) {
        case "cosmic":
          return realm === "Existence" ? "rgba(90, 30, 160, 0.05)" :
                realm === "Non-Existence" ? "rgba(216, 180, 254, 0.05)" :
                "rgba(168, 85, 247, 0.05)";
        case "lightweb":
          return realm === "Existence" ? "rgba(255, 255, 255, 0.04)" :
                realm === "Non-Existence" ? "rgba(200, 255, 200, 0.03)" :
                "rgba(220, 220, 255, 0.04)";
        default: // celestial
          return realm === "Existence" ? "rgba(56, 189, 248, 0.15)" :
                realm === "Non-Existence" ? "rgba(132, 204, 22, 0.15)" :
                "rgba(138, 43, 226, 0.15)";
      }
    };
    
    // Add realm rings with labels - enhanced for clarity
    const realms = [
      { name: "Existence", distance: speciesRadius * 0.5, visible: visibleLayers.existence },
      { name: "Non-Existence", distance: speciesRadius * 0.8, visible: visibleLayers.nonExistence },
      { name: "New Existence", distance: speciesRadius, visible: visibleLayers.newExistence }
    ];
    
    realms.forEach((realm, i) => {
      if (!realm.visible) return;
      
      // Add filled realm area
      rings.push(
        <circle
          key={`realm-${i}`}
          cx={center}
          cy={center}
          r={realm.distance}
          fill={getRingFill(realm.name)}
          stroke={getRingStroke(realm.name)}
          strokeWidth={0.8}
          strokeDasharray={visualStyle === "lightweb" ? "3 3" : "2 4"}
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
    });
    
    // Add logarithmic distance indicator rings
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
          stroke={
            visualStyle === "cosmic" ? "rgba(168, 85, 247, 0.15)" : 
            visualStyle === "lightweb" ? "rgba(255, 255, 255, 0.15)" : 
            "rgba(255, 255, 255, 0.1)"
          }
          strokeWidth={0.5}
          strokeDasharray={visualStyle === "lightweb" ? "2 2" : "1 3"}
        />
      );
      
      rings.push(
        <text
          key={`distance-label-${i}`}
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
      );
    });
    
    return rings;
  };
  
  // Get coordinates based on the selected mode
  const getCoordinates = (speciesData: Species, index: number, total: number) => {
    switch (mode) {
      case "disk":
        return { ...getDiskCoordinates(index, total, speciesRadius), z: 0 };
      case "constellation":
        return { ...getConstellationCoordinates(index, total, speciesRadius), z: 0 };
      case "signature":
        return getSignatureCoordinates(speciesData, index, total, containerSize);
      case "radial":
      default:
        return getRadialCoordinates(speciesData, speciesRadius, containerSize);
    }
  };

  // Determine special frequency entities (like Lyra at 1.855e43 Hz)
  const isDivineFrequency = (speciesData: Species) => {
    return speciesData.fq && Math.abs(speciesData.fq - 1.855) < 0.01;
  };

  // Check if species is visible according to the layer filters
  const isSpeciesVisible = (speciesData: Species) => {
    if (isDivineFrequency(speciesData)) {
      return visibleLayers.divine;
    }
    
    if (speciesData.realm === "existence") {
      return visibleLayers.existence;
    } else if (speciesData.realm === "non-existence") {
      return visibleLayers.nonExistence;
    } else if (speciesData.realm === "new-existence") {
      return visibleLayers.newExistence;
    }
    
    return true; // Default to visible
  };

  // Get color based on species characteristics and visual style
  const getSpeciesColor = (speciesData: Species) => {
    if (isDivineFrequency(speciesData)) {
      switch (visualStyle) {
        case "cosmic":
          return speciesData.responding ? "rgb(217, 70, 239)" : "rgb(168, 85, 247)";
        case "lightweb":
          return speciesData.responding ? "rgb(250, 240, 137)" : "rgb(240, 230, 140)";
        default: // celestial
          return speciesData.responding ? "rgb(217, 70, 239)" : "rgb(168, 85, 247)";
      }
    }
    
    if (speciesData.responding) {
      switch (visualStyle) {
        case "cosmic":
          return "rgb(216, 180, 254)";
        case "lightweb":
          return "rgb(220, 252, 231)";
        default: // celestial
          return "rgb(132, 204, 22)";
      }
    }
    
    // Colors based on realm and visual style
    if (speciesData.realm === "existence") {
      switch (visualStyle) {
        case "cosmic":
          return "rgb(90, 30, 160)";
        case "lightweb":
          return "rgb(240, 253, 250)";
        default: // celestial
          return "rgb(56, 189, 248)";
      }
    } else if (speciesData.realm === "non-existence") {
      switch (visualStyle) {
        case "cosmic":
          return "rgb(130, 36, 227)";
        case "lightweb":
          return "rgb(209, 250, 229)";
        default: // celestial
          return "rgb(132, 204, 22)";
      }
    } else {
      switch (visualStyle) {
        case "cosmic":
          return "rgb(168, 85, 247)";
        case "lightweb":
          return "rgb(230, 232, 250)";
        default: // celestial
          return "rgb(138, 43, 226)";
      }
    }
  };

  const speciesCount = species.length;
  
  // Sort species by z-depth for proper 3D rendering (only matters for radial mode)
  const sortedSpecies = useMemo(() => {
    if (mode !== "radial" && mode !== "signature") return species;
    
    return [...species]
      .filter(s => isSpeciesVisible(s))
      .map((s, i) => {
        let coords;
        if (mode === "signature") {
          coords = getSignatureCoordinates(s, i, species.length, containerSize);
        } else {
          coords = getRadialCoordinates(s, speciesRadius, containerSize);
        }
        return {
          species: s,
          coords,
          index: i
        };
      })
      .sort((a, b) => b.coords.z - a.coords.z)
      .map(item => ({ species: item.species, index: item.index }));
  }, [species, mode, rotation.x, rotation.y, visibleLayers, speciesRadius, containerSize]);

  // Regular rendering for non-radial modes
  const renderRegularSpecies = () => {
    return species
      .filter(s => isSpeciesVisible(s))
      .map((s, i) => {
        const { x, y } = getCoordinates(s, i, species.length);
        const isSelected = selectedSpecies?.name === s.name;
        const isHovered = hoveredSpecies?.name === s.name;
        const speciesColor = getSpeciesColor(s);
        
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
              r={6}
              fill={speciesColor}
              stroke={isSelected ? 'white' : 'none'}
              strokeWidth={isSelected ? 2 : 0}
            />
            <text
              y={12}
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
          </g>
        );
      });
  };

  // Generate ping trail animations
  const renderPingTrail = () => {
    if (!showPingTrail) return null;
    
    const center = containerSize / 2;
    const maxRadius = speciesRadius * pingAnimationProgress;
    
    const pingColor = visualStyle === "cosmic" ? "rgba(168, 85, 247, " : 
                     visualStyle === "lightweb" ? "rgba(255, 255, 255, " :
                     "rgba(56, 189, 248, ";
    
    // Create multiple rings with varying opacity
    const rings = [];
    const ringsCount = 3;
    
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
    
    return rings;
  };

  return (
    <div 
      className="relative w-full h-full flex justify-center"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      <svg 
        width={containerSize} 
        height={containerSize} 
        style={{ 
          filter: visualStyle === "cosmic" ? "brightness(1.1) contrast(1.2)" :
                 visualStyle === "lightweb" ? "brightness(1.15) contrast(1.05)" :
                 "brightness(1.05) contrast(1.1)",
          boxShadow: visualStyle === "cosmic" ? "0 0 30px rgba(130, 0, 255, 0.1)" :
                    visualStyle === "lightweb" ? "0 0 30px rgba(255, 255, 255, 0.1)" :
                    "0 0 20px rgba(180, 180, 255, 0.2)"
        }}
        className={visualStyle === "lightweb" ? "bg-gradient-to-b from-gray-900/60 to-blue-900/40" : ""}
      >
        {/* Background stars and nebulas */}
        {generateStars(visualStyle === "lightweb" ? 120 : visualStyle === "cosmic" ? 180 : 200)}
        
        {/* Distance rings and realm indicators */}
        {generateDistanceRings()}
        
        {/* Ping trails */}
        {renderPingTrail()}
        
        {/* Species nodes */}
        {renderRegularSpecies()}
      </svg>
    </div>
  );
});

SpeciesGateway.displayName = 'SpeciesGateway';

export default SpeciesGateway;
