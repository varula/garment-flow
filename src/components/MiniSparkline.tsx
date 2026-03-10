interface MiniSparklineProps {
  data: { m: string; v: number }[];
  color?: string;
}

export function MiniSparkline({ data, color = "hsl(211, 100%, 50%)" }: MiniSparklineProps) {
  const max = Math.max(...data.map(d => d.v));
  const min = Math.min(...data.map(d => d.v));
  const range = max - min || 1;
  const W = 80, H = 28;
  const pts = data.map((d, i) => `${(i / (data.length - 1)) * W},${H - ((d.v - min) / range) * H}`).join(" ");
  const lastPt = pts.split(" ").pop()?.split(",") || ["0", "0"];

  return (
    <svg width={W} height={H} style={{ overflow: "visible" }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={parseFloat(lastPt[0])} cy={parseFloat(lastPt[1])} r={3} fill={color} />
    </svg>
  );
}
