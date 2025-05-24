"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Plus, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useData, type Customer, type Address } from "@/components/admin/data-provider"

interface CustomerFormProps {
  initialData?: Customer
  isEditing?: boolean
}

const emptyAddress: Address = {
  id: "",
  street: "",
  city: "",
  postalCode: "",
  country: ""
}

export default function CustomerForm({ initialData, isEditing = false }: CustomerFormProps) {
  const router = useRouter()
  const { addCustomer, updateCustomer } = useData()

  const [formData, setFormData] = useState({
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    adresses: initialData?.adresses || [{ ...emptyAddress }]
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddressChange = (index: number, field: keyof Address, value: string) => {
    setFormData((prev) => ({
      ...prev,
      adresses: prev.adresses.map((addr, i) => 
        i === index ? { ...addr, [field]: value } : addr
      )
    }))
  }

  const handleAddAddress = () => {
    setFormData((prev) => ({
      ...prev,
      adresses: [...prev.adresses, { ...emptyAddress }]
    }))
  }

  const handleRemoveAddress = (index: number) => {
    if (formData.adresses.length > 1) {
      setFormData((prev) => ({
        ...prev,
        adresses: prev.adresses.filter((_, i) => i !== index)
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      if (isEditing && initialData) {
        await updateCustomer(initialData.id, formData)
      } else {
        await addCustomer(formData)
      }
      router.push("/admin/customers")
    } catch (error) {
      console.error("Failed to save customer:", error)
      setError("Failed to save customer. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

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
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
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
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Addresses</Label>
              <Button type="button" variant="outline" size="sm" onClick={handleAddAddress}>
                <Plus className="h-4 w-4 mr-2" />
                Add Address
              </Button>
            </div>

            {formData.adresses.map((address, index) => (
              <div key={index} className="space-y-4 p-4 border rounded-lg">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Address {index + 1}</h4>
                  {formData.adresses.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveAddress(index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Street</Label>
                    <Input
                      value={address.street}
                      onChange={(e) => handleAddressChange(index, 'street', e.target.value)}
                      placeholder="123 Main St"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>City</Label>
                    <Input
                      value={address.city}
                      onChange={(e) => handleAddressChange(index, 'city', e.target.value)}
                      placeholder="New York"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Postal Code</Label>
                    <Input
                      value={address.postalCode}
                      onChange={(e) => handleAddressChange(index, 'postalCode', e.target.value)}
                      placeholder="10001"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Country</Label>
                    <Input
                      value={address.country}
                      onChange={(e) => handleAddressChange(index, 'country', e.target.value)}
                      placeholder="USA"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
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
