"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { House, Moon, Sun } from "lucide-react";
import React from "react";
import { useTheme } from "next-themes";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export function DashboardNavbar() {
  const pathanme = usePathname();
  const pathnameArray = pathanme.split("/").filter((_, i) => i !== 0);
  const { setTheme, theme } = useTheme();
  return (
    <nav className="sticky top-0 flex justify-between shrink-0 lg:px-5 py-2.5 border-b border-black/10 dark:border-white/10 dark:bg-black z-20">
      <div className="flex gap-2 items-center">
        <SidebarTrigger />
        <Separator orientation="vertical" />
        <Link href={"/home"}>
          <House
            size={16}
            className="text-muted-foreground dark:hover:text-white transition"
          />
        </Link>
        <Breadcrumb>
          <BreadcrumbList>
            {pathnameArray.map((path, i) => (
              <React.Fragment key={i}>
                <BreadcrumbSeparator />
                {pathnameArray.length - 1 !== i ? (
                  <React.Fragment key={i}>
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        className="font-medium"
                        href={`/${pathnameArray
                          .filter((_, idx) => idx <= i)
                          .join("/")}`}
                      >
                        {path}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </React.Fragment>
                ) : (
                  <BreadcrumbItem className="font-medium">
                    {path}
                  </BreadcrumbItem>
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex gap-x-3 mr-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              onClick={() =>
                theme === "dark" ? setTheme("light") : setTheme("dark")
              }
            >
              {theme === "dark" ? <Sun /> : <Moon />}
            </TooltipTrigger>
            <TooltipContent>
              {theme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <h1 className="hidden md:block text-lg md:text-xl lg:text-2xl font-semibold ml-8">
          <Link href="/">ASR Tech Solutions</Link>
        </h1>
      </div>
    </nav>
  );
}
