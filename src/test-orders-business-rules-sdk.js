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
const OUT_PATH = "./test-orders-business-rules-sdk-results.json";

const TEST_EMAIL =
  process.env.TEST_EMAIL ||
  `autotest_orders_rules_${Date.now()}@example.com`;
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
  expected = null,
  passed = null,
  extra = {},
}) {
  return {
    step,
    method,
    path,
    status,
    ok,
    expected,
    passed,
    sample: sampleFromValue(value),
    ...extra,
  };
}

function normalizeError(err) {
  return err?.body || err?.message || String(err);
}

function extractOrderId(value) {
  return value?.item?.id || value?.order?.id || value?.id || null;
}

function extractOrder(value) {
  return value?.item || value?.order || value || null;
}

function assertCondition(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function registerUser() {
  return AuthService.postAuthRegister({
    requestBody: {
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      name: "Orders Rules SDK Test",
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
      name: `Orders Rules Store ${ts}`,
      slug: `orders-rules-store-${ts}`,
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
      name: `Orders Rules Category ${ts}`,
      slug: `orders-rules-category-${ts}`,
      position: 1,
    },
  });
}

async function createProduct(categoryId, storeId) {
  const ts = Date.now();
  const imageKey = `products/${storeId}/orders-rules-product-${ts}.jpg`;

  return ProductsService.postProducts({
    xStoreId: storeId,
    requestBody: {
      name: `Orders Rules Product ${ts}`,
      slug: `orders-rules-product-${ts}`,
      sku: `orders-rules-sku-${ts}`,
      price: 29.99,
      description: "Orders rules test product",
      status: "PUBLISHED",
      categoryIds: categoryId ? [categoryId] : [],
      images: [
        {
          key: imageKey,
          url: "https://example.com/orders-rules-test.jpg",
          alt: "Orders rules image",
          isPrimary: true,
          position: 0,
        },
      ],
    },
  });
}

async function createOrder(storeId, productId, notes) {
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
      notes,
    },
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

  console.log("\n=== AUTH ===");
  console.log({
    baseUrl: BASE_URL,
    email: TEST_EMAIL,
  });

  try {
    try {
      await registerUser();
      results.push(
        makeResult({
          step: "register",
          method: "POST",
          path: "/auth/register",
          status: 201,
          ok: true,
          value: { email: TEST_EMAIL },
          expected: "201 created or acceptable duplicate",
          passed: true,
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
            expected: "201 created or acceptable duplicate",
            passed: true,
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

    assertCondition(token, "LOGIN_TOKEN_MISSING");

    userId = login?.user?.id || null;
    assertCondition(userId, "USER_ID_MISSING");

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
        expected: "200 login",
        passed: true,
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
        expected: "successful auth",
        passed: false,
      })
    );

    throw err;
  }

  try {
    const storeResp = await createStore();
    storeId = storeResp?.store?.id || null;
    assertCondition(storeId, "CREATE_STORE_ID_MISSING");

    results.push(
      makeResult({
        step: "create_store",
        method: "POST",
        path: "/stores",
        status: 201,
        ok: true,
        value: storeResp,
        expected: "201 store created",
        passed: true,
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
        expected: "201 store created",
        passed: false,
      })
    );
  }

  if (storeId) {
    try {
      const category = await createCategory(storeId);
      categoryId = category?.id || null;
      assertCondition(categoryId, "CREATE_CATEGORY_ID_MISSING");

      results.push(
        makeResult({
          step: "create_category",
          method: "POST",
          path: "/categories",
          status: 201,
          ok: true,
          value: category,
          expected: "201 category created",
          passed: true,
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
          expected: "201 category created",
          passed: false,
        })
      );
    }
  }

  if (storeId) {
    try {
      const product = await createProduct(categoryId, storeId);
      productId = product?.id || null;
      assertCondition(productId, "CREATE_PRODUCT_ID_MISSING");

      results.push(
        makeResult({
          step: "create_product",
          method: "POST",
          path: "/products",
          status: 201,
          ok: true,
          value: product,
          expected: "201 product created",
          passed: true,
          extra: { storeId, productId, priceCents: product?.priceCents ?? null },
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
          expected: "201 product created",
          passed: false,
        })
      );
    }
  }

  // Scenario A: cancel before payment should be allowed
  let scenarioAOrderId = null;

  if (storeId && productId) {
    try {
      const createdResp = await createOrder(
        storeId,
        productId,
        "Scenario A: cancel before payment"
      );
      const order = extractOrder(createdResp);
      scenarioAOrderId = extractOrderId(createdResp);

      assertCondition(scenarioAOrderId, "SCENARIO_A_CREATE_ORDER_ID_MISSING");
      assertCondition(order?.status === "PENDING", "SCENARIO_A_ORDER_NOT_PENDING");

      results.push(
        makeResult({
          step: "scenario_a_create_order",
          method: "POST",
          path: "/orders",
          status: 201,
          ok: true,
          value: createdResp,
          expected: "201 pending order",
          passed: true,
          extra: {
            storeId,
            productId,
            orderId: scenarioAOrderId,
            orderStatus: order?.status || null,
            paymentStatus: order?.paymentStatus || null,
          },
        })
      );
    } catch (err) {
      results.push(
        makeResult({
          step: "scenario_a_create_order",
          method: "POST",
          path: "/orders",
          status: "ERR",
          ok: false,
          value: normalizeError(err),
          expected: "201 pending order",
          passed: false,
        })
      );
    }
  }

  if (storeId && scenarioAOrderId) {
    try {
      const cancelledResp = await cancelOrder(storeId, scenarioAOrderId);
      const order = extractOrder(cancelledResp);

      assertCondition(order?.status === "CANCELLED", "SCENARIO_A_CANCEL_FAILED");

      results.push(
        makeResult({
          step: "scenario_a_cancel_before_payment",
          method: "POST",
          path: `/orders/${scenarioAOrderId}/cancel`,
          status: 200,
          ok: true,
          value: cancelledResp,
          expected: "200 cancel allowed before payment",
          passed: true,
          extra: {
            storeId,
            orderId: scenarioAOrderId,
            orderStatus: order?.status || null,
            paymentStatus: order?.paymentStatus || null,
          },
        })
      );
    } catch (err) {
      results.push(
        makeResult({
          step: "scenario_a_cancel_before_payment",
          method: "POST",
          path: `/orders/${scenarioAOrderId}/cancel`,
          status: "ERR",
          ok: false,
          value: normalizeError(err),
          expected: "200 cancel allowed before payment",
          passed: false,
        })
      );
    }
  }

  // Scenario B: cancel after payment should be forbidden
  let scenarioBOrderId = null;

  if (storeId && productId) {
    try {
      const createdResp = await createOrder(
        storeId,
        productId,
        "Scenario B: cancel after payment forbidden"
      );
      const order = extractOrder(createdResp);
      scenarioBOrderId = extractOrderId(createdResp);

      assertCondition(scenarioBOrderId, "SCENARIO_B_CREATE_ORDER_ID_MISSING");
      assertCondition(order?.status === "PENDING", "SCENARIO_B_ORDER_NOT_PENDING");

      results.push(
        makeResult({
          step: "scenario_b_create_order",
          method: "POST",
          path: "/orders",
          status: 201,
          ok: true,
          value: createdResp,
          expected: "201 pending order",
          passed: true,
          extra: {
            storeId,
            productId,
            orderId: scenarioBOrderId,
            orderStatus: order?.status || null,
            paymentStatus: order?.paymentStatus || null,
          },
        })
      );
    } catch (err) {
      results.push(
        makeResult({
          step: "scenario_b_create_order",
          method: "POST",
          path: "/orders",
          status: "ERR",
          ok: false,
          value: normalizeError(err),
          expected: "201 pending order",
          passed: false,
        })
      );
    }
  }

  if (storeId && scenarioBOrderId) {
    try {
      const paidResp = await payOrder(storeId, scenarioBOrderId);
      const order = extractOrder(paidResp);

      assertCondition(order?.status === "PAID", "SCENARIO_B_NOT_PAID");
      assertCondition(
        order?.paymentStatus === "SUCCEEDED",
        "SCENARIO_B_PAYMENT_NOT_SUCCEEDED"
      );

      results.push(
        makeResult({
          step: "scenario_b_pay_order",
          method: "POST",
          path: `/orders/${scenarioBOrderId}/pay`,
          status: 200,
          ok: true,
          value: paidResp,
          expected: "200 pay succeeded",
          passed: true,
          extra: {
            storeId,
            orderId: scenarioBOrderId,
            orderStatus: order?.status || null,
            paymentStatus: order?.paymentStatus || null,
            amountCents: paidResp?.payment?.amountCents ?? null,
          },
        })
      );
    } catch (err) {
      results.push(
        makeResult({
          step: "scenario_b_pay_order",
          method: "POST",
          path: `/orders/${scenarioBOrderId}/pay`,
          status: "ERR",
          ok: false,
          value: normalizeError(err),
          expected: "200 pay succeeded",
          passed: false,
        })
      );
    }
  }

  if (storeId && scenarioBOrderId) {
    try {
      await cancelOrder(storeId, scenarioBOrderId);

      results.push(
        makeResult({
          step: "scenario_b_cancel_after_payment",
          method: "POST",
          path: `/orders/${scenarioBOrderId}/cancel`,
          status: 200,
          ok: true,
          value: { error: "unexpected success" },
          expected: "409 ORDER_CANNOT_BE_CANCELLED_AFTER_PAYMENT",
          passed: false,
          extra: { storeId, orderId: scenarioBOrderId },
        })
      );
    } catch (err) {
      const body = err?.body || {};
      const status = err?.status || "ERR";
      const errorCode = body?.error || null;
      const passed =
        status === 409 &&
        errorCode === "ORDER_CANNOT_BE_CANCELLED_AFTER_PAYMENT";

      results.push(
        makeResult({
          step: "scenario_b_cancel_after_payment",
          method: "POST",
          path: `/orders/${scenarioBOrderId}/cancel`,
          status,
          ok: passed,
          value: body || normalizeError(err),
          expected: "409 ORDER_CANNOT_BE_CANCELLED_AFTER_PAYMENT",
          passed,
          extra: {
            storeId,
            orderId: scenarioBOrderId,
            errorCode,
          },
        })
      );
    }
  }

  // Scenario C: double pay should be forbidden
  let scenarioCOrderId = null;

  if (storeId && productId) {
    try {
      const createdResp = await createOrder(
        storeId,
        productId,
        "Scenario C: double pay forbidden"
      );
      scenarioCOrderId = extractOrderId(createdResp);

      assertCondition(scenarioCOrderId, "SCENARIO_C_CREATE_ORDER_ID_MISSING");

      results.push(
        makeResult({
          step: "scenario_c_create_order",
          method: "POST",
          path: "/orders",
          status: 201,
          ok: true,
          value: createdResp,
          expected: "201 pending order",
          passed: true,
          extra: {
            storeId,
            productId,
            orderId: scenarioCOrderId,
          },
        })
      );
    } catch (err) {
      results.push(
        makeResult({
          step: "scenario_c_create_order",
          method: "POST",
          path: "/orders",
          status: "ERR",
          ok: false,
          value: normalizeError(err),
          expected: "201 pending order",
          passed: false,
        })
      );
    }
  }

  if (storeId && scenarioCOrderId) {
    try {
      const paidResp = await payOrder(storeId, scenarioCOrderId);
      const order = extractOrder(paidResp);

      assertCondition(order?.paymentStatus === "SUCCEEDED", "SCENARIO_C_FIRST_PAY_FAILED");

      results.push(
        makeResult({
          step: "scenario_c_first_pay",
          method: "POST",
          path: `/orders/${scenarioCOrderId}/pay`,
          status: 200,
          ok: true,
          value: paidResp,
          expected: "200 first pay succeeded",
          passed: true,
          extra: {
            storeId,
            orderId: scenarioCOrderId,
          },
        })
      );
    } catch (err) {
      results.push(
        makeResult({
          step: "scenario_c_first_pay",
          method: "POST",
          path: `/orders/${scenarioCOrderId}/pay`,
          status: "ERR",
          ok: false,
          value: normalizeError(err),
          expected: "200 first pay succeeded",
          passed: false,
        })
      );
    }
  }

  if (storeId && scenarioCOrderId) {
    try {
      await payOrder(storeId, scenarioCOrderId);

      results.push(
        makeResult({
          step: "scenario_c_second_pay",
          method: "POST",
          path: `/orders/${scenarioCOrderId}/pay`,
          status: 200,
          ok: true,
          value: { error: "unexpected success" },
          expected: "409 ORDER_ALREADY_PAID",
          passed: false,
          extra: { storeId, orderId: scenarioCOrderId },
        })
      );
    } catch (err) {
      const body = err?.body || {};
      const status = err?.status || "ERR";
      const errorCode = body?.error || null;
      const passed = status === 409 && errorCode === "ORDER_ALREADY_PAID";

      results.push(
        makeResult({
          step: "scenario_c_second_pay",
          method: "POST",
          path: `/orders/${scenarioCOrderId}/pay`,
          status,
          ok: passed,
          value: body || normalizeError(err),
          expected: "409 ORDER_ALREADY_PAID",
          passed,
          extra: {
            storeId,
            orderId: scenarioCOrderId,
            errorCode,
          },
        })
      );
    }
  }

  const counts = {
    total: results.length,
    passed: results.filter((r) => r.passed === true).length,
    failed: results.filter((r) => r.passed === false).length,
    errors: results.filter((r) => r.status === "ERR").length,
    ok2xx: results.filter(
      (r) => typeof r.status === "number" && r.status >= 200 && r.status < 300
    ).length,
    conflict409: results.filter((r) => r.status === 409).length,
  };

  console.log("\n=== SUMMARY ===");
  console.log(counts);

  console.log("\n=== DETAILS ===");
  for (const r of results) {
    console.log(
      `[${r.status}] ${r.method} ${r.path} :: passed=${r.passed} :: ${r.sample}`
    );
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
          scenarioAOrderId,
          scenarioBOrderId,
          scenarioCOrderId,
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

  if (counts.failed > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err?.body || err);
  process.exit(1);
});