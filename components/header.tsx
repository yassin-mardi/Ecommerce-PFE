"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, User, Menu, Search, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCart } from "@/components/cart-provider"
import { useAuth } from "@/components/auth-provider"
import { siteConfig } from "@/config/site"
import { categories } from "@/data/categories"

export default function Header() {
  const pathname = usePathname()
  const { cartItems } = useCart()
  const { user, logout } = useAuth()
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center px-6 md:px-10">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2 hover:bg-accent transition-colors">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="grid gap-6 text-lg font-medium">
                  <Link
                      href="/"
                      className={`${pathname === "/" ? "text-foreground" : "text-muted-foreground"} hover:text-foreground transition-colors`}
                  >
                    Home
                  </Link>
                  <Link
                      href="/products"
                      className={`${pathname === "/products" ? "text-foreground" : "text-muted-foreground"} hover:text-foreground transition-colors`}
                  >
                    Products
                  </Link>
                  <Link
                      href="/categories"
                      className={`${pathname === "/categories" ? "text-foreground" : "text-muted-foreground"} hover:text-foreground transition-colors`}
                  >
                    Categories
                  </Link>
                  <Link
                      href="/about"
                      className={`${pathname === "/about" ? "text-foreground" : "text-muted-foreground"} hover:text-foreground transition-colors`}
                  >
                    About
                  </Link>
                  <Link
                      href="/contact"
                      className={`${pathname === "/contact" ? "text-foreground" : "text-muted-foreground"} hover:text-foreground transition-colors`}
                  >
                    Contact
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          <Link href="/" className="ml-4 mr-6 flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <span className="font-bold text-xl">{siteConfig.name}</span>
          </Link>
          <div className="hidden md:flex ml-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink
                        className={`${navigationMenuTriggerStyle()} hover:bg-accent/50 transition-colors`}
                    >
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="hover:bg-accent/50 transition-colors">Products</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md hover:from-muted/60 hover:to-muted/90 transition-colors"
                              href="/products"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">All Products</div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Browse our complete collection of quality products.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>

                      {/* Dynamically generate category links */}
                      {categories.map((category) => (
                          <li key={category.id}>
                            <NavigationMenuLink asChild>
                              <a
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                  href={`/categories/${category.slug}`}
                              >
                                <div className="text-sm font-medium leading-none">{category.name}</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  Browse our {category.name.toLowerCase()} collection
                                </p>
                              </a>
                            </NavigationMenuLink>
                          </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/categories" legacyBehavior passHref>
                    <NavigationMenuLink
                        className={`${navigationMenuTriggerStyle()} hover:bg-accent/50 transition-colors`}
                    >
                      Categories
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/about" legacyBehavior passHref>
                    <NavigationMenuLink
                        className={`${navigationMenuTriggerStyle()} hover:bg-accent/50 transition-colors`}
                    >
                      About
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/contact" legacyBehavior passHref>
                    <NavigationMenuLink
                        className={`${navigationMenuTriggerStyle()} hover:bg-accent/50 transition-colors`}
                    >
                      Contact
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden md:flex relative w-full max-w-sm items-center">
              <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full rounded-md pl-8 md:w-[200px] lg:w-[300px] hover:border-primary focus:border-primary transition-colors"
              />
            </div>

            {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative hover:bg-accent transition-colors">
                      <User className="h-5 w-5" />
                      <span className="sr-only">Account</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{user.role === "admin" ? "Admin Account" : "My Account"}</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {user.role === "admin" ? (
                        // Admin-specific menu items
                        <DropdownMenuItem asChild className="hover:bg-accent cursor-pointer transition-colors">
                          <Link href="/admin">Admin Dashboard</Link>
                        </DropdownMenuItem>
                    ) : (
                        // Regular user menu items
                        <>
                          <DropdownMenuItem asChild className="hover:bg-accent cursor-pointer transition-colors">
                            <Link href="/account">Profile</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild className="hover:bg-accent cursor-pointer transition-colors">
                            <Link href="/account/orders">Orders</Link>
                          </DropdownMenuItem>
                        </>
                    )}

                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="hover:bg-accent cursor-pointer transition-colors">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <Link href="/login">
                  <Button variant="ghost" size="icon" className="hover:bg-accent transition-colors">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Login</span>
                  </Button>
                </Link>
            )}

            {user?.role !== "admin" && (
                <Link href="/cart">
                  <Button variant="ghost" size="icon" className="relative hover:bg-accent transition-colors">
                    <ShoppingCart className="h-5 w-5" />
                    {cartItemCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                          {cartItemCount}
                        </Badge>
                    )}
                    <span className="sr-only">Cart</span>
                  </Button>
                </Link>
            )}
          </div>
        </div>
      </header>
  )
}
