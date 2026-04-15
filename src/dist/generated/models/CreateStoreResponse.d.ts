export type CreateStoreResponse = {
    ok?: boolean;
    store?: {
        id?: string;
        name?: string;
        slug?: string;
        status?: string;
        ownerUserId?: string;
        defaultCurrency?: string;
        defaultLanguage?: string;
        timezone?: string;
        country?: string | null;
        createdAt?: string;
    };
};
