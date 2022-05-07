const main = async () => {
    const [owner,randomUser1, randomUser2] = await hre.ethers.getSigners();
    const DocuTrackFactory = await hre.ethers.getContractFactory("Doc");
    const DocuTrack = await DocuTrackFactory.deploy();
    await DocuTrack.deployed();
  
    console.log("Contract deployed to:", DocuTrack.address);
    console.log("Contract deployed by:", owner.address);
    console.log("");

     // Mint for user 1
     console.log("Mint for User 1");
     let user1
     user1 = await DocuTrack.docuMint("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "https://ipfs.infura.io/ipfs/Qmdyk19gAEsML3xzrNWGdXcDcRhWpsEqXBnqan7wRgkXRD");
     await user1.wait();
     console.log("Forged token :", user1.hash)

     // Mint for user 2
     console.log("Mint for User 2");
     let user2
     user2 = await DocuTrack.docuMint("0x70997970C51812dc3A010C7d01b50e0d17dc79C8", "https://ipfs.infura.io/ipfs/Qmdyk19gAEsML3xzrNWGdXcDcRhWpsEqXBnqan7wRgkXRD");
     await user2.wait();
     console.log("Forged token :", user2.hash) 

     // Mint for user 3
     console.log("Mint for User 3");
     let user3
     user3 = await DocuTrack.docuMint("0x70997970C51812dc3A010C7d01b50e0d17dc79C8", "https://ipfs.infura.io/ipfs/Qmdyk19gAEsML3xzrNWGdXcDcRhWpsEqXBnqan7wRgkXRD");
     await user3.wait();
     console.log("Forged token :", user3.hash)

    // //Test
    console.log("");
    console.log("Verify owner");
    let verified
    verified = await DocuTrack.verify();
    
    console.log("Get Link");
    let Link
    Link = await DocuTrack.tokenURI(verified);
    console.log(Link)

     // //Test
     console.log("");
    //  console.log(randomUser1);
     console.log("Verify user 2");
     verified = await DocuTrack.connect(randomUser1).verify();
     console.log(verified);


     console.log("Get Link");
     Link = await DocuTrack.tokenURI(verified);
     console.log(Link)

    //  //Test
    //  console.log("");
    //  console.log("Verify user 3");
    //  verified = await DocuTrack.connect(randomUser2).verify();
    //  console.log(verified);

     console.log("Get Link");
     Link = await DocuTrack.tokenURI(verified);
     console.log(Link)
 
     // //Entity
     console.log("");
     console.log("Entity");
     verified1 = await DocuTrack.entity();
     console.log(verified1)
 

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