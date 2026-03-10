import { ReactNode } from "react";

interface DetailPanelProps {
  title: string;
  subtitle?: ReactNode;
  children: ReactNode;
}

export function DetailPanel({ title, subtitle, children }: DetailPanelProps) {
  return (
    <div className="w-[260px] bg-card border border-border rounded-lg p-3.5 flex-shrink-0 overflow-y-auto">
      <div className="text-muted-foreground text-[10px] uppercase tracking-wider mb-1">
        {title}
      </div>
      {subtitle}
      {children}
    </div>
  );
}

interface DetailRowProps {
  label: string;
  value: string | number | ReactNode;
}

export function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="flex justify-between py-1.5 border-b border-border">
      <span className="text-muted-foreground text-[11px]">{label}</span>
      <span className="text-foreground text-[11px] font-medium">{value}</span>
    </div>
  );
}
