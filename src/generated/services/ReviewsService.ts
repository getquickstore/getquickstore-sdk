/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateReviewRequest } from '../models/CreateReviewRequest';
import type { FlagReviewResponse } from '../models/FlagReviewResponse';
import type { Review } from '../models/Review';
import type { ReviewListResponse } from '../models/ReviewListResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ReviewsService {
    /**
     * List product reviews
     * @returns ReviewListResponse Review list
     * @throws ApiError
     */
    public static getProductsReviews({
        id,
        xStoreId,
        limit = 20,
        offset,
    }: {
        /**
         * Product ID
         */
        id: string,
        /**
         * Store context id
         */
        xStoreId: string,
        /**
         * Maximum number of reviews to return
         */
        limit?: number,
        /**
         * Pagination offset
         */
        offset?: number,
    }): CancelablePromise<ReviewListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/products/{id}/reviews',
            path: {
                'id': id,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            query: {
                'limit': limit,
                'offset': offset,
            },
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                404: `Resource not found`,
            },
        });
    }
    /**
     * Create product review
     * @returns Review Review created
     * @throws ApiError
     */
    public static postProductsReviews({
        id,
        xStoreId,
        requestBody,
    }: {
        /**
         * Product ID
         */
        id: string,
        /**
         * Store context id
         */
        xStoreId: string,
        requestBody: CreateReviewRequest,
    }): CancelablePromise<Review> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/products/{id}/reviews',
            path: {
                'id': id,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                404: `Resource not found`,
            },
        });
    }
    /**
     * Flag review
     * @returns FlagReviewResponse Review flagged
     * @throws ApiError
     */
    public static postProductsReviewsFlag({
        id,
        rid,
        xStoreId,
    }: {
        /**
         * Product ID
         */
        id: string,
        /**
         * Review ID
         */
        rid: string,
        /**
         * Store context id
         */
        xStoreId: string,
    }): CancelablePromise<FlagReviewResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/products/{id}/reviews/{rid}/flag',
            path: {
                'id': id,
                'rid': rid,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                404: `Resource not found`,
            },
        });
    }
}
