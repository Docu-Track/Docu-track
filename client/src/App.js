import ConnectWallet  from './components/ConnectWallet';
import FileUpload  from './components/FileUpload';
import './App.css';
import './UI/FileUpload.css'


function App() {
  return (
    <div >
      <div className="App">
        <h1>Your Image</h1>
      </div>
      <div>

      </div>
      <ConnectWallet/>
      <div className='FileUpload'>
        <FileUpload/>
      </div>
    
    </div>
  );
}

export default App;
