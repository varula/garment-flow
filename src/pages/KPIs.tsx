import AppLayout from "../components/AppLayout";
import { StatusBadge } from "../components/StatusBadge";
import { MiniSparkline } from "../components/MiniSparkline";
import { DataTable, Tr, Td } from "../components/DataTable";
import { kpiData, costData, managementInsights } from "../data/erpData";

const kpis = [
  { label: "Line Efficiency", current: "90.1%", target: "92%", trend: kpiData.efficiency, color: "hsl(211, 100%, 50%)", status: "Warning" },
  { label: "DHU Rate", current: "3.4%", target: "< 3%", trend: kpiData.dhu, color: "hsl(0, 72%, 51%)", status: "Warning" },
  { label: "On-Time Delivery", current: "85%", target: "95%", trend: kpiData.otDelivery, color: "hsl(142, 71%, 45%)", status: "Below" },
  { label: "Fabric Utilization", current: "92.3%", target: "93%", trend: kpiData.fabricUtil, color: "hsl(262, 83%, 58%)", status: "Good" },
  { label: "OT Cost/Unit", current: "$0.31", target: "$0.18", trend: kpiData.efficiency, color: "hsl(38, 92%, 50%)", status: "Over" },
  { label: "Rework Rate", current: "2.8%", target: "< 2%", trend: kpiData.dhu, color: "hsl(0, 72%, 51%)", status: "Over" },
];

const KPIs = () => {
  return (
    <AppLayout>
      <div className="grid grid-cols-3 gap-4 mb-5">
        {kpis.map(k => (
          <div key={k.label} className="bg-card border border-border rounded-xl shadow-apple p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="text-muted-foreground text-[11px] font-medium uppercase tracking-wider">{k.label}</div>
              <StatusBadge label={k.status} />
            </div>
            <div className="flex items-end gap-3">
              <div>
                <div className="text-[24px] font-bold text-foreground tracking-tight">{k.current}</div>
                <div className="text-muted-foreground text-[11px]">Target: {k.target}</div>
              </div>
              <MiniSparkline data={k.trend} color={k.color} />
            </div>
          </div>
        ))}
      </div>

      <DataTable title="Cost Breakdown (Per Unit)" headers={["Category", "Budget ($)", "Actual ($)", "Variance ($)", "Status"]}>
        {costData.map((c, i) => (
          <Tr key={c.cat} index={i}>
            <Td className="text-foreground text-[13px] font-semibold">{c.cat}</Td>
            <Td className="text-muted-foreground text-[13px]">${c.budget.toFixed(2)}</Td>
            <Td className="text-foreground text-[13px] font-semibold">${c.actual.toFixed(2)}</Td>
            <Td className={`text-[13px] font-bold ${c.variance > 0 ? "text-destructive" : "text-success"}`}>
              {c.variance > 0 ? "+" : ""}{c.variance.toFixed(2)}
            </Td>
            <Td><StatusBadge label={c.status} /></Td>
          </Tr>
        ))}
      </DataTable>

      <div className="bg-card border border-border rounded-xl shadow-apple p-5 mt-5">
        <div className="text-foreground font-semibold text-[15px] tracking-tight mb-4">🎯 Management Insights & Actions</div>
        {managementInsights.map((item, i) => (
          <div key={i} className={`flex gap-3 py-3.5 ${i < managementInsights.length - 1 ? "border-b border-border/50" : ""}`}>
            <span className="text-lg flex-shrink-0">{item.icon}</span>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-foreground text-[13px] font-semibold">{item.title}</span>
                <StatusBadge label={item.urgency} />
              </div>
              <div className="text-muted-foreground text-[12px] leading-relaxed">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
};

export default KPIs;
