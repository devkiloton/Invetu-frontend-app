const { default: axios } = require('axios');
const { onRequest } = require('firebase-functions/v2/https');

exports.fuzzyStocksUS = onRequest(
  {
    secrets: ['ALPHA_VANTAGE_API_KEY', 'ALPHA_VANTAGE_API_URL'],
    region: 'southamerica-east1',
  },
  (req, res) => {
    const id = req.query.id;
    res.set('Access-Control-Allow-Origin', '*');
    axios
      .get(
        `${process.env.ALPHA_VANTAGE_API_URL}/query?function=SYMBOL_SEARCH&keywords=${id}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`,
      )
      .then(response =>
        res.status(200).send(
          // Filter to only USA later
          response.data.bestMatches.filter(
            stock => stock['4. region'] === 'United States',
          ),
        ),
      );
  },
);
