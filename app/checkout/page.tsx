"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronRight, CreditCard, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCart } from "@/components/cart-provider"

export default function CheckoutPage() {
  const router = useRouter()
  const { cartItems, subtotal, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Shipping cost
  const shippingCost = 10.0

  // Calculate tax (e.g., 8%)
  const taxRate = 0.08
  const taxAmount = subtotal * taxRate

  // Calculate total
  const total = subtotal + shippingCost + taxAmount

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate order processing
    setTimeout(() => {
      // Clear cart and redirect to confirmation page
      clearCart()
      router.push("/checkout/confirmation")
    }, 1500)
  }

  if (cartItems.length === 0) {
    return (
      <div className="container flex flex-col items-center justify-center px-4 py-16 text-center md:px-6">
        <ShoppingBag className="h-16 w-16 text-muted-foreground" />
        <h1 className="mt-6 text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">You need to add items to your cart before checking out.</p>
        <Link href="/products">
          <Button className="mt-6">Browse Products</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-4 flex items-center text-sm">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="mx-1 h-4 w-4 text-muted-foreground" />
        <Link href="/cart" className="text-muted-foreground hover:text-foreground">
          Cart
        </Link>
        <ChevronRight className="mx-1 h-4 w-4 text-muted-foreground" />
        <span>Checkout</span>
      </div>
      <h1 className="text-3xl font-bold">Checkout</h1>
      <form onSubmit={handleSubmit} className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold">Contact Information</h2>
            <div className="mt-4 space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" required />
              </div>
            </div>
          </div>
          <Separator />
          <div>
            <h2 className="text-xl font-semibold">Shipping Address</h2>
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" required />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                <Input id="apartment" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="state">State</Label>
                  <Select required>
                    <SelectTrigger id="state">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AL">Alabama</SelectItem>
                      <SelectItem value="AK">Alaska</SelectItem>
                      <SelectItem value="AZ">Arizona</SelectItem>
                      {/* Add more states */}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" required />
                </div>
              </div>
            </div>
          </div>
          <Separator />
          <div>
            <h2 className="text-xl font-semibold">Payment</h2>
            <div className="mt-4 space-y-4">
              <RadioGroup defaultValue="card">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Credit Card
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal">PayPal</Label>
                </div>
              </RadioGroup>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="expMonth">Expiration Month</Label>
                    <Select required>
                      <SelectTrigger id="expMonth">
                        <SelectValue placeholder="MM" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                          <SelectItem key={month} value={month.toString().padStart(2, "0")}>
                            {month.toString().padStart(2, "0")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="expYear">Expiration Year</Label>
                    <Select required>
                      <SelectTrigger id="expYear">
                        <SelectValue placeholder="YYYY" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" required />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="rounded-lg border bg-background p-6">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            <div className="mt-6 space-y-4">
              <div className="max-h-80 overflow-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 py-2">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Subtotal</p>
                  <p className="font-medium">${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Shipping</p>
                  <p className="font-medium">${shippingCost.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Tax</p>
                  <p className="font-medium">${taxAmount.toFixed(2)}</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between font-medium">
                <p>Total</p>
                <p>${total.toFixed(2)}</p>
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Place Order"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
