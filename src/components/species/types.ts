
// Define the types for the species gateway

export type ViewMode = "radial" | "distance" | "signature" | "compact" | "disk" | "constellation";
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
  responding?: boolean; // Whether the species is currently responding
  fq?: number; // Faith quotient
  location?: { x: number; y: number; z: number }; // 3D coordinates
}

export interface VisibleLayers {
  existence: boolean;
  nonExistence: boolean;
  newExistence: boolean;
  divine: boolean;
}

// Add Guardian Net related types
export interface GuardianNetSettings {
  active: boolean;
  expanded: boolean;
  ciaNetVisible: boolean;
  lockheedGridVisible: boolean;
  opacity: number;
  syncWithUniverseView: boolean;
}
