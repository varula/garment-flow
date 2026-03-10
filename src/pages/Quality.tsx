import { useState } from "react";
import AppLayout from "../components/AppLayout";
import { MetricCard } from "../components/MetricCard";
import { StatusBadge } from "../components/StatusBadge";
import { DataTable, Tr, Td } from "../components/DataTable";
import { DetailPanel, DetailRow } from "../components/DetailPanel";
import { qualityData, fmt } from "../data/erpData";

const Quality = () => {
  const [sel, setSel] = useState(qualityData[0]);
  const totalDefects = qualityData.reduce((s, q) => s + q.failed, 0);
  const totalInspected = qualityData.reduce((s, q) => s + q.inspected, 0);
  const overallDHU = (qualityData.reduce((s, q) => s + q.dhu, 0) / qualityData.length).toFixed(1);

  const defectFreq: Record<string, number> = {};
  qualityData.forEach(q => q.defects.forEach(d => { defectFreq[d] = (defectFreq[d] || 0) + 1; }));
  const topDefects = Object.entries(defectFreq).sort((a, b) => b[1] - a[1]);

  return (
    <AppLayout>
      <div className="flex gap-4">
        <div className="flex-1 min-w-0">
          <div className="grid grid-cols-4 gap-3 mb-5">
            <MetricCard label="Total Inspected" value={fmt(totalInspected)} colorClass="text-primary" />
            <MetricCard label="Total Failed" value={fmt(totalDefects)} colorClass="text-destructive" />
            <MetricCard label="Overall DHU" value={`${overallDHU}%`} colorClass={Number(overallDHU) <= 3 ? "text-success" : "text-warning"} />
            <MetricCard label="Pass Rate" value={`${(100 - (totalDefects / totalInspected * 100)).toFixed(1)}%`} colorClass="text-success" />
          </div>

          <DataTable title="QC Inspection Records" headers={["ID", "PO", "Buyer", "Style", "Stage", "Inspected", "Passed", "Failed", "DHU%", "Defects", "Inspector", "Date", "Result"]}>
            {qualityData.map((q, i) => (
              <Tr key={q.id} onClick={() => setSel(q)} selected={sel?.id === q.id} index={i}>
                <Td className="text-primary font-semibold text-[12px]">{q.id}</Td>
                <Td className="text-muted-foreground text-[12px]">{q.po}</Td>
                <Td className="text-foreground text-[12px] font-medium">{q.buyer}</Td>
                <Td className="text-muted-foreground text-[12px]">{q.style}</Td>
                <Td><StatusBadge label={q.stage} colorOverride="info" /></Td>
                <Td className="text-foreground text-[12px]">{fmt(q.inspected)}</Td>
                <Td className="text-success text-[12px] font-semibold">{fmt(q.passed)}</Td>
                <Td className="text-destructive text-[12px] font-semibold">{fmt(q.failed)}</Td>
                <Td><StatusBadge label={`${q.dhu}%`} colorOverride={q.dhu <= 2 ? "success" : q.dhu <= 5 ? "warning" : "destructive"} /></Td>
                <Td>
                  <div className="flex gap-1 flex-wrap">
                    {q.defects.slice(0, 2).map(d => <StatusBadge key={d} label={d} colorOverride="muted-foreground" />)}
                    {q.defects.length > 2 && <span className="text-muted-foreground text-[11px]">+{q.defects.length - 2}</span>}
                  </div>
                </Td>
                <Td className="text-muted-foreground text-[12px]">{q.inspector}</Td>
                <Td className="text-muted-foreground text-[12px]">{q.date}</Td>
                <Td><StatusBadge label={q.result} /></Td>
              </Tr>
            ))}
          </DataTable>

          <div className="bg-card border border-border rounded-xl shadow-apple p-4 mt-4">
            <div className="text-foreground font-semibold text-[14px] tracking-tight mb-3">Defect Pareto Analysis</div>
            {topDefects.map(([d, cnt]) => (
              <div key={d} className="flex items-center gap-3 mb-2.5">
                <span className="text-muted-foreground text-[12px] w-40 flex-shrink-0">{d}</span>
                <div className="flex-1 bg-secondary rounded-full h-5 overflow-hidden">
                  <div className="h-full bg-destructive/80 rounded-full flex items-center pl-2" style={{ width: `${(cnt / topDefects[0][1]) * 100}%` }}>
                    <span className="text-destructive-foreground text-[10px] font-semibold">{cnt}</span>
                  </div>
                </div>
                <span className="text-muted-foreground text-[11px] w-8">{cnt}×</span>
              </div>
            ))}
          </div>
        </div>

        {sel && (
          <DetailPanel title="QC Detail" subtitle={
            <>
              <div className="text-foreground text-[16px] font-bold tracking-tight">{sel.id}</div>
              <div className="mb-3"><StatusBadge label={sel.result} /></div>
            </>
          }>
            <DetailRow label="PO" value={sel.po} />
            <DetailRow label="Style" value={sel.style} />
            <DetailRow label="Buyer" value={sel.buyer} />
            <DetailRow label="Stage" value={sel.stage} />
            <DetailRow label="Inspected" value={fmt(sel.inspected)} />
            <DetailRow label="Passed" value={fmt(sel.passed)} />
            <DetailRow label="Failed" value={fmt(sel.failed)} />
            <DetailRow label="DHU" value={`${sel.dhu}%`} />
            <DetailRow label="Inspector" value={sel.inspector} />
            <DetailRow label="Date" value={sel.date} />
            {sel.result === "Fail" && (
              <div className="mt-3 bg-destructive/5 border border-destructive/20 rounded-lg p-3">
                <div className="text-destructive text-[12px] font-semibold mb-1">⚠ Action Required</div>
                <div className="text-destructive/80 text-[11px]">Lot failed QC. Schedule rework or return to laundry.</div>
              </div>
            )}
            <div className="mt-3">
              <div className="text-muted-foreground text-[11px] font-medium uppercase mb-2">Defect Types</div>
              <div className="flex flex-wrap gap-1.5">
                {sel.defects.map(d => <StatusBadge key={d} label={d} colorOverride="destructive" />)}
              </div>
            </div>
          </DetailPanel>
        )}
      </div>
    </AppLayout>
  );
};

export default Quality;
