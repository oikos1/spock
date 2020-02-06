const R   = require('ramda');
const lib = require('../lib/common');
const poll   = require('../libexec/polling');
const mkr   = require('../libexec/mkr');
const dschief   = require('../libexec/dschief');

var isSubscribed = false;

export const sync = (n) => {
   return  lib.tronWeb.trx.getBlock(n)
  .then( block => {
    //console.log("got block", block)
    write(block.blockID, n, block.block_header.raw_data.timestamp, block.transactions)
  });
 
 }

/*export const subscribe = () => {
  if (!isSubscribed)
  _subscribe();
  return  lib.tronWeb.trx.getBlock('latest')
  .then( block => write( block.block_header.raw_data.number, block.block_header.raw_data.timestamp))  
}*/

const write =  (hash, n, timestamp, txs) => {
  return (() => Promise.all([]))()
  .then(() => {
    //console.log("got hash", hash)
    let transactions = [];
    
    if (typeof txs !== "undefined")
      if (txs.length>0)
        for (var i=0;i<txs.length;i++) {
          let tx = {txID: txs[i].txID,
                    data: txs[i].raw_data_hex, 
                    //timestamp: txs[i].raw_data.timestamp,
                    block: n};
          transactions.push(tx);
        }
    return [{
      id: n,
      number: n,
      hash: hash.substr(0,66),
      timestamp: timestamp,
    }, transactions]
  })
  .then(data => {

    //console.log("writing data", data[0], "txs", data[1])
    lib.db.none(lib.sql.insertBlock, data[0])
    .then(() =>{

      for (var i=0;i<data[1].length;i++) {

        //console.log("tx", data[1][i])
        
        lib.db.none(lib.sql.insertTx,{tx: data[1][i]})

        .catch(e => console.log(e)).then((res) =>{

            //console.log("res from inserting tx ", res)

            dschief.sync(n);

        })
      }
      syncOthers(n);
    })
    .catch(e => console.log(e))
  })
  .catch(e => console.log(e));
}

const syncOthers = (n) => {
      poll.syncPoll(n); 
      poll.syncVote(n);     
      mkr.sync(n);  
}
//-----------------------------------------------
// Sync All
//-----------------------------------------------
const concurrency = 50;
const diff = (a, b) => a - b;

export const syncMissing = () => {
    lib.latestBlock.then( (res) => {
          return { from: lib.genBlock, to: res.block_header.raw_data.number }
    }).then(opts => missingBlocks(opts))
    .then(rtn => R.sort(diff, rtn.map(R.prop('number'))))
    .then(rtn => syncEach(rtn, syncMissing))
    .catch(function (err) {
      console.log(err)
    });
}

export const lastValue = (block) => {
  return getBlock(block)
  .catch(e => console.log(e));   
}

export const syncEach = (arr, f) => {
  require('bluebird').map(arr, (number) => {
    return sync(number);
  }, {concurrency: concurrency})
  .then(() => {
    if(R.isEmpty(arr)) {
      console.log('Block sync complete');
    } else {
      console.log(`Synced: ${arr[0]} - ${arr[arr.length-1]}`)
      f(arr[0]);
    }
  });
}

export const missingBlocks = (opts) => {
  let options = R.merge(opts, { limit: concurrency })
  return lib.db.any(lib.sql.missingBlocks, options )
}

const getBlock = (n) => {
  let options = { block: n, limit: 1 }
  return lib.db.any(lib.sql.priorBlocks, options)
}

const _subscribe = () => {
  isSubscribed = true; 
  setInterval(subscribe, 3000);
}
