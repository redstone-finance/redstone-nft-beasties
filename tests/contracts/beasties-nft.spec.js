const fs = require('fs');
const path = require('path');
const { default: ArLocal } = require('arlocal');
const Arweave = require('arweave');
const { LoggerFactory, SmartWeaveNodeFactory } = require("redstone-smartweave");

let arweave, arlocal, smartweave, contract, wallet, walletAddress;

describe('Testing the Beastie NFT contract', () => {

  beforeAll(async () => {
    // arlocal = new ArLocal(1985, false);
    // await arlocal.start();

    // arweave = Arweave.init({
    //   host: 'localhost',
    //   port: 1985,
    //   protocol: 'http'
    // });

    // LoggerFactory.INST.logLevel('error');

    // smartweave = SmartWeaveNodeFactory.memCached(arweave);

    // wallet = await arweave.wallets.generate();
    // walletAddress = await arweave.wallets.jwkToAddress(wallet);

    // const contractSrc = fs.readFileSync(path.join(__dirname, '../../src/contracts/loot/contract.js'), 'utf8');
    // const initialState = fs.readFileSync(path.join(__dirname, '../../src/contracts/loot/initial-state.json'), 'utf8');

    // // Deploying contract using the RedStone SmartWeave SDK
    // const contractTxId = await smartweave.createContract.deploy({
    //   wallet,
    //   initState: initialState,
    //   src: contractSrc
    // });

    // contract = smartweave.contract(contractTxId);
    // contract.connect(wallet);

    // await mine();
  });

  afterAll(async () => {
    // await arlocal.stop();
  });

  it('Should have no assets right after deployment', async () => {
    console.log('TODO: implement');
  });

});

async function mine() {
  await arweave.api.get('mine');
}
