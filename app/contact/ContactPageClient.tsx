"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ContactPageClient() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false)
            setSubmitSuccess(true)
            setFormData({
                name: "",
                email: "",
                subject: "",
                message: "",
            })

            // Reset success message after 5 seconds
            setTimeout(() => {
                setSubmitSuccess(false)
            }, 5000)
        }, 1500)
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Contact Us</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-6">Get In Touch</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-8">
                            Have questions about our products, orders, or need assistance? We're here to help! Fill out the form or
                            use the contact information below to reach our customer support team.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start">
                                <Mail className="w-5 h-5 mt-1 mr-3 text-primary" />
                                <div>
                                    <h3 className="font-medium">Email</h3>
                                    <p className="text-gray-700 dark:text-gray-300">support@shopnow.com</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <Phone className="w-5 h-5 mt-1 mr-3 text-primary" />
                                <div>
                                    <h3 className="font-medium">Phone</h3>
                                    <p className="text-gray-700 dark:text-gray-300">+0 (000) 000-0000</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Mon-Fri, 9am-6pm GMT</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <MapPin className="w-5 h-5 mt-1 mr-3 text-primary" />
                                <div>
                                    <h3 className="font-medium">Address</h3>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        123 E-Commerce Street
                                        <br />
                                        Suite 100
                                        <br />
                                        CasaBlanca, SM 20400
                                        <br />
                                        Morocco
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h3 className="text-xl font-semibold mb-4">Business Hours</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-700 dark:text-gray-300">Monday - Friday:</span>
                                    <span className="text-gray-700 dark:text-gray-300">9:00 AM - 6:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-700 dark:text-gray-300">Saturday:</span>
                                    <span className="text-gray-700 dark:text-gray-300">10:00 AM - 4:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-700 dark:text-gray-300">Sunday:</span>
                                    <span className="text-gray-700 dark:text-gray-300">Closed</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>

                        {submitSuccess ? (
                            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-4 mb-6">
                                <p className="text-green-800 dark:text-green-200">
                                    Thank you for your message! We'll get back to you as soon as possible.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium mb-1">
                                        Subject
                                    </label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700"
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="order">Order Inquiry</option>
                                        <option value="product">Product Information</option>
                                        <option value="return">Returns & Refunds</option>
                                        <option value="shipping">Shipping & Delivery</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700"
                                    ></textarea>
                                </div>

                                <Button type="submit" disabled={isSubmitting} className="w-full">
                                    {isSubmitting ? (
                                        <span className="flex items-center">
                      <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                      >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                                    ) : (
                                        <span className="flex items-center">
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </span>
                                    )}
                                </Button>
                            </form>
                        )}
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-16">
                    <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-medium mb-2">How can I track my order?</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                You can track your order by logging into your account and visiting the "Orders" section. Alternatively,
                                you can use the tracking number provided in your shipping confirmation email.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-medium mb-2">What is your return policy?</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                We offer a 30-day return policy for most items. Products must be in their original condition with all
                                tags and packaging intact. Please visit our Returns page for more details.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-medium mb-2">How long does shipping take?</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                Standard shipping typically takes 3-5 business days within the continental US. Expedited shipping
                                options are available at checkout for faster delivery.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-medium mb-2">Do you ship internationally?</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                Yes, we ship to most countries worldwide. International shipping times vary by location, typically
                                ranging from 7-21 business days. Additional customs fees may apply.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
