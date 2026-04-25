import type { Cart } from './Cart';
import type { CartItem } from './CartItem';
export type CartResponse = {
    ok: boolean;
    items: Array<CartItem>;
    carts: Array<Cart>;
};
