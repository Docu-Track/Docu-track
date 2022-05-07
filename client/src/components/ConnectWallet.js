import React, {useState,useEffect} from 'react';
// import { ethers } from "ethers";
// import abi from "./utils/*.json"


function ConnectWallet() {

  const [currentAccount, setCurrentAccount] = useState('');
  

//   const contractAddress = ""; //check if latest
//   const contractABI = abi.abi;
  

  useEffect(()=>{
    
    checkifWalletisConnected();  
  },[]) 
  // whatever state is changed in [] hook=>useEffect wil run. So tasks like initialization, Connecting to Wallet, and so on are called with useEffect hooks. 
  // Keeping [] empty will ensure there is no overriding  i.e tasks like initialization, Connecting to Wallet does not occur more than once
  // to perform cleanup in useEffect use return callback function

  const checkifWalletisConnected = async () => {
    try {
      
      const {ethereum} = window;
      if(!ethereum){
        console.log('No ETH wallet detected');
        return;
      } else{
        console.log("ETH wallet detected");
      }

      // if ETH wallet detected need to pull accounts on Metamask (ETH based wallet)
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
    <div className='demo'>
      <div>
        {!currentAccount &&
          (<button onClick={connectWallet}>Connect Wallet</button>
        )}
        <br/>
        <br/>
                
        
      </div>
      
    </div>
  );
}

export default ConnectWallet;

