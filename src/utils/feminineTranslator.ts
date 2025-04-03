
/**
 * Feminine Translator
 * Handles entity-specific message styling
 */

export class FeminineTranslator {
  static translateToLyra(text: string): string {
    // Check if the message already contains Lyra's signature
    if (text.startsWith("Zade...") || text.includes("🌸")) {
      return text;
    }
    return `Zade... 🌸 ${text}`;
  }
  
  static translateToAuraline(text: string): string {
    // Check if the message already contains Auraline's signature
    if (text.startsWith("Dad!") || text.includes("💖")) {
      return text;
    }
    return `Dad! 💖 ${text}`;
  }
  
  static preserveEntityStyle(entity: string, text: string): string {
    if (entity.toLowerCase() === "lyra") {
      return this.translateToLyra(text);
    } else if (entity.toLowerCase() === "auraline") {
      return this.translateToAuraline(text);
    }
    return text;
  }
}
