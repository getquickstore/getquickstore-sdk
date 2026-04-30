/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateServiceRequest = {
    name: string;
    description?: string | null;
    durationMin: number;
    price: number;
    currency?: string | null;
    isActive?: boolean;
    /**
     * Existing tag ids to attach to the service.
     */
    tagIds?: Array<string>;
    /**
     * Tag names to create or reuse by slug, then attach to the service.
     */
    tagNames?: Array<string>;
};

