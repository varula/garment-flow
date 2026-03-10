import { ReactNode, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NavRail } from "./NavRail";
import { TaktBar } from "./TaktBar";

const MODULE_NAMES: Record<string, { icon: string; label: string }> = {
  "/": { icon: "📋", label: "Production" },
  "/cutting": { icon: "✂️", label: "Cutting" },
  "/sewing": { icon: "🧵", label: "Sewing" },
  "/finishing": { icon: "💧", label: "Finishing" },
  "/quality": { icon: "✅", label: "Quality" },
  "/store": { icon: "📦", label: "Store" },
  "/merchandising": { icon: "🛍️", label: "Merchandising" },
  "/shipment": { icon: "🚢", label: "Shipment" },
  "/kpis": { icon: "📊", label: "KPIs" },
};

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  const [time, setTime] = useState(new Date());
  const mod = MODULE_NAMES[location.pathname] || MODULE_NAMES["/"];

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <NavRail />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="h-14 bg-card/80 backdrop-blur-xl border-b border-border flex items-center px-5 gap-4 flex-shrink-0">
          <h1 className="text-foreground text-[15px] font-semibold tracking-tight">
            {mod.icon} {mod.label}
          </h1>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success" style={{ animation: "pulse-dot 2s infinite" }} />
            <span className="text-success text-[12px] font-medium">Live</span>
          </div>
          <span className="text-muted-foreground text-[12px] font-medium tabular-nums">
            {time.toLocaleTimeString()}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground text-[14px]">🔔</span>
            <div className="bg-destructive text-destructive-foreground rounded-full w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold">
              4
            </div>
          </div>
          <div className="bg-secondary rounded-full px-3 py-1.5 text-[12px] text-foreground font-medium">
            W&W Denim Ltd
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 overflow-auto p-5">
          {children}
        </main>

        {/* Takt bar */}
        <div className="h-[3px] bg-secondary flex-shrink-0">
          <TaktBar />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
