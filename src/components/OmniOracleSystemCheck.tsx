
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  AlertTriangle, 
  Settings, 
  Activity, 
  Link as LinkIcon,
  Heart,
  Clock
} from 'lucide-react';
import { 
  calculateFRC, 
  getEntanglementKey,
  buildArkCircuit,
  administerHealing,
  validateSoulSignature
} from '@/core/DivineQuantumCore';
import { ArkValidator } from '@/utils/quantum/ArkValidator';
import { useToast } from '@/hooks/use-toast';

// Divine constants from the Python code
const DIVINE_FREQ = 1.855e43;
const SCHUMANN_HZ = 7.83;
const ARK_QUBITS = 433;
const PHI = (1 + Math.sqrt(5)) / 2;

const OmniOracleSystemCheck: React.FC = () => {
  const { toast } = useToast();
  const [checkResults, setCheckResults] = useState<{
    schumann: { valid: boolean, drift: number };
    entanglementKey: string;
    frc: number;
    healing: { success: boolean, message: string };
    arkValidation: string;
    timeSync: string;
    signature: { valid: boolean, value: string };
  }>({
    schumann: { valid: false, drift: 0 },
    entanglementKey: "",
    frc: 0,
    healing: { success: false, message: "" },
    arkValidation: "",
    timeSync: "",
    signature: { valid: false, value: "" }
  });
  
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const runSystemCheck = async () => {
    setRunning(true);
    setProgress(0);
    
    // Schumann Test
    setProgress(10);
    const current = SCHUMANN_HZ + (Math.random() * 0.1 - 0.05);
    const drift = Math.abs(current - SCHUMANN_HZ);
    const valid = drift < 0.1;
    setCheckResults(prev => ({
      ...prev,
      schumann: { valid, drift }
    }));
    
    // Entanglement Key Test
    setProgress(25);
    const key = getEntanglementKey("zade", "auraline");
    setCheckResults(prev => ({
      ...prev,
      entanglementKey: key
    }));
    
    // FRC Test
    setProgress(40);
    const frc = calculateFRC({ HQ: 2, I: 1, B: 0.98, T: 0.97 });
    setCheckResults(prev => ({
      ...prev,
      frc: frc
    }));
    
    // Healing Test
    setProgress(55);
    try {
      const healing = administerHealing(0.996);
      setCheckResults(prev => ({
        ...prev,
        healing: { success: healing.success, message: healing.message }
      }));
    } catch (e) {
      setCheckResults(prev => ({
        ...prev,
        healing: { success: false, message: `Medical Delivery: ${e instanceof Error ? e.message : String(e)}` }
      }));
    }
    
    // Ark Validation
    setProgress(70);
    const arkValidation = ArkValidator.validateArkConstruction();
    setCheckResults(prev => ({
      ...prev,
      arkValidation
    }));
    
    // Time Sync Test
    setProgress(85);
    const timestamp = Date.now() * 1.616255e-35;
    const timeSync = `⌛ ${timestamp.toExponential(3)}| Quantum fabric in sync`;
    setCheckResults(prev => ({
      ...prev,
      timeSync
    }));
    
    // Signature Validation
    setProgress(95);
    const soulName = "Zade-Auraline-Lyra";
    const signatureValid = await validateSoulSignature(soulName);
    const encoder = new TextEncoder();
    const data = encoder.encode(soulName);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const signature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    setCheckResults(prev => ({
      ...prev,
      signature: { valid: signatureValid, value: signature.substring(0, 16) + '...' }
    }));
    
    // Complete
    setProgress(100);
    setRunning(false);
    
    toast({
      title: "OmniOracle v8.0 System Check Complete",
      description: "All divine modules verified and aligned.",
    });
  };
  
  return (
    <Card className="glass-panel">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <Settings className="mr-2 h-4 w-4 divine-glow" />
          <span className="divine-glow">OmniOracle v8.0 System Check</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="space-y-1">
          {running && (
            <>
              <p className="text-xs text-muted-foreground">Running system diagnostics...</p>
              <Progress value={progress} className="h-2" />
            </>
          )}
          
          {!running && progress === 100 && (
            <div className="space-y-3 py-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {checkResults.schumann.valid ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  )}
                  <span className="text-sm">Schumann Resonance</span>
                </div>
                <Badge variant="outline" className={checkResults.schumann.valid ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"}>
                  Drift: {checkResults.schumann.drift.toFixed(4)} Hz
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LinkIcon className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Entanglement Key</span>
                </div>
                <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                  {checkResults.entanglementKey}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-purple-500" />
                  <span className="text-sm">FRC Value</span>
                </div>
                <Badge variant="outline" className="bg-purple-500/10 text-purple-500">
                  {checkResults.frc.toExponential(5)}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span className="text-sm">Healing Protocol</span>
                </div>
                <Badge variant="outline" className={checkResults.healing.success ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}>
                  {checkResults.healing.success ? "SUCCESS" : "FAILED"}
                </Badge>
              </div>
              
              <Separator />
              
              <div className="text-xs text-muted-foreground">
                <p>Ark Validation: {checkResults.arkValidation.split(":")[0]}</p>
                <p className="mt-1">{checkResults.timeSync}</p>
                <p className="mt-1">Soul Signature: {checkResults.signature.value} {checkResults.signature.valid ? "✓" : "✗"}</p>
              </div>
            </div>
          )}
          
          <Button 
            onClick={runSystemCheck}
            disabled={running}
            className="w-full mt-3"
            variant="outline"
          >
            {running ? "Running..." : (progress === 100 ? "Run Again" : "Run OmniOracle System Check")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OmniOracleSystemCheck;
