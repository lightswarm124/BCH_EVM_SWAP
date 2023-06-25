import { compileFile } from 'cashc';
import { ElectrumNetworkProvider, Contract, SignatureTemplate } from 'cashscript';
import { stringify } from '@bitauth/libauth';

import { alicePkh, bobPkh, alicePriv, alicePub, aliceAddress } from '../utils/common.js'
// console.log("wallet address:", aliceAddress);

const p2shAddr = "bchtest:pvpz5wpvekk9ptrelr26awwxyjqjj7vypp2srktpz8tszr7p8ry42n5ch2yet"

const demoMessage = 'H2/0twdWF+4BQAL0IXhLNAP5zB3GzbU5BZTJ2os7BiIvQyT3O85decDMf6PVvRz9dBeylJgw1iGTCrnoXnRH7vc='

// Compile the P2PKH contract to an artifact object
const artifact = compileFile(new URL('../cashscript/SwapLock.cash', import.meta.url));

// Initialise a network provider for network operations on TESTNET4
const provider = new ElectrumNetworkProvider('chipnet');

// Instantiate a new contract using the compiled artifact and network provider
// AND providing the constructor parameters (pkh: alicePkh)
const contract = new Contract(artifact, [alicePkh, bobPkh, 153420n], {provider});

// Get contract balance & output address + balance
console.log('contract address:', contract.address);
console.log('contract token address:', contract.tokenAddress);
console.log('contract balance:', await contract.getBalance());

// Call the spend function with alice's signature + pk
// And use it to send 0. 000 100 00 BCH back to the contract's address
// const tx = await contract.functions
//   .withdraw(alicePub, new SignatureTemplate(alicePriv))
//   .to("bchtest:pvpz5wpvekk9ptrelr26awwxyjqjj7vypp2srktpz8tszr7p8ry42n5ch2yet", 999710n)
//   .send();

// console.log('transaction details:', stringify(tx));

// // Call the spend function with alice's signature + pk
// // And use it to send two outputs of 0. 000 150 00 BCH back to the contract's address
// const tx2 = await contract.functions
//   .spend(alicePub, new SignatureTemplate(alicePriv))
//   .to(contract.address, 15000n)
//   .to(contract.address, 15000n)
//   .send();

// console.log('transaction details:', stringify(tx2));

// Call the demoPurposeCall to broadcast OP_RETURN output from cashscript contract
const tx3 = await contract.functions
  .demoPurposeCall(alicePub, new SignatureTemplate(alicePriv))
  .withOpReturn(['0x60', '0xaa3617', demoMessage])
  .send();

// console.log('transaction details:', stringify(tx3));






/*  NOTES

  UTXO:

  {
      "bestblock": "000000005db0dedbb85f6d28a33dd091f468ec2d6260ec2a9a1e4c90dbe02956",
      "confirmations": 125,
      "value": 0.000015,
      "scriptPubKey": {
          "asm": "OP_DUP OP_HASH160 d302dfe0a0c247b69a915ee2f159dd05e1e36062 OP_EQUALVERIFY OP_CHECKSIG",
          "hex": "76a914d302dfe0a0c247b69a915ee2f159dd05e1e3606288ac",
          "reqSigs": 1,
          "type": "pubkeyhash",
          "addresses": [
              "bchtest:qrfs9hlq5rpy0d56j90w9u2em5z7rcmqvgx04ju3f0"
          ]
      },
      "tokenData": {                                         // only present if token utxo exists 
          "category": "a2e41ca6aaf54f6013c6bac66595238838de5be939510c453398032e8e549fe7",
          "amount": "2"
      },
      "coinbase": false
  }, 

  TokenDetails:

  export interface TokenDetails {
    amount: bigint;
    category: string;
    nft?: {
      capability: 'none' | 'mutable' | 'minting';
      commitment: string;
    };
  }
}
*/