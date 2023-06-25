import { DataSigner } from "./dataSigner.js";
import { aliceAddress, bobAddress, aliceKeyPair, bobKeyPair, alicePkh, bobPkh, alicePriv, bobPriv, alicePub, bobPub, aliceWIF, bobWIF, ethAccountAlice, ethAccountBob } from "./common.js";
import { bchjs } from "./bch-js-utils.js";

const jsonData = {
  bchSender: aliceAddress,
  bchReceiver: bobAddress,
  bchAmount: 0.001,
  bchEscrowAddr: "bchtest:dlfk;ajfld",
  ethSender: ethAccountBob.address,
  ethReceiver: ethAccountAlice.address,
  ethAmount: 0.001,
  ethEscrowAddr: "0xsldkjfaldfj;l"
}
const msg = JSON.stringify(jsonData)

const signData = (inputValue, aliceKP, bobKP) => {
  const dataSignerAlice = new DataSigner(aliceKP);
  const passwordAlice = dataSignerAlice.createMessage(inputValue)
  console.log(passwordAlice);
  const signPasswordAlice = dataSignerAlice.signMessage(aliceWIF, inputValue)
  console.log(signPasswordAlice)

  const verifyAlice = bchjs.BitcoinCash.verifyMessage(
    aliceAddress,
    signPasswordAlice,
    msg
  )
  console.log(verifyAlice)

  const dataSignerBob = new DataSigner(aliceKP);
  const passwordBob = dataSignerBob.createMessage(inputValue)
  console.log(passwordBob);
  const signPasswordBob = dataSignerBob.signMessage(bobWIF, inputValue)
  console.log(signPasswordBob)

  const verifyBob = bchjs.BitcoinCash.verifyMessage(
    bobAddress,
    signPasswordBob,
    msg
  )
  console.log(verifyBob)
}

signData(msg, aliceKeyPair, bobKeyPair)