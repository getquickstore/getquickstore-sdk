export type CartAddRequest = {
    productId: string;
    variantId?: string | null;
    qty?: number;
    meta?: Record<string, any> | null;
};
