// import logo from './logo.svg';
// import './App.css';



// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>

//     </div>
//   );
// }

// export default App;
/* src/App.js */
import axios from 'axios';

import './App.css'
import { useState } from 'react'
import { create } from 'ipfs-http-client'
const client = create('https://ipfs.infura.io:5001/api/v0')

function MintNFT() {
  const [fileUrl, updateFileUrl] = useState(``);
  const [smartContractUrl, setSmartContractUrl] = useState(``);
  const [description, setDescription] = useState('First Description');
  // const [metadata, setMetadata] = useState({
  //   fileUrl: fileUrl,
  //   description: description
  // });

  async function onChange(e) {
    const file = e.target.files[0];
    console.log(file)

    try {
      
      const added0 = await client.add(file)
      const url = `https://ipfs.infura.io/ipfs/${added0.path}`
      setSmartContractUrl(url)
      
      const metadata = {
        description: description,
        link: url,
        date: ""
      }
      const metaDataLink = await client.add(JSON.stringify(metadata));
      console.log("metadata link->", `https://ipfs.infura.io/ipfs/${metaDataLink.path}`);
      
      updateFileUrl(url);

      //call mint function with url

    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  const getLink = () =>{
    var link = "https://ipfs.infura.io/ipfs/QmQbr1hcTiQAVoUNm7i48x2kPezYbSKF5y9U3T2LhSuRYj";
    const data = axios.get(link).then(response => console.log(response)).catch(error => console.log(error));
    // console.log(data)
  }
  return (
    <div className="MintNFT">
      <h1>IPFS Example</h1>
      <input
        type="file"
        onChange={onChange}
      />
      {
        fileUrl && (
          <div>
            <img alt='' src={fileUrl} width="600px" />
            <a href={fileUrl}>IPFS Link</a>
          </div>
        )
      }
      <button onClick={getLink}>getlink</button>
    </div>
  );
}
export default MintNFT;