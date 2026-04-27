import type { BookingSeriesItem } from './BookingSeriesItem';
export type AnalyticsBookings = {
    total: number;
    pending: number;
    confirmed: number;
    completed: number;
    cancelled: number;
    series: Array<BookingSeriesItem>;
};
