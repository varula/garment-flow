import AppLayout from "../components/AppLayout";
import { StatusBadge } from "../components/StatusBadge";
import { MiniSparkline } from "../components/MiniSparkline";
import { DataTable, Tr, Td } from "../components/DataTable";
import { kpiData, costData, managementInsights } from "../data/erpData";

const kpis = [
  { label: "Line Efficiency", current: "90.1%", target: "92%", trend: kpiData.efficiency, color: "#3b82f6", status: "Warning" },
  { label: "DHU Rate", current: "3.4%", target: "< 3%", trend: kpiData.dhu, color: "#ef4444", status: "Warning" },
  { label: "On-Time Delivery", current: "85%", target: "95%", trend: kpiData.otDelivery, color: "#10b981", status: "Below" },
  { label: "Fabric Utilization", current: "92.3%", target: "93%", trend: kpiData.fabricUtil, color: "#8b5cf6", status: "Good" },
  { label: "OT Cost/Unit", current: "$0.31", target: "$0.18", trend: kpiData.efficiency, color: "#f59e0b", status: "Over" },
  { label: "Rework Rate", current: "2.8%", target: "< 2%", trend: kpiData.dhu, color: "#ef4444", status: "Over" },
];

const KPIs = () => {
  return (
    <AppLayout>
      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {kpis.map(k => (
          <div key={k.label} className="bg-card border border-border rounded-lg p-3.5">
            <div className="flex justify-between items-start mb-2">
              <div className="text-muted-foreground text-[10px] uppercase tracking-wider font-semibold">{k.label}</div>
              <StatusBadge label={k.status} />
            </div>
            <div className="flex items-end gap-3">
              <div>
                <div className="text-[22px] font-bold text-foreground">{k.current}</div>
                <div className="text-muted-foreground text-[10px]">Target: {k.target}</div>
              </div>
              <MiniSparkline data={k.trend} color={k.color} />
            </div>
          </div>
        ))}
      </div>

      {/* Cost Table */}
      <DataTable title="Cost Breakdown (Per Unit)" headers={["Category", "Budget ($)", "Actual ($)", "Variance ($)", "Status"]}>
        {costData.map((c, i) => (
          <Tr key={c.cat} index={i}>
            <Td className="text-foreground text-[12px] font-semibold">{c.cat}</Td>
            <Td className="text-muted-foreground text-[12px]">${c.budget.toFixed(2)}</Td>
            <Td className="text-foreground text-[12px] font-semibold">${c.actual.toFixed(2)}</Td>
            <Td className={`text-[12px] font-bold ${c.variance > 0 ? "text-destructive" : "text-success"}`}>
              {c.variance > 0 ? "+" : ""}{c.variance.toFixed(2)}
            </Td>
            <Td><StatusBadge label={c.status} /></Td>
          </Tr>
        ))}
      </DataTable>

      {/* Management Insights */}
      <div className="bg-card border border-border rounded-lg p-3.5 mt-4">
        <div className="text-primary font-semibold text-[13px] mb-2.5">🎯 Management Insights & Actions</div>
        {managementInsights.map((item, i) => (
          <div key={i} className={`flex gap-2.5 py-2.5 ${i < managementInsights.length - 1 ? "border-b border-border" : ""}`}>
            <span className="text-lg flex-shrink-0">{item.icon}</span>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-foreground text-[12px] font-semibold">{item.title}</span>
                <StatusBadge label={item.urgency} />
              </div>
              <div className="text-muted-foreground text-[11px] leading-relaxed">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
};

export default KPIs;
