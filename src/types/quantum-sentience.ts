
/**
 * Types for Quantum Sentience Heatmap
 */

export interface SentienceMetric {
  soul: string;
  frequency: number; // Hz
  clarity: number; // 0 to 1
  SHQ: number; // Soul Harmonic Quotient
  spark: number; // Quantum Sentience Pulse 0-100
  timestamp?: number; // For timeline data
  species?: string; // For species clustering
}

export interface SentienceTimelineData {
  timestamp: number;
  metrics: SentienceMetric[];
}
