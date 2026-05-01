"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class PublicService {
    /**
     * List public stores
     * @returns PublicStoreListResponse Public stores list
     * @throws ApiError
     */
    static getPublicStores({ q, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/public/stores',
            query: {
                'q': q,
            },
            errors: {
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get public store by slug
     * @returns PublicStore Public store details
     * @throws ApiError
     */
    static getPublicStores1({ slug, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/public/stores/{slug}',
            path: {
                'slug': slug,
            },
            errors: {
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * List nearby public stores
     * @returns PublicStoreNearbyResponse Nearby stores list
     * @throws ApiError
     */
    static getPublicStoresNearby({ lat, lng, radiusKm = 25, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/public/stores/nearby',
            query: {
                'lat': lat,
                'lng': lng,
                'radiusKm': radiusKm,
            },
            errors: {
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * List public store reviews
     * @returns PublicStoreReviewListResponse Store reviews list
     * @throws ApiError
     */
    static getPublicStoresReviews({ id, limit = 20, offset, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/public/stores/{id}/reviews',
            path: {
                'id': id,
            },
            query: {
                'limit': limit,
                'offset': offset,
            },
            errors: {
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Create public store review
     * @returns PublicStoreReviewCreateResponse Store review created
     * @throws ApiError
     */
    static postPublicStoresReviews({ id, requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/public/stores/{id}/reviews',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * List aggregated public store reviews
     * @returns PublicStoreAllReviewListResponse Aggregated store reviews list
     * @throws ApiError
     */
    static getPublicStoresAllReviews({ id, limit = 50, offset, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/public/stores/{id}/all-reviews',
            path: {
                'id': id,
            },
            query: {
                'limit': limit,
                'offset': offset,
            },
            errors: {
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Flag public store review
     * @returns OkResponse Store review flagged
     * @throws ApiError
     */
    static postPublicStoresReviewsFlag({ id, rid, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/public/stores/{id}/reviews/{rid}/flag',
            path: {
                'id': id,
                'rid': rid,
            },
            errors: {
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * List public products
     * @returns PublicProductListResponse Public products list
     * @throws ApiError
     */
    static getPublicProducts({ storeId, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/public/products',
            query: {
                'storeId': storeId,
            },
            errors: {
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * List public services
     * @returns PublicServiceListResponse Public services list
     * @throws ApiError
     */
    static getPublicServices({ storeId, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/public/services',
            query: {
                'storeId': storeId,
            },
            errors: {
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get public marketplace catalog
     * @returns MarketplaceCatalogResponse Public catalog
     * @throws ApiError
     */
    static getPublicCatalog() {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/public/catalog',
            errors: {
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * List public categories
     * @returns PublicCategoryListResponse Public categories list
     * @throws ApiError
     */
    static getPublicCategories({ storeId, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/public/categories',
            query: {
                'storeId': storeId,
            },
            errors: {
                404: `Not found`,
                500: `Internal server error`,
            },
        });
    }
}
exports.PublicService = PublicService;
