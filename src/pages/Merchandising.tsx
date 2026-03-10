import { useState } from "react";
import AppLayout from "../components/AppLayout";
import { StatusBadge } from "../components/StatusBadge";
import { ProgressBar } from "../components/ProgressBar";
import { DataTable, Tr, Td } from "../components/DataTable";
import { TabButtons } from "../components/TabButtons";
import { productionOrders, shipmentData, sampleData, techPackData, fmt, pct } from "../data/erpData";

const Merchandising = () => {
  const [tab, setTab] = useState("orders");

  return (
    <AppLayout>
      <TabButtons
        tabs={[["orders", "Buyer Orders"], ["samples", "Sample Tracker"], ["techpacks", "Tech Packs"], ["shipments", "Shipment Coord"]]}
        active={tab}
        onChange={setTab}
      />

      {tab === "orders" && (
        <DataTable headers={["PO #", "Buyer", "Style", "Qty", "Delivery", "Fabric", "Trim", "Progress", "CM/PC", "Status"]}>
          {productionOrders.map((o, i) => {
            const daysLeft = Math.ceil((new Date(o.shipDate).getTime() - new Date().getTime()) / 86400000);
            return (
              <Tr key={o.id} index={i}>
                <Td className="text-primary font-semibold">{o.id}</Td>
                <Td className="text-foreground">{o.buyer}</Td>
                <Td className="text-muted-foreground font-mono text-[11px]">{o.style}</Td>
                <Td className="text-foreground">{fmt(o.qty)}</Td>
                <Td>
                  <div className="text-muted-foreground text-[11px]">{o.shipDate}</div>
                  <div className={`text-[10px] ${daysLeft < 7 ? "text-destructive" : daysLeft < 14 ? "text-warning" : "text-success"}`}>
                    {daysLeft > 0 ? `${daysLeft}d left` : "OVERDUE"}
                  </div>
                </Td>
                <Td><StatusBadge label={o.status === "Shipped" ? "Received" : o.status === "Planning" ? "Ordered" : "In Transit"} colorOverride="success" /></Td>
                <Td><StatusBadge label={o.status === "Shipped" ? "Complete" : o.status === "Planning" ? "Pending" : "Partial"} colorOverride="warning" /></Td>
                <Td>
                  <div className="flex items-center gap-1.5">
                    <ProgressBar value={o.packed} max={o.qty} colorClass="bg-info" height={4} />
                    <span className="text-muted-foreground text-[10px]">{pct(o.packed, o.qty)}%</span>
                  </div>
                </Td>
                <Td className="text-success font-semibold">${o.cm}</Td>
                <Td><StatusBadge label={o.status} /></Td>
              </Tr>
            );
          })}
        </DataTable>
      )}

      {tab === "samples" && (
        <DataTable headers={["Sample ID", "Style", "Buyer", "Type", "Attempt", "Submitted", "Response", "Status"]}>
          {sampleData.map((s, i) => (
            <Tr key={s.id} index={i}>
              <Td className="text-primary font-mono text-[11px]">{s.id}</Td>
              <Td className="text-muted-foreground font-mono text-[11px]">{s.style}</Td>
              <Td className="text-foreground text-[11px]">{s.buyer}</Td>
              <Td><StatusBadge label={s.type} colorOverride="info" /></Td>
              <Td className="text-foreground text-[11px] text-center">{s.attempt}</Td>
              <Td className="text-muted-foreground text-[11px]">{s.sub}</Td>
              <Td className="text-muted-foreground text-[11px]">{s.res}</Td>
              <Td><StatusBadge label={s.status} /></Td>
            </Tr>
          ))}
        </DataTable>
      )}

      {tab === "techpacks" && (
        <DataTable headers={["Style", "Buyer", "Version", "Spec Sheet", "BOM", "Artwork", "Updated", "Comments", "Status"]}>
          {techPackData.map((tp, i) => (
            <Tr key={tp.style} index={i}>
              <Td className="text-muted-foreground font-mono text-[11px]">{tp.style}</Td>
              <Td className="text-foreground text-[11px]">{tp.buyer}</Td>
              <Td className="text-muted-foreground text-[11px]">{tp.ver}</Td>
              <Td className="text-center"><span className={tp.spec ? "text-success" : "text-destructive"}>{tp.spec ? "✓" : "✗"}</span></Td>
              <Td className="text-center"><span className={tp.bom ? "text-success" : "text-destructive"}>{tp.bom ? "✓" : "✗"}</span></Td>
              <Td className="text-center"><span className={tp.art ? "text-success" : "text-destructive"}>{tp.art ? "✓" : "✗"}</span></Td>
              <Td className="text-muted-foreground text-[11px]">{tp.upd}</Td>
              <Td className="text-muted-foreground text-[11px]">{tp.cmts > 0 ? `💬 ${tp.cmts}` : "—"}</Td>
              <Td><StatusBadge label={tp.status} /></Td>
            </Tr>
          ))}
        </DataTable>
      )}

      {tab === "shipments" && (
        <DataTable headers={["PO #", "Buyer", "Ex-Factory", "ETD", "ETA", "Container", "Ship Qty", "Balance", "Mode", "Status"]}>
          {shipmentData.map((s, i) => (
            <Tr key={s.id} index={i}>
              <Td className="text-primary font-semibold text-[11px]">{s.po}</Td>
              <Td className="text-foreground text-[11px]">{s.buyer}</Td>
              <Td className="text-muted-foreground text-[11px]">{s.etd}</Td>
              <Td className="text-muted-foreground text-[11px]">{s.etd}</Td>
              <Td className="text-muted-foreground text-[11px]">{s.eta}</Td>
              <Td className="text-muted-foreground text-[11px] font-mono">{s.container}</Td>
              <Td className="text-foreground text-[11px]">{fmt(s.qty)}</Td>
              <Td className={`text-[11px] font-semibold ${s.qty - s.packed > 0 ? "text-warning" : "text-success"}`}>{fmt(s.qty - s.packed)}</Td>
              <Td><StatusBadge label={s.mode} colorOverride="info" /></Td>
              <Td><StatusBadge label={s.status} /></Td>
            </Tr>
          ))}
        </DataTable>
      )}
    </AppLayout>
  );
};

export default Merchandising;
