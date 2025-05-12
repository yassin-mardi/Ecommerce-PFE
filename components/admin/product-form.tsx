"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useData, type Product } from "@/components/admin/data-provider"
import ImageUpload from "@/components/admin/image-upload"

interface ProductFormProps {
  initialData?: Product
  isEditing?: boolean
}

export default function ProductForm({ initialData, isEditing = false }: ProductFormProps) {
  const router = useRouter()
  const { categories, addProduct, updateProduct } = useData()

  const [formData, setFormData] = useState<Omit<Product, "id">>({
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || 0,
    compareAtPrice: initialData?.compareAtPrice || undefined,
    image: initialData?.image || "/placeholder.svg?height=400&width=400",
    category: initialData?.category || (categories.length > 0 ? categories[0].name : ""),
    featured: initialData?.featured || false,
    isNew: initialData?.isNew || false,
    inStock: initialData?.inStock || true,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { name: string; value: any },
  ) => {
    const { name, value } = "target" in e ? e.target : e
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleImageChange = (imageData: string) => {
    setFormData((prev) => ({ ...prev, image: imageData }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      if (isEditing && initialData) {
        await updateProduct(initialData.id, formData)
      } else {
        await addProduct(formData)
      }
      router.push("/admin/products")
    } catch (error) {
      console.error("Failed to save product:", error)
      setError("Failed to save product. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>{isEditing ? "Edit Product" : "Add New Product"}</CardTitle>
            <CardDescription>
              {isEditing ? "Update your product information" : "Add a new product to your store"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && <div className="bg-destructive/15 text-destructive p-3 rounded-md text-sm">{error}</div>}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Premium Wireless Headphones"
                    required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                    name="category"
                    value={formData.category}
                    onValueChange={(value) => handleChange({ name: "category", value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => handleChange({ name: "price", value: Number.parseFloat(e.target.value) })}
                    placeholder="99.99"
                    required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="compareAtPrice">Compare At Price ($) (Optional)</Label>
                <Input
                    id="compareAtPrice"
                    name="compareAtPrice"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.compareAtPrice || ""}
                    onChange={(e) =>
                        handleChange({
                          name: "compareAtPrice",
                          value: e.target.value ? Number.parseFloat(e.target.value) : undefined,
                        })
                    }
                    placeholder="149.99"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="High-quality wireless headphones with noise cancellation and premium sound quality."
                    rows={4}
                    required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Product Image</Label>
                <ImageUpload initialImage={formData.image} onImageChange={handleImageChange} />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="inStock" className="cursor-pointer">
                    In Stock
                  </Label>
                  <Switch
                      id="inStock"
                      checked={formData.inStock}
                      onCheckedChange={(checked) => handleSwitchChange("inStock", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="featured" className="cursor-pointer">
                    Featured Product
                  </Label>
                  <Switch
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => handleSwitchChange("featured", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="isNew" className="cursor-pointer">
                    New Product
                  </Label>
                  <Switch
                      id="isNew"
                      checked={formData.isNew}
                      onCheckedChange={(checked) => handleSwitchChange("isNew", checked)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/products")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditing ? "Update Product" : "Add Product"}
            </Button>
          </CardFooter>
        </Card>
      </form>
  )
}
