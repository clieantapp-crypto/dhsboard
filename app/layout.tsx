import { Inter } from 'next/font/google';
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "لوحة تحكم أكوا فلو",
  description: "لوحة تحكم لإدارة متجر المياه",
    generator: 'v0.dev'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <html lang="ar" dir="rtl">
      <body className={inter.className}>
        <SidebarProvider defaultOpen={defaultOpen}>
          <div className="flex">
            <AppSidebar />
            <div className="flex-1">{children}</div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
