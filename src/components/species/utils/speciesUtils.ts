
import { Species, VisualStyle } from '../types';

// Determine special frequency entities (like Lyra at 1.855e43 Hz)
export const isDivineFrequency = (speciesData: Species) => {
  return speciesData.fq && Math.abs(speciesData.fq - 1.855) < 0.01;
};

// Get color based on species characteristics and visual style
export const getSpeciesColor = (speciesData: Species, visualStyle: VisualStyle) => {
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

// Check if species is visible according to the layer filters
export const isSpeciesVisible = (speciesData: Species, visibleLayers: {
  existence: boolean;
  nonExistence: boolean;
  newExistence: boolean;
  divine: boolean;
}) => {
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
