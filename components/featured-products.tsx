"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"
import { products } from "@/data/products"

export default function FeaturedProducts() {
  const { addToCart } = useCart()

  // Get featured products (first 4)
  const featuredProducts = products.filter((product) => product.featured).slice(0, 4)

  const handleAddToCart = (productId: string) => {
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
    }
  }

  return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {featuredProducts.map((product) => (
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
                <div className="flex justify-between items-center">
                  <Link href={`/products/${product.id}`}>
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                  </Link>
                  {product.isNew && <Badge>New</Badge>}
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                  {product.compareAtPrice && (
                      <span className="text-sm text-muted-foreground line-through">${product.compareAtPrice.toFixed(2)}</span>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-center">
                <Button className="w-full" onClick={() => handleAddToCart(product.id)}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
        ))}
      </div>
  )
}
