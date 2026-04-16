export type UpdateStoreRequest = {
    name?: string;
    defaultCurrency?: string;
    defaultLanguage?: string;
    timezone?: string;
    country?: string | null;
};
