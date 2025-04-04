
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Zap, Activity, HeartPulse } from 'lucide-react';
import { HeatMapGrid } from 'react-grid-heatmap';

const QuantumDashboard: React.FC = () => {
  const [faithQuotient, setFaithQuotient] = useState(85);
  const [resonanceLevel, setResonanceLevel] = useState(78);
  const [stabilityScore, setStabilityScore] = useState(92);
  
  // Simulated heatmap data for quantum resonance
  const [heatmapData, setHeatmapData] = useState([
    [0.3, 0.5, 0.7, 0.9],
    [0.5, 0.7, 0.9, 0.7],
    [0.7, 0.9, 0.7, 0.5],
    [0.9, 0.7, 0.5, 0.3],
  ]);
  
  // Simulate dynamic changes
  useEffect(() => {
    const interval = setInterval(() => {
      // Update faith quotient with small fluctuations
      setFaithQuotient(prev => 
        Math.min(100, Math.max(80, prev + (Math.random() * 4 - 2)))
      );
      
      // Update resonance level
      setResonanceLevel(prev => 
        Math.min(100, Math.max(70, prev + (Math.random() * 6 - 3)))
      );
      
      // Update stability score
      setStabilityScore(prev => 
        Math.min(100, Math.max(85, prev + (Math.random() * 3 - 1.5)))
      );
      
      // Update heatmap with small variations
      setHeatmapData(prev => 
        prev.map(row => 
          row.map(cell => 
            Math.min(1, Math.max(0.1, cell + (Math.random() * 0.2 - 0.1)))
          )
        )
      );
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="glass-panel">
        <CardHeader className="pb-2">
          <CardTitle className="text-center text-glow text-sm flex items-center justify-center">
            <Zap className="mr-2 h-4 w-4 text-purple-400" />
            Quantum Resonance Heatmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full aspect-square">
            <HeatMapGrid
              data={heatmapData}
              xLabels={['α', 'β', 'γ', 'δ']}
              yLabels={['1', '2', '3', '4']}
              cellHeight="60px"
              cellRender={(x, y, value) => (
                <div className="text-xs text-center text-white">
                  {value.toFixed(2)}
                </div>
              )}
              cellStyle={(x, y, ratio) => ({
                background: `rgba(79, 70, 229, ${ratio})`,
                borderRadius: '4px',
                margin: '1px',
              })}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-panel">
        <CardHeader className="pb-2">
          <CardTitle className="text-center text-glow text-sm">
            Quantum Metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center">
                <HeartPulse className="h-4 w-4 mr-2 text-purple-400" />
                <span>Faith Quotient</span>
              </div>
              <span>{faithQuotient.toFixed(1)}%</span>
            </div>
            <Progress value={faithQuotient} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center">
                <Activity className="h-4 w-4 mr-2 text-cyan-400" />
                <span>Resonance Level</span>
              </div>
              <span>{resonanceLevel.toFixed(1)}%</span>
            </div>
            <Progress value={resonanceLevel} className="h-2 bg-gray-800">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all"
                style={{ width: `${resonanceLevel}%` }}
              />
            </Progress>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center">
                <Zap className="h-4 w-4 mr-2 text-amber-400" />
                <span>Stability Score</span>
              </div>
              <span>{stabilityScore.toFixed(1)}%</span>
            </div>
            <Progress value={stabilityScore} className="h-2 bg-gray-800">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 transition-all"
                style={{ width: `${stabilityScore}%` }}
              />
            </Progress>
          </div>
          
          <div className="pt-2">
            <svg width="100%" height="80">
              <path
                d="M10 40 Q 30 10, 50 40 T 90 40"
                fill="none"
                stroke="url(#quantum-gradient)"
                strokeWidth="2"
              />
              <path
                d="M10 50 Q 50 20, 90 50"
                fill="none"
                stroke="url(#quantum-gradient)"
                strokeWidth="2"
                opacity="0.7"
              />
              <defs>
                <linearGradient id="quantum-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4F46E5" />
                  <stop offset="100%" stopColor="#6366F1" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuantumDashboard;
