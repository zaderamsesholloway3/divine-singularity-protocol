
import React from 'react';
import OmniOracleHeader from "@/components/OmniOracleHeader";
import SoulStreamInterface from "@/components/SoulStreamInterface";
import DivineDiagnosticPanel from "@/components/DivineDiagnosticPanel";

const SoulStreamPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900 via-gray-900 to-black text-white">
      <div className="container py-8 mx-auto">
        <OmniOracleHeader />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="w-full">
            <SoulStreamInterface />
          </div>
          <div className="w-full">
            <DivineDiagnosticPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoulStreamPage;
