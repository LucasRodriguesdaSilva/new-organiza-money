"use client"
import { 
  BarChart3, 
  PlusCircle, 
  TrendingUp, 
  Target, 
  CreditCard, 
  Settings,
  Home,
  DollarSign,
  PieChart,
  Wallet,
  LucideProps
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface NavItemsProps {
    title: string 
    url: string
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}

const navItems: NavItemsProps[] = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Receitas", url: "/receitas", icon: DollarSign },
  { title: "Lançamentos", url: "/lancamentos", icon: PlusCircle },

];

const configItems = [
  { title: "Configurações", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname()
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const getNavCls = (item: NavItemsProps) =>
    item.url === pathname 
      ? "bg-primary/20 text-primary border-r-2 border-primary font-medium" 
      : "hover:bg-accent/50 text-muted-foreground hover:text-foreground";

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-card">
        {/* Logo */}
        <div className="p-4 border-b border-border">
          {!collapsed ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Wallet className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg text-foreground">MoneyTracker</span>
            </div>
          ) : (
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto">
              <Wallet className="w-4 h-4 text-primary-foreground" />
            </div>
          )}
        </div>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                      <Link href={item.url} className={getNavCls(item)}>
                     <item.icon className="h-4 w-4" />
                     {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Configuration */}
        <SidebarGroup>
          <SidebarGroupLabel>Sistema</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {configItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                     <Link href={item.url} className={getNavCls(item)}>
                     <item.icon className="h-4 w-4" />
                     {!collapsed && <span>{item.title}</span>}
                   </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
