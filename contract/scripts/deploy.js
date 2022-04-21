const main = async () => {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log("Deploying contracts with account: ", deployer.address);
  console.log("Account balance: ", accountBalance.toString());

  const careerFairContractFactory = await hre.ethers.getContractFactory("CareerFair");
  const careerFairContract = await careerFairContractFactory.deploy();
  await careerFairContract.deployed();

  console.log("Career Fair Contract address: ", careerFairContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();