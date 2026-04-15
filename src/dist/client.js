"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClient = createClient;
const OpenAPI_1 = require("./generated/core/OpenAPI");
const ProductsService_1 = require("./generated/services/ProductsService");
const OrdersService_1 = require("./generated/services/OrdersService");
const CategoriesService_1 = require("./generated/services/CategoriesService");
function createClient({ baseUrl, token, storeId }) {
    OpenAPI_1.OpenAPI.BASE = baseUrl;
    OpenAPI_1.OpenAPI.HEADERS = async () => ({
        Authorization: token ? `Bearer ${token}` : undefined,
    });
    if (!storeId) {
        throw new Error("createClient: storeId is required");
    }
    return {
        categories: {
            list: () => CategoriesService_1.CategoriesService.getCategories({ xStoreId: storeId }),
            create: (data) => CategoriesService_1.CategoriesService.postCategories({
                requestBody: data,
                xStoreId: storeId,
            }),
        },
        products: {
            list: () => ProductsService_1.ProductsService.getProducts({ xStoreId: storeId }),
            get: (id) => ProductsService_1.ProductsService.getProducts1({ id, xStoreId: storeId }),
            create: (data) => ProductsService_1.ProductsService.postProducts({
                requestBody: data,
                xStoreId: storeId,
            }),
        },
        orders: {
            list: () => OrdersService_1.OrdersService.getOrders({ xStoreId: storeId }),
            get: (id) => OrdersService_1.OrdersService.getOrders1({ id, xStoreId: storeId }),
            create: (data) => OrdersService_1.OrdersService.postOrders({
                requestBody: data,
                xStoreId: storeId,
            }),
        },
    };
}
