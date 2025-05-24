"use client"

import { useState } from "react"
import Link from "next/link"
import { BarChart3, DollarSign, Package, Plus, ShoppingCart, Tag, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataProvider, useData } from "@/components/admin/data-provider"
import { QuickCreateForms } from "@/components/admin/quick-create-forms"

function AdminDashboardContent() {
  const [activeTab, setActiveTab] = useState("overview")
  const { products, categories, customers } = useData()

  // Mock recent orders
  const recentOrders = [
    {
      id: "ORD-001",
      customer: "John Doe",
      date: "2023-05-01",
      status: "Delivered",
      total: 125.99,
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      date: "2023-05-02",
      status: "Processing",
      total: 89.99,
    },
    {
      id: "ORD-003",
      customer: "Bob Johnson",
      date: "2023-05-03",
      status: "Shipped",
      total: 199.99,
    },
    {
      id: "ORD-004",
      customer: "Alice Brown",
      date: "2023-05-04",
      status: "Pending",
      total: 149.99,
    },
    {
      id: "ORD-005",
      customer: "Charlie Wilson",
      date: "2023-05-05",
      status: "Delivered",
      total: 79.99,
    },
  ]

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Link href="/admin/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create New
            </Button>
          </Link>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="create">Create New</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$15,231.89</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">+12.4% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Products</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{products.length}</div>
                <p className="text-xs text-muted-foreground">+7 added this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Customers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{customers.length}</div>
                <p className="text-xs text-muted-foreground">+18.1% from last month</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Create Product</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-xs text-muted-foreground mb-4">Add a new product to your inventory</p>
                <Link href="/admin/create?tab=product">
                  <Button className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    New Product
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Create Category</CardTitle>
                <Tag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-xs text-muted-foreground mb-4">Add a new category to organize products</p>
                <Link href="/admin/create?tab=category">
                  <Button className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    New Category
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Create Customer</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-xs text-muted-foreground mb-4">Add a new customer to your database</p>
                <Link href="/admin/create?tab=customer">
                  <Button className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    New Customer
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] w-full">
                  <div className="flex h-full items-center justify-center">
                    <BarChart3 className="h-16 w-16 text-muted-foreground/50" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>{recentOrders.length} orders placed recently</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {recentOrders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{order.customer}</p>
                        <p className="text-sm text-muted-foreground">{order.date}</p>
                      </div>
                      <div className="ml-auto font-medium">${order.total.toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Products</CardTitle>
                <CardDescription>Manage your product inventory</CardDescription>
              </div>
              <Link href="/admin/products/new">
                <Button>Add Product</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.slice(0, 5).map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="h-10 w-10 rounded-md object-cover"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            product.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Link href={`/admin/products/${product.id}`}>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 flex justify-end">
                <Link href="/admin/products">
                  <Button variant="outline">View All Products</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Categories</CardTitle>
                <CardDescription>Manage your product categories</CardDescription>
              </div>
              <Link href="/admin/categories/new">
                <Button>Add Category</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.slice(0, 5).map((category) => (
                    <TableRow key={category.id}>
                      <TableCell>
                        <img
                          src={category.image || "/placeholder.svg"}
                          alt={category.name}
                          className="h-10 w-10 rounded-md object-cover"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell>{category.slug}</TableCell>
                      <TableCell className="text-right">
                        <Link href={`/admin/categories/${category.id}`}>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 flex justify-end">
                <Link href="/admin/categories">
                  <Button variant="outline">View All Categories</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Orders</CardTitle>
              <CardDescription>View and manage customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Processing"
                                ? "bg-blue-100 text-blue-800"
                                : order.status === "Shipped"
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Customers</CardTitle>
                <CardDescription>Manage your customer database</CardDescription>
              </div>
              <Link href="/admin/customers/new">
                <Button>Add Customer</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>First Name</TableHead>
                    <TableHead>Last Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.slice(0, 5).map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.first_name}</TableCell>
                      <TableCell>{customer.last_name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell className="text-right">
                        <Link href={`/admin/customers/${customer.id}`}>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 flex justify-end">
                <Link href="/admin/customers">
                  <Button variant="outline">View All Customers</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="create" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <QuickCreateForms />
            <Card>
              <CardHeader>
                <CardTitle>Create Options</CardTitle>
                <CardDescription>Access full creation forms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <Link href="/admin/products/new">
                    <Button className="w-full">
                      <Package className="mr-2 h-4 w-4" />
                      Create Product
                    </Button>
                  </Link>
                  <Link href="/admin/categories/new">
                    <Button className="w-full" variant="outline">
                      Create Category
                    </Button>
                  </Link>
                  <Link href="/admin/customers/new">
                    <Button className="w-full" variant="outline">
                      Create Customer
                    </Button>
                  </Link>
                </div>
                <div className="pt-4">
                  <h3 className="mb-2 text-sm font-medium">Why use full forms?</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• More detailed information entry</li>
                    <li>• Advanced configuration options</li>
                    <li>• Better validation and error handling</li>
                    <li>• Support for file uploads and image selection</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function AdminDashboard() {
  return (
    <DataProvider>
      <AdminDashboardContent />
    </DataProvider>
  )
}
