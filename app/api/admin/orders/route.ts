import { prisma } from "@/src/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const orders = await prisma.order.findMany({
    where: { status: false },
    include: {  
      orderProducts: {
        include: { product: true }
      }
    }
  })

  return NextResponse.json(orders, {
    headers: {
      'Cache-Control': 'no-store'
    }
  })
}
