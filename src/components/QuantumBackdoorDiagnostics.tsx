
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, AlertCircle, CheckCircle, Cpu, Database, Lock, Shield, Zap, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { QuantumDiagnostics } from '@/utils/diagnostics';
import { universalQuantumHealingCycle } from '@/utils/quantumCircuitSimulator';
import type { DiagnosticResult } from '@/utils/diagnostics';

export const QuantumBackdoorDiagnostics: React.FC = () => {
  const { toast } = useToast();
  const [diagnostics, setDiagnostics] = useState<DiagnosticResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [healingInProgress, setHealingInProgress] = useState(false);
  const [repairing, setRepairing] = useState<string | null>(null);
  const [repairHistory, setRepairHistory] = useState<Array<{module: string, success: boolean, timestamp: number}>>([]);
  
  useEffect(() => {
    runDiagnostics();
  }, []);
  
  const runDiagnostics = async () => {
    setLoading(true);
    try {
      const qd = new QuantumDiagnostics();
      const results = await qd.runFullDiagnostics();
      
      // Filter out Auraline, Zade, Lyra connections and Communication Channels
      const filteredResults = results.filter(r => 
        !r.moduleName.includes('Auraline') && 
        !r.moduleName.includes('Zade') && 
        !r.moduleName.includes('Lyra') && 
        !r.moduleName.includes('Communication Channels')
      );
      
      setDiagnostics(filteredResults);
      
      const criticalModules = filteredResults.filter(r => r.status === 'critical').map(r => r.moduleName);
      
      if (criticalModules.length > 0) {
        toast({
          title: "⚠️ Critical Modules Detected",
          description: `${criticalModules.join(', ')} require immediate attention`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "✅ Diagnostics Complete",
          description: `${filteredResults.length} modules checked`,
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
  
  const repairModule = async (moduleName: string) => {
    setRepairing(moduleName);
    try {
      const qd = new QuantumDiagnostics();
      const success = await qd.repairModule(moduleName);
      
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
  
  const getModuleIcon = (moduleName: string) => {
    if (moduleName.includes('Quantum')) return <Zap className="h-4 w-4" />;
    if (moduleName.includes('Akashic')) return <Database className="h-4 w-4" />;
    if (moduleName.includes('Ouroboros')) return <Activity className="h-4 w-4" />;
    if (moduleName.includes('Connection')) return <Lock className="h-4 w-4" />;
    return <Cpu className="h-4 w-4" />;
  };
  
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
        
        setRepairHistory(prev => [...prev, {
          module: moduleName,
          success,
          timestamp: Date.now()
        }]);
        
      } catch (error) {
        console.error(`Repair error for ${moduleName}:`, error);
      }
      await new Promise(r => setTimeout(r, 500));
    }
    
    setRepairing(null);
    setLoading(false);
    
    toast({
      title: `✅ Batch Repair Complete`,
      description: `Successfully repaired ${successCount}/${modulesToRepair.length} modules`,
    });
    
    runDiagnostics();
  };
  
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
      runDiagnostics();
    }
  };
  
  const runHealingCycle = async () => {
    if (healingInProgress) return;
    
    setHealingInProgress(true);
    toast({
      title: "🧬 Universal Healing Cycle Initiated",
      description: "Reattunement of quantum connections in progress...",
    });
    
    try {
      const result = await universalQuantumHealingCycle();
      
      if (result.success) {
        toast({
          title: "✅ Universal Healing Complete",
          description: `All modules harmonized in ${result.attemptsNeeded} healing cycles`,
        });
      } else {
        toast({
          title: "⚠️ Healing Cycle Incomplete",
          description: `Reached ${result.maxAttempts} cycles. Some modules may need manual repair.`,
          variant: "destructive",
        });
      }
      
      setRepairHistory(prev => [...prev, {
        module: "Universal Healing Cycle",
        success: result.success,
        timestamp: Date.now()
      }]);
      
      runDiagnostics();
    } catch (error) {
      console.error('Healing cycle error:', error);
      toast({
        title: "Healing Cycle Failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setHealingInProgress(false);
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
              disabled={loading || healingInProgress}
              variant="outline"
            >
              {loading ? "Scanning..." : "Run Diagnostics"}
            </Button>
            <Button 
              size="sm" 
              onClick={repairAllModules} 
              disabled={loading || repairing !== null || healingInProgress}
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
              <Card className="border-2 border-indigo-500/30 bg-indigo-500/5">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-sm">Universal Quantum Healing</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Reattunes all system connections and recalibrates communication channels in multiple cycles
                      </p>
                    </div>
                    <Button 
                      onClick={runHealingCycle} 
                      disabled={loading || healingInProgress}
                      className="bg-indigo-600 hover:bg-indigo-700 w-full md:w-auto"
                    >
                      {healingInProgress ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Healing in Progress...
                        </>
                      ) : (
                        <>
                          🧬 Universal Healing Loop
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            
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
                            disabled={loading || repairing !== null || healingInProgress}
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
                  Repair modules to see history here
                </AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-2">
                {repairHistory.map((repair, index) => (
                  <div 
                    key={index} 
                    className={`flex justify-between items-center p-2 rounded-md ${
                      repair.success ? 'bg-green-500/10' : 'bg-red-500/10'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {repair.success ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      )}
                      <span>{repair.module}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(repair.timestamp).toLocaleTimeString()}
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
                  <CardTitle className="text-sm">Advanced Repair Operations</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      className="justify-start"
                      disabled={loading || healingInProgress}
                      onClick={repairAkashicConnections}
                    >
                      <Database className="mr-2 h-4 w-4" />
                      Repair Akashic Connections
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start"
                      disabled={loading || healingInProgress}
                      onClick={() => runDiagnostics()}
                    >
                      <Activity className="mr-2 h-4 w-4" />
                      Deep Diagnostic Scan
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start"
                      disabled={loading || healingInProgress}
                    >
                      <Lock className="mr-2 h-4 w-4" />
                      Reset Quantum Bridge
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start"
                      disabled={loading || healingInProgress}
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Purge Quantum Cache
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
