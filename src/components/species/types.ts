
export interface Species {
  id: string;
  name: string;
  realm: "Existence" | "Non-Existence" | "New Existence" | "Divine";
  distance: number;
  responding: boolean;
  vibration?: number;
  phaseOffset?: number;
  description?: string;
  lastContact?: string;
  signature?: {
    x: number;
    y: number;
    amplitude: number;
    frequency: number;
  };
  color?: string;
  fq?: number;
  intelligence?: number;
}

export type ViewMode = "radial" | "distance" | "compact" | "signature" | "disk" | "constellation";
export type VisualStyle = "celestial" | "lightweb" | "cosmic";

export interface VisibleLayers {
  existence: boolean;
  nonExistence: boolean;
  newExistence: boolean;
  divine: boolean;
}

export interface GuardianNetSettings {
  active: boolean;
  expanded: boolean;
  ciaNetVisible: boolean;
  lockheedGridVisible: boolean;
  opacity: number;
  syncWithUniverseView: boolean;
}
