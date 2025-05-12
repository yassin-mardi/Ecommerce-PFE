"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useCart } from "@/components/cart-provider"
import { products as allProducts } from "@/data/products"

export interface Product {
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

interface ProductGridProps {
  products?: Product[]
}

export default function ProductGrid({ products = allProducts }: ProductGridProps) {
  const router = useRouter()
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
        <div className="flex flex-col items-center justify-center py-12">
          <h3 className="text-xl font-semibold">No products found</h3>
          <p className="mt-2 text-muted-foreground">Try adjusting your filters or search criteria.</p>
        </div>
    )
  }

  return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
            <Card key={product.id} className="overflow-hidden flex flex-col h-full">
              <Link href={`/products/${product.id}`}>
                <div className="aspect-square overflow-hidden">
                  <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
              </Link>
              <CardContent className="p-4 flex-grow">
                <Link href={`/products/${product.id}`}>
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                </Link>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                  {product.compareAtPrice && (
                      <span className="text-sm text-muted-foreground line-through">${product.compareAtPrice.toFixed(2)}</span>
                  )}
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
                {!product.inStock && (
                    <div className="mt-2">
                      <span className="text-sm font-medium text-red-500">Out of Stock</span>
                    </div>
                )}
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-center">
                <Button
                    className="w-full"
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
