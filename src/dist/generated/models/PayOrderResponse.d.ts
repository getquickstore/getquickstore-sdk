import type { Order } from './Order';
import type { Payment } from './Payment';
export type PayOrderResponse = {
    ok: boolean;
    payment: Payment;
    item: Order;
};
