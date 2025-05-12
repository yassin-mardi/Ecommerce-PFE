import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "About Us | ShopNow",
    description: "Learn more about ShopNow, our mission, and our team.",
}

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">About ShopNow</h1>

                <div className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Founded in 2023, ShopNow began with a simple mission: to create an online shopping experience that puts
                        customers first. What started as a small operation has grown into a trusted e-commerce platform serving
                        thousands of customers worldwide.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Our journey has been driven by a passion for quality products and exceptional customer service. We believe
                        that shopping online should be easy, enjoyable, and reliable. That's why we've built ShopNow with a focus on
                        user experience, product quality, and customer satisfaction.
                    </p>
                </div>

                <div className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        At ShopNow, our mission is to provide a seamless shopping experience with carefully curated products that
                        enhance our customers' lives. We strive to:
                    </p>
                    <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
                        <li>Offer high-quality products at fair prices</li>
                        <li>Provide exceptional customer service</li>
                        <li>Create a user-friendly shopping platform</li>
                        <li>Build lasting relationships with our customers</li>
                        <li>Support ethical and sustainable business practices</li>
                    </ul>
                </div>

                <div className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Behind ShopNow is a dedicated team of professionals passionate about e-commerce and customer satisfaction.
                        Our diverse team brings together expertise in product curation, web development, customer service, and
                        logistics to ensure that every aspect of your shopping experience is exceptional.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 mx-auto mb-4"></div>
                            <h3 className="text-xl font-semibold text-center">Jane Doe</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-center">Founder & CEO</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 mx-auto mb-4"></div>
                            <h3 className="text-xl font-semibold text-center">John Smith</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-center">Head of Product</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 mx-auto mb-4"></div>
                            <h3 className="text-xl font-semibold text-center">Emily Chen</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-center">Customer Experience</p>
                        </div>
                    </div>
                </div>

                <div className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-2">Quality</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                We carefully select each product in our inventory to ensure it meets our high standards for quality and
                                value.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-2">Transparency</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                We believe in honest communication with our customers about our products, pricing, and policies.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-2">Customer Focus</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                Our customers are at the heart of everything we do. We continuously strive to improve their shopping
                                experience.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                We embrace new technologies and ideas to enhance our platform and better serve our customers.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
