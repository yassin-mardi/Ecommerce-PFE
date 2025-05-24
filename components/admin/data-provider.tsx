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

export interface Address {
  id: string
  street: string
  city: string
  postalCode: string
  country: string
}

export interface Customer {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  adresses: Address[]
}

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
  addCustomer: (customer: Omit<Customer, "id">) => Promise<Customer>
  updateCustomer: (id: string, customer: Partial<Customer>) => Promise<Customer>
  deleteCustomer: (id: string) => Promise<void>
  searchProducts: (query: string) => Product[]
  searchCategories: (query: string) => Category[]
  searchCustomers: (query: string) => Promise<Customer[]>
}

const DataContext = createContext<DataContextType | undefined>(undefined)

// Add API base URL from environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8881'

// Simple fetch configuration
const fetchConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
}

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch customers from API
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/customers`, fetchConfig)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch customers: ${response.statusText}`)
        }

        const data = await response.json()
        setCustomers(data)
      } catch (error) {
        console.error('Error fetching customers:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCustomers()
  }, [])

  // Load products and categories from localStorage
  useEffect(() => {
    const storedProducts = localStorage.getItem("admin_products")
    const storedCategories = localStorage.getItem("admin_categories")

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
  }, [])

  // Update localStorage for products and categories
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("admin_products", JSON.stringify(products))
    }
    if (categories.length > 0) {
      localStorage.setItem("admin_categories", JSON.stringify(categories))
    }
  }, [products, categories])

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

  // Customer CRUD operations with API integration
  const addCustomer = async (customer: Omit<Customer, "id">): Promise<Customer> => {
    const customerDTO = {
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone,
      adresses: customer.adresses.map(address => ({
        street: address.street,
        city: address.city,
        postalCode: address.postalCode,
        country: address.country
      }))
    }

    console.log('Sending customer data:', customerDTO);

    try {
      const response = await fetch(`${API_BASE_URL}/customers`, {
        ...fetchConfig,
        method: 'POST',
        body: JSON.stringify(customerDTO),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Server response:', errorData);
        throw new Error(`Failed to add customer: ${response.status} ${response.statusText}. ${errorData}`);
      }

      const newCustomer = await response.json();
      console.log('Received new customer:', newCustomer);
      setCustomers(prev => [...prev, newCustomer]);
      return newCustomer;
    } catch (error) {
      console.error('Error in addCustomer:', error);
      throw error;
    }
  }

  const updateCustomer = async (id: string, customer: Partial<Customer>): Promise<Customer> => {
    const response = await fetch(`${API_BASE_URL}/customers`, {
      ...fetchConfig,
      method: 'PUT',
      body: JSON.stringify({ ...customer, id }),
    })

    if (!response.ok) {
      throw new Error('Failed to update customer')
    }

    const updatedCustomer = await response.json()
    setCustomers(prev =>
      prev.map(c => c.id === id ? updatedCustomer : c)
    )
    return updatedCustomer
  }

  const deleteCustomer = async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
      ...fetchConfig,
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Failed to delete customer')
    }

    setCustomers(prev => prev.filter(c => c.id !== id))
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

  // Enhanced search function to use API
  const searchCustomers = async (query: string): Promise<Customer[]> => {
    if (!query) return customers

    try {
      const response = await fetch(`${API_BASE_URL}/${query}`, fetchConfig)

      if (!response.ok) {
        throw new Error('Failed to search customers')
      }

      return await response.json()
    } catch (error) {
      console.error('Error searching customers:', error)
      // Fallback to local search
      const lowerQuery = query.toLowerCase()
      return customers.filter(
        (customer) =>
          `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(lowerQuery) ||
          customer.email.toLowerCase().includes(lowerQuery) ||
          (customer.phone && customer.phone.includes(lowerQuery)) ||
          (customer.adresses && customer.adresses.some(address => address.city.toLowerCase().includes(lowerQuery)))
      )
    }
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
