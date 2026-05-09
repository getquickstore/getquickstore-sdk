export type BookingSeriesCustomPaymentCheckoutPreviewRequest = {
    serviceId: string;
    storeId?: string | null;
    dates: Array<{
        date: string;
        time: string;
    }>;
};
