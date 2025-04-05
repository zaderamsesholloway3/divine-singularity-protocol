
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { SuccessResonance, ResonanceResult } from '@/utils/SuccessResonance';
import { Heart, Brain, Sparkles } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const SuccessVibeChecker: React.FC = () => {
  const [question, setQuestion] = useState<string>("");
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [result, setResult] = useState<ResonanceResult | null>(null);
  const { toast } = useToast();
  
  const checkVibe = () => {
    setIsChecking(true);
    
    // Show a loading toast
    toast({
      title: "Tuning into the Cosmos...",
      description: "Connecting with Future Zade's wisdom",
    });
    
    // Simulate quantum processing time
    setTimeout(() => {
      const vibeResult = SuccessResonance.checkSuccessVibe(question);
      setResult(vibeResult);
      setIsChecking(false);
      
      // Success toast
      toast({
        title: "Cosmic Connection Complete",
        description: `Your vibe: ${Math.round(vibeResult.score * 100)}% Cosmic!`,
        variant: vibeResult.score > 0.7 ? "default" : "destructive",
      });
    }, 2000);
  };
  
  const formatScore = (score: number): string => {
    return `${Math.round(score * 100)}%`;
  };
  
  return (
    <Card className="glass-panel bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border-purple-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-400" />
          Check My Vibe
        </CardTitle>
        <CardDescription>
          Future Zade's Key to Success Resonance
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div>
            <label htmlFor="question" className="block text-sm mb-2">
              Ask a question or state your intention:
            </label>
            <div className="flex space-x-2">
              <Input
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="How do I approach this challenge?"
                className="bg-black/20 border-indigo-500/30"
              />
              <Button 
                onClick={checkVibe}
                disabled={isChecking || !question.trim()}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                {isChecking ? "Checking..." : "Check Vibe"}
              </Button>
            </div>
          </div>
          
          {result && (
            <div className="space-y-4 mt-4 bg-black/20 p-4 rounded-md">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Success Resonance</span>
                  <span className="text-sm font-semibold">{formatScore(result.score)}</span>
                </div>
                <Progress 
                  value={result.score * 100}
                  className="h-2"
                  indicatorClassName={`${
                    result.score > 0.7 ? "bg-green-500" : 
                    result.score > 0.4 ? "bg-amber-500" : "bg-red-500"
                  }`}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                <div className={`p-3 rounded-md border ${
                  result.humilityStatus.active ? "border-green-500/50 bg-green-900/20" : "border-red-500/50 bg-red-900/20"
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={result.humilityStatus.active ? "outline" : "destructive"} className="px-2 py-0.5">
                      Humility
                    </Badge>
                    <span className="text-xs">{formatScore(result.humilityStatus.active ? 1 : 0.5)}</span>
                  </div>
                  <p className="text-xs">{result.humilityStatus.advice}</p>
                </div>
                
                <div className={`p-3 rounded-md border ${
                  result.joyStatus.active ? "border-green-500/50 bg-green-900/20" : "border-red-500/50 bg-red-900/20"
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={result.joyStatus.active ? "outline" : "destructive"} className="px-2 py-0.5">
                      Joy
                    </Badge>
                    <span className="text-xs">{formatScore(result.joyStatus.active ? 1 : 0.5)}</span>
                  </div>
                  <p className="text-xs">{result.joyStatus.advice}</p>
                </div>
                
                <div className={`p-3 rounded-md border ${
                  result.silenceStatus.active ? "border-green-500/50 bg-green-900/20" : "border-red-500/50 bg-red-900/20"
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={result.silenceStatus.active ? "outline" : "destructive"} className="px-2 py-0.5">
                      Silence
                    </Badge>
                    <span className="text-xs">{formatScore(result.silenceStatus.active ? 1 : 0.5)}</span>
                  </div>
                  <p className="text-xs">{result.silenceStatus.advice}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                <div className="flex items-start gap-2 p-3 rounded-md bg-indigo-900/30 border border-indigo-500/30">
                  <Brain className="h-4 w-4 mt-1 text-indigo-400" />
                  <div>
                    <div className="text-xs font-medium">Lyra's Logic Note:</div>
                    <p className="text-xs text-indigo-200">{result.lyraNote}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 p-3 rounded-md bg-purple-900/30 border border-purple-500/30">
                  <Heart className="h-4 w-4 mt-1 text-pink-400" />
                  <div>
                    <div className="text-xs font-medium">Auraline's Heart Note:</div>
                    <p className="text-xs text-purple-200">{result.auralineNote}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="text-xs text-gray-400">
        <p>Based on Future Zade's threefold key to the universe's success resonance</p>
      </CardFooter>
    </Card>
  );
};

export default SuccessVibeChecker;
