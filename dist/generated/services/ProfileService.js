"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class ProfileService {
    /**
     * Get current user profile, addresses and push preferences
     * @returns ProfileResponse Current user profile with addresses and push preferences
     * @throws ApiError
     */
    static getProfile() {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/profile',
        });
    }
    /**
     * Update current user profile
     * @returns ProfileOnlyResponse Profile updated
     * @throws ApiError
     */
    static patchProfile({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static patchProfilePushPreferences({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'PATCH',
            url: '/profile/push-preferences',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Register current user push device
     * @returns ProfilePushDeviceResponse Push device registered
     * @throws ApiError
     */
    static postProfilePushDeviceRegister({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/profile/push-device/register',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * List current user addresses
     * @returns ProfileAddressesResponse User addresses
     * @throws ApiError
     */
    static getProfileAddresses() {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/profile/addresses',
        });
    }
    /**
     * Create user address
     * @returns ProfileAddressResponse Address created
     * @throws ApiError
     */
    static postProfileAddresses({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static patchProfileAddresses({ id, requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static deleteProfileAddresses({ id, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static postProfileAddressesDefaultShipping({ id, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static postProfileAddressesDefaultBilling({ id, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/profile/addresses/{id}/default-billing',
            path: {
                'id': id,
            },
        });
    }
}
exports.ProfileService = ProfileService;
