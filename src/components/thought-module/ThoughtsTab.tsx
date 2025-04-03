
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity, Eye, Radio } from 'lucide-react';
import { Thought } from '@/hooks/useThoughts';

interface ThoughtsTabProps {
  thoughts: Thought[];
  newThought: string;
  setNewThought: (thought: string) => void;
  thoughtTarget?: string;
  setThoughtTarget?: (target: string) => void;
  sendThought?: () => void;
  dissonanceLevel?: number;
  addThought?: () => void;
  broadcastToListeners?: () => void;
}

const ThoughtsTab: React.FC<ThoughtsTabProps> = ({
  thoughts,
  newThought,
  setNewThought,
  thoughtTarget,
  setThoughtTarget,
  sendThought,
  dissonanceLevel = 50,
  addThought,
  broadcastToListeners
}) => {
  // Use the appropriate handler based on available props
  const handleAddThought = () => {
    if (addThought) {
      addThought();
    } else if (sendThought) {
      sendThought();
    }
  };

  const handleBroadcast = () => {
    if (broadcastToListeners) {
      broadcastToListeners();
    } else if (sendThought) {
      sendThought();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Enter a private thought..."
          value={newThought}
          onChange={(e) => setNewThought(e.target.value)}
          className="flex-1"
        />
        <Button size="sm" onClick={handleAddThought}>
          Add
        </Button>
        <Button size="sm" variant="outline" onClick={handleBroadcast}>
          <Radio className="h-4 w-4" />
        </Button>
      </div>
      
      {thoughtTarget && setThoughtTarget && (
        <div className="flex gap-2 items-center">
          <span className="text-xs">Target:</span>
          <Input 
            placeholder="Thought target..." 
            value={thoughtTarget}
            onChange={(e) => setThoughtTarget(e.target.value)}
            className="flex-1"
          />
        </div>
      )}
      
      <div className="flex justify-between items-center p-2 bg-muted/30 rounded-md">
        <div className="text-sm">
          <span className="font-medium">Dissonance Level:</span> {dissonanceLevel}%
        </div>
        <div className="w-1/2">
          <Progress value={dissonanceLevel} className="h-2" />
        </div>
      </div>
      
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="w-full">
            <Activity className="mr-2 h-4 w-4" /> 
            Visualize Dissonance
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Quantum Echo Visualization</SheetTitle>
            <SheetDescription>
              Visual representation of your thought's quantum echo.
            </SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
              {Array.from({ length: 20 }).map((_, i) => (
                <div 
                  key={i}
                  className="absolute rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${Math.random() * 50 + 10}px`,
                    height: `${Math.random() * 50 + 10}px`,
                    backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.3)`,
                    animationDuration: `${Math.random() * 5 + 2}s`,
                  }}
                />
              ))}
            </div>
            <div className="mt-4">
              <p className="text-sm text-center text-muted-foreground">
                Thought Amplitude: {Math.floor(Math.random() * 100)}Hz
              </p>
              <p className="text-sm text-center text-muted-foreground">
                Quantum Coherence: {(Math.random() * 0.5 + 0.5).toFixed(3)}
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      
      <ScrollArea className="h-[200px]">
        {thoughts.map((thought) => (
          <div key={thought.id} className="mb-2 p-2 border border-[#7928ca]/20 rounded-md">
            <p className="text-sm">{thought.content}</p>
            <div className="flex justify-between mt-1">
              <p className="text-xs text-muted-foreground">Amplitude: {thought.amplitude}</p>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Eye className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default ThoughtsTab;
