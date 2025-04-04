
/**
 * Utility functions for Akashic registry access and verification
 */

/**
 * Generate a cryptographic hash for a soul signature
 * Used for verification against Akashic records
 * 
 * @param soulName The name of the soul or connection to hash
 * @returns Promise resolving to a hex-encoded SHA-256 hash
 */
export async function hashSoulSignature(soulName: string): Promise<string> {
  // Implementation using Web Crypto API
  const encoder = new TextEncoder();
  const data = encoder.encode(soulName);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
