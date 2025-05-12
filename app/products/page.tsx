"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import ProductGrid from "@/components/product-grid"
import { categories } from "@/data/categories"
import { products as allProducts } from "@/data/products"

export default function ProductsPage() {
  // Filter state
  const [minPrice, setMinPrice] = useState<string>("")
  const [maxPrice, setMaxPrice] = useState<string>("")
  const [inStockOnly, setInStockOnly] = useState<boolean>(false)
  const [outOfStockOnly, setOutOfStockOnly] = useState<boolean>(false)
  const [sortOption, setSortOption] = useState<string>("featured")

  // Filtered products
  const [filteredProducts, setFilteredProducts] = useState(allProducts)

  // Apply filters
  useEffect(() => {
    let result = [...allProducts]

    // Apply price filter
    if (minPrice !== "") {
      result = result.filter((product) => product.price >= Number.parseFloat(minPrice))
    }

    if (maxPrice !== "") {
      result = result.filter((product) => product.price <= Number.parseFloat(maxPrice))
    }

    // Apply availability filter
    if (inStockOnly && !outOfStockOnly) {
      result = result.filter((product) => product.inStock)
    } else if (!inStockOnly && outOfStockOnly) {
      result = result.filter((product) => !product.inStock)
    }

    // Apply sorting
    switch (sortOption) {
      case "newest":
        // For demo purposes, we'll just reverse the array since we don't have date fields
        result = [...result].reverse()
        break
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price)
        break
      case "featured":
      default:
        // For featured, we prioritize featured products first
        result = [...result].sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1))
        break
    }

    setFilteredProducts(result)
  }, [minPrice, maxPrice, inStockOnly, outOfStockOnly, sortOption])

  // Reset filters
  const handleReset = () => {
    setMinPrice("")
    setMaxPrice("")
    setInStockOnly(false)
    setOutOfStockOnly(false)
    setSortOption("featured")
  }

  return (
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Products</h1>
            <p className="text-muted-foreground">Browse our collection of products</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="md:hidden">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
          <div className="hidden md:block">
            <div className="sticky top-20 space-y-6">
              <div>
                <h3 className="mb-4 text-lg font-semibold">Categories</h3>
                <div className="space-y-2">
                  <Link href="/products" className="block text-muted-foreground hover:text-foreground">
                    All Products
                  </Link>
                  {categories.map((category) => (
                      <Link
                          key={category.id}
                          href={`/categories/${category.slug}`}
                          className="block text-muted-foreground hover:text-foreground"
                      >
                        {category.name}
                      </Link>
                  ))}
                </div>
              </div>
              <Separator />
              <div>
                <h3 className="mb-4 flex items-center justify-between text-lg font-semibold">
                  Filters
                  <Button variant="ghost" size="sm" onClick={handleReset}>
                    Reset
                  </Button>
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 text-sm font-medium">Price Range</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="grid gap-1">
                        <label htmlFor="min-price" className="text-xs text-muted-foreground">
                          Min
                        </label>
                        <input
                            id="min-price"
                            type="number"
                            placeholder="0"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            className="w-full h-8 rounded-md border border-input bg-background px-2 text-sm"
                        />
                      </div>
                      <div className="grid gap-1">
                        <label htmlFor="max-price" className="text-xs text-muted-foreground">
                          Max
                        </label>
                        <input
                            id="max-price"
                            type="number"
                            placeholder="999"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="w-full h-8 rounded-md border border-input bg-background px-2 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-2 text-sm font-medium">Availability</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300"
                            checked={inStockOnly}
                            onChange={(e) => setInStockOnly(e.target.checked)}
                        />
                        In Stock
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300"
                            checked={outOfStockOnly}
                            onChange={(e) => setOutOfStockOnly(e.target.checked)}
                        />
                        Out of Stock
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
  )
}

function ProductGridSkeleton() {
  return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array(8)
            .fill(null)
            .map((_, index) => (
                <div key={index} className="space-y-4">
                  <Skeleton className="aspect-square w-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
            ))}
      </div>
  )
}
