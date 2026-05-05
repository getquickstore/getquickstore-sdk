/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SeoPageInfo = {
    id: string;
    type: 'STORE' | 'PRODUCT' | 'SERVICE' | 'SEARCH';
    entityId?: string | null;
    slug: string;
    city?: string | null;
    country?: string | null;
    scope?: string | null;
    categoryId?: string | null;
    categoryName?: string | null;
    tagId?: string | null;
    tagName?: string | null;
    query?: string | null;
    intent?: string | null;
    timeIntent?: string | null;
    hasAvailability: boolean;
    generated: boolean;
    noindex?: boolean;
    lastBuiltAt?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
};

