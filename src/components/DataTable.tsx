import { ReactNode } from "react";

interface DataTableProps {
  headers: string[];
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function DataTable({ headers, children, title, subtitle }: DataTableProps) {
  return (
    <div className="bg-card rounded-xl shadow-apple border border-border overflow-hidden">
      {title && (
        <div className="px-5 py-3.5 border-b border-border flex justify-between items-center">
          <span className="text-foreground font-semibold text-[14px] tracking-tight">{title}</span>
          {subtitle && <span className="text-muted-foreground text-[12px]">{subtitle}</span>}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border">
              {headers.map(h => (
                <th key={h} className="px-3 py-2.5 text-muted-foreground text-[11px] font-semibold text-left uppercase tracking-wider whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
}

interface TrProps {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  index?: number;
}

export function Tr({ children, selected, onClick, index = 0 }: TrProps) {
  return (
    <tr
      onClick={onClick}
      className={`border-b border-border/50 last:border-b-0 cursor-pointer transition-colors ${
        selected ? "bg-primary/5" : "hover:bg-secondary/60"
      }`}
    >
      {children}
    </tr>
  );
}

interface TdProps {
  children: ReactNode;
  className?: string;
}

export function Td({ children, className = "" }: TdProps) {
  return <td className={`px-3 py-3 text-[13px] ${className}`}>{children}</td>;
}
