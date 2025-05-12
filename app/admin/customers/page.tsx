"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DataProvider, useData } from "@/components/admin/data-provider"

function CustomersContent() {
  const router = useRouter()
  const { customers, deleteCustomer, searchCustomers } = useData()
  const [searchQuery, setSearchQuery] = useState("")
  const filteredCustomers = searchCustomers(searchQuery)

  const handleAddCustomer = () => {
    router.push("/admin/create?tab=customer")
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await deleteCustomer(id)
      } catch (error) {
        console.error("Failed to delete customer:", error)
      }
    }
  }

  return (
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Customers</h1>
          <Button onClick={handleAddCustomer}>
            <Plus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Customer Management</CardTitle>
                <CardDescription>Manage your customer database</CardDescription>
              </div>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search customers..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredCustomers.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">No customers found</p>
                </div>
            ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Spent</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell className="font-medium">{customer.name}</TableCell>
                          <TableCell>{customer.email}</TableCell>
                          <TableCell>{customer.phone || "—"}</TableCell>
                          <TableCell>
                            {customer.city && customer.state ? `${customer.city}, ${customer.state}` : "—"}
                          </TableCell>
                          <TableCell>{customer.totalOrders}</TableCell>
                          <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Link href={`/admin/customers/${customer.id}`}>
                                <Button variant="outline" size="sm">
                                  Edit
                                </Button>
                              </Link>
                              <Button variant="destructive" size="sm" onClick={() => handleDelete(customer.id)}>
                                Delete
                              </Button>
                            </div>
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

export default function CustomersPage() {
  return (
      <DataProvider>
        <CustomersContent />
      </DataProvider>
  )
}
