import type { ExportJob } from './ExportJob';
import type { ExportSummary } from './ExportSummary';
export type CreateExportJobResponse = {
    ok: boolean;
    item: ExportJob;
    preview: {
        total?: number;
        summary?: ExportSummary;
        items?: Array<Record<string, any>>;
    };
};
