"use client"

import { useState } from "react"
import { Search, FileDown, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock orders data
const orders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john.doe@example.com",
    date: "2023-05-01",
    status: "Delivered",
    total: 125.99,
    items: 3,
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane.smith@example.com",
    date: "2023-05-02",
    status: "Processing",
    total: 89.99,
    items: 2,
  },
  {
    id: "ORD-003",
    customer: "Bob Johnson",
    email: "bob.johnson@example.com",
    date: "2023-05-03",
    status: "Shipped",
    total: 199.99,
    items: 1,
  },
  {
    id: "ORD-004",
    customer: "Alice Brown",
    email: "alice.brown@example.com",
    date: "2023-05-04",
    status: "Pending",
    total: 149.99,
    items: 4,
  },
  {
    id: "ORD-005",
    customer: "Charlie Wilson",
    email: "charlie.wilson@example.com",
    date: "2023-05-05",
    status: "Delivered",
    total: 79.99,
    items: 2,
  },
  {
    id: "ORD-006",
    customer: "Eva Martinez",
    email: "eva.martinez@example.com",
    date: "2023-05-06",
    status: "Delivered",
    total: 112.5,
    items: 3,
  },
  {
    id: "ORD-007",
    customer: "David Lee",
    email: "david.lee@example.com",
    date: "2023-05-07",
    status: "Processing",
    total: 65.75,
    items: 1,
  },
  {
    id: "ORD-008",
    customer: "Grace Kim",
    email: "grace.kim@example.com",
    date: "2023-05-08",
    status: "Shipped",
    total: 189.99,
    items: 5,
  },
  {
    id: "ORD-009",
    customer: "Frank Thomas",
    email: "frank.thomas@example.com",
    date: "2023-05-09",
    status: "Pending",
    total: 45.5,
    items: 1,
  },
  {
    id: "ORD-010",
    customer: "Helen Garcia",
    email: "helen.garcia@example.com",
    date: "2023-05-10",
    status: "Delivered",
    total: 299.99,
    items: 2,
  },
]

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter orders based on search query and status filter
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Orders</h1>
        <Button variant="outline">
          <FileDown className="mr-2 h-4 w-4" />
          Export Orders
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Order Management</CardTitle>
              <CardDescription>View and manage customer orders</CardDescription>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredOrders.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-muted-foreground">No orders found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.customer}</div>
                        <div className="text-sm text-muted-foreground">{order.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Processing"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "Shipped"
                                ? "bg-purple-100 text-purple-800"
                                : order.status === "Cancelled"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            Actions
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Order Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>Update Status</DropdownMenuItem>
                          <DropdownMenuItem>Send Invoice</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Cancel Order</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
