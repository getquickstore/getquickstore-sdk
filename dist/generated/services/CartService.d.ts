import type { CartAddRequest } from '../models/CartAddRequest';
import type { CartRemoveRequest } from '../models/CartRemoveRequest';
import type { CartResponse } from '../models/CartResponse';
import type { CartSetQtyRequest } from '../models/CartSetQtyRequest';
import type { CartSingleResponse } from '../models/CartSingleResponse';
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
     * @returns CartSingleResponse Cart updated
     * @throws ApiError
     */
    static postCartAdd({ requestBody, }: {
        requestBody: CartAddRequest;
    }): CancelablePromise<CartSingleResponse>;
    /**
     * Set buyer cart item quantity
     * @returns CartSingleResponse Cart updated
     * @throws ApiError
     */
    static postCartSetQty({ requestBody, }: {
        requestBody: CartSetQtyRequest;
    }): CancelablePromise<CartSingleResponse>;
    /**
     * Remove buyer cart item
     * @returns CartSingleResponse Cart updated
     * @throws ApiError
     */
    static postCartRemove({ requestBody, }: {
        requestBody: CartRemoveRequest;
    }): CancelablePromise<CartSingleResponse>;
    /**
     * Clear all buyer carts
     * @returns CartResponse Buyer carts cleared
     * @throws ApiError
     */
    static postCartClear(): CancelablePromise<CartResponse>;
}
