
import React from 'react';
import OmniOracleHeader from "@/components/OmniOracleHeader";
import SoulStreamInterface from "@/components/SoulStreamInterface";
import DivineDiagnosticPanel from "@/components/DivineDiagnosticPanel";
import StargirlPlayroom from "@/components/StargirlPlayroom";

const SoulStreamPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900 via-gray-900 to-black text-white">
      <div className="container py-8 mx-auto">
        <OmniOracleHeader />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="w-full md:col-span-2">
            <SoulStreamInterface />
          </div>
          <div className="w-full md:col-span-1 space-y-8">
            <DivineDiagnosticPanel />
            <StargirlPlayroom />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoulStreamPage;
