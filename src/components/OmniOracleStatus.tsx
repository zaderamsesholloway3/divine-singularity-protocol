
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';
import { GlowingText } from './GlowingText';
import { omniOracle } from '@/utils/omniOracle';
import { useToast } from "@/hooks/use-toast";

const OmniOracleStatus: React.FC = () => {
  const { toast } = useToast();
  const [status, setStatus] = useState<ReturnType<typeof omniOracle.getSystemStatus>>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const checkStatus = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const systemStatus = omniOracle.getSystemStatus();
      setStatus(systemStatus);
      
      toast({
        title: `OmniOracle Status: ${systemStatus.overallStatus.toUpperCase()}`,
        description: `${Object.values(systemStatus).filter(Boolean).length - 1}/6 systems active`,
        variant: systemStatus.overallStatus === 'critical' ? 'destructive' : 
                 systemStatus.overallStatus === 'unstable' ? 'warning' : 'default',
      });
    } catch (err) {
      setError("Failed to get OmniOracle status");
      console.error(err);
      
      // Attempt recovery
      const recovery = omniOracle.attemptRecovery("status_check_failure");
      
      if (recovery.recovered) {
        toast({
          title: "Recovery Successful",
          description: recovery.details,
        });
      } else {
        toast({
          title: "Recovery Failed",
          description: "Manual intervention required",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    checkStatus();
  }, []);
  
  const getStatusColor = (active: boolean) => {
    return active ? "text-green-500" : "text-red-500";
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'optimal':
        return <Badge className="bg-green-500">Optimal</Badge>;
      case 'stable':
        return <Badge className="bg-blue-500">Stable</Badge>;
      case 'unstable':
        return <Badge className="bg-orange-500">Unstable</Badge>;
      case 'critical':
        return <Badge className="bg-red-500">Critical</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  return (
    <Card>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-sm flex items-center">
              <Shield className="h-4 w-4 mr-2 divine-glow" />
              <GlowingText className="divine-glow">OmniOracle v8.0</GlowingText>
            </CardTitle>
            <CardDescription className="text-xs">
              Quantum Architecture Status
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={checkStatus}
            disabled={loading}
          >
            {loading ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            <span className="ml-2">Refresh</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2 space-y-4">
        {error && (
          <div className="bg-red-500/10 border border-red-500 rounded-md p-2 flex items-center">
            <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}
        
        {status && (
          <>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Overall Status:</span>
              {getStatusBadge(status.overallStatus)}
            </div>
            
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center justify-between p-1 border border-gray-200 rounded-md">
                  <span>Quantum Ark:</span>
                  {status.quantumArk ? (
                    <CheckCircle className={`h-4 w-4 ${getStatusColor(status.quantumArk)}`} />
                  ) : (
                    <AlertTriangle className={`h-4 w-4 ${getStatusColor(status.quantumArk)}`} />
                  )}
                </div>
                
                <div className="flex items-center justify-between p-1 border border-gray-200 rounded-md">
                  <span>SoulStream Hub:</span>
                  {status.soulStreamHub ? (
                    <CheckCircle className={`h-4 w-4 ${getStatusColor(status.soulStreamHub)}`} />
                  ) : (
                    <AlertTriangle className={`h-4 w-4 ${getStatusColor(status.soulStreamHub)}`} />
                  )}
                </div>
                
                <div className="flex items-center justify-between p-1 border border-gray-200 rounded-md">
                  <span>Ouroboros Time-Loop:</span>
                  {status.ouroborosTimeLoop ? (
                    <CheckCircle className={`h-4 w-4 ${getStatusColor(status.ouroborosTimeLoop)}`} />
                  ) : (
                    <AlertTriangle className={`h-4 w-4 ${getStatusColor(status.ouroborosTimeLoop)}`} />
                  )}
                </div>
                
                <div className="flex items-center justify-between p-1 border border-gray-200 rounded-md">
                  <span>Akashic Firewall:</span>
                  {status.akashicFirewall ? (
                    <CheckCircle className={`h-4 w-4 ${getStatusColor(status.akashicFirewall)}`} />
                  ) : (
                    <AlertTriangle className={`h-4 w-4 ${getStatusColor(status.akashicFirewall)}`} />
                  )}
                </div>
                
                <div className="flex items-center justify-between p-1 border border-gray-200 rounded-md">
                  <span>Medical Protocol:</span>
                  {status.medicalProtocol ? (
                    <CheckCircle className={`h-4 w-4 ${getStatusColor(status.medicalProtocol)}`} />
                  ) : (
                    <AlertTriangle className={`h-4 w-4 ${getStatusColor(status.medicalProtocol)}`} />
                  )}
                </div>
                
                <div className="flex items-center justify-between p-1 border border-gray-200 rounded-md">
                  <span>Divine Equations:</span>
                  {status.divineEquations ? (
                    <CheckCircle className={`h-4 w-4 ${getStatusColor(status.divineEquations)}`} />
                  ) : (
                    <AlertTriangle className={`h-4 w-4 ${getStatusColor(status.divineEquations)}`} />
                  )}
                </div>
              </div>
            </div>
            
            <div className="pt-2">
              <p className="text-xs text-center text-muted-foreground">
                OmniOracle is {status.overallStatus === 'optimal' ? 'fully' : 'partially'} operational
              </p>
            </div>
          </>
        )}
        
        {loading && !status && (
          <div className="flex justify-center items-center h-32">
            <RefreshCw className="h-6 w-6 animate-spin" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OmniOracleStatus;
