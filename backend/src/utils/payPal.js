import checkoutNodeJssdk from "@paypal/checkout-server-sdk";

const Environment = () => {
  return new checkoutNodeJssdk.core.SandboxEnvironment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_SECRET
  );
};

export const client = () => {
  return new checkoutNodeJssdk.core.PayPalHttpClient(Environment());
};