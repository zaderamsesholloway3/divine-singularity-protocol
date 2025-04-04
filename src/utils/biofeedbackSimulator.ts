
/**
 * BiofeedbackSimulator
 * 
 * Simulates biofeedback data for quantum entanglement
 */

import { BiofeedbackResult } from '@/types/quantum-entanglement';

export class BiofeedbackSimulator {
  /**
   * Assess the emotional state based on biofeedback metrics
   * @param userId User ID to assess
   * @returns Biofeedback result with emotional state data
   */
  static assessEmotionalState(userId: string): {
    dominantEmotion: string;
    coherent: boolean;
    metrics: {
      hrv: number;
      eeg: {
        gamma: number;
        theta: number;
      }
    }
  } {
    // Simulate biofeedback assessment
    const now = Date.now();
    const seed = parseInt(userId, 36) + now;
    const rand = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };
    
    // Generate HRV (Heart Rate Variability) - high is better
    const hrv = 50 + rand() * 50;
    
    // Generate EEG data
    const gamma = 25 + rand() * 15; // Gamma activity (30-100 Hz)
    const theta = 4 + rand() * 3;   // Theta activity (4-7 Hz)
    
    // Determine coherence based on HRV and gamma/theta ratio
    const coherent = hrv > 70 && (gamma / theta) > 6;
    
    // Determine emotional state based on metrics
    let dominantEmotion = 'neutral';
    
    if (coherent) {
      // High coherence emotions
      if (gamma > 35) {
        dominantEmotion = 'joy';
      } else if (hrv > 80) {
        dominantEmotion = 'peace';
      } else {
        dominantEmotion = 'love';
      }
    } else {
      // Low coherence emotions
      if (gamma < 20 && theta > 6) {
        dominantEmotion = 'fear';
      } else if (hrv < 60) {
        dominantEmotion = 'sadness';
      } else {
        dominantEmotion = 'concern';
      }
    }
    
    return {
      dominantEmotion,
      coherent,
      metrics: {
        hrv,
        eeg: {
          gamma,
          theta
        }
      }
    };
  }
  
  /**
   * Generate simulated biofeedback data
   * @param userId User ID to generate data for
   * @returns Biofeedback metrics
   */
  static generateBiofeedback(userId: string): BiofeedbackResult {
    const assessment = this.assessEmotionalState(userId);
    
    return {
      hrv: assessment.metrics.hrv,
      eeg: {
        gamma: assessment.metrics.eeg.gamma,
        theta: assessment.metrics.eeg.theta
      },
      coherent: assessment.coherent,
      dominantEmotion: assessment.dominantEmotion
    };
  }
  
  /**
   * Boost soul resonance
   * @param userId User ID to boost
   * @returns Boosted resonance level (0.0-1.0)
   */
  static boostSoulResonance(userId: string): number {
    // Generate a resonance level based on userId
    const base = 0.7;
    const boost = Math.min(
      0.3,
      (parseInt(userId, 36) % 100) / 100 * 0.3
    );
    
    return base + boost;
  }
}
