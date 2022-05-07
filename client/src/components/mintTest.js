import './App.css';
import {useState} from 'react';
// import abi from './abi.js;

const mintFun = () => {
  const [state,setState] = useState('');
  
  //test
  // need to add args logic to docuMint
  
  const mintNFT =  () => {
     let nftCount = 0;
     nftCoint = docuMint() // add args here
     if ( nftCount > 0 ){
       alert ('Success!');
     } else {
       alert ('Insufficient Fund');
     }
  return (
    <div> 
      <form onSubmit={mintNFT}>
        <img src='' alt=''>
        < !state 
          ? 
          'You need to mint a NFT': 
          <button type="submit"> Mint your NFT </button>
      <form/>
    <div/>
      
  );
}

export default Mint;
