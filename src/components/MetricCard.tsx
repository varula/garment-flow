interface MetricCardProps {
  label: string;
  value: string | number;
  sub?: string;
  icon?: string;
  colorClass?: string;
}

export function MetricCard({ label, value, sub, icon, colorClass = "text-primary" }: MetricCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg px-4 py-3.5">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-muted-foreground text-[11px] uppercase tracking-wider mb-1 font-semibold">{label}</div>
          <div className={`text-[22px] font-bold ${colorClass}`}>{value}</div>
          {sub && <div className={`text-[11px] mt-0.5 ${colorClass}`}>{sub}</div>}
        </div>
        {icon && <span className="text-[22px]">{icon}</span>}
      </div>
    </div>
  );
}
