import AppLayout from "../components/AppLayout";
import { MetricCard } from "../components/MetricCard";
import { StatusBadge } from "../components/StatusBadge";
import { ProgressBar } from "../components/ProgressBar";
import { DataTable, Tr, Td } from "../components/DataTable";
import { productionOrders, sewingLines, pct, fmt } from "../data/erpData";

const Index = () => {
  const totalQty = productionOrders.reduce((s, o) => s + o.qty, 0);
  const totalPacked = productionOrders.reduce((s, o) => s + o.packed, 0);
  const critical = productionOrders.filter(o => o.priority === "Critical").length;
  const avgEff = Math.round(
    sewingLines.filter(l => l.status !== "Idle").reduce((s, l) => s + l.eff, 0) /
    sewingLines.filter(l => l.status !== "Idle").length
  );

  return (
    <AppLayout>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <MetricCard label="Active Orders" value={productionOrders.filter(o => o.status !== "Shipped").length} sub="2 critical" icon="📋" />
        <MetricCard label="Total Units" value={fmt(totalQty)} sub={`${pct(totalPacked, totalQty)}% packed`} colorClass="text-info" icon="👖" />
        <MetricCard label="Avg Line Eff." value={`${avgEff}%`} sub="Target: 90%" colorClass={avgEff >= 90 ? "text-success" : "text-warning"} icon="⚡" />
        <MetricCard label="OTD Risk" value={`${critical} POs`} sub="Need attention" colorClass="text-destructive" icon="🚨" />
      </div>

      <DataTable
        title="Production Order Tracker"
        subtitle={`${productionOrders.length} orders`}
        headers={["PO #", "Buyer", "Style", "Color", "Order Qty", "Cutting", "Sewing", "Finishing", "Packed", "Ship Date", "Status", "Priority"]}
      >
        {productionOrders.map((o, i) => (
          <Tr key={o.id} index={i}>
            <Td className="text-primary font-semibold whitespace-nowrap">{o.id}</Td>
            <Td className="text-foreground font-medium">{o.buyer}</Td>
            <Td className="text-muted-foreground text-[12px]">{o.style}</Td>
            <Td className="text-muted-foreground text-[12px]">{o.color}</Td>
            <Td className="text-foreground font-semibold">{fmt(o.qty)}</Td>
            <Td>
              <div className="flex items-center gap-2">
                <ProgressBar value={o.cut} max={o.qty} />
                <span className="text-muted-foreground text-[11px]">{pct(o.cut, o.qty)}%</span>
              </div>
            </Td>
            <Td>
              <div className="flex items-center gap-2">
                <ProgressBar value={o.sewing} max={o.qty} colorClass="bg-info" />
                <span className="text-muted-foreground text-[11px]">{pct(o.sewing, o.qty)}%</span>
              </div>
            </Td>
            <Td>
              <div className="flex items-center gap-2">
                <ProgressBar value={o.finishing} max={o.qty} colorClass="bg-warning" />
                <span className="text-muted-foreground text-[11px]">{pct(o.finishing, o.qty)}%</span>
              </div>
            </Td>
            <Td>
              <div className="flex items-center gap-2">
                <ProgressBar value={o.packed} max={o.qty} colorClass="bg-success" />
                <span className="text-muted-foreground text-[11px]">{pct(o.packed, o.qty)}%</span>
              </div>
            </Td>
            <Td className="text-muted-foreground text-[12px] whitespace-nowrap">{o.shipDate}</Td>
            <Td><StatusBadge label={o.status} /></Td>
            <Td><StatusBadge label={o.priority} /></Td>
          </Tr>
        ))}
      </DataTable>
    </AppLayout>
  );
};

export default Index;
