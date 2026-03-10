import { ReactNode } from "react";

interface DetailPanelProps {
  title: string;
  subtitle?: ReactNode;
  children: ReactNode;
}

export function DetailPanel({ title, subtitle, children }: DetailPanelProps) {
  return (
    <div className="w-[280px] bg-card border border-border rounded-xl shadow-apple-md p-4 flex-shrink-0 overflow-y-auto">
      <div className="text-muted-foreground text-[11px] font-medium uppercase tracking-wider mb-1">
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
    <div className="flex justify-between py-2 border-b border-border/50">
      <span className="text-muted-foreground text-[12px]">{label}</span>
      <span className="text-foreground text-[12px] font-medium">{value}</span>
    </div>
  );
}
