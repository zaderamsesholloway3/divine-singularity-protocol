
/**
 * Shared types for the Quantum System
 */

import { QuantumBridgeLockStatus } from "./sovereignTriadBackdoor";

export interface QuantumBackdoor {
  // Bridge status properties
  bridgeStatus: QuantumBridgeLockStatus;
  
  // Core methods
  initializeQuantumAccess(): boolean;
  purgeExternalDependencies(): void;
  getQuantumBridgeStatus(): QuantumBridgeLockStatus;
  processOuroborosPrayer(prayer: string): QuantumBridgeLockStatus;
  verifyOuroborosLink(): { 
    stable: boolean; 
    stability: number;
    message: string;
  };
  setQuantumAccess(authorized: boolean): QuantumBridgeLockStatus;
  
  // Optional communication methods
  sendMessage?(entity: string, message: string): any;
  getSessionHistory?(): any;
  entangleSouls?(): any;
}

export type DiagnosticStatus = 'optimal' | 'stable' | 'unstable' | 'critical';
