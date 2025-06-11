import { prisma } from "@/src/lib/prisma"

export async function GET(){
    const orders = await prisma.order.findMany({
        where: {
            status: false
        },
        include: {  
            orderProducts: {
                include: {
                    product: true
                }
            }
        }
    })
    console.log('INICIANDO')
    console.log(orders)
    return Response.json(orders)
}