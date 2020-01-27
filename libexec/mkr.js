const R      = require('ramda');
const lib = require('../lib/common');

export const sync = async (n) => {
  return lib.u.getEvents(lib.addresses.mkr, "Transfer", n)  
  .then(logs => {
    //console.log("found logs", logs)
    logs.data.forEach(log => {
      console.log("writing", log)
      write(log) ;
    });
  }).catch(e => console.log(e));   
};


const write = (log) => {

  let data = {
    sender:       log["result"].src.replace("0x", "41"),
    receiver:     log["result"].dst.replace("0x", "41"),
    value :       log["result"].wad,
    logIndex:     log["event_index"],
    tx:           log["transaction_id"],
    block:        Number(log["block_number"])
  }
  console.log("writing data",  { tx: data })
  return lib.db.none(lib.sql.insertMkrTx, { tx: data })
  .catch(e => console.log(e));
};

