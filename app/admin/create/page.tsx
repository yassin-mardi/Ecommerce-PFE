"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataProvider } from "@/components/admin/data-provider"
import ProductForm from "@/components/admin/product-form"
import CategoryForm from "@/components/admin/category-form"
import CustomerForm from "@/components/admin/customer-form"

function CreateFormsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("product")

  // Set the active tab based on the URL parameter when the component mounts
  useEffect(() => {
    const tabParam = searchParams.get("tab")
    if (tabParam && ["product", "category", "customer"].includes(tabParam)) {
      setActiveTab(tabParam)
    }
  }, [searchParams])

  // Update the URL when the tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    router.push(`/admin/create?tab=${value}`, { scroll: false })
  }

  return (
    <Tabs defaultValue="product" value={activeTab} onValueChange={handleTabChange} className="space-y-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="product">Product</TabsTrigger>
        <TabsTrigger value="category">Category</TabsTrigger>
        <TabsTrigger value="customer">Customer</TabsTrigger>
      </TabsList>
      <TabsContent value="product">
        <ProductForm />
      </TabsContent>
      <TabsContent value="category">
        <CategoryForm />
      </TabsContent>
      <TabsContent value="customer">
        <CustomerForm />
      </TabsContent>
    </Tabs>
  )
}

export default function CreatePage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Create New</h1>
      </div>
      <DataProvider>
        <CreateFormsContent />
      </DataProvider>
    </div>
  )
}
