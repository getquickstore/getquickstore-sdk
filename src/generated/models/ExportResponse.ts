/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExportSummary } from './ExportSummary';
export type ExportResponse = {
    ok: boolean;
    type: string;
    storeId: string;
    dateFrom?: string | null;
    dateTo?: string | null;
    total: number;
    summary: ExportSummary;
    items: Array<Record<string, any>>;
};

