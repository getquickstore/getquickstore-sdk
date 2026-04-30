import type { PublicStoreReview } from './PublicStoreReview';
export type PublicStoreReviewListResponse = {
    ok: boolean;
    ratingAvg: number;
    reviewCount: number;
    items: Array<PublicStoreReview>;
};
