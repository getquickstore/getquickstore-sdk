export type AnalyticsOrders = {
    pending: number;
    paid: number;
    processing: number;
    readyForPickup: number;
    fulfilled: number;
    cancelled: number;
    refunded: number;
};
