interface StatusBadgeProps {
  status: "active" | "pending" | "complete" | "urgent" | "delayed";
}

const statusStyles: Record<StatusBadgeProps["status"], string> = {
  active: "bg-primary/15 text-primary",
  pending: "bg-accent text-muted-foreground",
  complete: "bg-primary/10 text-foreground",
  urgent: "bg-destructive/15 text-destructive",
  delayed: "bg-destructive/10 text-destructive",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-block px-2.5 py-0.5 text-xs font-semibold rounded-sm uppercase tracking-wide ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
