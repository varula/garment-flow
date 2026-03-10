interface MetricCardProps {
  label: string;
  value: string | number;
  sub?: string;
  icon?: string;
  colorClass?: string;
}

export function MetricCard({ label, value, sub, icon, colorClass = "text-primary" }: MetricCardProps) {
  return (
    <div className="bg-card rounded-xl shadow-apple border border-border px-5 py-4">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-muted-foreground text-[12px] font-medium mb-1.5">{label}</div>
          <div className={`text-[24px] font-bold tracking-tight ${colorClass}`}>{value}</div>
          {sub && <div className={`text-[12px] mt-1 font-medium ${colorClass} opacity-80`}>{sub}</div>}
        </div>
        {icon && <span className="text-[24px]">{icon}</span>}
      </div>
    </div>
  );
}
