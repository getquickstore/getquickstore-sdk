import type { ProductListItem } from './ProductListItem';
export type ProductListResponse = {
    items: Array<ProductListItem>;
    total: number;
    limit: number;
    offset: number;
};
