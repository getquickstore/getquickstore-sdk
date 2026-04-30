export type ServiceReview = {
    id: string;
    serviceId: string;
    userId?: string | null;
    rating: number;
    comment?: string | null;
    isFlagged: boolean;
    createdAt: string;
    updatedAt: string;
};
