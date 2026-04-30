export type MarketplaceService = {
    id: string;
    title: string;
    description?: string | null;
    duration?: number | null;
    durationMin?: number | null;
    price: number;
    priceCents: number;
    currency?: string | null;
    storeId: string;
    storeName?: string | null;
    storeSlug?: string | null;
    image?: string | null;
    isActive: boolean;
    ratingAvg: number;
    reviewCount: number;
};
