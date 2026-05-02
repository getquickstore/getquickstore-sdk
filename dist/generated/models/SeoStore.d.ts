export type SeoStore = {
    id?: string;
    name?: string;
    slug?: string;
    description?: string | null;
    logoUrl?: string | null;
    city?: string | null;
    country?: string | null;
    ratingAvg?: number;
    reviewCount?: number;
    isPublic?: boolean;
};
