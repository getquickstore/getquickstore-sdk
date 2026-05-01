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
