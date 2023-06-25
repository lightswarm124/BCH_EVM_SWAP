const contractAddress = '0x5C4D21266c5390DAcd55a0B3bDb88C01CFEE44c6'

async function main() {
  console.log(contractAddress)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
