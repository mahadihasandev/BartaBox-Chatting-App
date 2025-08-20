
import { LuSearch } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";
import SingleUser from '../components/SingleUser';
import { FaSquarePlus } from "react-icons/fa6";
import { useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const BootstrapButton = styled(Button)({
  width: "100%",
  padding: "15px 29px",
  background: "#5F35F5",
  fontFamily: "Open Sans",
});


const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#11175D",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#11175D",
    },
  },
  width: "80%",
  paddingBottom: "33px",
});


function MyGroups() {
  const [groupPopUp, setGroupPopUp] =useState(false);
  let groupRef=useRef(null);
  console.log(groupRef)
  

let handleAddGroup = () => {
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
              <h2>Create New Group</h2>
              
              <CssTextField
              // className="forget-pass-email"
              // value={ForgetEmail}
              // onChange={handleForgetEmail}
              id="outlined-basic"
              label="Group Name"
              variant="outlined"
            />
              
              <CssTextField
              
              // value={ForgetEmail}
              // onChange={handleForgetEmail}
              id="outlined-basic"
              label="Group tag"
              variant="outlined"
            />
              
              
              <div>
                <BootstrapButton variant="contained">
                  Create
                </BootstrapButton>
              </div>
            </div>
          </div>
        )}
    </>
  )
}

export default MyGroups