import type { ProductReview } from './ProductReview';
export type ProductReviewListResponse = {
    ok: boolean;
    items: Array<ProductReview>;
    total: number;
    limit: number;
    offset: number;
};
