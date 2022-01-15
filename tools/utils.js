const fs = require("fs");
const path = require("path");
const Arweave = require("arweave");
const { SmartWeaveNodeFactory, LoggerFactory } = require("redstone-smartweave");
const wallet = require("../.secrets/jwk.json");
const deployedContracts = require("../data/deployed-contracts.json");

// Set up Arweave client
const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
});

// Set up SmartWeave client
// LoggerFactory.INST.logLevel('error');
LoggerFactory.INST.logLevel('debug');
const smartweave = SmartWeaveNodeFactory.memCached(arweave);

async function deployContract(contractName) {
  console.log(`\n\n\n=== Deploying contract: ${contractName} ===`);

  // Loading contract source and initial state from files
  const contractSrc = fs.readFileSync(path.join(__dirname, `../contracts/${contractName}/contract.js`), "utf8");
  const initialState = fs.readFileSync(path.join(__dirname, `../contracts/${contractName}/initial-state.json`), "utf8");

  // Deploying contract
  console.log("Deployment started");
  const contractTxId = await smartweave.createContract.deploy({
    wallet,
    initState: initialState,
    src: contractSrc,
  });
  console.log("Deployment completed: " + contractTxId);  
}

function getContract(contractName) {
  if (!deployedContracts[contractName]) {
    throw new Error(`Contract address not found: ${contractName}`);
  }

  return smartweave
    .contract(deployedContracts[contractName])
    .connect(wallet)
    .setEvaluationOptions({
      waitForConfirmation: true,
    });
}

module.exports = {
  deployContract,
  getContract,
};
