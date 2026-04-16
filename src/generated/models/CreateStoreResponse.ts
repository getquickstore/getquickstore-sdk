/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateStoreResponse = {
    ok: boolean;
    store: {
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
    };
};

