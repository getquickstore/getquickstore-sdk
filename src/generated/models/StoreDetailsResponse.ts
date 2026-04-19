/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type StoreDetailsResponse = {
    id: string;
    name: string;
    slug: string;
    status: 'PROVISIONING' | 'ACTIVE' | 'SUSPENDED' | 'ARCHIVED';
    ownerUserId: string;
    defaultCurrency: string;
    defaultLanguage: string;
    timezone: string;
    country: string | null;
    createdAt: string;
    updatedAt: string;
    role: 'OWNER';
    isPublic: boolean;
};

