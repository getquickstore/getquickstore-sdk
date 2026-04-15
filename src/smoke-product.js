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

    const reg = await AuthService.postAuthRegister({
      requestBody: {
        email,
        password,
        name: "SDK Product Test",
      },
    });

    OpenAPI.TOKEN = reg.accessToken;

    const storeResp = await StoresService.postStores({
      requestBody: {
        name: "Product Test Store",
        slug: `product-store-${Date.now()}`,
      },
    });

    const storeId = storeResp?.store?.id;
    OpenAPI.HEADERS = {
      ...(OpenAPI.HEADERS || {}),
      "x-store-id": storeId,
    };

    console.log("[1] create product");

    const created = await ProductsService.postProducts({
      requestBody: {
        name: "Test Product",
        slug: `test-product-${Date.now()}`,
        priceCents: 1999,
        currency: "EUR",
      },
    });

    console.log("CREATED PRODUCT:", created);

    console.log("[2] get product by id");

    const productId = created?.id;
    const fetched = await ProductsService.getProducts1({
      id: productId,
    });

    console.log("FETCHED PRODUCT:", fetched);

    console.log("[3] list products");

    const list = await ProductsService.getProducts();
    console.log("PRODUCT LIST:", list);
  } catch (err) {
    console.error("PRODUCT TEST ERROR:");
    console.error(err?.body || err);
  }
}

main();