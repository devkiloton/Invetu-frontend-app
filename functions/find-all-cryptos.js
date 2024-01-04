const { default: axios } = require('axios');
const { onRequest } = require('firebase-functions/v2/https');

exports.findAllCryptos = onRequest(
  {
    secrets: ['API_CRYPTO_TOKEN', 'API_CRYPTO_URL'],
    region: 'southamerica-east1',
  },
  (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    axios
      .get(`${process.env.API_CRYPTO_URL}/coins?limit=100`, {
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': process.env.API_CRYPTO_TOKEN,
        },
      })
      .then(response => res.status(200).send(response.data));
  },
);
