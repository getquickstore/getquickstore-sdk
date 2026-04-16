/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StoreBillingSummary } from './StoreBillingSummary';
import type { StoreStripeSummary } from './StoreStripeSummary';
export type StoreSummary = {
    id: string;
    name: string;
    slug: string;
    status: 'PROVISIONING' | 'ACTIVE' | 'SUSPENDED' | 'ARCHIVED';
    publicUrl: string;
    role: 'OWNER';
    isDefault: boolean;
    billing: StoreBillingSummary;
    stripe: StoreStripeSummary;
    createdAt: string;
    updatedAt: string;
};

