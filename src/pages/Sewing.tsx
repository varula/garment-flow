import { useState } from "react";
import AppLayout from "../components/AppLayout";
import { MetricCard } from "../components/MetricCard";
import { StatusBadge } from "../components/StatusBadge";
import { ProgressBar } from "../components/ProgressBar";
import { DataTable, Tr, Td } from "../components/DataTable";
import { sewingLines, fmt } from "../data/erpData";

const Sewing = () => {
  const [sel, setSel] = useState<typeof sewingLines[0] | null>(null);
  const totalOutput = sewingLines.reduce((s, l) => s + l.actual, 0);
  const totalTarget = sewingLines.reduce((s, l) => s + l.target, 0);
  const totalOT = sewingLines.reduce((s, l) => s + l.ot, 0);
  const avgDhu = (sewingLines.filter(l => l.status !== "Idle").reduce((s, l) => s + l.dhu, 0) / 5).toFixed(1);

  return (
    <AppLayout>
      <div className="grid grid-cols-5 gap-3 mb-5">
        <MetricCard label="Active Lines" value={sewingLines.filter(l => l.status === "Running").length} colorClass="text-success" />
        <MetricCard label="Today Output" value={fmt(totalOutput)} colorClass="text-primary" />
        <MetricCard label="Overall Eff." value={`${Math.round((totalOutput / totalTarget) * 100)}%`} colorClass={totalOutput / totalTarget >= 0.9 ? "text-success" : "text-warning"} />
        <MetricCard label="Total OT Hours" value={`${totalOT}h`} colorClass="text-destructive" />
        <MetricCard label="Avg DHU" value={`${avgDhu}%`} colorClass="text-info" />
      </div>

      <DataTable title="Sewing Line Dashboard" headers={["Line", "PO / Style", "Operators", "Absent", "Target", "Actual", "Efficiency", "DHU%", "OT Hrs", "Status"]}>
        {sewingLines.map((l, i) => (
          <Tr key={l.id} onClick={() => setSel(l)} selected={sel?.id === l.id} index={i}>
            <Td className="text-primary text-[13px] font-bold">{l.name}</Td>
            <Td>
              <div className="text-foreground text-[12px] font-medium">{l.po}</div>
              <div className="text-muted-foreground text-[11px]">{l.style}</div>
            </Td>
            <Td className="text-foreground">{l.operators || "—"}</Td>
            <Td>{l.absent > 0 ? <StatusBadge label={`${l.absent}`} colorOverride="destructive" /> : <span className="text-muted-foreground text-[12px]">0</span>}</Td>
            <Td className="text-muted-foreground">{l.target || "—"}</Td>
            <Td className="text-foreground text-[13px] font-bold">{l.actual || "—"}</Td>
            <Td>
              {l.status !== "Idle" ? (
                <div className="flex items-center gap-2">
                  <ProgressBar value={l.actual} max={l.target} height={5} />
                  <span className={`text-[12px] font-bold ${l.eff >= 90 ? "text-success" : l.eff >= 80 ? "text-warning" : "text-destructive"}`}>{l.eff}%</span>
                </div>
              ) : <span className="text-muted-foreground text-[12px]">—</span>}
            </Td>
            <Td>
              {l.status !== "Idle" ? <StatusBadge label={`${l.dhu}%`} colorOverride={l.dhu <= 2 ? "success" : l.dhu <= 4 ? "warning" : "destructive"} /> : <span className="text-muted-foreground text-[12px]">—</span>}
            </Td>
            <Td>
              {l.ot > 0 ? <StatusBadge label={`${l.ot}h`} colorOverride="destructive" /> : <span className="text-muted-foreground text-[12px]">0</span>}
            </Td>
            <Td><StatusBadge label={l.status} /></Td>
          </Tr>
        ))}
      </DataTable>

      <div className="mt-3 px-4 py-3 bg-destructive/5 border border-destructive/20 rounded-xl flex gap-2.5 items-center">
        <span className="text-[14px]">⚠️</span>
        <span className="text-destructive text-[13px]">
          <strong>OT Alert:</strong> Total OT = {totalOT}h today. Estimated OT Cost: <strong>৳{(totalOT * 180).toLocaleString()}</strong>. Consider production recovery planning.
        </span>
      </div>
    </AppLayout>
  );
};

export default Sewing;
