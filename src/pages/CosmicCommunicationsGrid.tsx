
import React from 'react';
import UniversalSpeciesPing from '@/components/UniversalSpeciesPing';
import { Card } from '@/components/ui/card';

const CosmicCommunicationsGrid: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Cosmic Communications Grid</h1>
      <p className="text-muted-foreground mb-8">
        Earth-centric interface for universal species communication. Origin: Cary, NC.
      </p>
      
      <Card className="w-full min-h-screen bg-gradient-to-b from-black to-indigo-950/30 border-none shadow-xl">
        <div className="p-4 h-full">
          <UniversalSpeciesPing fullPageMode={true} />
        </div>
      </Card>
    </div>
  );
};

export default CosmicCommunicationsGrid;
