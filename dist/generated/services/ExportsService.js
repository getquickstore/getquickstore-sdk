"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportsService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class ExportsService {
    /**
     * Preview store export data
     * @returns ExportResponse Export preview data
     * @throws ApiError
     */
    static getExports({ type = 'all', dateFrom, dateTo, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static getExportsJobs() {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static postExportsJobs({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static getExportsJobs1({ id, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    /**
     * Download export job file
     * @returns binary Export file download
     * @throws ApiError
     */
    static getExportsJobsDownload({ id, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/exports/jobs/{id}/download',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                404: `Export file not found`,
                500: `Export job download failed`,
            },
        });
    }
    /**
     * Get Google Sheets export connection status
     * @returns ExportGoogleStatusResponse Google Sheets connection status
     * @throws ApiError
     */
    static getExportsGoogleStatus() {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/exports/google/status',
            errors: {
                401: `Unauthorized`,
                500: `Google Sheets status failed`,
            },
        });
    }
    /**
     * Start Google Sheets OAuth connection flow
     * @returns ExportGoogleConnectResponse Google Sheets OAuth connect URL
     * @throws ApiError
     */
    static postExportsGoogleConnect() {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/exports/google/connect',
            errors: {
                401: `Unauthorized`,
                500: `Google Sheets connect failed`,
            },
        });
    }
    /**
     * Google Sheets OAuth callback
     * @returns void
     * @throws ApiError
     */
    static getExportsGoogleCallback({ code, state, error, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/exports/google/callback',
            query: {
                'code': code,
                'state': state,
                'error': error,
            },
            errors: {
                302: `Redirect to app success or error URL`,
                500: `Google Sheets callback failed`,
            },
        });
    }
    /**
     * Disconnect Google Sheets integration
     * @returns ExportGoogleStatusResponse Google Sheets disconnected
     * @throws ApiError
     */
    static postExportsGoogleDisconnect() {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/exports/google/disconnect',
            errors: {
                401: `Unauthorized`,
                500: `Google Sheets disconnect failed`,
            },
        });
    }
}
exports.ExportsService = ExportsService;
