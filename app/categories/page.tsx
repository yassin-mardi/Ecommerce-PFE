import { Suspense } from "react"
import Link from "next/link"

import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { categories } from "@/data/categories"

export const metadata = {
    title: "Categories",
    description: "Browse our product categories",
}

export default function CategoriesPage() {
    return (
        <div className="container px-6 py-8 md:px-10 md:py-12">
            <div className="flex flex-col gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
                    <p className="text-muted-foreground">Browse our product categories</p>
                </div>
            </div>
            <Separator className="my-6" />

            <Suspense fallback={<CategoryGridSkeleton />}>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/categories/${category.slug}`}
                            className="group relative overflow-hidden rounded-lg"
                        >
                            <div className="aspect-square overflow-hidden">
                                <img
                                    src={category.image || "/placeholder.svg"}
                                    alt={category.name}
                                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity group-hover:bg-black/50">
                                <h3 className="text-xl font-bold text-white">{category.name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </Suspense>
        </div>
    )
}

function CategoryGridSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array(4)
                .fill(null)
                .map((_, index) => (
                    <div key={index} className="space-y-4">
                        <Skeleton className="aspect-square w-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-1/2 mx-auto" />
                        </div>
                    </div>
                ))}
        </div>
    )
}
