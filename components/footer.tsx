import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { siteConfig } from "@/config/site"

export default function Footer() {
  return (
      <footer className="w-full border-t bg-background">
        <div className="container grid gap-8 py-8 px-6 md:px-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-2 ">
            <h3 className="text-lg font-semibold">{siteConfig.name}</h3>
            <p className="text-sm text-muted-foreground">{siteConfig.description}</p>
            <div className="flex gap-2 mt-2">
              <Link href="https://twitter.com" target="_blank" rel="noreferrer">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noreferrer">
                <Instagram className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://facebook.com" target="_blank" rel="noreferrer">
                <Facebook className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                <span className="sr-only">Facebook</span>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <h3 className="text-lg font-semibold">Shop</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="/products" className="hover:text-foreground">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-foreground">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/products/new" className="hover:text-foreground">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/products/sale" className="hover:text-foreground">
                  Sale
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <h3 className="text-lg font-semibold">Account</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="/account" className="hover:text-foreground">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/account/orders" className="hover:text-foreground">
                  Order History
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-foreground">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="/account/settings" className="hover:text-foreground">
                  Settings
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="/contact" className="hover:text-foreground">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-foreground">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-foreground">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t py-6">
          <div className="container flex flex-col items-center justify-center gap-4 px-6 md:px-10 md:flex-row md:justify-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
  )
}
