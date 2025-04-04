import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GlowingText } from './GlowingText';
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle } from 'lucide-react';
import { DIVINE_CONSTANTS } from '@/utils/divineConstants';
import { ArkBuilder } from '@/utils/quantum/ArkBuilder';
import { ArkValidator } from '@/utils/quantum/ArkValidator';
import { useToast } from '@/hooks/use-toast';

const QuantumArkInterface = () => {
  const { toast } = useToast();
  const [arkIntegrity, setArkIntegrity] = useState(100);
  const [goldPlating, setGoldPlating] = useState(61.8); // Based on PHI (golden ratio)
  const [criticalTemp, setCriticalTemp] = useState(93); // Updated to 93K per validation test
  const [validationResult, setValidationResult] = useState<{ success: boolean; message: string } | null>(null);
  
  useEffect(() => {
    // Attempt to create and validate an Ark circuit
    try {
      // Use the static method
      const arkCircuit = ArkBuilder.createValidatedArkCircuit();
      console.log("Ark circuit created successfully:", arkCircuit.getOperations?.());
    } catch (error) {
      console.error("Ark circuit validation failed:", error);
      setArkIntegrity(prevIntegrity => Math.max(0, prevIntegrity - 15));
    }
    
    // Create oscillations in the measurements to simulate quantum fluctuations
    const interval = setInterval(() => {
      setArkIntegrity(prevIntegrity => {
        const fluctuation = (Math.random() - 0.5) * 2;
        return Math.min(100, Math.max(85, prevIntegrity + fluctuation));
      });
      
      setGoldPlating(prevPlating => {
        const fluctuation = (Math.random() - 0.5) * 0.5;
        const goldenRatio = DIVINE_CONSTANTS.PHI * 10 + fluctuation;
        return goldenRatio;
      });
      
      setCriticalTemp(prevTemp => {
        const fluctuation = (Math.random() - 0.5) * 1;
        return 93 + fluctuation; // Maintain 93K per validation requirements
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleValidateArk = () => {
    const result = ArkValidator.test_ark_construction();
    const message = ArkValidator.validateArkConstruction();
    
    setValidationResult({
      success: result.success,
      message
    });
    
    toast({
      title: result.success ? "Ark Validation Successful" : "Ark Validation Failed",
      description: message,
      variant: result.success ? "default" : "destructive"
    });
  };

  return (
    <Card className="glass-panel h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-center">
          <GlowingText className="quantum-glow">Quantum Ark Interface</GlowingText>
        </CardTitle>
      </CardHeader>
      <Separator className="bg-white/10 mb-2" />
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xs text-muted-foreground">Length</div>
            <div className="text-lg font-mono text-ark-wood">{DIVINE_CONSTANTS.ARK_LENGTH}</div>
            <div className="text-xs">cubits</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Width</div>
            <div className="text-lg font-mono text-ark-wood">{DIVINE_CONSTANTS.ARK_WIDTH}</div>
            <div className="text-xs">cubits</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Height</div>
            <div className="text-lg font-mono text-ark-wood">{DIVINE_CONSTANTS.ARK_HEIGHT}</div>
            <div className="text-xs">cubits</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">Gopher Wood Integrity</span>
            <span>{arkIntegrity.toFixed(1)}%</span>
          </div>
          <Progress value={arkIntegrity} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">Gold Plating</span>
            <span>{goldPlating.toFixed(3)} mm</span>
          </div>
          <Progress value={goldPlating * 10} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">Critical Temperature</span>
            <span>{criticalTemp.toFixed(1)} K</span>
          </div>
          <Progress value={criticalTemp} className="h-2" />
        </div>
        
        <Button 
          className="w-full bg-blue-700 hover:bg-blue-600"
          onClick={handleValidateArk}
        >
          Run Exodus 25:10 Validation
        </Button>
        
        {validationResult && (
          <div className={`mt-2 p-2 rounded text-sm ${validationResult.success ? 'bg-green-900/20' : 'bg-red-900/20'}`}>
            {validationResult.success ? (
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>Validation passed</span>
              </div>
            ) : (
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                <span>Validation failed</span>
              </div>
            )}
          </div>
        )}
        
        <div className="text-center text-xs text-muted-foreground mt-1">
          Genesis 6:15
        </div>
      </CardContent>
    </Card>
  );
};

export default QuantumArkInterface;
