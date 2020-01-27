require('dotenv').config();

import {db,sql} from './db';
import {tronWeb,tronGrid} from './tronWeb';

const utils = require('./utils');
const addresses = require('../addr.json');
const chain = process.env.ETH_CHAIN || 'mainnet';

module.exports = {
  sql: {
    insertBlock:   sql('insertBlock.sql'),
    priorBlocks:   sql('priorBlocks.sql'),
    missingBlocks: sql('missingBlocks.sql'),    
    insertTx:      sql('insertTx.sql'),
    insertPoll:    sql('insertPoll.sql'),
    insertVote:    sql('insertVote.sql'),  
    insertMkrTx:   sql('insertMkrTx.sql')

  },
  db: db,
  tronWeb:tronWeb,
  tronGrid:tronGrid,
  addresses: addresses["mainnet"],
  u: utils,
  latestBlock: utils.getCurrentBlock(),
  genBlock: 45000, //process.env.DEPLOY_BLOCK
};