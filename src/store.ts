import { create } from "zustand";
import { OrderItem } from "./types";
import { Product } from "@prisma/client";

interface Store {
    order: OrderItem[];
    addToOrder: (item: Product) => void;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
    removeOrder: (id: number) => void;
}

export const useStore = create<Store>((set, get) => ({
    order: [],
    addToOrder: (item) => {
        let order: OrderItem[] = [];

        if(get().order.find((orderItem) => orderItem.id === item.id)){
            order = get().order.map((orderItem) => {
                if(orderItem.id === item.id){
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity + 1,
                        subtotal: orderItem.subtotal + item.price
                    }
                }else{
                    return orderItem;
                }
            })
        }else{
            order = [...get().order, { ...item, quantity: 1, subtotal: item.price}]
        }

        set(() => ({
            order
        }))
    },
    increaseQuantity: (id) => {
        const order = get().order.map((orderItem) => {
            if(orderItem.id === id){
                return {
                    ...orderItem,
                    quantity: orderItem.quantity + 1,
                    subtotal: orderItem.subtotal + orderItem.price
                }
            }else{
                return orderItem;
            }
        })

        set(() => ({
            order
        }))
    },
    decreaseQuantity: (id) => {
        const order = get().order.map((orderItem) => {
            if(orderItem.id === id){
                return {
                    ...orderItem,
                    quantity: orderItem.quantity - 1,
                    subtotal: orderItem.subtotal - orderItem.price
                }
            }else{
                return orderItem;
            }
        }).filter((orderItem) => orderItem.quantity > 0)

        set(() => ({
            order
        }))
    },
    removeOrder: (id) => {
        const order = get().order.filter((orderItem) => orderItem.id !== id);

        set(() => ({
            order
        }))
    }
}));