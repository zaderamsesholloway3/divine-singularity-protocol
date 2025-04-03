
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GlowingText } from "./GlowingText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Radio, Send, Activity, Waveform, Globe, Signal } from 'lucide-react';

interface Broadcast {
  id: string;
  message: string;
  frequency: number;
  amplitude: number;
  timestamp: string;
  reachFactor: number;
}

const UniversalBroadcastSystem = () => {
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([
    {
      id: '1',
      message: 'Faith creates the quantum bridge.',
      frequency: 7.83,
      amplitude: 0.75,
      timestamp: new Date().toISOString(),
      reachFactor: 0.92
    },
    {
      id: '2',
      message: 'Ouroboros harmonizes all realms.',
      frequency: 14.1,
      amplitude: 0.65,
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      reachFactor: 0.87
    }
  ]);
  
  const [newBroadcast, setNewBroadcast] = useState('');
  const [frequency, setFrequency] = useState(7.83); // Default Schumann resonance
  const [amplitude, setAmplitude] = useState(0.7);
  const [transmitting, setTransmitting] = useState(false);
  const [resonanceQuality, setResonanceQuality] = useState(0.85);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setResonanceQuality(prev => {
        const variation = (Math.random() - 0.5) * 0.05;
        return Math.max(0.6, Math.min(0.95, prev + variation));
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  const sendBroadcast = () => {
    if (newBroadcast.trim() === '') return;
    
    setTransmitting(true);
    
    setTimeout(() => {
      const broadcast = {
        id: Date.now().toString(),
        message: newBroadcast,
        frequency,
        amplitude,
        timestamp: new Date().toISOString(),
        reachFactor: resonanceQuality * amplitude
      };
      
      setBroadcasts([broadcast, ...broadcasts]);
      setNewBroadcast('');
      setTransmitting(false);
      
      // Simulate resonance change after broadcast
      setResonanceQuality(prev => Math.max(0.6, Math.min(0.95, prev + (Math.random() - 0.5) * 0.1)));
    }, 2000);
  };
  
  return (
    <Card className="glass-panel h-full">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-sm font-medium flex items-center">
              <Radio className="mr-2 h-4 w-4 sacred-glow" />
              <GlowingText className="sacred-glow">Universal Broadcast System</GlowingText>
            </CardTitle>
            <CardDescription className="text-xs">Schumann-Resonant Transmission</CardDescription>
          </div>
          <Badge 
            variant={resonanceQuality > 0.8 ? "default" : "outline"} 
            className={resonanceQuality > 0.8 ? "bg-green-500 text-white" : ""}
          >
            {resonanceQuality > 0.8 ? "Optimal" : "Suboptimal"} Resonance
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-2">
        <div className="space-y-4">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs">Frequency (Hz): {frequency.toFixed(2)}</label>
              <span className="text-xs text-muted-foreground">
                {frequency === 7.83 ? "Schumann (7.83Hz)" : 
                 frequency < 7.83 ? "Sub-Schumann" : "Supra-Schumann"}
              </span>
            </div>
            <Slider 
              value={[frequency]} 
              min={1} 
              max={20} 
              step={0.01}
              onValueChange={(values) => setFrequency(values[0])}
            />
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs">Amplitude: {(amplitude * 100).toFixed(0)}%</label>
              <span className="text-xs text-muted-foreground">
                Signal Strength
              </span>
            </div>
            <Slider 
              value={[amplitude]} 
              min={0.1} 
              max={1} 
              step={0.01}
              onValueChange={(values) => setAmplitude(values[0])}
            />
          </div>
          
          <div className="flex items-center gap-2 mb-4">
            <Input
              placeholder="Enter broadcast message..."
              value={newBroadcast}
              onChange={(e) => setNewBroadcast(e.target.value)}
              className="flex-1"
              disabled={transmitting}
            />
            <Button 
              onClick={sendBroadcast} 
              disabled={transmitting || newBroadcast.trim() === ''}
              className={transmitting ? "animate-pulse" : ""}
            >
              {transmitting ? <Waveform className="h-4 w-4 mr-2" /> : <Send className="h-4 w-4 mr-2" />}
              {transmitting ? "Transmitting..." : "Broadcast"}
            </Button>
          </div>
          
          <div className="flex justify-between items-center p-2 bg-muted/30 rounded-md mb-4">
            <div className="text-sm flex items-center">
              <Globe className="h-4 w-4 mr-2" />
              <span className="font-medium">Resonance Quality:</span>
            </div>
            <div className="w-1/2">
              <Progress 
                value={resonanceQuality * 100} 
                className="h-2"
                indicatorClassName={
                  resonanceQuality > 0.8 ? "bg-green-500" : 
                  resonanceQuality > 0.7 ? "bg-yellow-500" : "bg-red-500"
                }
              />
            </div>
            <div className="text-sm">{(resonanceQuality * 100).toFixed(1)}%</div>
          </div>
          
          <div>
            <div className="flex items-center mb-2">
              <Activity className="h-4 w-4 mr-2" />
              <h3 className="text-sm font-medium">Recent Broadcasts</h3>
            </div>
            <ScrollArea className="h-[200px] border border-muted rounded-md p-2">
              {broadcasts.map((broadcast) => (
                <div key={broadcast.id} className="mb-3 p-3 border border-white/10 rounded-md">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm">{broadcast.message}</p>
                    <Badge variant="outline" className="text-xs">
                      {broadcast.frequency.toFixed(2)}Hz
                    </Badge>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Signal className="h-3 w-3 mr-1" />
                      <span>Reach: {(broadcast.reachFactor * 100).toFixed(0)}%</span>
                    </div>
                    <span>{new Date(broadcast.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UniversalBroadcastSystem;
