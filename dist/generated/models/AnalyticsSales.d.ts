import type { SalesSeriesItem } from './SalesSeriesItem';
export type AnalyticsSales = {
    revenueCents: number;
    refundedCents: number;
    netRevenueCents: number;
    paidOrders: number;
    averageOrderValueCents: number;
    series: Array<SalesSeriesItem>;
};
