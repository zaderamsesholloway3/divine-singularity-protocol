
import { ArchetypalMatch } from '@/utils/alien-scanner/ArchetypalMimicryScanner';

export interface QuantumLinguisticScore {
  quantumScore: number;
  tacticalStructures: string[];
  archetypalMimicry: ArchetypalMatch[];
  symbolsDetected: string[];
  warning: string;
}
