import { formatPrice } from "@/src/utils"
import { Product } from "@prisma/client"
import Image from "next/image"
import AddProductsButton from "./AddProductsButton"

type ProductCardProps = {
    product: Product
}

export default function ProductCard({product}: ProductCardProps){
    return(
        <div className="bg-white p-4 shadow-lg rounded-lg border">
            <div className="h-48 w-full bg-gray-200 rounded-lg mb-4 relative" >
                <Image src={`/products/${product.image}.jpg`} alt={product.name} layout="fill" objectFit="cover" className="rounded-lg"/>
            </div>
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-semibold text-amber-500">{formatPrice(product.price)}</span>
            </div>
            <AddProductsButton product={product}/>
        </div>
    )
}