export type Review = {
    id: string;
    productId: string;
    userId: string | null;
    rating: number;
    comment: string | null;
    isFlagged: boolean;
    createdAt: string;
    updatedAt: string;
};
