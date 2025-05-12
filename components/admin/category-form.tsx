"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useData, type Category } from "@/components/admin/data-provider"
import ImageUpload from "@/components/admin/image-upload"

interface CategoryFormProps {
  initialData?: Category
  isEditing?: boolean
}

export default function CategoryForm({ initialData, isEditing = false }: CategoryFormProps) {
  const router = useRouter()
  const { addCategory, updateCategory } = useData()

  const [formData, setFormData] = useState<Omit<Category, "id">>({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    image: initialData?.image || "/placeholder.svg?height=300&width=300",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Auto-generate slug from name if slug field is empty or if we're editing the name
    if (name === "name" && (!formData.slug || formData.slug === createSlug(initialData?.name || ""))) {
      setFormData((prev) => ({ ...prev, slug: createSlug(value) }))
    }
  }

  const handleImageChange = (imageData: string) => {
    setFormData((prev) => ({ ...prev, image: imageData }))
  }

  const createSlug = (text: string) => {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "") // Remove non-word chars
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/--+/g, "-") // Replace multiple - with single -
        .trim()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      if (isEditing && initialData) {
        await updateCategory(initialData.id, formData)
      } else {
        await addCategory(formData)
      }
      router.push("/admin/categories")
    } catch (error) {
      console.error("Failed to save category:", error)
      setError("Failed to save category. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>{isEditing ? "Edit Category" : "Add New Category"}</CardTitle>
            <CardDescription>
              {isEditing ? "Update your category information" : "Add a new category to your store"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && <div className="bg-destructive/15 text-destructive p-3 rounded-md text-sm">{error}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Category Name</Label>
                  <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Electronics"
                      required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                      id="slug"
                      name="slug"
                      value={formData.slug}
                      onChange={handleChange}
                      placeholder="electronics"
                      required
                  />
                  <p className="text-sm text-muted-foreground">
                    This will be used in the URL: /categories/{formData.slug}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Category Image</Label>
                <ImageUpload initialImage={formData.image} onImageChange={handleImageChange} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/categories")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditing ? "Update Category" : "Add Category"}
            </Button>
          </CardFooter>
        </Card>
      </form>
  )
}
