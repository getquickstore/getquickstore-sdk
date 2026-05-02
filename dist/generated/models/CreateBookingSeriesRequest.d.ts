import type { BookingSeriesPreviewRequest } from './BookingSeriesPreviewRequest';
export type CreateBookingSeriesRequest = (BookingSeriesPreviewRequest & {
    customerName?: string | null;
    customerEmail?: string | null;
    customerPhone?: string | null;
    notes?: string | null;
});
