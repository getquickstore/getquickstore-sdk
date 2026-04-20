type ClientConfig = {
    baseUrl: string;
    token?: string;
    storeId?: string;
};
export declare function createClient({ baseUrl, token, storeId }: ClientConfig): {
    auth: {
        login: (email: string, password: string) => import("./generated").CancelablePromise<import("./generated").AuthSuccessResponse>;
        register: (name: string, email: string, password: string) => import("./generated").CancelablePromise<import("./generated").AuthSuccessResponse>;
        me: () => Promise<import("./generated").AuthMeResponse>;
        refresh: () => import("./generated").CancelablePromise<import("./generated").AuthSuccessResponse>;
        logout: () => import("./generated").CancelablePromise<void>;
    };
    billing: {
        current: () => Promise<import("./generated").BillingCurrentResponse>;
        checkout: (data?: {
            successUrl?: string | null;
            cancelUrl?: string | null;
        }) => Promise<import("./generated").BillingCheckoutResponse>;
        portal: (data?: {
            returnUrl?: string | null;
        }) => Promise<import("./generated").BillingPortalResponse>;
        cancel: () => Promise<import("./generated").BillingCancelResponse>;
    };
    stripeConnect: {
        status: () => Promise<import("./generated").StripeConnectStatusResponse>;
        start: (data: {
            returnUrl: string;
            refreshUrl: string;
        }) => Promise<import("./generated").BillingStripeConnectStartResponse>;
        sync: () => Promise<import("./generated").StripeConnectStatusResponse>;
    };
    stores: {
        create: (data: any) => Promise<import("./generated").CreateStoreResponse>;
        me: () => Promise<import("./generated").StoresMeResponse>;
    };
    categories: {
        list: () => Promise<import("./generated").CategoryListResponse>;
        create: (data: any) => Promise<import("./generated").Category>;
    };
    products: {
        list: () => Promise<import("./generated").ProductListResponse>;
        get: (id: string) => Promise<import("./generated").ProductDetail>;
        create: (data: any) => Promise<import("./generated").ProductDetail>;
    };
    orders: {
        list: () => Promise<import("./generated").OrderListResponse>;
        get: (id: string) => Promise<import("./generated").OrderSingleResponse>;
        create: (data: any) => Promise<import("./generated").OrderSingleResponse>;
    };
};
export {};
