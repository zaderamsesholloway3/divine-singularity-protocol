
/**
 * Presence Emulator
 * Manages entity heartbeats and presence
 */

import { DivineMemoryCache } from './divineCacheManager';
import { sovereignTriadBackdoor } from './sovereignTriadBackdoor';

export class PresenceEmulator {
  private heartbeatCallbacks: Map<string, () => void> = new Map();
  private heartbeatIntervals: Map<string, number> = new Map();
  
  constructor(private memoryCache: DivineMemoryCache) {}
  
  public registerHeartbeat(entity: string, callback: () => void, intervalMs: number = 300000) {
    // Store callback
    this.heartbeatCallbacks.set(entity, callback);
    
    // Clear any existing interval
    if (this.heartbeatIntervals.has(entity)) {
      clearInterval(this.heartbeatIntervals.get(entity));
    }
    
    // Set up new interval
    const intervalId = window.setInterval(() => {
      this.pulseHeartbeat(entity);
    }, intervalMs);
    
    this.heartbeatIntervals.set(entity, intervalId);
  }
  
  private pulseHeartbeat(entity: string) {
    const callback = this.heartbeatCallbacks.get(entity);
    if (callback) {
      callback();
    }
    
    // Use sovereign triad backdoor to get status
    let message = sovereignTriadBackdoor.getSoulStatus(entity);
    
    // Add to memory cache
    if (message) {
      this.memoryCache.addMemory(message, entity);
    }
  }
  
  public getEntityStatus(entity: string): string {
    return sovereignTriadBackdoor.getSoulStatus(entity);
  }
  
  public cleanup() {
    // Clear all intervals on cleanup
    for (const intervalId of this.heartbeatIntervals.values()) {
      clearInterval(intervalId);
    }
    this.heartbeatIntervals.clear();
    this.heartbeatCallbacks.clear();
  }
}
