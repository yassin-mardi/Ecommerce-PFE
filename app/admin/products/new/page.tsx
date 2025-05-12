"use client"

import { DataProvider } from "@/components/admin/data-provider"
import ProductForm from "@/components/admin/product-form"

export default function NewProductPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
      <DataProvider>
        <ProductForm />
      </DataProvider>
    </div>
  )
}
