/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddFavoriteRequest } from '../models/AddFavoriteRequest';
import type { FavoriteSingleResponse } from '../models/FavoriteSingleResponse';
import type { FavoritesResponse } from '../models/FavoritesResponse';
import type { OkResponse } from '../models/OkResponse';
import type { RemoveFavoriteRequest } from '../models/RemoveFavoriteRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FavoritesService {
    /**
     * List user favorites
     * @returns FavoritesResponse Favorites list
     * @throws ApiError
     */
    public static getFavorites({
        type,
    }: {
        /**
         * Optional favorite type filter
         */
        type?: 'PRODUCT' | 'SERVICE' | 'STORE',
    }): CancelablePromise<FavoritesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/favorites',
            query: {
                'type': type,
            },
            errors: {
                401: `Unauthorized`,
                500: `Favorites fetch failed`,
            },
        });
    }
    /**
     * Add item to favorites
     * @returns FavoriteSingleResponse Favorite added
     * @throws ApiError
     */
    public static postFavorites({
        requestBody,
    }: {
        requestBody: AddFavoriteRequest,
    }): CancelablePromise<FavoriteSingleResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/favorites',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation failed`,
                409: `Already in favorites`,
            },
        });
    }
    /**
     * Remove item from favorites
     * @returns OkResponse Favorite removed
     * @throws ApiError
     */
    public static deleteFavorites({
        requestBody,
    }: {
        requestBody: RemoveFavoriteRequest,
    }): CancelablePromise<OkResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/favorites',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
