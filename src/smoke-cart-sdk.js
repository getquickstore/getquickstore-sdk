const fs = require("fs/promises");
const sdk = require("./dist/generated/index.js");

const {
  OpenAPI,
  AuthService,
  StoresService,
  CategoriesService,
  ProductsService,
  CartService,
} = sdk;

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:4001";
const OUT_PATH = "./test-cart-sdk-results.json";

const TEST_EMAIL =
  process.env.TEST_EMAIL || `autotest_cart_sdk_${Date.now()}@example.com`;
const TEST_PASSWORD = process.env.TEST_PASSWORD || "12345678";

OpenAPI.BASE = BASE_URL;

function sampleFromValue(value) {
  try {
    return JSON.stringify(value).slice(0, 500).replace(/\s+/g, " ");
  } catch {
    return String(value).slice(0, 500).replace(/\s+/g, " ");
  }
}

function makeResult({
  step,
  method,
  path,
  ok,
  status,
  value,
  extra = {},
}) {
  return {
    step,
    method,
    path,
    status,
    ok,
    sample: sampleFromValue(value),
    ...extra,
  };
}

function normalizeError(err) {
  return err?.body || err?.message || String(err);
}

function withStore(storeId) {
  OpenAPI.HEADERS = {
    ...(OpenAPI.HEADERS || {}),
    "x-store-id": storeId,
  };
}

async function registerUser() {
  return AuthService.postAuthRegister({
    requestBody: {
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      name: "Cart SDK Test",
    },
  });
}

async function loginUser() {
  return AuthService.postAuthLogin({
    requestBody: {
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    },
  });
}

async function createStore() {
  const ts = Date.now();

  return StoresService.postStores({
    requestBody: {
      name: `Cart SDK Store ${ts}`,
      slug: `cart-sdk-store-${ts}`,
      defaultCurrency: "EUR",
      defaultLanguage: "en",
    },
  });
}

async function createCategory() {
  const ts = Date.now();

  return CategoriesService.postCategories({
    requestBody: {
      name: `Cart SDK Category ${ts}`,
      slug: `cart-sdk-category-${ts}`,
      position: 1,
    },
  });
}

async function createProduct(categoryId, storeId) {
  const ts = Date.now();
  const imageKey = `products/${storeId}/cart-sdk-product-${ts}.jpg`;

  return ProductsService.postProducts({
    requestBody: {
      name: `Cart SDK Product ${ts}`,
      slug: `cart-sdk-product-${ts}`,
      sku: `cart-sdk-sku-${ts}`,
      price: 19.99,
      description: "Cart SDK smoke test product",
      status: "PUBLISHED",
      categoryIds: categoryId ? [categoryId] : [],
      images: [
        {
          key: imageKey,
          url: "https://example.com/cart-sdk.jpg",
          alt: "Cart SDK image",
          isPrimary: true,
          position: 0,
        },
      ],
    },
  });
}

async function main() {
  const results = [];

  let token = null;
  let userId = null;
  let storeId = null;
  let categoryId = null;
  let productId = null;
  let itemId = null;

  console.log("\n=== AUTH ===");
  console.log({
    baseUrl: BASE_URL,
    email: TEST_EMAIL,
  });

  try {
    let reg = null;

    try {
      reg = await registerUser();
      results.push(
        makeResult({
          step: "register",
          method: "POST",
          path: "/auth/register",
          status: 201,
          ok: true,
          value: reg,
        })
      );
    } catch (err) {
      const body = normalizeError(err);
      const text = typeof body === "string" ? body : JSON.stringify(body);

      if (text.includes("EMAIL_EXISTS") || text.includes("already exists")) {
        results.push(
          makeResult({
            step: "register",
            method: "POST",
            path: "/auth/register",
            status: 409,
            ok: true,
            value: body,
          })
        );
      } else {
        throw err;
      }
    }

    const login = await loginUser();
    token =
      login?.accessToken ||
      login?.token ||
      login?.access_token ||
      null;

    if (!token) {
      throw new Error("LOGIN_TOKEN_MISSING");
    }

    userId = login?.user?.id || null;
    if (!userId) {
      throw new Error("USER_ID_MISSING in login response");
    }

    OpenAPI.TOKEN = token;

    results.push(
      makeResult({
        step: "login",
        method: "POST",
        path: "/auth/login",
        status: 200,
        ok: true,
        value: login,
        extra: { userId },
      })
    );
  } catch (err) {
    results.push(
      makeResult({
        step: "auth",
        method: "POST",
        path: "/auth/*",
        status: "ERR",
        ok: false,
        value: normalizeError(err),
      })
    );
    throw err;
  }

  try {
    const storeResp = await createStore();
    storeId = storeResp?.store?.id || null;

    if (!storeId) {
      throw new Error("CREATE_STORE_ID_MISSING");
    }

    withStore(storeId);

    results.push(
      makeResult({
        step: "create_store",
        method: "POST",
        path: "/stores",
        status: 201,
        ok: true,
        value: storeResp,
        extra: { storeId },
      })
    );
  } catch (err) {
    results.push(
      makeResult({
        step: "create_store",
        method: "POST",
        path: "/stores",
        status: "ERR",
        ok: false,
        value: normalizeError(err),
      })
    );
  }

  if (storeId) {
    try {
      const category = await createCategory();
      categoryId = category?.id || null;

      if (!categoryId) {
        throw new Error("CREATE_CATEGORY_ID_MISSING");
      }

      results.push(
        makeResult({
          step: "create_category",
          method: "POST",
          path: "/categories",
          status: 201,
          ok: true,
          value: category,
          extra: { storeId, categoryId },
        })
      );
    } catch (err) {
      results.push(
        makeResult({
          step: "create_category",
          method: "POST",
          path: "/categories",
          status: "ERR",
          ok: false,
          value: normalizeError(err),
        })
      );
    }
  }

  if (storeId) {
    try {
      const product = await createProduct(categoryId, storeId);
      productId = product?.id || null;

      if (!productId) {
        throw new Error("CREATE_PRODUCT_ID_MISSING");
      }

      results.push(
        makeResult({
          step: "create_product",
          method: "POST",
          path: "/products",
          status: 201,
          ok: true,
          value: product,
          extra: { storeId, productId },
        })
      );
    } catch (err) {
      results.push(
        makeResult({
          step: "create_product",
          method: "POST",
          path: "/products",
          status: "ERR",
          ok: false,
          value: normalizeError(err),
        })
      );
    }
  }

  if (storeId) {
    try {
      const cart = await CartService.getCart({
  xStoreId: storeId,
});

      results.push(
        makeResult({
          step: "get_cart_initial",
          method: "GET",
          path: "/cart",
          status: 200,
          ok: true,
          value: cart,
          extra: { storeId },
        })
      );
    } catch (err) {
      results.push(
        makeResult({
          step: "get_cart_initial",
          method: "GET",
          path: "/cart",
          status: "ERR",
          ok: false,
          value: normalizeError(err),
        })
      );
    }
  }

  if (storeId && productId) {
    try {
const cart = await CartService.postCartAdd({
  xStoreId: storeId,
  requestBody: {
    productId,
    qty: 1,
  },
});

      const items = Array.isArray(cart?.items) ? cart.items : [];
      itemId = items[0]?.id || null;

      results.push(
        makeResult({
          step: "add_to_cart_first",
          method: "POST",
          path: "/cart/add",
          status: 200,
          ok: true,
          value: cart,
          extra: { storeId, productId, itemId },
        })
      );
    } catch (err) {
      results.push(
        makeResult({
          step: "add_to_cart_first",
          method: "POST",
          path: "/cart/add",
          status: "ERR",
          ok: false,
          value: normalizeError(err),
        })
      );
    }
  }

  if (storeId && itemId) {
    try {
const cart = await CartService.postCartSetQty({
  xStoreId: storeId,
  requestBody: {
    itemId,
    qty: 2,
  },
});

      results.push(
        makeResult({
          step: "set_qty_to_2",
          method: "POST",
          path: "/cart/set-qty",
          status: 200,
          ok: true,
          value: cart,
          extra: { storeId, itemId },
        })
      );
    } catch (err) {
      results.push(
        makeResult({
          step: "set_qty_to_2",
          method: "POST",
          path: "/cart/set-qty",
          status: "ERR",
          ok: false,
          value: normalizeError(err),
        })
      );
    }
  }

  if (storeId) {
    try {
      const cart = await CartService.getCart({
  xStoreId: storeId,
});

      results.push(
        makeResult({
          step: "get_cart_after_set_qty",
          method: "GET",
          path: "/cart",
          status: 200,
          ok: true,
          value: cart,
          extra: { storeId },
        })
      );
    } catch (err) {
      results.push(
        makeResult({
          step: "get_cart_after_set_qty",
          method: "GET",
          path: "/cart",
          status: "ERR",
          ok: false,
          value: normalizeError(err),
        })
      );
    }
  }

  if (storeId && itemId) {
    try {
const cart = await CartService.postCartRemove({
  xStoreId: storeId,
  requestBody: {
    itemId,
  },
});

      results.push(
        makeResult({
          step: "remove_item",
          method: "POST",
          path: "/cart/remove",
          status: 200,
          ok: true,
          value: cart,
          extra: { storeId, itemId },
        })
      );
    } catch (err) {
      results.push(
        makeResult({
          step: "remove_item",
          method: "POST",
          path: "/cart/remove",
          status: "ERR",
          ok: false,
          value: normalizeError(err),
        })
      );
    }
  }

  if (storeId && productId) {
    try {
const cart = await CartService.postCartAdd({
  xStoreId: storeId,
  requestBody: {
    productId,
    qty: 1,
  },
});

      const items = Array.isArray(cart?.items) ? cart.items : [];
      itemId = items[0]?.id || itemId;

      results.push(
        makeResult({
          step: "add_to_cart_second",
          method: "POST",
          path: "/cart/add",
          status: 200,
          ok: true,
          value: cart,
          extra: { storeId, productId, itemId },
        })
      );
    } catch (err) {
      results.push(
        makeResult({
          step: "add_to_cart_second",
          method: "POST",
          path: "/cart/add",
          status: "ERR",
          ok: false,
          value: normalizeError(err),
        })
      );
    }
  }

  if (storeId) {
    try {
     const cart = await CartService.postCartClear({
  xStoreId: storeId,
});

      results.push(
        makeResult({
          step: "clear_cart",
          method: "POST",
          path: "/cart/clear",
          status: 200,
          ok: true,
          value: cart,
          extra: { storeId },
        })
      );
    } catch (err) {
      results.push(
        makeResult({
          step: "clear_cart",
          method: "POST",
          path: "/cart/clear",
          status: "ERR",
          ok: false,
          value: normalizeError(err),
        })
      );
    }
  }

  if (storeId) {
    try {
      const cart = await CartService.getCart({
  xStoreId: storeId,
});

      results.push(
        makeResult({
          step: "get_cart_after_clear",
          method: "GET",
          path: "/cart",
          status: 200,
          ok: true,
          value: cart,
          extra: { storeId },
        })
      );
    } catch (err) {
      results.push(
        makeResult({
          step: "get_cart_after_clear",
          method: "GET",
          path: "/cart",
          status: "ERR",
          ok: false,
          value: normalizeError(err),
        })
      );
    }
  }

  const counts = {
    ok2xx: results.filter(
      (r) => typeof r.status === "number" && r.status >= 200 && r.status < 300
    ).length,
    badRequest400: results.filter((r) => r.status === 400).length,
    auth401: results.filter((r) => r.status === 401).length,
    forbidden403: results.filter((r) => r.status === 403).length,
    notFound404: results.filter((r) => r.status === 404).length,
    server5xx: results.filter(
      (r) => typeof r.status === "number" && r.status >= 500
    ).length,
    errors: results.filter((r) => r.status === "ERR").length,
  };

  console.log("\n=== SUMMARY ===");
  console.log(counts);

  console.log("\n=== DETAILS ===");
  for (const r of results) {
    console.log(`[${r.status}] ${r.method} ${r.path} :: ${r.sample}`);
  }

  await fs.writeFile(
    OUT_PATH,
    JSON.stringify(
      {
        baseUrl: BASE_URL,
        auth: {
          email: TEST_EMAIL,
          userId,
        },
        scope: {
          storeId,
        },
        entities: {
          categoryId,
          productId,
          itemId,
        },
        counts,
        results,
      },
      null,
      2
    ),
    "utf8"
  );

  console.log(`\nSaved: ${OUT_PATH}`);
}

main().catch((err) => {
  console.error(err?.body || err);
  process.exit(1);
});