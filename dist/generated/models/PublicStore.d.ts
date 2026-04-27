export type PublicStore = {
    id: string;
    name: string;
    slug: string;
    logoUrl?: string | null;
    description?: string | null;
    country?: string | null;
    city?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    distanceKm?: number | null;
};
