import { useState } from "react";
import AppLayout from "../components/AppLayout";
import { StatusBadge } from "../components/StatusBadge";
import { ProgressBar } from "../components/ProgressBar";
import { DataTable, Tr, Td } from "../components/DataTable";
import { TabButtons } from "../components/TabButtons";
import { storeData, fmt, pct } from "../data/erpData";

const Store = () => {
  const [tab, setTab] = useState("fabric");

  return (
    <AppLayout>
      <TabButtons
        tabs={[["fabric", "Fabric Store"], ["trims", "Trims & Accessories"]]}
        active={tab}
        onChange={setTab}
      />

      {tab === "fabric" && (
        <DataTable headers={["ID", "Fabric Name", "Supplier", "Rolls", "Total Yds", "Allocated", "Available", "Shade", "Location", "Status"]}>
          {storeData.fabric.map((f, i) => (
            <Tr key={f.id} index={i}>
              <Td className="text-primary font-semibold text-[12px]">{f.id}</Td>
              <Td className="text-foreground text-[13px] font-medium">{f.name}</Td>
              <Td className="text-muted-foreground text-[12px]">{f.supplier}</Td>
              <Td className="text-foreground text-[13px]">{f.rolls}</Td>
              <Td className="text-foreground text-[13px]">{fmt(f.yds)}</Td>
              <Td className="text-warning text-[13px]">{fmt(f.allocated)}</Td>
              <Td className={`text-[13px] font-bold ${f.available < 5000 ? "text-destructive" : "text-success"}`}>{fmt(f.available)}</Td>
              <Td className="text-muted-foreground text-[12px]">{f.shade}</Td>
              <Td className="text-muted-foreground text-[12px]">{f.location}</Td>
              <Td><StatusBadge label={f.status} /></Td>
            </Tr>
          ))}
        </DataTable>
      )}

      {tab === "trims" && (
        <DataTable headers={["ID", "Item Name", "Unit", "Total", "Used", "Balance", "Usage", "Allocated To", "Status"]}>
          {storeData.trims.map((t, i) => (
            <Tr key={t.id} index={i}>
              <Td className="text-primary font-semibold text-[12px]">{t.id}</Td>
              <Td className="text-foreground text-[13px] font-medium">{t.name}</Td>
              <Td className="text-muted-foreground text-[12px]">{t.unit}</Td>
              <Td className="text-foreground text-[13px]">{fmt(t.total)}</Td>
              <Td className="text-warning text-[13px]">{fmt(t.used)}</Td>
              <Td className={`text-[13px] font-bold ${t.balance < 5000 ? "text-destructive" : "text-success"}`}>{fmt(t.balance)}</Td>
              <Td>
                <div className="flex items-center gap-2">
                  <ProgressBar value={t.used} max={t.total} height={4} />
                  <span className="text-muted-foreground text-[11px]">{pct(t.used, t.total)}%</span>
                </div>
              </Td>
              <Td className="text-muted-foreground text-[12px]">{t.po}</Td>
              <Td><StatusBadge label={t.status} /></Td>
            </Tr>
          ))}
        </DataTable>
      )}
    </AppLayout>
  );
};

export default Store;
