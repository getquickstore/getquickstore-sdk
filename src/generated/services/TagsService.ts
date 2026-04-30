/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTagRequest } from '../models/CreateTagRequest';
import type { GeneratedTagsResponse } from '../models/GeneratedTagsResponse';
import type { GenerateTagsRequest } from '../models/GenerateTagsRequest';
import type { OkResponse } from '../models/OkResponse';
import type { Tag } from '../models/Tag';
import type { TagListResponse } from '../models/TagListResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TagsService {
    /**
     * List tags
     * @returns TagListResponse Tag list
     * @throws ApiError
     */
    public static getTags({
        xStoreId,
        limit = 50,
        offset,
        q,
    }: {
        /**
         * Store context id
         */
        xStoreId?: string,
        limit?: number,
        offset?: number,
        /**
         * Search by tag name or slug
         */
        q?: string,
    }): CancelablePromise<TagListResponse> {
        return __request(OpenAPI, {
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
    public static postTags({
        requestBody,
        xStoreId,
    }: {
        requestBody: CreateTagRequest,
        /**
         * Store context id
         */
        xStoreId?: string,
    }): CancelablePromise<Tag> {
        return __request(OpenAPI, {
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
    public static postTagsGenerate({
        requestBody,
        xStoreId,
    }: {
        requestBody: GenerateTagsRequest,
        /**
         * Store context id
         */
        xStoreId?: string,
    }): CancelablePromise<GeneratedTagsResponse> {
        return __request(OpenAPI, {
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
    public static deleteTags({
        id,
        xStoreId,
    }: {
        /**
         * Tag id
         */
        id: string,
        /**
         * Store context id
         */
        xStoreId?: string,
    }): CancelablePromise<OkResponse> {
        return __request(OpenAPI, {
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
