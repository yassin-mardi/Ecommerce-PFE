"use client"

import { useState } from "react"
import Link from "next/link"
import { Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { categories } from "@/data/categories"
import { products } from "@/data/products"
import CategoryProductGrid from "@/components/category-product-grid"

export default function CategoryPage({ params }: { params: { slug: string } }) {
    const category = categories.find((c) => c.slug === params.slug)

    // Filter states
    const [minPrice, setMinPrice] = useState<string>("")
    const [maxPrice, setMaxPrice] = useState<string>("")
    const [inStockOnly, setInStockOnly] = useState<boolean>(false)
    const [outOfStockOnly, setOutOfStockOnly] = useState<boolean>(false)
    const [sortOption, setSortOption] = useState<string>("featured")

    // Reset filters
    const resetFilters = () => {
        setMinPrice("")
        setMaxPrice("")
        setInStockOnly(false)
        setOutOfStockOnly(false)
        setSortOption("featured")
    }

    if (!category) {
        return (
            <div className="container px-6 py-8 md:px-10 md:py-12">
                <h1 className="text-3xl font-bold tracking-tight">Category Not Found</h1>
                <p className="text-muted-foreground">The category you're looking for doesn't exist.</p>
                <Button className="mt-4 hover:bg-primary/80 transition-colors" asChild>
                    <Link href="/categories">Back to Categories</Link>
                </Button>
            </div>
        )
    }

    // Filter products by category
    const categoryProducts = products.filter((product) => product.category.toLowerCase() === category.name.toLowerCase())

    // Apply price range filter
    let filteredProducts = categoryProducts
    if (minPrice !== "") {
        filteredProducts = filteredProducts.filter((product) => product.price >= Number.parseFloat(minPrice))
    }
    if (maxPrice !== "") {
        filteredProducts = filteredProducts.filter((product) => product.price <= Number.parseFloat(maxPrice))
    }

    // Apply availability filter
    if (inStockOnly && !outOfStockOnly) {
        filteredProducts = filteredProducts.filter((product) => product.inStock)
    } else if (!inStockOnly && outOfStockOnly) {
        filteredProducts = filteredProducts.filter((product) => !product.inStock)
    }

    // Apply sorting
    switch (sortOption) {
        case "price-asc":
            filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price)
            break
        case "price-desc":
            filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price)
            break
        case "newest":
            filteredProducts = [...filteredProducts].sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1))
            break
        case "featured":
        default:
            filteredProducts = [...filteredProducts].sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1))
            break
    }

    return (
        <div className="container px-6 py-8 md:px-10 md:py-12">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{category.name}</h1>
                    <p className="text-muted-foreground">Browse our collection of {category.name.toLowerCase()} products</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="md:hidden hover:bg-accent transition-colors">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                    </Button>
                    <Select value={sortOption} onValueChange={setSortOption}>
                        <SelectTrigger className="w-full md:w-[180px] hover:border-primary transition-colors">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="featured" className="hover:bg-accent transition-colors cursor-pointer">
                                Featured
                            </SelectItem>
                            <SelectItem value="newest" className="hover:bg-accent transition-colors cursor-pointer">
                                Newest
                            </SelectItem>
                            <SelectItem value="price-asc" className="hover:bg-accent transition-colors cursor-pointer">
                                Price: Low to High
                            </SelectItem>
                            <SelectItem value="price-desc" className="hover:bg-accent transition-colors cursor-pointer">
                                Price: High to Low
                            </SelectItem>
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
                                <Link href="/products" className="block text-muted-foreground hover:text-foreground transition-colors">
                                    All Products
                                </Link>
                                {categories.map((c) => (
                                    <Link
                                        key={c.id}
                                        href={`/categories/${c.slug}`}
                                        className={`block hover:text-foreground transition-colors ${
                                            c.slug === params.slug ? "text-foreground font-medium" : "text-muted-foreground"
                                        }`}
                                    >
                                        {c.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <Separator />
                        <div>
                            <h3 className="mb-4 flex items-center justify-between text-lg font-semibold">
                                Filters
                                <Button variant="ghost" size="sm" onClick={resetFilters} className="hover:bg-accent transition-colors">
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
                                                className="h-8 rounded-md border border-input bg-background px-2 text-sm hover:border-primary focus:border-primary transition-colors"
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
                                                className="h-8 rounded-md border border-input bg-background px-2 text-sm hover:border-primary focus:border-primary transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="mb-2 text-sm font-medium">Availability</h4>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-foreground transition-colors">
                                            <input
                                                type="checkbox"
                                                checked={inStockOnly}
                                                onChange={(e) => setInStockOnly(e.target.checked)}
                                                className="h-4 w-4 rounded border-gray-300 cursor-pointer"
                                            />
                                            In Stock
                                        </label>
                                        <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-foreground transition-colors">
                                            <input
                                                type="checkbox"
                                                checked={outOfStockOnly}
                                                onChange={(e) => setOutOfStockOnly(e.target.checked)}
                                                className="h-4 w-4 rounded border-gray-300 cursor-pointer"
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
                    <CategoryProductGrid products={filteredProducts} />
                </div>
            </div>
        </div>
    )
}

function ProductGridSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array(6)
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
