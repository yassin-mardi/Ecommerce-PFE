import type { Metadata } from "next"
import ContactPageClient from "./ContactPageClient"

export const metadata: Metadata = {
    title: "Contact Us | ShopNow",
    description: "Get in touch with our team for any questions or support.",
}

export default function ContactPage() {
    return <ContactPageClient />
}
