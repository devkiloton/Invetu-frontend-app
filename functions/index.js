const { setGlobalOptions } = require('firebase-functions/v2');

setGlobalOptions({ maxInstances: 4, timeoutSeconds: 15 });

exports.createUserEntities =
  require('./create-user-entities').createUserEntities;
exports.findHistoryStocksBR =
  require('./find-history-stocks-br').findHistoryStocksBR;
exports.fuzzyStocksBR = require('./fuzzy-stocks-br').fuzzyStocksBR;
