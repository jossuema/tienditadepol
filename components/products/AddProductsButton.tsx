"use client"

import { Product } from "@prisma/client"
import { useStore } from "@/src/store"

type AddProductsButtonProps = {
    product: Product
}

export default function AddProductsButton({ product }: AddProductsButtonProps) {
    const addToOrder = useStore(state => state.addToOrder);

    return (
        <button
            className="bg-indigo-600 hover:bg-indigo-800 w-full mt-5 p-3 text-white cursor-pointer font-bold uppercase"
            type="button"
            onClick={() => addToOrder(product)}
        >Agregar</button>
    )
}