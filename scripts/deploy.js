const main = async () => {
    const [deployer, randomUser1] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();
  
    console.log("Deploying contracts with account: ", deployer.address);
    console.log("Account balance: ", accountBalance.toString());
  
    const DocuTrackFactory = await hre.ethers.getContractFactory("Doc");
    const DocuTrack = await DocuTrackFactory.deploy();
    await DocuTrack.deployed();
  
    console.log("Towson Contract address: ", DocuTrack.address);

    // Mint for user 1
    console.log("Mint for User 1");
    let user1
    user1 = await DocuTrack.docuMint(randomUser1.address, "https://game.example/item-id-8u5h2m.json");
    await user1.wait();
    console.log("Forged token :", user1)

    // Test
    console.log("Test 1");
    let user2
    user2 = await DocuTrack.drop();
    await user2.wait();

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