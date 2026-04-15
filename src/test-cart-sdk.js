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
  process.env.TEST_EMAIL || `autotest_cart_${Date.now()}@example.com`;
const TEST_PASSWORD = process.env.TEST_PASSWORD || "12345678";

OpenAPI.BASE = BASE_URL;

function sampleFromValue(value) {
  try {
    return JSON.stringify(value).slice(0, 700).replace(/\s+/g, " ");
  } catch {
    return String(value).slice(0, 700).replace(/\s+/g, " ");
  }
}

function makeResult({
  step,
  method,
  path,
  status,
  ok,
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

function extractStoreId(value) {
  return value?.store?.id || value?.item?.id || value?.id || null;
}

function extractCategoryId(value) {
  return value?.item?.id || value?.id || null;
}

function extractProductId(value) {
  return value?.item?.id || value?.id || null;
}

function extractCart(value) {
  return value?.cart || value?.item || value || null;
}

function extractCartItems(value) {
  const cart = extractCart(value);
  return Array.isArray(cart?.items) ? cart.items : [];
}

function extractFirstItemId(value) {
  const items = extractCartItems(value);
  return items[0]?.id || null;
}

function requireCart(value, stepName) {
  const cart = extractCart(value);

  if (!cart || typeof cart !== "object" || !cart.id || !Array.isArray(cart.items)) {
    throw new Error(
      `${stepName}_CART_RESPONSE_MISSING: ${sampleFromValue(value)}`
    );
  }

  return cart;
}

function makeCartExtra(value, extra = {}) {
  const cart = extractCart(value);

  return {
    ...extra,
    cartId: cart?.id || null,
    totalCents: cart?.totalCents ?? null,
    itemsCount: Array.isArray(cart?.items) ? cart.items.length : null,
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
      name: `Cart Test Store ${ts}`,
      slug: `cart-test-store-${ts}`,
      defaultCurrency: "EUR",
      defaultLanguage: "en",
    },
  });
}

async function createCategory(storeId) {
  const ts = Date.now();

  return CategoriesService.postCategories({
    xStoreId: storeId,
    requestBody: {
      name: `Cart Test Category ${ts}`,
      slug: `cart-test-category-${ts}`,
      position: 1,
    },
  });
}

async function createProduct(categoryId, storeId) {
  const ts = Date.now();
  const imageKey = `products/${storeId}/cart-smoke-product-${ts}.jpg`;

  return ProductsService.postProducts({
    xStoreId: storeId,
    requestBody: {
      name: `Cart Smoke Product ${ts}`,
      slug: `cart-smoke-product-${ts}`,
      sku: `cart-smoke-sku-${ts}`,
      price: 19.99,
      description: "Cart smoke test product",
      status: "PUBLISHED",
      categoryIds: categoryId ? [categoryId] : [],
      images: [
        {
          key: imageKey,
          url: "https://example.com/cart-test.jpg",
          alt: "Cart smoke image",
          isPrimary: true,
          position: 0,
        },
      ],
    },
  });
}

async function getCart(storeId) {
  return CartService.getCart({
    xStoreId: storeId,
  });
}

async function addToCart(storeId, productId, qty) {
  return CartService.postCartAdd({
    xStoreId: storeId,
    requestBody: {
      productId,
      qty,
    },
  });
}

async function setCartQty(storeId, itemId, qty) {
  return CartService.postCartSetQty({
    xStoreId: storeId,
    requestBody: {
      itemId,
      qty,
    },
  });
}

async function removeCartItem(storeId, itemId) {
  return CartService.postCartRemove({
    xStoreId: storeId,
    requestBody: {
      itemId,
    },
  });
}

async function clearCart(storeId) {
  return CartService.postCartClear({
    xStoreId: storeId,
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
    try {
      const reg = await registerUser();

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

    userId = login?.user?.id || login?.user?.sub || null;
    if (!userId) {
      throw new Error("USER_ID_MISSING in login response");
    }

    OpenAPI.TOKEN = token;
    OpenAPI.HEADERS = async () => ({
      Authorization: `Bearer ${token}`,
    });

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
    storeId = extractStoreId(storeResp);

    if (!storeId) {
      throw new Error("CREATE_STORE_ID_MISSING");
    }

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
      const category = await createCategory(storeId);
      categoryId = extractCategoryId(category);

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
      productId = extractProductId(product);

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
      const cartResp = await getCart(storeId);
      requireCart(cartResp, "GET_CART_INITIAL");

      results.push(
        makeResult({
          step: "get_cart_initial",
          method: "GET",
          path: "/cart",
          status: 200,
          ok: true,
          value: cartResp,
          extra: makeCartExtra(cartResp, { storeId }),
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
      const cartResp = await addToCart(storeId, productId, 1);
      const cart = requireCart(cartResp, "ADD_TO_CART_FIRST");

      itemId = cart.items[0]?.id || null;

      results.push(
        makeResult({
          step: "add_to_cart_first",
          method: "POST",
          path: "/cart/add",
          status: 200,
          ok: true,
          value: cartResp,
          extra: makeCartExtra(cartResp, {
            storeId,
            productId,
            itemId,
          }),
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
      const cartResp = await setCartQty(storeId, itemId, 2);
      requireCart(cartResp, "SET_QTY_TO_2");

      results.push(
        makeResult({
          step: "set_qty_to_2",
          method: "POST",
          path: "/cart/set-qty",
          status: 200,
          ok: true,
          value: cartResp,
          extra: makeCartExtra(cartResp, { storeId, itemId }),
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
      const cartResp = await getCart(storeId);
      requireCart(cartResp, "GET_CART_AFTER_SET_QTY");

      results.push(
        makeResult({
          step: "get_cart_after_set_qty",
          method: "GET",
          path: "/cart",
          status: 200,
          ok: true,
          value: cartResp,
          extra: makeCartExtra(cartResp, { storeId }),
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
      const cartResp = await removeCartItem(storeId, itemId);
      requireCart(cartResp, "REMOVE_ITEM");

      results.push(
        makeResult({
          step: "remove_item",
          method: "POST",
          path: "/cart/remove",
          status: 200,
          ok: true,
          value: cartResp,
          extra: makeCartExtra(cartResp, { storeId, itemId }),
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
      const cartResp = await addToCart(storeId, productId, 3);
      const cart = requireCart(cartResp, "ADD_TO_CART_SECOND");

      itemId = cart.items[0]?.id || itemId;

      results.push(
        makeResult({
          step: "add_to_cart_second",
          method: "POST",
          path: "/cart/add",
          status: 200,
          ok: true,
          value: cartResp,
          extra: makeCartExtra(cartResp, {
            storeId,
            productId,
            itemId,
          }),
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
      const cartResp = await clearCart(storeId);
      requireCart(cartResp, "CLEAR_CART");

      results.push(
        makeResult({
          step: "clear_cart",
          method: "POST",
          path: "/cart/clear",
          status: 200,
          ok: true,
          value: cartResp,
          extra: makeCartExtra(cartResp, { storeId }),
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
      const cartResp = await getCart(storeId);
      requireCart(cartResp, "GET_CART_AFTER_CLEAR");

      results.push(
        makeResult({
          step: "get_cart_after_clear",
          method: "GET",
          path: "/cart",
          status: 200,
          ok: true,
          value: cartResp,
          extra: makeCartExtra(cartResp, { storeId }),
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