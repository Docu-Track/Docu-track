import React,{} from 'react';


function FileUpload() {

  // const [filedata,getFiledata] = useState({buffer:'No file available'});

  const uploadFile = (event) =>{
    event.preventDefault();
    console.log('File uploaded');
    const fileName = event.target.files[0];
    // console.log('Type=>', typeof(fileName));
    console.log('You uploaded => ',fileName.name);
    // const fileReader = new window.FileReader();
    // let fileReadCheck = false;
    // const fileReadObj = fileReader.readAsArrayBuffer(fileName);
    // console.log(fileReadObj);
    // console.log(typeof(fileName)); 
    // fileReader.onloadend = () =>{
    //   if (fileReadCheck) {
    //     console.log('fileRead check in progress...');
    //     // console.log(fileReadObj);
    //   }
      // getFiledata({buffer: Buffer(fileReader)})
    // }
  }

  const fileSubmit = (event) =>{
    event.preventDefault();
    console.log('File submitted');
  }
  
  return (
    <div className="FileUpload">
    
      <form onSubmit={fileSubmit}>
        <input type="file" onChange={uploadFile}></input> {/*onChange */}
        
        <input type='submit' onSubmit={fileSubmit}></input> {/*onSubmit */}
      </form>
        
        
    
    </div>
  );
}

export default FileUpload;
