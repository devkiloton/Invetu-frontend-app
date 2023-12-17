const { default: axios } = require('axios');
const { onRequest } = require('firebase-functions/v2/https');

exports.findHistoryStocksBR = onRequest(
  { secrets: ['API_TOKEN', 'API_URL'], region: 'southamerica-east1' },
  (req, res) => {
    const idsString = req.query.ids;
    const range = req.query.range;
    const interval = req.query.interval;
    // run an await loop over the idsString array and each loop has 10 elements
    const promises = [];

    const asyncIterator = (async function* () {
      // returns 20 elements at a time
      for (let i = 0; i < idsString.length; i += 20) {
        const ids = idsString.slice(i, i + 20);
        yield ids;
      }
    })();
    const stocksIterator = async () => {
      for await (const value of asyncIterator) {
        await axios
          .get(
            `${process.env.API_URL}/quote/${value}?range=${range}&interval=${interval}&token=${process.env.API_TOKEN}&dividends=true`,
          )
          .then(response => {
            promises.push(response.data);
          });
      }
    };
    stocksIterator().then(() => res.status(200).send(promises));
  },
);
