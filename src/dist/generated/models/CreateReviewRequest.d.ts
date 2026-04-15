export type CreateReviewRequest = {
    rating: number;
    comment?: string | null;
    /**
     * Alias for comment
     */
    body?: string | null;
};
