const fs = require('fs');
const path = require('path');
const { default: ArLocal } = require('arlocal');
const Arweave = require('arweave');
const { LoggerFactory, SmartWeaveNodeFactory } = require("redstone-smartweave");

let arweave, arlocal, smartweave, contract, wallet, walletAddress;

async function addFunds(arweave, wallet) {
  const walletAddress = await arweave.wallets.getAddress(wallet);
  await arweave.api.get(`/mint/${walletAddress}/1000000000000000`);
}

describe('Testing the oracle contract', () => {

  beforeAll(async () => {
    // arlocal = new ArLocal(1985, false);
    arlocal = new ArLocal(1985, true, '.db', true);
    await arlocal.start();

    arweave = Arweave.init({
      host: 'localhost',
      port: 1985,
      protocol: 'http'
    });

    LoggerFactory.INST.logLevel('error');

    smartweave = SmartWeaveNodeFactory.memCached(arweave);

    wallet = await arweave.wallets.generate();
    walletAddress = await arweave.wallets.jwkToAddress(wallet);

    const contractSrc = fs.readFileSync(path.join(__dirname, '../../contracts/oracle/contract.js'), 'utf8');
    const initialState = fs.readFileSync(path.join(__dirname, '../../contracts/oracle/initial-state.json'), 'utf8');

    await addFunds(arweave, wallet);

    // Deploying contract using the RedStone SmartWeave SDK
    const contractTxId = await smartweave.createContract.deploy({
      wallet,
      initState: initialState,
      src: contractSrc
    });

    contract = smartweave.contract(contractTxId);
    contract.connect(wallet);

    await mine();
  });

  afterAll(async () => {
    await arlocal.stop();
  });

  it('Should have no values right after deployment', async () => {
    const { state } = await contract.readState();
    expect(state.values).toEqual([]);
  });

  it('Should save a new value', async () => {
    await contract.writeInteraction({
      function: 'saveNewValue',
      data: {
        value: 10,
      },
    });
    await mine();
  });

  it('New value should be saved', async () => {
    const { result: curValue } = await contract.viewState({
      function: "getCurrentValue"
    });

    // TODO: add assertion
    console.log({curValue});
    // expect(!!curValue.value).toBe(true);
  });

  // it('New value should be saved', async () => {
  //   const { result: curValue } = await contract.viewState({
  //     function: "getCurrentValue"
  //   });

  //   // TODO: add assertion
  //   console.log({curValue});
  // });

  // it('Should fetch latest changes', async () => {
  //   const { result: latestChanges } = await contract.viewState({
  //     function: "getLatestChanges"
  //   });

  //   // TODO: add assertion
  //   console.log({latestChanges});
  // });
});

async function mine() {
  await arweave.api.get('mine');
}
