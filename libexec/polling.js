const R      = require('ramda');
const lib = require('../lib/common');

export const syncPoll = async (n) => {
  return lib.u.getEvents(lib.addresses.polling, "PollCreated", n)  
  .then(logs => {
    //console.log("found logs", logs)
    logs.data.forEach(log => {
      console.log("writing", log)
      writePoll(log) ;
    });
  }).catch(e => console.log(e));   
};


const writePoll = (log) => {
  
  let data = {
    id:           Number(log["result"].pollId),
    creator:      log["result"].creator.replace("0x", "41"),
    pollId:       Number(log["result"].pollId),
    multiHash:    log["result"].multiHash,
    startDate:    Number(log["result"].startDate),
    endDate:      Number(log["result"].endDate),    
    log_index:    log["event_index"],
    tx:           log["transaction_id"],
    block:        Number(log["block_number"])
  }

 // console.log("inserting data", data);

  return lib.db.none(lib.sql.insertPoll, { poll: data })
  .catch(e => console.log(e));
};

export const syncVote = async (n) => {
  return lib.u.getEvents(lib.addresses.polling, "Voted", n)  
  .then(logs => {
    //console.log("found logs", logs)
    logs.data.forEach(log => {
      //console.log("writing", log)
      writeVote(log) ;
    });
  }).catch(e => console.log(e));   
};


const writeVote = (log) => {
  
  let data = {
    voter:        log["result"].voter.replace("0x", "41"),
    pollId:       Number(log["result"].pollId),
    optionId:     Number(log["result"].optionId),
    logIndex:    log["event_index"],
    tx:           log["transaction_id"],
    block:        Number(log["block_number"])
  }

 // console.log("inserting data", data);

  return lib.db.none(lib.sql.insertVote, { vote: data })
  .catch(e => console.log(e));
};

