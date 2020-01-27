import {tronWeb,tronGrid} from './tronWeb';

const addresses = require('../addr.json');

export const loadContract = async address => {
  return await tronWeb.contract().at(address);
};

export const getEvents = async (a, e, n) => {
  return await tronGrid.contract.getEvents(a, { "event_name": e , "block_number": n })
};

export const getCurrentBlock = () => {
  return tronWeb.trx.getCurrentBlock();
};

