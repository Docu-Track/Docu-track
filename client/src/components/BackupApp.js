<<<<<<< front-end
import axios from 'axios';
import './App.css'
import React,{ useState, useEffect } from 'react'
import { create } from 'ipfs-http-client'
import { ethers } from "ethers";
import abi from "./Doc.json";
=======
import ConnectWallet  from './components/ConnectWallet';
import MintNFT  from './components/metadata';
import './App.css';
>>>>>>> main


const client = create('https://ipfs.infura.io:5001/api/v0')

function App() {
  const [fileUrl, updateFileUrl] = useState(``);
  const [owner, setOwner] = useState(false);
  const [mintAddr, setMintAddr] = useState('');
  const [description, setDescription] = useState('First Description');
  const [currentAccount, setCurrentAccount] = useState('');
  const contractABI = abi.abi;
  const contractAddress = "0x0119e1e8BB9C9d9021E3C3B968a35C030f172F01";

  useEffect(()=>{      
    checkifWalletisConnected();  
    contractOwnerCheck();
  },[]) 

  async function onChange(e) {
    const file = e.target.files[0];
    console.log(file)

    try {
      // Add file to IPFS
      const added0 = await client.add(file)
      const url = `https://ipfs.infura.io/ipfs/${added0.path}`
      updateFileUrl(url)
      
      // Create metadata for Contract
      const metadata = {
        description: description,
        link: url,
        date: ""
      }
      // Add metadata to IPFS
      const metaDataLink = await client.add(JSON.stringify(metadata));
      console.log("metadata link->", `https://ipfs.infura.io/ipfs/${metaDataLink.path}`);
      const metaData = `https://ipfs.infura.io/ipfs/${metaDataLink.path}`

      try {
        const { ethereum } = window;
  
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const Docu = new ethers.Contract(contractAddress, contractABI, signer);
  
          let ethUser
          ethUser = await Docu.mintVerify(mintAddr);
          console.log(ethUser.toNumber())
          if (ethUser.toNumber() == 0){
            alert("Wait to mine...");
            
          console.log(typeof(currentAccount),mintAddr,metaData) //0x4B33be4Fea6c90557f4c018805BD517b95Bb9a42    0xbFC616Da5eEEd99B691973660582557b6e4347D5
          const checkinTxn = await Docu.docuMint(mintAddr, metaData);
          console.log("Waiting to mine...", checkinTxn.hash);  
          await checkinTxn.wait();
          alert("Mined: "+checkinTxn.hash);
          console.log("Mined: "+checkinTxn.hash)
  
          } else{
            alert("Could not mine")
          }
  
        } else {
          console.log("ETH window obj doesn't exist...");
        }
      } catch (error) {
        alert("Invalid Address")
        console.log(error);
      }
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  const getLink = async (link) =>{
    const data = await axios.get(link);
    console.log(data.data.link)
  }

  const verify = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const Docu = new ethers.Contract(contractAddress, contractABI, signer);

        let ethUser
          ethUser = await Docu.verify();
          console.log(ethUser.toNumber())
          if (ethUser.toNumber() >= 1){
          let ipfsLink
          //gets metdata link
          ipfsLink = await Docu.tokenURI(ethUser.toNumber());
          console.log(ipfsLink)          
          //gets nft link
          const data = await axios.get(ipfsLink);
          console.log(data.data.link)
          updateFileUrl(data.data.link)
        } else{
          console.log(ethUser)
          //alert("Could not verify")
        }

      } else {
        console.log("ETH window obj doesn't exist...");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const contractOwnerCheck = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const Docu = new ethers.Contract(contractAddress, contractABI, signer);

        let ethUser
        ethUser = await Docu.entity();
        console.log(ethUser.toNumber())
        if (ethUser.toNumber() == 5){
          setOwner(true)
        }else{
          setOwner(false)
        }
      } else {
        console.log("ETH window obj doesn't exist...");
      }
    } catch (error) {
      console.log(error);
    }
  }
  
    const checkifWalletisConnected = async () => {
      try {        
        const {ethereum} = window;
        if(!ethereum){
          console.log('No ETH wallet detected');
          return;
        } else{
          console.log("ETH wallet detected");
        }
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });       
        if (accounts.length !== 0) {
          const firstaccount = accounts[0];
          console.log("Found an authorized account", firstaccount);  
          setCurrentAccount(firstaccount);
        }else{
          alert("No authorized account found");
        }
  
      } catch (error) {
        console.log(error)
      }
    }
  
    const connectWallet = async () =>{
      try {
        const {ethereum} = window;        
        if(!ethereum){
          alert("Wallet could not be connected/detected");
          return;
        }  
        // make request to connect to Metamask
        const accounts = await ethereum.request({method:"eth_requestAccounts"});  
        console.log("Connected account:",accounts[0]);  
        //updating account using setCurrentAccount as state is updated in this component
        setCurrentAccount(accounts[0]);              
      } catch (error) {
        console.log(error);
      }
    }
  return (
<<<<<<< front-end
    <div className="App">
      <h1>IPFS Example</h1>
      {  owner && (
        <React.Fragment>
    {mintAddr && ( <input
      type="file"
      onChange={onChange}
    />)}
      <label>Address</label>
       <input onChange={e => setMintAddr(e.target.value)} type="text" />
       </React.Fragment>
      )
    }
      {
        fileUrl && (
          <div>
            <iframe src={fileUrl} width="100%" height="300" style={{ border :"1px solid black" }}/>
            <a href={fileUrl}>IPFS Link</a>
          </div>
        )
      }
       <button onClick={verify}>verify</button>
      {!currentAccount &&
          (<button onClick={connectWallet}>Connect Wallet</button>
        )}
=======
    <div >
      <div className="App">
        <h1>Your Image</h1>
      </div>
      <div>

      </div>
      <ConnectWallet/>
      <div className='MintNFT'>
        <MintNFT/>
      </div>
    
>>>>>>> main
    </div>
  );
}
export default App




