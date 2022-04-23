const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();
  
    console.log("Deploying contracts with account: ", deployer.address);
    console.log("Account balance: ", accountBalance.toString());
  
    const DocuTrackFactory = await hre.ethers.getContractFactory("Doc");
    const DocuTrack = await DocuTrackFactory.deploy();
    await DocuTrack.deployed();
  
    console.log("Contract deployed to:", DocuTrack.address);
    console.log("");

    // Mint for user 1
    console.log("Mint for User 1");
    let user1
    user1 = await DocuTrack.docuMint(deployer.address, "https://bafybeic6goo23dpyefesljkvmhbss4lcum3n5soqddgmyczp66zgxrrbd4.ipfs.infura-ipfs.io/");
    await user1.wait();
    // console.log("Forged token :", user1)

    // //Test
    console.log("");
    console.log("Verify");
    let verified
    verified = await DocuTrack.verify();
    
    console.log("Get Link");
    let Link
    Link = await DocuTrack.tokenURI(verified);
    console.log(Link)

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