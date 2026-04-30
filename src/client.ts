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
import { AnalyticsService } from "./generated/services/AnalyticsService"
import { ServiceImagesService } from "./generated/services/ServiceImagesService"
import { CatalogService } from "./generated/services/CatalogService"
import { FavoritesService } from "./generated/services/FavoritesService"
import { PublicService } from "./generated/services/PublicService"

import type { CreateOrderRequest } from "./generated/models/CreateOrderRequest"
import type { UpdateOrderStatusRequest } from "./generated/models/UpdateOrderStatusRequest"

type ClientConfig = {
  baseUrl: string
  token?: string | null
  storeId?: string | null
}

export function createClient({ baseUrl, token, storeId }: ClientConfig) {
  OpenAPI.BASE = baseUrl
  OpenAPI.WITH_CREDENTIALS = false
  OpenAPI.CREDENTIALS = "omit"

  OpenAPI.TOKEN = token || undefined

  OpenAPI.HEADERS = async () => {
    const headers: Record<string, string> = {}

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    if (storeId) {
      headers["x-store-id"] = storeId
    }

    return headers
  }

  const requireStoreId = (value?: string | null) => {
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

      register: (name: string, email: string, password: string) =>
        AuthService.postAuthRegister({
          requestBody: { name, email, password } as any,
        }),

      me: () => AuthService.getAuthMe(),

      refresh: (refreshToken?: string | null) =>
        AuthService.postAuthRefresh({
          requestBody: refreshToken ? { refreshToken } : {},
        }),

      logout: (data?: { refreshToken?: string | null }) =>
        AuthService.postAuthLogout({
          requestBody: data || {},
        }),

      verifyLoginTwoFactor: (data: {
        challengeId: string
        code: string
        trustDevice?: boolean
        deviceFingerprint?: string | null
      }) =>
        AuthService.postAuthLogin2FaVerify({
          requestBody: data,
        }),

      resendLoginTwoFactor: (challengeId: string) =>
        AuthService.postAuthLogin2FaResend({
          requestBody: { challengeId },
        }),

      createWebHandoff: (data?: { nextPath?: string }) =>
        AuthService.postAuthWebHandoff({
          requestBody: {
            ...(data?.nextPath ? { nextPath: data.nextPath } : {}),
          },
        }),

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

      getTwoFactorStatus: () => AuthService.getAuth2Fa(),

      getSessions: () => AuthService.getAuthSessions(),

      changePassword: (data: {
        currentPassword: string
        newPassword: string
      }) =>
        AuthService.postAuthPasswordChange({
          requestBody: data,
        }),

      confirmEmailVerification: (token: string) =>
        AuthService.postAuthEmailVerifyConfirm({
          requestBody: { token },
        }),

      requestEmailVerification: (email: string) =>
        AuthService.postAuthEmailVerifyRequest({
          requestBody: { email },
        }),

      requestEmailChange: (newEmail: string) =>
        AuthService.postAuthEmailChangeRequest({
          requestBody: { newEmail },
        }),

      confirmEmailChange: (token: string) =>
        AuthService.postAuthEmailChangeConfirm({
          requestBody: { token },
        }),

      startReAuth: (action: string) =>
        AuthService.postAuthReAuthStart({
          requestBody: { action },
        }),

      verifyReAuth: (data: { challengeId: string; code: string }) =>
        AuthService.postAuthReAuthVerify({
          requestBody: data,
        }),

      startTwoFactorSetup: () => AuthService.postAuth2FaSetup(),

      confirmTwoFactorSetup: (code: string) =>
        AuthService.postAuth2FaConfirm({
          requestBody: { code },
        }),

      disableTwoFactor: (data: { code?: string; recoveryCode?: string }) =>
        AuthService.postAuth2FaDisable({
          requestBody: data,
        }),

      regenerateRecoveryCodes: (code: string) =>
        AuthService.postAuth2FaRecoveryCodesRegenerate({
          requestBody: { code },
        }),

      revokeSession: (data: {
        sessionId?: string
        revokeAllOther?: boolean
        currentSessionId?: string
      }) =>
        AuthService.postAuthSessionsRevoke({
          requestBody: data,
        }),
    },

    analytics: {
      overview: (params?: {
        range?: "1d" | "7d" | "30d" | "90d"
        storeId?: string
      }) =>
        AnalyticsService.getAnalyticsOverview({
          xStoreId: params?.storeId || requireStoreId(),
          range: params?.range,
        }),
    },

    availability: {
      list: (customStoreId?: string) =>
        AvailabilityService.getAvailability({
          xStoreId: customStoreId || requireStoreId(),
        } as any),

      upsert: (data: any, customStoreId?: string) =>
        AvailabilityService.postAvailability({
          xStoreId: customStoreId || requireStoreId(),
          requestBody: data,
        } as any),

      bulk: (items: any[], customStoreId?: string) =>
        AvailabilityService.putAvailabilityBulk({
          xStoreId: customStoreId || requireStoreId(),
          requestBody: { items },
        } as any),

      update: (id: string, data: any, customStoreId?: string) =>
        AvailabilityService.patchAvailability({
          id,
          xStoreId: customStoreId || requireStoreId(),
          requestBody: data,
        } as any),

      delete: (id: string, customStoreId?: string) =>
        AvailabilityService.deleteAvailability({
          id,
          xStoreId: customStoreId || requireStoreId(),
        } as any),

      publicServiceSlots: (serviceId: string, date: string, storeId: string) =>
        AvailabilityService.getAvailabilityPublicServicesSlots({
          serviceId,
          date,
          storeId,
        }),
    },

    billing: {
      current: () =>
        BillingService.getBillingCurrent({
          xStoreId: storeId || undefined,
          storeId: storeId || undefined,
        }),

      storeCurrent: (id: string) =>
        BillingService.getBillingStoresCurrent({ id }),

      checkout: (data: {
        storeId?: string
        successUrl?: string
        cancelUrl?: string
      }) =>
        BillingService.postBillingCheckout({
          requestBody: {
            storeId: requireStoreId(data.storeId),
            ...(data.successUrl ? { successUrl: data.successUrl } : {}),
            ...(data.cancelUrl ? { cancelUrl: data.cancelUrl } : {}),
          },
        }),

      portal: (data: { storeId?: string; returnUrl?: string }) =>
        BillingService.postBillingPortal({
          requestBody: {
            storeId: requireStoreId(data.storeId),
            ...(data.returnUrl ? { returnUrl: data.returnUrl } : {}),
          },
        }),

      cancel: (data: { storeId?: string }) =>
        BillingService.postBillingCancel({
          requestBody: {
            storeId: requireStoreId(data.storeId),
          },
        }),
    },

    stripeConnect: {
      status: () =>
        BillingConnectService.getBillingStoresStripeConnectStatus({
          id: requireStoreId(),
        }),

      disconnect: (id: string) =>
        BillingConnectService.postBillingStoresStripeDisconnect({ id }),

      statusByStore: (id: string) =>
        BillingConnectService.getBillingStoresStripeConnectStatus({ id }),

      start: (data: { returnUrl: string; refreshUrl: string }) =>
        BillingService.postBillingStoresStripeConnectStart({
          id: requireStoreId(),
          requestBody: data,
        }),

      sync: () =>
        BillingConnectService.postBillingStoresStripeConnectSync({
          id: requireStoreId(),
        }),
    },

    bookings: {
      me: () => BookingsService.getBookingsMe(),

      list: (params?: {
        status?: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED"
        serviceId?: string
        dateFrom?: string
        dateTo?: string
        storeId?: string
      }) =>
        BookingsService.getBookings({
          xStoreId: params?.storeId || storeId || undefined,
          status: params?.status,
          serviceId: params?.serviceId,
          dateFrom: params?.dateFrom,
          dateTo: params?.dateTo,
        }),

      create: (data: any, customStoreId?: string) =>
        BookingsService.postBookings({
          requestBody: data,
          xStoreId: customStoreId || storeId || undefined,
        }),

      get: (id: string, customStoreId?: string) =>
        BookingsService.getBookings1({
          id,
          xStoreId: customStoreId || storeId || undefined,
        }),

      update: (id: string, data: any, customStoreId?: string) =>
        BookingsService.patchBookings({
          id,
          requestBody: data,
          xStoreId: customStoreId || storeId || undefined,
        }),

      cancel: (id: string, customStoreId?: string) =>
        BookingsService.postBookingsCancel({
          id,
          xStoreId: customStoreId || storeId || undefined,
        }),
    },

    calendar: {
      getDay: (date: string, customStoreId?: string) =>
        CalendarService.getCalendarDay({
          date,
          xStoreId: customStoreId || requireStoreId(),
        } as any),

      getWeek: (date: string, customStoreId?: string) =>
        CalendarService.getCalendarWeek({
          date,
          xStoreId: customStoreId || requireStoreId(),
        } as any),
    },

    cart: {
      get: () => CartService.getCart(),

      add: (data: any) =>
        CartService.postCartAdd({
          requestBody: data,
        }),

      setQty: (data: any) =>
        CartService.postCartSetQty({
          requestBody: data,
        }),

      remove: (data: any) =>
        CartService.postCartRemove({
          requestBody: data,
        }),

      clear: () => CartService.postCartClear(),
    },

    catalog: {
      featured: (params?: { limit?: number; q?: string }) =>
        CatalogService.getCatalogFeatured({
          limit: params?.limit ?? 12,
          q: params?.q,
        }),
    },

public: {
  stores: (params?: { q?: string }) =>
    PublicService.getPublicStores({
      q: params?.q,
    }),

  nearbyStores: (params: { lat: number; lng: number; radiusKm?: number }) =>
    PublicService.getPublicStoresNearby({
      lat: params.lat,
      lng: params.lng,
      radiusKm: params.radiusKm,
    }),

  products: (params?: { storeId?: string }) =>
    PublicService.getPublicProducts({
      storeId: params?.storeId,
    }),

  services: (params?: { storeId?: string }) =>
    PublicService.getPublicServices({
      storeId: params?.storeId,
    }),

  categories: (params?: { storeId?: string }) =>
    PublicService.getPublicCategories({
      storeId: params?.storeId,
    }),

  catalog: () => PublicService.getPublicCatalog(),
},

    categories: {
      list: (params?: {
        limit?: number
        offset?: number
        q?: string
        storeId?: string
      }) =>
        CategoriesService.getCategories({
          xStoreId: params?.storeId || storeId || undefined,
          limit: params?.limit,
          offset: params?.offset,
          q: params?.q,
        }),

      create: (data: any, customStoreId?: string) =>
        CategoriesService.postCategories({
          requestBody: data,
          xStoreId: customStoreId || storeId || undefined,
        }),

      update: (id: string, data: any, customStoreId?: string) =>
        CategoriesService.patchCategories({
          id,
          requestBody: data,
          xStoreId: customStoreId || storeId || undefined,
        }),

      delete: (id: string, customStoreId?: string) =>
        CategoriesService.deleteCategories({
          id,
          xStoreId: customStoreId || storeId || undefined,
        }),
    },

    stores: {
      list: () => StoresService.getStores(),

      create: (data: any) =>
        StoresService.postStores({
          requestBody: data,
        }),

      me: () => StoresService.getStoresMe(),

      getById: (id: string) => StoresService.getStores1({ id }),

      update: (id: string, data: { name?: string }) =>
        StoresService.patchStores({
          id,
          requestBody: data,
        }),

      select: (id: string) => StoresService.postStoresSelect({ id }),

      setVisibility: (id: string, isPublic: boolean) =>
        StoresService.patchStoresVisibility({
          id,
          requestBody: { isPublic },
        }),

      archive: (id: string) => StoresService.deleteStores({ id }),


    },

    products: {
      list: (
        customStoreId?: string,
        params?: {
          limit?: number
          offset?: number
          q?: string
          category?: string
          categoryId?: string
          status?: "DRAFT" | "PUBLISHED" | "ARCHIVED"
          sort?: string
        }
      ) =>
        ProductsService.getProducts({
          xStoreId: customStoreId || storeId || undefined,
          limit: params?.limit,
          offset: params?.offset,
          q: params?.q,
          category: params?.category,
          categoryId: params?.categoryId,
          status: params?.status,
          sort: params?.sort as any,
        } as any),

      get: (id: string, customStoreId?: string) =>
        ProductsService.getProducts1({
          id,
          xStoreId: customStoreId || storeId || undefined,
        }),

      create: (data: any, customStoreId?: string) =>
        ProductsService.postProducts({
          requestBody: data,
          xStoreId: customStoreId || storeId || undefined,
        }),

      update: (id: string, data: any, customStoreId?: string) =>
        ProductsService.patchProducts({
          id,
          requestBody: data,
          xStoreId: customStoreId || storeId || undefined,
        }),

        delete: (id: string, customStoreId?: string) =>
  ProductsService.deleteProducts({
    id,
    xStoreId: customStoreId || storeId || undefined,
  }),

      publicGet: (id: string, storeId: string) =>
        ProductsService.getProductsPublic({
          id,
          storeId,
        } as any),
    },

    productImages: {
      list: (productId: string, customStoreId?: string) =>
        ProductImagesService.getProductsImages({
          productId,
          xStoreId: customStoreId || requireStoreId(),
        } as any),

      presign: (
        productId: string,
        data: {
          filename: string
          contentType?: "image/jpeg" | "image/png" | "image/webp" | "image/avif"
        },
        customStoreId?: string
      ) =>
        ProductImagesService.postProductsImagesPresign({
          productId,
          xStoreId: customStoreId || requireStoreId(),
          requestBody: data,
        } as any),

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
        ProductImagesService.postProductsImages({
          productId,
          xStoreId: customStoreId || requireStoreId(),
          requestBody: data,
        } as any),

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
        ProductImagesService.patchProductsImages({
          productId,
          imageId,
          xStoreId: customStoreId || requireStoreId(),
          requestBody: data,
        } as any),

      delete: (productId: string, imageId: string, customStoreId?: string) =>
        ProductImagesService.deleteProductsImages({
          productId,
          imageId,
          xStoreId: customStoreId || requireStoreId(),
        } as any),
    },

    serviceImages: {
      list: (serviceId: string, customStoreId?: string) =>
        ServiceImagesService.getServicesImages({
          serviceId,
          xStoreId: customStoreId || requireStoreId(),
        } as any),

      presign: (
        serviceId: string,
        data: {
          filename: string
          contentType?: "image/jpeg" | "image/png" | "image/webp" | "image/avif"
        },
        customStoreId?: string
      ) =>
        ServiceImagesService.postServicesImagesPresign({
          serviceId,
          xStoreId: customStoreId || requireStoreId(),
          requestBody: data,
        } as any),

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
        ServiceImagesService.postServicesImages({
          serviceId,
          xStoreId: customStoreId || requireStoreId(),
          requestBody: data,
        } as any),

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
        ServiceImagesService.patchServicesImages({
          serviceId,
          imageId,
          xStoreId: customStoreId || requireStoreId(),
          requestBody: data,
        } as any),

      delete: (serviceId: string, imageId: string, customStoreId?: string) =>
        ServiceImagesService.deleteServicesImages({
          serviceId,
          imageId,
          xStoreId: customStoreId || requireStoreId(),
        } as any),
    },

    favorites: {
      list: (params?: { type?: "STORE" | "PRODUCT" | "SERVICE" }) =>
        FavoritesService.getFavorites({
          type: params?.type,
        } as any),

      add: (data: {
        type: "STORE" | "PRODUCT" | "SERVICE"
        storeId?: string
        productId?: string
        serviceId?: string
      }) =>
        FavoritesService.postFavorites({
          requestBody: data,
        } as any),

      remove: (data: {
        type: "STORE" | "PRODUCT" | "SERVICE"
        storeId?: string
        productId?: string
        serviceId?: string
      }) =>
        FavoritesService.deleteFavorites({
          requestBody: data,
        } as any),
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
        OrdersService.getOrders({
          xStoreId: params?.storeId || undefined,
          limit: params?.limit,
          status: params?.status,
          paymentStatus: params?.paymentStatus,
          customerId: params?.customerId,
          fulfillmentType: params?.fulfillmentType,
        }),

      create: (data: CreateOrderRequest & { storeId?: string }) =>
        OrdersService.postOrders({
          requestBody: {
            ...data,
            storeId: requireStoreId(data.storeId),
          },
        }),

      get: (id: string, customStoreId?: string) =>
        OrdersService.getOrders1({
          id,
          xStoreId: customStoreId || undefined,
        }),

      updateStatus: (
        id: string,
        data: UpdateOrderStatusRequest,
        customStoreId?: string
      ) =>
        OrdersService.patchOrdersStatus({
          id,
          xStoreId: customStoreId || requireStoreId(),
          requestBody: data,
        }),

      cancel: (id: string, customStoreId?: string) =>
        OrdersService.postOrdersCancel({
          id,
          xStoreId: customStoreId || undefined,
        }),
    },

    payments: {
      bookingCheckout: (data: {
        bookingId: string
        successUrl?: string
        cancelUrl?: string
      }) =>
        PaymentsService.postPaymentsBookingsCheckout({
          requestBody: data,
        }),

      checkout: (data: {
        orderId: string
        successUrl?: string
        cancelUrl?: string
      }) =>
        PaymentsService.postPaymentsCheckout({
          requestBody: {
            orderId: data.orderId,
            ...(data.successUrl ? { successUrl: data.successUrl } : {}),
            ...(data.cancelUrl ? { cancelUrl: data.cancelUrl } : {}),
          },
        }),

      refund: (paymentId: string, data?: any, customStoreId?: string) =>
        PaymentsService.postPaymentsRefund({
          paymentId,
          requestBody: data,
          xStoreId: customStoreId || storeId || undefined,
        }),
    },

    reviews: {
      list: (
        productId: string,
        params?: { limit?: number; offset?: number; storeId?: string }
      ) =>
        ReviewsService.getProductsReviews({
          id: productId,
          xStoreId: params?.storeId || requireStoreId(),
          limit: params?.limit,
          offset: params?.offset,
        }),

      create: (productId: string, data: any, customStoreId?: string) =>
        ReviewsService.postProductsReviews({
          id: productId,
          xStoreId: customStoreId || requireStoreId(),
          requestBody: data,
        }),

      flag: (productId: string, reviewId: string, customStoreId?: string) =>
        ReviewsService.postProductsReviewsFlag({
          id: productId,
          rid: reviewId,
          xStoreId: customStoreId || requireStoreId(),
        }),
    },

    services: {
      list: (customStoreId?: string, includeInactive?: boolean) =>
        ServicesService.getServices({
          xStoreId: customStoreId || requireStoreId(),
          includeInactive,
        }),

      create: (data: any, customStoreId?: string) =>
        ServicesService.postServices({
          xStoreId: customStoreId || requireStoreId(),
          requestBody: data,
        }),

      update: (id: string, data: any, customStoreId?: string) =>
        ServicesService.patchServices({
          id,
          xStoreId: customStoreId || requireStoreId(),
          requestBody: data,
        }),

        delete: (id: string, customStoreId?: string) =>
  ServicesService.deleteServices({
    id,
    xStoreId: customStoreId || requireStoreId(),
  }),

      getAvailability: (id: string, date: string, customStoreId?: string) =>
        ServicesService.getServicesAvailability({
          xStoreId: customStoreId || requireStoreId(),
          id,
          date,
        }),
    },
  }
}