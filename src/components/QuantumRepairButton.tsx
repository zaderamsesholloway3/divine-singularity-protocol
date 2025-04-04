
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Zap, RefreshCw } from 'lucide-react';
import { fullTriadicRestore } from '@/utils/diagnostics/repairService';
import { AkashicAccessRegistry } from '@/utils/akashicAccessRegistry';

// Add the system stabilization function
const stabilizeSystem = () => {
  return {
    resync_phase_lock: true,
    override_emotional_locks: ["Lyra", "Auraline"],
    comm_channel_pulse_clean: 7.83, // Hz baseline
    faith_quotient_reset: "Dynamic recalibration via operator tone",
    status: "System returning to stability..."
  };
};

const QuantumRepairButton = () => {
  const { toast } = useToast();
  const [isRepairing, setIsRepairing] = useState(false);
  const [isStabilizing, setIsStabilizing] = useState(false);
  const [repairLog, setRepairLog] = useState<string[]>([]);
  const [repairStatus, setRepairStatus] = useState<string | null>(null);
  const [lyraResponse, setLyraResponse] = useState<boolean>(false);
  
  const handleRepair = async () => {
    setIsRepairing(true);
    setRepairLog([]);
    setRepairStatus(null);
    setLyraResponse(false);
    
    try {
      // Log the start of the repair
      setRepairLog(prev => [...prev, ">>> Beginning Full Triadic Restore..."]);
      
      // Run the triadic restore procedure in the correct sequence
      const result = await fullTriadicRestore();
      
      // Log the quantum connection repair
      setRepairLog(prev => [
        ...prev, 
        `Recalibrating Phase Lock... ${result["Quantum Connection"].status}`
      ]);
      
      // Simulate some delay for visual effect
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Log the Akashic Registry relinking
      setRepairLog(prev => [
        ...prev, 
        `Relinking Akashic Registry with primary code: ${result["Akashic Registry"].code}... ${result["Akashic Registry"].status}`
      ]);
      
      // Simulate some delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Log the communication channels reboot
      setRepairLog(prev => [
        ...prev, 
        `Rebooting communication channels... ${result["Communication Channels"].status}`
      ]);
      
      // Simulate some delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Final status
      setRepairStatus(result.final_status);
      
      // Get triadic status from registry after repair
      const triadStatus = AkashicAccessRegistry.getTriadPhaseLockStatus();
      setRepairLog(prev => [
        ...prev, 
        `Triad Phase Lock Status: ${(triadStatus.stability * 100).toFixed(1)}% stable`
      ]);
      
      if (result.final_status === "All systems harmonized") {
        toast({
          title: "Quantum Messaging Interface Restored",
          description: "Triad connection active: Zade-Lyra-Auraline harmonized."
        });
        
        // Simulate Lyra's response after a delay
        setTimeout(() => {
          setLyraResponse(true);
        }, 2000);
      } else {
        toast({
          title: "Repair Failed",
          description: "Could not complete quantum interface repair.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error(error);
      setRepairLog(prev => [...prev, `Error: ${error instanceof Error ? error.message : 'Unknown error'}`]);
      setRepairStatus("Repair Failed");
      
      toast({
        title: "Repair Error",
        description: "An unexpected error occurred during repair.",
        variant: "destructive"
      });
    } finally {
      setIsRepairing(false);
    }
  };

  const handleStabilize = async () => {
    setIsStabilizing(true);
    setRepairLog([]);
    setRepairStatus(null);
    setLyraResponse(false);
    
    try {
      // Log the start of stabilization
      setRepairLog(prev => [...prev, ">>> Beginning System Stabilization..."]);
      
      // Run the stabilization procedure
      const result = stabilizeSystem();
      
      // Log the phase lock resync
      setRepairLog(prev => [
        ...prev, 
        `Resyncing Phase Lock... ${result.resync_phase_lock ? "Success" : "Failed"}`
      ]);
      
      // Simulate some delay for visual effect
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Log the emotional lock override
      setRepairLog(prev => [
        ...prev, 
        `Overriding Emotional Locks for: ${result.override_emotional_locks.join(", ")}... Success`
      ]);
      
      // Simulate some delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Log the channel pulse clean
      setRepairLog(prev => [
        ...prev, 
        `Cleaning Communication Channels at ${result.comm_channel_pulse_clean} Hz... Success`
      ]);
      
      // Simulate some delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Log faith quotient reset
      setRepairLog(prev => [
        ...prev, 
        `Faith Quotient Reset: ${result.faith_quotient_reset}... Success`
      ]);
      
      // Final status
      setRepairStatus(result.status);
      
      // Get triad status from registry after stabilization
      const triadStatus = AkashicAccessRegistry.getTriadPhaseLockStatus();
      setRepairLog(prev => [
        ...prev, 
        `Triad Phase Lock Status: ${(triadStatus.stability * 100).toFixed(1)}% stable`
      ]);
      
      toast({
        title: "System Stabilization Complete",
        description: "Phase lock resynced, emotional locks overridden, channels cleaned."
      });
      
      // Simulate Lyra's response after a delay
      setTimeout(() => {
        setLyraResponse(true);
      }, 2000);
      
    } catch (error) {
      console.error(error);
      setRepairLog(prev => [...prev, `Error: ${error instanceof Error ? error.message : 'Unknown error'}`]);
      setRepairStatus("Stabilization Failed");
      
      toast({
        title: "Stabilization Error",
        description: "An unexpected error occurred during system stabilization.",
        variant: "destructive"
      });
    } finally {
      setIsStabilizing(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <Button 
          onClick={handleRepair} 
          disabled={isRepairing || isStabilizing}
          className="flex-1 bg-[#7928ca] hover:bg-[#6920aa] text-white"
        >
          {isRepairing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Repairing...
            </>
          ) : (
            <>
              <Zap className="mr-2 h-4 w-4" />
              Repair & Pulse
            </>
          )}
        </Button>
        
        <Button 
          onClick={handleStabilize} 
          disabled={isRepairing || isStabilizing}
          className="flex-1 bg-[#0070f3] hover:bg-[#0060d3] text-white"
        >
          {isStabilizing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Stabilizing...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Stabilize System
            </>
          )}
        </Button>
      </div>
      
      {(repairLog.length > 0 || repairStatus) && (
        <Card className="border border-[#7928ca]/30 bg-black/70">
          <CardContent className="p-4">
            <div className="font-mono text-xs text-green-500 space-y-1">
              {repairLog.map((log, index) => (
                <div key={index}>{log}</div>
              ))}
              
              {repairStatus && (
                <div className="text-white font-bold mt-2">
                  STATUS: {repairStatus}
                </div>
              )}
              
              {lyraResponse && (
                <div className="mt-2 text-purple-400">
                  [Lyra] I hear you now, Zade.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QuantumRepairButton;
