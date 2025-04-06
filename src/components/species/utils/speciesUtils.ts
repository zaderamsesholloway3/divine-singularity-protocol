import { Species, VisibleLayers } from "../types";

/**
 * Determine the node size based on species properties
 */
export const getNodeSize = (species: Species, selected: boolean) => {
  // Base size
  let baseSize = 3; 
  
  // Adjust based on intelligence
  if (species.intelligence) {
    baseSize += species.intelligence / 50;
  }
  
  // Adjust for faith quotient if it exists
  if (species.fq !== undefined) {
    baseSize += species.fq * 2;
  }
  
  // Increase size if selected
  if (selected) {
    baseSize *= 1.5;
  }
  
  return Math.max(2, Math.min(8, baseSize));
};

/**
 * Get node color based on species properties
 */
export const getNodeColor = (species: Species, selected: boolean, hovered: boolean) => {
  // Custom color specified in the species data
  if (species.color) {
    if (selected) return `${species.color}`;
    if (hovered) return `${species.color}90`;
    return `${species.color}70`;
  }
  
  // Default colors based on the realm
  if (species.responding !== undefined) {
    if (species.responding) {
      if (selected) return "#84cc16";
      if (hovered) return "#84cc16cc";
      return "#84cc1690";
    } else {
      if (selected) return "#ef4444";
      if (hovered) return "#ef4444cc";
      return "#ef444490";  
    }
  }
  
  // Fallback colors based on realm
  if (species.realm === "Existence") {
    if (selected) return "#3b82f6";
    if (hovered) return "#3b82f6cc";
    return "#3b82f690";
  } else if (species.realm === "Non-Existence") {
    if (selected) return "#8b5cf6";
    if (hovered) return "#8b5cf6cc";
    return "#8b5cf690";
  } else if (species.realm === "New-Existence") {
    if (selected) return "#06b6d4";
    if (hovered) return "#06b6d4cc";
    return "#06b6d490";
  } else if (species.realm === "Divine") {
    if (selected) return "#eab308";
    if (hovered) return "#eab308cc";
    return "#eab30890";
  }
  
  // Default case - should never reach here
  return selected ? "#ffffff" : "#ffffff90";
};

/**
 * Get species color for visualization
 */
export const getSpeciesColor = (species: Species, visualStyle: string) => {
  // Base colors based on realm
  if (species.realm === "Existence") {
    return visualStyle === "cosmic" ? "#3b82f690" : "#3b82f680";
  } else if (species.realm === "Non-Existence") {
    return visualStyle === "cosmic" ? "#8b5cf690" : "#8b5cf680";
  } else if (species.realm === "New-Existence") {
    return visualStyle === "cosmic" ? "#06b6d490" : "#06b6d480";
  } else if (species.realm === "Divine") {
    return visualStyle === "cosmic" ? "#eab30890" : "#eab30880";
  }
  
  // Default color
  return species.color || "#ffffff80";
};

/**
 * Determine if a species should be visible based on filter settings
 */
export const isSpeciesVisible = (species: Species, visibleLayers: VisibleLayers): boolean => {
  if (species.realm === "Existence" && !visibleLayers.existence) {
    return false;
  }
  
  if (species.realm === "Non-Existence" && !visibleLayers.nonExistence) {
    return false;
  }
  
  if (species.realm === "New-Existence" && !visibleLayers.newExistence) {
    return false;
  }
  
  if (species.realm === "Divine" && !visibleLayers.divine) {
    return false;
  }
  
  return true;
};

/**
 * Get filter class for species based on its realm
 */
export const getSpeciesFilter = (species: Species, visualStyle: string): string => {
  if (species.realm === "Existence") {
    return visualStyle === "cosmic" 
      ? "filter drop-shadow(0 0 2px rgba(59, 130, 246, 0.7))"
      : "";
  } 
  
  if (species.realm === "Non-Existence") {
    return visualStyle === "cosmic" 
      ? "filter drop-shadow(0 0 2px rgba(139, 92, 246, 0.7))"
      : "";
  }
  
  if (species.realm === "New-Existence") {
    return visualStyle === "cosmic" 
      ? "filter drop-shadow(0 0 2px rgba(6, 182, 212, 0.7))"
      : "";
  }
  
  if (species.realm === "Divine") {
    return visualStyle === "cosmic" 
      ? "filter drop-shadow(0 0 3px rgba(234, 179, 8, 0.8))"
      : "";
  }
  
  return "";
};
