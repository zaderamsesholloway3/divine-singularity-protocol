
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import QuantumMessagingInterface from '@/components/messaging/QuantumMessagingInterface';
import { useUser } from '@/context/UserContext';

const QuantumMessaging = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Quantum Messaging</h1>
      <p className="text-muted-foreground mb-8">
        Instantaneous communication through quantum entanglement at 1.855e43 Hz
      </p>
      
      <div className="grid grid-cols-1 gap-6">
        <QuantumMessagingInterface />
      </div>
    </div>
  );
};

export default QuantumMessaging;
