"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class CatalogService {
    /**
     * Public featured catalog
     * List featured published products and active services from public active stores.
     * @returns FeaturedCatalogResponse Featured public catalog
     * @throws ApiError
     */
    static getCatalogFeatured({ limit = 12, q, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/catalog/featured',
            query: {
                'limit': limit,
                'q': q,
            },
            errors: {
                500: `Featured catalog failed`,
            },
        });
    }
}
exports.CatalogService = CatalogService;
