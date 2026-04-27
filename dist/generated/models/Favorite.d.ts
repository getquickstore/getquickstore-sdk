import type { FeaturedService } from './FeaturedService';
import type { ProductDetail } from './ProductDetail';
import type { PublicStoreRef } from './PublicStoreRef';
export type Favorite = {
    id: string;
    type: 'PRODUCT' | 'SERVICE' | 'STORE';
    productId?: string | null;
    serviceId?: string | null;
    storeId?: string | null;
    product?: ProductDetail | null;
    service?: FeaturedService | null;
    store?: PublicStoreRef | null;
    createdAt: string;
};
