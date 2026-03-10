import AppLayout from "../components/AppLayout";
import { MetricCard } from "../components/MetricCard";
import { StatusBadge } from "../components/StatusBadge";

const productionLines = [
  { line: "Line A", order: "PO-0891", style: "Linen Blazer", workers: 24, target: 2400, completed: 1632, efficiency: 94, status: "active" as const },
  { line: "Line B", order: "PO-0890", style: "Cotton Tee", workers: 32, target: 8000, completed: 960, efficiency: 88, status: "active" as const },
  { line: "Line C", order: "PO-0889", style: "Denim Jacket", workers: 18, target: 1200, completed: 1092, efficiency: 91, status: "urgent" as const },
  { line: "Line D", order: "PO-0888", style: "Chino Pant", workers: 28, target: 5000, completed: 0, efficiency: 0, status: "pending" as const },
];

const stages = [
  { name: "Cutting", active: 3, queue: 1 },
  { name: "Sewing", active: 3, queue: 2 },
  { name: "Finishing", active: 2, queue: 1 },
  { name: "Quality Check", active: 2, queue: 0 },
  { name: "Packing", active: 1, queue: 3 },
];

const Production = () => {
  return (
    <AppLayout>
      <div className="max-w-5xl">
        <h1 className="text-2xl font-display font-light text-foreground mb-1">Production</h1>
        <p className="text-sm text-muted-foreground mb-6">Manufacturing lines, stages, and workforce</p>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <MetricCard label="Active Lines" value={3} detail="1 in setup" />
          <MetricCard label="Workers on Floor" value={102} detail="3 shifts" />
          <MetricCard label="Daily Output" value="1,840" detail="Units yesterday" />
          <MetricCard label="Avg Efficiency" value="91%" detail="Across active lines" />
        </div>

        {/* Production Lines */}
        <div className="bg-card border border-border rounded-md mb-6">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-sm font-semibold font-body uppercase tracking-wide text-foreground">Production Lines</h2>
          </div>
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-3 font-semibold">Line</th>
                <th className="px-5 py-3 font-semibold">Order</th>
                <th className="px-5 py-3 font-semibold">Style</th>
                <th className="px-5 py-3 font-semibold text-right">Workers</th>
                <th className="px-5 py-3 font-semibold text-right">Progress</th>
                <th className="px-5 py-3 font-semibold text-right">Efficiency</th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {productionLines.map((line) => (
                <tr key={line.line} className="border-b border-border last:border-b-0 hover:bg-accent/50 cursor-pointer transition-colors">
                  <td className="px-5 py-3 font-semibold">{line.line}</td>
                  <td className="px-5 py-3 text-primary font-semibold">{line.order}</td>
                  <td className="px-5 py-3">{line.style}</td>
                  <td className="px-5 py-3 text-right tabular-nums">{line.workers}</td>
                  <td className="px-5 py-3 text-right">
                    <span className="tabular-nums">{line.completed.toLocaleString()}</span>
                    <span className="text-muted-foreground"> / {line.target.toLocaleString()}</span>
                  </td>
                  <td className="px-5 py-3 text-right tabular-nums">{line.efficiency}%</td>
                  <td className="px-5 py-3"><StatusBadge status={line.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Stages */}
        <div className="bg-card border border-border rounded-md">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-sm font-semibold font-body uppercase tracking-wide text-foreground">Production Stages</h2>
          </div>
          <div className="grid grid-cols-5 divide-x divide-border">
            {stages.map((stage) => (
              <div key={stage.name} className="p-5 text-center">
                <p className="text-sm font-semibold mb-2">{stage.name}</p>
                <p className="text-2xl font-display font-light text-primary">{stage.active}</p>
                <p className="text-xs text-muted-foreground">active</p>
                {stage.queue > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">{stage.queue} in queue</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Production;
