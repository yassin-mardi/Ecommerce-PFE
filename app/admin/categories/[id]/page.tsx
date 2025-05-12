"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import { DataProvider, useData, type Category } from "@/components/admin/data-provider"
import CategoryForm from "@/components/admin/category-form"

function EditCategoryContent() {
  const params = useParams()
  const router = useRouter()
  const { categories } = useData()
  const [category, setCategory] = useState<Category | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id && categories.length > 0) {
      const foundCategory = categories.find((c) => c.id === params.id)
      if (foundCategory) {
        setCategory(foundCategory)
      } else {
        // Category not found, redirect to categories page
        router.push("/admin/categories")
      }
      setLoading(false)
    }
  }, [params.id, categories, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!category) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Edit Category</h1>
      <CategoryForm initialData={category} isEditing />
    </div>
  )
}

export default function EditCategoryPage() {
  return (
    <DataProvider>
      <EditCategoryContent />
    </DataProvider>
  )
}
