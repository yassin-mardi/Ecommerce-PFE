"use client"

import Link from "next/link"
import { CheckCircle, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function ConfirmationPage() {
  // Generate a random order number
  const orderNumber = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")

  return (
    <div className="container flex flex-col items-center justify-center px-4 py-16 text-center md:px-6">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <CheckCircle className="h-10 w-10 text-primary" />
      </div>
      <h1 className="mt-6 text-2xl font-bold">Order Confirmed!</h1>
      <p className="mt-2 text-muted-foreground">
        Thank you for your purchase. Your order #{orderNumber} has been confirmed.
      </p>
      <p className="mt-4 max-w-md text-muted-foreground">
        We've sent a confirmation email to your email address with all the details of your order. You'll receive another
        email when your order ships.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Link href="/account/orders">
          <Button variant="outline">View Order</Button>
        </Link>
        <Link href="/products">
          <Button>
            <ShoppingBag className="mr-2 h-4 w-4" />
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  )
}
