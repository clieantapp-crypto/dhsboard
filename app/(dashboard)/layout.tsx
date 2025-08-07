import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const defaultOpen = true

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="flex">
        <AppSidebar />
        <div className="flex-1">{children}</div>
      </div>
    </SidebarProvider>
  );
}
