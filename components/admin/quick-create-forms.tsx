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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useData } from "@/components/admin/data-provider"

export function QuickCreateForms() {
  const router = useRouter()
  const { categories, addProduct, addCategory, addCustomer } = useData()
  const [activeTab, setActiveTab] = useState("product")

  // Product form state
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: 0,
    category: categories.length > 0 ? categories[0].name : "",
    image: "/placeholder.svg?height=400&width=400",
    featured: false,
    isNew: true,
    inStock: true,
  })

  // Category form state
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    slug: "",
    image: "/placeholder.svg?height=300&width=300",
  })

  // Customer form state
  const [customerForm, setCustomerForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })

  // Loading states
  const [isSubmittingProduct, setIsSubmittingProduct] = useState(false)
  const [isSubmittingCategory, setIsSubmittingCategory] = useState(false)
  const [isSubmittingCustomer, setIsSubmittingCustomer] = useState(false)

  // Error states
  const [productError, setProductError] = useState<string | null>(null)
  const [categoryError, setCategoryError] = useState<string | null>(null)
  const [customerError, setCustomerError] = useState<string | null>(null)

  // Handle product form changes
  const handleProductChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { name: string; value: any },
  ) => {
    const { name, value } = "target" in e ? e.target : e
    setProductForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleProductSwitchChange = (name: string, checked: boolean) => {
    setProductForm((prev) => ({ ...prev, [name]: checked }))
  }

  // Handle category form changes
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCategoryForm((prev) => ({ ...prev, [name]: value }))

    // Auto-generate slug from name if name field is being edited
    if (name === "name") {
      setCategoryForm((prev) => ({ ...prev, slug: createSlug(value) }))
    }
  }

  // Handle customer form changes
  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCustomerForm((prev) => ({ ...prev, [name]: value }))
  }

  // Create slug helper
  const createSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "") // Remove non-word chars
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/--+/g, "-") // Replace multiple - with single -
      .trim()
  }

  // Submit handlers
  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingProduct(true)
    setProductError(null)

    try {
      await addProduct(productForm)
      setProductForm({
        name: "",
        description: "",
        price: 0,
        category: categories.length > 0 ? categories[0].name : "",
        image: "/placeholder.svg?height=400&width=400",
        featured: false,
        isNew: true,
        inStock: true,
      })
      router.refresh()
    } catch (error) {
      console.error("Failed to add product:", error)
      setProductError("Failed to add product. Please try again.")
    } finally {
      setIsSubmittingProduct(false)
    }
  }

  const handleSubmitCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingCategory(true)
    setCategoryError(null)

    try {
      await addCategory(categoryForm)
      setCategoryForm({
        name: "",
        slug: "",
        image: "/placeholder.svg?height=300&width=300",
      })
      router.refresh()
    } catch (error) {
      console.error("Failed to add category:", error)
      setCategoryError("Failed to add category. Please try again.")
    } finally {
      setIsSubmittingCategory(false)
    }
  }

  const handleSubmitCustomer = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingCustomer(true)
    setCustomerError(null)

    try {
      await addCustomer({
        firstName: customerForm.firstName,
        lastName: customerForm.lastName,
        email: customerForm.email,
        phone: customerForm.phone,
        adresses: []
      })
      setCustomerForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      })
      router.refresh()
    } catch (error) {
      console.error("Failed to add customer:", error)
      setCustomerError("Failed to add customer. Please try again.")
    } finally {
      setIsSubmittingCustomer(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Create</CardTitle>
        <CardDescription>Quickly add new items to your store</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="product">Product</TabsTrigger>
            <TabsTrigger value="category">Category</TabsTrigger>
            <TabsTrigger value="customer">Customer</TabsTrigger>
          </TabsList>

          {/* Product Form */}
          <TabsContent value="product">
            <form onSubmit={handleSubmitProduct} className="space-y-4 py-4">
              {productError && (
                <div className="bg-destructive/15 text-destructive p-3 rounded-md text-sm">{productError}</div>
              )}

              <div className="space-y-2">
                <Label htmlFor="product-name">Product Name</Label>
                <Input
                  id="product-name"
                  name="name"
                  value={productForm.name}
                  onChange={handleProductChange}
                  placeholder="Premium Wireless Headphones"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product-price">Price ($)</Label>
                  <Input
                    id="product-price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={productForm.price}
                    onChange={(e) => handleProductChange({ name: "price", value: Number.parseFloat(e.target.value) })}
                    placeholder="99.99"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="product-category">Category</Label>
                  <Select
                    name="category"
                    value={productForm.category}
                    onValueChange={(value) => handleProductChange({ name: "category", value })}
                  >
                    <SelectTrigger id="product-category">
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="product-description">Description</Label>
                <Textarea
                  id="product-description"
                  name="description"
                  value={productForm.description}
                  onChange={handleProductChange}
                  placeholder="High-quality wireless headphones with noise cancellation and premium sound quality."
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="product-inStock" className="cursor-pointer">
                    In Stock
                  </Label>
                  <Switch
                    id="product-inStock"
                    checked={productForm.inStock}
                    onCheckedChange={(checked) => handleProductSwitchChange("inStock", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="product-isNew" className="cursor-pointer">
                    New Product
                  </Label>
                  <Switch
                    id="product-isNew"
                    checked={productForm.isNew}
                    onCheckedChange={(checked) => handleProductSwitchChange("isNew", checked)}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmittingProduct}>
                {isSubmittingProduct && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Product
              </Button>
            </form>
          </TabsContent>

          {/* Category Form */}
          <TabsContent value="category">
            <form onSubmit={handleSubmitCategory} className="space-y-4 py-4">
              {categoryError && (
                <div className="bg-destructive/15 text-destructive p-3 rounded-md text-sm">{categoryError}</div>
              )}

              <div className="space-y-2">
                <Label htmlFor="category-name">Category Name</Label>
                <Input
                  id="category-name"
                  name="name"
                  value={categoryForm.name}
                  onChange={handleCategoryChange}
                  placeholder="Electronics"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category-slug">Slug</Label>
                <Input
                  id="category-slug"
                  name="slug"
                  value={categoryForm.slug}
                  onChange={handleCategoryChange}
                  placeholder="electronics"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  This will be used in the URL: /categories/{categoryForm.slug}
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmittingCategory}>
                {isSubmittingCategory && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Category
              </Button>
            </form>
          </TabsContent>

          {/* Customer Form */}
          <TabsContent value="customer">
            <form onSubmit={handleSubmitCustomer} className="space-y-4 py-4">
              {customerError && (
                <div className="bg-destructive/15 text-destructive p-3 rounded-md text-sm">{customerError}</div>
              )}

              <div className="space-y-2">
                <Label htmlFor="customer-first-name">First Name</Label>
                <Input
                  id="customer-first-name"
                  name="firstName"
                  value={customerForm.firstName}
                  onChange={handleCustomerChange}
                  placeholder="John"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customer-last-name">Last Name</Label>
                <Input
                  id="customer-last-name"
                  name="last_name"
                  value={customerForm.last_name}
                  onChange={handleCustomerChange}
                  placeholder="Doe"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customer-email">Email</Label>
                <Input
                  id="customer-email"
                  name="email"
                  type="email"
                  value={customerForm.email}
                  onChange={handleCustomerChange}
                  placeholder="john.doe@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customer-phone">Phone Number</Label>
                <Input
                  id="customer-phone"
                  name="phone"
                  value={customerForm.phone}
                  onChange={handleCustomerChange}
                  placeholder="555-123-4567"
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmittingCustomer}>
                {isSubmittingCustomer && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Customer
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={() => router.push(`/admin/${activeTab}s/new`)}>
          Go to Full Form
        </Button>
      </CardFooter>
    </Card>
  )
}
