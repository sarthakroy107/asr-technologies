import { Toaster } from "sonner";
import { QueryProvider } from "./react-query.provider";
import { ThemeProvider } from "./theme.provider";
import { AppSidebarProvider } from "./sidebar.provider";
import { AppSidebar } from "@/components/app-sidebar";


export default function MainProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <QueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <AppSidebarProvider>
          <Toaster />
          <AppSidebar />
          {children}
        </AppSidebarProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
