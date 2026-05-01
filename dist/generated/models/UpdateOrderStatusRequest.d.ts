export type UpdateOrderStatusRequest = {
    status: 'PROCESSING' | 'READY_FOR_PICKUP' | 'SHIPPED' | 'DELIVERED' | 'FULFILLED' | 'CANCELLED';
};
