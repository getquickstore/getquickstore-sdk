/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthStoreBrief } from './AuthStoreBrief';
import type { AuthUser } from './AuthUser';
export type AuthSuccessResponse = {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    user: AuthUser;
    stores: Array<AuthStoreBrief>;
    defaultStoreId?: string | null;
};

