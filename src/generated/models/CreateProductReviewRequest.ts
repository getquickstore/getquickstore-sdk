/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateProductReviewRequest = {
    rating: number;
    comment?: string | null;
    /**
     * Alias for comment
     */
    body?: string | null;
    /**
     * Order item ID for verified purchase review
     */
    orderItemId?: string | null;
};

