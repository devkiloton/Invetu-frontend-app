const { default: axios } = require('axios');
const { onRequest } = require('firebase-functions/v2/https');

exports.findCryptosData = onRequest(
  {
    secrets: ['API_CRYPTO_TOKEN', 'API_CRYPTO_URL'],
    region: 'southamerica-east1',
  },
  (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    const idsString = req.query.ids.split(',');
    const period = req.query.period;

    const promises = [];

    // Using async generator to iterate over ids as a woraround to avoid the 1 id limit, in this way we can get 1+ ids in a single request
    const asyncGen = (async function* () {
      // returns 1 elements at a time
      for (let i = 0; i < idsString.length; i += 1) {
        const ids = idsString.slice(i, i + 1);
        yield ids;
      }
    })();
    const cryptoIterator = async () => {
      for await (const value of asyncGen) {
        await axios
          .get(
            `${process.env.API_CRYPTO_URL}/coins/${value}/charts?period=${period}`,
            {
              headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': process.env.API_CRYPTO_TOKEN,
              },
            },
          )
          .then(response => {
            promises.push({
              id: value[0],
              results: response.data,
            });
          });
      }
    };
    cryptoIterator().then(() => {
      res.status(200).send(promises);
    });
  },
);
