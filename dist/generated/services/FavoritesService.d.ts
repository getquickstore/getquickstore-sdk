import type { AddFavoriteRequest } from '../models/AddFavoriteRequest';
import type { FavoriteSingleResponse } from '../models/FavoriteSingleResponse';
import type { FavoritesResponse } from '../models/FavoritesResponse';
import type { OkResponse } from '../models/OkResponse';
import type { RemoveFavoriteRequest } from '../models/RemoveFavoriteRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class FavoritesService {
    /**
     * List user favorites
     * @returns FavoritesResponse Favorites list
     * @throws ApiError
     */
    static getFavorites({ type, }: {
        /**
         * Optional favorite type filter
         */
        type?: 'PRODUCT' | 'SERVICE' | 'STORE';
    }): CancelablePromise<FavoritesResponse>;
    /**
     * Add item to favorites
     * @returns FavoriteSingleResponse Favorite added
     * @throws ApiError
     */
    static postFavorites({ requestBody, }: {
        requestBody: AddFavoriteRequest;
    }): CancelablePromise<FavoriteSingleResponse>;
    /**
     * Remove item from favorites
     * @returns OkResponse Favorite removed
     * @throws ApiError
     */
    static deleteFavorites({ requestBody, }: {
        requestBody: RemoveFavoriteRequest;
    }): CancelablePromise<OkResponse>;
}
