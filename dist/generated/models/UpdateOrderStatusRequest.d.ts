export type UpdateOrderStatusRequest = {
    status: 'PROCESSING' | 'READY_FOR_PICKUP' | 'FULFILLED' | 'CANCELLED';
};
