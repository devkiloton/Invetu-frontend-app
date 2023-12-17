const { default: axios } = require('axios');
const { onRequest } = require('firebase-functions/v2/https');

exports.fuzzyStocksBR = onRequest(
  { secrets: ['API_TOKEN', 'API_URL'], region: 'southamerica-east1' },
  (req, res) => {
    const id = req.query.id;
    axios
      .get(
        `${process.env.API_URL}/available?search=${id}&token=${process.env.API_TOKEN}`,
      )
      .then(response => res.status(200).send(response.data));
  },
);
