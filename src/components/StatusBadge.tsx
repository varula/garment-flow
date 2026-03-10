import { statusColorMap } from "@/data/erpData";

interface StatusBadgeProps {
  label: string;
  colorOverride?: string;
}

const colorClasses: Record<string, string> = {
  primary: "bg-primary/10 text-primary",
  destructive: "bg-destructive/10 text-destructive",
  warning: "bg-warning/10 text-warning",
  success: "bg-success/10 text-success",
  info: "bg-info/10 text-info",
  cyan: "bg-cyan/10 text-cyan",
  "muted-foreground": "bg-secondary text-muted-foreground",
};

export function StatusBadge({ label, colorOverride }: StatusBadgeProps) {
  const colorKey = colorOverride || statusColorMap[label] || "muted-foreground";
  const classes = colorClasses[colorKey] || colorClasses["muted-foreground"];

  return (
    <span className={`inline-block px-2.5 py-1 text-[11px] font-semibold rounded-full ${classes}`}>
      {label}
    </span>
  );
}
