"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import { DataProvider, useData, type Customer } from "@/components/admin/data-provider"
import CustomerForm from "@/components/admin/customer-form"

function EditCustomerContent() {
  const params = useParams()
  const router = useRouter()
  const { customers } = useData()
  const [customer, setCustomer] = useState<Customer | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id && customers.length > 0) {
      const foundCustomer = customers.find((c) => c.id === params.id)
      if (foundCustomer) {
        setCustomer(foundCustomer)
      } else {
        // Customer not found, redirect to customers page
        router.push("/admin/customers")
      }
      setLoading(false)
    }
  }, [params.id, customers, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!customer) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Edit Customer</h1>
      <CustomerForm initialData={customer} isEditing />
    </div>
  )
}

export default function EditCustomerPage() {
  return (
    <DataProvider>
      <EditCustomerContent />
    </DataProvider>
  )
}
