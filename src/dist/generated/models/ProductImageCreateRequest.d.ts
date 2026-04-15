export type ProductImageCreateRequest = {
    key: string;
    url: string;
    alt?: string | null;
    isPrimary?: boolean;
    position?: number;
    variantId?: string | null;
};
