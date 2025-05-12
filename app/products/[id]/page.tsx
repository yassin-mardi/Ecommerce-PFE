"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ChevronRight, Minus, Plus, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/components/cart-provider"
import { products } from "@/data/products"

export default function ProductPage() {
  const params = useParams()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [loading, setLoading] = useState(false)

  // Find the product by ID
  const product = products.find((p) => p.id === params.id)

  if (!product) {
    return <div className="container py-12 text-center">Product not found</div>
  }

  const handleAddToCart = () => {
    setLoading(true)

    // Add to cart
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
    })

    // Simulate loading
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }

  // Mock additional images
  const productImages = [
    product.image,
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ]

  return (
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="mb-4 flex items-center text-sm">
          <Link href="/" className="text-muted-foreground hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="mx-1 h-4 w-4 text-muted-foreground" />
          <Link href="/products" className="text-muted-foreground hover:text-foreground">
            Products
          </Link>
          <ChevronRight className="mx-1 h-4 w-4 text-muted-foreground" />
          <span>{product.name}</span>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-lg">
              <img
                  src={productImages[activeImage] || "/placeholder.svg"}
                  alt={product.name}
                  className="h-full w-full object-cover"
              />
            </div>
            <div className="flex gap-2 overflow-auto pb-2">
              {productImages.map((image, index) => (
                  <button
                      key={index}
                      className={`relative overflow-hidden rounded-lg border ${
                          activeImage === index ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => setActiveImage(index)}
                  >
                    <img
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        className="h-20 w-20 object-cover"
                    />
                  </button>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <div className="mt-4 flex items-baseline gap-4">
                <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
                {product.compareAtPrice && (
                    <span className="text-lg text-muted-foreground line-through">${product.compareAtPrice.toFixed(2)}</span>
                )}
              </div>
            </div>
            <p className="text-muted-foreground">{product.description}</p>
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-medium">Quantity</h3>
                <div className="flex w-32 items-center">
                  <Button variant="outline" size="icon" onClick={decrementQuantity} disabled={quantity <= 1}>
                    <Minus className="h-4 w-4" />
                    <span className="sr-only">Decrease quantity</span>
                  </Button>
                  <div className="flex-1 text-center">{quantity}</div>
                  <Button variant="outline" size="icon" onClick={incrementQuantity}>
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Increase quantity</span>
                  </Button>
                </div>
              </div>
              <Button size="lg" className="w-full" onClick={handleAddToCart} disabled={loading}>
                {loading ? (
                    "Adding to Cart..."
                ) : (
                    <>
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </>
                )}
              </Button>
            </div>
            <Separator />
            <Tabs defaultValue="description">
              <TabsList className="w-full">
                <TabsTrigger value="description" className="flex-1">
                  Description
                </TabsTrigger>
                <TabsTrigger value="details" className="flex-1">
                  Details
                </TabsTrigger>
                <TabsTrigger value="shipping" className="flex-1">
                  Shipping
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="pt-4">
                <p>{product.description}</p>
                <p className="mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                  ex ea commodo consequat.
                </p>
              </TabsContent>
              <TabsContent value="details" className="pt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium">Material</div>
                    <div>Premium Quality</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium">Dimensions</div>
                    <div>10 x 5 x 3 inches</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium">Weight</div>
                    <div>1.5 lbs</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium">Warranty</div>
                    <div>1 Year Limited</div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="shipping" className="pt-4">
                <p>
                  We offer free standard shipping on all orders over $50. Orders typically ship within 1-2 business days.
                  Delivery times vary by location but typically take 3-5 business days.
                </p>
                <p className="mt-4">Express shipping options are available at checkout for an additional fee.</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
  )
}
