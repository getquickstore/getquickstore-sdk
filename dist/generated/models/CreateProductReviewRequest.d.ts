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
