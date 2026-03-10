import { ReactNode, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NavRail } from "./NavRail";
import { TaktBar } from "./TaktBar";

const MODULE_NAMES: Record<string, { icon: string; label: string }> = {
  "/": { icon: "🏭", label: "PRODUCTION" },
  "/cutting": { icon: "✂️", label: "CUTTING" },
  "/sewing": { icon: "🧵", label: "SEWING" },
  "/finishing": { icon: "💧", label: "FINISHING" },
  "/quality": { icon: "✅", label: "QUALITY" },
  "/store": { icon: "🏪", label: "STORE" },
  "/merchandising": { icon: "📋", label: "MERCHANDISING" },
  "/shipment": { icon: "🚢", label: "SHIPMENT" },
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
    <div className="flex h-screen overflow-hidden">
      <NavRail />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="h-12 bg-sidebar border-b border-border flex items-center px-4 gap-3 flex-shrink-0">
          <span className="text-foreground text-sm font-bold">
            {mod.icon} {mod.label} MODULE
          </span>
          <div className="flex-1" />
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-success" style={{ animation: "pulse-dot 2s infinite" }} />
            <span className="text-success text-[10px]">LIVE</span>
          </div>
          <span className="text-muted-foreground text-[10px] font-mono">
            {time.toLocaleTimeString()}
          </span>
          <div className="bg-destructive text-destructive-foreground rounded-full w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold">
            4
          </div>
          <span className="text-muted-foreground text-[12px]">🔔</span>
          <div className="bg-secondary rounded-md px-2 py-0.5 text-[11px] text-muted-foreground">
            🏭 W&W Denim Ltd
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 overflow-auto p-3.5">
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
