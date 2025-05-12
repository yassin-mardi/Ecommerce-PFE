"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageUploadProps {
    initialImage?: string
    onImageChange: (imageData: string) => void
}

export default function ImageUpload({ initialImage, onImageChange }: ImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(initialImage || null)
    const [error, setError] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        setError(null)

        if (!file) return

        // Validate file type
        if (!file.type.startsWith("image/")) {
            setError("Please select an image file")
            return
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError("Image size should be less than 5MB")
            return
        }

        const reader = new FileReader()
        reader.onload = () => {
            const result = reader.result as string
            setPreview(result)
            onImageChange(result)
        }
        reader.readAsDataURL(file)
    }

    const handleButtonClick = () => {
        fileInputRef.current?.click()
    }

    const handleRemoveImage = () => {
        setPreview(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
        onImageChange("/placeholder.svg?height=400&width=400")
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col items-center">
                {preview ? (
                    <div className="relative">
                        <img
                            src={preview || "/placeholder.svg"}
                            alt="Product preview"
                            className="h-48 w-48 object-cover rounded-md border"
                        />
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                            onClick={handleRemoveImage}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                ) : (
                    <div
                        className="h-48 w-48 border-2 border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-primary/50"
                        onClick={handleButtonClick}
                    >
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Click to upload</p>
                    </div>
                )}
            </div>

            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

            {!preview && (
                <Button type="button" variant="outline" onClick={handleButtonClick} className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                </Button>
            )}

            {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
    )
}
