/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExportJob } from './ExportJob';
import type { ExportSummary } from './ExportSummary';
export type CreateExportJobResponse = {
    ok: boolean;
    item: ExportJob;
    preview?: {
        total?: number;
        summary?: ExportSummary;
        items?: Array<Record<string, any>>;
    } | null;
};

