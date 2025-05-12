"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useData, type Customer } from "@/components/admin/data-provider"

interface CustomerFormProps {
  initialData?: Customer
  isEditing?: boolean
}

export default function CustomerForm({ initialData, isEditing = false }: CustomerFormProps) {
  const router = useRouter()
  const { addCustomer, updateCustomer } = useData()

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    address: initialData?.address || "",
    city: initialData?.city || "",
    state: initialData?.state || "",
    zipCode: initialData?.zipCode || "",
    country: initialData?.country || "USA",
    totalOrders: initialData?.totalOrders || 0,
    totalSpent: initialData?.totalSpent || 0,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      if (isEditing && initialData) {
        await updateCustomer(initialData.id, formData)
      } else {
        await addCustomer({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        })
      }
      router.push("/admin/customers")
    } catch (error) {
      console.error("Failed to save customer:", error)
      setError("Failed to save customer. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // US states for dropdown
  const states = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ]

  // Countries for dropdown
  const countries = ["USA", "Canada", "UK", "Australia", "Germany", "France", "Japan", "China", "India", "Brazil"]

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? "Edit Customer" : "Add New Customer"}</CardTitle>
          <CardDescription>
            {isEditing ? "Update customer information" : "Add a new customer to your database"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && <div className="bg-destructive/15 text-destructive p-3 rounded-md text-sm">{error}</div>}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john.doe@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="555-123-4567"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Main St"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" value={formData.city} onChange={handleChange} placeholder="New York" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Select name="state" value={formData.state} onValueChange={(value) => handleSelectChange("state", value)}>
                <SelectTrigger id="state">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} placeholder="10001" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select
                name="country"
                value={formData.country}
                onValueChange={(value) => handleSelectChange("country", value)}
              >
                <SelectTrigger id="country">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {isEditing && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="totalOrders">Total Orders</Label>
                  <Input
                    id="totalOrders"
                    name="totalOrders"
                    type="number"
                    value={formData.totalOrders}
                    onChange={(e) => handleSelectChange("totalOrders", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalSpent">Total Spent ($)</Label>
                  <Input
                    id="totalSpent"
                    name="totalSpent"
                    type="number"
                    step="0.01"
                    value={formData.totalSpent}
                    onChange={(e) => handleSelectChange("totalSpent", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/customers")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditing ? "Update Customer" : "Add Customer"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
