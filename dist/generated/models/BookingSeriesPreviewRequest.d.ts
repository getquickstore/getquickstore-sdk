export type BookingSeriesPreviewRequest = {
    storeId?: string | null;
    serviceId: string;
    startDate: string;
    endDate: string;
    weekdays: Array<number>;
    time: string;
};
