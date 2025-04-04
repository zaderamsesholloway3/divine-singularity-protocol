
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GlowingText } from "@/components/GlowingText";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Zap, Loader2, RefreshCw } from 'lucide-react';
import { divineDiagnosticMode } from "@/utils/diagnostics/divineRepairService";
import { useToast } from "@/hooks/use-toast";

const DivineDiagnosticPanel: React.FC = () => {
  const { toast } = useToast();
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [diagnosticResults, setDiagnosticResults] = useState<any>(null);
  const [repairsAttempted, setRepairsAttempted] = useState<number>(0);
  const [repairsSuccessful, setRepairsSuccessful] = useState<number>(0);
  
  const runDiagnostic = async () => {
    setIsRunning(true);
    
    toast({
      title: "Divine Diagnostic Mode",
      description: "Connecting to Akashic Record stream and Ouroboros Link...",
    });
    
    try {
      const results = await divineDiagnosticMode();
      
      setDiagnosticResults(results.moduleStatus);
      setRepairsAttempted(results.repairsAttempted);
      setRepairsSuccessful(results.repairsSuccessful);
      
      toast({
        title: "Divine Diagnostic Complete",
        description: `${results.repairsSuccessful} of ${results.repairsAttempted} repairs successful`,
      });
    } catch (error) {
      console.error("Diagnostic error:", error);
      toast({
        title: "Diagnostic Failed",
        description: "Error during divine diagnostic process",
        variant: "destructive",
      });
    } finally {
      setIsRunning(false);
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'optimal':
        return <Badge className="bg-green-500">{status}</Badge>;
      case 'stable':
        return <Badge className="bg-blue-500">{status}</Badge>;
      case 'partial':
        return <Badge className="bg-amber-500">{status}</Badge>;
      case 'unstable':
        return <Badge className="bg-red-500">{status}</Badge>;
      case 'critical':
        return <Badge className="bg-red-700">{status}</Badge>;
      case 'failed':
        return <Badge className="bg-gray-500">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <Card className="glass-panel">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm flex items-center">
          <Zap className="h-4 w-4 mr-2 divine-glow" />
          <GlowingText className="divine-glow">Divine Diagnostic Mode</GlowingText>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm">Diagnostic for Sovereign Triad System</p>
            <p className="text-xs text-muted-foreground">
              Checks Akashic Records and Ouroboros Link integrity
            </p>
          </div>
          
          <Button 
            onClick={runDiagnostic} 
            disabled={isRunning}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            {isRunning ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Run Diagnostic
              </>
            )}
          </Button>
        </div>
        
        {(repairsAttempted > 0 || diagnosticResults) && (
          <div className="border rounded-md p-3 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Diagnostic Results</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  Repairs: {repairsSuccessful}/{repairsAttempted}
                </span>
                {repairsSuccessful === repairsAttempted ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              {diagnosticResults && Object.entries(diagnosticResults).map(([module, data]: [string, any]) => (
                <div key={module} className="border-b pb-2 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{module}</span>
                    {getStatusBadge(data.status)}
                  </div>
                  
                  {data.resonance && (
                    <div className="text-xs flex justify-between">
                      <span>Resonance:</span>
                      <span>{typeof data.resonance === 'number' ? `${(data.resonance * 100).toFixed(1)}%` : data.resonance}</span>
                    </div>
                  )}
                  
                  {data.stability && (
                    <div className="text-xs flex justify-between">
                      <span>Stability:</span>
                      <span>{(data.stability * 100).toFixed(1)}%</span>
                    </div>
                  )}
                  
                  {data.details && (
                    <p className="text-xs text-muted-foreground mt-1">{data.details}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DivineDiagnosticPanel;
