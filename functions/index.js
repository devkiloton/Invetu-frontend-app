const { setGlobalOptions } = require('firebase-functions/v2');

setGlobalOptions({ maxInstances: 4, timeoutSeconds: 15 });

exports.createUserEntities =
  require('./create-user-entities').createUserEntities;
exports.findHistoryStocksBR =
  require('./find-history-stocks-br').findHistoryStocksBR;
exports.fuzzyStocksBR = require('./fuzzy-stocks-br').fuzzyStocksBR;
exports.findAllCryptos = require('./find-all-cryptos').findAllCryptos;
exports.findCryptosData = require('./find-cryptos-data').findCryptosData;
exports.findFiats = require('./find-fiats').findFiats;
exports.fuzzyStocksUS = require('./fuzzy-stocks-us').fuzzyStocksUS;
exports.findHistoryStocksUS =
  require('./find-history-stocks-us').findHistoryStocksUS;
