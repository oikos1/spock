require('dotenv').config();

import {db,sql} from './db';
import {tronWeb,tronGrid} from './tronWeb';

const utils = require('./utils');
const addresses = require('../addr.json');
const actions = require('./actions')
const chain = process.env.ETH_CHAIN || 'mainnet';

module.exports = {
  sql: {
    insertBlock:   sql('insertBlock.sql'),
    priorBlocks:   sql('priorBlocks.sql'),
    missingBlocks: sql('missingBlocks.sql'),    
    insertTx:      sql('insertTx.sql'),
    insertPoll:    sql('insertPoll.sql'),
    insertVote:    sql('insertVote.sql'),  
    insertMkrTx:   sql('insertMkrTx.sql'),
    getProxy:      sql('getProxy.sql') ,
    insertProxy:   sql('insertProxy.sql') 

  },
  db: db,
  tronWeb:tronWeb,
  tronGrid:tronGrid,
  addresses: addresses["mainnet"],
  u: utils,
  act:actions,
  latestBlock: utils.getCurrentBlock(),
  genBlock: 1, //process.env.DEPLOY_BLOCK
};