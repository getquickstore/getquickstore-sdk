type ClientConfig = {
    baseUrl: string;
    token?: string;
    storeId?: string;
};
export declare function createClient({ baseUrl, token, storeId }: ClientConfig): {
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
