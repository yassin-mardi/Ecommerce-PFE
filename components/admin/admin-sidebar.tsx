"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Box, Home, LogOut, Package, Plus, Settings, ShoppingCart, Tag, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"

export default function AdminSidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()

  const routes = [
    {
      label: "Dashboard",
      icon: BarChart3,
      href: "/admin",
      active: pathname === "/admin",
    },
    {
      label: "Create New",
      icon: Plus,
      href: "/admin/create",
      active: pathname === "/admin/create",
    },
    {
      label: "Products",
      icon: Package,
      href: "/admin/products",
      active:
        pathname === "/admin/products" ||
        (pathname.startsWith("/admin/products/") && pathname !== "/admin/products/new"),
    },
    {
      label: "Categories",
      icon: Tag,
      href: "/admin/categories",
      active:
        pathname === "/admin/categories" ||
        (pathname.startsWith("/admin/categories/") && pathname !== "/admin/categories/new"),
    },
    {
      label: "Orders",
      icon: ShoppingCart,
      href: "/admin/orders",
      active: pathname === "/admin/orders" || pathname.startsWith("/admin/orders/"),
    },
    {
      label: "Customers",
      icon: Users,
      href: "/admin/customers",
      active:
        pathname === "/admin/customers" ||
        (pathname.startsWith("/admin/customers/") && pathname !== "/admin/customers/new"),
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/admin/settings",
      active: pathname === "/admin/settings",
    },
  ]

  return (
    <div className="flex flex-col h-full w-64 bg-muted/40 border-r">
      <div className="p-6">
        <Link href="/admin" className="flex items-center gap-2 font-bold text-xl">
          <Box className="h-6 w-6" />
          <span>Admin Panel</span>
        </Link>
      </div>
      <div className="flex-1 px-4 space-y-1">
        {routes.map((route) => (
          <Link key={route.href} href={route.href}>
            <Button
              variant={route.active ? "secondary" : "ghost"}
              className={cn("w-full justify-start", route.active ? "font-medium" : "font-normal")}
            >
              <route.icon className="mr-2 h-5 w-5" />
              {route.label}
            </Button>
          </Link>
        ))}
      </div>
      <div className="p-4 mt-auto border-t">
        <div className="flex items-center justify-between mb-4">
          <div>
            <Link href="/" className="text-sm hover:underline">
              <Button variant="ghost" size="sm" className="gap-2">
                <Home className="h-4 w-4" />
                Back to Store
              </Button>
            </Link>
          </div>
        </div>
        <Button variant="outline" className="w-full justify-start" onClick={logout}>
          <LogOut className="mr-2 h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  )
}
