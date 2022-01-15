export async function handle(state, action) {

  switch (action.input.function) {

    // Name query
    case "name": {
      return { result: state.name };
    }

    // A method to mint NFTs
    case "mintNFT": {
      const { tokenId, name, deathTemperature, kidsTemperature, owner, imageArweaveUrl, imageArweaveUrlWithKids } 
        = action.input.data;

      if (state.tokens[tokenId]) {
        throw new ContractError(`Token with the same id already exists: ${tokenId}`);
      }

      state.tokens[tokenId] = {
        name,
        deathTemperature,
        kidsTemperature,
        owner,
        imageArweaveUrl,
        imageArweaveUrlWithKids,
      };

      return { state };
    }

    // Standard NFT transfer method
    case "transfer": {
      const { tokenId, recipient } = action.input.data;

      if (!state.tokens[tokenId]) {
        throw new ContractError(`Token does not exists: ${tokenId}`);
      }

      if (!state.tokens[tokenId].owner === action.caller) {
        throw new ContractError(`Tx sender is not an owner of the token: ${tokenId}`);
      }

      state.tokens[tokenId].owner = recipient;

      return { state };
    }

    // Query for getting all tokens with details
    case "getAllTokens": {
      // Getting global temperature value from the oracle contract
      const currentTemperature = (await SmartWeave.contracts.viewContractState(
        state.oracleContractAddress,
        { function: 'getCurrentValue' })).value;

      const allTokens = [];
      for (const [tokenId, tokenDetails] of Object.entries(state.tokens)) {
        const token = {
          tokenId,
          tokenDetails,
          isAlive: currentTemperature > tokenDetails.deathTemperature,
          hasKids: currentTemperature > tokenDetails.kidsTemperature,
        };

        // Calculating corresponding image url
        if (!token.isAlive) {
          token.imageUrl = state.ghostImageArweaveUrl;
        } else if (token.hasKids) {
          token.imageUrl = tokenDetails.imageArweaveUrlWithKids;
        } else {
          token.imageUrl = tokenDetails.imageArweaveUrl;
        }

        allTokens.push(token);
      }

      return allTokens;
    }


    default: {
      throw new ContractError(
        `Unsupported contract function: ${functionName}`);
    }

  }
}
