// src\client.ts

import { OpenAPI } from "./generated/core/OpenAPI";
import { ProductsService } from "./generated/services/ProductsService";
import { OrdersService } from "./generated/services/OrdersService";
import { CategoriesService } from "./generated/services/CategoriesService";

type ClientConfig = {
  baseUrl: string;
  token?: string;
  storeId?: string;
};

export function createClient({ baseUrl, token, storeId }: ClientConfig) {
  OpenAPI.BASE = baseUrl;

  OpenAPI.HEADERS = async () => ({
    Authorization: token ? `Bearer ${token}` : undefined,
  });

  if (!storeId) {
    throw new Error("createClient: storeId is required");
  }

  return {
    categories: {
      list: () => CategoriesService.getCategories({ xStoreId: storeId }),
      create: (data: any) =>
        CategoriesService.postCategories({
          requestBody: data,
          xStoreId: storeId,
        }),
    },

    products: {
      list: () => ProductsService.getProducts({ xStoreId: storeId }),
      get: (id: string) =>
        ProductsService.getProducts1({ id, xStoreId: storeId }),
      create: (data: any) =>
        ProductsService.postProducts({
          requestBody: data,
          xStoreId: storeId,
        }),
    },

    orders: {
      list: () => OrdersService.getOrders({ xStoreId: storeId }),
      get: (id: string) =>
        OrdersService.getOrders1({ id, xStoreId: storeId }),
      create: (data: any) =>
        OrdersService.postOrders({
          requestBody: data,
          xStoreId: storeId,
        }),
    },
  };
}