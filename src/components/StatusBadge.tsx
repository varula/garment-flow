import { statusColorMap } from "@/data/erpData";

interface StatusBadgeProps {
  label: string;
  colorOverride?: string;
}

const colorClasses: Record<string, string> = {
  primary: "bg-primary/15 text-primary border-primary/30",
  destructive: "bg-destructive/15 text-destructive border-destructive/30",
  warning: "bg-warning/15 text-warning border-warning/30",
  success: "bg-success/15 text-success border-success/30",
  info: "bg-info/15 text-info border-info/30",
  cyan: "bg-cyan/15 text-cyan border-cyan/30",
  "muted-foreground": "bg-muted text-muted-foreground border-border",
};

export function StatusBadge({ label, colorOverride }: StatusBadgeProps) {
  const colorKey = colorOverride || statusColorMap[label] || "muted-foreground";
  const classes = colorClasses[colorKey] || colorClasses["muted-foreground"];

  return (
    <span className={`inline-block px-2 py-0.5 text-[11px] font-semibold rounded border tracking-wider ${classes}`}>
      {label}
    </span>
  );
}
