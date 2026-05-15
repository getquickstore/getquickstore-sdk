/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProfileAddressesResponse } from '../models/ProfileAddressesResponse';
import type { ProfileAddressInput } from '../models/ProfileAddressInput';
import type { ProfileAddressResponse } from '../models/ProfileAddressResponse';
import type { ProfileOkResponse } from '../models/ProfileOkResponse';
import type { ProfileOnlyResponse } from '../models/ProfileOnlyResponse';
import type { ProfilePushPreferencesInput } from '../models/ProfilePushPreferencesInput';
import type { ProfilePushPreferencesResponse } from '../models/ProfilePushPreferencesResponse';
import type { ProfileResponse } from '../models/ProfileResponse';
import type { ProfileUpdateInput } from '../models/ProfileUpdateInput';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProfileService {
    /**
     * Get current user profile, addresses and push preferences
     * @returns ProfileResponse Current user profile with addresses and push preferences
     * @throws ApiError
     */
    public static getProfile(): CancelablePromise<ProfileResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/profile',
        });
    }
    /**
     * Update current user profile
     * @returns ProfileOnlyResponse Profile updated
     * @throws ApiError
     */
    public static patchProfile({
        requestBody,
    }: {
        requestBody: ProfileUpdateInput,
    }): CancelablePromise<ProfileOnlyResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/profile',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Update current user global push preferences
     * @returns ProfilePushPreferencesResponse Push preferences updated
     * @throws ApiError
     */
    public static patchProfilePushPreferences({
        requestBody,
    }: {
        requestBody: ProfilePushPreferencesInput,
    }): CancelablePromise<ProfilePushPreferencesResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/profile/push-preferences',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * List current user addresses
     * @returns ProfileAddressesResponse User addresses
     * @throws ApiError
     */
    public static getProfileAddresses(): CancelablePromise<ProfileAddressesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/profile/addresses',
        });
    }
    /**
     * Create user address
     * @returns ProfileAddressResponse Address created
     * @throws ApiError
     */
    public static postProfileAddresses({
        requestBody,
    }: {
        requestBody: ProfileAddressInput,
    }): CancelablePromise<ProfileAddressResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/profile/addresses',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Update user address
     * @returns ProfileAddressResponse Address updated
     * @throws ApiError
     */
    public static patchProfileAddresses({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: ProfileAddressInput,
    }): CancelablePromise<ProfileAddressResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/profile/addresses/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Address not found`,
            },
        });
    }
    /**
     * Delete user address
     * @returns ProfileOkResponse Address deleted
     * @throws ApiError
     */
    public static deleteProfileAddresses({
        id,
    }: {
        id: string,
    }): CancelablePromise<ProfileOkResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/profile/addresses/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Address not found`,
            },
        });
    }
    /**
     * Set address as default shipping address
     * @returns ProfileAddressResponse Default shipping address updated
     * @throws ApiError
     */
    public static postProfileAddressesDefaultShipping({
        id,
    }: {
        id: string,
    }): CancelablePromise<ProfileAddressResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/profile/addresses/{id}/default-shipping',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Set address as default billing address
     * @returns ProfileAddressResponse Default billing address updated
     * @throws ApiError
     */
    public static postProfileAddressesDefaultBilling({
        id,
    }: {
        id: string,
    }): CancelablePromise<ProfileAddressResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/profile/addresses/{id}/default-billing',
            path: {
                'id': id,
            },
        });
    }
}
