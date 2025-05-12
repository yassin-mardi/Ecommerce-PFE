"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Printer, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock orders data (same as in the orders page)
const orders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john.doe@example.com",
    phone: "555-123-4567",
    date: "2023-05-01",
    status: "Delivered",
    total: 125.99,
    items: [
      {
        id: "1",
        name: "Premium Wireless Headphones",
        price: 99.99,
        quantity: 1,
        total: 99.99,
      },
      {
        id: "4",
        name: "Stainless Steel Water Bottle",
        price: 24.99,
        quantity: 1,
        total: 24.99,
      },
      {
        id: "7",
        name: "Ceramic Coffee Mug",
        price: 14.99,
        quantity: 1,
        total: 14.99,
      },
    ],
    subtotal: 139.97,
    shipping: 5.99,
    tax: 10.5,
    shippingAddress: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
    },
    billingAddress: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
    },
    paymentMethod: "Credit Card (ending in 4242)",
  },
  // ... other orders
]

export default function OrderDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [status, setStatus] = useState("Delivered")

  // Find the order by ID
  const order = orders.find((o) => o.id === params.id)

  if (!order) {
    return (
      <div className="p-8">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Orders
        </Button>
        <div className="mt-8 text-center">
          <h1 className="text-2xl font-bold">Order Not Found</h1>
          <p className="mt-2 text-muted-foreground">The order you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Button>
          <h1 className="text-3xl font-bold">Order {order.id}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button>
            <Send className="mr-2 h-4 w-4" />
            Send Invoice
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
            <CardDescription>View and manage order information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Order Date</h3>
                <p className="text-base">{order.date}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Order Status</h3>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Customer</h3>
                <p className="text-base">{order.customer}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                <p className="text-base">{order.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
                <p className="text-base">{order.phone}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Payment Method</h3>
                <p className="text-base">{order.paymentMethod}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
            <CardDescription>Delivery details and address</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Shipping Address</h3>
              <div className="mt-1">
                <p className="text-base">{order.customer}</p>
                <p className="text-sm text-muted-foreground">{order.shippingAddress.street}</p>
                <p className="text-sm text-muted-foreground">
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                </p>
                <p className="text-sm text-muted-foreground">{order.shippingAddress.country}</p>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Billing Address</h3>
              <div className="mt-1">
                <p className="text-base">{order.customer}</p>
                <p className="text-sm text-muted-foreground">{order.billingAddress.street}</p>
                <p className="text-sm text-muted-foreground">
                  {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zipCode}
                </p>
                <p className="text-sm text-muted-foreground">{order.billingAddress.country}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
          <CardDescription>Products purchased in this order</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell className="text-right">${item.total.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex flex-col items-end">
          <div className="w-full max-w-md space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>${order.shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>${order.tax.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
