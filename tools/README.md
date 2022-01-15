## How to configure beastie contracts

```sh
# Deploy oracle contract
node tools/deploy-oracle.js

# Then manually update contract address (oracle) in data/deployed-contracts.json
# and contracts/beastie-nft/initial-state.json for `oracleContractAddress` prop

# Deploy NFT beastie contract
node tools/deploy-beastie-nft.js

# Then manually update contract address (beastie-nft) in data/deployed-contracts.json

# Mint NFTs
node tools/mint-beastie-nfts.js
```
