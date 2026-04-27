import type { ServiceImage } from '../models/ServiceImage';
import type { ServiceImageCreateRequest } from '../models/ServiceImageCreateRequest';
import type { ServiceImagePresignRequest } from '../models/ServiceImagePresignRequest';
import type { ServiceImageUpdateRequest } from '../models/ServiceImageUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class ServiceImagesService {
    /**
     * List service images
     * @returns any Service images list
     * @throws ApiError
     */
    static getServicesImages({ serviceId, xStoreId, }: {
        /**
         * Service ID
         */
        serviceId: string;
        /**
         * Store context ID
         */
        xStoreId?: string;
    }): CancelablePromise<{
        ok: boolean;
        images: Array<ServiceImage>;
    }>;
    /**
     * Save service image metadata
     * Call this after uploading the binary file with the presigned URL.
     * @returns any Image saved
     * @throws ApiError
     */
    static postServicesImages({ serviceId, requestBody, xStoreId, }: {
        /**
         * Service ID
         */
        serviceId: string;
        requestBody: ServiceImageCreateRequest;
        /**
         * Store context ID
         */
        xStoreId?: string;
    }): CancelablePromise<{
        ok: boolean;
        image: ServiceImage;
    }>;
    /**
     * Create presigned upload URL
     * Returns a direct upload URL for R2/S3-compatible storage. Upload the file with PUT, then save metadata with POST /services/{serviceId}/images.
     * @returns any Presigned URL created
     * @throws ApiError
     */
    static postServicesImagesPresign({ serviceId, requestBody, xStoreId, }: {
        /**
         * Service ID
         */
        serviceId: string;
        requestBody: ServiceImagePresignRequest;
        /**
         * Store context ID
         */
        xStoreId?: string;
    }): CancelablePromise<{
        ok: boolean;
        uploadUrl: string;
        key: string;
        url: string;
    }>;
    /**
     * Update service image metadata
     * @returns any Image updated
     * @throws ApiError
     */
    static patchServicesImages({ serviceId, imageId, requestBody, xStoreId, }: {
        /**
         * Service ID
         */
        serviceId: string;
        /**
         * Service image ID
         */
        imageId: string;
        requestBody: ServiceImageUpdateRequest;
        /**
         * Store context ID
         */
        xStoreId?: string;
    }): CancelablePromise<{
        ok: boolean;
        image: ServiceImage;
    }>;
    /**
     * Delete service image
     * Deletes service image metadata and attempts to remove the object from storage.
     * @returns any Image deleted
     * @throws ApiError
     */
    static deleteServicesImages({ serviceId, imageId, xStoreId, }: {
        /**
         * Service ID
         */
        serviceId: string;
        /**
         * Service image ID
         */
        imageId: string;
        /**
         * Store context ID
         */
        xStoreId?: string;
    }): CancelablePromise<{
        ok: boolean;
        imageId: string;
    }>;
}
