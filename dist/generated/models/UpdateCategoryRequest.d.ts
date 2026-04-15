export type UpdateCategoryRequest = {
    name?: string;
    slug?: string;
    parentId?: string | null;
    position?: number;
};
