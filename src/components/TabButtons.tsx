interface TabButtonsProps {
  tabs: [string, string][];
  active: string;
  onChange: (tab: string) => void;
}

export function TabButtons({ tabs, active, onChange }: TabButtonsProps) {
  return (
    <div className="flex gap-2 mb-3">
      {tabs.map(([key, label]) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`px-3.5 py-1.5 rounded-md text-[12px] font-semibold transition-all border-none cursor-pointer ${
            active === key
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
