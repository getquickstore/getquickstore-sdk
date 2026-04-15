import type { Review } from './Review';
export type ReviewListResponse = {
    items: Array<Review>;
    total: number;
    limit: number;
    offset: number;
};
