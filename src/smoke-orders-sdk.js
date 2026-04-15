const fs = require("fs/promises");
const sdk = require("./dist/generated/index.js");

const {
  OpenAPI,
  AuthService,
  StoresService,
  CategoriesService,
  ProductsService,
  OrdersService,
} = sdk;

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:4001";
const OUT_PATH = "./test-orders-sdk-results.json";

const TEST_EMAIL =
  process.env.TEST_EMAIL || `autotest_orders_${Date.now()}@example.com`;
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
function extractOrderId(value) {
  return value?.item?.id || value?.order?.id || value?.id || null;
}

function extractOrder(value) {
  return value?.item || value?.order || value || null;
}
function normalizeError(err) {
  return err?.body || err?.message || String(err);
}

async function registerUser() {
  return AuthService.postAuthRegister({
    requestBody: {
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      name: "Orders SDK Test",
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
      name: `Orders Test Store ${ts}`,
      slug: `orders-test-store-${ts}`,
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
      name: `Orders Test Category ${ts}`,
      slug: `orders-test-category-${ts}`,
      position: 1,
    },
  });
}

async function createProduct(categoryId, storeId) {
  const ts = Date.now();
  const imageKey = `products/${storeId}/orders-smoke-product-${ts}.jpg`;

  return ProductsService.postProducts({
    xStoreId: storeId,
    requestBody: {
      name: `Orders Smoke Product ${ts}`,
      slug: `orders-smoke-product-${ts}`,
      sku: `orders-smoke-sku-${ts}`,
      price: 29.99,
      description: "Orders smoke test product",
      status: "PUBLISHED",
      categoryIds: categoryId ? [categoryId] : [],
      images: [
        {
          key: imageKey,
          url: "https://example.com/orders-test.jpg",
          alt: "Orders smoke image",
          isPrimary: true,
          position: 0,
        },
      ],
    },
  });
}

async function createOrder(storeId, productId) {
  return OrdersService.postOrders({
    xStoreId: storeId,
    requestBody: {
      items: [
        {
          productId,
          qty: 2,
        },
      ],
      currency: "EUR",
      notes: "Smoke order",
    },
  });
}

async function listOrders(storeId) {
  return OrdersService.getOrders({
    xStoreId: storeId,
  });
}

async function getOrder(storeId, orderId) {
  return OrdersService.getOrders1({
    id: orderId,
    xStoreId: storeId,
  });
}

async function payOrder(storeId, orderId) {
  return OrdersService.postOrdersPay({
    id: orderId,
    xStoreId: storeId,
  });
}

async function cancelOrder(storeId, orderId) {
  return OrdersService.postOrdersCancel({
    id: orderId,
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
  let orderId = null;

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

    userId = login?.user?.id || null;
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
    storeId = storeResp?.store?.id || null;

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

if (storeId && productId) {
  try {
    const orderResp = await createOrder(storeId, productId);
    const createdOrder = extractOrder(orderResp);
    orderId = extractOrderId(orderResp);

    if (!orderId) {
      console.dir(orderResp, { depth: 10 });
      throw new Error("CREATE_ORDER_ID_MISSING");
    }

    results.push(
      makeResult({
        step: "create_order",
        method: "POST",
        path: "/orders",
        status: 201,
        ok: true,
        value: orderResp,
        extra: {
          storeId,
          productId,
          orderId,
          orderStatus: createdOrder?.status || null,
          paymentStatus: createdOrder?.paymentStatus || null,
          totalCents: createdOrder?.totalCents ?? null,
        },
      })
    );
  } catch (err) {
    results.push(
      makeResult({
        step: "create_order",
        method: "POST",
        path: "/orders",
        status: "ERR",
        ok: false,
        value: normalizeError(err),
      })
    );
  }
}

  if (storeId) {
    try {
      const list = await listOrders(storeId);

      results.push(
        makeResult({
          step: "list_orders",
          method: "GET",
          path: "/orders",
          status: 200,
          ok: true,
          value: list,
          extra: { storeId },
        })
      );
    } catch (err) {
      results.push(
        makeResult({
          step: "list_orders",
          method: "GET",
          path: "/orders",
          status: "ERR",
          ok: false,
          value: normalizeError(err),
        })
      );
    }
  }

if (storeId && orderId) {
  try {
    const orderResp = await getOrder(storeId, orderId);
    const order = extractOrder(orderResp);

    results.push(
      makeResult({
        step: "get_order",
        method: "GET",
        path: `/orders/${orderId}`,
        status: 200,
        ok: true,
        value: orderResp,
        extra: {
          storeId,
          orderId,
          orderStatus: order?.status || null,
          paymentStatus: order?.paymentStatus || null,
          totalCents: order?.totalCents ?? null,
        },
      })
    );
  } catch (err) {
    results.push(
      makeResult({
        step: "get_order",
        method: "GET",
        path: `/orders/${orderId}`,
        status: "ERR",
        ok: false,
        value: normalizeError(err),
      })
    );
  }
}

if (storeId && orderId) {
  try {
    const paidResp = await payOrder(storeId, orderId);
    const paidOrder = extractOrder(paidResp);
    const payment = paidResp?.payment || null;

    results.push(
      makeResult({
        step: "pay_order",
        method: "POST",
        path: `/orders/${orderId}/pay`,
        status: 200,
        ok: true,
        value: paidResp,
        extra: {
          storeId,
          orderId,
          paymentId: payment?.id || null,
          orderStatus: paidOrder?.status || null,
          paymentStatus: paidOrder?.paymentStatus || payment?.status || null,
          amountCents: payment?.amountCents ?? null,
        },
      })
    );
  } catch (err) {
    results.push(
      makeResult({
        step: "pay_order",
        method: "POST",
        path: `/orders/${orderId}/pay`,
        status: "ERR",
        ok: false,
        value: normalizeError(err),
      })
    );
  }
}

if (storeId && orderId) {
  try {
    const orderResp = await getOrder(storeId, orderId);
    const order = extractOrder(orderResp);

    results.push(
      makeResult({
        step: "get_order_after_pay",
        method: "GET",
        path: `/orders/${orderId}`,
        status: 200,
        ok: true,
        value: orderResp,
        extra: {
          storeId,
          orderId,
          orderStatus: order?.status || null,
          paymentStatus: order?.paymentStatus || null,
          totalCents: order?.totalCents ?? null,
        },
      })
    );
  } catch (err) {
    results.push(
      makeResult({
        step: "get_order_after_pay",
        method: "GET",
        path: `/orders/${orderId}`,
        status: "ERR",
        ok: false,
        value: normalizeError(err),
      })
    );
  }
}

if (storeId && orderId) {
  try {
    const cancelledResp = await cancelOrder(storeId, orderId);
    const cancelledOrder = extractOrder(cancelledResp);

    results.push(
      makeResult({
        step: "cancel_order",
        method: "POST",
        path: `/orders/${orderId}/cancel`,
        status: 200,
        ok: true,
        value: cancelledResp,
        extra: {
          storeId,
          orderId,
          orderStatus: cancelledOrder?.status || null,
          paymentStatus: cancelledOrder?.paymentStatus || null,
        },
      })
    );
  } catch (err) {
    results.push(
      makeResult({
        step: "cancel_order",
        method: "POST",
        path: `/orders/${orderId}/cancel`,
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
    conflict409: results.filter((r) => r.status === 409).length,
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
          orderId,
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