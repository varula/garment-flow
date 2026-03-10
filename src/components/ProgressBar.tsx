interface ProgressBarProps {
  value: number;
  max: number;
  colorClass?: string;
  height?: number;
}

export function ProgressBar({ value, max, colorClass, height = 6 }: ProgressBarProps) {
  const pctVal = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  const autoColor = pctVal >= 90 ? "bg-success" : pctVal >= 70 ? "bg-primary" : pctVal >= 50 ? "bg-warning" : "bg-destructive";
  const barColor = colorClass || autoColor;

  return (
    <div className="bg-secondary rounded-full overflow-hidden min-w-[80px]" style={{ height }}>
      <div
        className={`h-full rounded-full transition-all duration-500 ${barColor}`}
        style={{ width: `${pctVal}%` }}
      />
    </div>
  );
}
