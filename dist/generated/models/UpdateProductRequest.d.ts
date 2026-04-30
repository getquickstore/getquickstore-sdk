export type UpdateProductRequest = {
    brandId?: string | null;
    name?: string;
    slug?: string;
    sku?: string | null;
    description?: string | null;
    status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
    /**
     * Human-readable price. Converted to priceCents if priceCents is not provided.
     */
    price?: number | null;
    /**
     * Price in minor units. Has priority over price.
     */
    priceCents?: number | null;
    currency?: string;
    metaTitle?: string | null;
    metaDescription?: string | null;
    noindex?: boolean;
    tagIds?: Array<string>;
    tagNames?: Array<string>;
};
