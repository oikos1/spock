import {tronWeb,tronGrid} from './tronWeb';

const addresses = require('../addr.json');

export const loadContract = async address => {
  return await tronWeb.contract().at(address);
};

export const deployContract = async (name, ...args) => {
    const Contract = loadArtifact(name);
    const contractInstance = await tronWeb.contract().new({
        abi: Contract.abi,
        bytecode: Contract.bytecode,
        feeLimit: 1000000000,
        callValue: 0,
        userFeePercentage: 100,
        parameters: args
    });

    const address = tronWeb.address.fromHex(contractInstance.address);
    console.log(
        `Contract ${name} Deployed: address: ${address}, hexAddress: ${contractInstance.address}`
    );
    return contractInstance;
};


export const getEvents = async (a, e, n) => {
  return await tronGrid.contract.getEvents(a, { "event_name": e , "block_number": n })
};

export const getCurrentBlock = () => {
  return tronWeb.trx.getCurrentBlock();
};


const loadArtifact = name => {
    const a = require(`../contracts/${name}.json`);
    return a;
};

export const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
};


export async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};