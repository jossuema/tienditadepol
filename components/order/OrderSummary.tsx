"use client"
import { useStore } from "@/src/store"
import ProductDetail from "../products/ProductDetails";
import { useMemo } from "react";
import { formatPrice } from "@/src/utils";

export default function OrderSummary() {
    const order = useStore(state => state.order);
    const total = useMemo(() => order.reduce((acc, item) => acc + item.subtotal, 0), [order]);

    return(
      <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5 bg-white">
        <h1 className="text-4xl text-center font-black">Mi pedido</h1>
        {order.length === 0 ? (
          <p className="text-center text-gray-500">No hay productos en tu pedido</p>
        ) : (
          <div className="mt-5">
            {order.map((item) => (
              <ProductDetail
                key={item.id}
                item={item}
              />
            ))}
            <div className="mt-5">
              <p className="text-xl font-black text-gray-700">
                Total: <span className="font-normal">{formatPrice(total)}</span>
              </p>
            </div>
          </div>
        )  
        }
      </aside>
    )
}
