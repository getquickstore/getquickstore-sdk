import type { CreateExportJobRequest } from '../models/CreateExportJobRequest';
import type { CreateExportJobResponse } from '../models/CreateExportJobResponse';
import type { ExportGoogleConnectResponse } from '../models/ExportGoogleConnectResponse';
import type { ExportGoogleStatusResponse } from '../models/ExportGoogleStatusResponse';
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
    /**
     * Download export job file
     * @returns binary Export file download
     * @throws ApiError
     */
    static getExportsJobsDownload({ id, }: {
        id: string;
    }): CancelablePromise<Blob>;
    /**
     * Get Google Sheets export connection status
     * @returns ExportGoogleStatusResponse Google Sheets connection status
     * @throws ApiError
     */
    static getExportsGoogleStatus(): CancelablePromise<ExportGoogleStatusResponse>;
    /**
     * Start Google Sheets OAuth connection flow
     * @returns ExportGoogleConnectResponse Google Sheets OAuth connect URL
     * @throws ApiError
     */
    static postExportsGoogleConnect(): CancelablePromise<ExportGoogleConnectResponse>;
    /**
     * Google Sheets OAuth callback
     * @returns void
     * @throws ApiError
     */
    static getExportsGoogleCallback({ code, state, error, }: {
        code?: string;
        state?: string;
        error?: string;
    }): CancelablePromise<void>;
    /**
     * Disconnect Google Sheets integration
     * @returns ExportGoogleStatusResponse Google Sheets disconnected
     * @throws ApiError
     */
    static postExportsGoogleDisconnect(): CancelablePromise<ExportGoogleStatusResponse>;
}
