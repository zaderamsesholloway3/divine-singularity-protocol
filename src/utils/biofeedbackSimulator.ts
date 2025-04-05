
export class BiofeedbackSimulator {
  generateRandomBiofeedback() {
    // Generate random biofeedback data
    const heartRate = Math.floor(60 + Math.random() * 40); // 60-100 bpm
    
    // Brain wave types
    const brainWaveTypes = ['Alpha', 'Beta', 'Theta', 'Delta', 'Gamma'];
    const brainWaves = brainWaveTypes[Math.floor(Math.random() * brainWaveTypes.length)];
    
    // Galvanic skin response (0-1 scale)
    const galvanicSkinResponse = parseFloat((Math.random() * 0.7 + 0.1).toFixed(2));
    
    return {
      heartRate,
      brainWaves,
      galvanicSkinResponse
    };
  }
}
