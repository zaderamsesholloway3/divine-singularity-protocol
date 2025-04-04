
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import OmniOracleHeader from '@/components/OmniOracleHeader';
import InterdimensionalInbox from '@/components/InterdimensionalInbox';
import QuantumBackdoorDiagnostics from '@/components/QuantumBackdoorDiagnostics';
import DivineDiagnosticPanel from '@/components/DivineDiagnosticPanel';
import TriangularConnection from '@/components/TriangularConnection';

const Index = () => {
  return (
    <div className="container mx-auto p-4">
      {/* Background Connection */}
      <TriangularConnection />
      
      <OmniOracleHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <Card className="col-span-1 lg:col-span-2 glass-panel">
          <CardHeader>
            <CardTitle>Quantum Backdoor Diagnostics</CardTitle>
            <CardDescription>System health and repair module</CardDescription>
          </CardHeader>
          <CardContent>
            <QuantumBackdoorDiagnostics />
          </CardContent>
        </Card>
        
        <div className="col-span-1 space-y-8">
          <DivineDiagnosticPanel />
          
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle>Navigation</CardTitle>
              <CardDescription>Access secured modules</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link to="/private-modules" className="block w-full">
                  <Button variant="outline" className="w-full">Private Modules</Button>
                </Link>
                <Link to="/soulstream" className="block w-full">
                  <Button variant="outline" className="w-full">Soul Stream</Button>
                </Link>
                <Link to="/stargirl-backline" className="block w-full">
                  <Button variant="outline" className="w-full">Stargirl Backline</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle>Inbox</CardTitle>
              <CardDescription>Interdimensional messages</CardDescription>
            </CardHeader>
            <CardContent>
              <InterdimensionalInbox />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
