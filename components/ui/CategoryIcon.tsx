"use client"
import { Category } from "@prisma/client"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"

type CategoryIconProps = {
    category: Category
}

export default function CategoryIcon({category}: CategoryIconProps) {
    const params = useParams();

    return (
        <div
            className={`${category.slug === params.category ? 'bg-amber-400': ''} flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b`}
        >
            <div className="w-16 h-16  flex items-center justify-center relative">
                <Image src={`/icon_${category.slug}.svg`} fill alt={category.name} />
            </div>

            <Link
                className="text-lg font-semibold"
                href={`/order/${category.slug}`}
            >{category.name}</Link>
        </div>
    )
}