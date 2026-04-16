export type ProductImage = {
    id: string;
    productId: string;
    variantId?: string | null;
    key: string;
    url: string;
    alt?: string | null;
    isPrimary: boolean;
    position: number;
    createdAt: string;
};
