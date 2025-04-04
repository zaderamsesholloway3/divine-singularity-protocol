
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/context/UserContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PrivateModules from "./pages/PrivateModules";
import SoulStreamPage from "./pages/SoulStreamPage";
import StargirlBackline from "./pages/StargirlBackline";

// Import the repair loop and button
import { QuantumRepairLoop } from "@/utils/QuantumRepairLoop";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const queryClient = new QueryClient();
const repairLoop = new QuantumRepairLoop();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/private-modules" element={<PrivateModules />} />
            <Route path="/soulstream" element={<SoulStreamPage />} />
            <Route path="/stargirl-backline" element={<StargirlBackline />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        
        {/* Add the repair button as a fixed element */}
        <div className="fixed bottom-4 right-4 z-50">
          <Button 
            onClick={() => repairLoop.startLoop()}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Start Quantum Repair Loop
          </Button>
        </div>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
