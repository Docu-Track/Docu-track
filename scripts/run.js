const main = async () => {
    const [owner,randomUser1] = await hre.ethers.getSigners();
    const DocuTrackFactory = await hre.ethers.getContractFactory("Doc");
    const DocuTrack = await DocuTrackFactory.deploy();
    await DocuTrack.deployed();
  
    console.log("Contract deployed to:", DocuTrack.address);
    console.log("Contract deployed by:", owner.address);
    console.log("");

     // Mint for user 1
    console.log("Mint for User 1");
    let user1
    user1 = await DocuTrack.docuMint(owner.address, "https://game.example/item-id-8u5h2m.json");
    await user1.wait();
    // console.log(user1)

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