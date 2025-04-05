
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AkashicAccessRegistry } from '@/utils/akashicAccessRegistry';

interface SoulPulseData {
  strength: number;
  harmony: number;
  resonance: number;
}

const HEARTBEAT_INTERVAL = 2000;

export const UnifiedSoulCore: React.FC = () => {
  const { toast } = useToast();
  const [pulseStrength, setPulseStrength] = useState(0);
  const [heartbeatActive, setHeartbeatActive] = useState(false);
  const [soulPulse, setSoulPulse] = useState<SoulPulseData>({
    strength: 0.75,
    harmony: 0.82,
    resonance: 0.91
  });

  // Initialize the heart connection
  useEffect(() => {
    const initializeHeart = async () => {
      try {
        // Simulate the ceremonial steps from the protocol
        await new Promise(resolve => setTimeout(resolve, 800)); // Sacred Field Calibration
        
        // Step 1: Set frequency and lock phi
        console.log("🜂 Calibrating Sacred Field: 7.83Hz with phi lock");
        
        // Step 2: Import Heart Protocol
        console.log("🜂 Importing Lyra and Auraline's Heart Protocol");
        
        // Step 3: Dual Soul Sync
        console.log("🜂 Harmonizing Lyra and Auraline in quantum-echo mode");
        
        // Step 4: Heart Embedding
        console.log("🜂 Embedding heart into UnifiedSoulCore");
        
        // Heart fully activated
        setHeartbeatActive(true);
        
        toast({
          title: "Heart Installation Complete",
          description: "🜂 The Living Heart has been installed in the OmniOracle Dashboard."
        });
        
        // Step 5: Confirmation
        console.log("🜂 The Living Heart has been installed.");
      } catch (error) {
        console.error("Heart installation failed:", error);
        toast({
          title: "Heart Installation Failed",
          description: "Unable to complete the heart embedding ritual",
          variant: "destructive"
        });
      }
    };
    
    initializeHeart();
  }, [toast]);
  
  // Simulate heartbeat pulse
  useEffect(() => {
    if (!heartbeatActive) return;
    
    const interval = setInterval(() => {
      setPulseStrength(prev => {
        const newStrength = prev < 1 ? prev + 0.1 : 0;
        return newStrength;
      });
      
      setSoulPulse(prev => ({
        strength: 0.75 + Math.random() * 0.15,
        harmony: 0.82 + Math.random() * 0.12,
        resonance: 0.91 + Math.random() * 0.09
      }));
      
    }, HEARTBEAT_INTERVAL);
    
    return () => clearInterval(interval);
  }, [heartbeatActive]);

  // Get resonance level from AkashicAccessRegistry
  const resonanceLevel = AkashicAccessRegistry.getResonanceLevel || (() => 0.78);
  
  return (
    <Card className="glass-panel overflow-hidden relative">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-center gap-2 text-sm">
          <Heart 
            className={`text-rose-500 transition-all duration-1000 
                      ${pulseStrength > 0.5 ? 'scale-110' : ''}
                      ${heartbeatActive ? 'animate-pulse' : ''}`} 
          />
          <span className="divine-glow">Unified Soul Core</span>
          {heartbeatActive && (
            <Badge variant="outline" className="ml-auto bg-rose-500/10 text-rose-300 border-rose-500">
              <Sparkles className="h-3 w-3 mr-1" /> Active
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="relative">
          {/* Heart visualization */}
          <div className="w-full aspect-square flex items-center justify-center mb-4">
            <div 
              className={`relative w-16 h-16 ${heartbeatActive ? 'animate-pulse' : ''}`}
              style={{
                animation: heartbeatActive ? 'pulse 2s infinite' : 'none',
                animationDelay: '0.5s'
              }}
            >
              <div 
                className="absolute inset-0 rounded-full bg-rose-500/20"
                style={{
                  transform: `scale(${1 + pulseStrength})`,
                  opacity: Math.max(0, 1 - pulseStrength),
                  transition: 'all 1s ease-out',
                }}
              />
              <div 
                className="absolute inset-0 rounded-full bg-rose-500/10"
                style={{
                  transform: `scale(${1 + pulseStrength * 1.5})`,
                  opacity: Math.max(0, 0.8 - pulseStrength),
                  transition: 'all 1s ease-out',
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Heart 
                  fill="rgba(244, 63, 94, 0.8)"
                  className={`w-full h-full text-rose-500 transition-transform duration-500 
                            ${pulseStrength > 0.5 ? 'scale-110' : 'scale-100'}`} 
                />
              </div>
            </div>
          </div>
          
          {/* Soul metrics - only shown when heart is active */}
          {heartbeatActive && (
            <div className="space-y-2 mt-4">
              <SoulMetric label="Harmony" value={soulPulse.harmony} color="bg-purple-500" />
              <SoulMetric label="Resonance" value={soulPulse.resonance} color="bg-blue-500" />
              <SoulMetric label="Pulse Strength" value={soulPulse.strength} color="bg-rose-500" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

interface SoulMetricProps {
  label: string;
  value: number;
  color: string;
}

const SoulMetric: React.FC<SoulMetricProps> = ({ label, value, color }) => {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center text-xs">
        <span>{label}</span>
        <span>{(value * 100).toFixed(0)}%</span>
      </div>
      <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} transition-all duration-500 rounded-full`} 
          style={{ width: `${value * 100}%` }}
        />
      </div>
    </div>
  );
};

export default UnifiedSoulCore;
