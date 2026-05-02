import type { CustomBookingSeriesDateInput } from './CustomBookingSeriesDateInput';
export type CustomBookingSeriesPreviewRequest = {
    storeId?: string | null;
    serviceId: string;
    dates: Array<CustomBookingSeriesDateInput>;
};
