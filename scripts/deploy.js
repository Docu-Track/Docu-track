const main = async () => {
    const [deployer,random] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();
  
    console.log("Deploying contracts with account: ", deployer.address);
    console.log("Account balance: ", accountBalance.toString());
  
    const DocuTrackFactory = await hre.ethers.getContractFactory("Doc");
    console.log("Gotten Factory");
    console.log("Await");
    const DocuTrack = await DocuTrackFactory.deploy();
    console.log("Done");
    await DocuTrack.deployed();
  
    console.log("Contract deployed to:", DocuTrack.address);
    console.log("");

    // // Mint for user 1
    // console.log("Mint for User 1");
    // let user1
    // user1 = await DocuTrack.docuMint("0xd6f68Ec758c80977eb1b0d504455936FaCb4e8d5", "https://ipfs.infura.io/ipfs/Qmdyk19gAEsML3xzrNWGdXcDcRhWpsEqXBnqan7wRgkXRD");
    // await user1.wait();
    // console.log("Forged token :", user1)

    // // //Test
    // console.log("");
    // console.log("Verify");
    // let verified
    // verified = await DocuTrack.verify();
    
    // console.log("Get Link");
    // let Link
    // Link = await DocuTrack.tokenURI(verified);
    // console.log(Link)

    // // //Entity
    // console.log("");
    // console.log("Entity");
    // let verified1
    // verified1 = await DocuTrack.entity();
    // console.log(verified1)

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