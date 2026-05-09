/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderPickupToken } from './OrderPickupToken';
export type OrderPickupInfo = {
    at?: string | null;
    readyAt?: string | null;
    token?: OrderPickupToken | null;
    /**
     * One-time plain 6-digit pickup code returned only right after pickup order creation.
     */
    code?: string | null;
    /**
     * One-time plain pickup QR token returned only right after pickup order creation.
     */
    qrToken?: string | null;
};

