const { default: axios } = require('axios');
const { onRequest } = require('firebase-functions/v2/https');

exports.findHistoryStocksUS = onRequest(
  {
    secrets: ['ALPHA_VANTAGE_API_KEY', 'ALPHA_VANTAGE_API_URL'],
    region: 'southamerica-east1',
  },
  (req, res) => {
    const idsString = req.query.ids.split(',');
    const outputsize = req.query.outputsize;
    res.set('Access-Control-Allow-Origin', '*');
    const promises = [];

    // Using async generator to iterate over ids as a woraround to avoid the 1 id limit, in this way we can get 1+ ids in a single request
    const asyncGen = (async function* () {
      // returns 1 elements at a time
      for (let i = 0; i < idsString.length; i += 1) {
        const ids = idsString.slice(i, i + 1);
        yield ids;
      }
    })();
    const stocksUSIteraor = async () => {
      for await (const value of asyncGen) {
        await axios
          .get(
            `${process.env.ALPHA_VANTAGE_API_URL}/query?function=TIME_SERIES_DAILY&symbol=${value}&outputsize=${outputsize}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`,
          )
          .then(response =>
            // Filter to only USA later
            promises.push(response.data),
          );
      }
    };
    stocksUSIteraor().then(() => {
      res.status(200).send(promises);
    });
  },
);
