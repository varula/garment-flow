import { useState, useEffect } from "react";

export function TaktBar() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setW(p => p >= 100 ? 0 : p + 0.5), 100);
    return () => clearInterval(i);
  }, []);

  const color = w > 80 ? "bg-destructive" : w > 60 ? "bg-warning" : "bg-primary";

  return (
    <div
      className={`h-full ${color} transition-all duration-100 rounded-r-full`}
      style={{ width: `${w}%` }}
    />
  );
}
