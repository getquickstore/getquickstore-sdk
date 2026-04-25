import type { CartAddRequest } from '../models/CartAddRequest';
import type { CartRemoveRequest } from '../models/CartRemoveRequest';
import type { CartResponse } from '../models/CartResponse';
import type { CartSetQtyRequest } from '../models/CartSetQtyRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class CartService {
    /**
     * Get buyer carts across stores
     * @returns CartResponse Buyer cart items across stores
     * @throws ApiError
     */
    static getCart(): CancelablePromise<CartResponse>;
    /**
     * Add product to buyer cart
     * @returns CartResponse Cart updated
     * @throws ApiError
     */
    static postCartAdd({ requestBody, }: {
        requestBody: CartAddRequest;
    }): CancelablePromise<CartResponse>;
    /**
     * Set cart item quantity
     * @returns CartResponse Cart updated
     * @throws ApiError
     */
    static postCartSetQty({ requestBody, xStoreId, }: {
        requestBody: CartSetQtyRequest;
        /**
         * Store context id
         */
        xStoreId?: string;
    }): CancelablePromise<CartResponse>;
    /**
     * Remove cart item
     * @returns CartResponse Cart updated
     * @throws ApiError
     */
    static postCartRemove({ requestBody, xStoreId, }: {
        requestBody: CartRemoveRequest;
        /**
         * Store context id
         */
        xStoreId?: string;
    }): CancelablePromise<CartResponse>;
    /**
     * Clear current cart
     * @returns CartResponse Cart cleared
     * @throws ApiError
     */
    static postCartClear({ xStoreId, }: {
        /**
         * Store context id
         */
        xStoreId?: string;
    }): CancelablePromise<CartResponse>;
}
