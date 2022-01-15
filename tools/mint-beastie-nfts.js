const images = require("../data/images.json");
const { getContract } = require("./utils");

const owner = "33F0QHcb22W7LwWR1iRC8Az1ntZG09XQ03YWuw2ABqA";

const tokens = [
  {
    tokenId: "1",
    name: "Panda",
    deathTemperature: 0,
    kidsTemperature: 20,
    imageArweaveUrl: images["panda"],
    imageArweaveUrlWithKids: images["panda-kids"],
    owner,
  },
  {
    tokenId: "2",
    name: "Lion",
    deathTemperature: 10,
    kidsTemperature: 30,
    imageArweaveUrl: images["lion"],
    imageArweaveUrlWithKids: images["lion-kids"],
    owner,
  },
  {
    tokenId: "3",
    name: "Elephant",
    deathTemperature: 5,
    kidsTemperature: 30,
    imageArweaveUrl: images["elephant"],
    imageArweaveUrlWithKids: images["elephant-kids"],
    owner,
  },
  {
    tokenId: "4",
    name: "Fox",
    deathTemperature: 0,
    kidsTemperature: 20,
    imageArweaveUrl: images["fox"],
    imageArweaveUrlWithKids: images["fox-kids"],
    owner,
  },
  {
    tokenId: "5",
    name: "Zebra",
    deathTemperature: 0,
    kidsTemperature: 20,
    imageArweaveUrl: images["zebra"],
    imageArweaveUrlWithKids: images["zebra-kids"],
    owner,
  },
];

main();

async function main() {
  const contract = getContract("beastie-nft");

  for (const tokenDetails of tokens) {
    contract.writeInteraction({
      function: "mintNFT",
      data: tokenDetails,
    });
  }
}
