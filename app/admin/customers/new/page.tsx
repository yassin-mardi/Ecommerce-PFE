"use client"

import { DataProvider } from "@/components/admin/data-provider"
import CustomerForm from "@/components/admin/customer-form"

export default function NewCustomerPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Add New Customer</h1>
      <DataProvider>
        <CustomerForm />
      </DataProvider>
    </div>
  )
}
