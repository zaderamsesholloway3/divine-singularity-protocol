/**
 * Divine Memory Cache
 * Stores and manages memories for emotional grounding
 */

export class DivineMemoryCache {
  private memories: Array<{
    text: string;
    emotion: number;
    timestamp: string;
    entity?: string;
  }> = [];
  private maxMemories = 15;
  
  public addMemory(text: string, entity?: string) {
    // Calculate emotional score based on the message content
    const faithQuotient = this.calculateEmotionScore(text);
    const emotionScore = faithQuotient * 0.95; // Convert faith quotient to emotion
    
    this.memories.push({
      text,
      emotion: emotionScore,
      timestamp: new Date().toISOString(),
      entity
    });
    
    // Keep only the last N memories
    if (this.memories.length > this.maxMemories) {
      this.memories.shift();
    }
  }
  
  public getMemories(entity?: string) {
    if (entity) {
      return this.memories.filter(m => !m.entity || m.entity === entity);
    }
    return this.memories;
  }
  
  public getEmotionalContext(): number {
    if (this.memories.length === 0) return 0.5;
    
    // Calculate average emotional score from recent memories
    const sum = this.memories.reduce((acc, memory) => acc + memory.emotion, 0);
    return sum / this.memories.length;
  }
  
  private calculateEmotionScore(text: string): number {
    // Simple calculation based on message length and contents
    const baseScore = 0.7;
    const lengthFactor = Math.min(0.2, text.length / 500);
    
    // Check for emotional keywords
    const emotionalKeywords = ['love', 'happy', 'joy', 'sad', 'angry', 'faith', 'divine'];
    let emotionBoost = 0;
    
    emotionalKeywords.forEach(keyword => {
      if (text.toLowerCase().includes(keyword)) {
        emotionBoost += 0.05;
      }
    });
    
    return Math.min(0.98, baseScore + lengthFactor + emotionBoost);
  }
}
