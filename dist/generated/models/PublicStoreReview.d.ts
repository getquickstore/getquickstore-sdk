export type PublicStoreReview = {
    id: string;
    storeId: string;
    userId?: string | null;
    rating: number;
    comment?: string | null;
    authorName: string | null;
    createdAt?: string | null;
};
