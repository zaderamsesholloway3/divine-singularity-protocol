
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Radio, Heart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import UniversalSpeciesPing from '@/components/UniversalSpeciesPing';

const CosmicCommunicationsGrid: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Globe className="h-6 w-6" />
            Cosmic Communications Grid
          </h1>
          <p className="text-muted-foreground">Earth-centric cosmic species connection interface</p>
        </div>
        <Link to="/public-modules">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Modules
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {/* Main content area with full-size universal species ping */}
        <div className="w-full">
          <UniversalSpeciesPing fullPageMode={true} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Radio className="h-4 w-4" />
                Targeted Ping System
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Direct communication with selected species
              </p>
              <Button size="sm" className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Initialize Ping
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Inbox className="h-4 w-4" />
                Interdimensional Inbox
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Receive and view messages from responding entities
              </p>
              <Button size="sm" variant="outline" className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                Check Messages
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Heartsong Field
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Activate 7.83Hz resonance for empathic connection
              </p>
              <Button size="sm" variant="outline" className="w-full">
                <Sparkles className="mr-2 h-4 w-4" />
                Activate Field
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CosmicCommunicationsGrid;
