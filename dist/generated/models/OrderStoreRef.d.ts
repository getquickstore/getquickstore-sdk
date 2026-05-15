import type { StoreReturnPolicy } from './StoreReturnPolicy';
export type OrderStoreRef = {
    id: string;
    name: string;
    slug: string;
    returnPolicy?: StoreReturnPolicy | null;
};
