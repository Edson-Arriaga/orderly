// /app/api/test/route.ts
import { prisma } from "@/src/lib/prisma"

export async function GET() {
  const result = await prisma.order.findMany()
  return Response.json(result)
}