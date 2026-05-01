import type { PublicStoreAllReview } from './PublicStoreAllReview';
export type PublicStoreAllReviewListResponse = {
    ok: boolean;
    ratingAvg: number;
    reviewCount: number;
    items: Array<PublicStoreAllReview>;
};
