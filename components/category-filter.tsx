import Link from "next/link"
import { categories } from "@/data/categories"

export default function CategoryFilter() {
  return (
    <>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.slug}`}
          className="group relative overflow-hidden rounded-lg"
        >
          <div className="aspect-square overflow-hidden">
            <img
              src={category.image || "/placeholder.svg"}
              alt={category.name}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity group-hover:bg-black/50">
            <h3 className="text-xl font-bold text-white">{category.name}</h3>
          </div>
        </Link>
      ))}
    </>
  )
}
