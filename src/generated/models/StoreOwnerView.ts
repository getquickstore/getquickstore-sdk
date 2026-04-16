/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type StoreOwnerView = {
    id: string;
    name: string;
    slug: string;
    status: 'PROVISIONING' | 'ACTIVE' | 'SUSPENDED' | 'ARCHIVED';
    defaultCurrency: string;
    defaultLanguage: string;
    timezone: string;
    country: string | null;
    createdAt: string;
    role: 'OWNER';
    isDefault: boolean;
};

