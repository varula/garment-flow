import AppLayout from "../components/AppLayout";
import { MetricCard } from "../components/MetricCard";
import { StatusBadge } from "../components/StatusBadge";

const shipments = [
  { id: "SHP-0341", order: "PO-0887", client: "Mango ES", destination: "Barcelona, Spain", units: 900, carrier: "DHL Express", eta: "Mar 12", status: "active" as const },
  { id: "SHP-0340", order: "PO-0885", client: "Primark", destination: "Dublin, Ireland", units: 4000, carrier: "Maersk", eta: "Mar 28", status: "pending" as const },
  { id: "SHP-0339", order: "PO-0884", client: "COS EU", destination: "Stockholm, Sweden", units: 1800, carrier: "DHL Express", eta: "Mar 08", status: "complete" as const },
  { id: "SHP-0338", order: "PO-0882", client: "Asos UK", destination: "London, UK", units: 3200, carrier: "FedEx", eta: "Mar 15", status: "delayed" as const },
];

const Shipping = () => {
  return (
    <AppLayout>
      <div className="max-w-5xl">
        <h1 className="text-2xl font-display font-light text-foreground mb-1">Shipping</h1>
        <p className="text-sm text-muted-foreground mb-6">Outbound logistics and delivery tracking</p>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <MetricCard label="In Transit" value={4} detail="Across 3 carriers" />
          <MetricCard label="Pending Pickup" value={2} detail="Scheduled this week" />
          <MetricCard label="Delivered (MTD)" value={11} detail="28,400 units" />
          <MetricCard label="Delayed" value={1} detail="SHP-0338" />
        </div>

        <div className="bg-card border border-border rounded-md">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-sm font-semibold font-body uppercase tracking-wide text-foreground">Shipments</h2>
          </div>
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-3 font-semibold">Shipment</th>
                <th className="px-5 py-3 font-semibold">Order</th>
                <th className="px-5 py-3 font-semibold">Client</th>
                <th className="px-5 py-3 font-semibold">Destination</th>
                <th className="px-5 py-3 font-semibold text-right">Units</th>
                <th className="px-5 py-3 font-semibold">Carrier</th>
                <th className="px-5 py-3 font-semibold">ETA</th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((s) => (
                <tr key={s.id} className="border-b border-border last:border-b-0 hover:bg-accent/50 cursor-pointer transition-colors">
                  <td className="px-5 py-3 font-semibold text-primary">{s.id}</td>
                  <td className="px-5 py-3 text-muted-foreground">{s.order}</td>
                  <td className="px-5 py-3">{s.client}</td>
                  <td className="px-5 py-3">{s.destination}</td>
                  <td className="px-5 py-3 text-right tabular-nums">{s.units.toLocaleString()}</td>
                  <td className="px-5 py-3 text-muted-foreground">{s.carrier}</td>
                  <td className="px-5 py-3 text-muted-foreground">{s.eta}</td>
                  <td className="px-5 py-3"><StatusBadge status={s.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
};

export default Shipping;
