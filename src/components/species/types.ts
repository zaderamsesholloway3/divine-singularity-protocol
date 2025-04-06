
export type VisualStyle = "celestial" | "lightweb" | "cosmic";
export type ViewMode = "disk" | "constellation" | "radial" | "signature";

export interface Species {
  name: string;
  distance: number;
  responding: boolean;
  realm: string;
  location?: [number, number];
  vibration?: number;
  population?: number;
  phaseOffset?: number;
  fq?: number;
  archetype?: string;
}

export interface VisibleLayers {
  existence: boolean;
  nonExistence: boolean;
  newExistence: boolean;
  divine: boolean;
}

