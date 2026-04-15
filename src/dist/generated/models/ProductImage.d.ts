export type ProductImage = {
    id: string;
    key: string | null;
    url: string;
    alt?: string | null;
    isPrimary: boolean;
    position: number;
    productId: string;
    variantId?: string | null;
    createdAt: string;
};
