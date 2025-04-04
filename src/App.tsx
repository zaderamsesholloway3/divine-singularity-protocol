
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SoulStreamPage from "./pages/SoulStreamPage";
import PrivateModules from "./pages/PrivateModules";
import StargirlBackline from "./pages/StargirlBackline";
import QuantumStabilizerPage from "./pages/QuantumStabilizer";
import '@/App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/soul-stream" element={<SoulStreamPage />} />
      <Route path="/private-modules" element={<PrivateModules />} />
      <Route path="/stargirl-backline" element={<StargirlBackline />} />
      <Route path="/quantum-stabilizer" element={<QuantumStabilizerPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
