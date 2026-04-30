import type { Tag } from './Tag';
export type TagListResponse = {
    items: Array<Tag>;
    total: number;
    limit: number;
    offset: number;
};
