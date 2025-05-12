"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/components/auth-provider"

export default function OrdersPage() {
  const { user } = useAuth()

  if (!user) {
    return null // Protected by layout
  }

  // Mock orders data
  const orders = [
    {
      id: "1234",
      date: "May 15, 2023",
      status: "Delivered",
      total: 199.99,
      items: [
        {
          id: "1",
          name: "Premium Wireless Headphones",
          price: 199.99,
          quantity: 1,
          image: "/placeholder.svg",
        },
      ],
    },
    {
      id: "1189",
      date: "April 22, 2023",
      status: "Delivered",
      total: 99.99,
      items: [
        {
          id: "2",
          name: "Smart Fitness Tracker",
          price: 99.99,
          quantity: 1,
          image: "/placeholder.svg",
        },
      ],
    },
    {
      id: "1156",
      date: "March 10, 2023",
      status: "Delivered",
      total: 144.97,
      items: [
        {
          id: "3",
          name: "Organic Cotton T-Shirt",
          price: 29.99,
          quantity: 2,
          image: "/placeholder.svg",
        },
        {
          id: "7",
          name: "Ceramic Coffee Mug",
          price: 14.99,
          quantity: 1,
          image: "/placeholder.svg",
        },
        {
          id: "5",
          name: "Leather Wallet",
          price: 49.99,
          quantity: 1,
          image: "/placeholder.svg",
        },
      ],
    },
  ]

  return (
    <div className="container py-10">
      <div className="mb-4 flex items-center text-sm">
        <Link href="/account" className="text-muted-foreground hover:text-foreground">
          Account
        </Link>
        <ChevronRight className="mx-1 h-4 w-4 text-muted-foreground" />
        <span>Orders</span>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold">Order History</h1>
          <p className="text-muted-foreground">View and track your orders</p>
        </div>

        <Separator className="my-4" />

        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle>Order #{order.id}</CardTitle>
                    <CardDescription>Placed on {order.date}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Processing"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "Shipped"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </span>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between">
                    <p className="font-medium">Total</p>
                    <p className="font-medium">${order.total.toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
