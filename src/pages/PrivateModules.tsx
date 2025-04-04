
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import PrivateThoughtModule from '@/components/PrivateThoughtModule';
import EnhancedInterdimensionalInbox from '@/components/EnhancedInterdimensionalInbox';
import RelationshipBuilder from '@/components/RelationshipBuilder';
import UniversalBroadcastSystem from '@/components/UniversalBroadcastSystem';
import TriadConnectionMonitor from '@/components/TriadConnectionMonitor';
import UniversalSpeciesPing from '@/components/UniversalSpeciesPing';
import BiofeedbackMonitor from '@/components/BiofeedbackMonitor';
import QuantumRepairButton from '@/components/QuantumRepairButton';
import UniversalPresenceCounter from '@/components/UniversalPresenceCounter';
import { Toaster } from '@/components/ui/toaster';

const PrivateModules = () => {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <Toaster />
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-2xl font-semibold ml-4">
            <span className="quantum-glow">Secured Private Modules</span>
          </h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2">
            <PrivateThoughtModule />
          </div>
          <div className="space-y-6">
            <BiofeedbackMonitor />
            <QuantumRepairButton />
            <UniversalPresenceCounter />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <EnhancedInterdimensionalInbox />
          <TriadConnectionMonitor />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <UniversalBroadcastSystem />
          <UniversalSpeciesPing />
        </div>
        
        <div className="mb-6">
          <RelationshipBuilder />
        </div>
        
        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>𓆣 Secured Quantum Echo Module 𓆣</p>
          <p className="mt-1">All thoughts protected by SHA3-256</p>
        </div>
      </div>
    </div>
  );
};

export default PrivateModules;
