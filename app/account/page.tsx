"use client"
import { useRouter } from "next/navigation"
import { CreditCard, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/components/auth-provider"

export default function AccountPage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (!user) {
    return null // Protected by layout
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Account</h1>
          <p className="text-muted-foreground">Manage your account settings and view orders</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </div>

      <Separator className="my-6" />

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="payment">Payment Methods</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>View and update your profile details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Full Name</h3>
                  <p className="text-base">{user.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                  <p className="text-base">{user.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Account Type</h3>
                  <p className="text-base capitalize">{user.role}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Member Since</h3>
                  <p className="text-base">{new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Edit Profile</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Update your password</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                For security reasons, you can change your password at any time. We recommend using a strong, unique
                password.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Change Password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>View your recent orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-medium">Order #1234</p>
                      <p className="text-sm text-muted-foreground">Placed on May 15, 2023</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Delivered
                      </span>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                      <img src="/placeholder.svg" alt="Product" className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="font-medium">Premium Wireless Headphones</p>
                      <p className="text-sm text-muted-foreground">Qty: 1</p>
                    </div>
                    <div className="ml-auto font-medium">$199.99</div>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-medium">Order #1189</p>
                      <p className="text-sm text-muted-foreground">Placed on April 22, 2023</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Delivered
                      </span>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                      <img src="/placeholder.svg" alt="Product" className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="font-medium">Smart Fitness Tracker</p>
                      <p className="text-sm text-muted-foreground">Qty: 1</p>
                    </div>
                    <div className="ml-auto font-medium">$99.99</div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">View All Orders</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="addresses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Addresses</CardTitle>
              <CardDescription>Manage your shipping addresses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">Home</p>
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                          Default
                        </span>
                      </div>
                      <p className="mt-1">John Doe</p>
                      <p className="text-sm text-muted-foreground">123 Main Street</p>
                      <p className="text-sm text-muted-foreground">Apt 4B</p>
                      <p className="text-sm text-muted-foreground">New York, NY 10001</p>
                      <p className="text-sm text-muted-foreground">United States</p>
                      <p className="text-sm text-muted-foreground">Phone: (555) 123-4567</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Add New Address</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment methods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                      <CreditCard className="h-8 w-8 text-primary" />
                      <div>
                        <p className="font-medium">Visa ending in 4242</p>
                        <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Add Payment Method</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
