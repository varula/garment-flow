import { useState } from "react";
import { useLocation, Link } from "react-router-dom";

const MODULES = [
  { id: "/", label: "Production", icon: "🏭" },
  { id: "/cutting", label: "Cutting", icon: "✂️" },
  { id: "/sewing", label: "Sewing", icon: "🧵" },
  { id: "/finishing", label: "Finishing", icon: "💧" },
  { id: "/quality", label: "Quality", icon: "✅" },
  { id: "/store", label: "Store", icon: "🏪" },
  { id: "/merchandising", label: "Merch.", icon: "📋" },
  { id: "/shipment", label: "Shipment", icon: "🚢" },
  { id: "/kpis", label: "KPIs", icon: "📊" },
];

export function NavRail() {
  const location = useLocation();
  const [open, setOpen] = useState(true);

  return (
    <nav
      className="flex flex-col h-screen bg-sidebar border-r border-border flex-shrink-0 transition-all duration-300 overflow-hidden"
      style={{ width: open ? 180 : 52 }}
    >
      {/* Logo */}
      <div className="px-3 py-4 border-b border-border flex items-center gap-2.5 flex-shrink-0">
        <span className="text-xl flex-shrink-0">🌀</span>
        {open && (
          <div>
            <div className="text-primary text-[13px] font-bold leading-none">DENIM</div>
            <div className="text-muted-foreground text-[9px] tracking-[2px] uppercase">ERP v2.0</div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 py-2 px-1.5 overflow-y-auto">
        {MODULES.map(m => {
          const isActive = location.pathname === m.id;
          return (
            <Link
              key={m.id}
              to={m.id}
              className={`w-full flex items-center gap-2.5 px-2 py-2.5 rounded-md mb-0.5 text-[12px] transition-all text-left no-underline ${
                isActive
                  ? "bg-primary/15 border border-primary/40 text-primary font-bold"
                  : "border border-transparent text-muted-foreground hover:text-foreground"
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
        className="py-2.5 border-t border-border bg-transparent text-muted-foreground cursor-pointer text-base flex items-center justify-center hover:text-foreground transition-colors"
      >
        {open ? "◀" : "▶"}
      </button>
    </nav>
  );
}
