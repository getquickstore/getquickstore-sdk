export type UpdateServiceRequest = {
    name?: string;
    description?: string | null;
    durationMin?: number;
    price?: number;
    currency?: string | null;
    isActive?: boolean;
    /**
     * Existing tag ids to attach. If tagIds or tagNames is provided, service tags are replaced.
     */
    tagIds?: Array<string>;
    /**
     * Tag names to create or reuse by slug. If tagIds or tagNames is provided, service tags are replaced.
     */
    tagNames?: Array<string>;
};
