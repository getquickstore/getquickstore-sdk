import type { PublicStoreRef } from './PublicStoreRef';
export type FeaturedService = {
    id?: string;
    storeId?: string;
    store?: PublicStoreRef;
    name?: string;
    title?: string;
    slug?: string;
    description?: string | null;
    durationMin?: number;
    duration?: number;
    priceCents?: number;
    price?: number;
    currency?: string;
    isActive?: boolean;
    image?: string | null;
    createdAt?: string;
    updatedAt?: string;
};
