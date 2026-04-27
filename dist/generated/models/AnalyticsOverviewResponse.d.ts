import type { AnalyticsBookings } from './AnalyticsBookings';
import type { AnalyticsCustomers } from './AnalyticsCustomers';
import type { AnalyticsOrders } from './AnalyticsOrders';
import type { AnalyticsPeriod } from './AnalyticsPeriod';
import type { AnalyticsSales } from './AnalyticsSales';
import type { AnalyticsStore } from './AnalyticsStore';
export type AnalyticsOverviewResponse = {
    ok: boolean;
    store: AnalyticsStore;
    range: string;
    currency: string;
    period: AnalyticsPeriod;
    sales: AnalyticsSales;
    bookings: AnalyticsBookings;
    orders: AnalyticsOrders;
    customers: AnalyticsCustomers;
};
