import type { ProductImage } from '../models/ProductImage';
import type { ProductImageCreateRequest } from '../models/ProductImageCreateRequest';
import type { ProductImagePresignRequest } from '../models/ProductImagePresignRequest';
import type { ProductImageUpdateRequest } from '../models/ProductImageUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class ProductImagesService {
    /**
     * List product images
     * @returns any Product images list
     * @throws ApiError
     */
    static getProductsImages({ productId, xStoreId, }: {
        /**
         * Product ID
         */
        productId: string;
        /**
         * Store context ID
         */
        xStoreId?: string;
    }): CancelablePromise<{
        ok: boolean;
        images: Array<ProductImage>;
    }>;
    /**
     * Save product image metadata
     * Call this after uploading the binary file with the presigned URL.
     * @returns any Image saved
     * @throws ApiError
     */
    static postProductsImages({ productId, requestBody, xStoreId, }: {
        /**
         * Product ID
         */
        productId: string;
        requestBody: ProductImageCreateRequest;
        /**
         * Store context ID
         */
        xStoreId?: string;
    }): CancelablePromise<{
        ok: boolean;
        image: ProductImage;
    }>;
    /**
     * Create presigned upload URL
     * Returns a direct upload URL for R2/S3-compatible storage. Upload the file with PUT, then save metadata with POST /products/{productId}/images.
     * @returns any Presigned URL created
     * @throws ApiError
     */
    static postProductsImagesPresign({ productId, requestBody, xStoreId, }: {
        /**
         * Product ID
         */
        productId: string;
        requestBody: ProductImagePresignRequest;
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
     * Update product image metadata
     * @returns any Image updated
     * @throws ApiError
     */
    static patchProductsImages({ productId, imageId, requestBody, xStoreId, }: {
        /**
         * Product ID
         */
        productId: string;
        /**
         * Product image ID
         */
        imageId: string;
        requestBody: ProductImageUpdateRequest;
        /**
         * Store context ID
         */
        xStoreId?: string;
    }): CancelablePromise<{
        ok: boolean;
        image: ProductImage;
    }>;
    /**
     * Delete product image
     * Deletes product image metadata and attempts to remove the object from storage.
     * @returns any Image deleted
     * @throws ApiError
     */
    static deleteProductsImages({ productId, imageId, xStoreId, }: {
        /**
         * Product ID
         */
        productId: string;
        /**
         * Product image ID
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
