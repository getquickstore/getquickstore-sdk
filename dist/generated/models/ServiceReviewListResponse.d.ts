import type { ServiceReview } from './ServiceReview';
export type ServiceReviewListResponse = {
    ok: boolean;
    items: Array<ServiceReview>;
    total: number;
    limit: number;
    offset: number;
};
