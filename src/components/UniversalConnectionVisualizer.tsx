
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GlowingText } from "./GlowingText";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChevronDown, 
  Circle, 
  Radio, 
  Signal, 
  Wand2, 
  Waves,
  Shield 
} from 'lucide-react';
import { RTLSDREmulator } from "@/utils/rtlsdrEmulator";

// Create chart component
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface SpeciesData {
  name: string;
  distance: number;
  color: string;
  resonance: number;
}

const UniversalConnectionVisualizer = () => {
  const rtlsdr = useRef(new RTLSDREmulator()).current;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [waveMode, setWaveMode] = useState<'universal' | 'triad'>('universal');
  const [divineStrength, setDivineStrength] = useState(0.85);
  const [speciesData, setSpeciesData] = useState<SpeciesData[]>([
    { name: 'Human', distance: 1.0, color: 'rgba(59, 130, 246, 0.8)', resonance: 0.92 },
    { name: 'Arcturian', distance: 36.7, color: 'rgba(139, 92, 246, 0.8)', resonance: 0.85 },
    { name: 'Pleiadian', distance: 444.2, color: 'rgba(6, 182, 212, 0.8)', resonance: 0.78 },
    { name: 'Andromedan', distance: 2537000, color: 'rgba(249, 115, 22, 0.8)', resonance: 0.65 }
  ]);
  
  const [triadData, setTriadData] = useState({
    zade: { strength: 0.95, messages: 24, lastUpdate: new Date().toISOString() },
    lockheed: { strength: 0.87, messages: 18, lastUpdate: new Date(Date.now() - 120000).toISOString() },
    cia: { strength: 0.75, messages: 12, lastUpdate: new Date(Date.now() - 300000).toISOString() }
  });
  
  // Chart data for universal waveform
  const [chartData, setChartData] = useState({
    labels: Array.from({ length: 30 }, (_, i) => i.toString()),
    datasets: speciesData.map(species => ({
      label: species.name,
      data: Array.from({ length: 30 }, () => Math.random() * species.resonance),
      borderColor: species.color,
      backgroundColor: species.color.replace('0.8', '0.2'),
      tension: 0.4,
      fill: true
    }))
  });
  
  // Chart data for triad connections
  const [triadChartData, setTriadChartData] = useState({
    labels: Array.from({ length: 30 }, (_, i) => i.toString()),
    datasets: [
      {
        label: 'Zade',
        data: Array.from({ length: 30 }, () => Math.random() * 0.3 + 0.7),
        borderColor: 'rgba(132, 204, 22, 0.8)',
        backgroundColor: 'rgba(132, 204, 22, 0.2)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Lockheed',
        data: Array.from({ length: 30 }, () => Math.random() * 0.4 + 0.5),
        borderColor: 'rgba(6, 182, 212, 0.8)',
        backgroundColor: 'rgba(6, 182, 212, 0.2)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'CIA',
        data: Array.from({ length: 30 }, () => Math.random() * 0.5 + 0.3),
        borderColor: 'rgba(249, 115, 22, 0.8)',
        backgroundColor: 'rgba(249, 115, 22, 0.2)',
        tension: 0.4,
        fill: true
      }
    ]
  });

  // Options for universal chart
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 1,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          color: 'rgba(255, 255, 255, 0.7)',
          boxWidth: 12,
          padding: 10
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleColor: 'rgba(255, 255, 255, 0.9)',
        bodyColor: 'rgba(255, 255, 255, 0.9)',
        displayColors: true,
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${parseFloat(context.raw).toFixed(3)} resonance`;
          }
        }
      }
    }
  };
  
  // Update chart data periodically
  useEffect(() => {
    // Create update interval
    const intervalId = setInterval(() => {
      // Random variation in divine strength
      setDivineStrength(prev => {
        const variation = (Math.random() - 0.5) * 0.05;
        return Math.max(0.6, Math.min(0.95, prev + variation));
      });
      
      // Update species data
      setSpeciesData(prev => prev.map(species => ({
        ...species,
        resonance: Math.max(0.5, Math.min(0.95, species.resonance + (Math.random() - 0.5) * 0.03))
      })));
      
      // Update triad connection data
      setTriadData(prev => ({
        zade: { 
          ...prev.zade,
          strength: Math.max(0.7, Math.min(0.98, prev.zade.strength + (Math.random() - 0.5) * 0.02)),
          lastUpdate: new Date().toISOString()
        },
        lockheed: { 
          ...prev.lockheed,
          strength: Math.max(0.6, Math.min(0.95, prev.lockheed.strength + (Math.random() - 0.5) * 0.03)),
          lastUpdate: Math.random() > 0.7 ? new Date().toISOString() : prev.lockheed.lastUpdate
        },
        cia: { 
          ...prev.cia,
          strength: Math.max(0.5, Math.min(0.9, prev.cia.strength + (Math.random() - 0.5) * 0.04)),
          lastUpdate: Math.random() > 0.8 ? new Date().toISOString() : prev.cia.lastUpdate
        }
      }));
      
      // Update chart data
      setChartData(prev => {
        const newData = { ...prev };
        newData.datasets = newData.datasets.map((dataset, index) => {
          const newValues = [...dataset.data];
          // Remove first data point and add a new one
          newValues.shift();
          newValues.push(Math.random() * speciesData[index].resonance);
          return { ...dataset, data: newValues };
        });
        return newData;
      });
      
      // Update triad chart data
      setTriadChartData(prev => {
        const newData = { ...prev };
        newData.datasets = newData.datasets.map((dataset, index) => {
          const newValues = [...dataset.data];
          // Remove first data point and add a new one
          newValues.shift();
          let baseVal;
          if (index === 0) baseVal = triadData.zade.strength;
          else if (index === 1) baseVal = triadData.lockheed.strength;
          else baseVal = triadData.cia.strength;
          
          newValues.push(baseVal * (0.9 + Math.random() * 0.2));
          return { ...dataset, data: newValues };
        });
        return newData;
      });
    }, 2000);
    
    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [speciesData, triadData]);
  
  // Render divine connection waveform
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    
    let animationFrame: number;
    let t = 0;
    
    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Draw divine connection waveform
      const amplitude = 20;
      const frequency = 0.05;
      const harmonicPhase = Math.sin(t * 0.2) * 0.5;
      
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.8)';
      ctx.lineWidth = 2;
      
      for (let x = 0; x < width; x++) {
        // Divine frequency formula (complex oscillation)
        const y = height / 2 + 
                 Math.sin(x * frequency + t) * amplitude * divineStrength + 
                 Math.sin(x * frequency * 1.618 + t * 0.5 + harmonicPhase) * (amplitude * 0.5) + 
                 Math.sin(x * frequency * 2.718 + t * 0.3) * (amplitude * 0.3);
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.stroke();
      
      // Draw secondary harmonic (more subtle)
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(64, 206, 219, 0.5)';
      ctx.lineWidth = 1.5;
      
      for (let x = 0; x < width; x++) {
        const y = height / 2 + 
                 Math.sin(x * frequency * 1.5 + t * 1.2) * amplitude * 0.6 * divineStrength + 
                 Math.cos(x * frequency * 2.5 + t * 0.8) * (amplitude * 0.4);
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.stroke();
      
      // Update time
      t += 0.05;
      
      animationFrame = requestAnimationFrame(draw);
    };
    
    // Start animation
    animationFrame = requestAnimationFrame(draw);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [divineStrength]);

  return (
    <Card className="glass-panel">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-sm font-medium flex items-center">
              <Waves className="mr-2 h-4 w-4 sacred-glow" />
              <GlowingText className="sacred-glow">Universal Quantum Connection</GlowingText>
            </CardTitle>
            <CardDescription className="text-xs">
              Ouroboros Divine Frequency Monitor (ν₀ = 1.855e43 Hz)
            </CardDescription>
          </div>
          <Badge variant={divineStrength > 0.8 ? "default" : "outline"} 
                className={divineStrength > 0.8 ? "bg-green-500" : ""}>
            {divineStrength > 0.8 ? "Optimal" : "Suboptimal"} Resonance
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-2">
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Divine Frequency Waveform:</span>
            <span className="font-mono text-sm text-divine-gold sacred-glow">1.855e43 Hz</span>
          </div>
          
          {/* Divine waveform visualization */}
          <div className="border border-white/10 rounded-md p-2 bg-black/20">
            <canvas 
              ref={canvasRef} 
              width={500} 
              height={120} 
              className="w-full h-auto rounded-md"
            />
          </div>
          
          {/* Connection charts */}
          <Tabs defaultValue="universal" value={waveMode} onValueChange={(v) => setWaveMode(v as any)}>
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="universal" className="flex items-center">
                <Signal className="h-3 w-3 mr-1" />
                Universal Species
              </TabsTrigger>
              <TabsTrigger value="triad" className="flex items-center">
                <Shield className="h-3 w-3 mr-1" />
                Triad Connection
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="universal">
              <div className="h-[240px] p-2 bg-black/20 rounded-md border border-white/10">
                <Line data={chartData} options={chartOptions} />
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {speciesData.map(species => (
                  <div key={species.name} className="flex items-center text-xs">
                    <Circle className="h-2 w-2 mr-1" style={{ color: species.color.replace('0.8', '1') }} />
                    <span className="mr-1">{species.name}:</span>
                    <span>{(species.resonance * 100).toFixed(1)}%</span>
                    <span className="ml-auto">
                      {species.distance < 1000 
                        ? species.distance.toFixed(1) + ' ly'
                        : (species.distance / 1000).toFixed(0) + ' Kly'}
                    </span>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="triad">
              <div className="h-[240px] p-2 bg-black/20 rounded-md border border-white/10">
                <Line data={triadChartData} options={chartOptions} />
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div className="flex items-center text-xs">
                  <Circle className="h-2 w-2 mr-1 text-green-500" />
                  <span className="mr-1">Zade:</span>
                  <span>{(triadData.zade.strength * 100).toFixed(1)}%</span>
                  <span className="ml-auto">
                    {new Date(triadData.zade.lastUpdate).toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex items-center text-xs">
                  <Circle className="h-2 w-2 mr-1 text-cyan-500" />
                  <span className="mr-1">Lockheed:</span>
                  <span>{(triadData.lockheed.strength * 100).toFixed(1)}%</span>
                  <span className="ml-auto">
                    {new Date(triadData.lockheed.lastUpdate).toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex items-center text-xs">
                  <Circle className="h-2 w-2 mr-1 text-orange-500" />
                  <span className="mr-1">CIA:</span>
                  <span>{(triadData.cia.strength * 100).toFixed(1)}%</span>
                  <span className="ml-auto">
                    {new Date(triadData.cia.lastUpdate).toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex items-center text-xs">
                  <Wand2 className="h-2 w-2 mr-1 text-purple-500" />
                  <span className="mr-1">Ouroboros:</span>
                  <span>{(divineStrength * 100).toFixed(1)}%</span>
                  <span className="ml-auto">Active</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="text-center text-xs text-muted-foreground">
            <Radio className="h-3 w-3 inline-block mr-1" />
            <span>Divine frequency validated through Akashic resonance</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UniversalConnectionVisualizer;
