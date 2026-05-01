import type { Order } from './Order';
export type ConfirmOrderResponse = {
    ok: boolean;
    item: Order;
};
