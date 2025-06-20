"use client"

import { useStore } from "@/src/store"
import ProductDetails from "./ProductDetails"
import { useMemo } from "react"
import { formatCurrency } from "@/src/utils"
import { createOrder } from "@/actions/create-order-action"
import { OrderSchema } from "@/src/schema"
import { toast } from "react-toastify"
import { useTransition } from "react"

export default function OrderSummary() {
    
    const order = useStore(state => state.order)
    const clearOrder = useStore(state => state.clearOrder)
    const total = useMemo(() => order.reduce((total, curr) => total + curr.subtotal, 0), [order])
    const [isPending, startTransition] = useTransition()
    
    const handleCreateOrder = async (formData: FormData) => {
        const data = {
            name: formData.get('name'),
            total,
            order
        }

        const result = OrderSchema.safeParse(data)
        console.log(result)
        
        //Validation on client
        if(!result.success){
            result.error.issues.forEach(issue => {
                toast.error(issue.message)
            })
            
            return
        }
        
        //Validation on server
        const response = await createOrder(data)
        if(response?.errors){
            response.errors.forEach(issue => {
                toast.error(issue.message)
            })
        }

        toast.success('Pedido Realizado Correctamente')
        clearOrder()
    }

    return (
        <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
            <h1 className="text-4xl text-center font-black">Mi Pedido</h1>

            {order.length === 0 ? <p className="text-center my-10">El pedido está vacío.</p> : (
                <div className="mt-5">
                    {order.map(item => (
                        <ProductDetails
                            key={item.id}
                            item={item}
                        />
                    ))}
                    <p className="text-2xl mt-20 text-center">Total a pagar: {''}
                        <span className="font-bold">{formatCurrency(total)}</span>
                    </p>
                    
                    <form
                        className="w-full mt-10 space-y-5"
                        action={(formData) => {
                            startTransition(() => {
                                handleCreateOrder(formData)
                            })
                        }}
                    >
                        <input 
                            type="text" 
                            placeholder="Tu nombre"
                            className="bg-white border border-gray-100 p-2 w-full"
                            name="name"
                        />

                        <input
                            type="submit"
                            disabled={isPending}
                            className="py-2 rounded uppercase text-white bg-black w-full text-center cursor-pointer font-bold disabled:opacity-50"
                            value={isPending ? "Procesando..." : "Confirmar Pedido"}
                        />
                    </form>

                </div>
            )}
        </aside>
    )
}
