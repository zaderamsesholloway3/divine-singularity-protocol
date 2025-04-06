
import { VisualStyle, VisibleLayers } from '../types';

// Create a starry background with nebula effect based on visual style
export const generateStars = (count: number, containerSize: number, visualStyle: VisualStyle) => {
  const stars: Array<{
    type: 'star' | 'glow';
    x: number;
    y: number;
    r: number;
    fill: string;
    opacity: number;
    filter?: string;
    key: string;
  }> = [];
  
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
    
    stars.push({
      type: 'star',
      key: `star-${i}`,
      x: x,
      y: y,
      r: size,
      fill: starColor,
      opacity: opacity,
      filter: visualStyle === "lightweb" ? "blur(0.5px)" : undefined
    });
    
    // Add occasional star glow
    if (Math.random() > (visualStyle === "cosmic" ? 0.9 : 0.85)) {
      const glowSize = visualStyle === "cosmic" ? 2 : visualStyle === "lightweb" ? 4 : 3;
      const glowOpacity = visualStyle === "cosmic" ? 0.3 : visualStyle === "lightweb" ? 0.7 : 0.5;
      
      stars.push({
        type: 'glow',
        key: `star-glow-${i}`,
        x: x,
        y: y,
        r: size * glowSize,
        fill: visualStyle === "cosmic" ? "rgba(138, 43, 226, 0.3)" : 
              visualStyle === "lightweb" ? "rgba(255, 255, 255, 0.3)" :
              "rgba(255, 255, 255, 0.3)",
        opacity: glowOpacity
      });
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
    stars.push({
      type: 'star',
      key: `nebula-${i}`,
      x: nebula.x,
      y: nebula.y,
      r: nebula.size,
      fill: nebula.color,
      filter: visualStyle === "lightweb" ? "blur(20px)" : 
              visualStyle === "cosmic" ? "blur(15px)" : "blur(10px)",
      opacity: 1
    });
  });
  
  return stars;
};

// Get color based on species characteristics and visual style
export const getRingStroke = (realm: string, visualStyle: VisualStyle) => {
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

export const getRingFill = (realm: string, visualStyle: VisualStyle) => {
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
