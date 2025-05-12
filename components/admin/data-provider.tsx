"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { products as initialProducts } from "@/data/products"
import { categories as initialCategories } from "@/data/categories"

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

export interface Category {
  id: string
  name: string
  slug: string
  image: string
}

export interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  country?: string
  totalOrders: number
  totalSpent: number
  createdAt: string
}

// Initial customers data
const initialCustomers: Customer[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "555-123-4567",
    address: "123 Main St",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "USA",
    totalOrders: 5,
    totalSpent: 599.95,
    createdAt: "2023-01-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "555-987-6543",
    address: "456 Oak Ave",
    city: "Los Angeles",
    state: "CA",
    zipCode: "90001",
    country: "USA",
    totalOrders: 3,
    totalSpent: 299.97,
    createdAt: "2023-02-20",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    phone: "555-456-7890",
    address: "789 Pine St",
    city: "Chicago",
    state: "IL",
    zipCode: "60007",
    country: "USA",
    totalOrders: 2,
    totalSpent: 199.98,
    createdAt: "2023-03-10",
  },
]

interface DataContextType {
  products: Product[]
  categories: Category[]
  customers: Customer[]
  addProduct: (product: Omit<Product, "id">) => Promise<Product>
  updateProduct: (id: string, product: Partial<Product>) => Promise<Product>
  deleteProduct: (id: string) => Promise<void>
  addCategory: (category: Omit<Category, "id">) => Promise<Category>
  updateCategory: (id: string, category: Partial<Category>) => Promise<Category>
  deleteCategory: (id: string) => Promise<void>
  addCustomer: (customer: Omit<Customer, "id" | "createdAt" | "totalOrders" | "totalSpent">) => Promise<Customer>
  updateCustomer: (id: string, customer: Partial<Customer>) => Promise<Customer>
  deleteCustomer: (id: string) => Promise<void>
  searchProducts: (query: string) => Product[]
  searchCategories: (query: string) => Category[]
  searchCustomers: (query: string) => Customer[]
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])

  // Load data from localStorage on client side
  useEffect(() => {
    const storedProducts = localStorage.getItem("admin_products")
    const storedCategories = localStorage.getItem("admin_categories")
    const storedCustomers = localStorage.getItem("admin_customers")

    if (storedProducts) {
      try {
        setProducts(JSON.parse(storedProducts))
      } catch (error) {
        console.error("Failed to parse products from localStorage:", error)
        setProducts(initialProducts)
      }
    } else {
      setProducts(initialProducts)
    }

    if (storedCategories) {
      try {
        setCategories(JSON.parse(storedCategories))
      } catch (error) {
        console.error("Failed to parse categories from localStorage:", error)
        setCategories(initialCategories)
      }
    } else {
      setCategories(initialCategories)
    }

    if (storedCustomers) {
      try {
        setCustomers(JSON.parse(storedCustomers))
      } catch (error) {
        console.error("Failed to parse customers from localStorage:", error)
        setCustomers(initialCustomers)
      }
    } else {
      setCustomers(initialCustomers)
    }
  }, [])

  // Update localStorage when data changes
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("admin_products", JSON.stringify(products))
    }
    if (categories.length > 0) {
      localStorage.setItem("admin_categories", JSON.stringify(categories))
    }
    if (customers.length > 0) {
      localStorage.setItem("admin_customers", JSON.stringify(customers))
    }
  }, [products, categories, customers])

  // Product CRUD operations
  const addProduct = async (product: Omit<Product, "id">): Promise<Product> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const newProduct = {
      ...product,
      id: Math.random().toString(36).substring(2, 9),
    }

    setProducts((prev) => [...prev, newProduct])
    return newProduct
  }

  const updateProduct = async (id: string, product: Partial<Product>): Promise<Product> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    let updatedProduct: Product | undefined

    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          updatedProduct = { ...p, ...product }
          return updatedProduct
        }
        return p
      }),
    )

    if (!updatedProduct) {
      throw new Error("Product not found")
    }

    return updatedProduct
  }

  const deleteProduct = async (id: string): Promise<void> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  // Category CRUD operations
  const addCategory = async (category: Omit<Category, "id">): Promise<Category> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const newCategory = {
      ...category,
      id: Math.random().toString(36).substring(2, 9),
    }

    setCategories((prev) => [...prev, newCategory])
    return newCategory
  }

  const updateCategory = async (id: string, category: Partial<Category>): Promise<Category> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    let updatedCategory: Category | undefined

    setCategories((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          updatedCategory = { ...c, ...category }
          return updatedCategory
        }
        return c
      }),
    )

    if (!updatedCategory) {
      throw new Error("Category not found")
    }

    return updatedCategory
  }

  const deleteCategory = async (id: string): Promise<void> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    setCategories((prev) => prev.filter((c) => c.id !== id))
  }

  // Customer CRUD operations
  const addCustomer = async (
    customer: Omit<Customer, "id" | "createdAt" | "totalOrders" | "totalSpent">,
  ): Promise<Customer> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const newCustomer: Customer = {
      ...customer,
      id: Math.random().toString(36).substring(2, 9),
      totalOrders: 0,
      totalSpent: 0,
      createdAt: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
    }

    setCustomers((prev) => [...prev, newCustomer])
    return newCustomer
  }

  const updateCustomer = async (id: string, customer: Partial<Customer>): Promise<Customer> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    let updatedCustomer: Customer | undefined

    setCustomers((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          updatedCustomer = { ...c, ...customer }
          return updatedCustomer
        }
        return c
      }),
    )

    if (!updatedCustomer) {
      throw new Error("Customer not found")
    }

    return updatedCustomer
  }

  const deleteCustomer = async (id: string): Promise<void> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    setCustomers((prev) => prev.filter((c) => c.id !== id))
  }

  // Search functions
  const searchProducts = (query: string): Product[] => {
    if (!query) return products

    const lowerQuery = query.toLowerCase()
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery),
    )
  }

  const searchCategories = (query: string): Category[] => {
    if (!query) return categories

    const lowerQuery = query.toLowerCase()
    return categories.filter(
      (category) =>
        category.name.toLowerCase().includes(lowerQuery) || category.slug.toLowerCase().includes(lowerQuery),
    )
  }

  const searchCustomers = (query: string): Customer[] => {
    if (!query) return customers

    const lowerQuery = query.toLowerCase()
    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(lowerQuery) ||
        customer.email.toLowerCase().includes(lowerQuery) ||
        (customer.phone && customer.phone.includes(lowerQuery)) ||
        (customer.address && customer.address.toLowerCase().includes(lowerQuery)) ||
        (customer.city && customer.city.toLowerCase().includes(lowerQuery)),
    )
  }

  return (
    <DataContext.Provider
      value={{
        products,
        categories,
        customers,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        searchProducts,
        searchCategories,
        searchCustomers,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}
