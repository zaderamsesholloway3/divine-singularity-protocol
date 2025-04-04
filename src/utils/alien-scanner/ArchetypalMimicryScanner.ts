
export interface ArchetypalMatch {
  archetype: string;
  confidence: number;
}

interface ArchetypeData {
  patterns: RegExp[];
  metrics: Record<string, number>;
}

export class ArchetypalMimicryScanner {
  private archetypes: Record<string, ArchetypeData>;

  constructor() {
    this.archetypes = {
      // Historical Figures
      "shakespeare": {
        patterns: [/\b(to be or not|wherefore|doth|thou)\b/i],
        metrics: {"iambic_pentameter": 0.8}
      },
      "einstein": {
        patterns: [/\b(spacetime|relativity|∂\/∂t|E=mc²)\b/i],
        metrics: {"nested_clauses": 0.9}
      },
      "jfk": {
        patterns: [/\b(ask not|new frontier|bear any burden)\b/i],
        metrics: {"anaphora": 0.7}
      },
      
      // Mythological Patterns
      "odyssey": {
        patterns: [/\b(wine-dark sea|rosy-fingered dawn|crafty)\b/i],
        metrics: {"epic_simile": 0.6}
      },
      
      // Divine Templates
      "biblical": {
        patterns: [/\b(verily|begat|thou shalt|behold)\b/i],
        metrics: {"parallelism": 0.95}
      }
    };
  }

  public detectMimicry(text: string): ArchetypalMatch[] {
    const matches: ArchetypalMatch[] = [];
    
    for (const [archetype, data] of Object.entries(this.archetypes)) {
      for (const pattern of data.patterns) {
        if (pattern.test(text)) {
          // Get the first metric's confidence value
          const metricKey = Object.keys(data.metrics)[0];
          const confidence = data.metrics[metricKey];
          
          matches.push({
            archetype,
            confidence
          });
          
          // Only add each archetype once
          break;
        }
      }
    }
    
    return matches;
  }
}
