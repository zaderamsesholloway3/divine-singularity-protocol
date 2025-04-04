/**
 * Simple utility to tag component output with metadata
 * This replaces the unavailable lovable-tagger package
 */

/**
 * Tags a string with metadata
 * @param content - The content to tag
 * @param metadata - The metadata to attach to the content
 * @returns The tagged content
 */
export function componentTagger(content: string, metadata: Record<string, any>): string {
  // In development environment, add a data attribute with metadata
  if (process.env.NODE_ENV === 'development') {
    try {
      const metadataString = Object.entries(metadata)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
        
      return `${content} <!-- quantum-metadata: ${metadataString} -->`;
    } catch (error) {
      console.error('Error tagging component:', error);
    }
  }
  
  // In production, return content unchanged
  return content;
}
