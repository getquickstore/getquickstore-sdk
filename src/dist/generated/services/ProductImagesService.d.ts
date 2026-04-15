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
         * Store context id
         */
        xStoreId?: string;
    }): CancelablePromise<{
        ok: boolean;
        images: Array<ProductImage>;
    }>;
    /**
     * Save product image metadata
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
         * Store context id
         */
        xStoreId?: string;
    }): CancelablePromise<{
        ok: boolean;
        image: ProductImage;
    }>;
    /**
     * Create presigned upload URL for product image
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
         * Store context id
         */
        xStoreId?: string;
    }): CancelablePromise<{
        ok: boolean;
        uploadUrl: string;
        key: string;
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
         * Image ID
         */
        imageId: string;
        requestBody: ProductImageUpdateRequest;
        /**
         * Store context id
         */
        xStoreId?: string;
    }): CancelablePromise<{
        ok: boolean;
        image: ProductImage;
    }>;
    /**
     * Delete product image
     * @returns any Image deleted
     * @throws ApiError
     */
    static deleteProductsImages({ productId, imageId, xStoreId, }: {
        /**
         * Product ID
         */
        productId: string;
        /**
         * Image ID
         */
        imageId: string;
        /**
         * Store context id
         */
        xStoreId?: string;
    }): CancelablePromise<{
        ok: boolean;
        imageId: string;
    }>;
}
