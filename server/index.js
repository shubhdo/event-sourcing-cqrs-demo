require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const PAYPAL_API = 'https://api-m.sandbox.paypal.com';
const CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;

async function getAccessToken() {
  const response = await axios.post(
    `${PAYPAL_API}/v1/oauth2/token`,
    'grant_type=client_credentials',
    {
      auth: { username: CLIENT_ID, password: CLIENT_SECRET },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }
  );
  return response.data.access_token;
}

app.post('/api/create-product', async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    const product = await axios.post(
      `${PAYPAL_API}/v1/catalogs/products`,
      req.body,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    res.json(product.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/create-plan', async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    const plan = await axios.post(
      `${PAYPAL_API}/v1/billing/plans`,
      req.body,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    res.json(plan.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/create-agreement', async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    const agreement = await axios.post(
      `${PAYPAL_API}/v1/billing/subscriptions`,
      req.body,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    res.json(agreement.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/execute-agreement', async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    const { agreementId } = req.body;
    const result = await axios.post(
      `${PAYPAL_API}/v1/billing/subscriptions/${agreementId}/activate`,
      {},
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    res.json(result.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
