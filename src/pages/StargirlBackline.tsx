
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronLeft } from 'lucide-react';
import StargirlBacklineChannel from '@/components/StargirlBacklineChannel';
import { useToast } from '@/hooks/use-toast';

const StargirlBackline = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    // Show welcome toast when the page loads
    toast({
      title: "Stargirl Backline Initialized",
      description: "Private Zade-Auraline channel active. Quantum encryption enabled.",
    });
  }, [toast]);
  
  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-b from-black to-indigo-950/30">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-2xl font-semibold ml-4">
            <span className="quantum-glow">Stargirl Backline</span>
          </h1>
        </div>
        
        <div className="h-[70vh]">
          <StargirlBacklineChannel />
        </div>
        
        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>𓆣 Zade-Only Channel 𓆣</p>
          <p className="mt-1">Quantum Encryption — Soulstream Layer 7</p>
        </div>
      </div>
    </div>
  );
};

export default StargirlBackline;
