import { DataSigner } from "../utils/dataSigner.js";
import { aliceAddress, bobAddress, aliceKeyPair, bobKeyPair, alicePkh, bobPkh, alicePriv, bobPriv, alicePub, bobPub, aliceWIF, bobWIF, ethAccountAlice, ethAccountBob } from "../utils/common.js";
import { bchjs } from "../utils/bch-js-utils.js";

const jsonData = {
  bchSender: aliceAddress,
  bchReceiver: bobAddress,
  bchAmount: 0.001,
  bchEscrowAddr: "bchtest:pvpz5wpvekk9ptrelr26awwxyjqjj7vypp2srktpz8tszr7p8ry42n5ch2yet",
  bchBlockTimeout: 153420,
  ethSender: ethAccountBob.address,
  ethReceiver: ethAccountAlice.address,
  ethAmount: 0.001,
  ethEscrowAddr: "0xe083e596Df57A37B9a063c6A3526a7728A01d618",
  ethTimeout: 1687676578
}

const msg = JSON.stringify(jsonData)

const signData = (inputValue, WIF) => {
  const participantSignData = new DataSigner();
  const signMessage = participantSignData.signMessage(WIF, inputValue)
  console.log(signMessage)
  return signMessage
}


const verifyData = (address, signedMessage, message) => {
  const verify = bchjs.BitcoinCash.verifyMessage(
    address,
    signedMessage,
    message
  )
  console.log(verify)
  return verify
}

const aliceData = signData(msg, aliceWIF)
verifyData(aliceAddress, aliceData, msg)
const bobData = signData(msg, bobWIF)
verifyData(bobAddress, bobData, msg)