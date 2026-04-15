/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthStoreBrief } from './AuthStoreBrief';
export type AuthMeResponse = {
    id: string;
    email: string;
    roles: Array<string>;
    defaultStoreId?: string | null;
    stores: Array<AuthStoreBrief>;
};

