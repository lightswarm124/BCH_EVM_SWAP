import { bchjs } from "./bch-js-utils.js";

export class DataSigner {
  createMessage(password) {
    return Buffer.from(password, "utf8");
  }

  signMessage(WIF, message) {
    return bchjs.BitcoinCash.signMessageWithPrivKey(WIF, message)
  }
}