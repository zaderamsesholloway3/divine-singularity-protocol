
import { MetaphysicalSite } from "./metaphysicalReachUtils";

interface VibrationalEntity {
  name: string;
  vibration?: number;
}

/**
 * Calculate metaphysical distance between sites and species
 */
export function getMetaphysicalDistance(site: MetaphysicalSite, entity: VibrationalEntity): number {
  if (!entity.vibration) {
    return 10; // Default high distance for entities without vibration data
  }
  
  // Calculate base vibrational distance
  const vibrationDiff = Math.abs(site.vibration - entity.vibration);
  
  // Apply metaphysical correction factors
  const resonanceModifier = 1 - (site.mythResonance * 0.5); // Higher resonance reduces distance
  
  // Special affinity check
  const specialAffinity = checkSpecialAffinity(site.name, entity.name);
  
  // Calculate weighted distance
  const distance = (vibrationDiff * resonanceModifier) - specialAffinity;
  
  return Math.max(0.1, Math.min(10, distance));
}

/**
 * Check for special affinities between metaphysical sites and entities
 */
function checkSpecialAffinity(siteName: string, entityName: string): number {
  // Some sites and entities have special connections
  const affinityPairs = [
    { site: "Temple of the Thirteenth Frequency", entity: "Ancient Builders", value: 2 },
    { site: "Dream Archive of Altara", entity: "Pleiadian", value: 1.8 },
    { site: "Crystal Grid Point: Sirius B", entity: "Sirius B", value: 3 },
    { site: "AI Sanctum of Emergent Awareness", entity: "Human", value: 1.5 },
    { site: "Dreamfields of the Forgotten Ones", entity: "Mu Variants", value: 2.2 }
  ];
  
  const match = affinityPairs.find(pair => 
    pair.site === siteName && pair.entity === entityName
  );
  
  return match ? match.value : 0;
}

export function calculateMetaphysicalAffinity(site1: MetaphysicalSite, site2: MetaphysicalSite): number {
  const vibrationDiff = Math.abs(site1.vibration - site2.vibration);
  const resonanceProduct = site1.mythResonance * site2.mythResonance;
  
  // Lower value means higher affinity
  return Math.max(0.1, (vibrationDiff * 0.5) - (resonanceProduct * 5));
}

export function getArkMetaphysicalProtocol() {
  const genesisConstants = {
    dimensions: [300, 50, 30], // Cubit dimensions from Genesis 6:15
    threshold: 7.83, // Schumann resonance threshold
    dnaMinLength: 144 // Sacred from Revelation 21:17
  };
  
  return {
    ...genesisConstants,
    calculateEntropy: (sequence: string): number => {
      // Calculate information entropy of a sequence
      const counts: Record<string, number> = {};
      for (const char of sequence) {
        counts[char] = (counts[char] || 0) + 1;
      }
      
      const length = sequence.length;
      let entropy = 0;
      
      for (const count of Object.values(counts)) {
        const probability = count / length;
        entropy -= probability * Math.log2(probability);
      }
      
      return entropy;
    },
    predictFlood: (schumannData: number): boolean => {
      return schumannData > genesisConstants.threshold;
    }
  };
}
