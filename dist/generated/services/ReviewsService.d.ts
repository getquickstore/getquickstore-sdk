import type { CreateProductReviewRequest } from '../models/CreateProductReviewRequest';
import type { CreateProductReviewResponse } from '../models/CreateProductReviewResponse';
import type { FlagProductReviewResponse } from '../models/FlagProductReviewResponse';
import type { ProductReviewListResponse } from '../models/ProductReviewListResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class ReviewsService {
    /**
     * List product reviews
     * @returns ProductReviewListResponse Product review list
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
        limit?: number;
        offset?: number;
    }): CancelablePromise<ProductReviewListResponse>;
    /**
     * Create product review
     * @returns CreateProductReviewResponse Product review created
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
        requestBody: CreateProductReviewRequest;
    }): CancelablePromise<CreateProductReviewResponse>;
    /**
     * Flag product review
     * @returns FlagProductReviewResponse Product review flagged
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
    }): CancelablePromise<FlagProductReviewResponse>;
}
