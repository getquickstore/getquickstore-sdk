"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class AuthService {
    /**
     * Register a new user
     * @returns AuthSuccessResponse Registered successfully
     * @throws ApiError
     */
    static postAuthRegister({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/auth/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error`,
                409: `Email already exists`,
                500: `Register failed`,
            },
        });
    }
    /**
     * Login with email and password
     * @returns AuthSuccessResponse Logged in successfully
     * @throws ApiError
     */
    static postAuthLogin({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/auth/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error`,
                401: `Invalid credentials`,
                429: `Rate limited`,
                500: `Login failed`,
            },
        });
    }
    /**
     * Rotate refresh token and issue new token pair
     * @returns AuthSuccessResponse Tokens refreshed successfully
     * @throws ApiError
     */
    static postAuthRefresh({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/auth/refresh',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Missing refresh token`,
                401: `Invalid refresh token`,
                500: `Refresh failed`,
            },
        });
    }
    /**
     * Logout current session
     * @returns void
     * @throws ApiError
     */
    static postAuthLogout({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/auth/logout',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Get current authenticated user
     * @returns AuthMeResponse Current user profile
     * @throws ApiError
     */
    static getAuthMe() {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/auth/me',
            errors: {
                401: `Unauthorized`,
            },
        });
    }
    /**
     * List refresh token sessions
     * @returns AuthSessionListResponse List of sessions
     * @throws ApiError
     */
    static getAuthSessions() {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/auth/sessions',
            errors: {
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Revoke all active sessions for current user
     * @returns void
     * @throws ApiError
     */
    static deleteAuthSessions() {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'DELETE',
            url: '/auth/sessions',
            errors: {
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Revoke one session by id
     * @returns void
     * @throws ApiError
     */
    static deleteAuthSessions1({ id, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'DELETE',
            url: '/auth/sessions/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Request magic login link
     * @returns OkResponse Magic link requested
     * @throws ApiError
     */
    static postAuthMagicLinkRequest({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/auth/magic-link/request',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Email validation error`,
                429: `Too many requests`,
                500: `Server error`,
            },
        });
    }
    /**
     * Verify magic link by token
     * @returns AuthTokenPairOnlyResponse Magic link verified
     * @throws ApiError
     */
    static getAuthMagicLinkVerify({ token, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/auth/magic-link/verify',
            query: {
                'token': token,
            },
            errors: {
                400: `Invalid or missing token`,
            },
        });
    }
    /**
     * Verify magic link by code
     * @returns AuthTokenPairOnlyResponse Magic code verified
     * @throws ApiError
     */
    static postAuthMagicLinkVerify({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/auth/magic-link/verify',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid or missing code`,
            },
        });
    }
    /**
     * Request password reset email
     * @returns void
     * @throws ApiError
     */
    static postAuthForgotPassword({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/auth/forgot-password',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                500: `Forgot password failed`,
            },
        });
    }
    /**
     * Reset password using reset token
     * @returns void
     * @throws ApiError
     */
    static postAuthResetPassword({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/auth/reset-password',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation or token error`,
            },
        });
    }
    /**
     * Confirm password reset with token
     * @returns any Password reset completed
     * @throws ApiError
     */
    static postAuthPasswordResetConfirm({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/auth/password/reset/confirm',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input or expired token`,
                404: `User not found`,
            },
        });
    }
}
exports.AuthService = AuthService;
