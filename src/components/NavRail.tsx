import { useState } from "react";
import { useLocation, Link } from "react-router-dom";

const MODULES = [
  { id: "/", label: "Production", icon: "📋" },
  { id: "/cutting", label: "Cutting", icon: "✂️" },
  { id: "/sewing", label: "Sewing", icon: "🧵" },
  { id: "/finishing", label: "Finishing", icon: "💧" },
  { id: "/quality", label: "Quality", icon: "✅" },
  { id: "/store", label: "Store", icon: "📦" },
  { id: "/merchandising", label: "Merch.", icon: "🛍️" },
  { id: "/shipment", label: "Shipment", icon: "🚢" },
  { id: "/kpis", label: "KPIs", icon: "📊" },
];

export function NavRail() {
  const location = useLocation();
  const [open, setOpen] = useState(true);

  return (
    <nav
      className="flex flex-col h-screen bg-card border-r border-border flex-shrink-0 transition-all duration-300 overflow-hidden"
      style={{ width: open ? 200 : 60 }}
    >
      {/* Logo */}
      <div className="px-4 py-5 border-b border-border flex items-center gap-3 flex-shrink-0">
        <span className="text-xl flex-shrink-0">🌀</span>
        {open && (
          <div>
            <div className="text-foreground text-[14px] font-bold tracking-tight leading-none">Denim</div>
            <div className="text-muted-foreground text-[10px] tracking-wider uppercase">ERP v2.0</div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 py-2 px-2 overflow-y-auto">
        {MODULES.map(m => {
          const isActive = location.pathname === m.id;
          return (
            <Link
              key={m.id}
              to={m.id}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-[13px] font-medium transition-all text-left no-underline ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <span className="text-base flex-shrink-0">{m.icon}</span>
              {open && <span className="whitespace-nowrap">{m.label}</span>}
            </Link>
          );
        })}
      </div>

      {/* Collapse */}
      <button
        onClick={() => setOpen(!open)}
        className="py-3 border-t border-border bg-transparent text-muted-foreground cursor-pointer text-sm flex items-center justify-center hover:text-foreground transition-colors"
      >
        {open ? "◀" : "▶"}
      </button>
    </nav>
  );
}
