"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DataProvider, useData, type Customer } from "@/components/admin/data-provider"

function getMainAddress(customer: Customer) {
  return customer.adresses && customer.adresses.length > 0 ? customer.adresses[0] : null
}

function formatAddress(customer: Customer) {
  const mainAddress = getMainAddress(customer)
  if (!mainAddress) return "—"
  return `${mainAddress.city}, ${mainAddress.country}`
}

function CustomersContent() {
  const router = useRouter()
  const { customers, deleteCustomer, searchCustomers } = useData()
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredCustomers, setFilteredCustomers] = useState(customers)
  const [isSearching, setIsSearching] = useState(false)

  // Update filtered customers when the main customers list changes
  useEffect(() => {
    if (!searchQuery) {
      setFilteredCustomers(customers)
    }
  }, [customers, searchQuery])

  // Debounced search function
  const debouncedSearch = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        setFilteredCustomers(customers)
        return
      }

      setIsSearching(true)
      try {
        const results = await searchCustomers(query)
        setFilteredCustomers(results)
      } catch (error) {
        console.error('Error searching customers:', error)
        setFilteredCustomers(customers)
      } finally {
        setIsSearching(false)
      }
    },
    [customers, searchCustomers]
  )

  // Handle search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      debouncedSearch(searchQuery)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchQuery, debouncedSearch])

  const handleAddCustomer = () => {
    router.push("/admin/create?tab=customer")
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await deleteCustomer(id)
        setFilteredCustomers(prev => prev.filter(c => c.id !== id))
      } catch (error) {
        console.error("Failed to delete customer:", error)
        alert("Failed to delete customer. Please try again.")
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
          {isSearching ? (
            <div className="text-center py-4">
              <p className="text-muted-foreground">Searching...</p>
            </div>
          ) : filteredCustomers.length === 0 ? (
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
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">
                      {`${customer.firstName} ${customer.lastName}`}
                    </TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phone || "—"}</TableCell>
                    <TableCell>{formatAddress(customer)}</TableCell>
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
