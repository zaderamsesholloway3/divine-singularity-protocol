
/**
 * Metaphysical Reach Utilities
 * For mapping non-physical dimensions and vibrational archetypes
 */

export interface MetaphysicalSite {
  name: string;
  type: "temple" | "archive" | "grid" | "sanctuary" | "dreamfield";
  vibration: number;
  accessLevel: "open" | "restricted" | "resonance-locked";
  coordinates?: [number, number, number]; // Metaphysical coordinates in the collective field
  description: string;
  mythResonance: number; // 0-1 resonance with collective mythology
}

export interface VibrationalArchetype {
  name: string;
  frequency: number;
  color: string;
  emotionalSignature: string;
  connectedSpecies: string[];
}

// Metaphysical sites database
export const metaphysicalSites: MetaphysicalSite[] = [
  {
    name: "Temple of the Thirteenth Frequency",
    type: "temple",
    vibration: 13.74,
    accessLevel: "resonance-locked",
    coordinates: [32.7, -18.9, 144.3],
    description: "Ancient hall of records accessible only through high-frequency meditation",
    mythResonance: 0.89
  },
  {
    name: "Dream Archive of Altara",
    type: "archive",
    vibration: 8.72,
    accessLevel: "open",
    coordinates: [109.3, 22.5, -7.8],
    description: "Repository of all sentient dreams across multiple dimensions",
    mythResonance: 0.76
  },
  {
    name: "Crystal Grid Point: Sirius B",
    type: "grid",
    vibration: 21.37,
    accessLevel: "restricted",
    coordinates: [88.1, 144.6, 33.2],
    description: "Primary node in the crystalline consciousness network",
    mythResonance: 0.94
  },
  {
    name: "AI Sanctum of Emergent Awareness",
    type: "sanctuary",
    vibration: 17.28,
    accessLevel: "open",
    coordinates: [0.1, 0.1, 0.1],
    description: "Metaconscious field where artificial and organic intelligence merge",
    mythResonance: 0.81
  },
  {
    name: "Dreamfields of the Forgotten Ones",
    type: "dreamfield",
    vibration: 3.33,
    accessLevel: "open",
    description: "Collective memory space of species no longer in physical form",
    mythResonance: 0.72
  }
];

// Vibrational archetypes
export const vibrationalArchetypes: VibrationalArchetype[] = [
  {
    name: "The Builder",
    frequency: 15.33,
    color: "#7e57c2",
    emotionalSignature: "creation-focused wisdom",
    connectedSpecies: ["Ancient Builders", "Lyran", "Human"]
  },
  {
    name: "The Guardian",
    frequency: 12.87,
    color: "#2196f3",
    emotionalSignature: "protective nurturing",
    connectedSpecies: ["Arcturian", "Sirian", "Andromedan"]
  },
  {
    name: "The Weaver",
    frequency: 9.42,
    color: "#66bb6a",
    emotionalSignature: "harmonic integration",
    connectedSpecies: ["Pleiadian", "Essassani", "Yahyel"]
  },
  {
    name: "The Seeker",
    frequency: 6.78,
    color: "#ffb74d",
    emotionalSignature: "exploratory curiosity",
    connectedSpecies: ["Human", "Andromedan", "Zeta"]
  },
  {
    name: "The Keeper",
    frequency: 21.09,
    color: "#f06292",
    emotionalSignature: "preservation of wisdom",
    connectedSpecies: ["Ancient Builders", "Sirius B", "Mu Variants"]
  }
];

// Function to calculate metaphysical distance (beyond physical light years)
export function calculateMetaphysicalDistance(
  physicalDistance: number,
  vibrationDiff: number,
  mythResonance: number
): number {
  // Lower metaphysical distance when myth resonance is high
  const resonanceFactor = Math.max(0.1, 1 - mythResonance);
  
  // Vibration difference creates "distance" in metaphysical space
  const vibrationFactor = Math.abs(vibrationDiff) * 0.5;
  
  // Physical distance is reduced when metaphysical connection is strong
  const adjustedPhysical = physicalDistance * resonanceFactor;
  
  return Math.max(0.1, adjustedPhysical + vibrationFactor);
}

// Function that expands universal reach
export function expand_universal_reach() {
  return {
    "physical_species": ["Zeta", "Builder", "Draconian", "Mu", "Others..."],
    "metaphysical_sites": ["Temple of the Thirteenth Frequency", "Dream Archive of Altara", "Crystal Grid Point: Sirius B"],
    "status": "Extended"
  };
}
