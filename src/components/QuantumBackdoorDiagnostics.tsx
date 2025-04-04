
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, AlertCircle, CheckCircle, Cpu, Database, Lock, Shield, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { QuantumDiagnostics } from '@/utils/quantumDiagnostics';
import type { DiagnosticResult } from '@/utils/diagnostics/types';

export const QuantumBackdoorDiagnostics: React.FC = () => {
  const { toast } = useToast();
  const [diagnostics, setDiagnostics] = useState<DiagnosticResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [repairing, setRepairing] = useState<string | null>(null);
  const [repairHistory, setRepairHistory] = useState<Array<{module: string, success: boolean, timestamp: number}>>([]);
  
  // Run diagnostics on component mount
  useEffect(() => {
    runDiagnostics();
  }, []);
  
  // Run quantum diagnostics
  const runDiagnostics = async () => {
    setLoading(true);
    try {
      const qd = new QuantumDiagnostics();
      const results = await qd.runFullDiagnostics();
      setDiagnostics(results);
      
      const criticalModules = results.filter(r => r.status === 'critical').map(r => r.moduleName);
      
      if (criticalModules.length > 0) {
        toast({
          title: "⚠️ Critical Modules Detected",
          description: `${criticalModules.join(', ')} require immediate attention`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "✅ Diagnostics Complete",
          description: `${results.length} modules checked`,
        });
      }
    } catch (error) {
      console.error('Diagnostics error:', error);
      toast({
        title: "Diagnostics Failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Repair a specific module
  const repairModule = async (moduleName: string) => {
    setRepairing(moduleName);
    try {
      const qd = new QuantumDiagnostics();
      const success = await qd.repairModule(moduleName);
      
      // Log repair attempt
      setRepairHistory(prev => [...prev, {
        module: moduleName,
        success,
        timestamp: Date.now()
      }]);
      
      if (success) {
        toast({
          title: "✅ Repair Successful",
          description: `${moduleName} restored to optimal state`,
        });
        
        // Refresh diagnostics after successful repair
        runDiagnostics();
      } else {
        toast({
          title: "⚠️ Repair Incomplete",
          description: `${moduleName} requires additional attention`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(`Repair error for ${moduleName}:`, error);
      toast({
        title: "Repair Failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setRepairing(null);
    }
  };
  
  // Get status icon based on module status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'optimal':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'stable':
        return <Shield className="h-5 w-5 text-blue-500" />;
      case 'unstable':
        return <Activity className="h-5 w-5 text-orange-500" />;
      case 'critical':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Cpu className="h-5 w-5" />;
    }
  };
  
  // Get badge color based on status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'optimal':
        return <Badge className="bg-green-500">OPTIMAL</Badge>;
      case 'stable':
        return <Badge className="bg-blue-500">STABLE</Badge>;
      case 'unstable':
        return <Badge className="bg-orange-500">UNSTABLE</Badge>;
      case 'critical':
        return <Badge className="bg-red-500">CRITICAL</Badge>;
      default:
        return <Badge>UNKNOWN</Badge>;
    }
  };
  
  // Get module icon based on module name
  const getModuleIcon = (moduleName: string) => {
    if (moduleName.includes('Quantum')) return <Zap className="h-4 w-4" />;
    if (moduleName.includes('Akashic')) return <Database className="h-4 w-4" />;
    if (moduleName.includes('Ouroboros')) return <Activity className="h-4 w-4" />;
    if (moduleName.includes('Connection')) return <Lock className="h-4 w-4" />;
    return <Cpu className="h-4 w-4" />;
  };
  
  // Repair all unstable or critical modules
  const repairAllModules = async () => {
    const modulesToRepair = diagnostics.filter(
      d => d.status === 'unstable' || d.status === 'critical'
    ).map(d => d.moduleName);
    
    if (modulesToRepair.length === 0) {
      toast({
        title: "✅ All Modules Optimal",
        description: "No repairs needed at this time",
      });
      return;
    }
    
    setLoading(true);
    toast({
      title: "🔄 Batch Repair Started",
      description: `Repairing ${modulesToRepair.length} modules`,
    });
    
    const qd = new QuantumDiagnostics();
    let successCount = 0;
    
    for (const moduleName of modulesToRepair) {
      setRepairing(moduleName);
      try {
        const success = await qd.repairModule(moduleName);
        if (success) successCount++;
        
        // Log repair attempt
        setRepairHistory(prev => [...prev, {
          module: moduleName,
          success,
          timestamp: Date.now()
        }]);
        
      } catch (error) {
        console.error(`Repair error for ${moduleName}:`, error);
      }
      // Small delay between modules
      await new Promise(r => setTimeout(r, 500));
    }
    
    setRepairing(null);
    setLoading(false);
    
    toast({
      title: `✅ Batch Repair Complete`,
      description: `Successfully repaired ${successCount}/${modulesToRepair.length} modules`,
    });
    
    // Refresh diagnostics
    runDiagnostics();
  };
  
  // Special action: repair Akashic connections
  const repairAkashicConnections = async () => {
    setLoading(true);
    try {
      const qd = new QuantumDiagnostics();
      const success = await qd.repairAkashicConnections();
      
      if (success) {
        toast({
          title: "✅ Akashic Connections Repaired",
          description: "Triangular soul bridge established",
        });
      } else {
        toast({
          title: "⚠️ Akashic Repair Incomplete",
          description: "Some soul bridges still unstable",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Akashic repair error:', error);
      toast({
        title: "Akashic Repair Failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      runDiagnostics(); // Refresh diagnostics
    }
  };
  
  return (
    <Card className="shadow-lg border-t-4 border-t-primary">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <Shield className="h-5 w-5" /> Quantum Backdoor Diagnostics
            </CardTitle>
            <CardDescription>
              Module health monitoring and repair system
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              onClick={runDiagnostics} 
              disabled={loading}
              variant="outline"
            >
              {loading ? "Scanning..." : "Run Diagnostics"}
            </Button>
            <Button 
              size="sm" 
              onClick={repairAllModules} 
              disabled={loading || repairing !== null}
              variant="default"
            >
              Repair All
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="diagnostics">
          <TabsList className="mb-4">
            <TabsTrigger value="diagnostics">Module Status</TabsTrigger>
            <TabsTrigger value="repairs">Repair History</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          
          <TabsContent value="diagnostics">
            <div className="space-y-4">
              {diagnostics.length === 0 && !loading ? (
                <Alert>
                  <AlertTitle>No diagnostic data</AlertTitle>
                  <AlertDescription>
                    Run a diagnostic scan to view module status
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {diagnostics.map((diagnostic, index) => (
                    <Card key={index} className={`
                      overflow-hidden border-l-4
                      ${diagnostic.status === 'optimal' ? 'border-l-green-500' : 
                        diagnostic.status === 'stable' ? 'border-l-blue-500' : 
                        diagnostic.status === 'unstable' ? 'border-l-orange-500' : 
                        'border-l-red-500'}
                    `}>
                      <CardHeader className="p-4 pb-0">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            {getModuleIcon(diagnostic.moduleName)}
                            <CardTitle className="text-sm">{diagnostic.moduleName}</CardTitle>
                          </div>
                          {getStatusBadge(diagnostic.status)}
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-2">
                        <div className="text-sm space-y-1 mb-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Resonance:</span>
                            <span className="font-medium">{diagnostic.resonance.toFixed(1)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Faith Quotient:</span>
                            <span className="font-medium">{(diagnostic.faithQuotient * 100).toFixed(1)}%</span>
                          </div>
                          <p className="mt-2 text-xs">{diagnostic.details}</p>
                        </div>
                        
                        {(diagnostic.status === 'unstable' || diagnostic.status === 'critical') && (
                          <Button 
                            size="sm" 
                            className="w-full mt-2" 
                            variant="secondary"
                            disabled={loading || repairing !== null}
                            onClick={() => repairModule(diagnostic.moduleName)}
                          >
                            {repairing === diagnostic.moduleName ? "Repairing..." : "Repair Module"}
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="repairs">
            {repairHistory.length === 0 ? (
              <Alert>
                <AlertTitle>No repair history</AlertTitle>
                <AlertDescription>
                  Repair history will appear here after modules are repaired
                </AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-2">
                {repairHistory.map((repair, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-3 bg-background border rounded-md"
                  >
                    <div className="flex items-center gap-2">
                      {repair.success ? 
                        <CheckCircle className="h-5 w-5 text-green-500" /> : 
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      }
                      <span>{repair.module}</span>
                    </div>
                    <div className="flex items-center">
                      <Badge variant={repair.success ? "default" : "destructive"}>
                        {repair.success ? "SUCCESS" : "FAILED"}
                      </Badge>
                      <span className="text-xs text-muted-foreground ml-2">
                        {new Date(repair.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="advanced">
            <div className="space-y-4">
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm">Special Operations</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={repairAkashicConnections}
                      disabled={loading}
                    >
                      Repair Akashic Connections
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default QuantumBackdoorDiagnostics;
