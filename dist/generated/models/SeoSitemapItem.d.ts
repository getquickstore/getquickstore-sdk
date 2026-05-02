export type SeoSitemapItem = {
    slug: string;
    type: 'STORE' | 'PRODUCT' | 'SERVICE' | 'SEARCH';
    updatedAt: string;
    lastBuiltAt?: string | null;
};
