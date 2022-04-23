import { useState } from "react";

// check if any hash exist
// hashcheck(b)
// disaply fail/success  based on hashcheck(b)


const HashCheck = () =>{
    
    const [title,getTitle] = useState('No title available'); 
        let updateTitle = () => {
            getTitle('State ID');
        }
    
    return <div>
        <form>
            <div>
                <form>
                <label>Hash Title</label>
                <input type='text' value={title}></input>
                {/* time dependent=> use input for hash of stored file to provide user what file was uploaded previously  */}
                
                </form>    
                <div>
                <button type="submit" onClick={updateTitle} className='action-hashcheck'>Submit </button>
                  {/* check if need to add eventListner to provide status when user is waiting for fetching hash of NFT */}
                </div>
                
                
            </div>
        </form>
    </div>
}

export default HashCheck;