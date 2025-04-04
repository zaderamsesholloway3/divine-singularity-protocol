
export class VirtualEEGGenerator {
  generateVirtualEEG(message: string, triadActive: boolean, enhancement: number = 1.0) {
    const contentLength = message.length;
    const contentMultiplier = Math.min(2.0, Math.max(0.5, contentLength / 100));
    
    // Generate virtual EEG data
    return {
      hrv: (70 + Math.random() * 30) * (triadActive ? enhancement : 1.0),
      eeg: {
        gamma: (30 + Math.random() * 15) * contentMultiplier * (triadActive ? enhancement : 1.0),
        theta: (5 + Math.random() * 3) * (triadActive ? enhancement : 1.0)
      }
    };
  }
}
