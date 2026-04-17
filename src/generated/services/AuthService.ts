/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthLoginRequest } from '../models/AuthLoginRequest';
import type { AuthLogoutRequest } from '../models/AuthLogoutRequest';
import type { AuthMeResponse } from '../models/AuthMeResponse';
import type { AuthRefreshRequest } from '../models/AuthRefreshRequest';
import type { AuthRegisterRequest } from '../models/AuthRegisterRequest';
import type { AuthSuccessResponse } from '../models/AuthSuccessResponse';
import type { AuthTokenPairOnlyResponse } from '../models/AuthTokenPairOnlyResponse';
import type { ForgotPasswordRequest } from '../models/ForgotPasswordRequest';
import type { MagicLinkRequest } from '../models/MagicLinkRequest';
import type { MagicLinkVerifyRequest } from '../models/MagicLinkVerifyRequest';
import type { OkResponse } from '../models/OkResponse';
import type { ResetPasswordRequest } from '../models/ResetPasswordRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * Register a new user
     * @returns AuthSuccessResponse Registered successfully
     * @throws ApiError
     */
    public static postAuthRegister({
        requestBody,
    }: {
        requestBody: AuthRegisterRequest,
    }): CancelablePromise<AuthSuccessResponse> {
        return __request(OpenAPI, {
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
    public static postAuthLogin({
        requestBody,
    }: {
        requestBody: AuthLoginRequest,
    }): CancelablePromise<AuthSuccessResponse> {
        return __request(OpenAPI, {
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
    public static postAuthRefresh({
        requestBody,
    }: {
        requestBody: AuthRefreshRequest,
    }): CancelablePromise<AuthSuccessResponse> {
        return __request(OpenAPI, {
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
    public static postAuthLogout({
        requestBody,
    }: {
        requestBody?: AuthLogoutRequest,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
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
    public static getAuthMe(): CancelablePromise<AuthMeResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/me',
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
    public static postAuthMagicLinkRequest({
        requestBody,
    }: {
        requestBody: MagicLinkRequest,
    }): CancelablePromise<OkResponse> {
        return __request(OpenAPI, {
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
    public static getAuthMagicLinkVerify({
        token,
    }: {
        token: string,
    }): CancelablePromise<AuthTokenPairOnlyResponse> {
        return __request(OpenAPI, {
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
    public static postAuthMagicLinkVerify({
        requestBody,
    }: {
        requestBody: MagicLinkVerifyRequest,
    }): CancelablePromise<AuthTokenPairOnlyResponse> {
        return __request(OpenAPI, {
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
    public static postAuthForgotPassword({
        requestBody,
    }: {
        requestBody?: ForgotPasswordRequest,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
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
    public static postAuthResetPassword({
        requestBody,
    }: {
        requestBody: ResetPasswordRequest,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
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
     * Confirm password reset
     * Resets the user password using a valid reset token and revokes active tokens/sessions.
     * @returns any Password reset confirmed
     * @throws ApiError
     */
    public static postAuthPasswordResetConfirm({
        requestBody,
    }: {
        requestBody: {
            token: string;
            newPassword: string;
        },
    }): CancelablePromise<{
        ok?: boolean;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/password/reset/confirm',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request or expired token`,
                404: `User not found`,
            },
        });
    }
}
