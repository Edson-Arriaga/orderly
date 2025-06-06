import AddProductForm from "@/components/products/AddProductForm";
import ProductForm from "@/components/products/ProductForm";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

export default async function CreateProductPage() {
    const categories = await prisma.category.findMany();
    
    return (
        <>
            <Heading>Nuevo Producto</Heading>
            <AddProductForm>
                <ProductForm categories={categories} />
            </AddProductForm>
        </>
    )
}
