const R      = require('ramda');
const lib = require('../lib/common');

export const sync = async (n) => {
  //console.log("getting block ", n)
  return lib.u.getEvents(lib.addresses.chief, "LogNote", n)  
  .then(logs => {

    console.log("got logs", logs, "for", n)
    
    logs.data.forEach(log => {
      //console.log("log ", log);
      write(log);
    });
  }).catch(e => console.log(e));   
};

export const subscribe = async () => {
  const chief = await lib.u.loadContract(lib.addresses.chief) ;   
  var i=0;
  lib.act.acts.forEach(sig => {
    //TUB.LogNote().watch({filters: {"sig": lib.act.cupSigs[i]}}, (err, data) => {
    //      if (err) return console.error('Failed to bind event listener:', err);
    //      data["block_number"]   = data["block"];
    //      data["transaction_id"] = data["transaction"];
    //      write(data, {"data":[]});
    //}); 
    i++;     
  });
};

const read = async (log) => {
  let act = lib.act.acts[log["result"].sig];
  let r = [];
    //await lib.u.asyncForEach(Object.entries(lib.act.acts), async (data) => {
    //  console.log("got act", act)
      //return await lib.u.getEvents(lib.addresses.chief, lib.u.capitalize(data[1]), log["block_number"] )
      //.then(o => {
        //cups.data.forEach(cup => {
        //  r = push(cup, log, act, r);
        //});
        //console.log("got o ", o);
      //})
    //});

    let data = {
      sender:       log["result"].src.replace("0x", "41"),
      receiver:     log["result"].dst.replace("0x", "41"),
      value :       log["result"].wad,
      logIndex:     log["event_index"],
      tx:           log["transaction_id"],
      block:        Number(log["block_number"])
    }    
    console.log("got event data", log["result"]);

    if (r.length > 0){
      return r;
    }  
};

const write = (log) => {
  let act = lib.act.acts[log["result"].sig];
  //console.log("write got act", act)
  if(act) {
    return read(log)
    .then(data => {
      console.log("data", data)
        //data.forEach(c => {
        //  console.log("got c", c)
          //lib.db.none(lib.sql.insertCup, { cup: c })
        //});        
    })
    .catch(e => {
      console.log(e)
      //console.log(lib.act.cupActs[log["result"].sig])
      console.log(log)
    });
  }
};

/*const dsChiefAbi = require("../abis/ds_chief.json");

const { handleDsNoteEvents } = require("spock-etl/lib/core/transformers/common");
const { getTxByIdOrDie, getBlockByIdOrDie } = require("spock-etl/lib/core/extractors/common");
const BigNumber = require("bignumber.js").BigNumber;

module.exports = address => ({
  name: "DsChiefTransformer",
  dependencies: [`raw_log_${address}_extractor`],
  transform: async (services, logs) => {
    await handleDsNoteEvents(services, dsChiefAbi, logs[0], handlers);
  },
});

const handlers = {
  "free(uint256)": async (services, { log, note }) => {
    const block = await getBlockByIdOrDie(services, log.block_id);
    const tx = await getTxByIdOrDie(services, log.tx_id);

    await insertLock(services, {
      fromAddress: tx.from_address,
      immediateCaller: note.caller,
      lock: new BigNumber(note.params.wad)
        .div(new BigNumber("1e18"))
        .negated()
        .toString(),
      contractAddress: log.address,
      txId: log.tx_id,
      blockId: log.block_id,
      logIndex: log.log_index,
      timestamp: block.timestamp,
    });
  },
  "lock(uint256)": async (services, { log, note }) => {
    const block = await getBlockByIdOrDie(services, log.block_id);
    const tx = await getTxByIdOrDie(services, log.tx_id);

    await insertLock(services, {
      fromAddress: tx.from_address,
      immediateCaller: note.caller,
      lock: new BigNumber(note.params.wad).div(new BigNumber("1e18")).toString(),
      contractAddress: log.address,
      txId: log.tx_id,
      blockId: log.block_id,
      logIndex: log.log_index,
      timestamp: block.timestamp,
    });
  },
};

const insertLock = (s, values) => {
  return s.tx.none(
    `
INSERT INTO dschief.lock(contract_address, from_address, immediate_caller, lock, timestamp, log_index, tx_id, block_id) VALUES (\${contractAddress}, \${fromAddress}, \${immediateCaller}, \${lock}, \${timestamp}, \${logIndex}, \${txId}, \${blockId})`,
    values,
  );
};
*/