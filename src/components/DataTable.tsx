import { ReactNode } from "react";

interface DataTableProps {
  headers: string[];
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function DataTable({ headers, children, title, subtitle }: DataTableProps) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {title && (
        <div className="px-4 py-3 border-b border-border flex justify-between items-center">
          <span className="text-foreground font-semibold text-[13px]">{title}</span>
          {subtitle && <span className="text-muted-foreground text-[11px]">{subtitle}</span>}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border">
              {headers.map(h => (
                <th key={h} className="px-2.5 py-2 text-muted-foreground text-[10px] font-semibold text-left uppercase tracking-wider whitespace-nowrap">
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
      className={`border-b border-card last:border-b-0 cursor-pointer transition-colors ${
        selected ? "bg-primary/10" : index % 2 ? "bg-background/50" : "bg-transparent"
      } hover:bg-primary/5`}
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
  return <td className={`px-2.5 py-2.5 text-[12px] ${className}`}>{children}</td>;
}
