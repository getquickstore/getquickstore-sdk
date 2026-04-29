export type MarketplaceProduct = {
    id?: string;
    title?: string;
    description?: string | null;
    shortDescription?: string | null;
    price?: number | null;
    priceCents?: number | null;
    storeId?: string;
    storeName?: string | null;
    storeSlug?: string | null;
    image?: string | null;
    status?: string | null;
};
