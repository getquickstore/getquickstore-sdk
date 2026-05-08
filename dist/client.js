"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClient = createClient;
const OpenAPI_1 = require("./generated/core/OpenAPI");
const AuthService_1 = require("./generated/services/AuthService");
const AvailabilityService_1 = require("./generated/services/AvailabilityService");
const BillingService_1 = require("./generated/services/BillingService");
const BillingConnectService_1 = require("./generated/services/BillingConnectService");
const BookingsService_1 = require("./generated/services/BookingsService");
const CalendarService_1 = require("./generated/services/CalendarService");
const CartService_1 = require("./generated/services/CartService");
const CategoriesService_1 = require("./generated/services/CategoriesService");
const OrdersService_1 = require("./generated/services/OrdersService");
const PaymentsService_1 = require("./generated/services/PaymentsService");
const ProductImagesService_1 = require("./generated/services/ProductImagesService");
const ProductsService_1 = require("./generated/services/ProductsService");
const ReviewsService_1 = require("./generated/services/ReviewsService");
const StoresService_1 = require("./generated/services/StoresService");
const ServicesService_1 = require("./generated/services/ServicesService");
const AnalyticsService_1 = require("./generated/services/AnalyticsService");
const ServiceImagesService_1 = require("./generated/services/ServiceImagesService");
const CatalogService_1 = require("./generated/services/CatalogService");
const FavoritesService_1 = require("./generated/services/FavoritesService");
const PublicService_1 = require("./generated/services/PublicService");
const TagsService_1 = require("./generated/services/TagsService");
const SeoService_1 = require("./generated/services/SeoService");
const StripeConnectService_1 = require("./generated/services/StripeConnectService");
const ProfileService_1 = require("./generated/services/ProfileService");
function createClient({ baseUrl, token, storeId }) {
    OpenAPI_1.OpenAPI.BASE = baseUrl;
    const isWeb = typeof window !== "undefined" &&
        typeof document !== "undefined";
    OpenAPI_1.OpenAPI.WITH_CREDENTIALS = isWeb;
    OpenAPI_1.OpenAPI.CREDENTIALS = isWeb ? "include" : "omit";
    OpenAPI_1.OpenAPI.TOKEN = token || undefined;
    OpenAPI_1.OpenAPI.HEADERS = async () => {
        const headers = {};
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
        if (storeId) {
            headers["x-store-id"] = storeId;
        }
        return headers;
    };
    const requireStoreId = (value) => {
        const resolved = value || storeId;
        if (!resolved) {
            throw new Error("storeId is required in client");
        }
        return resolved;
    };
    return {
        auth: {
            login: (email, password) => AuthService_1.AuthService.postAuthLogin({
                requestBody: { email, password },
            }),
            register: (name, email, password) => AuthService_1.AuthService.postAuthRegister({
                requestBody: { name, email, password },
            }),
            me: () => AuthService_1.AuthService.getAuthMe(),
            refresh: (refreshToken) => AuthService_1.AuthService.postAuthRefresh({
                requestBody: refreshToken ? { refreshToken } : {},
            }),
            logout: (data) => AuthService_1.AuthService.postAuthLogout({
                requestBody: data || {},
            }),
            verifyLoginTwoFactor: (data) => AuthService_1.AuthService.postAuthLogin2FaVerify({
                requestBody: data,
            }),
            resendLoginTwoFactor: (challengeId) => AuthService_1.AuthService.postAuthLogin2FaResend({
                requestBody: { challengeId },
            }),
            createWebHandoff: (data) => AuthService_1.AuthService.postAuthWebHandoff({
                requestBody: {
                    ...(data?.nextPath ? { nextPath: data.nextPath } : {}),
                },
            }),
            magicLinkRequest: (email) => AuthService_1.AuthService.postAuthMagicLinkRequest({
                requestBody: { email },
            }),
            magicLinkVerifyByToken: (token) => AuthService_1.AuthService.getAuthMagicLinkVerify({ token }),
            magicLinkVerifyByCode: (data) => AuthService_1.AuthService.postAuthMagicLinkVerify({
                requestBody: data,
            }),
            forgotPassword: (email) => AuthService_1.AuthService.postAuthForgotPassword({
                requestBody: { email },
            }),
            resetPassword: (data) => AuthService_1.AuthService.postAuthResetPassword({
                requestBody: data,
            }),
            requestPasswordReset: (email) => AuthService_1.AuthService.postAuthPasswordResetRequest({
                requestBody: { email },
            }),
            confirmPasswordReset: (data) => AuthService_1.AuthService.postAuthPasswordResetConfirm({
                requestBody: data,
            }),
            getTwoFactorStatus: () => AuthService_1.AuthService.getAuth2Fa(),
            getSessions: () => AuthService_1.AuthService.getAuthSessions(),
            changePassword: (data) => AuthService_1.AuthService.postAuthPasswordChange({
                requestBody: data,
            }),
            confirmEmailVerification: (token) => AuthService_1.AuthService.postAuthEmailVerifyConfirm({
                requestBody: { token },
            }),
            requestEmailVerification: (email) => AuthService_1.AuthService.postAuthEmailVerifyRequest({
                requestBody: { email },
            }),
            requestEmailChange: (newEmail) => AuthService_1.AuthService.postAuthEmailChangeRequest({
                requestBody: { newEmail },
            }),
            confirmEmailChange: (token) => AuthService_1.AuthService.postAuthEmailChangeConfirm({
                requestBody: { token },
            }),
            startReAuth: (action) => AuthService_1.AuthService.postAuthReAuthStart({
                requestBody: { action },
            }),
            verifyReAuth: (data) => AuthService_1.AuthService.postAuthReAuthVerify({
                requestBody: data,
            }),
            startTwoFactorSetup: () => AuthService_1.AuthService.postAuth2FaSetup(),
            confirmTwoFactorSetup: (code) => AuthService_1.AuthService.postAuth2FaConfirm({
                requestBody: { code },
            }),
            disableTwoFactor: (data) => AuthService_1.AuthService.postAuth2FaDisable({
                requestBody: data,
            }),
            regenerateRecoveryCodes: (code) => AuthService_1.AuthService.postAuth2FaRecoveryCodesRegenerate({
                requestBody: { code },
            }),
            revokeSession: (data) => AuthService_1.AuthService.postAuthSessionsRevoke({
                requestBody: data,
            }),
        },
        analytics: {
            overview: (params) => AnalyticsService_1.AnalyticsService.getAnalyticsOverview({
                xStoreId: params?.storeId || requireStoreId(),
                range: params?.range,
            }),
        },
        availability: {
            list: (customStoreId) => AvailabilityService_1.AvailabilityService.getAvailability({
                xStoreId: customStoreId || requireStoreId(),
            }),
            upsert: (data, customStoreId) => AvailabilityService_1.AvailabilityService.postAvailability({
                xStoreId: customStoreId || requireStoreId(),
                requestBody: data,
            }),
            bulk: (items, customStoreId) => AvailabilityService_1.AvailabilityService.putAvailabilityBulk({
                xStoreId: customStoreId || requireStoreId(),
                requestBody: { items },
            }),
            update: (id, data, customStoreId) => AvailabilityService_1.AvailabilityService.patchAvailability({
                id,
                xStoreId: customStoreId || requireStoreId(),
                requestBody: data,
            }),
            delete: (id, customStoreId) => AvailabilityService_1.AvailabilityService.deleteAvailability({
                id,
                xStoreId: customStoreId || requireStoreId(),
            }),
            publicServiceSlots: (serviceId, date, storeId) => AvailabilityService_1.AvailabilityService.getAvailabilityPublicServicesSlots({
                serviceId,
                date,
                storeId,
            }),
        },
        billing: {
            current: () => BillingService_1.BillingService.getBillingCurrent({
                xStoreId: storeId || undefined,
                storeId: storeId || undefined,
            }),
            storeCurrent: (id) => BillingService_1.BillingService.getBillingStoresCurrent({ id }),
            checkout: (data) => BillingService_1.BillingService.postBillingCheckout({
                requestBody: {
                    storeId: requireStoreId(data.storeId),
                    ...(data.successUrl ? { successUrl: data.successUrl } : {}),
                    ...(data.cancelUrl ? { cancelUrl: data.cancelUrl } : {}),
                },
            }),
            portal: (data) => BillingService_1.BillingService.postBillingPortal({
                requestBody: {
                    storeId: requireStoreId(data.storeId),
                    ...(data.returnUrl ? { returnUrl: data.returnUrl } : {}),
                },
            }),
            cancel: (data) => BillingService_1.BillingService.postBillingCancel({
                requestBody: {
                    storeId: requireStoreId(data.storeId),
                },
            }),
        },
        stripeConnect: {
            status: () => BillingConnectService_1.BillingConnectService.getBillingStoresStripeConnectStatus({
                id: requireStoreId(),
            }),
            disconnect: (id) => BillingConnectService_1.BillingConnectService.postBillingStoresStripeDisconnect({ id }),
            statusByStore: (id) => BillingConnectService_1.BillingConnectService.getBillingStoresStripeConnectStatus({ id }),
            start: (data) => BillingService_1.BillingService.postBillingStoresStripeConnectStart({
                id: requireStoreId(),
                requestBody: data,
            }),
            sync: () => BillingConnectService_1.BillingConnectService.postBillingStoresStripeConnectSync({
                id: requireStoreId(),
            }),
            reuseExistingAccount: (id, sourceStoreId) => StripeConnectService_1.StripeConnectService.postBillingStoresStripeConnectReuse({
                id,
                requestBody: { sourceStoreId },
            }),
        },
        bookings: {
            me: () => BookingsService_1.BookingsService.getBookingsMe(),
            list: (params) => BookingsService_1.BookingsService.getBookings({
                xStoreId: params?.storeId || requireStoreId(),
                status: params?.status,
                serviceId: params?.serviceId,
                dateFrom: params?.dateFrom,
                dateTo: params?.dateTo,
            }),
            create: (data, customStoreId) => BookingsService_1.BookingsService.postBookings({
                requestBody: data,
                xStoreId: customStoreId || data?.storeId || storeId || undefined,
            }),
            get: (id, customStoreId) => BookingsService_1.BookingsService.getBookings1({
                id,
                xStoreId: customStoreId || storeId || undefined,
            }),
            update: (id, data, customStoreId) => BookingsService_1.BookingsService.patchBookings({
                id,
                requestBody: data,
                xStoreId: customStoreId || storeId || undefined,
            }),
            cancel: (id, customStoreId) => BookingsService_1.BookingsService.postBookingsCancel({
                id,
                xStoreId: customStoreId || storeId || undefined,
            }),
            createCompletionToken: (id) => BookingsService_1.BookingsService.postBookingsCompletionToken({
                id,
            }),
            completeByToken: (id, data, customStoreId) => BookingsService_1.BookingsService.postBookingsCompleteByToken({
                id,
                xStoreId: customStoreId || requireStoreId(),
                requestBody: data,
            }),
            completeByCode: (id, data, customStoreId) => BookingsService_1.BookingsService.postBookingsCompleteByCode({
                id,
                xStoreId: customStoreId || requireStoreId(),
                requestBody: data,
            }),
            previewSeries: (data, customStoreId) => BookingsService_1.BookingsService.postBookingsSeriesPreview({
                requestBody: data,
                xStoreId: customStoreId || data.storeId || storeId || undefined,
            }),
            previewCustomSeries: (data, customStoreId) => BookingsService_1.BookingsService.postBookingsSeriesCustomPreview({
                requestBody: data,
                xStoreId: customStoreId || data.storeId || storeId || undefined,
            }),
            createCustomSeries: (data, customStoreId) => BookingsService_1.BookingsService.postBookingsSeriesCustom({
                requestBody: data,
                xStoreId: customStoreId || data.storeId || storeId || undefined,
            }),
            createSeries: (data, customStoreId) => BookingsService_1.BookingsService.postBookingsSeries({
                requestBody: data,
                xStoreId: customStoreId || data.storeId || storeId || undefined,
            }),
            listSeries: (customStoreId) => BookingsService_1.BookingsService.getBookingsSeries({
                xStoreId: customStoreId || requireStoreId(),
            }),
            mySeries: () => BookingsService_1.BookingsService.getBookingsSeriesMe(),
            getSeries: (id, customStoreId) => BookingsService_1.BookingsService.getBookingsSeries1({
                id,
                xStoreId: customStoreId || storeId || undefined,
            }),
            cancelSeries: (id, customStoreId) => BookingsService_1.BookingsService.postBookingsSeriesCancel({
                id,
                xStoreId: customStoreId || requireStoreId(),
            }),
            reschedule: (id, data, customStoreId) => BookingsService_1.BookingsService.postBookingsReschedule({
                id,
                requestBody: data,
                xStoreId: customStoreId || requireStoreId(),
            }),
        },
        calendar: {
            getDay: (date, customStoreId) => CalendarService_1.CalendarService.getCalendarDay({
                date,
                xStoreId: customStoreId || requireStoreId(),
            }),
            getWeek: (date, customStoreId) => CalendarService_1.CalendarService.getCalendarWeek({
                date,
                xStoreId: customStoreId || requireStoreId(),
            }),
        },
        cart: {
            get: () => CartService_1.CartService.getCart(),
            add: (data) => CartService_1.CartService.postCartAdd({
                requestBody: data,
            }),
            setQty: (data) => CartService_1.CartService.postCartSetQty({
                requestBody: data,
            }),
            remove: (data) => CartService_1.CartService.postCartRemove({
                requestBody: data,
            }),
            clear: () => CartService_1.CartService.postCartClear(),
        },
        catalog: {
            featured: (params) => CatalogService_1.CatalogService.getCatalogFeatured({
                limit: params?.limit ?? 12,
                q: params?.q,
            }),
        },
        public: {
            stores: (params) => PublicService_1.PublicService.getPublicStores({
                q: params?.q,
            }),
            store: (slug) => PublicService_1.PublicService.getPublicStores1({
                slug,
            }),
            nearbyStores: (params) => PublicService_1.PublicService.getPublicStoresNearby({
                lat: params.lat,
                lng: params.lng,
                radiusKm: params.radiusKm,
            }),
            storeReviews: {
                list: (storeId, params) => PublicService_1.PublicService.getPublicStoresReviews({
                    id: storeId,
                    limit: params?.limit ?? 20,
                    offset: params?.offset,
                }),
                all: (storeId, params) => PublicService_1.PublicService.getPublicStoresAllReviews({
                    id: storeId,
                    limit: params?.limit ?? 50,
                    offset: params?.offset,
                }),
                create: (storeId, data) => PublicService_1.PublicService.postPublicStoresReviews({
                    id: storeId,
                    requestBody: data,
                }),
                flag: (storeId, reviewId) => PublicService_1.PublicService.postPublicStoresReviewsFlag({
                    id: storeId,
                    rid: reviewId,
                }),
            },
            products: (params) => PublicService_1.PublicService.getPublicProducts({
                storeId: params?.storeId,
            }),
            services: (params) => PublicService_1.PublicService.getPublicServices({
                storeId: params?.storeId,
            }),
            categories: (params) => PublicService_1.PublicService.getPublicCategories({
                storeId: params?.storeId,
            }),
            catalog: () => PublicService_1.PublicService.getPublicCatalog(),
        },
        seo: {
            get: (slug) => SeoService_1.SeoService.getSeo({
                slug,
            }),
            getStoreSeo: (id) => SeoService_1.SeoService.getSeoStores({
                id,
            }),
            updateStoreSeo: (id, data) => SeoService_1.SeoService.patchSeoStores({
                id,
                requestBody: data,
            }),
            getStoreStructuredData: (id) => SeoService_1.SeoService.getSeoStoresStructuredData({
                id,
            }),
            updateStoreStructuredData: (id, data) => SeoService_1.SeoService.patchSeoStoresStructuredData({
                id,
                requestBody: data,
            }),
            generateStoreStructuredData: (id) => SeoService_1.SeoService.postSeoStoresStructuredDataGenerate({
                id,
            }),
            sitemap: () => SeoService_1.SeoService.getSeoSitemap(),
            rebuild: () => SeoService_1.SeoService.postSeoRebuild(),
        },
        categories: {
            list: (params) => CategoriesService_1.CategoriesService.getCategories({
                xStoreId: params?.storeId || storeId || undefined,
                limit: params?.limit,
                offset: params?.offset,
                q: params?.q,
            }),
            create: (data, customStoreId) => CategoriesService_1.CategoriesService.postCategories({
                requestBody: data,
                xStoreId: customStoreId || storeId || undefined,
            }),
            update: (id, data, customStoreId) => CategoriesService_1.CategoriesService.patchCategories({
                id,
                requestBody: data,
                xStoreId: customStoreId || storeId || undefined,
            }),
            delete: (id, customStoreId) => CategoriesService_1.CategoriesService.deleteCategories({
                id,
                xStoreId: customStoreId || storeId || undefined,
            }),
        },
        tags: {
            list: (params) => TagsService_1.TagsService.getTags({
                xStoreId: params?.storeId || storeId || undefined,
                limit: params?.limit,
                offset: params?.offset,
                q: params?.q,
            }),
            create: (data, customStoreId) => TagsService_1.TagsService.postTags({
                requestBody: data,
                xStoreId: customStoreId || storeId || undefined,
            }),
            generate: (data, customStoreId) => TagsService_1.TagsService.postTagsGenerate({
                requestBody: data,
                xStoreId: customStoreId || storeId || undefined,
            }),
            delete: (id, customStoreId) => TagsService_1.TagsService.deleteTags({
                id,
                xStoreId: customStoreId || storeId || undefined,
            }),
        },
        profile: {
            get: () => ProfileService_1.ProfileService.getProfile(),
            update: (data) => ProfileService_1.ProfileService.patchProfile({
                requestBody: data,
            }),
            addresses: {
                list: () => ProfileService_1.ProfileService.getProfileAddresses(),
                create: (data) => ProfileService_1.ProfileService.postProfileAddresses({
                    requestBody: data,
                }),
                update: (id, data) => ProfileService_1.ProfileService.patchProfileAddresses({
                    id,
                    requestBody: data,
                }),
                delete: (id) => ProfileService_1.ProfileService.deleteProfileAddresses({
                    id,
                }),
                setDefaultShipping: (id) => ProfileService_1.ProfileService.postProfileAddressesDefaultShipping({
                    id,
                }),
                setDefaultBilling: (id) => ProfileService_1.ProfileService.postProfileAddressesDefaultBilling({
                    id,
                }),
            },
        },
        stores: {
            list: () => StoresService_1.StoresService.getStores(),
            create: (data) => StoresService_1.StoresService.postStores({
                requestBody: data,
            }),
            me: () => StoresService_1.StoresService.getStoresMe(),
            getById: (id) => StoresService_1.StoresService.getStores1({ id }),
            getSettings: (id) => StoresService_1.StoresService.getStoresSettings({ id }),
            updateSettings: (id, data) => StoresService_1.StoresService.patchStoresSettings({
                id,
                requestBody: data,
            }),
            syncTaxSettingsFromStripe: (id) => StoresService_1.StoresService.postStoresTaxSettingsSyncStripe({ id }),
            coverPresign: (id, data) => StoresService_1.StoresService.postStoresCoverPresign({
                id,
                requestBody: data,
            }),
            coverAttach: (id, data) => StoresService_1.StoresService.postStoresCover({
                id,
                requestBody: data,
            }),
            coverDelete: (id) => StoresService_1.StoresService.deleteStoresCover({
                id,
            }),
            update: (id, data) => StoresService_1.StoresService.patchStores({
                id,
                requestBody: data,
            }),
            select: (id) => StoresService_1.StoresService.postStoresSelect({ id }),
            setVisibility: (id, isPublic) => StoresService_1.StoresService.patchStoresVisibility({
                id,
                requestBody: { isPublic },
            }),
            archive: (id) => StoresService_1.StoresService.deleteStores({ id }),
        },
        products: {
            list: (customStoreId, params) => ProductsService_1.ProductsService.getProducts({
                xStoreId: customStoreId || storeId || undefined,
                limit: params?.limit,
                offset: params?.offset,
                q: params?.q,
                category: params?.category,
                categoryId: params?.categoryId,
                status: params?.status,
                sort: params?.sort,
            }),
            get: (id, customStoreId) => ProductsService_1.ProductsService.getProducts1({
                id,
                xStoreId: customStoreId || storeId || undefined,
            }),
            create: (data, customStoreId) => ProductsService_1.ProductsService.postProducts({
                requestBody: data,
                xStoreId: customStoreId || storeId || undefined,
            }),
            update: (id, data, customStoreId) => ProductsService_1.ProductsService.patchProducts({
                id,
                requestBody: data,
                xStoreId: customStoreId || storeId || undefined,
            }),
            delete: (id, customStoreId) => ProductsService_1.ProductsService.deleteProducts({
                id,
                xStoreId: customStoreId || storeId || undefined,
            }),
            publicGet: (id, storeId) => ProductsService_1.ProductsService.getProductsPublic({
                id,
                storeId,
            }),
        },
        productImages: {
            list: (productId, customStoreId) => ProductImagesService_1.ProductImagesService.getProductsImages({
                productId,
                xStoreId: customStoreId || requireStoreId(),
            }),
            presign: (productId, data, customStoreId) => ProductImagesService_1.ProductImagesService.postProductsImagesPresign({
                productId,
                xStoreId: customStoreId || requireStoreId(),
                requestBody: data,
            }),
            create: (productId, data, customStoreId) => ProductImagesService_1.ProductImagesService.postProductsImages({
                productId,
                xStoreId: customStoreId || requireStoreId(),
                requestBody: data,
            }),
            update: (productId, imageId, data, customStoreId) => ProductImagesService_1.ProductImagesService.patchProductsImages({
                productId,
                imageId,
                xStoreId: customStoreId || requireStoreId(),
                requestBody: data,
            }),
            delete: (productId, imageId, customStoreId) => ProductImagesService_1.ProductImagesService.deleteProductsImages({
                productId,
                imageId,
                xStoreId: customStoreId || requireStoreId(),
            }),
        },
        serviceImages: {
            list: (serviceId, customStoreId) => ServiceImagesService_1.ServiceImagesService.getServicesImages({
                serviceId,
                xStoreId: customStoreId || requireStoreId(),
            }),
            presign: (serviceId, data, customStoreId) => ServiceImagesService_1.ServiceImagesService.postServicesImagesPresign({
                serviceId,
                xStoreId: customStoreId || requireStoreId(),
                requestBody: data,
            }),
            create: (serviceId, data, customStoreId) => ServiceImagesService_1.ServiceImagesService.postServicesImages({
                serviceId,
                xStoreId: customStoreId || requireStoreId(),
                requestBody: data,
            }),
            update: (serviceId, imageId, data, customStoreId) => ServiceImagesService_1.ServiceImagesService.patchServicesImages({
                serviceId,
                imageId,
                xStoreId: customStoreId || requireStoreId(),
                requestBody: data,
            }),
            delete: (serviceId, imageId, customStoreId) => ServiceImagesService_1.ServiceImagesService.deleteServicesImages({
                serviceId,
                imageId,
                xStoreId: customStoreId || requireStoreId(),
            }),
        },
        favorites: {
            list: (params) => FavoritesService_1.FavoritesService.getFavorites({
                type: params?.type,
            }),
            add: (data) => FavoritesService_1.FavoritesService.postFavorites({
                requestBody: data,
            }),
            remove: (data) => FavoritesService_1.FavoritesService.deleteFavorites({
                requestBody: data,
            }),
        },
        orders: {
            list: (params) => OrdersService_1.OrdersService.getOrders({
                xStoreId: params?.storeId || undefined,
                limit: params?.limit,
                status: params?.status,
                paymentStatus: params?.paymentStatus,
                customerId: params?.customerId,
                fulfillmentType: params?.fulfillmentType,
            }),
            create: (data) => OrdersService_1.OrdersService.postOrders({
                requestBody: {
                    ...data,
                    storeId: requireStoreId(data.storeId),
                },
            }),
            get: (id, customStoreId) => OrdersService_1.OrdersService.getOrders1({
                id,
                xStoreId: customStoreId || undefined,
            }),
            confirm: (id, customStoreId) => OrdersService_1.OrdersService.postOrdersConfirm({
                id,
                xStoreId: customStoreId || requireStoreId(),
            }),
            ship: (id, data, customStoreId) => OrdersService_1.OrdersService.postOrdersShip({
                id,
                xStoreId: customStoreId || requireStoreId(),
                requestBody: data,
            }),
            confirmReceived: (id, data) => OrdersService_1.OrdersService.postOrdersConfirmReceived({
                id,
                requestBody: data || {},
            }),
            updateStatus: (id, data, customStoreId) => OrdersService_1.OrdersService.patchOrdersStatus({
                id,
                xStoreId: customStoreId || requireStoreId(),
                requestBody: data,
            }),
            cancel: (id, customStoreId) => OrdersService_1.OrdersService.postOrdersCancel({
                id,
                xStoreId: customStoreId || undefined,
            }),
        },
        payments: {
            checkoutPreview: (data) => PaymentsService_1.PaymentsService.postPaymentsCheckoutPreview({
                requestBody: {
                    orderId: data.orderId,
                    ...(data.fulfillmentType
                        ? { fulfillmentType: data.fulfillmentType }
                        : {}),
                    ...(data.shippingAddressId
                        ? { shippingAddressId: data.shippingAddressId }
                        : {}),
                },
            }),
            bookingCheckout: (data) => PaymentsService_1.PaymentsService.postPaymentsBookingsCheckout({
                requestBody: data,
            }),
            bookingSeriesCheckout: (data) => PaymentsService_1.PaymentsService.postPaymentsBookingsSeriesCheckout({
                requestBody: {
                    seriesId: data.seriesId,
                    ...(data.successUrl ? { successUrl: data.successUrl } : {}),
                    ...(data.cancelUrl ? { cancelUrl: data.cancelUrl } : {}),
                },
            }),
            checkout: (data) => PaymentsService_1.PaymentsService.postPaymentsCheckout({
                requestBody: {
                    orderId: data.orderId,
                    ...(data.successUrl ? { successUrl: data.successUrl } : {}),
                    ...(data.cancelUrl ? { cancelUrl: data.cancelUrl } : {}),
                },
            }),
            refund: (paymentId, data, customStoreId) => PaymentsService_1.PaymentsService.postPaymentsRefund({
                paymentId,
                requestBody: data,
                xStoreId: customStoreId || storeId || undefined,
            }),
        },
        reviews: {
            list: (productId, params) => ReviewsService_1.ReviewsService.getProductsReviews({
                id: productId,
                xStoreId: params?.storeId || requireStoreId(),
                limit: params?.limit ?? 20,
                offset: params?.offset,
            }),
            create: (productId, data, customStoreId) => ReviewsService_1.ReviewsService.postProductsReviews({
                id: productId,
                xStoreId: customStoreId || requireStoreId(),
                requestBody: data,
            }),
            flag: (productId, reviewId, customStoreId) => ReviewsService_1.ReviewsService.postProductsReviewsFlag({
                id: productId,
                rid: reviewId,
                xStoreId: customStoreId || requireStoreId(),
            }),
        },
        serviceReviews: {
            list: (serviceId, params) => ServicesService_1.ServicesService.getServicesReviews({
                id: serviceId,
                xStoreId: params?.storeId || requireStoreId(),
                limit: params?.limit ?? 20,
                offset: params?.offset,
            }),
            create: (serviceId, data, customStoreId) => ServicesService_1.ServicesService.postServicesReviews({
                id: serviceId,
                xStoreId: customStoreId || requireStoreId(),
                requestBody: data,
            }),
            flag: (serviceId, reviewId, customStoreId) => ServicesService_1.ServicesService.postServicesReviewsFlag({
                id: serviceId,
                rid: reviewId,
                xStoreId: customStoreId || requireStoreId(),
            }),
        },
        services: {
            list: (customStoreId, includeInactive) => ServicesService_1.ServicesService.getServices({
                xStoreId: customStoreId || requireStoreId(),
                includeInactive,
            }),
            create: (data, customStoreId) => ServicesService_1.ServicesService.postServices({
                xStoreId: customStoreId || requireStoreId(),
                requestBody: data,
            }),
            update: (id, data, customStoreId) => ServicesService_1.ServicesService.patchServices({
                id,
                xStoreId: customStoreId || requireStoreId(),
                requestBody: data,
            }),
            delete: (id, customStoreId) => ServicesService_1.ServicesService.deleteServices({
                id,
                xStoreId: customStoreId || requireStoreId(),
            }),
            getAvailability: (id, date, customStoreId) => ServicesService_1.ServicesService.getServicesAvailability({
                xStoreId: customStoreId || requireStoreId(),
                id,
                date,
            }),
        },
    };
}
