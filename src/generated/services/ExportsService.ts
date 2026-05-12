/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateExportJobRequest } from '../models/CreateExportJobRequest';
import type { CreateExportJobResponse } from '../models/CreateExportJobResponse';
import type { ExportJobListResponse } from '../models/ExportJobListResponse';
import type { ExportJobResponse } from '../models/ExportJobResponse';
import type { ExportResponse } from '../models/ExportResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ExportsService {
    /**
     * Preview store export data
     * @returns ExportResponse Export preview data
     * @throws ApiError
     */
    public static getExports({
        type = 'all',
        dateFrom,
        dateTo,
    }: {
        type?: 'all' | 'orders' | 'bookings' | 'booking_series' | 'refunds' | 'payments',
        dateFrom?: string,
        dateTo?: string,
    }): CancelablePromise<ExportResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/exports',
            query: {
                'type': type,
                'dateFrom': dateFrom,
                'dateTo': dateTo,
            },
            errors: {
                401: `Unauthorized`,
                500: `Export failed`,
            },
        });
    }
    /**
     * List export jobs
     * @returns ExportJobListResponse Export jobs list
     * @throws ApiError
     */
    public static getExportsJobs(): CancelablePromise<ExportJobListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/exports/jobs',
            errors: {
                401: `Unauthorized`,
                500: `Export jobs list failed`,
            },
        });
    }
    /**
     * Create export job
     * @returns CreateExportJobResponse Export job created
     * @throws ApiError
     */
    public static postExportsJobs({
        requestBody,
    }: {
        requestBody?: CreateExportJobRequest,
    }): CancelablePromise<CreateExportJobResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/exports/jobs',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                500: `Export job create failed`,
            },
        });
    }
    /**
     * Get export job
     * @returns ExportJobResponse Export job
     * @throws ApiError
     */
    public static getExportsJobs1({
        id,
    }: {
        id: string,
    }): CancelablePromise<ExportJobResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/exports/jobs/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                404: `Export job not found`,
                500: `Export job get failed`,
            },
        });
    }
}
