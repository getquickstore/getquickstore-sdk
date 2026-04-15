import type { CreateReviewRequest } from '../models/CreateReviewRequest';
import type { FlagReviewResponse } from '../models/FlagReviewResponse';
import type { Review } from '../models/Review';
import type { ReviewListResponse } from '../models/ReviewListResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class ReviewsService {
    /**
     * List product reviews
     * @returns ReviewListResponse Review list
     * @throws ApiError
     */
    static getProductsReviews({ id, xStoreId, limit, offset, }: {
        /**
         * Product ID
         */
        id: string;
        /**
         * Store context id
         */
        xStoreId: string;
        /**
         * Maximum number of reviews to return
         */
        limit?: number;
        /**
         * Pagination offset
         */
        offset?: number;
    }): CancelablePromise<ReviewListResponse>;
    /**
     * Create product review
     * @returns Review Review created
     * @throws ApiError
     */
    static postProductsReviews({ id, xStoreId, requestBody, }: {
        /**
         * Product ID
         */
        id: string;
        /**
         * Store context id
         */
        xStoreId: string;
        requestBody: CreateReviewRequest;
    }): CancelablePromise<Review>;
    /**
     * Flag review
     * @returns FlagReviewResponse Review flagged
     * @throws ApiError
     */
    static postProductsReviewsFlag({ id, rid, xStoreId, }: {
        /**
         * Product ID
         */
        id: string;
        /**
         * Review ID
         */
        rid: string;
        /**
         * Store context id
         */
        xStoreId: string;
    }): CancelablePromise<FlagReviewResponse>;
}
