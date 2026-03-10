import { ReactNode } from "react";
import { NavRail } from "./NavRail";

interface AppLayoutProps {
  children: ReactNode;
  detailPanel?: ReactNode;
}

const AppLayout = ({ children, detailPanel }: AppLayoutProps) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <NavRail />
      <main className="flex-1 overflow-y-auto p-6">
        {children}
      </main>
      {detailPanel && (
        <aside className="w-[340px] border-l border-border bg-card overflow-y-auto animate-slide-in-right p-5">
          {detailPanel}
        </aside>
      )}
    </div>
  );
};

export default AppLayout;
