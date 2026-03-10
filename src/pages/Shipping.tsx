import { useState } from "react";
import AppLayout from "../components/AppLayout";
import { MetricCard } from "../components/MetricCard";
import { StatusBadge } from "../components/StatusBadge";
import { DataTable, Tr, Td } from "../components/DataTable";
import { DetailPanel, DetailRow } from "../components/DetailPanel";
import { shipmentData, fmt } from "../data/erpData";

const Shipment = () => {
  const [sel, setSel] = useState(shipmentData[0]);

  return (
    <AppLayout>
      <div className="flex gap-3">
        <div className="flex-1 min-w-0">
          <div className="grid grid-cols-4 gap-2.5 mb-3.5">
            <MetricCard label="Total Shipments" value={shipmentData.length} colorClass="text-primary" />
            <MetricCard label="In Transit" value={shipmentData.filter(s => s.status === "In Transit").length} colorClass="text-warning" />
            <MetricCard label="Units Shipped" value={fmt(shipmentData.reduce((s, sh) => s + sh.packed, 0))} colorClass="text-success" />
            <MetricCard label="Pending Docs" value={`${shipmentData.filter(s => !s.docs.bl).length} POs`} colorClass="text-destructive" />
          </div>

          <DataTable title="Shipment Tracker" headers={["SHP #", "PO #", "Buyer", "Style", "ETD", "ETA", "Container", "Qty", "Packed", "Cartons", "CI", "PL", "B/L", "COO", "Status"]}>
            {shipmentData.map((s, i) => (
              <Tr key={s.id} onClick={() => setSel(s)} selected={sel?.id === s.id} index={i}>
                <Td className="text-primary font-semibold text-[11px]">{s.id}</Td>
                <Td className="text-muted-foreground text-[11px]">{s.po}</Td>
                <Td className="text-foreground text-[11px]">{s.buyer}</Td>
                <Td className="text-muted-foreground font-mono text-[11px]">{s.style}</Td>
                <Td className="text-muted-foreground text-[11px]">{s.etd}</Td>
                <Td className="text-muted-foreground text-[11px]">{s.eta}</Td>
                <Td className="text-muted-foreground text-[11px] font-mono">{s.container}</Td>
                <Td className="text-foreground text-[11px]">{fmt(s.qty)}</Td>
                <Td className="text-foreground text-[11px] font-semibold">{fmt(s.packed)}</Td>
                <Td className="text-muted-foreground text-[11px]">{s.cartons}</Td>
                {(["ci", "pl", "bl", "coo"] as const).map(d => (
                  <Td key={d} className="text-center text-[13px]">
                    <span className={s.docs[d] ? "text-success" : "text-destructive"}>{s.docs[d] ? "✓" : "✗"}</span>
                  </Td>
                ))}
                <Td><StatusBadge label={s.status} /></Td>
              </Tr>
            ))}
          </DataTable>
        </div>

        {sel && (
          <DetailPanel title="Shipment Detail" subtitle={
            <>
              <div className="text-foreground text-[15px] font-bold">{sel.id}</div>
              <div className="mb-2.5"><StatusBadge label={sel.status} /></div>
            </>
          }>
            <DetailRow label="PO" value={sel.po} />
            <DetailRow label="Buyer" value={sel.buyer} />
            <DetailRow label="Style" value={sel.style} />
            <DetailRow label="ETD" value={sel.etd} />
            <DetailRow label="ETA" value={sel.eta} />
            <DetailRow label="Container" value={sel.container} />
            <DetailRow label="Total Qty" value={fmt(sel.qty)} />
            <DetailRow label="Packed" value={fmt(sel.packed)} />
            <DetailRow label="Balance" value={fmt(sel.qty - sel.packed)} />
            <DetailRow label="Cartons" value={sel.cartons} />
            <DetailRow label="Mode" value={sel.mode} />
            <div className="mt-3">
              <div className="text-muted-foreground text-[10px] uppercase mb-1.5">Document Status</div>
              {([["Commercial Invoice", "ci"], ["Packing List", "pl"], ["Bill of Lading", "bl"], ["Certificate of Origin", "coo"]] as const).map(([name, key]) => (
                <div key={key} className="flex justify-between py-1.5 border-b border-border">
                  <span className="text-muted-foreground text-[11px]">{name}</span>
                  <span className={`text-[12px] ${sel.docs[key] ? "text-success" : "text-destructive"}`}>
                    {sel.docs[key] ? "✓ Ready" : "✗ Pending"}
                  </span>
                </div>
              ))}
            </div>
          </DetailPanel>
        )}
      </div>
    </AppLayout>
  );
};

export default Shipment;
