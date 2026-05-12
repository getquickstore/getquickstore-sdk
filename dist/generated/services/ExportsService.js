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
}
exports.ExportsService = ExportsService;
