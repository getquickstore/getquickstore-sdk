export type MarketplaceService = {
    id?: string;
    title?: string;
    description?: string | null;
    duration?: number | null;
    durationMin?: number | null;
    price?: number | null;
    priceCents?: number | null;
    storeId?: string;
    storeName?: string | null;
    storeSlug?: string | null;
    image?: string | null;
    isActive?: boolean;
};
