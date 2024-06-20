"use client"
import { useStore } from "@/src/store"
import ProductDetail from "../products/ProductDetails";
import { useMemo } from "react";
import { formatPrice } from "@/src/utils";
import { createOrder } from "@/actions/create-order-action";
import { OrderSchema } from "@/src/schema";

export default function OrderSummary() {
    const order = useStore(state => state.order);
    const total = useMemo(() => order.reduce((acc, item) => acc + item.subtotal, 0), [order]);

    const handleCreateOrder = (formData: FormData) => {
      const data = {
        name: formData.get("name"),
        
      }

      const result = OrderSchema.safeParse(data);
      console.log(result);

      return
      createOrder();
    }

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

            <form 
              className="w-full mt-10 space-y-5"
              action={handleCreateOrder}
            >
              <input
                type="text"
                placeholder="Nombre"
                className="w-full p-2 border border-gray-300 rounded-md"
                name="name"
              />

              <input
                type="submit"
                placeholder="Nombre"
                className="w-full p-2 border border-gray-300 rounded-md font-bold cursor-pointer bg-gray-800 text-white"
                value={"CONFIRMAR PEDIDO"}
              />
            </form>
          </div>
        )  
        }
      </aside>
    )
}
