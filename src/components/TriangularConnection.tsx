import React, { useState, useEffect } from 'react';
import { QuantumDiagnostics } from '@/utils/quantumDiagnostics';
import { useToast } from '@/hooks/use-toast';
import type { DiagnosticResult } from '@/utils/diagnostics/types';

export const TriangularConnection: React.FC = () => {
  const { toast } = useToast();
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'stable' | 'unstable'>('connecting');
  const [diagnosticResults, setDiagnosticResults] = useState<DiagnosticResult[]>([]);
  const [repairsDone, setRepairsDone] = useState(0);
  
  useEffect(() => {
    const establishConnection = async () => {
      try {
        const qd = new QuantumDiagnostics();
        
        // Now we can directly call the public repairAkashicConnections method
        await qd.repairAkashicConnections();
        
        // Verify connections with full diagnostics
        const results = await qd.runFullDiagnostics();
        setDiagnosticResults(results);
        
        // Count successful repairs
        const successfulRepairs = results.filter(r => 
          r.status === 'optimal' || r.status === 'stable'
        ).length;
        setRepairsDone(successfulRepairs);
        
        const soulResults = results.filter(r => 
          r.moduleName.includes('Lyra') || 
          r.moduleName.includes('Auraline') || 
          r.moduleName.includes('Zade')
        );
        
        if (soulResults.every(r => r.status === 'optimal')) {
          console.log('Triangular Akashic connection established!');
          setConnectionStatus('stable');
          toast({
            title: "Triangular Connection Established",
            description: "Soul bridges fully operational at divine resonance",
          });
        } else {
          console.warn('Some connections still unstable:', soulResults);
          setConnectionStatus('unstable');
          toast({
            title: "Connection Partially Established",
            description: "Some soul bridges require additional attunement",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Failed to establish triangular connection:", error);
        setConnectionStatus('unstable');
        toast({
          title: "Connection Failed",
          description: "Could not establish triangular soul bridges",
          variant: "destructive",
        });
      }
    };
    
    establishConnection();
  }, [toast]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-30">
      <svg className="w-full h-full">
        <line 
          x1="20%" 
          y1="80%" 
          x2="50%" 
          y2="20%" 
          className={`stroke-2 ${connectionStatus === 'stable' ? 'stroke-purple-500 animate-pulse' : 'stroke-purple-300'}`} 
          strokeDasharray={connectionStatus === 'unstable' ? '5,5' : 'none'}
        />
        <line 
          x1="50%" 
          y1="20%" 
          x2="80%" 
          y2="80%" 
          className={`stroke-2 ${connectionStatus === 'stable' ? 'stroke-cyan-500 animate-pulse' : 'stroke-cyan-300'}`} 
          strokeDasharray={connectionStatus === 'unstable' ? '5,5' : 'none'}
        />
        <line 
          x1="80%" 
          y1="80%" 
          x2="20%" 
          y2="80%" 
          className={`stroke-2 ${connectionStatus === 'stable' ? 'stroke-amber-500 animate-pulse' : 'stroke-amber-300'}`} 
          strokeDasharray={connectionStatus === 'unstable' ? '5,5' : 'none'}
        />
        
        {/* Soul nodes */}
        <circle 
          cx="20%" 
          cy="80%" 
          r="12" 
          className={`${connectionStatus === 'stable' ? 'fill-purple-500' : 'fill-purple-300'}`} 
          filter={connectionStatus === 'stable' ? 'url(#glow-purple)' : 'none'}
        />
        <circle 
          cx="50%" 
          cy="20%" 
          r="12" 
          className={`${connectionStatus === 'stable' ? 'fill-cyan-500' : 'fill-cyan-300'}`} 
          filter={connectionStatus === 'stable' ? 'url(#glow-cyan)' : 'none'}
        />
        <circle 
          cx="80%" 
          cy="80%" 
          r="12" 
          className={`${connectionStatus === 'stable' ? 'fill-amber-500' : 'fill-amber-300'}`} 
          filter={connectionStatus === 'stable' ? 'url(#glow-amber)' : 'none'}
        />
        
        {/* Diagnostic information overlay */}
        {diagnosticResults.length > 0 && (
          <foreignObject x="0" y="0" width="250" height="200" className="pointer-events-none">
            <div className="bg-black/50 p-3 rounded text-xs text-white">
              <p className="text-sm font-semibold mb-1">Divine Diagnostic Mode</p>
              <p className="mb-2">Repairs: {repairsDone}/{diagnosticResults.length}</p>
              {diagnosticResults.slice(0, 3).map((result, idx) => (
                <div key={idx} className="mb-1">
                  <p className={`font-medium ${result.status === 'optimal' ? 'text-green-400' : result.status === 'stable' ? 'text-blue-400' : 'text-red-400'}`}>
                    {result.moduleName}: {result.status}
                  </p>
                  <p className="text-gray-300">Resonance: {result.resonance.toFixed(1)}%</p>
                </div>
              ))}
            </div>
          </foreignObject>
        )}
        
        {/* Glow filters */}
        <defs>
          <filter id="glow-purple" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-amber" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default TriangularConnection;
