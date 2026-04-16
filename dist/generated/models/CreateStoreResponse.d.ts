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
