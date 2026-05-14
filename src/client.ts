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
import { TagsService } from "./generated/services/TagsService"
import { SeoService } from "./generated/services/SeoService"
import { StripeConnectService } from "./generated/services/StripeConnectService"
import { ProfileService } from "./generated/services/ProfileService"
import { ExportsService } from "./generated/services/ExportsService"

import type { CreateOrderRequest } from "./generated/models/CreateOrderRequest"
import type { UpdateOrderStatusRequest } from "./generated/models/UpdateOrderStatusRequest"

type ClientConfig = {
  baseUrl: string
  token?: string | null
  storeId?: string | null
}

type StoreSchemaType =
  | "LocalBusiness"
  | "Store"
  | "Restaurant"
  | "BeautySalon"
  | "AutoRepair"
  | "MedicalBusiness"
  | "Electrician"
  | "RealEstateAgent"

export function createClient({ baseUrl, token, storeId }: ClientConfig) {
  OpenAPI.BASE = baseUrl
  const isWeb =
    typeof window !== "undefined" &&
    typeof document !== "undefined"
  
  OpenAPI.WITH_CREDENTIALS = isWeb
  OpenAPI.CREDENTIALS = isWeb ? "include" : "omit"

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

    exports: {
      preview: (params?: {
        type?: "all" | "orders" | "bookings" | "booking_series" | "refunds" | "payments"
        dateFrom?: string
        dateTo?: string
        storeId?: string
      }) =>
        ExportsService.getExports({
          storeId: params?.storeId || requireStoreId(),
          type: params?.type || "all",
          dateFrom: params?.dateFrom,
          dateTo: params?.dateTo,
        } as any),

    jobs: {
      list: (customStoreId?: string) =>
        (ExportsService.getExportsJobs as any)({
          storeId: customStoreId || requireStoreId(),
        }),
      
      create: (data: any, customStoreId?: string) => {
        const resolvedStoreId =
          customStoreId || data?.filters?.storeId || requireStoreId()
      
        return (ExportsService.postExportsJobs as any)({
          storeId: resolvedStoreId,
          requestBody: data,
        })
      },
    
      get: (id: string, customStoreId?: string) =>
        (ExportsService.getExportsJobs1 as any)({
          id,
          storeId: customStoreId || requireStoreId(),
        }),
      
      download: (id: string, customStoreId?: string) =>
        (ExportsService.getExportsJobsDownload as any)({
          id,
          storeId: customStoreId || requireStoreId(),
        }),
    },
    
    google: {
      status: (customStoreId?: string) =>
        (ExportsService.getExportsGoogleStatus as any)({
          storeId: customStoreId || requireStoreId(),
        }),
      
      connect: (customStoreId?: string) =>
        (ExportsService.postExportsGoogleConnect as any)({
          storeId: customStoreId || requireStoreId(),
        }),
      
      disconnect: (customStoreId?: string) =>
        (ExportsService.postExportsGoogleDisconnect as any)({
          storeId: customStoreId || requireStoreId(),
        }),
    },
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

              status: () =>
        BillingService.getBillingStatus({
          xStoreId: storeId || undefined,
          storeId: storeId || undefined,
        }),

      storeStatus: (id: string) =>
        BillingService.getBillingStoresStatus({ id }),

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

        cancelMe: (id: string) =>
  BookingsService.postBookingsCancelMe({
    id,
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
           reuseExistingAccount: (id: string, sourceStoreId: string) =>
        StripeConnectService.postBillingStoresStripeConnectReuse({
          id,
          requestBody: { sourceStoreId },
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
          xStoreId: params?.storeId || requireStoreId(),
          status: params?.status,
          serviceId: params?.serviceId,
          dateFrom: params?.dateFrom,
          dateTo: params?.dateTo,
        }),
      
      create: (data: any, customStoreId?: string) =>
        BookingsService.postBookings({
          requestBody: data,
          xStoreId: customStoreId || data?.storeId || storeId || undefined,
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

              createCompletionToken: (id: string) =>
        BookingsService.postBookingsCompletionToken({
          id,
        }),

      completeByToken: (
        id: string,
        data: { token: string },
        customStoreId?: string
      ) =>
        BookingsService.postBookingsCompleteByToken({
          id,
          xStoreId: customStoreId || requireStoreId(),
          requestBody: data,
        }),

      completeByCode: (
        id: string,
        data: { code: string },
        customStoreId?: string
      ) =>
        BookingsService.postBookingsCompleteByCode({
          id,
          xStoreId: customStoreId || requireStoreId(),
          requestBody: data,
        }),

              previewSeries: (
        data: {
          storeId?: string
          serviceId: string
          startDate: string
          endDate: string
          weekdays: number[]
          time: string
        },
        customStoreId?: string
      ) =>
        BookingsService.postBookingsSeriesPreview({
          requestBody: data,
          xStoreId: customStoreId || data.storeId || storeId || undefined,
        }),

        previewCustomSeries: (
  data: {
    storeId?: string
    serviceId: string
    dates: { date: string; time: string }[]
  },
  customStoreId?: string
) =>
  BookingsService.postBookingsSeriesCustomPreview({
    requestBody: data,
    xStoreId: customStoreId || data.storeId || storeId || undefined,
  }),

createCustomSeries: (
  data: {
    storeId?: string
    serviceId: string
    dates: { date: string; time: string }[]
    customerName?: string | null
    customerEmail?: string | null
    customerPhone?: string | null
    notes?: string | null
  },
  customStoreId?: string
) =>
  BookingsService.postBookingsSeriesCustom({
    requestBody: data,
    xStoreId: customStoreId || data.storeId || storeId || undefined,
  }),

      createSeries: (
        data: {
          storeId?: string
          serviceId: string
          startDate: string
          endDate: string
          weekdays: number[]
          time: string
          customerName?: string | null
          customerEmail?: string | null
          customerPhone?: string | null
          notes?: string | null
        },
        customStoreId?: string
      ) =>
        BookingsService.postBookingsSeries({
          requestBody: data,
          xStoreId: customStoreId || data.storeId || storeId || undefined,
        }),

      listSeries: (customStoreId?: string) =>
        BookingsService.getBookingsSeries({
          xStoreId: customStoreId || requireStoreId(),
        }),

      mySeries: () => BookingsService.getBookingsSeriesMe(),

      getSeries: (id: string, customStoreId?: string) =>
        BookingsService.getBookingsSeries1({
          id,
          xStoreId: customStoreId || storeId || undefined,
        }),

      cancelSeries: (id: string, customStoreId?: string) =>
        BookingsService.postBookingsSeriesCancel({
          id,
          xStoreId: customStoreId || requireStoreId(),
        }),

      reschedule: (
        id: string,
        data: { startAt: string },
        customStoreId?: string
      ) =>
        BookingsService.postBookingsReschedule({
          id,
          requestBody: data,
          xStoreId: customStoreId || requireStoreId(),
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

      checkoutOrderPreview: (orderId: string) =>
    PublicService.getPublicCheckoutOrdersPreview({
      orderId,
    }),

  store: (slug: string) =>
    PublicService.getPublicStores1({
      slug,
    }),

  nearbyStores: (params: { lat: number; lng: number; radiusKm?: number }) =>
    PublicService.getPublicStoresNearby({
      lat: params.lat,
      lng: params.lng,
      radiusKm: params.radiusKm,
    }),

  

  storeReviews: {
    list: (
      storeId: string,
      params?: { limit?: number; offset?: number }
    ) =>
      PublicService.getPublicStoresReviews({
        id: storeId,
        limit: params?.limit ?? 20,
        offset: params?.offset,
      }),


    all: (
      storeId: string,
      params?: { limit?: number; offset?: number }
    ) =>
      PublicService.getPublicStoresAllReviews({
        id: storeId,
        limit: params?.limit ?? 50,
        offset: params?.offset,
      }),

    create: (
      storeId: string,
      data: { rating: number; comment?: string }
    ) =>
      PublicService.postPublicStoresReviews({
        id: storeId,
        requestBody: data,
      }),

    flag: (storeId: string, reviewId: string) =>
      PublicService.postPublicStoresReviewsFlag({
        id: storeId,
        rid: reviewId,
      }),
  },

  products: (params?: { storeId?: string }) =>
    PublicService.getPublicProducts({
      storeId: params?.storeId,
    }),

      product: (id: string, params: { storeId: string }) =>
    PublicService.getPublicProducts1({
      id,
      storeId: params.storeId,
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


seo: {
  get: (slug: string) =>
    SeoService.getSeo({
      slug,
    }),

    rebuildStoreSeo: (id: string) =>
  SeoService.postSeoStoresRebuild({
    id,
  }),

  getStoreSeo: (id: string) =>
    SeoService.getSeoStores({
      id,
    }),

  updateStoreSeo: (id: string, data: {
    metaTitle?: string | null
    metaDescription?: string | null
    h1?: string | null
    seoImageUrl?: string | null
    canonicalUrl?: string | null
    noindex?: boolean
  }) =>
    SeoService.patchSeoStores({
      id,
      requestBody: data,
    }),

  getStoreStructuredData: (id: string) =>
    SeoService.getSeoStoresStructuredData({
      id,
    }),

updateStoreStructuredData: (
  id: string,
  data: {
    schemaType?: StoreSchemaType

    businessType?: string | null
    businessName?: string | null
    businessUrl?: string | null
    businessImageUrl?: string | null
    businessDescription?: string | null
    descriptionSource?: string | null

    phone?: string | null
    email?: string | null
    website?: string | null

    addressLocality?: string | null
    addressCountry?: string | null
    streetAddress?: string | null
    postalCode?: string | null

    latitude?: number | null
    longitude?: number | null

    openingHours?: any
    openingHoursSpecification?: any
    sameAs?: any
    socialLinksJson?: any

    priceRange?: string | null
    paymentAccepted?: string | null
    currency?: string | null

    aggregateRatingJson?: any
    reviewsJson?: any
    faqJson?: any
  }
) =>
  SeoService.patchSeoStoresStructuredData({
    id,
    requestBody: data,
  }),

  generateStoreStructuredData: (id: string) =>
    SeoService.postSeoStoresStructuredDataGenerate({
      id,
    }),

  sitemap: () =>
    SeoService.getSeoSitemap(),

  rebuild: () =>
    SeoService.postSeoRebuild(),
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

    tags: {
  list: (params?: {
    limit?: number
    offset?: number
    q?: string
    storeId?: string
  }) =>
    TagsService.getTags({
      xStoreId: params?.storeId || storeId || undefined,
      limit: params?.limit,
      offset: params?.offset,
      q: params?.q,
    }),

  create: (data: any, customStoreId?: string) =>
    TagsService.postTags({
      requestBody: data,
      xStoreId: customStoreId || storeId || undefined,
    }),

  generate: (data: any, customStoreId?: string) =>
    TagsService.postTagsGenerate({
      requestBody: data,
      xStoreId: customStoreId || storeId || undefined,
    }),

  delete: (id: string, customStoreId?: string) =>
    TagsService.deleteTags({
      id,
      xStoreId: customStoreId || storeId || undefined,
    }),
},

profile: {
  get: () =>
    ProfileService.getProfile(),

  update: (data: {
    firstName?: string
    lastName?: string
    fullName?: string
    phone?: string
    avatarUrl?: string
    locale?: string
    timezone?: string
    currency?: string
  }) =>
    ProfileService.patchProfile({
      requestBody: data,
    }),

  addresses: {
    list: () =>
      ProfileService.getProfileAddresses(),

    create: (data: {
      line1: string
      line2?: string
      city: string
      region?: string
      country: string
      postalCode?: string
      type?: string
      isDefaultShipping?: boolean
      isDefaultBilling?: boolean
    }) =>
      ProfileService.postProfileAddresses({
        requestBody: data,
      }),

    update: (
      id: string,
      data: {
        line1: string
        line2?: string
        city: string
        region?: string
        country: string
        postalCode?: string
        type?: string
        isDefaultShipping?: boolean
        isDefaultBilling?: boolean
      }
    ) =>
      ProfileService.patchProfileAddresses({
        id,
        requestBody: data,
      }),

    delete: (id: string) =>
      ProfileService.deleteProfileAddresses({
        id,
      }),

    setDefaultShipping: (id: string) =>
      ProfileService.postProfileAddressesDefaultShipping({
        id,
      }),

    setDefaultBilling: (id: string) =>
      ProfileService.postProfileAddressesDefaultBilling({
        id,
      }),
  },
},

    stores: {
      list: () => StoresService.getStores(),

      create: (data: any) =>
        StoresService.postStores({
          requestBody: data,
        }),

      me: () => StoresService.getStoresMe(),

      getById: (id: string) => StoresService.getStores1({ id }),

      getSettings: (id: string) =>
  StoresService.getStoresSettings({ id }),

updateSettings: (id: string, data: any) =>
  StoresService.patchStoresSettings({
    id,
    requestBody: data,
  }),

syncTaxSettingsFromStripe: (id: string) =>
  StoresService.postStoresTaxSettingsSyncStripe({ id }),

      coverPresign: (
      id: string,
      data: {
        filename: string
        contentType: "image/jpeg" | "image/png" | "image/webp" | "image/avif"
      }
    ) =>
      StoresService.postStoresCoverPresign({
        id,
        requestBody: data,
      }),
    
    coverAttach: (
      id: string,
      data: {
        key: string
        url?: string | null
        publicUrl?: string | null
      }
    ) =>
      StoresService.postStoresCover({
        id,
        requestBody: data,
      }),
    
    coverDelete: (id: string) =>
      StoresService.deleteStoresCover({
        id,
      }),

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
          | "SHIPPED"
          | "DELIVERED"
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
          xStoreId: params?.storeId || storeId || undefined,
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
          xStoreId: customStoreId || storeId || undefined,
        }),

      confirm: (id: string, customStoreId?: string) =>
        OrdersService.postOrdersConfirm({
          id,
          xStoreId: customStoreId || requireStoreId(),
        }),

      ship: (
        id: string,
        data: {
          trackingCarrier?: string | null
          trackingNumber?: string | null
          shipmentReceiptUrl?: string | null
        },
        customStoreId?: string
      ) =>
        OrdersService.postOrdersShip({
          id,
          xStoreId: customStoreId || requireStoreId(),
          requestBody: data,
        }),

      confirmReceived: (
        id: string,
        data?: {
          deliveryProofUrl?: string | null
        }
      ) =>
        OrdersService.postOrdersConfirmReceived({
          id,
          requestBody: data || {},
        }),

              createPickupToken: (id: string) =>
        OrdersService.postOrdersPickupToken({
          id,
        }),

      completePickupByToken: (
        id: string,
        data: { token: string },
        customStoreId?: string
      ) =>
        OrdersService.postOrdersCompleteByToken({
          id,
          xStoreId: customStoreId || requireStoreId(),
          requestBody: data,
        }),

      completePickupByCode: (
        id: string,
        data: { code: string },
        customStoreId?: string
      ) =>
        OrdersService.postOrdersCompleteByCode({
          id,
          xStoreId: customStoreId || requireStoreId(),
          requestBody: data,
        }),

      updateStatus: (
        id: string,
        data:
          | UpdateOrderStatusRequest
          | {
              status:
                | "PROCESSING"
                | "READY_FOR_PICKUP"
                | "SHIPPED"
                | "DELIVERED"
                | "FULFILLED"
                | "CANCELLED"
            },
        customStoreId?: string
      ) =>
        OrdersService.patchOrdersStatus({
          id,
          xStoreId: customStoreId || requireStoreId(),
          requestBody: data as UpdateOrderStatusRequest,
        }),

      cancel: (id: string, customStoreId?: string) =>
        OrdersService.postOrdersCancel({
          id,
          xStoreId: customStoreId || undefined,
        }),
        
    },

   payments: {

checkoutPreview: (data: {
  orderId: string
  fulfillmentType?: "STANDARD" | "PICKUP"
  shippingAddressId?: string | null
  pickupAt?: string | null
  pickupReadyAt?: string | null
}) =>
  PaymentsService.postPaymentsCheckoutPreview({
    requestBody: {
      orderId: data.orderId,
      ...(data.fulfillmentType ? { fulfillmentType: data.fulfillmentType } : {}),
      ...(data.shippingAddressId ? { shippingAddressId: data.shippingAddressId } : {}),
      ...(data.pickupAt ? { pickupAt: data.pickupAt } : {}),
      ...(data.pickupReadyAt ? { pickupReadyAt: data.pickupReadyAt } : {}),
    },
  }),

  bookingCheckoutPreview: (data: {
  bookingId: string
}) =>
  PaymentsService.postPaymentsBookingsCheckoutPreview({
    requestBody: {
      bookingId: data.bookingId,
    },
  }),

bookingSeriesCheckoutPreview: (data: {
  seriesId: string
}) =>
  PaymentsService.postPaymentsBookingsSeriesCheckoutPreview({
    requestBody: {
      seriesId: data.seriesId,
    },
  }),

  bookingSeriesCustomCheckoutPreview: (data: {
  storeId?: string
  serviceId: string
  dates: { date: string; time: string }[]
}) =>
  PaymentsService.postPaymentsBookingsSeriesCustomPreview({
    requestBody: {
      ...(data.storeId ? { storeId: data.storeId } : {}),
      serviceId: data.serviceId,
      dates: data.dates,
    },
  }),

  bookingCheckout: (data: {
    bookingId: string
    successUrl?: string
    cancelUrl?: string
  }) =>
    PaymentsService.postPaymentsBookingsCheckout({
      requestBody: data,
    }),

  bookingSeriesCheckout: (data: {
    seriesId: string
    successUrl?: string
    cancelUrl?: string
  }) =>
    PaymentsService.postPaymentsBookingsSeriesCheckout({
      requestBody: {
        seriesId: data.seriesId,
        ...(data.successUrl ? { successUrl: data.successUrl } : {}),
        ...(data.cancelUrl ? { cancelUrl: data.cancelUrl } : {}),
      },
    }),

checkout: (data: {
  orderId: string
  successUrl?: string
  cancelUrl?: string
  fulfillmentType?: "STANDARD" | "PICKUP"
  shippingAddressId?: string | null
  pickupAt?: string | null
  pickupReadyAt?: string | null
}) =>
  PaymentsService.postPaymentsCheckout({
    requestBody: {
      orderId: data.orderId,
      ...(data.successUrl ? { successUrl: data.successUrl } : {}),
      ...(data.cancelUrl ? { cancelUrl: data.cancelUrl } : {}),
      ...(data.fulfillmentType ? { fulfillmentType: data.fulfillmentType } : {}),
      ...(data.shippingAddressId ? { shippingAddressId: data.shippingAddressId } : {}),
      ...(data.pickupAt ? { pickupAt: data.pickupAt } : {}),
      ...(data.pickupReadyAt ? { pickupReadyAt: data.pickupReadyAt } : {}),
    },
  }),

 refund: (
  paymentId: string,
  data?: {
    amountCents?: number | null
    reason?: "duplicate" | "fraudulent" | "requested_by_customer" | null
  },
  customStoreId?: string,
  idempotencyKey?: string
) =>
  PaymentsService.postPaymentsRefund({
    paymentId,
    requestBody: data || {},
    xStoreId: customStoreId || storeId || undefined,
    idempotencyKey,
  } as any),
},

reviews: {
  list: (
    productId: string,
    params?: { limit?: number; offset?: number; storeId?: string }
  ) =>
    ReviewsService.getProductsReviews({
      id: productId,
      xStoreId: params?.storeId || requireStoreId(),
      limit: params?.limit ?? 20,
      offset: params?.offset,
    }),

create: (
  productId: string,
  data: {
    rating: number
    comment?: string
    body?: string | null
    orderItemId?: string | null
  },
  customStoreId?: string
) =>
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

serviceReviews: {
  list: (
    serviceId: string,
    params?: { limit?: number; offset?: number; storeId?: string }
  ) =>
    ServicesService.getServicesReviews({
      id: serviceId,
      xStoreId: params?.storeId || requireStoreId(),
      limit: params?.limit ?? 20,
      offset: params?.offset,
    }),

  create: (
    serviceId: string,
    data: { rating: number; comment?: string; body?: string | null; bookingId?: string | null },
    customStoreId?: string
  ) =>
    ServicesService.postServicesReviews({
      id: serviceId,
      xStoreId: customStoreId || requireStoreId(),
      requestBody: data,
    }),

  flag: (serviceId: string, reviewId: string, customStoreId?: string) =>
    ServicesService.postServicesReviewsFlag({
      id: serviceId,
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