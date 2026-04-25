import { OpenAPI } from "./generated/core/OpenAPI"
import { AuthService } from "./generated/services/AuthService"
import { AvailabilityService } from "./generated/services/AvailabilityService"
import { BillingService } from "./generated/services/BillingService"
import { BillingConnectService } from "./generated/services/BillingConnectService"
import { BookingsService } from "./generated/services/BookingsService"
import { CalendarService } from "./generated/services/CalendarService"
import { CartService } from "./generated/services/CartService"
import { CategoriesService } from "./generated/services/CategoriesService"
import { OrdersService } from "./generated/services/OrdersService"
import { PaymentsService } from "./generated/services/PaymentsService"
import { ProductImagesService } from "./generated/services/ProductImagesService"
import { ProductsService } from "./generated/services/ProductsService"
import { ReviewsService } from "./generated/services/ReviewsService"
import { StoresService } from "./generated/services/StoresService"
import { ServicesService } from "./generated/services/ServicesService"
import type { CreateOrderRequest } from "./generated/models/CreateOrderRequest"
import type { UpdateOrderStatusRequest } from "./generated/models/UpdateOrderStatusRequest"

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
    refreshPromise = AuthService.postAuthRefresh({
      requestBody: {},
    })
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
    "x-store-id": storeId || undefined,
  })

  const requireStoreId = (value?: string) => {
    const resolved = value || storeId
    if (!resolved) {
      throw new Error("storeId is required in client")
    }
    return resolved
  }

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

      resendLoginTwoFactor: (challengeId: string) =>
        AuthService.postAuthLogin2FaResend({
          requestBody: { challengeId },
        }),

      register: (name: string, email: string, password: string) =>
        AuthService.postAuthRegister({
          requestBody: { name, email, password } as any,
        }),

      me: () => withAuthRetry(() => AuthService.getAuthMe()),

      refresh: (refreshToken?: string) =>
  AuthService.postAuthRefresh({
    requestBody: refreshToken ? { refreshToken } : {},
  }),

      logout: (data?: { refreshToken?: string | null }) =>
  AuthService.postAuthLogout({
    requestBody: data || {},
  }),
      
           createWebHandoff: (data?: { nextPath?: string }) =>
        withAuthRetry(() =>
          AuthService.postAuthWebHandoff({
            requestBody: {
              ...(data?.nextPath ? { nextPath: data.nextPath } : {}),
            },
          })
        ),

      magicLinkRequest: (email: string) =>
        AuthService.postAuthMagicLinkRequest({
          requestBody: { email },
        }),

      magicLinkVerifyByToken: (token: string) =>
        AuthService.getAuthMagicLinkVerify({ token }),

      magicLinkVerifyByCode: (data: { email?: string; code: string }) =>
        AuthService.postAuthMagicLinkVerify({
          requestBody: data as any,
        }),

      forgotPassword: (email: string) =>
        AuthService.postAuthForgotPassword({
          requestBody: { email },
        }),

      resetPassword: (data: { token: string; password: string }) =>
        AuthService.postAuthResetPassword({
          requestBody: data as any,
        }),

      requestPasswordReset: (email: string) =>
        AuthService.postAuthPasswordResetRequest({
          requestBody: { email },
        }),

      confirmPasswordReset: (data: { token: string; newPassword: string }) =>
        AuthService.postAuthPasswordResetConfirm({
          requestBody: data,
        }),

      getTwoFactorStatus: () =>
        withAuthRetry(() => AuthService.getAuth2Fa()),

      getSessions: () =>
        withAuthRetry(() => AuthService.getAuthSessions()),

      changePassword: (data: {
        currentPassword: string
        newPassword: string
      }) =>
        withAuthRetry(() =>
          AuthService.postAuthPasswordChange({
            requestBody: data,
          })
        ),

      confirmEmailVerification: (token: string) =>
        AuthService.postAuthEmailVerifyConfirm({
          requestBody: { token },
        }),

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

      confirmEmailChange: (token: string) =>
        AuthService.postAuthEmailChangeConfirm({
          requestBody: { token },
        }),

      startReAuth: (action: string) =>
        withAuthRetry(() =>
          AuthService.postAuthReAuthStart({
            requestBody: { action },
          })
        ),

      verifyReAuth: (data: { challengeId: string; code: string }) =>
        withAuthRetry(() =>
          AuthService.postAuthReAuthVerify({
            requestBody: data,
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

    availability: {
      upsert: (data: any) =>
        withAuthRetry(() =>
          AvailabilityService.postAvailability({
            requestBody: data,
          })
        ),
    },

    billing: {
      current: () =>
        withAuthRetry(() =>
          BillingService.getBillingCurrent({
            xStoreId: storeId || undefined,
            storeId: storeId || undefined,
          })
        ),

      storeCurrent: (id: string) =>
        withAuthRetry(() =>
          BillingService.getBillingStoresCurrent({ id })
        ),

      checkout: (data: {
        storeId?: string
        successUrl?: string
        cancelUrl?: string
      }) => {
        const resolvedStoreId = requireStoreId(data.storeId)

        return withAuthRetry(() =>
          BillingService.postBillingCheckout({
            requestBody: {
              storeId: resolvedStoreId,
              ...(data.successUrl ? { successUrl: data.successUrl } : {}),
              ...(data.cancelUrl ? { cancelUrl: data.cancelUrl } : {}),
            },
          })
        )
      },

      portal: (data: {
        storeId?: string
        returnUrl?: string
      }) => {
        const resolvedStoreId = requireStoreId(data.storeId)

        return withAuthRetry(() =>
          BillingService.postBillingPortal({
            requestBody: {
              storeId: resolvedStoreId,
              ...(data.returnUrl ? { returnUrl: data.returnUrl } : {}),
            },
          })
        )
      },

      cancel: (data: { storeId?: string }) => {
        const resolvedStoreId = requireStoreId(data.storeId)

        return withAuthRetry(() =>
          BillingService.postBillingCancel({
            requestBody: {
              storeId: resolvedStoreId,
            },
          })
        )
      },
    },

    stripeConnect: {
      status: () =>
        withAuthRetry(() =>
          BillingConnectService.getBillingStoresStripeConnectStatus({
            id: requireStoreId(),
          })
        ),

      disconnect: (id: string) =>
        withAuthRetry(() =>
          BillingConnectService.postBillingStoresStripeDisconnect({ id })
        ),

      statusByStore: (id: string) =>
        withAuthRetry(() =>
          BillingConnectService.getBillingStoresStripeConnectStatus({ id })
        ),

      start: (data: { returnUrl: string; refreshUrl: string }) =>
        withAuthRetry(() =>
          BillingService.postBillingStoresStripeConnectStart({
            id: requireStoreId(),
            requestBody: {
              returnUrl: data.returnUrl,
              refreshUrl: data.refreshUrl,
            },
          })
        ),

      sync: () =>
        withAuthRetry(() =>
          BillingConnectService.postBillingStoresStripeConnectSync({
            id: requireStoreId(),
          })
        ),
    },

    bookings: {
      list: (params?: {
        status?: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED"
        serviceId?: string
        dateFrom?: string
        dateTo?: string
        storeId?: string
      }) =>
        withAuthRetry(() =>
          BookingsService.getBookings({
            xStoreId: params?.storeId || storeId,
            status: params?.status,
            serviceId: params?.serviceId,
            dateFrom: params?.dateFrom,
            dateTo: params?.dateTo,
          })
        ),

      create: (data: any, customStoreId?: string) =>
        withAuthRetry(() =>
          BookingsService.postBookings({
            requestBody: data,
            xStoreId: customStoreId || storeId,
          })
        ),

      get: (id: string, customStoreId?: string) =>
        withAuthRetry(() =>
          BookingsService.getBookings1({
            id,
            xStoreId: customStoreId || storeId,
          })
        ),

      update: (id: string, data: any, customStoreId?: string) =>
        withAuthRetry(() =>
          BookingsService.patchBookings({
            id,
            requestBody: data,
            xStoreId: customStoreId || storeId,
          })
        ),

      cancel: (id: string, customStoreId?: string) =>
        withAuthRetry(() =>
          BookingsService.postBookingsCancel({
            id,
            xStoreId: customStoreId || storeId,
          })
        ),
    },

    calendar: {
      getDay: (date: string) =>
        withAuthRetry(() =>
          CalendarService.getCalendarDay({ date })
        ),
    },

cart: {
  get: () =>
    withAuthRetry(() =>
      CartService.getCart()
    ),

  add: (data: any) =>
    withAuthRetry(() =>
      CartService.postCartAdd({
        requestBody: data,
      })
    ),

  setQty: (data: any) =>
    withAuthRetry(() =>
      CartService.postCartSetQty({
        requestBody: data,
      })
    ),

  remove: (data: any) =>
    withAuthRetry(() =>
      CartService.postCartRemove({
        requestBody: data,
      })
    ),

  clear: () =>
    withAuthRetry(() =>
      CartService.postCartClear()
    ),
},

    categories: {
      list: (params?: {
        limit?: number
        offset?: number
        q?: string
        storeId?: string
      }) =>
        withAuthRetry(() =>
          CategoriesService.getCategories({
            xStoreId: params?.storeId || storeId,
            limit: params?.limit,
            offset: params?.offset,
            q: params?.q,
          })
        ),

      create: (data: any, customStoreId?: string) =>
        withAuthRetry(() =>
          CategoriesService.postCategories({
            requestBody: data,
            xStoreId: customStoreId || storeId,
          })
        ),

      update: (id: string, data: any, customStoreId?: string) =>
        withAuthRetry(() =>
          CategoriesService.patchCategories({
            id,
            requestBody: data,
            xStoreId: customStoreId || storeId,
          })
        ),

      delete: (id: string, customStoreId?: string) =>
        withAuthRetry(() =>
          CategoriesService.deleteCategories({
            id,
            xStoreId: customStoreId || storeId,
          })
        ),
    },

    stores: {
      list: () =>
        withAuthRetry(() => StoresService.getStores()),

      create: (data: any) =>
        withAuthRetry(() =>
          StoresService.postStores({
            requestBody: data,
          })
        ),

      me: () =>
        withAuthRetry(() => StoresService.getStoresMe()),

      getById: (id: string) =>
        withAuthRetry(() =>
          StoresService.getStores1({ id })
        ),

      update: (id: string, data: { name?: string }) =>
        withAuthRetry(() =>
          StoresService.patchStores({
            id,
            requestBody: data,
          })
        ),

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

      archive: (id: string) =>
        withAuthRetry(() =>
          StoresService.deleteStores({ id })
        ),

      getPublic: (params?: { q?: string }) =>
        StoresService.getStoresPublic({
          q: params?.q,
        }),

      getPublicBySlug: (slug: string) =>
        StoresService.getStoresPublic1({ slug }),
    },

    products: {
      list: (customStoreId?: string) =>
        withAuthRetry(() =>
          ProductsService.getProducts({
            xStoreId: customStoreId || storeId,
          })
        ),

      get: (id: string, customStoreId?: string) =>
        withAuthRetry(() =>
          ProductsService.getProducts1({
            id,
            xStoreId: customStoreId || storeId,
          })
        ),

      create: (data: any, customStoreId?: string) =>
        withAuthRetry(() =>
          ProductsService.postProducts({
            requestBody: data,
            xStoreId: customStoreId || storeId,
          })
        ),

      update: (id: string, data: any, customStoreId?: string) =>
        withAuthRetry(() =>
          ProductsService.patchProducts({
            id,
            requestBody: data,
            xStoreId: customStoreId || storeId,
          })
        ),
    },


orders: {
  list: (params?: {
    limit?: number
    status?:
      | "PENDING"
      | "PAID"
      | "PROCESSING"
      | "READY_FOR_PICKUP"
      | "FULFILLED"
      | "CANCELLED"
      | "REFUNDED"
    paymentStatus?:
      | "REQUIRES_ACTION"
      | "PENDING"
      | "SUCCEEDED"
      | "FAILED"
      | "CANCELLED"
      | "REFUNDED"
    fulfillmentType?: "STANDARD" | "PICKUP"
    customerId?: string
    storeId?: string
  }) =>
    withAuthRetry(() =>
      OrdersService.getOrders({
        xStoreId: params?.storeId || undefined,
        limit: params?.limit,
        status: params?.status,
        paymentStatus: params?.paymentStatus,
        customerId: params?.customerId,
        fulfillmentType: params?.fulfillmentType,
      })
    ),

  create: (data: CreateOrderRequest) =>
    withAuthRetry(() =>
      OrdersService.postOrders({
        requestBody: data,
      })
    ),

  get: (id: string, customStoreId?: string) =>
    withAuthRetry(() =>
      OrdersService.getOrders1({
        id,
        xStoreId: customStoreId || undefined,
      })
    ),

  updateStatus: (
    id: string,
    data: UpdateOrderStatusRequest,
    customStoreId?: string
  ) =>
    withAuthRetry(() =>
      OrdersService.patchOrdersStatus({
        id,
        xStoreId: customStoreId || requireStoreId(),
        requestBody: data,
      })
    ),

  cancel: (id: string, customStoreId?: string) =>
    withAuthRetry(() =>
      OrdersService.postOrdersCancel({
        id,
        xStoreId: customStoreId || undefined,
      })
    ),

  pay: (id: string) =>
    withAuthRetry(() =>
      OrdersService.postOrdersPay({
        id,
      })
    ),
},

payments: {
  checkout: (data: any) =>
    withAuthRetry(() =>
      PaymentsService.postPaymentsCheckout({
        requestBody: data,
      })
    ),

  refund: (paymentId: string, data?: any, customStoreId?: string) =>
    withAuthRetry(() =>
      PaymentsService.postPaymentsRefund({
        paymentId,
        requestBody: data,
        xStoreId: customStoreId || storeId,
      })
    ),
},

    reviews: {
      list: (
        productId: string,
        params?: { limit?: number; offset?: number; storeId?: string }
      ) =>
        withAuthRetry(() =>
          ReviewsService.getProductsReviews({
            id: productId,
            xStoreId: params?.storeId || requireStoreId(),
            limit: params?.limit,
            offset: params?.offset,
          })
        ),

      create: (
        productId: string,
        data: any,
        customStoreId?: string
      ) =>
        withAuthRetry(() =>
          ReviewsService.postProductsReviews({
            id: productId,
            xStoreId: customStoreId || requireStoreId(),
            requestBody: data,
          })
        ),

      flag: (
        productId: string,
        reviewId: string,
        customStoreId?: string
      ) =>
        withAuthRetry(() =>
          ReviewsService.postProductsReviewsFlag({
            id: productId,
            rid: reviewId,
            xStoreId: customStoreId || requireStoreId(),
          })
        ),
    },

services: {
  list: (customStoreId?: string, includeInactive?: boolean) =>
    withAuthRetry(() =>
      ServicesService.getServices({
        xStoreId: customStoreId || requireStoreId(),
        includeInactive,
      })
    ),

  create: (data: any, customStoreId?: string) =>
    withAuthRetry(() =>
      ServicesService.postServices({
        xStoreId: customStoreId || requireStoreId(),
        requestBody: data,
      })
    ),

  getAvailability: (id: string, date: string, customStoreId?: string) =>
    withAuthRetry(() =>
      ServicesService.getServicesAvailability({
        xStoreId: customStoreId || requireStoreId(),
        id,
        date,
      })
    ),
},
  }
}