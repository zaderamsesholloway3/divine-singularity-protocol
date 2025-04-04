
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
  renderPosition?: { x: number; y: number };
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
  
  // Draw a cosmic map on a canvas - enhanced for emotional tonality colors
  static drawCosmicMap(
    ctx: CanvasRenderingContext2D, 
    species: SpeciesData[],
    width: number, 
    height: number
  ): void {
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Create a star field background with nebula-like effects
    this.createStarfieldBackground(ctx, width, height);
    
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Draw Earth/Cary at center with enhanced glow
    ctx.beginPath();
    ctx.arc(centerX, centerY, 6, 0, Math.PI * 2);
    
    // Create gradient for Earth/Cary
    const earthGradient = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, 6
    );
    earthGradient.addColorStop(0, 'rgba(64, 206, 219, 0.9)');
    earthGradient.addColorStop(0.7, 'rgba(29, 78, 216, 0.8)');
    earthGradient.addColorStop(1, 'rgba(29, 78, 216, 0.3)');
    
    ctx.fillStyle = earthGradient;
    ctx.fill();
    
    // Add glow effect
    ctx.beginPath();
    ctx.arc(centerX, centerY, 12, 0, Math.PI * 2);
    const glowGradient = ctx.createRadialGradient(
      centerX, centerY, 6,
      centerX, centerY, 12
    );
    glowGradient.addColorStop(0, 'rgba(56, 189, 248, 0.6)');
    glowGradient.addColorStop(1, 'rgba(56, 189, 248, 0)');
    ctx.fillStyle = glowGradient;
    ctx.fill();
    
    // Label Earth
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Cary, NC (Earth)', centerX, centerY + 20);
    
    // Maximum distance for scaling with logarithmic adjustment for better visualization
    const maxDistance = Math.max(...species.map(s => s.distance), 1);
    const logMaxDistance = Math.log10(maxDistance + 1);
    const baseSizeFactor = Math.min(width, height) * 0.4;
    
    // Draw distance rings
    this.drawDistanceRings(ctx, centerX, centerY, baseSizeFactor, maxDistance);
    
    // Plot each species with enhanced visuals
    species.forEach(speciesData => {
      // Get 3D coordinates
      const coords = this.getCaryCoordinates(speciesData);
      
      // Use logarithmic scale for better visualization of vastly different distances
      const logDistance = Math.log10(speciesData.distance + 1);
      const scaleFactor = baseSizeFactor * (logDistance / logMaxDistance);
      
      // Project to 2D with slight randomization for artistic effect
      const jitter = Math.random() * 5 - 2.5;
      const x = centerX + coords.x * scaleFactor / speciesData.distance + jitter;
      const y = centerY + coords.y * scaleFactor / speciesData.distance + jitter;
      
      // Calculate size (z affects size as depth perception)
      const depthFactor = Math.max(0.3, 1 - (Math.abs(coords.z) / maxDistance) * 0.7);
      const size = speciesData.size || 4;
      const adjustedSize = size * depthFactor * (1 + Math.log10(speciesData.population || 1e6) / 20);
      
      // Save position for hit testing in the main component
      speciesData.renderPosition = { x, y };
      
      // Draw glow around species
      const glowRadius = adjustedSize * 2.5;
      const glowGradient = ctx.createRadialGradient(
        x, y, adjustedSize * 0.8,
        x, y, glowRadius
      );
      glowGradient.addColorStop(0, speciesData.color?.replace('0.8', '0.5') || 'rgba(255, 200, 50, 0.5)');
      glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.beginPath();
      ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
      ctx.fillStyle = glowGradient;
      ctx.fill();
      
      // Draw species
      ctx.beginPath();
      ctx.arc(x, y, adjustedSize, 0, Math.PI * 2);
      ctx.fillStyle = speciesData.color || 'rgba(255, 200, 50, 0.8)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 0.5;
      ctx.stroke();
      
      // Draw connection line to Earth with gradient
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      
      const lineGradient = ctx.createLinearGradient(centerX, centerY, x, y);
      lineGradient.addColorStop(0, 'rgba(56, 189, 248, 0.7)');
      lineGradient.addColorStop(1, speciesData.color?.replace('0.8', '0.3') || 'rgba(255, 200, 50, 0.3)');
      
      ctx.strokeStyle = lineGradient;
      ctx.lineWidth = 0.7 * depthFactor;
      ctx.stroke();
      
      // Label with better positioning to avoid overlaps
      this.drawSpeciesLabel(ctx, speciesData, x, y, adjustedSize);
    });
    
    // Add legend with visual enhancements
    this.drawCosmicMapLegend(ctx, width, species);
  }
  
  // Helper method to create starfield background with nebula effects
  private static createStarfieldBackground(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ): void {
    // Create deep space gradient background
    const bgGradient = ctx.createRadialGradient(
      width / 2, height / 2, 0,
      width / 2, height / 2, height
    );
    bgGradient.addColorStop(0, 'rgba(15, 23, 42, 1)');
    bgGradient.addColorStop(0.5, 'rgba(15, 23, 42, 0.95)');
    bgGradient.addColorStop(1, 'rgba(3, 7, 18, 1)');
    
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);
    
    // Add nebula-like colored clouds
    const nebulaColors = [
      'rgba(139, 92, 246, 0.05)',  // Purple
      'rgba(14, 165, 233, 0.03)',  // Blue
      'rgba(249, 115, 22, 0.04)',  // Orange
      'rgba(217, 70, 239, 0.03)'   // Magenta
    ];
    
    for (let i = 0; i < 4; i++) {
      const x = width * Math.random();
      const y = height * Math.random();
      const radius = Math.min(width, height) * (0.3 + Math.random() * 0.4);
      
      const nebulaGradient = ctx.createRadialGradient(
        x, y, 0,
        x, y, radius
      );
      nebulaGradient.addColorStop(0, nebulaColors[i % nebulaColors.length]);
      nebulaGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = nebulaGradient;
      ctx.fillRect(0, 0, width, height);
    }
    
    // Add stars with varying sizes and brightness
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 1.5 + 0.5;
      const opacity = Math.random() * 0.7 + 0.3;
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.fill();
      
      // Add occasional star glow
      if (Math.random() > 0.8) {
        ctx.beginPath();
        ctx.arc(x, y, size * 3, 0, Math.PI * 2);
        const glowColor = Math.random() > 0.5 
          ? `rgba(255, 255, 255, ${opacity * 0.3})` 
          : `rgba(199, 210, 254, ${opacity * 0.3})`;
        ctx.fillStyle = glowColor;
        ctx.fill();
      }
    }
  }
  
  // Draw distance rings
  private static drawDistanceRings(
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    baseSizeFactor: number,
    maxDistance: number
  ): void {
    // Draw logarithmic distance rings
    const ringDistances = [10, 100, 1000, 10000, 100000];
    const logMaxDistance = Math.log10(maxDistance + 1);
    
    ringDistances.forEach(distance => {
      if (distance > maxDistance) return;
      
      const logDistance = Math.log10(distance + 1);
      const ringRadius = baseSizeFactor * (logDistance / logMaxDistance);
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 0.5;
      ctx.setLineDash([2, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Add distance label
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = '9px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(
        distance < 1000 ? `${distance} ly` : `${distance/1000}k ly`, 
        centerX + ringRadius * 0.7, 
        centerY - 5
      );
    });
  }
  
  // Draw species label with smart positioning
  private static drawSpeciesLabel(
    ctx: CanvasRenderingContext2D,
    speciesData: SpeciesData,
    x: number,
    y: number,
    size: number
  ): void {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    
    // Position label above or below based on position in canvas
    const labelY = y < ctx.canvas.height / 2 ? y - size - 8 : y + size + 15;
    
    // Draw name with subtle background for better readability
    const nameText = speciesData.name;
    const textWidth = ctx.measureText(nameText).width + 8;
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(x - textWidth / 2, labelY - 9, textWidth, 12);
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillText(nameText, x, labelY);
    
    // Draw distance below name
    const distanceText = speciesData.distance < 1000 
      ? `${speciesData.distance.toFixed(1)} ly` 
      : `${(speciesData.distance/1000).toFixed(1)}k ly`;
    
    const distY = y < ctx.canvas.height / 2 ? labelY + 12 : labelY + 12;
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '8px sans-serif';
    ctx.fillText(distanceText, x, distY);
  }
  
  // Draw legend for cosmic map
  private static drawCosmicMapLegend(
    ctx: CanvasRenderingContext2D,
    width: number,
    species: SpeciesData[]
  ): void {
    const padding = 10;
    const legendWidth = 180;
    const legendHeight = 70;
    const legendX = padding;
    const legendY = padding;
    
    // Create semi-transparent background for legend
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(legendX, legendY, legendWidth, legendHeight);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.strokeRect(legendX, legendY, legendWidth, legendHeight);
    
    // Add title and info
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('3D Constellation Map', legendX + 10, legendY + 20);
    
    ctx.font = '10px sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    
    const respondingSpecies = species.filter(s => s.color && s.color.includes('(132, 204, 22')).length;
    const totalSpecies = species.length;
    
    ctx.fillText(`${totalSpecies} species visualized`, legendX + 10, legendY + 38);
    ctx.fillText(`${respondingSpecies} responding`, legendX + 10, legendY + 55);
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
