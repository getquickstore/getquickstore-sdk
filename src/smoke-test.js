const {
  OpenAPI,
  AuthService,
  StoresService,
  ProductsService,
} = require("./dist/generated/index.js");

OpenAPI.BASE = "http://localhost:4001";

async function main() {
  try {
    const email = `sdk_${Date.now()}@example.com`;
    const password = "Test123456!";

    console.log("[1] register");
    const reg = await AuthService.postAuthRegister({
      requestBody: {
        email,
        password,
        name: "SDK Test",
      },
    });
    console.log("REGISTER OK:", reg);

    OpenAPI.TOKEN =
      reg?.accessToken ||
      reg?.tokens?.accessToken ||
      reg?.token ||
      null;

    console.log("[2] me");
    const me = await AuthService.getAuthMe();
    console.log("ME OK:", me);

    console.log("[3] create store");
    const storeResp = await StoresService.postStores({
      requestBody: {
        name: "Test Store",
        slug: `store-${Date.now()}`,
      },
    });
    console.log("STORE OK:", storeResp);

    const storeId =
      storeResp?.store?.id ||
      storeResp?.id ||
      storeResp?.storeId ||
      null;

    if (storeId) {
      OpenAPI.HEADERS = {
        ...(OpenAPI.HEADERS || {}),
        "x-store-id": storeId,
      };
      console.log("STORE HEADER SET:", storeId);
    } else {
      console.log("STORE HEADER NOT SET: no store id found in response");
    }

    console.log("[4] stores/me");
    const storesMe = await StoresService.getStoresMe();
    console.log("STORES ME OK:", storesMe);

    console.log("[5] products");
    const products = await ProductsService.getProducts();
    console.log("PRODUCTS OK:", products);
  } catch (err) {
    console.error("SDK TEST ERROR:");
    console.error(err?.body || err);
  }
}

main();