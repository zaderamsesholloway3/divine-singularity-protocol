
import { Species } from "../types";

interface Coordinates {
  x: number;
  y: number;
  z: number;
}

/**
 * Get coordinates based on the selected view mode
 */
export const getCoordinates = (
  species: Species,
  index: number, 
  totalSpecies: number, 
  mode: string, 
  radius: number, 
  containerSize: number,
  rotation: { x: number, y: number }
): Coordinates => {
  if (mode === "radial") {
    return getRadialCoordinates(species, radius, containerSize, rotation);
  } else if (mode === "signature") {
    return getSignatureCoordinates(species, index, totalSpecies, containerSize);
  } else if (mode === "disk") {
    return getDiskCoordinates(species, index, containerSize);
  }
  
  // Default to radial coordinates
  return getRadialCoordinates(species, radius, containerSize, rotation);
};

/**
 * Calculate 3D coordinates for radial mode
 */
export const getRadialCoordinates = (
  species: Species, 
  radius: number, 
  containerSize: number,
  rotation: { x: number; y: number }
): Coordinates => {
  // Get theta and phi from species properties
  const theta = species.phaseOffset ? (species.phaseOffset / 180) * Math.PI : Math.random() * Math.PI * 2;
  const phi = species.vibration ? (species.vibration / 20) * Math.PI : Math.random() * Math.PI;
  
  // Calculate distance factor based on species distance or random value
  const distanceFactor = species.distance 
    ? Math.min(1, species.distance / 2000) // Scale distances, max at 2000ly
    : Math.random() * 0.8 + 0.2;
    
  // Convert to Cartesian coordinates
  let x = radius * distanceFactor * Math.sin(phi) * Math.cos(theta);
  let y = radius * distanceFactor * Math.sin(phi) * Math.sin(theta);
  let z = radius * distanceFactor * Math.cos(phi);
  
  // Apply custom location if available
  if (species.location) {
    x = species.location.x * radius;
    y = species.location.y * radius;
    z = species.location.z * radius;
  }
  
  // Apply 3D rotation
  const rotX = rotation.x * (Math.PI / 180);
  const rotY = rotation.y * (Math.PI / 180);
  
  // Rotate around X axis
  const y1 = y * Math.cos(rotX) - z * Math.sin(rotX);
  const z1 = y * Math.sin(rotX) + z * Math.cos(rotX);
  
  // Rotate around Y axis
  const x2 = x * Math.cos(rotY) + z1 * Math.sin(rotY);
  const z2 = -x * Math.sin(rotY) + z1 * Math.cos(rotY);
  
  // Center on container
  const centerX = containerSize / 2;
  const centerY = containerSize / 2;
  
  return {
    x: centerX + x2,
    y: centerY + y1,
    z: z2
  };
};

/**
 * Calculate coordinates for signature mode
 */
export const getSignatureCoordinates = (
  species: Species,
  index: number,
  totalSpecies: number,
  containerSize: number
): Coordinates => {
  const centerX = containerSize / 2;
  const centerY = containerSize / 2;
  const maxRadius = containerSize * 0.45;
  
  // Calculate base position based on index
  const angle = (index / totalSpecies) * Math.PI * 2;
  
  // Modify radius based on species properties
  let radiusFactor = 1;
  
  // Use species vibration to affect position
  if (species.vibration) {
    // Lower vibrations closer to center
    radiusFactor = Math.min(1, species.vibration / 20);
  }
  
  // Use realm to determine quadrant bias
  let quadrantBias = 0;
  switch (species.realm) {
    case "Existence":
      quadrantBias = 0; // Default quadrant
      break;
    case "Non-Existence":
      quadrantBias = Math.PI * 0.5; // 90 degrees
      break;
    case "New-Existence":
      quadrantBias = Math.PI; // 180 degrees
      break;
    case "Divine":
      quadrantBias = Math.PI * 1.5; // 270 degrees
      break;
    default:
      quadrantBias = 0;
  }
  
  // Apply custom signature patterns based on realm
  let finalAngle = angle + quadrantBias;
  let finalRadius = maxRadius * radiusFactor;
  
  // Unique signature patterns per realm
  if (species.realm === "Existence") {
    // Spiral pattern
    finalRadius *= (1 - (index % 5) * 0.1);
  } else if (species.realm === "Non-Existence") {
    // Grid pattern
    finalRadius *= (0.5 + (index % 3) * 0.25);
    finalAngle += Math.PI / 6;
  } else if (species.realm === "New-Existence") {
    // Staggered pattern
    finalRadius *= (0.6 + ((index % 7) / 10));
    finalAngle += Math.PI / 4;
  } else if (species.realm === "Divine") {
    // Fixed positions (special)
    finalRadius *= 0.7;
  }
  
  // Calculate final position
  const x = centerX + finalRadius * Math.cos(finalAngle);
  const y = centerY + finalRadius * Math.sin(finalAngle);
  
  // z helps with sorting
  const z = species.realm === "Divine" ? 100 : 
           species.realm === "New-Existence" ? 50 : 
           species.realm === "Non-Existence" ? 25 : 0;
  
  return { x, y, z };
};

/**
 * Calculate coordinates for disk mode (flat galactic disk visualization)
 */
export const getDiskCoordinates = (
  species: Species,
  index: number,
  containerSize: number
): Coordinates => {
  const centerX = containerSize / 2;
  const centerY = containerSize / 2;
  const maxRadius = containerSize * 0.45;
  
  // Use distance to determine radius (if available)
  const distanceFactor = species.distance 
    ? Math.min(1, species.distance / 5000) // Scale distances
    : Math.random() * 0.9 + 0.1;
    
  // Apply spiral arm effect
  let angle = Math.random() * Math.PI * 2;
  if (species.vibration) {
    // Use vibration to determine arm
    const armNumber = Math.floor((species.vibration % 6));
    angle = (armNumber / 6) * Math.PI * 2 + (distanceFactor * Math.PI * 0.5);
  }
  
  // Add some randomness to position
  const randomOffset = 0.1;
  const randomAngleOffset = (Math.random() * 2 - 1) * randomOffset;
  const randomDistanceOffset = (Math.random() * 2 - 1) * randomOffset;
  
  // Calculate final position
  const radius = maxRadius * (distanceFactor + randomDistanceOffset);
  const finalAngle = angle + randomAngleOffset;
  
  const x = centerX + radius * Math.cos(finalAngle);
  const y = centerY + radius * Math.sin(finalAngle);
  
  return { x, y, z: 0 }; // flat, so z is always 0
};

/**
 * Get color based on species realm
 */
export const getRealmColor = (realm: string): string => {
  switch (realm) {
    case "Existence":
      return "#3b82f6";
    case "Non-Existence":
      return "#8b5cf6";
    case "New-Existence":
      return "#06b6d4";
    case "Divine":
      return "#eab308";
    default:
      return "#3b82f6";
  }
};
