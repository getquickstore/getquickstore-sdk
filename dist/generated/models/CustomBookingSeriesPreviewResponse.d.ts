import type { BookingSeriesSlotPreview } from './BookingSeriesSlotPreview';
import type { CustomBookingSeriesDateInput } from './CustomBookingSeriesDateInput';
export type CustomBookingSeriesPreviewResponse = {
    item: {
        storeId: string;
        serviceId: string;
        dates: Array<CustomBookingSeriesDateInput>;
        totalSessions: number;
        availableSessions: number;
        conflictSessions: number;
        totalCents: number;
        total: number;
        currency: string;
        slots: Array<BookingSeriesSlotPreview>;
    };
};
