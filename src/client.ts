// src\client.ts

import { OpenAPI } from "./generated/core/OpenAPI"
import { AuthService } from "./generated/services/AuthService"
import { BillingService } from "./generated/services/BillingService"
import { BillingConnectService } from "./generated/services/BillingConnectService"
import { StoresService } from "./generated/services/StoresService"
import { ProductsService } from "./generated/services/ProductsService"
import { OrdersService } from "./generated/services/OrdersService"
import { CategoriesService } from "./generated/services/CategoriesService"

type ClientConfig = {
  baseUrl: string
  token?: string
  storeId?: string
}

export function createClient({ baseUrl, token, storeId }: ClientConfig) {
  OpenAPI.BASE = baseUrl
  OpenAPI.HEADERS = async () => ({
    Authorization: token ? `Bearer ${token}` : undefined,
  })

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
    },

    billing: {
      current: () =>
        BillingService.getBillingCurrent({
          storeId: storeId || undefined,
        }),
      checkout: (data?: { successUrl?: string | null; cancelUrl?: string | null }) =>
        BillingService.postBillingCheckout({
          requestBody: {
            storeId: storeId!,
            successUrl: data?.successUrl ?? null,
            cancelUrl: data?.cancelUrl ?? null,
          },
        }),
      portal: (data?: { returnUrl?: string | null }) =>
        BillingService.postBillingPortal({
          requestBody: {
            storeId: storeId!,
            returnUrl: data?.returnUrl ?? null,
          },
        }),
      cancel: () =>
        BillingService.postBillingCancel({
          requestBody: {
            storeId: storeId!,
          },
        }),
    },

    stripeConnect: {
      status: () =>
        BillingConnectService.getBillingStoresStripeConnectStatus({
          id: storeId!,
        }),
      start: () =>
        BillingConnectService.postBillingStoresStripeConnectStart({
          id: storeId!,
        }),
      sync: () =>
        BillingConnectService.postBillingStoresStripeConnectSync({
          id: storeId!,
        }),
    },

    stores: {
      create: (data: any) =>
        StoresService.postStores({
          requestBody: data,
        }),
      me: () => StoresService.getStoresMe(),
    },

    categories: {
      list: () => CategoriesService.getCategories({ xStoreId: storeId! }),
      create: (data: any) =>
        CategoriesService.postCategories({
          requestBody: data,
          xStoreId: storeId!,
        }),
    },

    products: {
      list: () => ProductsService.getProducts({ xStoreId: storeId! }),
      get: (id: string) =>
        ProductsService.getProducts1({ id, xStoreId: storeId! }),
      create: (data: any) =>
        ProductsService.postProducts({
          requestBody: data,
          xStoreId: storeId!,
        }),
    },

    orders: {
      list: () => OrdersService.getOrders({ xStoreId: storeId! }),
      get: (id: string) =>
        OrdersService.getOrders1({ id, xStoreId: storeId! }),
      create: (data: any) =>
        OrdersService.postOrders({
          requestBody: data,
          xStoreId: storeId!,
        }),
    },
  }
}