import { useState } from "react";
import AppLayout from "../components/AppLayout";
import { StatusBadge } from "../components/StatusBadge";
import { ProgressBar } from "../components/ProgressBar";
import { DataTable, Tr, Td } from "../components/DataTable";
import { DetailPanel, DetailRow } from "../components/DetailPanel";
import { TabButtons } from "../components/TabButtons";
import { cutOrders, fmt, pct } from "../data/erpData";

const Cutting = () => {
  const [sel, setSel] = useState(cutOrders[0]);
  const [tab, setTab] = useState("orders");

  return (
    <AppLayout>
      <div className="flex gap-4 h-full">
        <div className="flex-1 min-w-0">
          <TabButtons
            tabs={[["orders", "Cut Orders"], ["fabric", "Fabric Allocation"], ["layplans", "Lay Plans"]]}
            active={tab}
            onChange={setTab}
          />

          {tab === "orders" && (
            <DataTable headers={["Cut #", "PO Ref", "Buyer", "Style", "Color", "Sizes", "Planned", "Cut", "Balance", "Marker Eff", "Status"]}>
              {cutOrders.map((o, i) => (
                <Tr key={o.id} onClick={() => setSel(o)} selected={sel?.id === o.id} index={i}>
                  <Td className="text-primary font-semibold">{o.id}</Td>
                  <Td className="text-muted-foreground text-[12px]">{o.po}</Td>
                  <Td className="text-foreground font-medium">{o.buyer}</Td>
                  <Td className="text-muted-foreground text-[12px]">{o.style}</Td>
                  <Td className="text-muted-foreground text-[12px]">{o.color}</Td>
                  <Td>
                    <div className="flex gap-1 flex-wrap">
                      {o.sizes.map(s => (
                        <span key={s.s} className="bg-secondary text-muted-foreground px-1.5 py-0.5 rounded-full text-[10px] font-medium">
                          {s.s}×{s.r}
                        </span>
                      ))}
                    </div>
                  </Td>
                  <Td className="text-foreground">{fmt(o.planned)}</Td>
                  <Td className="text-foreground font-semibold">{fmt(o.cut)}</Td>
                  <Td>{o.balance > 0 ? <StatusBadge label={fmt(o.balance)} colorOverride="destructive" /> : <span className="text-muted-foreground text-[12px]">—</span>}</Td>
                  <Td><StatusBadge label={`${o.markerEff}%`} colorOverride={o.markerEff >= 82 ? "success" : "warning"} /></Td>
                  <Td><StatusBadge label={o.status} /></Td>
                </Tr>
              ))}
            </DataTable>
          )}

          {tab === "fabric" && (
            <DataTable headers={["Cut #", "Buyer/Style", "Fabric Issued", "Consumed", "Waste Kg", "Utilization", "Marker Eff", "Table", "Date"]}>
              {cutOrders.map((o, i) => (
                <Tr key={o.id} onClick={() => setSel(o)} selected={sel?.id === o.id} index={i}>
                  <Td className="text-primary font-semibold">{o.id}</Td>
                  <Td>
                    <div className="text-foreground text-[13px] font-medium">{o.buyer}</div>
                    <div className="text-muted-foreground text-[11px]">{o.style}</div>
                  </Td>
                  <Td className="text-foreground">{fmt(o.fabricIssued)} yds</Td>
                  <Td className="text-foreground">{fmt(o.fabricConsumed)} yds</Td>
                  <Td><StatusBadge label={`${o.wasteKg} kg`} colorOverride={o.wasteKg > 50 ? "destructive" : "warning"} /></Td>
                  <Td>
                    <div className="flex items-center gap-2">
                      <ProgressBar value={o.fabricConsumed} max={o.fabricIssued} colorClass="bg-info" />
                      <span className="text-muted-foreground text-[11px]">{pct(o.fabricConsumed, o.fabricIssued)}%</span>
                    </div>
                  </Td>
                  <Td><StatusBadge label={`${o.markerEff}%`} colorOverride={o.markerEff >= 82 ? "success" : "warning"} /></Td>
                  <Td className="text-muted-foreground text-[12px]">{o.table}</Td>
                  <Td className="text-muted-foreground text-[12px]">{o.date}</Td>
                </Tr>
              ))}
            </DataTable>
          )}

          {tab === "layplans" && (
            <DataTable headers={["Lay Plan #", "Cut Order", "Buyer/Style", "Fabric", "Marker Len", "Layers", "Plies", "Consumption", "Status"]}>
              {cutOrders.flatMap(o =>
                o.layPlans.map((lp, i) => (
                  <Tr key={lp.id} onClick={() => setSel(o)} selected={sel?.id === o.id} index={i}>
                    <Td className="text-primary font-semibold">{lp.id}</Td>
                    <Td className="text-muted-foreground text-[12px]">{o.id}</Td>
                    <Td>
                      <div className="text-foreground text-[13px] font-medium">{o.buyer}</div>
                      <div className="text-muted-foreground text-[11px]">{o.style} · {o.color}</div>
                    </Td>
                    <Td className="text-muted-foreground text-[12px]">{lp.fabric}</Td>
                    <Td className="text-foreground">{lp.len}m</Td>
                    <Td className="text-foreground">{lp.layers}</Td>
                    <Td className="text-foreground font-semibold">{lp.plies}</Td>
                    <Td className="text-muted-foreground text-[12px]">{lp.cons > 0 ? fmt(lp.cons) + " yds" : "—"}</Td>
                    <Td><StatusBadge label={lp.status} /></Td>
                  </Tr>
                ))
              )}
            </DataTable>
          )}
        </div>

        {sel && (
          <DetailPanel title="Cut Order Detail" subtitle={
            <>
              <div className="text-foreground text-[16px] font-bold tracking-tight">{sel.id}</div>
              <div className="text-primary text-[13px] font-medium mb-3">{sel.buyer} · {sel.po}</div>
              <div className="mb-3">
                <div className="flex justify-between mb-1.5">
                  <span className="text-muted-foreground text-[12px]">Cut Progress</span>
                  <span className="text-foreground text-[12px] font-semibold">{pct(sel.cut, sel.planned)}%</span>
                </div>
                <ProgressBar value={sel.cut} max={sel.planned} />
                <div className="flex justify-between mt-1.5">
                  <span className="text-success text-[11px] font-medium">{fmt(sel.cut)} cut</span>
                  <span className="text-destructive text-[11px] font-medium">{fmt(sel.balance)} left</span>
                </div>
              </div>
            </>
          }>
            <DetailRow label="Style" value={sel.style} />
            <DetailRow label="Color" value={sel.color} />
            <DetailRow label="Table" value={sel.table} />
            <DetailRow label="Date" value={sel.date} />
            <DetailRow label="Marker Eff." value={`${sel.markerEff}%`} />
            <DetailRow label="Fabric Issued" value={`${fmt(sel.fabricIssued)} yds`} />
            <DetailRow label="Fabric Used" value={`${fmt(sel.fabricConsumed)} yds`} />
            <DetailRow label="Waste" value={`${sel.wasteKg} kg`} />
            <div className="mt-3">
              <div className="text-muted-foreground text-[11px] font-medium uppercase tracking-wider mb-2">Size Breakdown</div>
              {sel.sizes.map(s => (
                <div key={s.s} className="flex items-center gap-2 mb-1.5">
                  <span className="text-muted-foreground text-[11px] w-6">{s.s}</span>
                  <ProgressBar value={s.q} max={sel.planned} colorClass="bg-info" height={4} />
                  <span className="text-muted-foreground text-[11px]">{fmt(s.q)}</span>
                </div>
              ))}
            </div>
          </DetailPanel>
        )}
      </div>
    </AppLayout>
  );
};

export default Cutting;
