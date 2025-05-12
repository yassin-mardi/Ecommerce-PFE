"use client"

import { DataProvider } from "@/components/admin/data-provider"
import ExportData from "@/components/admin/export-data"

export default function SettingsPage() {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Settings</h1>

            <div className="grid gap-6">
                <DataProvider>
                    <ExportData />
                </DataProvider>

                {/* Additional settings sections can be added here */}
                <div className="text-sm text-muted-foreground mt-4">
                    <p>
                        Note: This is a client-side application that uses localStorage for data persistence. In a production
                        environment, you would typically use a database to store this information.
                    </p>
                </div>
            </div>
        </div>
    )
}
