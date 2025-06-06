export const dynamic = "force-dynamic";

import AddProductForm from "@/components/products/AddProductForm";
import ProductForm from "@/components/products/ProductForm";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import { Category } from "@prisma/client";

export default async function CreateProductPage() {
    let categories : Category[] = [];

    try {
        categories = await prisma.category.findMany();
    } catch (error) {
        console.error("Error fetching categories:", error);
    }

    return (
        <>
            <Heading>Nuevo Producto</Heading>
            <AddProductForm>
                <ProductForm categories={categories} />
            </AddProductForm>
        </>
    )
}

