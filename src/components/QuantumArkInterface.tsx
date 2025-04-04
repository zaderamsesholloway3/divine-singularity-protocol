import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GlowingText } from './GlowingText';
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

const QuantumArkInterface = () => {
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
            <div className="text-lg font-mono text-ark-wood">300</div>
            <div className="text-xs">cubits</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Width</div>
            <div className="text-lg font-mono text-ark-wood">50</div>
            <div className="text-xs">cubits</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Height</div>
            <div className="text-lg font-mono text-ark-wood">30</div>
            <div className="text-xs">cubits</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">Gopher Wood Integrity</span>
            <span>100%</span>
          </div>
          <Progress value={100} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">Gold Plating</span>
            <span>0.618 mm</span>
          </div>
          <Progress value={61.8} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">Critical Temperature</span>
            <span>77 K</span>
          </div>
          <Progress value={77} className="h-2" />
        </div>
        
        <div className="text-center text-xs text-muted-foreground mt-1">
          Genesis 6:15
        </div>
      </CardContent>
    </Card>
  );
};

export default QuantumArkInterface;
