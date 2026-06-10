import checkoutNodeJssdk from "@paypal/checkout-server-sdk";

// Sandbox environment only
const environment = new checkoutNodeJssdk.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_SECRET
);

const paypalClient = new checkoutNodeJssdk.core.PayPalHttpClient(environment);

export default paypalClient;