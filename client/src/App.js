import ConnectWallet  from './components/ConnectWallet';
import MintNFT  from './components/metadata';
import './App.css';
// import './UI/FileUpload.css'


function App() {
  return (
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
    
    </div>
  );
}

export default App;
