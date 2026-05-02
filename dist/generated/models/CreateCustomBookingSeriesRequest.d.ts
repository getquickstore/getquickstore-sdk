import type { CustomBookingSeriesPreviewRequest } from './CustomBookingSeriesPreviewRequest';
export type CreateCustomBookingSeriesRequest = (CustomBookingSeriesPreviewRequest & {
    customerName?: string | null;
    customerEmail?: string | null;
    customerPhone?: string | null;
    notes?: string | null;
});
