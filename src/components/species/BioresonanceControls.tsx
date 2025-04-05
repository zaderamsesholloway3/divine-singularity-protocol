
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Wand2, Zap, Activity, Shield } from 'lucide-react';
import { QuantumBioresonanceAmplifier } from '@/utils/quantumBioresonanceAmplifier';
import { BioresonanceConfig, SpeciesResonanceProfile } from '@/types/quantum-entanglement';
import { FaithResonanceService } from '@/utils/FaithResonanceService';

interface BioresonanceControlsProps {
  selectedSpecies?: { name: string; vibration?: number; }[] | null;
  faithQuotient?: number;
  onAmplificationComplete?: (result: any) => void;
  bioresonanceFrequency?: number;
  bioresonancePower?: number;
  schema?: string;
  onIncreasePower?: () => void;
}

const BioresonanceControls: React.FC<BioresonanceControlsProps> = ({ 
  selectedSpecies = [], 
  faithQuotient = 0.8,
  onAmplificationComplete,
  bioresonanceFrequency,
  bioresonancePower,
  schema,
  onIncreasePower
}) => {
  const { toast } = useToast();
  const [amplifier] = useState(() => new QuantumBioresonanceAmplifier());
  const [config, setConfig] = useState<BioresonanceConfig>(amplifier.getConfig());
  const [processing, setProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [lastResult, setLastResult] = useState<any>(null);
  
  const updateConfig = (partialConfig: Partial<BioresonanceConfig>) => {
    const newConfig = {
      ...config,
      ...partialConfig
    };
    setConfig(newConfig);
    amplifier.updateConfig(partialConfig);
  };
  
  const runAmplification = () => {
    if (!selectedSpecies || selectedSpecies.length === 0) {
      toast({
        title: "No Species Selected",
        description: "Please select at least one species for ping amplification",
        variant: "destructive"
      });
      return;
    }
    
    setProcessing(true);
    setProcessingProgress(0);
    
    // Generate artificial progress updates
    const progressInterval = setInterval(() => {
      setProcessingProgress(prev => {
        const newProgress = prev + (5 + Math.random() * 15);
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 200);
    
    // Generate species profiles from selected species
    const speciesProfiles: SpeciesResonanceProfile[] = selectedSpecies.map(species => {
      const baseFrequency = species.vibration || 7.83;
      return amplifier.generateSpeciesProfile(species.name);
    });
    
    // Apply faith quotient modulation if available
    const adjustedFaithQuotient = faithQuotient ? 
      FaithResonanceService.getSchumannAdjustedFaithIndex(faithQuotient) : 
      undefined;
    
    setTimeout(() => {
      clearInterval(progressInterval);
      
      // Perform the amplification
      const result = amplifier.amplifyPing(speciesProfiles, adjustedFaithQuotient);
      setLastResult(result);
      
      // Notify completion
      toast({
        title: result.success ? "Amplification Complete" : "Amplification Failed",
        description: result.success ? 
          `Achieved ${result.amplificationFactor.toFixed(1)}x amplification with ${result.noiseImmunity.toFixed(1)}% noise immunity` : 
          "Schumann resonance variance too high, try again later",
      });
      
      // Call completion callback
      if (onAmplificationComplete) {
        onAmplificationComplete(result);
      }
      
      setProcessing(false);
      setProcessingProgress(100);
      
      // Reset progress after a delay
      setTimeout(() => setProcessingProgress(0), 2000);
    }, 3000);
  };
  
  const getEfficiencyColor = () => {
    if (!lastResult) return "text-muted-foreground";
    const efficiency = lastResult.energyEfficiency;
    if (efficiency >= 1.855e43 * 0.9) return "text-green-500";
    if (efficiency >= 1.855e43 * 0.7) return "text-blue-500";
    if (efficiency >= 1.855e43 * 0.5) return "text-yellow-500";
    return "text-red-500";
  };
  
  return (
    <Card className="border border-muted mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center">
          <Wand2 className="mr-2 h-4 w-4" />
          Quantum Bioresonance Amplifier
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4 pt-0">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-xs font-medium">Carrier Wave</div>
            <div className="flex items-center justify-between">
              <span className="text-xs">Frequency</span>
              <Badge variant="outline">{config.carrierWave.frequency.toFixed(2)} Hz</Badge>
            </div>
            <Slider
              value={[config.carrierWave.frequency]}
              min={5}
              max={15}
              step={0.01}
              onValueChange={(values) => updateConfig({
                carrierWave: { ...config.carrierWave, frequency: values[0] }
              })}
              disabled={processing}
            />
          </div>
          
          <div className="space-y-2">
            <div className="text-xs font-medium">VCSEL Integration</div>
            <div className="flex items-center justify-between">
              <span className="text-xs">Spectral Width</span>
              <Badge variant="outline">{config.photonicsIntegration.vcselSpectralWidth} nm</Badge>
            </div>
            <Slider
              value={[config.photonicsIntegration.vcselSpectralWidth]}
              min={1}
              max={10}
              step={0.5}
              onValueChange={(values) => updateConfig({
                photonicsIntegration: { 
                  ...config.photonicsIntegration, 
                  vcselSpectralWidth: values[0] 
                }
              })}
              disabled={processing}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-medium">Feedback Loop</span>
              <span className="text-xs text-muted-foreground">Quantum error correction</span>
            </div>
            <Switch
              checked={config.feedbackLoopActive}
              onCheckedChange={(checked) => updateConfig({ feedbackLoopActive: checked })}
              disabled={processing}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-medium">Interspecies Alert</span>
              <span className="text-xs text-muted-foreground">Dolphin click preamble</span>
            </div>
            <Switch
              checked={config.interspeciesAlertEnabled}
              onCheckedChange={(checked) => updateConfig({ interspeciesAlertEnabled: checked })}
              disabled={processing}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-medium">Metrology Enhancement</span>
              <span className="text-xs text-muted-foreground">Advanced error mitigation</span>
            </div>
            <Switch
              checked={config.metrologyEnhanced}
              onCheckedChange={(checked) => updateConfig({ metrologyEnhanced: checked })}
              disabled={processing}
            />
          </div>
          
          <div className="flex flex-col">
            <span className="text-xs font-medium">YBCO Stability</span>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Superconducting temp</span>
              <Badge 
                variant={config.validationProtocol.superconductingStability === 93 ? "default" : "destructive"}
              >
                {config.validationProtocol.superconductingStability}K
              </Badge>
            </div>
          </div>
        </div>
        
        {processing && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Processing Amplification</span>
              <span>{processingProgress.toFixed(0)}%</span>
            </div>
            <Progress value={processingProgress} className="h-2" />
          </div>
        )}
        
        {lastResult && (
          <div className="grid grid-cols-2 gap-2 p-2 bg-muted/30 rounded">
            <div className="text-xs">Amplification: <span className="font-medium">{lastResult.amplificationFactor.toFixed(1)}x</span></div>
            <div className="text-xs">Noise Immunity: <span className="font-medium">{lastResult.noiseImmunity.toFixed(1)}%</span></div>
            <div className="text-xs">QBER: <span className="font-medium">{(lastResult.qber * 100).toFixed(2)}%</span></div>
            <div className="text-xs">Target Species: <span className="font-medium">{lastResult.targetSpecies.length}</span></div>
            <div className="text-xs col-span-2">
              Energy Efficiency: <span className={`font-medium ${getEfficiencyColor()}`}>{lastResult.energyEfficiency.toExponential(2)} ping/J</span>
              {lastResult.energyEfficiency >= 1.855e43 * 0.9 && (
                <Badge variant="outline" className="ml-2 bg-green-500/10 text-green-500 border-green-500">
                  Divine Constant Match
                </Badge>
              )}
            </div>
          </div>
        )}
        
        <div className="flex gap-2">
          <Button 
            className="flex-1" 
            onClick={runAmplification} 
            disabled={processing}
          >
            {processing ? (
              <>
                <Activity className="mr-2 h-4 w-4 animate-pulse" />
                Amplifying...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-4 w-4" />
                Amplify Ping
              </>
            )}
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => updateConfig({
              carrierWave: { frequency: 7.83, modulation: 'NV-diamond' },
              validationProtocol: { 
                ...config.validationProtocol,
                superconductingStability: 93
              }
            })}
            disabled={processing}
            className="flex items-center"
            title="Reset to Torah-compliant values"
          >
            <Shield className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BioresonanceControls;
