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
