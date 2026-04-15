export type StoreOwnerView = {
    id?: string;
    name?: string;
    slug?: string;
    status?: string;
    defaultCurrency?: string;
    defaultLanguage?: string;
    timezone?: string;
    country?: string | null;
    createdAt?: string;
    role?: string;
    isDefault?: boolean;
};
