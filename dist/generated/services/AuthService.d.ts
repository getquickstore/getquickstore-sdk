import type { AuthLoginRequest } from '../models/AuthLoginRequest';
import type { AuthLogoutRequest } from '../models/AuthLogoutRequest';
import type { AuthMeResponse } from '../models/AuthMeResponse';
import type { AuthRefreshRequest } from '../models/AuthRefreshRequest';
import type { AuthRegisterRequest } from '../models/AuthRegisterRequest';
import type { AuthSessionListResponse } from '../models/AuthSessionListResponse';
import type { AuthSuccessResponse } from '../models/AuthSuccessResponse';
import type { AuthTokenPairOnlyResponse } from '../models/AuthTokenPairOnlyResponse';
import type { ForgotPasswordRequest } from '../models/ForgotPasswordRequest';
import type { MagicLinkRequest } from '../models/MagicLinkRequest';
import type { MagicLinkVerifyRequest } from '../models/MagicLinkVerifyRequest';
import type { OkResponse } from '../models/OkResponse';
import type { ResetPasswordRequest } from '../models/ResetPasswordRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class AuthService {
    /**
     * Register a new user
     * @returns AuthSuccessResponse Registered successfully
     * @throws ApiError
     */
    static postAuthRegister({ requestBody, }: {
        requestBody: AuthRegisterRequest;
    }): CancelablePromise<AuthSuccessResponse>;
    /**
     * Login with email and password
     * @returns AuthSuccessResponse Logged in successfully
     * @throws ApiError
     */
    static postAuthLogin({ requestBody, }: {
        requestBody: AuthLoginRequest;
    }): CancelablePromise<AuthSuccessResponse>;
    /**
     * Rotate refresh token and issue new token pair
     * @returns AuthSuccessResponse Tokens refreshed successfully
     * @throws ApiError
     */
    static postAuthRefresh({ requestBody, }: {
        requestBody: AuthRefreshRequest;
    }): CancelablePromise<AuthSuccessResponse>;
    /**
     * Logout current session
     * @returns void
     * @throws ApiError
     */
    static postAuthLogout({ requestBody, }: {
        requestBody?: AuthLogoutRequest;
    }): CancelablePromise<void>;
    /**
     * Get current authenticated user
     * @returns AuthMeResponse Current user profile
     * @throws ApiError
     */
    static getAuthMe(): CancelablePromise<AuthMeResponse>;
    /**
     * List refresh token sessions
     * @returns AuthSessionListResponse List of sessions
     * @throws ApiError
     */
    static getAuthSessions(): CancelablePromise<AuthSessionListResponse>;
    /**
     * Revoke all active sessions for current user
     * @returns void
     * @throws ApiError
     */
    static deleteAuthSessions(): CancelablePromise<void>;
    /**
     * Revoke one session by id
     * @returns void
     * @throws ApiError
     */
    static deleteAuthSessions1({ id, }: {
        id: string;
    }): CancelablePromise<void>;
    /**
     * Request magic login link
     * @returns OkResponse Magic link requested
     * @throws ApiError
     */
    static postAuthMagicLinkRequest({ requestBody, }: {
        requestBody: MagicLinkRequest;
    }): CancelablePromise<OkResponse>;
    /**
     * Verify magic link by token
     * @returns AuthTokenPairOnlyResponse Magic link verified
     * @throws ApiError
     */
    static getAuthMagicLinkVerify({ token, }: {
        token: string;
    }): CancelablePromise<AuthTokenPairOnlyResponse>;
    /**
     * Verify magic link by code
     * @returns AuthTokenPairOnlyResponse Magic code verified
     * @throws ApiError
     */
    static postAuthMagicLinkVerify({ requestBody, }: {
        requestBody: MagicLinkVerifyRequest;
    }): CancelablePromise<AuthTokenPairOnlyResponse>;
    /**
     * Request password reset email
     * @returns void
     * @throws ApiError
     */
    static postAuthForgotPassword({ requestBody, }: {
        requestBody?: ForgotPasswordRequest;
    }): CancelablePromise<void>;
    /**
     * Reset password using reset token
     * @returns void
     * @throws ApiError
     */
    static postAuthResetPassword({ requestBody, }: {
        requestBody: ResetPasswordRequest;
    }): CancelablePromise<void>;
    /**
     * Confirm password reset with token
     * @returns any Password reset completed
     * @throws ApiError
     */
    static postAuthPasswordResetConfirm({ requestBody, }: {
        requestBody: {
            token: string;
            newPassword: string;
        };
    }): CancelablePromise<{
        ok?: boolean;
    }>;
}
