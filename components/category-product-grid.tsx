"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"

interface Product {
    id: string
    name: string
    description: string
    price: number
    compareAtPrice?: number
    image: string
    category: string
    featured: boolean
    isNew: boolean
    inStock: boolean
}

interface CategoryProductGridProps {
    products: Product[]
}

export default function CategoryProductGrid({ products }: CategoryProductGridProps) {
    const { addToCart } = useCart()
    const [loading, setLoading] = useState<string | null>(null)

    const handleAddToCart = (productId: string) => {
        setLoading(productId)

        // Find the product
        const product = products.find((p) => p.id === productId)

        if (product) {
            // Add to cart with quantity 1
            addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1,
            })

            // Simulate loading
            setTimeout(() => {
                setLoading(null)
            }, 500)
        }
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your filters or browse all products.</p>
                <Button asChild className="hover:bg-primary/80 transition-colors">
                    <Link href="/products">View All Products</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
                <Card key={product.id} className="overflow-hidden flex flex-col h-full group">
                    <Link href={`/products/${product.id}`}>
                        <div className="aspect-square overflow-hidden relative">
                            <img
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                className="h-full w-full object-cover transition-transform group-hover:scale-105"
                            />
                            {!product.inStock && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                    <Badge variant="destructive" className="text-sm px-3 py-1 flex items-center gap-1">
                                        <AlertCircle className="h-3.5 w-3.5" />
                                        Out of Stock
                                    </Badge>
                                </div>
                            )}
                            {product.isNew && <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600">New</Badge>}
                        </div>
                    </Link>
                    <CardContent className="p-4 flex-grow">
                        <Link href={`/products/${product.id}`} className="hover:underline transition-all">
                            <h3 className="text-lg font-semibold">{product.name}</h3>
                        </Link>
                        <div className="mt-2 flex items-center justify-between">
                            <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                            {product.compareAtPrice && (
                                <span className="text-sm text-muted-foreground line-through">${product.compareAtPrice.toFixed(2)}</span>
                            )}
                        </div>
                        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-center">
                        <Button
                            className="w-full hover:bg-primary/80 transition-colors"
                            onClick={() => handleAddToCart(product.id)}
                            disabled={loading === product.id || !product.inStock}
                        >
                            {loading === product.id ? (
                                "Adding..."
                            ) : !product.inStock ? (
                                "Out of Stock"
                            ) : (
                                <>
                                    <ShoppingCart className="mr-2 h-4 w-4" />
                                    Add to Cart
                                </>
                            )}
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
