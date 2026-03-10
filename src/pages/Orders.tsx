import AppLayout from "../components/AppLayout";
import { StatusBadge } from "../components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const orders = [
  { id: "PO-2024-0891", client: "Zara EU", style: "Linen Blazer", units: 2400, status: "active" as const, due: "Mar 18", created: "Feb 28" },
  { id: "PO-2024-0890", client: "H&M Nordic", style: "Cotton Tee", units: 8000, status: "pending" as const, due: "Mar 22", created: "Mar 01" },
  { id: "PO-2024-0889", client: "Uniqlo JP", style: "Denim Jacket", units: 1200, status: "urgent" as const, due: "Mar 14", created: "Feb 20" },
  { id: "PO-2024-0888", client: "Gap Inc.", style: "Chino Pant", units: 5000, status: "active" as const, due: "Mar 25", created: "Mar 02" },
  { id: "PO-2024-0887", client: "Mango ES", style: "Silk Blouse", units: 900, status: "complete" as const, due: "Mar 10", created: "Feb 15" },
  { id: "PO-2024-0886", client: "Next UK", style: "Wool Coat", units: 600, status: "active" as const, due: "Apr 01", created: "Mar 05" },
  { id: "PO-2024-0885", client: "Primark", style: "Jersey Dress", units: 12000, status: "pending" as const, due: "Apr 05", created: "Mar 06" },
];

const Orders = () => {
  return (
    <AppLayout>
      <div className="max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-display font-light text-foreground mb-1">Orders</h1>
            <p className="text-sm text-muted-foreground">Manage production orders and client requests</p>
          </div>
          <Button className="gap-2">
            <Plus size={16} />
            <span>Create Order</span>
          </Button>
        </div>

        <div className="bg-card border border-border rounded-md">
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-3 font-semibold">Order</th>
                <th className="px-5 py-3 font-semibold">Client</th>
                <th className="px-5 py-3 font-semibold">Style</th>
                <th className="px-5 py-3 font-semibold text-right">Units</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Created</th>
                <th className="px-5 py-3 font-semibold">Due</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-border last:border-b-0 hover:bg-accent/50 cursor-pointer transition-colors">
                  <td className="px-5 py-3 font-semibold text-primary">{order.id}</td>
                  <td className="px-5 py-3">{order.client}</td>
                  <td className="px-5 py-3">{order.style}</td>
                  <td className="px-5 py-3 text-right tabular-nums">{order.units.toLocaleString()}</td>
                  <td className="px-5 py-3"><StatusBadge status={order.status} /></td>
                  <td className="px-5 py-3 text-muted-foreground">{order.created}</td>
                  <td className="px-5 py-3 text-muted-foreground">{order.due}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
};

export default Orders;
