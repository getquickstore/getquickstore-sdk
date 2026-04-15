export type ProductImageUpdateRequest = {
    url?: string;
    alt?: string | null;
    isPrimary?: boolean;
    position?: number;
    variantId?: string | null;
};
