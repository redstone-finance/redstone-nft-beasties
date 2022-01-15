const { getContract } = require("./utils");

(async () => {
  const contract = getContract("oracle");

  // Read state
  const state = await contract.readState();
  console.log("State before any interactions");
  console.log(JSON.stringify(state, null, 2));

  // Write interaction
  console.log("Sending 'saveNewValue' interaction...");
  await contract.writeInteraction({
    function: "saveNewValue",
    data: {
      value: 10,
    },
  });
  console.log("Interaction has been sent");

  // Read state after interaction
  const stateAfterInteraction = await contract.readState();
  console.log("State after 1 interaction");
  console.log(JSON.stringify(stateAfterInteraction, null, 2));

  // Using generatedAssets contract function
  const { result: latestChanges2 } = await contract.viewState({
    function: "getLatestChanges",
    data: {},
  });
  console.log(`Latest changes: ${JSON.stringify(latestChanges2)}`);

  // Write interaction
  console.log("Sending 'saveNewValue' interaction...");
  await contract.writeInteraction({
    function: "saveNewValue",
    data: {
      value: 20,
    },
  });
  console.log("Interaction has been sent");

  // Using generatedAssets contract function
  const { result: latestChanges } = await contract.viewState({
    function: "getLatestChanges",
    data: {},
  });
  console.log(`Latest changes: ${JSON.stringify(latestChanges)}`);

  // Using generatedAssets contract function
  const { result: currentValue } = await contract.viewState({
    function: "getCurrentValue",
  });
  console.log(`Current value: ${JSON.stringify(currentValue)}`);

  // Getting the final state
  console.log(`Getting final state`);
  const finalState = await contract.readState();
  console.log(JSON.stringify(finalState, null, 2));
})();
