"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DataProvider, useData } from "@/components/admin/data-provider"

function ProductsContent() {
  const router = useRouter()
  const { products, deleteProduct, searchProducts } = useData()
  const [searchQuery, setSearchQuery] = useState("")
  const filteredProducts = searchProducts(searchQuery)

  const handleAddProduct = () => {
    router.push("/admin/create?tab=product")
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id)
      } catch (error) {
        console.error("Failed to delete product:", error)
      }
    }
  }

  return (
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Products</h1>
          <Button onClick={handleAddProduct}>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Product Inventory</CardTitle>
                <CardDescription>Manage your product catalog</CardDescription>
              </div>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search products..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredProducts.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">No products found</p>
                </div>
            ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Featured</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div className="h-16 w-16 rounded-md overflow-hidden">
                              <img
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                  className="h-full w-full object-cover"
                              />
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>${product.price.toFixed(2)}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>
                      <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              product.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                      >
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                          </TableCell>
                          <TableCell>
                      <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              product.featured ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                          }`}
                      >
                        {product.featured ? "Featured" : "Not Featured"}
                      </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Link href={`/admin/products/${product.id}`}>
                                <Button variant="outline" size="sm">
                                  Edit
                                </Button>
                              </Link>
                              <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id)}>
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
            )}
          </CardContent>
        </Card>
      </div>
  )
}

export default function ProductsPage() {
  return (
      <DataProvider>
        <ProductsContent />
      </DataProvider>
  )
}
