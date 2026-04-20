import type { AuthLoginRequest } from '../models/AuthLoginRequest';
import type { AuthLogoutRequest } from '../models/AuthLogoutRequest';
import type { AuthMeResponse } from '../models/AuthMeResponse';
import type { AuthRegisterRequest } from '../models/AuthRegisterRequest';
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
     * Rotate refresh cookie and issue new token pair
     * Uses the HttpOnly refresh cookie to rotate the session and issue a new token pair. No request body is required.
     * @returns AuthSuccessResponse Tokens refreshed successfully
     * @throws ApiError
     */
    static postAuthRefresh(): CancelablePromise<AuthSuccessResponse>;
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
     * Request password reset
     * Creates password reset token and sends email if user exists.
     * @returns any Request accepted
     * @throws ApiError
     */
    static postAuthPasswordResetRequest({ requestBody, }: {
        requestBody: {
            email: string;
        };
    }): CancelablePromise<{
        ok?: boolean;
    }>;
    /**
     * Confirm password reset
     * Resets the user password using a valid reset token and revokes active tokens/sessions.
     * @returns any Password reset confirmed
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
    /**
     * Change password
     * Changes password for authenticated user, preserves the current session, and revokes all other sessions.
     * @returns any Password changed
     * @throws ApiError
     */
    static postAuthPasswordChange({ requestBody, }: {
        requestBody: {
            currentPassword: string;
            newPassword: string;
        };
    }): CancelablePromise<{
        ok?: boolean;
        revokedOtherSessions?: boolean;
        preservedCurrentSession?: boolean;
    }>;
    /**
     * Request email verification
     * Creates an email verification token for an unverified user and triggers email delivery.
     * @returns any Verification request accepted
     * @throws ApiError
     */
    static postAuthEmailVerifyRequest({ requestBody, }: {
        requestBody: {
            email: string;
        };
    }): CancelablePromise<{
        ok?: boolean;
        alreadyVerified?: boolean;
    }>;
    /**
     * Confirm email verification
     * Marks the user email as verified using a valid verification token.
     * @returns any Email verified
     * @throws ApiError
     */
    static postAuthEmailVerifyConfirm({ requestBody, }: {
        requestBody: {
            token: string;
        };
    }): CancelablePromise<{
        ok?: boolean;
    }>;
    /**
     * List user sessions
     * Returns the authenticated user's sessions ordered by newest first.
     * @returns any User sessions
     * @throws ApiError
     */
    static getAuthSessions(): CancelablePromise<{
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
    }>;
    /**
     * Revoke a session or all other sessions
     * Revokes a specific session or all other active sessions for the authenticated user.
     * @returns any Session revoke completed
     * @throws ApiError
     */
    static postAuthSessionsRevoke({ requestBody, }: {
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
        };
    }): CancelablePromise<{
        ok?: boolean;
        alreadyRevoked?: boolean;
    }>;
    /**
     * Get two-factor authentication status
     * Returns current 2FA state for the authenticated user.
     * @returns any 2FA status
     * @throws ApiError
     */
    static getAuth2Fa(): CancelablePromise<{
        ok?: boolean;
        enabled?: boolean;
        method?: string | null;
        verifiedAt?: string | null;
    }>;
    /**
     * Request email change
     * Creates an email change token for the authenticated user and triggers email delivery flow.
     * @returns any Email change request accepted
     * @throws ApiError
     */
    static postAuthEmailChangeRequest({ requestBody, }: {
        requestBody: {
            newEmail: string;
        };
    }): CancelablePromise<{
        ok?: boolean;
    }>;
    /**
     * Confirm email change
     * Confirms email change using a valid token and updates the user email.
     * @returns any Email changed successfully
     * @throws ApiError
     */
    static postAuthEmailChangeConfirm({ requestBody, }: {
        requestBody: {
            token: string;
        };
    }): CancelablePromise<{
        ok: boolean;
        email: string;
    }>;
    /**
     * Start re-authentication challenge
     * Creates a re-auth challenge for a sensitive action. Returns TOTP or EMAIL_OTP challenge metadata depending on user security settings.
     * @returns any Re-auth challenge created
     * @throws ApiError
     */
    static postAuthReAuthStart({ requestBody, }: {
        requestBody: {
            action: string;
        };
    }): CancelablePromise<{
        ok: boolean;
        challengeId: string;
        method: 'TOTP' | 'EMAIL_OTP';
        expiresAt: string;
    }>;
    /**
     * Verify re-authentication challenge
     * Verifies a TOTP or EMAIL_OTP re-auth challenge for the authenticated user.
     * @returns any Re-auth challenge verified
     * @throws ApiError
     */
    static postAuthReAuthVerify({ requestBody, }: {
        requestBody: {
            challengeId: string;
            code: string;
        };
    }): CancelablePromise<{
        ok: boolean;
    }>;
    /**
     * Start TOTP two-factor setup
     * Creates a new TOTP secret for the authenticated user and returns the secret plus OTP Auth URI.
     * @returns any Two-factor setup initialized
     * @throws ApiError
     */
    static postAuth2FaSetup(): CancelablePromise<{
        ok: boolean;
        method: string;
        base32Secret: string;
        otpauthUrl: string;
    }>;
    /**
     * Confirm TOTP two-factor setup
     * Confirms a pending TOTP setup using a valid code and returns recovery codes.
     * @returns any Two-factor enabled
     * @throws ApiError
     */
    static postAuth2FaConfirm({ requestBody, }: {
        requestBody: {
            code: string;
        };
    }): CancelablePromise<{
        ok: boolean;
        recoveryCodes: Array<string>;
    }>;
    /**
     * Disable two-factor authentication
     * Disables TOTP two-factor authentication using either a current TOTP code or a recovery code.
     * @returns any Two-factor disabled
     * @throws ApiError
     */
    static postAuth2FaDisable({ requestBody, }: {
        requestBody: {
            code?: string;
            recoveryCode?: string;
        };
    }): CancelablePromise<{
        ok: boolean;
    }>;
    /**
     * Regenerate two-factor recovery codes
     * Verifies current TOTP code and replaces existing recovery codes with a new set.
     * @returns any Recovery codes regenerated
     * @throws ApiError
     */
    static postAuth2FaRecoveryCodesRegenerate({ requestBody, }: {
        requestBody: {
            code: string;
        };
    }): CancelablePromise<{
        ok: boolean;
        recoveryCodes: Array<string>;
    }>;
    /**
     * Verify login 2FA challenge
     * Verifies a login challenge using TOTP or email OTP and returns a new token pair.
     * @returns any 2FA challenge verified
     * @throws ApiError
     */
    static postAuthLogin2FaVerify({ requestBody, }: {
        requestBody: {
            challengeId: string;
            code: string;
            trustDevice?: boolean;
            deviceFingerprint?: string | null;
        };
    }): CancelablePromise<{
        ok: boolean;
        accessToken: string;
        refreshToken: string;
    }>;
    /**
     * Resend login email OTP challenge
     * Regenerates and re-sends an email OTP for a pending login challenge. Supported only for LOGIN_EMAIL_OTP challenges.
     * @returns any OTP re-sent successfully
     * @throws ApiError
     */
    static postAuthLogin2FaResend({ requestBody, }: {
        requestBody: {
            challengeId: string;
        };
    }): CancelablePromise<{
        ok: boolean;
    }>;
}
