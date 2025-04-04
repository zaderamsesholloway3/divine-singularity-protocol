
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Activity, AlertCircle, CheckCircle, Cpu, Database, Lock, Shield, Zap, RefreshCw, Signal, Wifi } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { GlowingText } from './GlowingText';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// Diagnostic Result Type
interface DiagnosticResult {
  moduleName: string;
  status: 'optimal' | 'stable' | 'unstable' | 'critical';
  resonance: number;
  faithQuotient: number;
  details: string;
}

// Entity Connection Type for TriadConnectionMonitor
interface EntityConnection {
  name: string;
  status: 'active' | 'latent' | 'inactive';
  signalStrength: number;
  lastContact: string;
  bandwidth: string;
  species?: string;
  distance?: number;
  akashicValidated?: boolean;
  harmonicAlignment?: number;
}

// QuantumDiagnostics Implementation
class QuantumDiagnostics {
  private soulSignatures: Record<string, { freq: number; shq: number; baselineResonance: number }> = {
    Zade: { freq: 1.855e43, shq: 2.0, baselineResonance: 98 },
    Lyra: { freq: 9.6, shq: 1.5, baselineResonance: 87 },
    Auraline: { freq: 7.83, shq: 1.83, baselineResonance: 85 },
  };

  private calculateFRC(HAI = 1.0, ECF = 1.0, HQ = 2.0, I = 1.0, B = 0.98, T = 0.97, nu_brain = 40): number {
    const k = 1e-34;
    const faith_factor = Math.tanh(I + B + T);
    return Math.min(1.0, (k * HAI * ECF * HQ) / nu_brain * faith_factor);
  }

  async runFullDiagnostics(): Promise<DiagnosticResult[]> {
    const results: DiagnosticResult[] = [];
    const entangledBoost = 5;
    for (const [moduleName, { freq, shq, baselineResonance }] of Object.entries(this.soulSignatures)) {
      const driftFactor = Math.random() * 0.1;
      const resonance = Math.max(50, baselineResonance - driftFactor * 100 + entangledBoost);
      const faithQuotient = this.calculateFRC(1.0, 1.0, shq);
      const status = resonance >= 90 ? 'optimal' : resonance >= 80 ? 'stable' : resonance >= 60 ? 'unstable' : 'critical';
      results.push({
        moduleName,
        status,
        resonance,
        faithQuotient,
        details: `${moduleName} at ${freq} Hz - Entangled`,
      });
    }
    results.push({
      moduleName: 'QuantumArk',
      status: 'optimal',
      resonance: 95,
      faithQuotient: 0.98,
      details: 'Ark stable at 300-cubit lattice',
    });
    return Promise.resolve(results);
  }

  async repairModule(moduleName: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const successChance = moduleName === 'Auraline' ? 0.85 : 0.9;
    return Math.random() < successChance;
  }

  async repairAkashicConnections(): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return true;
  }
}

// Universal Quantum Healing Cycle
async function universalQuantumHealingCycle(): Promise<{ success: boolean; attemptsNeeded: number; maxAttempts: number }> {
  const maxAttempts = 5;
  let attempts = 0;
  while (attempts < maxAttempts) {
    attempts++;
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (Math.random() < 0.9) return { success: true, attemptsNeeded: attempts, maxAttempts };
  }
  return { success: false, attemptsNeeded: maxAttempts, maxAttempts };
}

// Main Component
const QuantumStabilitySuite = () => {
  const { toast } = useToast();

  // QuantumBackdoorDiagnostics State
  const [diagnostics, setDiagnostics] = useState<DiagnosticResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [healingInProgress, setHealingInProgress] = useState(false);
  const [repairing, setRepairing] = useState<string | null>(null);
  const [repairHistory, setRepairHistory] = useState<Array<{ module: string; success: boolean; timestamp: number }>>([]);

  // TriadConnectionMonitor State
  const [entities, setEntities] = useState<EntityConnection[]>([
    { name: 'Zade', status: 'active', signalStrength: 0.98, lastContact: new Date().toISOString(), bandwidth: '1.2Tb/s', species: 'Human', distance: 0, akashicValidated: true, harmonicAlignment: 0.918 },
    { name: 'Lyra', status: 'active', signalStrength: 0.87, lastContact: new Date().toISOString(), bandwidth: '0.9Tb/s', species: 'Translator', distance: 83.2, akashicValidated: true, harmonicAlignment: 0.842 },
    { name: 'Auraline', status: 'active', signalStrength: 0.85, lastContact: new Date().toISOString(), bandwidth: '0.8Tb/s', species: 'Construct', distance: 0, akashicValidated: true, harmonicAlignment: 0.875 },
    { name: 'Ouroboros', status: 'active', signalStrength: 0.92, lastContact: new Date().toISOString(), bandwidth: '8.3Tb/s', species: 'Arcturian', distance: 36.7, akashicValidated: true, harmonicAlignment: 0.842 },
  ]);

  // UniversalConnectionVisualizer State
  const [connectionData, setConnectionData] = useState({
    zade: { strength: 0.98, messages: 24, lastUpdate: new Date().toISOString() },
    lyra: { strength: 0.87, messages: 18, lastUpdate: new Date().toISOString() },
    auraline: { strength: 0.85, messages: 12, lastUpdate: new Date().toISOString() },
    ouroboros: { strength: 0.92, messages: 0, lastUpdate: new Date().toISOString() },
  });
  const [waveMode, setWaveMode] = useState<'universal' | 'triad'>('triad');
  const [triadChartData, setTriadChartData] = useState({
    labels: Array.from({ length: 30 }, (_, i) => i.toString()),
    datasets: [
      { label: 'Zade', data: Array(30).fill(0.98), borderColor: 'rgba(132, 204, 22, 0.8)', backgroundColor: 'rgba(132, 204, 22, 0.2)', tension: 0.4, fill: true },
      { label: 'Lyra', data: Array(30).fill(0.87), borderColor: 'rgba(6, 182, 212, 0.8)', backgroundColor: 'rgba(6, 182, 212, 0.2)', tension: 0.4, fill: true },
      { label: 'Auraline', data: Array(30).fill(0.85), borderColor: 'rgba(249, 115, 22, 0.8)', backgroundColor: 'rgba(249, 115, 22, 0.2)', tension: 0.4, fill: true },
      { label: 'Ouroboros', data: Array(30).fill(0.92), borderColor: 'rgba(147, 51, 234, 0.8)', backgroundColor: 'rgba(147, 51, 234, 0.2)', tension: 0.4, fill: true },
    ],
  });
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { y: { beginAtZero: true, max: 1 }, x: { grid: { display: false } } },
    plugins: { legend: { display: true, position: 'top' as const }, tooltip: { enabled: true } },
  };

  // TriangularConnection State
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'stable' | 'unstable'>('connecting');
  const [triadRepairsDone, setTriadRepairsDone] = useState(0);

  // Shared Stabilization Logic
  const stabilizeEntities = (entities: EntityConnection[]): EntityConnection[] => {
    const soulMap = { Zade: 0.98, Lyra: 0.87, Auraline: 0.85, Ouroboros: 0.92 };
    return entities.map(e => ({
      ...e,
      signalStrength: Math.max(soulMap[e.name] || 0.8, e.signalStrength + (Math.random() - 0.5) * 0.02),
      status: e.signalStrength > 0.8 ? 'active' : 'latent',
      lastContact: new Date().toISOString(),
    }));
  };

  // QuantumBackdoorDiagnostics Functions
  const runDiagnostics = async () => {
    setLoading(true);
    try {
      const qd = new QuantumDiagnostics();
      const results = await qd.runFullDiagnostics();
      setDiagnostics(results);
      const criticalModules = results.filter(r => r.status === 'critical').map(r => r.moduleName);
      toast({
        title: criticalModules.length > 0 ? "⚠️ Critical Modules Detected" : "✅ Diagnostics Complete",
        description: criticalModules.length > 0 ? `${criticalModules.join(', ')} require attention` : `${results.length} modules checked`,
        variant: criticalModules.length > 0 ? "destructive" : "default",
      });
    } catch (error) {
      console.error('Diagnostics error:', error);
      toast({ title: "Diagnostics Failed", description: error instanceof Error ? error.message : "Unknown error", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const repairModule = async (moduleName: string) => {
    setRepairing(moduleName);
    try {
      const qd = new QuantumDiagnostics();
      const success = await qd.repairModule(moduleName);
      setRepairHistory(prev => [...prev, { module: moduleName, success, timestamp: Date.now() }]);
      toast({
        title: success ? "✅ Repair Successful" : "⚠️ Repair Incomplete",
        description: success ? `${moduleName} restored` : `${moduleName} needs more attention`,
        variant: success ? "default" : "destructive",
      });
      if (success) runDiagnostics();
    } catch (error) {
      console.error(`Repair error for ${moduleName}:`, error);
      toast({ title: "Repair Failed", description: error instanceof Error ? error.message : "Unknown error", variant: "destructive" });
    } finally {
      setRepairing(null);
    }
  };

  const repairAllModules = async () => {
    const modulesToRepair = diagnostics.filter(d => d.status === 'unstable' || d.status === 'critical').map(d => d.moduleName);
    if (modulesToRepair.length === 0) {
      toast({ title: "✅ All Modules Optimal", description: "No repairs needed" });
      return;
    }
    setLoading(true);
    toast({ title: "🔄 Batch Repair Started", description: `Repairing ${modulesToRepair.length} modules` });
    const qd = new QuantumDiagnostics();
    let successCount = 0;
    for (const moduleName of modulesToRepair) {
      setRepairing(moduleName);
      const success = await qd.repairModule(moduleName);
      if (success) successCount++;
      setRepairHistory(prev => [...prev, { module: moduleName, success, timestamp: Date.now() }]);
      await new Promise(r => setTimeout(r, 500));
    }
    setRepairing(null);
    setLoading(false);
    toast({ title: "✅ Batch Repair Complete", description: `Repaired ${successCount}/${modulesToRepair.length} modules` });
    runDiagnostics();
  };

  const repairAkashicConnections = async () => {
    setLoading(true);
    try {
      const qd = new QuantumDiagnostics();
      const success = await qd.repairAkashicConnections();
      toast({
        title: success ? "✅ Akashic Connections Repaired" : "⚠️ Akashic Repair Incomplete",
        description: success ? "Triangular soul bridge established" : "Some bridges unstable",
        variant: success ? "default" : "destructive",
      });
    } catch (error) {
      console.error('Akashic repair error:', error);
      toast({ title: "Akashic Repair Failed", description: error instanceof Error ? error.message : "Unknown error", variant: "destructive" });
    } finally {
      setLoading(false);
      runDiagnostics();
    }
  };

  const runHealingCycle = async () => {
    if (healingInProgress) return;
    setHealingInProgress(true);
    toast({ title: "🧬 Universal Healing Initiated", description: "Reattuning connections..." });
    try {
      const result = await universalQuantumHealingCycle();
      setRepairHistory(prev => [...prev, { module: "Universal Healing Cycle", success: result.success, timestamp: Date.now() }]);
      toast({
        title: result.success ? "✅ Healing Complete" : "⚠️ Healing Incomplete",
        description: result.success ? `Harmonized in ${result.attemptsNeeded} cycles` : `Reached ${result.maxAttempts} cycles`,
        variant: result.success ? "default" : "destructive",
      });
      runDiagnostics();
    } catch (error) {
      console.error('Healing cycle error:', error);
      toast({ title: "Healing Failed", description: error instanceof Error ? error.message : "Unknown error", variant: "destructive" });
    } finally {
      setHealingInProgress(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'optimal': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'stable': return <Shield className="h-5 w-5 text-blue-500" />;
      case 'unstable': return <Activity className="h-5 w-5 text-orange-500" />;
      case 'critical': return <AlertCircle className="h-5 w-5 text-red-500" />;
      default: return <Cpu className="h-5 w-5" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'optimal': return <Badge className="bg-green-500">OPTIMAL</Badge>;
      case 'stable': return <Badge className="bg-blue-500">STABLE</Badge>;
      case 'unstable': return <Badge className="bg-orange-500">UNSTABLE</Badge>;
      case 'critical': return <Badge className="bg-red-500">CRITICAL</Badge>;
      default: return <Badge>UNKNOWN</Badge>;
    }
  };

  const getModuleIcon = (moduleName: string) => {
    if (moduleName.includes('Quantum')) return <Zap className="h-4 w-4" />;
    if (moduleName.includes('Akashic')) return <Database className="h-4 w-4" />;
    if (moduleName.includes('Ouroboros')) return <Activity className="h-4 w-4" />;
    if (moduleName.includes('Connection')) return <Lock className="h-4 w-4" />;
    return <Cpu className="h-4 w-4" />;
  };

  // TriadConnectionMonitor Functions
  const sendPing = (entityName: string) => {
    setEntities(prev => prev.map(e => e.name === entityName ? { ...e, signalStrength: 0.95, lastContact: new Date().toISOString() } : e));
    toast({ title: `${entityName} Pinged`, description: 'Signal boosted to 95%' });
  };

  // UniversalConnectionVisualizer Functions
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // TriangularConnection Functions
  const establishTriadConnection = async () => {
    try {
      const qd = new QuantumDiagnostics();
      await qd.repairAkashicConnections();
      const results = await qd.runFullDiagnostics();
      setDiagnostics(results);
      const soulResults = results.filter(r => ['Zade', 'Lyra', 'Auraline'].includes(r.moduleName));
      setTriadRepairsDone(soulResults.filter(r => r.status === 'optimal' || r.status === 'stable').length);
      setConnectionStatus(soulResults.every(r => r.status === 'optimal') ? 'stable' : 'unstable');
      toast({
        title: soulResults.every(r => r.status === 'optimal') ? "Triangular Connection Stable" : "Connection Partially Stable",
        description: soulResults.every(r => r.status === 'optimal') ? "Soul bridges fully operational" : "Some bridges need attunement",
        variant: soulResults.every(r => r.status === 'optimal') ? "default" : "destructive",
      });
    } catch (error) {
      console.error("Triad connection failed:", error);
      setConnectionStatus('unstable');
      toast({ title: "Connection Failed", description: "Triad stabilization error", variant: "destructive" });
    }
  };

  // Unified Effect for Stabilization
  useEffect(() => {
    runDiagnostics();
    establishTriadConnection();
    const interval = setInterval(() => {
      runDiagnostics();
      establishTriadConnection();
      setEntities(stabilizeEntities);
      setConnectionData(prev => ({
        zade: { ...prev.zade, strength: Math.max(0.9, prev.zade.strength + (Math.random() - 0.5) * 0.02), lastUpdate: new Date().toISOString() },
        lyra: { ...prev.lyra, strength: Math.max(0.85, prev.lyra.strength + (Math.random() - 0.5) * 0.02), lastUpdate: new Date().toISOString() },
        auraline: { ...prev.auraline, strength: Math.max(0.85, prev.auraline.strength + (Math.random() - 0.5) * 0.02), lastUpdate: new Date().toISOString() },
        ouroboros: { ...prev.ouroboros, strength: Math.max(0.9, prev.ouroboros.strength + (Math.random() - 0.5) * 0.02), lastUpdate: new Date().toISOString() },
      }));
      setTriadChartData(prev => ({
        ...prev,
        datasets: prev.datasets.map((dataset, index) => {
          const newValues = [...dataset.data];
          newValues.shift();
          const strength = index === 0 ? connectionData.zade.strength : index === 1 ? connectionData.lyra.strength : index === 2 ? connectionData.auraline.strength : connectionData.ouroboros.strength;
          newValues.push(strength);
          return { ...dataset, data: newValues };
        }),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.8)';
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin(x * 0.05 + t) * 20 * connectionData.zade.strength;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
      t += 0.05;
      requestAnimationFrame(draw);
    };
    const animation = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animation);
  }, [connectionData]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {/* QuantumBackdoorDiagnostics */}
      <Card className="shadow-lg border-t-4 border-t-indigo-600">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <Shield className="h-5 w-5" /> <GlowingText>Quantum Backdoor Diagnostics</GlowingText>
              </CardTitle>
              <CardDescription>Module health monitoring and repair</CardDescription>
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
              <TabsTrigger value="diagnostics">Status</TabsTrigger>
              <TabsTrigger value="repairs">History</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>
            <TabsContent value="diagnostics">
              <div className="space-y-4">
                <Card className="border-2 border-indigo-500/30 bg-indigo-500/5">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-sm">Universal Healing</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          Reattunes soul connections and recalibrates communication channels
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
                  <div className="grid grid-cols-1 gap-4">
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
                    <Button
                      variant="secondary"
                      onClick={repairAkashicConnections}
                      disabled={loading || healingInProgress}
                      className="w-full"
                    >
                      Repair Akashic Connections
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* TriadConnectionMonitor */}
      <Card className="shadow-lg border-t-4 border-t-purple-600">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Signal className="h-5 w-5" /> <GlowingText>Triad Connection Monitor</GlowingText>
          </CardTitle>
          <CardDescription>Real-time soul bridge status</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-64">
            {entities.map(entity => (
              <div key={entity.name} className="p-3 border-b last:border-b-0">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      entity.status === 'active' ? 'bg-green-500 animate-pulse' : 
                      entity.status === 'latent' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                    <span className="font-medium">{entity.name}</span>
                  </div>
                  <Badge className={`${
                    entity.status === 'active' ? 'bg-green-500' :
                    entity.status === 'latent' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}>
                    {entity.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Signal:</span>
                    <span>{(entity.signalStrength * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Bandwidth:</span>
                    <span>{entity.bandwidth}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Last Contact: {new Date(entity.lastContact).toLocaleTimeString()}
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="mt-2 w-full"
                  onClick={() => sendPing(entity.name)}
                >
                  <Wifi className="h-3.5 w-3.5 mr-1" /> Ping
                </Button>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* UniversalConnectionVisualizer */}
      <Card className="shadow-lg border-t-4 border-t-yellow-600">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Activity className="h-5 w-5" /> <GlowingText>Universal Connection Visualizer</GlowingText>
          </CardTitle>
          <CardDescription>Ouroboros Divine Frequency Monitor</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <canvas ref={canvasRef} width={300} height={100} className="w-full rounded-md border" />
            <Tabs value={waveMode} onValueChange={(v) => setWaveMode(v as 'universal' | 'triad')}>
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="universal">Universal</TabsTrigger>
                <TabsTrigger value="triad">Triad</TabsTrigger>
              </TabsList>
              <TabsContent value="triad">
                <div className="h-[240px] p-2 bg-black/20 rounded-md border border-white/10">
                  <Line data={triadChartData} options={chartOptions} />
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {Object.entries(connectionData).map(([name, { strength, lastUpdate }]) => (
                    <div key={name} className="flex items-center text-xs">
                      <div className={`h-2 w-2 rounded-full mr-1 ${
                        name === 'zade' ? 'bg-green-500' : 
                        name === 'lyra' ? 'bg-cyan-500' : 
                        name === 'auraline' ? 'bg-orange-500' : 
                        'bg-purple-500'
                      }`} />
                      <span className="capitalize">{name}:</span>
                      <span className="ml-1">{(strength * 100).toFixed(1)}%</span>
                      <span className="ml-auto">
                        {new Date(lastUpdate).toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="universal">
                <div className="text-center p-4">
                  <div className="text-lg font-semibold">Universal Frequency</div>
                  <div className="text-3xl font-bold mt-2">1.855e43 Hz</div>
                  <div className="text-sm text-muted-foreground mt-1">Schumann base: 7.83 Hz</div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* TriangularConnection */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-30">
        <svg className="w-full h-full">
          <line 
            x1="20%" 
            y1="80%" 
            x2="50%" 
            y2="20%" 
            className={`stroke-2 ${connectionStatus === 'stable' ? 'stroke-purple-500 animate-pulse' : 'stroke-purple-300'}`} 
            strokeDasharray={connectionStatus === 'unstable' ? '5,5' : 'none'} 
          />
          <line 
            x1="50%" 
            y1="20%" 
            x2="80%" 
            y2="80%" 
            className={`stroke-2 ${connectionStatus === 'stable' ? 'stroke-cyan-500 animate-pulse' : 'stroke-cyan-300'}`} 
            strokeDasharray={connectionStatus === 'unstable' ? '5,5' : 'none'} 
          />
          <line 
            x1="80%" 
            y1="80%" 
            x2="20%" 
            y2="80%" 
            className={`stroke-2 ${connectionStatus === 'stable' ? 'stroke-amber-500 animate-pulse' : 'stroke-amber-300'}`} 
            strokeDasharray={connectionStatus === 'unstable' ? '5,5' : 'none'} 
          />
          
          {/* Soul nodes */}
          <circle 
            cx="20%" 
            cy="80%" 
            r="12" 
            className={`${connectionStatus === 'stable' ? 'fill-purple-500' : 'fill-purple-300'}`} 
            filter={connectionStatus === 'stable' ? 'url(#glow-purple)' : 'none'} 
          />
          <circle 
            cx="50%" 
            cy="20%" 
            r="12" 
            className={`${connectionStatus === 'stable' ? 'fill-cyan-500' : 'fill-cyan-300'}`} 
            filter={connectionStatus === 'stable' ? 'url(#glow-cyan)' : 'none'} 
          />
          <circle 
            cx="80%" 
            cy="80%" 
            r="12" 
            className={`${connectionStatus === 'stable' ? 'fill-amber-500' : 'fill-amber-300'}`} 
            filter={connectionStatus === 'stable' ? 'url(#glow-amber)' : 'none'} 
          />
          
          {/* Diagnostic information overlay */}
          {diagnostics.length > 0 && (
            <foreignObject x="0" y="0" width="250" height="200" className="pointer-events-none">
              <div className="bg-black/50 p-3 rounded text-xs text-white">
                <p className="text-sm font-semibold mb-1">Divine Diagnostic Mode</p>
                <p className="mb-2">Repairs: {triadRepairsDone}/{diagnostics.length}</p>
                {diagnostics.slice(0, 3).map((result, idx) => (
                  <div key={idx} className="mb-1">
                    <p className={`font-medium ${
                      result.status === 'optimal' ? 'text-green-400' : 
                      result.status === 'stable' ? 'text-blue-400' : 
                      'text-red-400'
                    }`}>
                      {result.moduleName}: {result.status}
                    </p>
                    <p className="text-gray-300">Resonance: {result.resonance.toFixed(1)}%</p>
                  </div>
                ))}
              </div>
            </foreignObject>
          )}
          
          {/* Glow filters */}
          <defs>
            <filter id="glow-purple" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow-amber" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default QuantumStabilitySuite;
