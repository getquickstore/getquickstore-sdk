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
    isPublic: boolean;
    billing: StoreBillingSummary;
    stripe: StoreStripeSummary;
    createdAt: string;
    updatedAt: string;
};
