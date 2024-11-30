import { SidebarProvider } from "../components/ui/sidebar";

export function AppSidebarProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SidebarProvider className="dark:text-blue-400">{children}</SidebarProvider>;
}
