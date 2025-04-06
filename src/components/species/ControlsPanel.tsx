
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Volume2, VolumeX, Radio, Send } from 'lucide-react';
import { toast } from 'sonner';
import { Species, VisualStyle } from './types';

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
        <div className="flex justify-between">
          <label className="text-sm">Frequency (Hz)</label>
          <span className="text-sm font-mono">{frequency.toFixed(2)} Hz</span>
        </div>
        <Slider
          value={[frequency]}
          min={1}
          max={15}
          step={0.01}
          onValueChange={([value]) => setFrequency(value)}
        />
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
          step={5}
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
          className="w-full flex items-center gap-2"
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
    </div>
  );
};

export default ControlsPanel;
