
import { Species, ViewMode } from '../types';

/**
 * Get coordinates for a species based on the selected view mode
 */
export const getCoordinates = (
  species: Species,
  index: number,
  totalSpecies: number,
  mode: ViewMode | string,
  speciesRadius: number,
  containerSize: number,
  rotation: { x: number, y: number }
): { x: number, y: number } => {
  switch (mode) {
    case "radial":
      return getRadialCoordinates(species, speciesRadius, containerSize, rotation);
    case "signature":
      return getSignatureCoordinates(species, index, totalSpecies, containerSize);
    case "disk":
      return getDiskCoordinates(species, index, totalSpecies, containerSize);
    case "constellation":
      return getConstellationCoordinates(species, index, totalSpecies, containerSize);
    default:
      return getRadialCoordinates(species, speciesRadius, containerSize, rotation);
  }
};

/**
 * Calculate 3D coordinates in radial mode with rotation
 */
export const getRadialCoordinates = (
  species: Species,
  speciesRadius: number,
  containerSize: number,
  rotation: { x: number, y: number }
): { x: number, y: number, z: number } => {
  // Use distance and azimuth to calculate position
  const distance = species.distance || 0;
  const normalizedDistance = Math.min(0.9, distance / 10000);
  
  // Position in 3D space
  const radius = normalizedDistance * speciesRadius;
  const phi = species.signature ? species.signature[0] * Math.PI * 2 : Math.random() * Math.PI * 2;
  const theta = species.signature ? species.signature[1] * Math.PI : Math.random() * Math.PI;
  
  // Convert to Cartesian coordinates
  const x0 = radius * Math.sin(theta) * Math.cos(phi);
  const y0 = radius * Math.sin(theta) * Math.sin(phi);
  const z0 = radius * Math.cos(theta);
  
  // Apply rotation
  const rotX = rotation.x * Math.PI / 180;
  const rotY = rotation.y * Math.PI / 180;
  
  // Rotate around X-axis
  const x1 = x0;
  const y1 = y0 * Math.cos(rotX) - z0 * Math.sin(rotX);
  const z1 = y0 * Math.sin(rotX) + z0 * Math.cos(rotX);
  
  // Rotate around Y-axis
  const x2 = x1 * Math.cos(rotY) + z1 * Math.sin(rotY);
  const y2 = y1;
  const z2 = -x1 * Math.sin(rotY) + z1 * Math.cos(rotY);
  
  // Project onto 2D
  const centerX = containerSize / 2;
  const centerY = containerSize / 2;
  
  return {
    x: centerX + x2,
    y: centerY + y2,
    z: z2
  };
};

/**
 * Calculate coordinates for signature visualization mode
 */
export const getSignatureCoordinates = (
  species: Species,
  index: number,
  totalSpecies: number,
  containerSize: number
): { x: number, y: number, z: number } => {
  const centerX = containerSize / 2;
  const centerY = containerSize / 2;
  
  // Use species signature if available, otherwise use index
  if (species.signature && species.signature.length >= 2) {
    // Signature values should be between 0 and 1
    const x = centerX + (species.signature[0] - 0.5) * containerSize * 0.8;
    const y = centerY + (species.signature[1] - 0.5) * containerSize * 0.8;
    
    return { x, y, z: 0 };
  }
  
  // Fallback using index
  const angle = (index / totalSpecies) * Math.PI * 2;
  const radius = containerSize * 0.4;
  const x = centerX + Math.cos(angle) * radius;
  const y = centerY + Math.sin(angle) * radius;
  
  return { x, y, z: 0 };
};

/**
 * Calculate coordinates for disk visualization mode
 */
export const getDiskCoordinates = (
  species: Species,
  index: number,
  totalSpecies: number,
  containerSize: number
): { x: number, y: number, z: number } => {
  const centerX = containerSize / 2;
  const centerY = containerSize / 2;
  
  // Normalize distance for disk layout
  const distance = species.distance || 0;
  const normalizedDistance = Math.min(0.9, distance / 10000);
  const radius = normalizedDistance * (containerSize / 2.5);
  
  // Generate angle based on index or vibration
  const angle = species.vibration 
    ? (species.vibration / 12) * Math.PI * 2 
    : (index / totalSpecies) * Math.PI * 2;
  
  const x = centerX + Math.cos(angle) * radius;
  const y = centerY + Math.sin(angle) * radius;
  
  return { x, y, z: 0 };
};

/**
 * Calculate coordinates for constellation visualization mode
 */
export const getConstellationCoordinates = (
  species: Species,
  index: number,
  totalSpecies: number,
  containerSize: number
): { x: number, y: number, z: number } => {
  const centerX = containerSize / 2;
  const centerY = containerSize / 2;
  
  // Group by realm
  const realmOffsets = {
    "Existence": { x: -0.3, y: -0.3 },
    "Non-Existence": { x: 0.3, y: -0.3 },
    "New-Existence": { x: -0.3, y: 0.3 },
    "Divine": { x: 0.3, y: 0.3 }
  };
  
  const offset = realmOffsets[species.realm] || { x: 0, y: 0 };
  
  // Calculate position within realm group
  const realmX = centerX + offset.x * containerSize;
  const realmY = centerY + offset.y * containerSize;
  
  // Use FQ for radial positioning within the group
  const radius = containerSize * 0.2;
  const angle = species.fq ? species.fq * Math.PI * 2 : (index % 12) / 12 * Math.PI * 2;
  
  const x = realmX + Math.cos(angle) * radius * 0.8;
  const y = realmY + Math.sin(angle) * radius * 0.8;
  
  return { x, y, z: 0 };
};
