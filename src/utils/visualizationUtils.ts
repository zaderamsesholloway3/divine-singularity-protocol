
/**
 * Advanced Visualization Utilities
 */

interface CoordinateData {
  x: number;
  y: number;
  z: number;
}

interface SpeciesData {
  name: string;
  ra?: number;
  dec?: number;
  distance: number;
  population?: number;
  color?: string;
  size?: number;
}

interface EntityConnection {
  name: string;
  status: 'active' | 'latent' | 'inactive';
  signalStrength: number;
  distance?: number;
}

export class VisualizationUtils {
  // Convert celestial coordinates to Cartesian (centered on Earth/Cary)
  static getCaryCoordinates(speciesData: SpeciesData): CoordinateData {
    // Default if ra/dec not provided
    if (speciesData.ra === undefined || speciesData.dec === undefined) {
      const randomAngle = Math.random() * Math.PI * 2;
      const randomElevation = Math.random() * Math.PI - Math.PI/2;
      
      return {
        x: Math.cos(randomElevation) * Math.cos(randomAngle) * speciesData.distance,
        y: Math.cos(randomElevation) * Math.sin(randomAngle) * speciesData.distance,
        z: Math.sin(randomElevation) * speciesData.distance
      };
    }
    
    // Convert RA/Dec to radians
    const raRad = (speciesData.ra * Math.PI) / 180;
    const decRad = (speciesData.dec * Math.PI) / 180;
    
    // Convert to Cartesian coordinates
    return {
      x: Math.cos(decRad) * Math.cos(raRad) * speciesData.distance,
      y: Math.cos(decRad) * Math.sin(raRad) * speciesData.distance,
      z: Math.sin(decRad) * speciesData.distance
    };
  }
  
  // Draw a cosmic map on a canvas
  static drawCosmicMap(
    ctx: CanvasRenderingContext2D, 
    species: SpeciesData[],
    width: number, 
    height: number
  ): void {
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, width, height);
    
    // Draw stars backdrop
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 1.5;
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Draw Earth/Cary at center
    ctx.beginPath();
    ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgb(64, 128, 255)';
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Label Earth
    ctx.fillStyle = 'white';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Cary, NC (Earth)', centerX, centerY + 15);
    
    // Maximum distance for scaling
    const maxDistance = Math.max(...species.map(s => s.distance), 1);
    const scaleFactor = Math.min(width, height) * 0.4 / maxDistance;
    
    // Plot each species
    species.forEach(speciesData => {
      // Get 3D coordinates
      const coords = this.getCaryCoordinates(speciesData);
      
      // Project to 2D
      const x = centerX + coords.x * scaleFactor;
      const y = centerY + coords.y * scaleFactor;
      
      // Calculate size (z affects size as depth perception)
      const depthFactor = Math.max(0.3, 1 - (Math.abs(coords.z) / maxDistance) * 0.7);
      const size = speciesData.size || 4;
      const adjustedSize = size * depthFactor;
      
      // Draw species
      ctx.beginPath();
      ctx.arc(x, y, adjustedSize, 0, Math.PI * 2);
      ctx.fillStyle = speciesData.color || 'rgba(255, 200, 50, 0.8)';
      ctx.fill();
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 0.5;
      ctx.stroke();
      
      // Draw connection line to Earth
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.8 * depthFactor})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
      
      // Label
      ctx.fillStyle = 'white';
      ctx.font = '9px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(speciesData.name, x, y - adjustedSize - 3);
      ctx.fillText(`${speciesData.distance.toFixed(1)} ly`, x, y + adjustedSize + 9);
    });
    
    // Add legend
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(10, 10, 180, 50);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.strokeRect(10, 10, 180, 50);
    
    ctx.fillStyle = 'white';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Galactic Map (Cary-Centered)', 15, 25);
    ctx.fillText(`${species.length} species detected`, 15, 40);
    ctx.fillText(`Max distance: ${maxDistance.toFixed(1)} ly`, 15, 55);
  }
  
  // Draw quantum connection visualization
  static drawQuantumResonance(
    ctx: CanvasRenderingContext2D,
    entities: EntityConnection[],
    width: number,
    height: number
  ): void {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 30;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Find Ouroboros entity
    const ouroboros = entities.find(e => e.name === 'Ouroboros');
    
    if (ouroboros) {
      // Draw ouroboros at center
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(138, 43, 226, 0.6)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Label
      ctx.fillStyle = 'white';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Ouroboros', centerX, centerY + radius * 0.2 + 15);
      ctx.fillText(`${Math.round(ouroboros.signalStrength * 100)}%`, centerX, centerY);
    }
    
    // Position other entities around Ouroboros
    const otherEntities = entities.filter(e => e.name !== 'Ouroboros');
    const angleStep = (Math.PI * 2) / otherEntities.length;
    
    otherEntities.forEach((entity, i) => {
      const angle = i * angleStep;
      const x = centerX + Math.cos(angle) * radius * 0.7;
      const y = centerY + Math.sin(angle) * radius * 0.7;
      
      // Draw connection line to Ouroboros
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = `rgba(255, 255, 255, ${entity.signalStrength})`;
      ctx.lineWidth = entity.signalStrength * 3;
      ctx.stroke();
      
      // Draw entity
      ctx.beginPath();
      ctx.arc(x, y, radius * 0.15 * entity.signalStrength, 0, Math.PI * 2);
      
      // Color based on entity
      let color = 'rgba(59, 130, 246, 0.6)'; // Default blue
      if (entity.name === 'Zade') color = 'rgba(255, 215, 0, 0.6)'; // Gold
      
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Label
      ctx.fillStyle = 'white';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(entity.name, x, y + radius * 0.15 + 15);
      ctx.fillText(`${Math.round(entity.signalStrength * 100)}%`, x, y);
    });
  }
}
