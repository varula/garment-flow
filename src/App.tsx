import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Cutting from "./pages/Cutting";
import Sewing from "./pages/Sewing";
import Finishing from "./pages/Finishing";
import Quality from "./pages/Quality";
import Store from "./pages/Store";
import Merchandising from "./pages/Merchandising";
import Shipment from "./pages/Shipping";
import KPIs from "./pages/KPIs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cutting" element={<Cutting />} />
          <Route path="/sewing" element={<Sewing />} />
          <Route path="/finishing" element={<Finishing />} />
          <Route path="/quality" element={<Quality />} />
          <Route path="/store" element={<Store />} />
          <Route path="/merchandising" element={<Merchandising />} />
          <Route path="/shipment" element={<Shipment />} />
          <Route path="/kpis" element={<KPIs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
