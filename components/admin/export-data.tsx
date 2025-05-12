"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useData } from "@/components/admin/data-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ExportData() {
    const { products, categories, customers } = useData()
    const [activeTab, setActiveTab] = useState("categories")

    const formatDataForExport = (data: any[], type: string) => {
        // Format the data as a TypeScript export statement
        const variableName = type.toLowerCase()
        const dataString = JSON.stringify(data, null, 2)

        return `export const ${variableName} = ${dataString}\n`
    }

    const handleExport = (type: "products" | "categories" | "customers") => {
        let data
        let filename

        switch (type) {
            case "products":
                data = formatDataForExport(products, "products")
                filename = "products.ts"
                break
            case "categories":
                data = formatDataForExport(categories, "categories")
                filename = "categories.ts"
                break
            case "customers":
                data = formatDataForExport(customers, "customers")
                filename = "customers.ts"
                break
        }

        // Create a blob with the data
        const blob = new Blob([data], { type: "text/plain" })
        const url = URL.createObjectURL(blob)

        // Create a link and trigger download
        const a = document.createElement("a")
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()

        // Clean up
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Export Data</CardTitle>
                <CardDescription>Export your data to update source files</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="categories" onValueChange={setActiveTab}>
                    <TabsList className="grid grid-cols-3 mb-4">
                        <TabsTrigger value="categories">Categories</TabsTrigger>
                        <TabsTrigger value="products">Products</TabsTrigger>
                        <TabsTrigger value="customers">Customers</TabsTrigger>
                    </TabsList>

                    <TabsContent value="categories">
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Export your current categories data to update the source file. After downloading, replace the content of{" "}
                                <code>data/categories.ts</code> with this file.
                            </p>
                            <Button onClick={() => handleExport("categories")} className="w-full">
                                <Download className="mr-2 h-4 w-4" />
                                Export Categories Data
                            </Button>
                        </div>
                    </TabsContent>

                    <TabsContent value="products">
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Export your current products data to update the source file. After downloading, replace the content of{" "}
                                <code>data/products.ts</code> with this file.
                            </p>
                            <Button onClick={() => handleExport("products")} className="w-full">
                                <Download className="mr-2 h-4 w-4" />
                                Export Products Data
                            </Button>
                        </div>
                    </TabsContent>

                    <TabsContent value="customers">
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Export your current customers data to update the source file. After downloading, replace the content of{" "}
                                <code>data/customers.ts</code> (if it exists).
                            </p>
                            <Button onClick={() => handleExport("customers")} className="w-full">
                                <Download className="mr-2 h-4 w-4" />
                                Export Customers Data
                            </Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}
