# BCH to EVM Chain Swap - EthGlobal Waterloo 2023 Submission

Deployed Contract on Polygon Mumbai - https://mumbai.polygonscan.com/address/0xe083e596df57a37b9a063c6a3526a7728a01d618
Deployed Contract on Bitcoin Cash Chipnet - https://chipnet.imaginary.cash/address/bchtest:p0sd42x8jwh90mvkgrkadnw5hq97fedhqemvmpqscveytzy48zc6swmkv9h5t

Tools Used: 1) Hardhat, 2) Ethers.js, 3) [@bitauth/libauth](https://libauth.org/), 4) [Cashscript](https://cashscript.org/docs/language/contracts)

Step 1: Create Escrow Contract (with timeout for withdrawal) on both Polygon Mumbai and Bitcoin Cash Chipnet
      CashScript is used to compile the P2SH (or P2SH32) contract addresses on BCH
Step 2: Create attestation object from the swap parameters
Step 3: Sign attestation object with private key from both swap parties
Step 4: Publish both signed attestations onto BCH Chipnet via OP_RETURN
      i.e - https://chipnet.imaginary.cash/tx/9749ce4c5068e11379efd252b8c2af5c92b3297830db1e387d630aa8d51ec11
Step 5: Execute the swap exchange function on both chains
      If current block number of time exceeds the initially agreed upon time, funds from the respective escrow contracts will unlock, allowing the funder to withdraw the coins

Current Proof-of-Concept implements swaps for the native chain's coins, but can be extended to cover tokens of various forms. On BCH, tokens are created on-chain and within the transaction object. This takes advantage of the UTXO transaction model as well as scripting capabilities provided by CashScript.
