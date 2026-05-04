/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateProductReviewRequest } from '../models/CreateProductReviewRequest';
import type { CreateProductReviewResponse } from '../models/CreateProductReviewResponse';
import type { FlagProductReviewResponse } from '../models/FlagProductReviewResponse';
import type { ProductReviewListResponse } from '../models/ProductReviewListResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ReviewsService {
    /**
     * List product reviews
     * @returns ProductReviewListResponse Product review list
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
        limit?: number,
        offset?: number,
    }): CancelablePromise<ProductReviewListResponse> {
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
     * @returns CreateProductReviewResponse Product review created
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
        requestBody: CreateProductReviewRequest,
    }): CancelablePromise<CreateProductReviewResponse> {
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
     * Flag product review
     * @returns FlagProductReviewResponse Product review flagged
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
    }): CancelablePromise<FlagProductReviewResponse> {
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
