require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    zkEVM: {
      url: `https://rpc.public.zkevm-test.net`,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY],
    },
    goerli: {
      url: process.env.API_URL,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY],
    },
    sepolia: {
      url: process.env.SEPOLIA_API_URL,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY],
    },
    polygon_mumbai: {
      url: process.env.MATIC_API_URL,
      accounts: [`0x${process.env.ETH_PRIV_KEY_1}`]
   }
  },
};