import { Species, VisibleLayers, VisualStyle } from '../types';

/**
 * Get species highlight score based on properties
 */
export const getSpeciesHighlightScore = (species: Species): number => {
  let score = 0;
  
  // Add score based on intelligence if available
  if (species.intelligence !== undefined) {
    score += Math.min(species.intelligence * 5, 30);
  }
  
  // Add score based on frequency quotient if available
  if (species.fq !== undefined) {
    score += Math.min(species.fq * 20, 40);
  }
  
  // Add score based on vibration if available
  if (species.vibration !== undefined) {
    score += Math.min(species.vibration, 15);
  }
  
  // Active species get bonus
  if (species.responding) {
    score += 20;
  }
  
  return Math.min(score, 100);
}

/**
 * Get color for species based on properties and visual style
 */
export const getSpeciesColor = (species: Species, visualStyle: VisualStyle): string => {
  // Use explicit color if available
  if (species.color) {
    return visualStyle === "cosmic" ? species.color + "cc" : 
           visualStyle === "lightweb" ? species.color + "ee" :
           species.color;
  }
  
  // Otherwise generate color based on realm and responding status
  switch (species.realm) {
    case "Existence":
      return species.responding 
        ? visualStyle === "cosmic" ? "#50ff50" : "#00ff00"
        : visualStyle === "cosmic" ? "#308830" : "#008800";
    
    case "Non-Existence":
      return species.responding
        ? visualStyle === "cosmic" ? "#ff50ff" : "#ff00ff"
        : visualStyle === "cosmic" ? "#883088" : "#880088";
    
    case "New Existence":
      return species.responding
        ? visualStyle === "cosmic" ? "#5050ff" : "#0000ff"
        : visualStyle === "cosmic" ? "#303088" : "#000088";
    
    case "Divine":
      return species.responding
        ? visualStyle === "cosmic" ? "#ffff50" : "#ffff00"
        : visualStyle === "cosmic" ? "#888830" : "#888800";
    
    default:
      return species.responding ? "#ffffff" : "#888888";
  }
};

/**
 * Get the glow color for a species in cosmic mode
 */
export const getSpeciesGlowColor = (species: Species): string => {
  switch (species.realm) {
    case "Existence":
      return "rgba(0, 255, 0, 0.6)";
    case "Non-Existence":
      return "rgba(255, 0, 255, 0.6)";
    case "New Existence":
      return "rgba(0, 0, 255, 0.6)";
    case "Divine":
      return "rgba(255, 255, 0, 0.6)";
    default:
      return "rgba(255, 255, 255, 0.6)";
  }
};

/**
 * Check if a species should be visible based on layer filters
 */
export const isSpeciesVisible = (species: Species, layers: VisibleLayers): boolean => {
  switch (species.realm) {
    case "Existence":
      return layers.existence;
    case "Non-Existence":
      return layers.nonExistence;
    case "New Existence":
      return layers.newExistence;
    case "Divine":
      return layers.divine;
    default:
      return true;
  }
};

/**
 * Get border style for a species node
 */
export const getSpeciesNodeStyle = (
  species: Species, 
  isSelected: boolean, 
  isHovered: boolean, 
  visualStyle: VisualStyle
): React.CSSProperties => {
  const baseColor = species.color || getSpeciesColor(species, visualStyle);
  
  return {
    backgroundColor: baseColor,
    boxShadow: visualStyle === "cosmic" 
      ? `0 0 8px ${baseColor}aa` 
      : visualStyle === "lightweb"
      ? `0 0 5px ${baseColor}88`
      : "none",
    border: isSelected 
      ? `2px solid white` 
      : isHovered 
      ? `1px solid rgba(255, 255, 255, 0.7)` 
      : "none",
    opacity: species.responding ? 1 : 0.7,
  };
};

/**
 * Get a readable name for the realm
 */
export const getRealmDisplayName = (realm: string): string => {
  switch (realm) {
    case "Existence":
      return "Existence Realm";
    case "Non-Existence":
      return "Non-Existence Realm";
    case "New Existence":
      return "New Existence Realm";
    case "Divine":
      return "Divine Realm";
    default:
      return realm;
  }
};
