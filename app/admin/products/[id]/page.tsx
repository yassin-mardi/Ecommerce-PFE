"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import { DataProvider, useData, type Product } from "@/components/admin/data-provider"
import ProductForm from "@/components/admin/product-form"

function EditProductContent() {
  const params = useParams()
  const router = useRouter()
  const { products } = useData()
  const [product, setProduct] = useState<Product | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id && products.length > 0) {
      const foundProduct = products.find((p) => p.id === params.id)
      if (foundProduct) {
        setProduct(foundProduct)
      } else {
        // Product not found, redirect to products page
        router.push("/admin/products")
      }
      setLoading(false)
    }
  }, [params.id, products, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!product) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
      <ProductForm initialData={product} isEditing />
    </div>
  )
}

export default function EditProductPage() {
  return (
    <DataProvider>
      <EditProductContent />
    </DataProvider>
  )
}
