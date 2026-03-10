interface TabButtonsProps {
  tabs: [string, string][];
  active: string;
  onChange: (tab: string) => void;
}

export function TabButtons({ tabs, active, onChange }: TabButtonsProps) {
  return (
    <div className="flex gap-1 mb-4 bg-secondary rounded-lg p-1">
      {tabs.map(([key, label]) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`px-4 py-2 rounded-md text-[13px] font-medium transition-all border-none cursor-pointer ${
            active === key
              ? "bg-card text-foreground shadow-apple"
              : "bg-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
