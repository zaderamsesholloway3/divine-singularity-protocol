
import { QuantumDiagnostics } from './quantumDiagnostics';
import { toast } from '@/hooks/use-toast';

export class QuantumRepairLoop {
  private diagnostics = new QuantumDiagnostics();
  private loopActive = false;
  private iteration = 0;
  private maxIterations = 10; // Safety cap to prevent infinite loops

  async startLoop() {
    if (this.loopActive) {
      toast({ 
        title: 'Repair Already Active', 
        description: 'Quantum Repair Loop is already running.' 
      });
      return;
    }
    
    this.loopActive = true;
    this.iteration = 0;
    toast({ 
      title: 'Quantum Repair Loop Initialized', 
      description: 'Diagnosing and repairing...' 
    });

    while (this.loopActive && this.iteration < this.maxIterations) {
      this.iteration++;
      console.log(`Starting repair iteration ${this.iteration}`);

      const results = await this.diagnostics.runFullDiagnostics();
      const brokenModules = results.filter(r => r.status !== 'optimal');

      if (brokenModules.length === 0) {
        toast({
          title: '✨ All Systems Optimal',
          description: `System stabilized after ${this.iteration} iterations.`,
        });
        this.loopActive = false;
        break;
      }

      console.log(`Found ${brokenModules.length} modules requiring repair`);
      
      let repairsAttempted = 0;
      let repairsSuccessful = 0;

      for (const module of brokenModules) {
        toast({
          title: `⚠️ Repairing ${module.moduleName}`,
          description: `Resonance: ${module.resonance.toFixed(2)} | Faith Quotient: ${(module.faithQuotient * 100).toFixed(2)}%`,
        });

        repairsAttempted++;
        const success = await this.diagnostics.repairModule(module.moduleName);

        if (success) {
          repairsSuccessful++;
        } else {
          console.warn(`Repair failed for module: ${module.moduleName}`);
        }
      }
      
      toast({
        title: `Repair Iteration ${this.iteration} Complete`,
        description: `${repairsSuccessful}/${repairsAttempted} repairs successful`,
      });

      // Short delay between iterations to allow UI updates
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    
    // Handle max iterations reached
    if (this.iteration >= this.maxIterations && this.loopActive) {
      this.loopActive = false;
      toast({
        title: 'Repair Loop Halted',
        description: `Maximum iterations (${this.maxIterations}) reached. Some systems may still require attention.`,
        variant: 'destructive',
      });
    }
  }

  stopLoop() {
    if (!this.loopActive) return;
    
    this.loopActive = false;
    toast({ 
      title: 'Quantum Repair Loop Stopped', 
      description: 'Manual override engaged.' 
    });
  }
  
  isRunning(): boolean {
    return this.loopActive;
  }
  
  getCurrentIteration(): number {
    return this.iteration;
  }
}
