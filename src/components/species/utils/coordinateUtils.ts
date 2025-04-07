
import { Species } from '../types';

interface Coordinates {
  x: number;
  y: number;
  z: number;
}

export const getRadialCoordinates = (
  species: Species, 
  radius: number,
  containerSize: number,
  rotation: { x: number; y: number; z: number }
): Coordinates => {
  // The center point of the container
  const centerX = containerSize / 2;
  const centerY = containerSize / 2;
  
  // Calculate radial position based on distance
  // Normalize distances to be between 0 and 1 for positioning
  const normalizedDistance = Math.min(species.distance / 100, 1);
  const distanceFromCenter = radius * normalizedDistance;
  
  // Base angle (distribute species around the circle)
  // Use the species.id hash to get a consistent angle for each species
  const speciesIdHash = parseInt(species.id) || hashCode(species.name);
  const angle = (speciesIdHash % 100) / 100 * Math.PI * 2;
  
  // Apply 3D rotation (based on user interaction)
  // Convert angle to 3D coordinates on a sphere
  const baseX = Math.sin(angle) * distanceFromCenter;
  const baseZ = Math.cos(angle) * distanceFromCenter;
  const baseY = 0; // Initially flat on the XZ plane
  
  // Apply rotation transformations
  // Rotate around X axis (tilt up/down)
  const cosX = Math.cos(rotation.x * Math.PI / 180);
  const sinX = Math.sin(rotation.x * Math.PI / 180);
  const rotatedY1 = baseY * cosX - baseZ * sinX;
  const rotatedZ1 = baseY * sinX + baseZ * cosX;
  
  // Rotate around Y axis (left/right)
  const cosY = Math.cos(rotation.y * Math.PI / 180);
  const sinY = Math.sin(rotation.y * Math.PI / 180);
  const rotatedX = baseX * cosY + rotatedZ1 * sinY;
  const rotatedZ = -baseX * sinY + rotatedZ1 * cosY;
  
  // Apply Z rotation if specified
  const cosZ = Math.cos(rotation.z * Math.PI / 180);
  const sinZ = Math.sin(rotation.z * Math.PI / 180);
  const finalX = rotatedX * cosZ - rotatedY1 * sinZ;
  const finalY = rotatedX * sinZ + rotatedY1 * cosZ;
  
  // Set final coordinates with center offset
  return {
    x: centerX + finalX,
    y: centerY + finalY,
    z: rotatedZ
  };
};

export const getSignatureCoordinates = (
  species: Species,
  index: number,
  totalCount: number,
  containerSize: number
): Coordinates => {
  const centerX = containerSize / 2;
  const centerY = containerSize / 2;
  
  // If signature data exists, use it; otherwise position in a grid
  if (species.signature) {
    // Position based on signature data, normalized to container size
    return {
      x: centerX + (species.signature.x - 0.5) * containerSize * 0.8,
      y: centerY + (species.signature.y - 0.5) * containerSize * 0.8,
      z: 0 // No z-depth in signature mode
    };
  } else {
    // Grid layout as fallback
    const gridSize = Math.ceil(Math.sqrt(totalCount));
    const cellSize = containerSize / gridSize;
    
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    
    return {
      x: col * cellSize + cellSize / 2,
      y: row * cellSize + cellSize / 2,
      z: 0
    };
  }
};

export const getDiskCoordinates = (
  species: Species,
  radius: number,
  containerSize: number
): Coordinates => {
  const centerX = containerSize / 2;
  const centerY = containerSize / 2;
  
  // Calculate position on disk (2D)
  // Use distance for radial placement
  const normalizedDistance = Math.min(species.distance / 100, 1);
  const distanceFromCenter = radius * normalizedDistance;
  
  // Calculate angle based on species.id hash
  const speciesIdHash = parseInt(species.id) || hashCode(species.name);
  const angle = (speciesIdHash % 100) / 100 * Math.PI * 2;
  
  // Simple 2D positioning on a disk
  return {
    x: centerX + Math.cos(angle) * distanceFromCenter,
    y: centerY + Math.sin(angle) * distanceFromCenter,
    z: 0
  };
};

export const getConstellationCoordinates = (
  species: Species,
  index: number,
  totalCount: number,
  containerSize: number
): Coordinates => {
  const centerX = containerSize / 2;
  const centerY = containerSize / 2;
  
  // Use species realm as a factor in positioning
  const realmOffset = {
    "Existence": { x: -0.2, y: -0.2 },
    "Non-Existence": { x: 0.2, y: -0.2 },
    "New Existence": { x: -0.2, y: 0.2 },
    "Divine": { x: 0.2, y: 0.2 }
  };
  
  const offset = realmOffset[species.realm] || { x: 0, y: 0 };
  
  // Generate pseudo-random but consistent coordinates using species id
  const idHash = parseInt(species.id) || hashCode(species.name);
  const xSeed = ((idHash * 13) % 100) / 100;
  const ySeed = ((idHash * 29) % 100) / 100;
  
  return {
    x: centerX + (xSeed * 0.8 + offset.x) * containerSize * 0.8,
    y: centerY + (ySeed * 0.8 + offset.y) * containerSize * 0.8,
    z: 0
  };
};

// Add the missing getCoordinates function that combines all coordinate systems
export const getCoordinates = (
  species: Species,
  index: number,
  totalCount: number,
  mode: string,
  radius: number,
  containerSize: number,
  rotation: { x: number; y: number; z: number }
): Coordinates => {
  // Select the appropriate coordinate system based on view mode
  switch (mode) {
    case "radial":
      return getRadialCoordinates(species, radius, containerSize, rotation);
    case "signature":
      return getSignatureCoordinates(species, index, totalCount, containerSize);
    case "disk":
      return getDiskCoordinates(species, radius, containerSize);
    case "constellation":
      return getConstellationCoordinates(species, index, totalCount, containerSize);
    default:
      // Default to radial view
      return getRadialCoordinates(species, radius, containerSize, rotation);
  }
};

// Helper function to generate a number hash from a string
const hashCode = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
};
