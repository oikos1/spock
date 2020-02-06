import web3 from './web3'

const sha3 = (str) => {
  return web3.utils.sha3(str).substring(0,10)
};

const dict = {
    lock: sha3('lock(uint256)').replace("0x",""),
    free: sha3('free(uint256)').replace("0x",""),
    vote: sha3('vote(address[])').replace("0x","")
};

const acts = Object.keys(dict).reduce((acc, key) => {
  acc[dict[key]] = key;
  return acc;
}, {});


module.exports = {
  acts: acts,
  dict: dict
};
