import { registerAs } from '@nestjs/config';
export default registerAs('config', () => {
  return {
    apiKey: process.env.API_KEY,
    plaidClientId: process.env.PLAID_CLIENT_ID,
    plaidDev: process.env.PLAID_DEV,
    plaidSandbox: process.env.PLAID_SANDBOX,
  };
});
// TODO: make access token dynamic to Plaid
