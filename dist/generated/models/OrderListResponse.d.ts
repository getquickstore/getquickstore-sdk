import type { Order } from './Order';
export type OrderListResponse = {
    ok: boolean;
    items: Array<Order>;
};
