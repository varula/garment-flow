import { ReactNode } from "react";

interface MetricCardProps {
  label: string;
  value: string | number;
  detail?: string;
  children?: ReactNode;
}

export function MetricCard({ label, value, detail }: MetricCardProps) {
  return (
    <div className="bg-card border border-border rounded-md p-5">
      <p className="text-sm text-muted-foreground font-body font-semibold uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="text-3xl font-display font-light text-foreground">{value}</p>
      {detail && (
        <p className="text-xs text-muted-foreground mt-1">{detail}</p>
      )}
    </div>
  );
}
