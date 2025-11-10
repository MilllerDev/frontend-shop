import Sidebar from "@/src/features/dashboard/components/sidebar";
import { ReactNode } from "react";



export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 w-full">{children}</main>
    </div>
  );
}
