import Link from "next/link"
import { ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import CategoryFilter from "@/components/category-filter"
import FeaturedProducts from "@/components/featured-products"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Discover Quality Products
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Shop our curated collection of premium products. Fast shipping and exceptional customer service.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/products">
                  <Button size="lg" className="px-8">
                    Shop Now
                    <ShoppingBag className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/categories">
                  <Button size="lg" variant="outline" className="px-8">
                    Browse Categories
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[500px] aspect-square overflow-hidden rounded-xl">
                <img
                  src="/shopping.svg?height=600&width=600"
                  alt="Hero Image"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Products</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Discover our most popular items, hand-picked for quality and value.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <FeaturedProducts />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Shop by Category</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Browse our wide selection of products by category.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 py-12 md:grid-cols-3 lg:gap-12">
            <CategoryFilter />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Customers Say</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Don't just take our word for it. Here's what our customers have to say.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:gap-12">
            <div className="flex flex-col items-center gap-4 rounded-lg border p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <img
                  src="/placeholder.svg?height=100&width=100"
                  alt="Customer"
                  className="rounded-full h-12 w-12 object-cover"
                />
                <div>
                  <h3 className="text-lg font-bold">Sarah Johnson</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Loyal Customer</p>
                </div>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                "I've been shopping here for years and have always been impressed with the quality of products and
                customer service."
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 rounded-lg border p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <img
                  src="/placeholder.svg?height=100&width=100"
                  alt="Customer"
                  className="rounded-full h-12 w-12 object-cover"
                />
                <div>
                  <h3 className="text-lg font-bold">Michael Chen</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">New Customer</p>
                </div>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                "Fast shipping and excellent product quality. Will definitely be shopping here again!"
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
