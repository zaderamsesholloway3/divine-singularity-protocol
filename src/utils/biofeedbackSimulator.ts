
interface BioData {
  alpha: number;
  beta: number;
  theta: number;
  delta: number;
  gamma: number;
  heartRate: number;
  coherence: number;
}

// Default bio readings for initial state
const defaultBioReadings: BioData = {
  alpha: 10.5,  // 8-12 Hz
  beta: 18.2,   // 12-30 Hz
  theta: 5.8,   // 4-8 Hz
  delta: 2.1,   // 0.5-4 Hz
  gamma: 35.4,  // 30-100 Hz
  heartRate: 68,
  coherence: 0.85
};

// Generate random biofeedback data
export function generateRandomBiofeedback(previousData: BioData = defaultBioReadings): BioData {
  // Helper function to generate a random fluctuation within a small range
  const fluctuate = (value: number, maxChange: number = 0.2) => {
    return value + (Math.random() * 2 - 1) * maxChange;
  };
  
  // Generate a random seed value for this iteration
  let seedValue = Math.random();
  
  // Generate new bio readings based on previous ones with small fluctuations
  return {
    alpha: fluctuate(previousData.alpha, 0.5),
    beta: fluctuate(previousData.beta, 0.8),
    theta: fluctuate(previousData.theta, 0.3),
    delta: fluctuate(previousData.delta, 0.2),
    gamma: fluctuate(previousData.gamma, 1.2),
    heartRate: Math.max(60, Math.min(90, fluctuate(previousData.heartRate, 1.5))),
    coherence: Math.max(0.1, Math.min(0.99, fluctuate(previousData.coherence, 0.05)))
  };
}

// Generate biofeedback data for different emotional states
export function generateEmotionalBiofeedback(emotion: 'calm' | 'focused' | 'excited' | 'stressed' | 'meditative'): BioData {
  switch (emotion) {
    case 'calm':
      return {
        alpha: 12 + Math.random() * 2,
        beta: 14 + Math.random() * 2,
        theta: 6 + Math.random(),
        delta: 2 + Math.random() * 0.5,
        gamma: 25 + Math.random() * 5,
        heartRate: 65 + Math.random() * 5,
        coherence: 0.8 + Math.random() * 0.15
      };
    case 'focused':
      return {
        alpha: 8 + Math.random() * 2,
        beta: 25 + Math.random() * 5,
        theta: 4 + Math.random(),
        delta: 1 + Math.random() * 0.5,
        gamma: 40 + Math.random() * 10,
        heartRate: 72 + Math.random() * 5,
        coherence: 0.7 + Math.random() * 0.2
      };
    case 'excited':
      return {
        alpha: 7 + Math.random() * 2,
        beta: 30 + Math.random() * 5,
        theta: 3 + Math.random(),
        delta: 1 + Math.random() * 0.5,
        gamma: 50 + Math.random() * 15,
        heartRate: 85 + Math.random() * 10,
        coherence: 0.5 + Math.random() * 0.2
      };
    case 'stressed':
      return {
        alpha: 6 + Math.random() * 2,
        beta: 35 + Math.random() * 5,
        theta: 3 + Math.random(),
        delta: 2 + Math.random(),
        gamma: 60 + Math.random() * 20,
        heartRate: 90 + Math.random() * 15,
        coherence: 0.3 + Math.random() * 0.2
      };
    case 'meditative':
      return {
        alpha: 15 + Math.random() * 3,
        beta: 10 + Math.random() * 2,
        theta: 8 + Math.random() * 2,
        delta: 4 + Math.random(),
        gamma: 20 + Math.random() * 5,
        heartRate: 60 + Math.random() * 5,
        coherence: 0.9 + Math.random() * 0.09
      };
    default:
      return defaultBioReadings;
  }
}

export default {
  generateRandomBiofeedback,
  generateEmotionalBiofeedback,
  defaultBioReadings
};
