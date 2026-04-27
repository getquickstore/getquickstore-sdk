/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SalesSeriesItem } from './SalesSeriesItem';
export type AnalyticsSales = {
    revenueCents: number;
    refundedCents: number;
    netRevenueCents: number;
    paidOrders: number;
    averageOrderValueCents: number;
    series: Array<SalesSeriesItem>;
};

