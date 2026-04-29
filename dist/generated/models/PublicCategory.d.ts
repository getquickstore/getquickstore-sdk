export type PublicCategory = {
    id: string;
    storeId: string;
    name: string;
    slug?: string | null;
    parentId?: string | null;
    position?: number | null;
};
