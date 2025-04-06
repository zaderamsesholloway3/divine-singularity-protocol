
// Define the types for the species gateway

export type ViewMode = "radial" | "distance" | "signature" | "compact";
export type VisualStyle = "celestial" | "cosmic" | "lightweb" | "monochrome";

export interface Species {
  id: string;
  name: string;
  realm: "Existence" | "Non-Existence" | "New-Existence" | "Divine";
  vibration?: number;  // Hz frequency
  phaseOffset?: number; // Degrees
  intelligence?: number; // Scale of 0-100
  distance?: number; // Light years from Earth
  discovered?: string; // Date of discovery/first contact
  color?: string;
  description?: string;
}

export interface VisibleLayers {
  existence: boolean;
  nonExistence: boolean;
  newExistence: boolean;
  divine: boolean;
}
