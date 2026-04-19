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
    isPublic: boolean;
};
