/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateCategoryRequest = {
    name: string;
    /**
     * Optional custom slug. If omitted, generated from name
     */
    slug?: string;
    parentId?: string | null;
    position?: number;
};

