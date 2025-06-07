import { prisma } from "@/src/lib/prisma";

export const dynamic = 'force-dynamic'

export async function GET() {
  const latestOrders = await prisma.order.findMany({
    take: 4,
    where: {
      orderReadyAt: {
        not: null
      }
    },
    orderBy: {
      orderReadyAt: 'desc'
    }
  })

  const latestOrderIds = latestOrders.map(order => order.id);

  await prisma.orderProducts.deleteMany({
    where: {
      orderId: {
        notIn: latestOrderIds
      }
    }
  });

  await prisma.order.deleteMany({
    where: {
      id: {
        notIn: latestOrderIds
      }
    }
  });

  const orders = await prisma.order.findMany({
    where: {
      id: {
        in: latestOrderIds
      }
    },
    orderBy: {
      orderReadyAt: 'desc'
    },
    include: {
      orderProducts: {
        include: {
          product: true
        }
      }
    }
  });

  return Response.json(orders);
}
