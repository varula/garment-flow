import AppLayout from "../components/AppLayout";
import { MetricCard } from "../components/MetricCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const fabricRolls = [
  { id: "FAB-001", type: "Linen Blend", color: "Natural", width: "150cm", length: "42m", location: "Rack A-3", allocated: "PO-0891" },
  { id: "FAB-002", type: "Organic Cotton", color: "White", width: "160cm", length: "85m", location: "Rack B-1", allocated: "PO-0890" },
  { id: "FAB-003", type: "Selvedge Denim", color: "Indigo", width: "140cm", length: "28m", location: "Rack C-2", allocated: "PO-0889" },
  { id: "FAB-004", type: "Twill Cotton", color: "Khaki", width: "150cm", length: "60m", location: "Rack A-5", allocated: "PO-0888" },
  { id: "FAB-005", type: "Silk Charmeuse", color: "Ivory", width: "110cm", length: "18m", location: "Rack D-1", allocated: "—" },
  { id: "FAB-006", type: "Wool Tweed", color: "Grey", width: "140cm", length: "34m", location: "Rack C-4", allocated: "PO-0886" },
];

const trims = [
  { item: "YKK Zippers 18cm", stock: 4200, unit: "pcs", reorder: false },
  { item: "Corozo Buttons 15mm", stock: 890, unit: "pcs", reorder: true },
  { item: "Polyester Thread #40", stock: 120, unit: "spools", reorder: false },
  { item: "Woven Labels", stock: 15000, unit: "pcs", reorder: false },
  { item: "Cotton Bias Tape", stock: 45, unit: "rolls", reorder: true },
];

const Inventory = () => {
  return (
    <AppLayout>
      <div className="max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-display font-light text-foreground mb-1">Inventory</h1>
            <p className="text-sm text-muted-foreground">Fabric rolls, trims, and raw material tracking</p>
          </div>
          <Button className="gap-2">
            <Plus size={16} />
            <span>Add Stock</span>
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <MetricCard label="Fabric Rolls" value={142} detail="Across 12 types" />
          <MetricCard label="Trim Items" value="5,230" detail="Buttons, zippers, labels" />
          <MetricCard label="Low Stock Alerts" value={3} detail="Below reorder point" />
          <MetricCard label="Allocated" value="68%" detail="To active orders" />
        </div>

        {/* Fabric Rolls */}
        <div className="bg-card border border-border rounded-md mb-6">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-sm font-semibold font-body uppercase tracking-wide text-foreground">Fabric Rolls</h2>
          </div>
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-3 font-semibold">ID</th>
                <th className="px-5 py-3 font-semibold">Type</th>
                <th className="px-5 py-3 font-semibold">Color</th>
                <th className="px-5 py-3 font-semibold">Width</th>
                <th className="px-5 py-3 font-semibold">Remaining</th>
                <th className="px-5 py-3 font-semibold">Location</th>
                <th className="px-5 py-3 font-semibold">Allocated</th>
              </tr>
            </thead>
            <tbody>
              {fabricRolls.map((roll) => (
                <tr key={roll.id} className="border-b border-border last:border-b-0 hover:bg-accent/50 cursor-pointer transition-colors">
                  <td className="px-5 py-3 font-semibold text-primary">{roll.id}</td>
                  <td className="px-5 py-3">{roll.type}</td>
                  <td className="px-5 py-3">{roll.color}</td>
                  <td className="px-5 py-3 text-muted-foreground">{roll.width}</td>
                  <td className="px-5 py-3 tabular-nums">{roll.length}</td>
                  <td className="px-5 py-3 text-muted-foreground">{roll.location}</td>
                  <td className="px-5 py-3 text-muted-foreground">{roll.allocated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Trims */}
        <div className="bg-card border border-border rounded-md">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-sm font-semibold font-body uppercase tracking-wide text-foreground">Trims & Accessories</h2>
          </div>
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-3 font-semibold">Item</th>
                <th className="px-5 py-3 font-semibold text-right">In Stock</th>
                <th className="px-5 py-3 font-semibold">Unit</th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {trims.map((trim) => (
                <tr key={trim.item} className="border-b border-border last:border-b-0 hover:bg-accent/50 transition-colors">
                  <td className="px-5 py-3">{trim.item}</td>
                  <td className="px-5 py-3 text-right tabular-nums">{trim.stock.toLocaleString()}</td>
                  <td className="px-5 py-3 text-muted-foreground">{trim.unit}</td>
                  <td className="px-5 py-3">
                    {trim.reorder ? (
                      <span className="text-xs font-semibold text-destructive uppercase">Reorder</span>
                    ) : (
                      <span className="text-xs font-semibold text-muted-foreground uppercase">OK</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
};

export default Inventory;
