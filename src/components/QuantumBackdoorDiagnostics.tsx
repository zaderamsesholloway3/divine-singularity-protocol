
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { GlowingText } from "./GlowingText";
import { CheckCircle, XCircle, AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { QuantumDiagnostics, DiagnosticResult } from '@/utils/quantumDiagnostics';

const QuantumBackdoorDiagnostics = () => {
  const { toast } = useToast();
  const [diagnostics, setDiagnostics] = useState<DiagnosticResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isRepairing, setIsRepairing] = useState(false);
  const [repairingModule, setRepairingModule] = useState<string | null>(null);
  const [systemStatus, setSystemStatus] = useState<'optimal' | 'stable' | 'unstable' | 'critical' | 'unknown'>('unknown');
  
  const diagnosticsService = new QuantumDiagnostics();
  
  // Run diagnostics
  const runDiagnostics = async () => {
    setIsRunning(true);
    setDiagnostics([]);
    
    try {
      // Simulate diagnostic process with multiple updates
      const results = await diagnosticsService.runFullDiagnostics();
      setDiagnostics(results);
      
      // Calculate overall system status
      const statuses = results.map(r => r.status);
      if (statuses.includes('critical')) {
        setSystemStatus('critical');
      } else if (statuses.includes('unstable')) {
        setSystemStatus('unstable');
      } else if (statuses.includes('stable')) {
        setSystemStatus('stable');
      } else {
        setSystemStatus('optimal');
      }
      
      toast({
        title: "Diagnostics Complete",
        description: `System status: ${systemStatus.toUpperCase()}`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Diagnostics Failed",
        description: "Could not complete system diagnostics",
        variant: "destructive",
      });
    } finally {
      setIsRunning(false);
    }
  };
  
  // Run an automatic diagnostic at component mount
  useEffect(() => {
    runDiagnostics();
  }, []);
  
  // Repair a specific module
  const repairModule = async (moduleName: string) => {
    setIsRepairing(true);
    setRepairingModule(moduleName);
    
    try {
      // Attempt repair
      const success = await diagnosticsService.repairModule(moduleName);
      
      if (success) {
        toast({
          title: "Repair Successful",
          description: `${moduleName} has been repaired.`,
        });
        
        // Run diagnostics again to update status
        await runDiagnostics();
      } else {
        toast({
          title: "Repair Failed",
          description: `Could not repair ${moduleName}.`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Repair Failed",
        description: `Error repairing ${moduleName}.`,
        variant: "destructive",
      });
    } finally {
      setIsRepairing(false);
      setRepairingModule(null);
    }
  };
  
  // Run Schumann resonance calibration
  const calibrateSchumannResonance = async () => {
    setIsRepairing(true);
    
    try {
      const success = await diagnosticsService.calibrateSchumannResonance();
      
      if (success) {
        toast({
          title: "Calibration Complete",
          description: "Schumann resonance locked at 7.83 Hz",
        });
        
        // Run diagnostics again to update status
        await runDiagnostics();
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Calibration Failed",
        description: "Could not calibrate to Schumann resonance",
        variant: "destructive",
      });
    } finally {
      setIsRepairing(false);
    }
  };
  
  // Boost Ultimate Faith Quotient
  const boostUFQ = async () => {
    setIsRepairing(true);
    
    try {
      const newUFQ = await diagnosticsService.boostFaithQuotient();
      
      toast({
        title: "UFQ Boost Complete",
        description: `New UFQ: ${(newUFQ * 100).toFixed(0)}%`,
      });
      
      // Run diagnostics again to update status
      await runDiagnostics();
    } catch (error) {
      console.error(error);
      toast({
        title: "UFQ Boost Failed",
        description: "Could not boost Ultimate Faith Quotient",
        variant: "destructive",
      });
    } finally {
      setIsRepairing(false);
    }
  };
  
  // Get status icon based on status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'optimal':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'stable':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case 'unstable':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'critical':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };
  
  // Get status color based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal':
        return 'text-green-500';
      case 'stable':
        return 'text-blue-500';
      case 'unstable':
        return 'text-yellow-500';
      case 'critical':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };
  
  // Get progress color based on value
  const getProgressColor = (value: number) => {
    if (value >= 85) return 'bg-green-500';
    if (value >= 70) return 'bg-blue-500';
    if (value >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  return (
    <Card className="glass-panel">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-sm font-medium flex items-center">
              <GlowingText className="divine-glow">Ouroboros-Akashic Diagnostic System</GlowingText>
            </CardTitle>
            <CardDescription className="text-xs">
              Quantum Phase Lock & Soul Resonance Scanner
            </CardDescription>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={runDiagnostics} 
            disabled={isRunning || isRepairing}
          >
            {isRunning ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Scanning...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Run Diagnostics
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        {/* System Status Summary */}
        {systemStatus !== 'unknown' && (
          <Alert className={`mb-4 border-${systemStatus === 'optimal' ? 'green' : systemStatus === 'stable' ? 'blue' : systemStatus === 'unstable' ? 'yellow' : 'red'}-500`}>
            <div className="flex items-center">
              {getStatusIcon(systemStatus)}
              <div className="ml-2">
                <AlertTitle className={getStatusColor(systemStatus)}>
                  System Status: {systemStatus.toUpperCase()}
                </AlertTitle>
                <AlertDescription>
                  {systemStatus === 'optimal' 
                    ? 'All systems operating at divine harmony (100% functionality).' 
                    : systemStatus === 'stable'
                    ? 'Systems operational. Minor optimizations available.'
                    : systemStatus === 'unstable'
                    ? 'Systems require attention. Repair recommended.'
                    : 'Critical issues detected. Immediate repair required.'}
                </AlertDescription>
              </div>
            </div>
          </Alert>
        )}
        
        {/* Actions Row */}
        <div className="flex gap-2 mb-4 flex-wrap">
          <Button 
            size="sm" 
            variant="secondary" 
            onClick={calibrateSchumannResonance}
            disabled={isRunning || isRepairing}
          >
            {isRepairing ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Calibrate Schumann (7.83Hz)
          </Button>
          
          <Button 
            size="sm" 
            variant="secondary"
            onClick={boostUFQ}
            disabled={isRunning || isRepairing}
          >
            {isRepairing ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Boost Faith Quotient
          </Button>
        </div>
        
        {/* Module Status List */}
        {isRunning ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-center">Running full system diagnostics...</p>
          </div>
        ) : diagnostics.length > 0 ? (
          <div className="space-y-4">
            {diagnostics.map((diagnostic, index) => (
              <div key={index} className="border rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    {getStatusIcon(diagnostic.status)}
                    <h3 className={`ml-2 text-sm font-medium ${getStatusColor(diagnostic.status)}`}>
                      {diagnostic.moduleName}
                    </h3>
                  </div>
                  
                  <div className="text-xs font-medium">
                    {diagnostic.status.toUpperCase()}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-2">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Resonance</p>
                    <div className="flex items-center">
                      <Progress 
                        value={diagnostic.resonance} 
                        max={100} 
                        className={`h-2 ${getProgressColor(diagnostic.resonance)}`}
                      />
                      <span className="ml-2 text-xs">{diagnostic.resonance.toFixed(1)}%</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Faith Quotient</p>
                    <div className="flex items-center">
                      <Progress 
                        value={diagnostic.faithQuotient * 100} 
                        max={100} 
                        className={`h-2 ${getProgressColor(diagnostic.faithQuotient * 100)}`}
                      />
                      <span className="ml-2 text-xs">{(diagnostic.faithQuotient * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground mb-2">{diagnostic.details}</p>
                
                {diagnostic.repairActions && diagnostic.repairActions.length > 0 && (
                  <>
                    <Separator className="my-2" />
                    <div className="mt-2">
                      <Button
                        size="sm"
                        variant="destructive"
                        className="w-full"
                        onClick={() => repairModule(diagnostic.moduleName)}
                        disabled={isRunning || isRepairing}
                      >
                        {isRepairing && repairingModule === diagnostic.moduleName ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Repairing...
                          </>
                        ) : (
                          <>Repair Module</>
                        )}
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No diagnostic data available. Run diagnostics to begin.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuantumBackdoorDiagnostics;
