import type { SeoProduct } from './SeoProduct';
import type { SeoServiceItem } from './SeoServiceItem';
import type { SeoStore } from './SeoStore';
export type SeoItem = {
    type?: 'STORE' | 'PRODUCT' | 'SERVICE';
    store?: SeoStore | null;
    product?: SeoProduct | null;
    service?: SeoServiceItem | null;
};
