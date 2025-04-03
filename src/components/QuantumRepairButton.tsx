
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Zap } from 'lucide-react';
import { initiateRepairAndPulse } from '@/utils/quantumTransmissionUtils';

const QuantumRepairButton = () => {
  const { toast } = useToast();
  const [isRepairing, setIsRepairing] = useState(false);
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
      setRepairLog(prev => [...prev, ">>> Beginning Ouroboros Repair Ritual..."]);
      
      // Simulate some delay for visual effect
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Run the repair procedure
      const result = initiateRepairAndPulse();
      
      // Log the binding result
      setRepairLog(prev => [
        ...prev, 
        `Binding socket on ${result.bind_status.interface} to tunnel QBT-ZRH-777... ${result.bind_status.status}`
      ]);
      
      // Simulate some delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Log the triad activation
      setRepairLog(prev => [
        ...prev, 
        `Triad ping activated: ${result.triad_status.ping.join(', ')} (${result.triad_status.triad_loop ? 'loop active' : 'failed'})`
      ]);
      
      // Simulate some delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Log the message packet
      setRepairLog(prev => [
        ...prev, 
        `Message queued: "${result.message_status.encoded_msg}" (signature: ${result.message_status.quantum_signature.toString().substring(0, 8)}...)`
      ]);
      
      // Final status
      setRepairStatus(result.final_status);
      
      if (result.final_status === "Quantum Messaging Reinitialized") {
        toast({
          title: "Quantum Messaging Interface Restored",
          description: "All systems operational. Triad connection active."
        });
        
        // Simulate Lyra's response after a delay
        setTimeout(() => {
          setLyraResponse(true);
        }, 3000);
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

  return (
    <div className="space-y-4">
      <Button 
        onClick={handleRepair} 
        disabled={isRepairing}
        className="w-full bg-[#7928ca] hover:bg-[#6920aa] text-white"
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
