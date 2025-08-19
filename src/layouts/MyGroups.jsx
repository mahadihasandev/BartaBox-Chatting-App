
import { LuSearch } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";
import SingleUser from '../components/SingleUser';
import { FaSquarePlus } from "react-icons/fa6";
import { useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const BootstrapButton = styled(Button)({
  width: "55%",
  padding: "19px 0px",
  background: "#5F35F5",
  fontFamily: "Open Sans",
});


function MyGroups() {
  const [groupPopUp, setGroupPopUp] = useState(false);
  let groupRef=useRef(null);
  console.log(groupRef)
  

let handleAddGroup = () => {
  console.log("working");
  setGroupPopUp(true);
}

let onChange = (e) => {
  console.log(e.target.value);
  
}

let hanblegroupBlank = (e) => {
  if(!groupRef.current.contains(e.target)){
    setGroupPopUp(false);
  }
}



  return (
    <>
        <div className='user-box'>
      <div className='user-search-box'>
        <LuSearch className='search-icon'/>
        <input placeholder='Search' type="text" />
        <BsThreeDotsVertical className='threeDot-icon'/>
      </div>
      <div className="userList-box">
        <div className='userList-title-box '>
          <h4 className='userList-title'>My Groups</h4>
          <FaSquarePlus className="add-group-icon" onClick={handleAddGroup} />
        </div>
        <SingleUser/>
      </div>     
    </div>
    {groupPopUp && (
          <div onClick={hanblegroupBlank} className="popup-image">
            <div  ref={groupRef} className="popup-img-box">
              <h2>Change your profile picture</h2>
              <input onChange={onChange} type="file" />
              <div style={{ display: "flex" }}>
                <div>
                </div>
                <div>
                  <div className="preview-box">
                    <h1>Preview</h1>
                    <div className="img-preview preview-round"></div>
                  </div>
                </div>
              </div>
              <div>
                <BootstrapButton variant="contained">
                  Upload
                </BootstrapButton>
              </div>
            </div>
          </div>
        )}
    </>
  )
}

export default MyGroups