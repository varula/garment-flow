import { useState } from "react";
import AppLayout from "../components/AppLayout";
import { StatusBadge } from "../components/StatusBadge";
import { ProgressBar } from "../components/ProgressBar";
import { DataTable, Tr, Td } from "../components/DataTable";
import { DetailPanel, DetailRow } from "../components/DetailPanel";
import { TabButtons } from "../components/TabButtons";
import { washData, qualityData, productionOrders, dryProcessData, fmt, pct } from "../data/erpData";

const Finishing = () => {
  const [tab, setTab] = useState("wash");
  const [sel, setSel] = useState(washData[0]);

  return (
    <AppLayout>
      <div className="flex gap-4">
        <div className="flex-1 min-w-0">
          <TabButtons
            tabs={[["wash", "Wash Recipes"], ["dryprocess", "Dry Process"], ["qc", "QC Post-Wash"], ["packing", "Packing"]]}
            active={tab}
            onChange={setTab}
          />

          {tab === "wash" && (
            <DataTable headers={["ID", "Style", "PO", "Buyer", "Recipe", "Wash Type", "Temp", "Dur.", "Qty", "Done", "Progress", "Laundry", "Status"]}>
              {washData.map((w, i) => (
                <Tr key={w.id} onClick={() => setSel(w)} selected={sel?.id === w.id} index={i}>
                  <Td className="text-primary font-semibold">{w.id}</Td>
                  <Td className="text-muted-foreground text-[12px]">{w.style}</Td>
                  <Td className="text-muted-foreground text-[12px]">{w.po}</Td>
                  <Td className="text-foreground text-[12px] font-medium">{w.buyer}</Td>
                  <Td className="text-foreground text-[12px] font-semibold">{w.recipe}</Td>
                  <Td><StatusBadge label={w.washType} colorOverride="cyan" /></Td>
                  <Td className="text-foreground text-[12px]">{w.temp}°C</Td>
                  <Td className="text-muted-foreground text-[12px]">{w.duration}m</Td>
                  <Td className="text-foreground text-[12px]">{fmt(w.qty)}</Td>
                  <Td className="text-foreground text-[12px] font-semibold">{fmt(w.done)}</Td>
                  <Td>
                    <div className="flex items-center gap-1.5">
                      <ProgressBar value={w.done} max={w.qty} colorClass="bg-cyan" height={4} />
                      <span className="text-muted-foreground text-[11px]">{pct(w.done, w.qty)}%</span>
                    </div>
                  </Td>
                  <Td className="text-muted-foreground text-[12px]">{w.laundry}</Td>
                  <Td><StatusBadge label={w.status} /></Td>
                </Tr>
              ))}
            </DataTable>
          )}

          {tab === "dryprocess" && (
            <DataTable headers={["Style", "PO #", "Process", "Target", "Done", "Progress", "Operator", "Status"]}>
              {dryProcessData.map((p, i) => (
                <Tr key={p.id} index={i}>
                  <Td className="text-muted-foreground text-[12px]">{p.style}</Td>
                  <Td className="text-muted-foreground text-[12px]">{p.po}</Td>
                  <Td><StatusBadge label={p.process} colorOverride="cyan" /></Td>
                  <Td className="text-foreground text-[12px]">{fmt(p.target)}</Td>
                  <Td className="text-foreground text-[12px] font-semibold">{fmt(p.done)}</Td>
                  <Td>
                    <div className="flex items-center gap-2">
                      <ProgressBar value={p.done} max={p.target} height={4} />
                      <span className="text-muted-foreground text-[11px]">{pct(p.done, p.target)}%</span>
                    </div>
                  </Td>
                  <Td className="text-muted-foreground text-[12px]">{p.operator}</Td>
                  <Td><StatusBadge label={p.status} /></Td>
                </Tr>
              ))}
            </DataTable>
          )}

          {tab === "qc" && (
            <DataTable headers={["ID", "Style", "PO", "Inspected", "Passed", "Failed", "DHU", "Inspector", "Date", "Result"]}>
              {qualityData.map((q, i) => (
                <Tr key={q.id} index={i}>
                  <Td className="text-primary font-semibold text-[12px]">{q.id}</Td>
                  <Td className="text-muted-foreground text-[12px]">{q.style}</Td>
                  <Td className="text-muted-foreground text-[12px]">{q.po}</Td>
                  <Td className="text-foreground text-[12px]">{fmt(q.inspected)}</Td>
                  <Td className="text-success text-[12px] font-semibold">{fmt(q.passed)}</Td>
                  <Td className="text-destructive text-[12px] font-semibold">{fmt(q.failed)}</Td>
                  <Td><StatusBadge label={`${q.dhu}%`} colorOverride={q.dhu <= 2 ? "success" : q.dhu <= 5 ? "warning" : "destructive"} /></Td>
                  <Td className="text-muted-foreground text-[12px]">{q.inspector}</Td>
                  <Td className="text-muted-foreground text-[12px]">{q.date}</Td>
                  <Td><StatusBadge label={q.result} /></Td>
                </Tr>
              ))}
            </DataTable>
          )}

          {tab === "packing" && (
            <DataTable headers={["PO #", "Buyer", "Style", "Order Qty", "Packed", "Cartons", "Progress", "Ship Date", "Status"]}>
              {productionOrders.map((o, i) => (
                <Tr key={o.id} index={i}>
                  <Td className="text-primary font-semibold text-[12px]">{o.id}</Td>
                  <Td className="text-foreground text-[12px] font-medium">{o.buyer}</Td>
                  <Td className="text-muted-foreground text-[12px]">{o.style}</Td>
                  <Td className="text-foreground text-[12px]">{fmt(o.qty)}</Td>
                  <Td className="text-foreground text-[12px] font-semibold">{fmt(o.packed)}</Td>
                  <Td className="text-muted-foreground text-[12px]">{Math.floor(o.packed / 25)}</Td>
                  <Td>
                    <div className="flex items-center gap-2">
                      <ProgressBar value={o.packed} max={o.qty} colorClass="bg-success" height={4} />
                      <span className="text-muted-foreground text-[11px]">{pct(o.packed, o.qty)}%</span>
                    </div>
                  </Td>
                  <Td className="text-muted-foreground text-[12px]">{o.shipDate}</Td>
                  <Td><StatusBadge label={o.status} /></Td>
                </Tr>
              ))}
            </DataTable>
          )}
        </div>

        {tab === "wash" && sel && (
          <DetailPanel title="Wash Detail" subtitle={
            <>
              <div className="text-foreground text-[16px] font-bold tracking-tight mb-1">{sel.recipe}</div>
              <div className="mb-3"><StatusBadge label={sel.status} /></div>
            </>
          }>
            <DetailRow label="Style" value={sel.style} />
            <DetailRow label="Buyer" value={sel.buyer} />
            <DetailRow label="Wash Type" value={sel.washType} />
            <DetailRow label="Temperature" value={`${sel.temp}°C`} />
            <DetailRow label="Duration" value={`${sel.duration} min`} />
            <DetailRow label="Shade" value={sel.shade} />
            <DetailRow label="Laundry" value={sel.laundry} />
            <DetailRow label="Qty" value={fmt(sel.qty)} />
            <DetailRow label="Done" value={fmt(sel.done)} />
            <div className="mt-3">
              <div className="text-muted-foreground text-[11px] font-medium uppercase mb-2">Chemicals</div>
              <div className="flex flex-wrap gap-1.5">
                {sel.chemicals.map(c => <StatusBadge key={c} label={c} colorOverride="cyan" />)}
              </div>
            </div>
          </DetailPanel>
        )}
      </div>
    </AppLayout>
  );
};

export default Finishing;
