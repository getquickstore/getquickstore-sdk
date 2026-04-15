import type { CartProductMini } from './CartProductMini';
import type { CartVariantMini } from './CartVariantMini';
export type CartItem = {
    id: string;
    productId: string;
    variantId: string | null;
    qty: number;
    priceCents: number;
    sku: string | null;
    meta: Record<string, any> | null;
    lineTotalCents: number;
    product: CartProductMini;
    variant: CartVariantMini | null;
    createdAt: string;
    updatedAt: string;
};
