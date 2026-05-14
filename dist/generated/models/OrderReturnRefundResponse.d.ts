import type { OrderReturn } from './OrderReturn';
export type OrderReturnRefundResponse = {
    ok: boolean;
    item: OrderReturn;
    refund: any;
};
