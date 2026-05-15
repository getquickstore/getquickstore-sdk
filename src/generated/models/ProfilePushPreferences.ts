/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ProfilePushPreferences = {
    id?: string;
    userId?: string;
    storeId?: string | null;
    scope?: 'GLOBAL' | 'STORE';
    scopeKey?: string;
    ordersEnabled?: boolean;
    bookingsEnabled?: boolean;
    paymentsEnabled?: boolean;
    refundsEnabled?: boolean;
    reviewsEnabled?: boolean;
    marketingEnabled?: boolean;
    systemEnabled?: boolean;
    quietHoursEnabled?: boolean;
    quietHoursStart?: string | null;
    quietHoursEnd?: string | null;
    timezone?: string | null;
    createdAt?: string;
    updatedAt?: string;
};

