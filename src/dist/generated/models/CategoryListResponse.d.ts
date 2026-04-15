import type { Category } from './Category';
export type CategoryListResponse = {
    items: Array<Category>;
    total: number;
    limit: number;
    offset: number;
};
