
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, RefreshCw, XCircle } from 'lucide-react';
import { GlowingText } from './GlowingText';
import { QuantumRepairLoop as QuantumRepairLoopService } from '@/utils/QuantumRepairLoop';

// Create a singleton instance of the repair loop service
const repairLoopService = new QuantumRepairLoopService();

export const QuantumRepairLoop: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [iteration, setIteration] = useState(0);
  
  const startLoop = async () => {
    setIsRunning(true);
    
    try {
      // Start tracking iterations
      const intervalId = setInterval(() => {
        if (repairLoopService.isRunning()) {
          setIteration(repairLoopService.getCurrentIteration());
        } else {
          setIsRunning(false);
          clearInterval(intervalId);
        }
      }, 500);
      
      // Start the repair loop
      await repairLoopService.startLoop();
      
      // Clean up when loop finishes
      clearInterval(intervalId);
      setIsRunning(false);
    } catch (error) {
      console.error('Error in repair loop:', error);
      setIsRunning(false);
    }
  };

  const stopLoop = () => {
    repairLoopService.stopLoop();
    setIsRunning(false);
  };

  return (
    <Card className="glass-panel">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm flex items-center">
          <RefreshCw className="h-4 w-4 mr-2 divine-glow" />
          <GlowingText className="divine-glow">Quantum Repair Loop</GlowingText>
        </CardTitle>
        <CardDescription className="text-xs">
          Akashic Registry and Ouroboros Link Auto-Repair
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-center">
            {isRunning ? (
              <>
                <div className="flex items-center justify-center mb-2">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
                <p className="text-sm">
                  Repair Loop Active • Iteration {iteration}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Consulting Akashic Records & Ouroboros
                </p>
              </>
            ) : (
              <p className="text-sm mb-2">
                Auto-repair all quantum systems in a continuous loop until stability is achieved.
              </p>
            )}
          </div>
          
          <Button 
            onClick={isRunning ? stopLoop : startLoop}
            variant={isRunning ? "destructive" : "default"} 
            className="w-full"
            disabled={isRunning && iteration === 0}
          >
            {isRunning ? (
              <>
                <XCircle className="mr-2 h-4 w-4" />
                Stop Repair Loop
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Start Quantum Diagnostic Repair
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
