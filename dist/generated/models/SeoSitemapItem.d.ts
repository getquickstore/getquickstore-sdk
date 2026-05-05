export type SeoSitemapItem = {
    slug: string;
    type: 'STORE' | 'PRODUCT' | 'SERVICE' | 'SEARCH';
    scope?: string | null;
    intent?: string | null;
    timeIntent?: string | null;
    hasAvailability: boolean;
    updatedAt: string;
    lastBuiltAt?: string | null;
};
