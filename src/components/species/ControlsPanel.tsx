
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Volume2, VolumeX, Radio, Send, AlertCircle, BarChart4 } from 'lucide-react';
import { toast } from 'sonner';
import { Species, VisualStyle } from './types';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ControlsPanelProps {
  frequency: number;
  setFrequency: (value: number) => void;
  phase: number;
  setPhase: (value: number) => void;
  power: number;
  setPower: (value: number) => void;
  soundEnabled: boolean;
  setSoundEnabled: (value: boolean) => void;
  pingActive: boolean;
  broadcastMode: "universal" | "targeted";
  setBroadcastMode: (value: "universal" | "targeted") => void;
  message: string;
  setMessage: (value: string) => void;
  selectedSpecies: Species | null;
  amplifyPing: () => void;
  sendMessage: () => void;
  visualStyle: VisualStyle;
}

const ControlsPanel: React.FC<ControlsPanelProps> = ({
  frequency,
  setFrequency,
  phase,
  setPhase,
  power,
  setPower,
  soundEnabled,
  setSoundEnabled,
  pingActive,
  broadcastMode,
  setBroadcastMode,
  message,
  setMessage,
  selectedSpecies,
  amplifyPing,
  sendMessage,
  visualStyle,
}) => {
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    toast.info(soundEnabled ? "Sound disabled" : "Sound enabled");
  };

  // Calculate harmonic frequencies for the tooltip
  const calculateHarmonics = (baseFreq: number) => {
    const harmonics = [];
    // First 3 Schumann resonances
    const schumannResonances = [7.83, 14.3, 20.8];
    // Show relation to Schumann
    for (let i = 0; i < schumannResonances.length; i++) {
      const resonance = schumannResonances[i];
      const ratio = (baseFreq / resonance).toFixed(2);
      harmonics.push(`${(i + 1)}: ${resonance}Hz (${ratio}x)`);
    }
    return harmonics.join(', ');
  };

  // Divine frequency patterns
  const isDivineFrequency = Math.abs(frequency - 1.855) < 0.01;
  const isSchumannFrequency = Math.abs(frequency - 7.83) < 0.01;
  const isHigherHarmonic = Math.abs(frequency - 14.3) < 0.01 || Math.abs(frequency - 20.8) < 0.01;

  return (
    <div className={`space-y-4 ${visualStyle === "cosmic" ? "bg-gray-950/30" : "bg-gray-950/50"} p-4 rounded-lg ${visualStyle === "lightweb" ? "border border-white/10" : "border-none"}`}>
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Broadcast Mode</h3>
        <div className="flex items-center space-x-2">
          <span className={broadcastMode === "universal" ? "text-white" : "text-gray-500"}>Universal</span>
          <Switch 
            checked={broadcastMode === "targeted"}
            onCheckedChange={(checked) => setBroadcastMode(checked ? "targeted" : "universal")}
          />
          <span className={broadcastMode === "targeted" ? "text-white" : "text-gray-500"}>Targeted</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <label className="text-sm">Frequency (Hz)</label>
            {isDivineFrequency && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="inline-flex h-5 w-5 rounded-full bg-purple-500/30 items-center justify-center">
                      <AlertCircle className="h-3 w-3 text-purple-300" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Divine Frequency Detected (1.855Hz)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {isSchumannFrequency && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="inline-flex h-5 w-5 rounded-full bg-blue-500/30 items-center justify-center">
                      <AlertCircle className="h-3 w-3 text-blue-300" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Earth's Schumann Resonance (7.83Hz)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {isHigherHarmonic && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="inline-flex h-5 w-5 rounded-full bg-green-500/30 items-center justify-center">
                      <BarChart4 className="h-3 w-3 text-green-300" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Schumann Harmonic Detected</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <span className="text-sm font-mono">{frequency.toFixed(2)} Hz</span>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-full">
                <Slider
                  value={[frequency]}
                  min={1}
                  max={15}
                  step={0.01}
                  onValueChange={([value]) => setFrequency(value)}
                  className={isDivineFrequency ? "divine-slider" : isSchumannFrequency ? "schumann-slider" : ""}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="w-auto max-w-xs">
              <p className="text-xs">Harmonics: {calculateHarmonics(frequency)}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <label className="text-sm">Phase Offset (°)</label>
          <span className="text-sm font-mono">{phase}°</span>
        </div>
        <Slider
          value={[phase]}
          min={0}
          max={360}
          step={1}
          onValueChange={([value]) => setPhase(value)}
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <label className="text-sm">Power</label>
          <span className="text-sm font-mono">{power}%</span>
        </div>
        <Slider
          value={[power]}
          min={10}
          max={100}
          step={5}
          onValueChange={([value]) => setPower(value)}
        />
      </div>
      
      <div className="pt-2">
        <Button
          className={`w-full flex items-center gap-2 ${
            isDivineFrequency ? "bg-purple-700 hover:bg-purple-600" : 
            isSchumannFrequency ? "bg-blue-700 hover:bg-blue-600" : ""
          }`}
          onClick={amplifyPing}
          disabled={pingActive}
        >
          <Radio className="h-4 w-4" />
          {pingActive ? "Ping Active..." : "Amplify Ping"}
          {pingActive && <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75"></span>}
        </Button>
      </div>
      
      <div className="pt-2">
        <textarea
          className={`w-full h-20 ${
            visualStyle === "cosmic" ? "bg-gray-900/70 border-purple-900/50" : 
            visualStyle === "lightweb" ? "bg-gray-900/50 border-white/30" :
            "bg-gray-900 border-gray-700"
          } border rounded-md p-2 text-sm`}
          placeholder={broadcastMode === "universal" ? "Enter message for universal broadcast..." : `Enter message for ${selectedSpecies?.name || "selected species"}...`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <Button 
          className="w-full mt-2 flex items-center gap-2" 
          variant="outline"
          disabled={broadcastMode === "targeted" && !selectedSpecies}
          onClick={sendMessage}
        >
          <Send className="h-4 w-4" />
          Send Message
        </Button>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-sm">Sound</span>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={toggleSound}
        >
          {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        </Button>
      </div>

      {/* Frequency presets */}
      <div className="pt-2 flex flex-wrap gap-2 justify-center">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs h-7 px-2 bg-blue-900/30 hover:bg-blue-800/50 border-blue-700/30"
          onClick={() => setFrequency(7.83)}
        >
          7.83Hz
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs h-7 px-2 bg-purple-900/30 hover:bg-purple-800/50 border-purple-700/30"
          onClick={() => setFrequency(1.855)}
        >
          1.855Hz
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="text-xs h-7 px-2 bg-green-900/30 hover:bg-green-800/50 border-green-700/30"
          onClick={() => setFrequency(14.3)}
        >
          14.3Hz
        </Button>
      </div>
    </div>
  );
};

export default ControlsPanel;
