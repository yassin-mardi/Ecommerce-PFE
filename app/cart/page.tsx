"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Minus, Plus, ShoppingCart, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart-provider"

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, subtotal, clearCart } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleCheckout = () => {
    setIsCheckingOut(true)

    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false)
      // Redirect to checkout page
      window.location.href = "/checkout"
    }, 1000)
  }

  if (cartItems.length === 0) {
    return (
      <div className="container flex flex-col items-center justify-center px-4 py-16 text-center md:px-6">
        <ShoppingCart className="h-16 w-16 text-muted-foreground" />
        <h1 className="mt-6 text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
        <Link href="/products">
          <Button className="mt-6">
            Continue Shopping
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <h1 className="text-3xl font-bold">Shopping Cart</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-lg border">
            <div className="p-6">
              <div className="flow-root">
                <ul className="-my-6 divide-y">
                  {cartItems.map((item) => (
                    <li key={item.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium">
                            <h3>
                              <Link href={`/products/${item.id}`}>{item.name}</Link>
                            </h3>
                            <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                        </div>
                        <div className="flex flex-1 items-end justify-between">
                          <div className="flex items-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                              <span className="sr-only">Decrease quantity</span>
                            </Button>
                            <span className="mx-2 w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                              <span className="sr-only">Increase quantity</span>
                            </Button>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => removeFromCart(item.id)}>
                            <Trash className="mr-2 h-4 w-4" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="border-t px-6 py-4">
              <div className="flex justify-between">
                <Button variant="outline" onClick={clearCart}>
                  Clear Cart
                </Button>
                <Link href="/products">
                  <Button variant="outline">Continue Shopping</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="rounded-lg border bg-background p-6">
            <h2 className="text-lg font-medium">Order Summary</h2>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Subtotal</p>
                <p className="font-medium">${subtotal.toFixed(2)}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Shipping</p>
                <p className="font-medium">Calculated at checkout</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Tax</p>
                <p className="font-medium">Calculated at checkout</p>
              </div>
              <Separator />
              <div className="flex items-center justify-between font-medium">
                <p>Total</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <Button className="w-full" size="lg" onClick={handleCheckout} disabled={isCheckingOut}>
                {isCheckingOut ? "Processing..." : "Checkout"}
              </Button>
              <p className="text-center text-xs text-muted-foreground">Taxes and shipping calculated at checkout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
