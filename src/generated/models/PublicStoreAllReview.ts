/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type PublicStoreAllReview = {
    id: string;
    type: 'STORE' | 'PRODUCT' | 'SERVICE';
    storeId: string;
    targetId: string;
    targetTitle: string;
    targetSlug?: string | null;
    rating: number;
    comment?: string | null;
    authorName: string | null;
    createdAt?: string | null;
};

