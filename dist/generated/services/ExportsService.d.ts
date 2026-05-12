import type { CreateExportJobRequest } from '../models/CreateExportJobRequest';
import type { CreateExportJobResponse } from '../models/CreateExportJobResponse';
import type { ExportJobListResponse } from '../models/ExportJobListResponse';
import type { ExportJobResponse } from '../models/ExportJobResponse';
import type { ExportResponse } from '../models/ExportResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class ExportsService {
    /**
     * Preview store export data
     * @returns ExportResponse Export preview data
     * @throws ApiError
     */
    static getExports({ type, dateFrom, dateTo, }: {
        type?: 'all' | 'orders' | 'bookings' | 'booking_series' | 'refunds' | 'payments';
        dateFrom?: string;
        dateTo?: string;
    }): CancelablePromise<ExportResponse>;
    /**
     * List export jobs
     * @returns ExportJobListResponse Export jobs list
     * @throws ApiError
     */
    static getExportsJobs(): CancelablePromise<ExportJobListResponse>;
    /**
     * Create export job
     * @returns CreateExportJobResponse Export job created
     * @throws ApiError
     */
    static postExportsJobs({ requestBody, }: {
        requestBody?: CreateExportJobRequest;
    }): CancelablePromise<CreateExportJobResponse>;
    /**
     * Get export job
     * @returns ExportJobResponse Export job
     * @throws ApiError
     */
    static getExportsJobs1({ id, }: {
        id: string;
    }): CancelablePromise<ExportJobResponse>;
}
