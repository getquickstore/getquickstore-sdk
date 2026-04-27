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
import { AnalyticsService } from "./generated/services/AnalyticsService"
import { ServiceImagesService } from "./generated/services/ServiceImagesService"



type ClientConfig = {
  baseUrl: string
  token?: string
  storeId?: string
}

let refreshPromise: Promise<any> | null = null
let activeAccessToken: string | undefined

function maskToken(token?: string | null) {
  if (!token) return null
  return `${token.slice(0, 12)}...${token.slice(-8)}`
}

let sdkRequestSeq = 0

function nextSdkTrace(label: string) {
  sdkRequestSeq += 1
  return `${label}#${sdkRequestSeq}`
}

function isAuthError(error: any): boolean {
  return error?.status === 401 || error?.status === 403
}

function shouldSkipRefresh(error: any): boolean {
  const url = String(error?.request?.url || error?.url || '').toLowerCase()

  return (
    url.includes('/auth/login') ||
    url.includes('/auth/logout') ||
    url.includes('/auth/refresh')
  )
}

export function createClient({ baseUrl, token, storeId }: ClientConfig) {
  if (token) {
    activeAccessToken = token
  }


  OpenAPI.BASE = baseUrl
  OpenAPI.WITH_CREDENTIALS = true
  OpenAPI.CREDENTIALS = 'include'

const applyHeaders = () => {

  OpenAPI.HEADERS = async () => {
    const headers: Record<string, string> = {}

    if (activeAccessToken) {
      headers.Authorization = `Bearer ${activeAccessToken}`
    }

    if (storeId) {
      headers['x-store-id'] = storeId
    }

    console.log('[sdk:headers] OpenAPI.HEADERS resolved', {
      activeAccessToken: maskToken(activeAccessToken),
      createClientStoreId: storeId,
      hasAuthorization: !!headers.Authorization,
      authorizationPrefix: headers.Authorization?.slice(0, 24) || null,
      xStoreId: headers['x-store-id'] || null,
    })

    return headers
  }
}

  applyHeaders()

  const refreshSessionForClient = async () => {
    console.log('[sdk] refreshSession start')

    if (!refreshPromise) {
      refreshPromise = AuthService.postAuthRefresh({
        requestBody: {},
      })
        .then((res: any) => {
          console.log('[sdk] refreshSession ok', {
            ok: res?.ok,
            hasAccessToken: !!res?.accessToken,
          })

          if (res?.accessToken) {
            activeAccessToken = res.accessToken
            applyHeaders()
          }

          return res
        })
        .finally(() => {
          refreshPromise = null
        })
    }

    const res = await refreshPromise

    if (res?.accessToken) {
      activeAccessToken = res.accessToken
      applyHeaders()
    }

    return res
  }

const withClientAuthRetry = async <T,>(fn: () => Promise<T>): Promise<T> => {
  const trace = nextSdkTrace('sdk')

  try {
    return await fn()
  } catch (error: any) {
    console.log('[sdk] request failed', {
      trace,
      status: error?.status,
      url: error?.request?.url || error?.url,
    })

    if (!isAuthError(error) || shouldSkipRefresh(error)) {
      throw error
    }

    console.log('[sdk] trying refresh after auth error', { trace })

    const refreshRes = await refreshSessionForClient()

    if (!refreshRes?.accessToken) {
      throw error
    }

    console.log('[sdk] retry original request after refresh', { trace })

    return await fn()
  }
}

const requireStoreId = (value?: string) => {
  const resolved = value || storeId
  if (!resolved) {
    throw new Error('storeId is required in client')
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

      me: () => withClientAuthRetry(() => AuthService.getAuthMe()),

     refresh: async (refreshToken?: string) => {
  const res: any = await AuthService.postAuthRefresh({
    requestBody: refreshToken ? { refreshToken } : {},
  })

  if (res?.accessToken) {
    activeAccessToken = res.accessToken
    applyHeaders()
  }

  return res
},

      logout: (data?: { refreshToken?: string | null }) =>
  AuthService.postAuthLogout({
    requestBody: data || {},
  }),
      
           createWebHandoff: (data?: { nextPath?: string }) =>
        withClientAuthRetry(() =>
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
        withClientAuthRetry(() => AuthService.getAuth2Fa()),

      getSessions: () =>
        withClientAuthRetry(() => AuthService.getAuthSessions()),

      changePassword: (data: {
        currentPassword: string
        newPassword: string
      }) =>
        withClientAuthRetry(() =>
          AuthService.postAuthPasswordChange({
            requestBody: data,
          })
        ),

      confirmEmailVerification: (token: string) =>
        AuthService.postAuthEmailVerifyConfirm({
          requestBody: { token },
        }),

      requestEmailVerification: (email: string) =>
        withClientAuthRetry(() =>
          AuthService.postAuthEmailVerifyRequest({
            requestBody: { email },
          })
        ),

      requestEmailChange: (newEmail: string) =>
        withClientAuthRetry(() =>
          AuthService.postAuthEmailChangeRequest({
            requestBody: { newEmail },
          })
        ),

      confirmEmailChange: (token: string) =>
        AuthService.postAuthEmailChangeConfirm({
          requestBody: { token },
        }),

      startReAuth: (action: string) =>
        withClientAuthRetry(() =>
          AuthService.postAuthReAuthStart({
            requestBody: { action },
          })
        ),

      verifyReAuth: (data: { challengeId: string; code: string }) =>
        withClientAuthRetry(() =>
          AuthService.postAuthReAuthVerify({
            requestBody: data,
          })
        ),

      startTwoFactorSetup: () =>
        withClientAuthRetry(() => AuthService.postAuth2FaSetup()),

      confirmTwoFactorSetup: (code: string) =>
        withClientAuthRetry(() =>
          AuthService.postAuth2FaConfirm({
            requestBody: { code },
          })
        ),

      disableTwoFactor: (data: { code?: string; recoveryCode?: string }) =>
        withClientAuthRetry(() =>
          AuthService.postAuth2FaDisable({
            requestBody: data,
          })
        ),

      regenerateRecoveryCodes: (code: string) =>
        withClientAuthRetry(() =>
          AuthService.postAuth2FaRecoveryCodesRegenerate({
            requestBody: { code },
          })
        ),

      revokeSession: (data: {
        sessionId?: string
        revokeAllOther?: boolean
        currentSessionId?: string
      }) =>
        withClientAuthRetry(() =>
          AuthService.postAuthSessionsRevoke({
            requestBody: data,
          })
        ),
    },

    analytics: {
  overview: (params?: { range?: "1d" | "7d" | "30d" | "90d"; storeId?: string }) =>
    withClientAuthRetry(() =>
      AnalyticsService.getAnalyticsOverview({
        xStoreId: params?.storeId || requireStoreId(),
        range: params?.range,
      })
    ),
},

availability: {
  list: (customStoreId?: string) =>
    withClientAuthRetry(() =>
      AvailabilityService.getAvailability({
        xStoreId: customStoreId || requireStoreId(),
      } as any)
    ),

  upsert: (data: any, customStoreId?: string) =>
    withClientAuthRetry(() =>
      AvailabilityService.postAvailability({
        xStoreId: customStoreId || requireStoreId(),
        requestBody: data,
      } as any)
    ),

  bulk: (items: any[], customStoreId?: string) =>
    withClientAuthRetry(() =>
      AvailabilityService.putAvailabilityBulk({
        xStoreId: customStoreId || requireStoreId(),
        requestBody: { items },
      } as any)
    ),

  update: (id: string, data: any, customStoreId?: string) =>
    withClientAuthRetry(() =>
      AvailabilityService.patchAvailability({
        id,
        xStoreId: customStoreId || requireStoreId(),
        requestBody: data,
      } as any)
    ),

  delete: (id: string, customStoreId?: string) =>
    withClientAuthRetry(() =>
      AvailabilityService.deleteAvailability({
        id,
        xStoreId: customStoreId || requireStoreId(),
      } as any)
    ),

    publicServiceSlots: (serviceId: string, date: string, storeId: string) =>
  AvailabilityService.getAvailabilityPublicServicesSlots({
    serviceId,
    date,
    storeId,
  }),
},

    billing: {
      current: () =>
        withClientAuthRetry(() =>
          BillingService.getBillingCurrent({
            xStoreId: storeId || undefined,
            storeId: storeId || undefined,
          })
        ),

      storeCurrent: (id: string) =>
        withClientAuthRetry(() =>
          BillingService.getBillingStoresCurrent({ id })
        ),

      checkout: (data: {
        storeId?: string
        successUrl?: string
        cancelUrl?: string
      }) => {
        const resolvedStoreId = requireStoreId(data.storeId)

        return withClientAuthRetry(() =>
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

        return withClientAuthRetry(() =>
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

        return withClientAuthRetry(() =>
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
        withClientAuthRetry(() =>
          BillingConnectService.getBillingStoresStripeConnectStatus({
            id: requireStoreId(),
          })
        ),

      disconnect: (id: string) =>
        withClientAuthRetry(() =>
          BillingConnectService.postBillingStoresStripeDisconnect({ id })
        ),

      statusByStore: (id: string) =>
        withClientAuthRetry(() =>
          BillingConnectService.getBillingStoresStripeConnectStatus({ id })
        ),

      start: (data: { returnUrl: string; refreshUrl: string }) =>
        withClientAuthRetry(() =>
          BillingService.postBillingStoresStripeConnectStart({
            id: requireStoreId(),
            requestBody: {
              returnUrl: data.returnUrl,
              refreshUrl: data.refreshUrl,
            },
          })
        ),

      sync: () =>
        withClientAuthRetry(() =>
          BillingConnectService.postBillingStoresStripeConnectSync({
            id: requireStoreId(),
          })
        ),
    },

    bookings: {

     
          me: () =>
             withClientAuthRetry(() =>
      BookingsService.getBookingsMe()
    ),

      list: (params?: {
        status?: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED"
        serviceId?: string
        dateFrom?: string
        dateTo?: string
        storeId?: string
      }) =>
        withClientAuthRetry(() =>
          BookingsService.getBookings({
            xStoreId: params?.storeId || storeId,
            status: params?.status,
            serviceId: params?.serviceId,
            dateFrom: params?.dateFrom,
            dateTo: params?.dateTo,
          })
        ),

      create: (data: any, customStoreId?: string) =>
        withClientAuthRetry(() =>
          BookingsService.postBookings({
            requestBody: data,
            xStoreId: customStoreId || storeId,
          })
        ),

      get: (id: string, customStoreId?: string) =>
        withClientAuthRetry(() =>
          BookingsService.getBookings1({
            id,
            xStoreId: customStoreId || storeId,
          })
        ),

      update: (id: string, data: any, customStoreId?: string) =>
        withClientAuthRetry(() =>
          BookingsService.patchBookings({
            id,
            requestBody: data,
            xStoreId: customStoreId || storeId,
          })
        ),

      cancel: (id: string, customStoreId?: string) =>
        withClientAuthRetry(() =>
          BookingsService.postBookingsCancel({
            id,
            xStoreId: customStoreId || storeId,
          })
        ),
    },

calendar: {
  getDay: (date: string, customStoreId?: string) =>
    withClientAuthRetry(() =>
      CalendarService.getCalendarDay({
        date,
        xStoreId: customStoreId || requireStoreId(),
      } as any)
    ),

  getWeek: (date: string, customStoreId?: string) =>
    withClientAuthRetry(() =>
      CalendarService.getCalendarWeek({
        date,
        xStoreId: customStoreId || requireStoreId(),
      } as any)
    ),
},

cart: {
  get: () =>
    withClientAuthRetry(() =>
      CartService.getCart()
    ),

  add: (data: any) =>
    withClientAuthRetry(() =>
      CartService.postCartAdd({
        requestBody: data,
      })
    ),

  setQty: (data: any) =>
    withClientAuthRetry(() =>
      CartService.postCartSetQty({
        requestBody: data,
      })
    ),

  remove: (data: any) =>
    withClientAuthRetry(() =>
      CartService.postCartRemove({
        requestBody: data,
      })
    ),

  clear: () =>
    withClientAuthRetry(() =>
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
        withClientAuthRetry(() =>
          CategoriesService.getCategories({
            xStoreId: params?.storeId || storeId,
            limit: params?.limit,
            offset: params?.offset,
            q: params?.q,
          })
        ),

      create: (data: any, customStoreId?: string) =>
        withClientAuthRetry(() =>
          CategoriesService.postCategories({
            requestBody: data,
            xStoreId: customStoreId || storeId,
          })
        ),

      update: (id: string, data: any, customStoreId?: string) =>
        withClientAuthRetry(() =>
          CategoriesService.patchCategories({
            id,
            requestBody: data,
            xStoreId: customStoreId || storeId,
          })
        ),

      delete: (id: string, customStoreId?: string) =>
        withClientAuthRetry(() =>
          CategoriesService.deleteCategories({
            id,
            xStoreId: customStoreId || storeId,
          })
        ),
    },

    stores: {
      list: () =>
        withClientAuthRetry(() => StoresService.getStores()),

      create: (data: any) =>
        withClientAuthRetry(() =>
          StoresService.postStores({
            requestBody: data,
          })
        ),

      me: () =>
        withClientAuthRetry(() => StoresService.getStoresMe()),

      getById: (id: string) =>
        withClientAuthRetry(() =>
          StoresService.getStores1({ id })
        ),

      update: (id: string, data: { name?: string }) =>
        withClientAuthRetry(() =>
          StoresService.patchStores({
            id,
            requestBody: data,
          })
        ),

   select: (id: string) =>
  withClientAuthRetry(() =>
    StoresService.postStoresSelect({ id })
  ),

      setVisibility: (id: string, isPublic: boolean) =>
        withClientAuthRetry(() =>
          StoresService.patchStoresVisibility({
            id,
            requestBody: { isPublic },
          })
        ),

      archive: (id: string) =>
        withClientAuthRetry(() =>
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
        withClientAuthRetry(() =>
          ProductsService.getProducts({
            xStoreId: customStoreId || storeId,
          })
        ),

      get: (id: string, customStoreId?: string) =>
        withClientAuthRetry(() =>
          ProductsService.getProducts1({
            id,
            xStoreId: customStoreId || storeId,
          })
        ),

      create: (data: any, customStoreId?: string) =>
        withClientAuthRetry(() =>
          ProductsService.postProducts({
            requestBody: data,
            xStoreId: customStoreId || storeId,
          })
        ),

      update: (id: string, data: any, customStoreId?: string) =>
        withClientAuthRetry(() =>
          ProductsService.patchProducts({
            id,
            requestBody: data,
            xStoreId: customStoreId || storeId,
          })
        ),
    },

        productImages: {
      list: (productId: string, customStoreId?: string) =>
        withClientAuthRetry(() =>
          ProductImagesService.getProductsImages({
            productId,
            xStoreId: customStoreId || requireStoreId(),
          } as any)
        ),

      presign: (
        productId: string,
        data: {
          filename: string
          contentType?: 'image/jpeg' | 'image/png' | 'image/webp' | 'image/avif'
        },
        customStoreId?: string
      ) =>
        withClientAuthRetry(() =>
          ProductImagesService.postProductsImagesPresign({
            productId,
            xStoreId: customStoreId || requireStoreId(),
            requestBody: data,
          } as any)
        ),

      create: (
        productId: string,
        data: {
          key: string
          url: string
          alt?: string | null
          isPrimary?: boolean
          position?: number
          variantId?: string | null
        },
        customStoreId?: string
      ) =>
        withClientAuthRetry(() =>
          ProductImagesService.postProductsImages({
            productId,
            xStoreId: customStoreId || requireStoreId(),
            requestBody: data,
          } as any)
        ),

      update: (
        productId: string,
        imageId: string,
        data: {
          url?: string
          alt?: string | null
          isPrimary?: boolean
          position?: number
          variantId?: string | null
        },
        customStoreId?: string
      ) =>
        withClientAuthRetry(() =>
          ProductImagesService.patchProductsImages({
            productId,
            imageId,
            xStoreId: customStoreId || requireStoreId(),
            requestBody: data,
          } as any)
        ),

      delete: (productId: string, imageId: string, customStoreId?: string) =>
        withClientAuthRetry(() =>
          ProductImagesService.deleteProductsImages({
            productId,
            imageId,
            xStoreId: customStoreId || requireStoreId(),
          } as any)
        ),
    },

    serviceImages: {
      list: (serviceId: string, customStoreId?: string) =>
        withClientAuthRetry(() =>
          ServiceImagesService.getServicesImages({
            serviceId,
            xStoreId: customStoreId || requireStoreId(),
          } as any)
        ),

      presign: (
        serviceId: string,
        data: {
          filename: string
          contentType?: 'image/jpeg' | 'image/png' | 'image/webp' | 'image/avif'
        },
        customStoreId?: string
      ) =>
        withClientAuthRetry(() =>
          ServiceImagesService.postServicesImagesPresign({
            serviceId,
            xStoreId: customStoreId || requireStoreId(),
            requestBody: data,
          } as any)
        ),

      create: (
        serviceId: string,
        data: {
          key: string
          url: string
          alt?: string | null
          isPrimary?: boolean
          position?: number
        },
        customStoreId?: string
      ) =>
        withClientAuthRetry(() =>
          ServiceImagesService.postServicesImages({
            serviceId,
            xStoreId: customStoreId || requireStoreId(),
            requestBody: data,
          } as any)
        ),

      update: (
        serviceId: string,
        imageId: string,
        data: {
          url?: string
          alt?: string | null
          isPrimary?: boolean
          position?: number
        },
        customStoreId?: string
      ) =>
        withClientAuthRetry(() =>
          ServiceImagesService.patchServicesImages({
            serviceId,
            imageId,
            xStoreId: customStoreId || requireStoreId(),
            requestBody: data,
          } as any)
        ),

      delete: (serviceId: string, imageId: string, customStoreId?: string) =>
        withClientAuthRetry(() =>
          ServiceImagesService.deleteServicesImages({
            serviceId,
            imageId,
            xStoreId: customStoreId || requireStoreId(),
          } as any)
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
    withClientAuthRetry(() =>
      OrdersService.getOrders({
        xStoreId: params?.storeId || undefined,
        limit: params?.limit,
        status: params?.status,
        paymentStatus: params?.paymentStatus,
        customerId: params?.customerId,
        fulfillmentType: params?.fulfillmentType,
      })
    ),

  create: (data: CreateOrderRequest & { storeId?: string }) => {
    const resolvedStoreId = requireStoreId(data.storeId)

    return withClientAuthRetry(() =>
      OrdersService.postOrders({
        requestBody: {
          ...data,
          storeId: resolvedStoreId,
        },
      })
    )
  },

  get: (id: string, customStoreId?: string) =>
    withClientAuthRetry(() =>
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
    withClientAuthRetry(() =>
      OrdersService.patchOrdersStatus({
        id,
        xStoreId: customStoreId || requireStoreId(),
        requestBody: data,
      })
    ),

  cancel: (id: string, customStoreId?: string) =>
    withClientAuthRetry(() =>
      OrdersService.postOrdersCancel({
        id,
        xStoreId: customStoreId || undefined,
      })
    ),
},

payments: {

  bookingCheckout: (data: { bookingId: string; successUrl?: string; cancelUrl?: string }) =>
    withClientAuthRetry(() =>
      PaymentsService.postPaymentsBookingsCheckout({
        requestBody: data,
      })
    ),

  checkout: (data: {
    orderId: string
    successUrl?: string
    cancelUrl?: string
  }) =>
    withClientAuthRetry(() =>
      PaymentsService.postPaymentsCheckout({
        requestBody: {
          orderId: data.orderId,
          ...(data.successUrl ? { successUrl: data.successUrl } : {}),
          ...(data.cancelUrl ? { cancelUrl: data.cancelUrl } : {}),
        },
      })
    ),

  refund: (paymentId: string, data?: any, customStoreId?: string) =>
    withClientAuthRetry(() =>
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
        withClientAuthRetry(() =>
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
        withClientAuthRetry(() =>
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
        withClientAuthRetry(() =>
          ReviewsService.postProductsReviewsFlag({
            id: productId,
            rid: reviewId,
            xStoreId: customStoreId || requireStoreId(),
          })
        ),
    },

services: {
  list: (customStoreId?: string, includeInactive?: boolean) =>
    withClientAuthRetry(() =>
      ServicesService.getServices({
        xStoreId: customStoreId || requireStoreId(),
        includeInactive,
      })
    ),

  create: (data: any, customStoreId?: string) =>
    withClientAuthRetry(() =>
      ServicesService.postServices({
        xStoreId: customStoreId || requireStoreId(),
        requestBody: data,
      })
    ),

  getAvailability: (id: string, date: string, customStoreId?: string) =>
    withClientAuthRetry(() =>
      ServicesService.getServicesAvailability({
        xStoreId: customStoreId || requireStoreId(),
        id,
        date,
      })
    ),
},
  }
}