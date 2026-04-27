import type { OrderProductImage } from './OrderProductImage';
export type OrderProductRef = {
    id: string;
    name: string;
    slug: string;
    sku?: string | null;
    images?: Array<OrderProductImage>;
};
