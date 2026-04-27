"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoritesService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class FavoritesService {
    /**
     * List user favorites
     * @returns FavoritesResponse Favorites list
     * @throws ApiError
     */
    static getFavorites({ type, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static postFavorites({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/favorites',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation failed`,
                401: `Unauthorized`,
                500: `Favorite add failed`,
            },
        });
    }
    /**
     * Remove item from favorites
     * @returns OkResponse Favorite removed
     * @throws ApiError
     */
    static deleteFavorites({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'DELETE',
            url: '/favorites',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation failed`,
                401: `Unauthorized`,
                500: `Favorite remove failed`,
            },
        });
    }
}
exports.FavoritesService = FavoritesService;
