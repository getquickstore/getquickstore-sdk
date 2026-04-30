import type { CreateTagRequest } from '../models/CreateTagRequest';
import type { GeneratedTagsResponse } from '../models/GeneratedTagsResponse';
import type { GenerateTagsRequest } from '../models/GenerateTagsRequest';
import type { OkResponse } from '../models/OkResponse';
import type { Tag } from '../models/Tag';
import type { TagListResponse } from '../models/TagListResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class TagsService {
    /**
     * List tags
     * @returns TagListResponse Tag list
     * @throws ApiError
     */
    static getTags({ xStoreId, limit, offset, q, }: {
        /**
         * Store context id
         */
        xStoreId?: string;
        limit?: number;
        offset?: number;
        /**
         * Search by tag name or slug
         */
        q?: string;
    }): CancelablePromise<TagListResponse>;
    /**
     * Create tag
     * @returns Tag Tag created
     * @throws ApiError
     */
    static postTags({ requestBody, xStoreId, }: {
        requestBody: CreateTagRequest;
        /**
         * Store context id
         */
        xStoreId?: string;
    }): CancelablePromise<Tag>;
    /**
     * Generate auto tags from text
     * @returns GeneratedTagsResponse Generated tags
     * @throws ApiError
     */
    static postTagsGenerate({ requestBody, xStoreId, }: {
        requestBody: GenerateTagsRequest;
        /**
         * Store context id
         */
        xStoreId?: string;
    }): CancelablePromise<GeneratedTagsResponse>;
    /**
     * Delete tag
     * Deletes the tag and removes product/service tag links.
     * @returns OkResponse Tag deleted
     * @throws ApiError
     */
    static deleteTags({ id, xStoreId, }: {
        /**
         * Tag id
         */
        id: string;
        /**
         * Store context id
         */
        xStoreId?: string;
    }): CancelablePromise<OkResponse>;
}
