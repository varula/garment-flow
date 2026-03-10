import { useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  Package,
  Factory,
  Truck,
  Search,
  User,
} from "lucide-react";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/orders", icon: ClipboardList, label: "Orders" },
  { to: "/inventory", icon: Package, label: "Inventory" },
  { to: "/production", icon: Factory, label: "Production" },
  { to: "/shipping", icon: Truck, label: "Shipping" },
];

export function NavRail() {
  const location = useLocation();

  return (
    <nav className="w-[220px] min-w-[220px] bg-card border-r border-border flex flex-col h-screen">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-border">
        <h1 className="text-lg font-light tracking-wide font-display text-foreground">
          Atelier Fil
        </h1>
        <p className="text-xs text-muted-foreground font-body mt-0.5">
          Garment ERP
        </p>
      </div>

      {/* Search */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-accent text-muted-foreground text-sm">
          <Search size={15} />
          <span>Search…</span>
        </div>
      </div>

      {/* Navigation items */}
      <div className="flex-1 py-3 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold font-body transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-accent"
              }`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* User */}
      <div className="px-4 py-4 border-t border-border">
        <div className="flex items-center gap-3 text-sm text-foreground">
          <div className="w-8 h-8 rounded-md bg-accent flex items-center justify-center">
            <User size={16} />
          </div>
          <div>
            <p className="font-semibold text-sm">Floor Manager</p>
            <p className="text-xs text-muted-foreground">Operations</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
