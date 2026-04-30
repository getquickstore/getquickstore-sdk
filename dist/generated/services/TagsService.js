"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagsService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class TagsService {
    /**
     * List tags
     * @returns TagListResponse Tag list
     * @throws ApiError
     */
    static getTags({ xStoreId, limit = 50, offset, q, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/tags',
            headers: {
                'x-store-id': xStoreId,
            },
            query: {
                'limit': limit,
                'offset': offset,
                'q': q,
            },
            errors: {
                500: `Failed to list tags`,
            },
        });
    }
    /**
     * Create tag
     * @returns Tag Tag created
     * @throws ApiError
     */
    static postTags({ requestBody, xStoreId, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/tags',
            headers: {
                'x-store-id': xStoreId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request`,
                500: `Failed to create tag`,
            },
        });
    }
    /**
     * Generate auto tags from text
     * @returns GeneratedTagsResponse Generated tags
     * @throws ApiError
     */
    static postTagsGenerate({ requestBody, xStoreId, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/tags/generate',
            headers: {
                'x-store-id': xStoreId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                500: `Failed to generate tags`,
            },
        });
    }
    /**
     * Delete tag
     * Deletes the tag and removes product/service tag links.
     * @returns OkResponse Tag deleted
     * @throws ApiError
     */
    static deleteTags({ id, xStoreId, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'DELETE',
            url: '/tags/{id}',
            path: {
                'id': id,
            },
            headers: {
                'x-store-id': xStoreId,
            },
            errors: {
                404: `Tag not found`,
                500: `Failed to delete tag`,
            },
        });
    }
}
exports.TagsService = TagsService;
