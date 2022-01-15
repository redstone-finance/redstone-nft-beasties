const { getContract } = require("./utils");

(async () => {
  const oracleContract = getContract("oracle");
  const nftBeastieContract = getContract("beastie-nft");

  // Get NFTBeastie details
  const result = await nftBeastieContract.viewState({
    function: "getAllTokens"
  });
  console.log(JSON.stringify(result, null, 2));

  // Change oracle value
  const newOracleValue = 25;
  await oracleContract.writeInteraction({
    function: "saveNewValue",
    data: {
      value: newOracleValue,
    },
  });
  console.log(`Oracle value updated to: ${newOracleValue}`);

  // Get NFTBeastie details
  const result2 = await nftBeastieContract.viewState({
    function: "getAllTokens",
  });
  console.log(JSON.stringify(result2, null, 2));
})();
