export type SeoPageInfo = {
    id: string;
    type: 'STORE' | 'PRODUCT' | 'SERVICE' | 'SEARCH';
    entityId?: string | null;
    slug: string;
    city?: string | null;
    country?: string | null;
    generated: boolean;
    lastBuiltAt?: string | null;
    updatedAt?: string | null;
};
