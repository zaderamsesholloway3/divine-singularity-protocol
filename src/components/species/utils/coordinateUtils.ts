import { Species } from '../types';

// Original disk layout - places species in a circle with improved spacing
export const getDiskCoordinates = (index: number, total: number, radius: number) => {
  // Use evenly distributed angles to create a perfect orbital ring
  const angle = (index / total) * 2 * Math.PI;
  const x = radius + radius * Math.cos(angle);
  const y = radius + radius * Math.sin(angle);
  return { x, y };
};

// Constellation layout - uses golden ratio for more distributed positioning
export const getConstellationCoordinates = (index: number, total: number, radius: number) => {
  const goldenRatio = 1.61803398875;
  const angle = index * goldenRatio * 2 * Math.PI;
  const x = radius + radius * Math.cos(angle);
  const y = radius + radius * Math.sin(angle);
  return { x, y };
};

// Enhanced radial layout with 3D rotation support
export const getRadialCoordinates = (
  speciesData: Species, 
  radius: number, 
  containerSize: number,
  rotation: { x: number, y: number }
) => {
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
export const getSignatureCoordinates = (speciesData: Species, index: number, total: number, containerSize: number) => {
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

// Get coordinates based on the selected mode
export const getCoordinates = (
  speciesData: Species, 
  index: number, 
  total: number, 
  mode: string, 
  speciesRadius: number, 
  containerSize: number,
  rotation: { x: number, y: number }
) => {
  switch (mode) {
    case "disk":
      return { ...getDiskCoordinates(index, total, speciesRadius), z: 0 };
    case "constellation":
      return { ...getConstellationCoordinates(index, total, speciesRadius), z: 0 };
    case "signature":
      return getSignatureCoordinates(speciesData, index, total, containerSize);
    case "radial":
    default:
      return getRadialCoordinates(speciesData, speciesRadius, containerSize, rotation);
  }
};
