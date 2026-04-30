import type { CreateProductRequest } from '../models/CreateProductRequest';
import type { OkResponse } from '../models/OkResponse';
import type { ProductDetail } from '../models/ProductDetail';
import type { ProductListResponse } from '../models/ProductListResponse';
import type { PublicProductResponse } from '../models/PublicProductResponse';
import type { UpdateProductRequest } from '../models/UpdateProductRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class ProductsService {
    /**
     * List products
     * @returns ProductListResponse Product list
     * @throws ApiError
     */
    static getProducts({ xStoreId, }: {
        /**
         * Store context id
         */
        xStoreId?: string;
    }): CancelablePromise<ProductListResponse>;
    /**
     * Create product
     * @returns ProductDetail Product created
     * @throws ApiError
     */
    static postProducts({ requestBody, xStoreId, }: {
        requestBody: CreateProductRequest;
        /**
         * Store context id. If omitted, server may use req.user.defaultStoreId
         */
        xStoreId?: string;
    }): CancelablePromise<ProductDetail>;
    /**
     * Get public product by id
     * @returns PublicProductResponse Public product details
     * @throws ApiError
     */
    static getProductsPublic({ id, storeId, }: {
        id: string;
        /**
         * Public store id
         */
        storeId: string;
    }): CancelablePromise<PublicProductResponse>;
    /**
     * Get product by id
     * @returns ProductDetail Product details
     * @throws ApiError
     */
    static getProducts1({ id, xStoreId, }: {
        id: string;
        /**
         * Store context id
         */
        xStoreId?: string;
    }): CancelablePromise<ProductDetail>;
    /**
     * Update product by id
     * @returns ProductDetail Product updated
     * @throws ApiError
     */
    static patchProducts({ id, requestBody, xStoreId, }: {
        id: string;
        requestBody: UpdateProductRequest;
        /**
         * Store context id
         */
        xStoreId?: string;
    }): CancelablePromise<ProductDetail>;
    /**
     * Delete product and cleanup related data
     * Soft-deletes the product, removes product images, category links, reviews, favorites and cart items. Order items are preserved.
     * @returns OkResponse Product deleted
     * @throws ApiError
     */
    static deleteProducts({ id, xStoreId, }: {
        id: string;
        /**
         * Store context id
         */
        xStoreId?: string;
    }): CancelablePromise<OkResponse>;
}
