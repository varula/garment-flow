import AppLayout from "../components/AppLayout";
import { MetricCard } from "../components/MetricCard";
import { StatusBadge } from "../components/StatusBadge";

const recentOrders = [
  { id: "PO-2024-0891", client: "Zara EU", style: "Linen Blazer", units: 2400, status: "active" as const, due: "Mar 18" },
  { id: "PO-2024-0890", client: "H&M Nordic", style: "Cotton Tee", units: 8000, status: "pending" as const, due: "Mar 22" },
  { id: "PO-2024-0889", client: "Uniqlo JP", style: "Denim Jacket", units: 1200, status: "urgent" as const, due: "Mar 14" },
  { id: "PO-2024-0888", client: "Gap Inc.", style: "Chino Pant", units: 5000, status: "active" as const, due: "Mar 25" },
  { id: "PO-2024-0887", client: "Mango ES", style: "Silk Blouse", units: 900, status: "complete" as const, due: "Mar 10" },
];

const Index = () => {
  return (
    <AppLayout>
      <div className="max-w-5xl">
        <h1 className="text-2xl font-display font-light text-foreground mb-1">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          Production overview — March 2026
        </p>

        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <MetricCard label="Active Orders" value={23} detail="4 due this week" />
          <MetricCard label="Units in Production" value="18,400" detail="Across 6 lines" />
          <MetricCard label="Fabric Stock" value="142" detail="Rolls in inventory" />
          <MetricCard label="On-Time Rate" value="94%" detail="Last 30 days" />
        </div>

        {/* Recent Orders Table */}
        <div className="bg-card border border-border rounded-md">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-sm font-semibold font-body uppercase tracking-wide text-foreground">
              Recent Production Orders
            </h2>
          </div>
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-3 font-semibold">Order</th>
                <th className="px-5 py-3 font-semibold">Client</th>
                <th className="px-5 py-3 font-semibold">Style</th>
                <th className="px-5 py-3 font-semibold text-right">Units</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Due</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-border last:border-b-0 hover:bg-accent/50 cursor-pointer transition-colors"
                >
                  <td className="px-5 py-3 font-semibold text-primary">{order.id}</td>
                  <td className="px-5 py-3">{order.client}</td>
                  <td className="px-5 py-3">{order.style}</td>
                  <td className="px-5 py-3 text-right tabular-nums">{order.units.toLocaleString()}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{order.due}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Production Lines */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[
            { line: "Line A", product: "Linen Blazer", progress: 68, status: "Running" },
            { line: "Line B", product: "Cotton Tee", progress: 12, status: "Setup" },
            { line: "Line C", product: "Denim Jacket", progress: 91, status: "Running" },
          ].map((line) => (
            <div key={line.line} className="bg-card border border-border rounded-md p-5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-semibold text-sm">{line.line}</p>
                  <p className="text-xs text-muted-foreground">{line.product}</p>
                </div>
                <span className="text-xs font-semibold text-primary">{line.status}</span>
              </div>
              <div className="w-full h-2 bg-accent rounded-sm overflow-hidden">
                <div
                  className="h-full bg-primary rounded-sm transition-all"
                  style={{ width: `${line.progress}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">{line.progress}% complete</p>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
