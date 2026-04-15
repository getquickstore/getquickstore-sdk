export type Category = {
    id: string;
    storeId: string;
    name: string;
    slug: string;
    parentId: string | null;
    position: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
};
