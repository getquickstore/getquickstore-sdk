import type { ProfileAddressesResponse } from '../models/ProfileAddressesResponse';
import type { ProfileAddressInput } from '../models/ProfileAddressInput';
import type { ProfileAddressResponse } from '../models/ProfileAddressResponse';
import type { ProfileOkResponse } from '../models/ProfileOkResponse';
import type { ProfileOnlyResponse } from '../models/ProfileOnlyResponse';
import type { ProfileResponse } from '../models/ProfileResponse';
import type { ProfileUpdateInput } from '../models/ProfileUpdateInput';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class ProfileService {
    /**
     * Get current user profile and addresses
     * @returns ProfileResponse Current user profile with addresses
     * @throws ApiError
     */
    static getProfile(): CancelablePromise<ProfileResponse>;
    /**
     * Update current user profile
     * @returns ProfileOnlyResponse Profile updated
     * @throws ApiError
     */
    static patchProfile({ requestBody, }: {
        requestBody: ProfileUpdateInput;
    }): CancelablePromise<ProfileOnlyResponse>;
    /**
     * List current user addresses
     * @returns ProfileAddressesResponse User addresses
     * @throws ApiError
     */
    static getProfileAddresses(): CancelablePromise<ProfileAddressesResponse>;
    /**
     * Create user address
     * @returns ProfileAddressResponse Address created
     * @throws ApiError
     */
    static postProfileAddresses({ requestBody, }: {
        requestBody: ProfileAddressInput;
    }): CancelablePromise<ProfileAddressResponse>;
    /**
     * Update user address
     * @returns ProfileAddressResponse Address updated
     * @throws ApiError
     */
    static patchProfileAddresses({ id, requestBody, }: {
        id: string;
        requestBody: ProfileAddressInput;
    }): CancelablePromise<ProfileAddressResponse>;
    /**
     * Delete user address
     * @returns ProfileOkResponse Address deleted
     * @throws ApiError
     */
    static deleteProfileAddresses({ id, }: {
        id: string;
    }): CancelablePromise<ProfileOkResponse>;
    /**
     * Set address as default shipping address
     * @returns ProfileAddressResponse Default shipping address updated
     * @throws ApiError
     */
    static postProfileAddressesDefaultShipping({ id, }: {
        id: string;
    }): CancelablePromise<ProfileAddressResponse>;
    /**
     * Set address as default billing address
     * @returns ProfileAddressResponse Default billing address updated
     * @throws ApiError
     */
    static postProfileAddressesDefaultBilling({ id, }: {
        id: string;
    }): CancelablePromise<ProfileAddressResponse>;
}
