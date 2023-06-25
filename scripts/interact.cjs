const { ethers } = require("ethers");
const contract = require("../artifacts/contracts/Lock.sol/Lock.json");

const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

// console.log(JSON.stringify(contract.abi));

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(network="goerli", API_KEY);

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// Contract
const lockContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer)

async function main() {
  const approve = await lockContract.setApprove().then(res => console.log(res))

  // const unlockFunds = await lockContract.withdraw().then(res => console.log(res))
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
