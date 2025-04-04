import { EmotionalState, BiofeedbackResult } from '@/hooks/types/quantum-entanglement';

export class BiofeedbackSimulator {
  private static readonly emotions: EmotionalState[] = [
    'neutral', 'calm', 'focused', 'peaceful', 'excited', 
    'joyful', 'concerned', 'uncertain', 'distressed',
    'joy', 'peace', 'love', 'awe', 'contemplation'
  ];

  static assessEmotionalState(userId: string): BiofeedbackResult {
    // Simulate biofeedback analysis
    const hrvValue = 65 + Math.random() * 35; // 65-100
    const gammaValue = 30 + Math.random() * 15; // 30-45
    const thetaValue = 5 + Math.random() * 3; // 5-8
    
    // Determine if it's coherent (HRV > 80 is good)
    const isCoherent = hrvValue > 80;
    
    // Pick a dominant emotion based on values
    const emotionIndex = Math.floor(Math.random() * this.emotions.length);
    const dominantEmotion = this.emotions[emotionIndex];
    
    return {
      coherent: isCoherent,
      hrv: hrvValue,
      eeg: {
        gamma: gammaValue,
        theta: thetaValue
      },
      metrics: {
        hrv: hrvValue,
        eeg: {
          gamma: gammaValue,
          theta: thetaValue
        }
      },
      dominantEmotion
    };
  }
  
  static generateBiofeedbackTimeSeries(duration: number = 60, interval: number = 1) {
    const dataPoints = Math.floor(duration / interval);
    const hrvSeries: number[] = [];
    const gammaSeries: number[] = [];
    const thetaSeries: number[] = [];
    
    let baseHrv = 75 + (Math.random() * 10 - 5);
    let baseGamma = 35 + (Math.random() * 5 - 2.5);
    let baseTheta = 6.5 + (Math.random() * 1 - 0.5);
    
    for (let i = 0; i < dataPoints; i++) {
      // Add some natural variation
      baseHrv += (Math.random() * 4 - 2);
      baseGamma += (Math.random() * 2 - 1);
      baseTheta += (Math.random() * 0.6 - 0.3);
      
      // Keep within reasonable ranges
      baseHrv = Math.max(60, Math.min(100, baseHrv));
      baseGamma = Math.max(25, Math.min(50, baseGamma));
      baseTheta = Math.max(4, Math.min(9, baseTheta));
      
      hrvSeries.push(baseHrv);
      gammaSeries.push(baseGamma);
      thetaSeries.push(baseTheta);
    }
    
    return {
      hrv: hrvSeries,
      gamma: gammaSeries,
      theta: thetaSeries,
      timestamps: [...Array(dataPoints)].map((_, i) => i * interval),
      coherenceScore: (Math.random() * 0.4 + 0.6) // 0.6-1.0
    };
  }
}

export default BiofeedbackSimulator;
