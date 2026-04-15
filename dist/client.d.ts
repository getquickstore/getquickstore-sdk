type ClientConfig = {
    baseUrl: string;
    token?: string;
    storeId?: string;
};
export declare function createClient({ baseUrl, token, storeId }: ClientConfig): {
    auth: {
        login: (email: string, password: string) => import("./generated").CancelablePromise<import("./generated").AuthSuccessResponse>;
        register: (name: string, email: string, password: string) => import("./generated").CancelablePromise<import("./generated").AuthSuccessResponse>;
        me: () => import("./generated").CancelablePromise<import("./generated").AuthMeResponse>;
    };
    billing: {
        current: () => import("./generated").CancelablePromise<import("./generated").BillingCurrentResponse>;
        checkout: (data?: {
            successUrl?: string | null;
            cancelUrl?: string | null;
        }) => import("./generated").CancelablePromise<import("./generated").BillingCheckoutResponse>;
        portal: (data?: {
            returnUrl?: string | null;
        }) => import("./generated").CancelablePromise<import("./generated").BillingPortalResponse>;
        cancel: () => import("./generated").CancelablePromise<import("./generated").BillingCancelResponse>;
    };
    stripeConnect: {
        status: () => import("./generated").CancelablePromise<import("./generated").StripeConnectStatusResponse>;
        start: () => import("./generated").CancelablePromise<import("./generated").StripeConnectStartResponse>;
        sync: () => import("./generated").CancelablePromise<import("./generated").StripeConnectStatusResponse>;
    };
    stores: {
        create: (data: any) => import("./generated").CancelablePromise<import("./generated").CreateStoreResponse>;
        me: () => import("./generated").CancelablePromise<import("./generated").StoresMeResponse>;
    };
    categories: {
        list: () => import("./generated").CancelablePromise<import("./generated").CategoryListResponse>;
        create: (data: any) => import("./generated").CancelablePromise<import("./generated").Category>;
    };
    products: {
        list: () => import("./generated").CancelablePromise<import("./generated").ProductListResponse>;
        get: (id: string) => import("./generated").CancelablePromise<import("./generated").ProductDetail>;
        create: (data: any) => import("./generated").CancelablePromise<import("./generated").ProductDetail>;
    };
    orders: {
        list: () => import("./generated").CancelablePromise<import("./generated").OrderListResponse>;
        get: (id: string) => import("./generated").CancelablePromise<import("./generated").OrderSingleResponse>;
        create: (data: any) => import("./generated").CancelablePromise<import("./generated").OrderSingleResponse>;
    };
};
export {};
