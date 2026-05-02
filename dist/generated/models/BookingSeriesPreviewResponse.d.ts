import type { BookingSeriesSlotPreview } from './BookingSeriesSlotPreview';
export type BookingSeriesPreviewResponse = {
    item: {
        storeId: string;
        serviceId: string;
        startDate: string;
        endDate: string;
        weekdays: Array<number>;
        time: string;
        totalSessions: number;
        availableSessions: number;
        conflictSessions: number;
        totalCents: number;
        total: number;
        currency: string;
        slots: Array<BookingSeriesSlotPreview>;
    };
};
