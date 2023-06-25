import 'dotenv/config'

import { hash160 } from '@cashscript/utils';
import {
  deriveHdPrivateNodeFromSeed,
  deriveHdPath,
  secp256k1,
  encodeCashAddress,
} from '@bitauth/libauth';
import BCHJS from '@psf/bch-js';
import bip39 from 'bip39';

import { ethers } from "ethers";

const bchjs = new BCHJS({})

export const EASContractAddress = "0xAcfE09Fd03f7812F022FBf636700AdEA18Fd2A7A"; // Base Goerli v0.27
export const provider = ethers.getDefaultProvider("goerli", {
  alchemy: "PoCIrGTfx-bZZ5oENA0ZByVtF7MYz4nB"
})

// This is duplicated from common.ts because it is not possible to import from a .ts file in p2pkh.js

export const MNEMONIC = 'talk story visual hidden behind wasp evil abandon bus brand circle sketch'

// Generate entropy from BIP39 mnemonic phrase and initialise a root HD-wallet node
const seed = await bip39.mnemonicToSeed(MNEMONIC);
const rootNode = deriveHdPrivateNodeFromSeed(
  seed,
  // true
);
const baseDerivationPath = "m/44'/1'/0'";

const masterHDNode = bchjs.HDNode.fromSeed(seed)

export const ethAccountAlice = ethers.HDNodeWallet.fromPhrase(MNEMONIC)

export const ethAccountBob = ethers.HDNodeWallet.fromPhrase(MNEMONIC)


// Derive Alice's private key, public key, public key hash and address
const aliceNode = deriveHdPath(rootNode, `${baseDerivationPath}/0/0`);
if (typeof aliceNode === 'string') throw new Error();

const psfAliceNode = masterHDNode.derivePath(`${baseDerivationPath}/0/0`)

export const aliceKeyPair = bchjs.HDNode.toKeyPair(psfAliceNode)
export const aliceWIF = bchjs.HDNode.toWIF(psfAliceNode)

export const alicePub = secp256k1.derivePublicKeyCompressed(aliceNode.privateKey);
export const alicePriv = aliceNode.privateKey;
export const alicePkh = hash160(alicePub);
export const aliceAddress = encodeCashAddress('bchtest', 'p2pkh', alicePkh);

// Bob
const bobNode = deriveHdPath(rootNode, `${baseDerivationPath}/1/0`);
const psfBobNode = masterHDNode.derivePath(`${baseDerivationPath}/1/0`)

export const bobKeyPair = bchjs.HDNode.toKeyPair(psfBobNode)
export const bobWIF = bchjs.HDNode.toWIF(psfBobNode)

export const bobPub = secp256k1.derivePublicKeyCompressed(bobNode.privateKey)
export const bobPriv = bobNode.privateKey
export const bobPkh = hash160(bobPub)
export const bobAddress = encodeCashAddress('bchtest', 'p2pkh', bobPkh)