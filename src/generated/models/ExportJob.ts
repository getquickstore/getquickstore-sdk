/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ExportJob = {
    id?: string;
    storeId?: string;
    userId?: string | null;
    type?: string;
    format?: string;
    status?: string;
    dateFrom?: string | null;
    dateTo?: string | null;
    fileKey?: string | null;
    fileUrl?: string | null;
    rowsCount?: number;
    filters?: Record<string, any> | null;
    meta?: Record<string, any> | null;
    errorCode?: string | null;
    errorMessage?: string | null;
    startedAt?: string | null;
    finishedAt?: string | null;
    createdAt?: string;
    updatedAt?: string;
};

