import { OpenAPI } from "./generated/core/OpenAPI"
import { AuthService } from "./generated/services/AuthService"
import { BillingService } from "./generated/services/BillingService"
import { BillingConnectService } from "./generated/services/BillingConnectService"
import { StoresService } from "./generated/services/StoresService"
import { ProductsService } from "./generated/services/ProductsService"
import { OrdersService } from "./generated/services/OrdersService"
import { CategoriesService } from "./generated/services/CategoriesService"

type ClientConfig = {
  baseUrl: string
  token?: string
  storeId?: string
}

let refreshPromise: Promise<void> | null = null

function isAuthError(error: any): boolean {
  return error?.status === 401 || error?.status === 403
}

function shouldSkipRefresh(error: any): boolean {
  const url = String(error?.request?.url || error?.url || "").toLowerCase()

  return (
    url.includes("/auth/login") ||
    url.includes("/auth/logout") ||
    url.includes("/auth/refresh")
  )
}

async function refreshSession(): Promise<void> {
  if (!refreshPromise) {
    refreshPromise = AuthService.postAuthRefresh()
      .then(() => undefined)
      .finally(() => {
        refreshPromise = null
      })
  }

  return refreshPromise
}

async function withAuthRetry<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn()
  } catch (error: any) {
    if (!isAuthError(error) || shouldSkipRefresh(error)) {
      throw error
    }

    await refreshSession()
    return await fn()
  }
}

export function createClient({ baseUrl, token, storeId }: ClientConfig) {
  OpenAPI.BASE = baseUrl
  OpenAPI.WITH_CREDENTIALS = true
  OpenAPI.CREDENTIALS = "include"

  OpenAPI.HEADERS = async () => ({
    Authorization: token ? `Bearer ${token}` : undefined,
  })

  return {
    auth: {
      login: (email: string, password: string) =>
        AuthService.postAuthLogin({
          requestBody: { email, password },
        }),
      
      verifyLoginTwoFactor: (data: {
        challengeId: string
        code: string
        trustDevice?: boolean
        deviceFingerprint?: string | null
      }) =>
        AuthService.postAuthLogin2FaVerify({
          requestBody: {
            challengeId: data.challengeId,
            code: data.code,
            trustDevice: data.trustDevice,
            deviceFingerprint: data.deviceFingerprint,
          },
        }),
      
      register: (name: string, email: string, password: string) =>
        AuthService.postAuthRegister({
          requestBody: { name, email, password } as any,
        }),
      
      me: () =>
        withAuthRetry(() => AuthService.getAuthMe()),
    
      refresh: () => AuthService.postAuthRefresh(),

      logout: () =>
        AuthService.postAuthLogout({}),
    
      getTwoFactorStatus: () =>
        withAuthRetry(() => AuthService.getAuth2Fa()),
    
      getSessions: () =>
        withAuthRetry(() => AuthService.getAuthSessions()),
    
      changePassword: (data: { currentPassword: string; newPassword: string }) =>
        withAuthRetry(() =>
          AuthService.postAuthPasswordChange({
            requestBody: data,
          })
        ),
      
      requestEmailVerification: (email: string) =>
        withAuthRetry(() =>
          AuthService.postAuthEmailVerifyRequest({
            requestBody: { email },
          })
        ),
      
      requestEmailChange: (newEmail: string) =>
        withAuthRetry(() =>
          AuthService.postAuthEmailChangeRequest({
            requestBody: { newEmail },
          })
        ),
      
      startTwoFactorSetup: () =>
        withAuthRetry(() => AuthService.postAuth2FaSetup()),
    
      confirmTwoFactorSetup: (code: string) =>
        withAuthRetry(() =>
          AuthService.postAuth2FaConfirm({
            requestBody: { code },
          })
        ),
      
      disableTwoFactor: (data: { code?: string; recoveryCode?: string }) =>
        withAuthRetry(() =>
          AuthService.postAuth2FaDisable({
            requestBody: data,
          })
        ),
      
      regenerateRecoveryCodes: (code: string) =>
        withAuthRetry(() =>
          AuthService.postAuth2FaRecoveryCodesRegenerate({
            requestBody: { code },
          })
        ),
      
      revokeSession: (data: {
        sessionId?: string
        revokeAllOther?: boolean
        currentSessionId?: string
      }) =>
        withAuthRetry(() =>
          AuthService.postAuthSessionsRevoke({
            requestBody: data,
          })
        ),
    },

    billing: {
      current: () =>
        withAuthRetry(() =>
          BillingService.getBillingCurrent({
            storeId: storeId || undefined,
          })
        ),
        storeCurrent: (id: string) =>
      withAuthRetry(() =>
        BillingService.getBillingStoresCurrent({ id })
      ),

      checkout: (data?: { successUrl?: string | null; cancelUrl?: string | null }) =>
        withAuthRetry(() =>
          BillingService.postBillingCheckout({
            requestBody: {
              storeId: storeId!,
              successUrl: data?.successUrl ?? null,
              cancelUrl: data?.cancelUrl ?? null,
            },
          })
        ),

      portal: (data?: { returnUrl?: string | null }) =>
        withAuthRetry(() =>
          BillingService.postBillingPortal({
            requestBody: {
              storeId: storeId!,
              returnUrl: data?.returnUrl ?? null,
            },
          })
        ),

      cancel: () =>
        withAuthRetry(() =>
          BillingService.postBillingCancel({
            requestBody: {
              storeId: storeId!,
            },
          })
        ),
    },

    stripeConnect: {
      status: () =>
        withAuthRetry(() =>
          BillingConnectService.getBillingStoresStripeConnectStatus({
            id: storeId!,
          })
        ),
        statusByStore: (id: string) =>
  withAuthRetry(() =>
    BillingConnectService.getBillingStoresStripeConnectStatus({ id })
  ),

      start: (data: { returnUrl: string; refreshUrl: string }) =>
        withAuthRetry(() =>
          BillingService.postBillingStoresStripeConnectStart({
            id: storeId!,
            requestBody: {
              returnUrl: data.returnUrl,
              refreshUrl: data.refreshUrl,
            },
          })
        ),

      sync: () =>
        withAuthRetry(() =>
          BillingConnectService.postBillingStoresStripeConnectSync({
            id: storeId!,
          })
        ),
    },

    stores: {
      create: (data: any) =>
        withAuthRetry(() =>
          StoresService.postStores({
            requestBody: data,
          })
        ),
      
      me: () =>
        withAuthRetry(() => StoresService.getStoresMe()),
    
      select: (id: string) =>
        withAuthRetry(() =>
          StoresService.postStoresSelect({ id })
        ),
        setVisibility: (id: string, isPublic: boolean) =>
  withAuthRetry(() =>
    StoresService.patchStoresVisibility({
      id,
      requestBody: { isPublic },
    })
  ),
    },

    categories: {
      list: () =>
        withAuthRetry(() =>
          CategoriesService.getCategories({
            xStoreId: storeId!,
          })
        ),

      create: (data: any) =>
        withAuthRetry(() =>
          CategoriesService.postCategories({
            requestBody: data,
            xStoreId: storeId!,
          })
        ),
    },

    products: {
      list: () =>
        withAuthRetry(() =>
          ProductsService.getProducts({
            xStoreId: storeId!,
          })
        ),

      get: (id: string) =>
        withAuthRetry(() =>
          ProductsService.getProducts1({
            id,
            xStoreId: storeId!,
          })
        ),

      create: (data: any) =>
        withAuthRetry(() =>
          ProductsService.postProducts({
            requestBody: data,
            xStoreId: storeId!,
          })
        ),
    },

    orders: {
      list: () =>
        withAuthRetry(() =>
          OrdersService.getOrders({
            xStoreId: storeId!,
          })
        ),

      get: (id: string) =>
        withAuthRetry(() =>
          OrdersService.getOrders1({
            id,
            xStoreId: storeId!,
          })
        ),

      create: (data: any) =>
        withAuthRetry(() =>
          OrdersService.postOrders({
            requestBody: data,
            xStoreId: storeId!,
          })
        ),
    },
  }
}