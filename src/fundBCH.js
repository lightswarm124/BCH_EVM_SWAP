import { TestNetWallet } from "mainnet-js";
import { MNEMONIC } from "../utils/common.js";

async function main() {
  try{
    console.log(MNEMONIC)
    const wallet1 = await TestNetWallet.fromSeed(MNEMONIC, "m/44'/1'/0'/0/0");
    console.log(wallet1.cashaddr)
    const balance1 = await wallet1.getBalance();
    console.log(balance1)
    // const txData = await wallet1.send([
    //   {
    //     cashaddr: 'bchtest:p0kz5jg54eh08pwkempfu937ppvgyw27jacgm4lya6c68sl5gcm7y78ryeyjh',
    //     value: 0.005,
    //     unit: 'bch',
    //   }
    // ]);
    // console.log(txData)

    const wallet2 = await TestNetWallet.fromSeed(MNEMONIC, "m/44'/1'/0'/1/0");
    console.log(wallet2.cashaddr)
    const balance2 = await wallet2.getBalance();
    console.log(balance2)

    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});