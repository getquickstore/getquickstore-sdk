import type { SeoImage } from './SeoImage';
import type { SeoStore } from './SeoStore';
export type SeoService = {
    id?: string;
    storeId?: string;
    name?: string;
    slug?: string;
    description?: string | null;
    durationMin?: number;
    priceCents?: number;
    price?: number;
    currency?: string;
    ratingAvg?: number;
    reviewCount?: number;
    isActive?: boolean;
    image?: string | null;
    images?: Array<SeoImage>;
    store?: SeoStore | null;
};
