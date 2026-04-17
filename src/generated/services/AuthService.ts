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
     * Request password reset
     * Creates password reset token and sends email if user exists.
     * @returns any Request accepted
     * @throws ApiError
     */
    public static postAuthPasswordResetRequest({
        requestBody,
    }: {
        requestBody: {
            email: string;
        },
    }): CancelablePromise<{
        ok?: boolean;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/password/reset/request',
            body: requestBody,
            mediaType: 'application/json',
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
    /**
     * Change password
     * Changes password for authenticated user and revokes all sessions.
     * @returns any Password changed
     * @throws ApiError
     */
    public static postAuthPasswordChange({
        requestBody,
    }: {
        requestBody: {
            currentPassword: string;
            newPassword: string;
        },
    }): CancelablePromise<{
        ok?: boolean;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/password/change',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid current password or weak password`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Request email verification
     * Creates an email verification token for an unverified user and triggers email delivery.
     * @returns any Verification request accepted
     * @throws ApiError
     */
    public static postAuthEmailVerifyRequest({
        requestBody,
    }: {
        requestBody: {
            email: string;
        },
    }): CancelablePromise<{
        ok?: boolean;
        alreadyVerified?: boolean;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/email/verify/request',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Email is required`,
            },
        });
    }
    /**
     * Confirm email verification
     * Marks the user email as verified using a valid verification token.
     * @returns any Email verified
     * @throws ApiError
     */
    public static postAuthEmailVerifyConfirm({
        requestBody,
    }: {
        requestBody: {
            token: string;
        },
    }): CancelablePromise<{
        ok?: boolean;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/email/verify/confirm',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid or expired token`,
            },
        });
    }
    /**
     * List user sessions
     * Returns the authenticated user's sessions ordered by newest first.
     * @returns any User sessions
     * @throws ApiError
     */
    public static getAuthSessions(): CancelablePromise<{
        ok?: boolean;
        items?: Array<{
            id?: string;
            status?: string | null;
            ip?: string | null;
            userAgent?: string | null;
            deviceFingerprint?: string | null;
            isTrusted?: boolean | null;
            createdAt?: string;
            lastSeenAt?: string | null;
            expiresAt?: string | null;
            revokedAt?: string | null;
            revokeReason?: string | null;
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/sessions',
            errors: {
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Revoke a session or all other sessions
     * Revokes a specific session or all other active sessions for the authenticated user.
     * @returns any Session revoke completed
     * @throws ApiError
     */
    public static postAuthSessionsRevoke({
        requestBody,
    }: {
        requestBody?: {
            /**
             * Specific session id to revoke
             */
            sessionId?: string;
            revokeAllOther?: boolean;
            /**
             * Current session id to keep active when revokeAllOther=true
             */
            currentSessionId?: string;
        },
    }): CancelablePromise<{
        ok?: boolean;
        alreadyRevoked?: boolean;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/sessions/revoke',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Session id required or bad request`,
                401: `Unauthorized`,
                404: `Session not found`,
            },
        });
    }
    /**
     * Get two-factor authentication status
     * Returns current 2FA state for the authenticated user.
     * @returns any 2FA status
     * @throws ApiError
     */
    public static getAuth2Fa(): CancelablePromise<{
        ok?: boolean;
        enabled?: boolean;
        method?: string | null;
        verifiedAt?: string | null;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/2fa',
            errors: {
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Request email change
     * Creates an email change token for the authenticated user and triggers email delivery flow.
     * @returns any Email change request accepted
     * @throws ApiError
     */
    public static postAuthEmailChangeRequest({
        requestBody,
    }: {
        requestBody: {
            newEmail: string;
        },
    }): CancelablePromise<{
        ok?: boolean;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/email/change/request',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Missing or invalid new email`,
                401: `Unauthorized`,
                404: `User not found`,
                409: `Email already in use`,
            },
        });
    }
    /**
     * Confirm email change
     * Confirms email change using a valid token and updates the user email.
     * @returns any Email changed successfully
     * @throws ApiError
     */
    public static postAuthEmailChangeConfirm({
        requestBody,
    }: {
        requestBody: {
            token: string;
        },
    }): CancelablePromise<{
        ok: boolean;
        email: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/email/change/confirm',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Missing token or invalid / expired token`,
                409: `Email already in use`,
            },
        });
    }
    /**
     * Start re-authentication challenge
     * Creates a re-auth challenge for a sensitive action. Returns TOTP or EMAIL_OTP challenge metadata depending on user security settings.
     * @returns any Re-auth challenge created
     * @throws ApiError
     */
    public static postAuthReAuthStart({
        requestBody,
    }: {
        requestBody: {
            action: string;
        },
    }): CancelablePromise<{
        ok: boolean;
        challengeId: string;
        method: 'TOTP' | 'EMAIL_OTP';
        expiresAt: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/re-auth/start',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Action is required`,
                401: `Unauthorized`,
                404: `User not found`,
            },
        });
    }
    /**
     * Verify re-authentication challenge
     * Verifies a TOTP or EMAIL_OTP re-auth challenge for the authenticated user.
     * @returns any Re-auth challenge verified
     * @throws ApiError
     */
    public static postAuthReAuthVerify({
        requestBody,
    }: {
        requestBody: {
            challengeId: string;
            code: string;
        },
    }): CancelablePromise<{
        ok: boolean;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/re-auth/verify',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request, challenge expired, or invalid code`,
                401: `Unauthorized`,
                404: `Challenge not found`,
            },
        });
    }
    /**
     * Start TOTP two-factor setup
     * Creates a new TOTP secret for the authenticated user and returns the secret plus OTP Auth URI.
     * @returns any Two-factor setup initialized
     * @throws ApiError
     */
    public static postAuth2FaSetup(): CancelablePromise<{
        ok: boolean;
        method: string;
        base32Secret: string;
        otpauthUrl: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/2fa/setup',
            errors: {
                401: `Unauthorized`,
                404: `User not found`,
            },
        });
    }
    /**
     * Confirm TOTP two-factor setup
     * Confirms a pending TOTP setup using a valid code and returns recovery codes.
     * @returns any Two-factor enabled
     * @throws ApiError
     */
    public static postAuth2FaConfirm({
        requestBody,
    }: {
        requestBody: {
            code: string;
        },
    }): CancelablePromise<{
        ok: boolean;
        recoveryCodes: Array<string>;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/2fa/confirm',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Code missing or invalid`,
                401: `Unauthorized`,
                404: `Two-factor setup not found`,
            },
        });
    }
    /**
     * Disable two-factor authentication
     * Disables TOTP two-factor authentication using either a current TOTP code or a recovery code.
     * @returns any Two-factor disabled
     * @throws ApiError
     */
    public static postAuth2FaDisable({
        requestBody,
    }: {
        requestBody: {
            code?: string;
            recoveryCode?: string;
        },
    }): CancelablePromise<{
        ok: boolean;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/2fa/disable',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Missing credentials or invalid code`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Regenerate two-factor recovery codes
     * Verifies current TOTP code and replaces existing recovery codes with a new set.
     * @returns any Recovery codes regenerated
     * @throws ApiError
     */
    public static postAuth2FaRecoveryCodesRegenerate({
        requestBody,
    }: {
        requestBody: {
            code: string;
        },
    }): CancelablePromise<{
        ok: boolean;
        recoveryCodes: Array<string>;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/2fa/recovery-codes/regenerate',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Code missing or invalid`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Verify login 2FA challenge
     * Verifies a login challenge using TOTP or email OTP and returns a new token pair.
     * @returns any 2FA challenge verified
     * @throws ApiError
     */
    public static postAuthLogin2FaVerify({
        requestBody,
    }: {
        requestBody: {
            challengeId: string;
            code: string;
            trustDevice?: boolean;
            deviceFingerprint?: string | null;
        },
    }): CancelablePromise<{
        ok: boolean;
        accessToken: string;
        refreshToken: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/login/2fa/verify',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Missing fields, expired challenge, or invalid code`,
            },
        });
    }
    /**
     * Resend login email OTP challenge
     * Regenerates and re-sends an email OTP for a pending login challenge. Supported only for LOGIN_EMAIL_OTP challenges.
     * @returns any OTP re-sent successfully
     * @throws ApiError
     */
    public static postAuthLogin2FaResend({
        requestBody,
    }: {
        requestBody: {
            challengeId: string;
        },
    }): CancelablePromise<{
        ok: boolean;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/login/2fa/resend',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Missing challenge id, unsupported type, or expired challenge`,
                404: `Challenge or user not found`,
            },
        });
    }
}
