import React,{useState} from 'react';
import {Buffer} from 'buffer';
import ipfs from '../ipfs';


function FileUpload() {

  const [filedata,setFiledata] = useState({fileBuffer:'No file uploaded'});

  const uploadFile = async (event) =>{
    console.log(filedata);
    event.preventDefault();
    
    //getting file from user
    const fileName = event.target.files[0];
    console.log(fileName);
    console.log('You uploaded => ',fileName.name);
    const fileReader = new window.FileReader();
    //reading filecontent as buffer
    fileReader.readAsArrayBuffer(fileName);
    console.log(fileReader);
    
    fileReader.onloadend = () =>{
      console.log('fileRead check in progress...');
      // console.log(Buffer(fileReader.result));
      setFiledata({fileBuffer: Buffer(fileReader.result)});
      // console.log('buffer is',Buffer(fileReader.result));
    
    }
    
  }
  
  const fileSubmit = (event) =>{
    event.preventDefault();
    console.log('File submitted');
    console.log('filedata is',filedata.fileBuffer);

    // console.log('Your data is of type=>',typeof(filedata.fileBuffer));
    ipfs.add(filedata.fileBuffer, (err,file)=>{
      if(err){console.log(err);}
      console.log(file);
    })

  }
  
  return (
    <div className="FileUpload">
    
      <form onSubmit={fileSubmit}>
        <input type="file" onChange={uploadFile}></input> {/*onChange */}
        {/* {filedata.fileBuffer} */}
        <input type='submit' ></input> {/*onSubmit */}
      </form>
        
        
    
    </div>
  );
}

export default FileUpload;
