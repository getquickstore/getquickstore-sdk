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
     * Rotate refresh cookie and issue new token pair
     * Uses the HttpOnly refresh cookie to rotate the session and issue a new token pair. No request body is required.
     * @returns AuthSuccessResponse Tokens refreshed successfully
     * @throws ApiError
     */
    static postAuthRefresh() {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/auth/refresh',
            errors: {
                400: `Missing refresh cookie`,
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
     * Request password reset
     * Creates password reset token and sends email if user exists.
     * @returns any Request accepted
     * @throws ApiError
     */
    static postAuthPasswordResetRequest({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static postAuthPasswordResetConfirm({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
     * Changes password for authenticated user, preserves the current session, and revokes all other sessions.
     * @returns any Password changed
     * @throws ApiError
     */
    static postAuthPasswordChange({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/auth/password/change',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid current password, weak password, or new password matches old password`,
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
    static postAuthEmailVerifyRequest({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static postAuthEmailVerifyConfirm({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
     * Revoke a session or all other sessions
     * Revokes a specific session or all other active sessions for the authenticated user.
     * @returns any Session revoke completed
     * @throws ApiError
     */
    static postAuthSessionsRevoke({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static getAuth2Fa() {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static postAuthEmailChangeRequest({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static postAuthEmailChangeConfirm({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static postAuthReAuthStart({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static postAuthReAuthVerify({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static postAuth2FaSetup() {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static postAuth2FaConfirm({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static postAuth2FaDisable({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static postAuth2FaRecoveryCodesRegenerate({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static postAuthLogin2FaVerify({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static postAuthLogin2FaResend({ requestBody, }) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
exports.AuthService = AuthService;
