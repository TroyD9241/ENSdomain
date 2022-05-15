const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("Troy");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  let txn = await domainContract.register("troy#1", {
    value: hre.ethers.utils.parseEther("0.1"),
  });

  await txn.wait();
  console.log("Minted domain ");

  txn = await domainContract.setRecord("troy#1", "You know it");
  await txn.wait();
  console.log("Set record");

  const address = await domainContract.getAddress("troy#1");
  console.log("owner of domain", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Balance", hre.ethers.utils.formatEther(balance));
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
