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

function CategoriesContent() {
  const router = useRouter()
  const { categories, deleteCategory, searchCategories } = useData()
  const [searchQuery, setSearchQuery] = useState("")
  const filteredCategories = searchCategories(searchQuery)

  const handleAddCategory = () => {
    router.push("/admin/categories/new")
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id)
      } catch (error) {
        console.error("Failed to delete category:", error)
      }
    }
  }

  return (
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Categories</h1>
          <Button onClick={handleAddCategory}>
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Category Management</CardTitle>
                <CardDescription>Manage your product categories</CardDescription>
              </div>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search categories..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredCategories.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">No categories found</p>
                </div>
            ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Slug</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCategories.map((category) => (
                        <TableRow key={category.id}>
                          <TableCell>
                            <div className="h-16 w-16 rounded-md overflow-hidden">
                              <img
                                  src={category.image || "/placeholder.svg"}
                                  alt={category.name}
                                  className="h-full w-full object-cover"
                              />
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{category.name}</TableCell>
                          <TableCell>{category.slug}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Link href={`/admin/categories/${category.id}`}>
                                <Button variant="outline" size="sm">
                                  Edit
                                </Button>
                              </Link>
                              <Button variant="destructive" size="sm" onClick={() => handleDelete(category.id)}>
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

export default function CategoriesPage() {
  return (
      <DataProvider>
        <CategoriesContent />
      </DataProvider>
  )
}
