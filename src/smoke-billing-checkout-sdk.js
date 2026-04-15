const fs = require("fs/promises");
const sdk = require("./dist/generated/index.js");

const {
  OpenAPI,
  AuthService,
  StoresService,
  BillingService,
} = sdk;

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:4001";
const OUT_PATH =
  process.env.TEST_OUT_PATH || "./test-billing-checkout-sdk-results.json";

const TEST_EMAIL =
  process.env.TEST_EMAIL || `autotest_billing_checkout_${Date.now()}@example.com`;
const TEST_PASSWORD =
  process.env.TEST_PASSWORD || "Test12345!";
const TEST_NAME =
  process.env.TEST_NAME || "Autotest Billing Checkout User";
const TEST_STORE_NAME =
  process.env.TEST_STORE_NAME || `Autotest Billing Store ${Date.now()}`;

OpenAPI.BASE = BASE_URL;

function sample(value) {
  try {
    return JSON.stringify(value).slice(0, 800).replace(/\s+/g, " ");
  } catch {
    return String(value).slice(0, 800).replace(/\s+/g, " ");
  }
}

function pushStep(results, step, status, body) {
  results.steps.push({
    step,
    status,
    body,
    sample: sample(body),
  });
}

function getAccessToken(body) {
  return (
    body?.accessToken ||
    body?.token ||
    body?.data?.accessToken ||
    body?.data?.token ||
    null
  );
}

async function register() {
  return AuthService.postAuthRegister({
    requestBody: {
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      fullName: TEST_NAME,
      name: TEST_NAME,
    },
  });
}

async function login() {
  return AuthService.postAuthLogin({
    requestBody: {
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    },
  });
}

async function ensureAuth(results) {
  try {
    const reg = await register();
    pushStep(results, "register", 201, reg);

    const token = getAccessToken(reg);
    if (token) {
      return { token, mode: "register", body: reg };
    }
  } catch (err) {
    const body = err?.body || err;
    pushStep(results, "register", err?.status || 500, body);

    const maybeExists =
      err?.status === 409 ||
      body?.error === "USER_ALREADY_EXISTS" ||
      body?.error === "EMAIL_ALREADY_EXISTS";

    if (!maybeExists) {
      throw new Error("Register failed and could not recover");
    }
  }

  const log = await login();
  pushStep(results, "login", 200, log);

  const token = getAccessToken(log);
  if (!token) {
    throw new Error("Register failed and login did not return token");
  }

  return { token, mode: "login", body: log };
}

async function getStores() {
  return StoresService.getStores();
}

async function createStore() {
  return StoresService.postStores({
    requestBody: {
      name: TEST_STORE_NAME,
    },
  });
}

async function createCheckout(storeId) {
  return BillingService.postBillingCheckout({
    requestBody: {
      storeId,
      successUrl: "http://localhost:3000/billing/success",
      cancelUrl: "http://localhost:3000/billing/cancel",
    },
  });
}

async function main() {
  const results = {
    ok: true,
    baseUrl: BASE_URL,
    email: TEST_EMAIL,
    steps: [],
    summary: {},
  };

  try {
    const auth = await ensureAuth(results);
    const token = auth.token;

    OpenAPI.TOKEN = token;
    results.summary.authMode = auth.mode;

    let storesRes = await getStores();
    pushStep(results, "stores_list_before", 200, storesRes);

    let stores = storesRes?.items || [];
    let firstStore = stores[0] || null;
    let storeId = firstStore?.id || null;

    if (!storeId) {
      const created = await createStore();
      pushStep(results, "create_store", 201, created);

      storesRes = await getStores();
      pushStep(results, "stores_list_after_create", 200, storesRes);

      stores = storesRes?.items || [];
      firstStore = stores[0] || null;
      storeId = firstStore?.id || null;

      if (!storeId) {
        throw new Error("Store was not found after creation");
      }
    }

    const checkoutRes = await createCheckout(storeId);
    pushStep(results, "billing_checkout", 200, checkoutRes);

    results.summary = {
      ...results.summary,
      storeId,
      storeName: firstStore?.name || null,
      publicUrl: firstStore?.publicUrl || null,
      checkoutUrl: checkoutRes?.url || null,
      checkoutSessionId: checkoutRes?.sessionId || null,
    };
  } catch (err) {
    results.ok = false;
    results.error = err?.body || err?.message || String(err);
  }

  await fs.writeFile(OUT_PATH, JSON.stringify(results, null, 2), "utf8");
  console.log(JSON.stringify(results, null, 2));

  if (!results.ok) {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err?.body || err);
  process.exit(1);
});