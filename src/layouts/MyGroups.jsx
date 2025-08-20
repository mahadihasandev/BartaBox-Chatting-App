import { LuSearch } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";
import SingleUser from '../components/SingleUser';
import { FaSquarePlus } from "react-icons/fa6";
import { useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import { push, ref, set } from "firebase/database";

//mui button setup

const BootstrapButton = styled(Button)({
  width: "100%",
  padding: "15px 29px",
  background: "#5F35F5",
  fontFamily: "Open Sans",
});

//mui textfield setup

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
  const [groupName, setGroupName] = useState("");
  const [groupTag, setGroupTag] = useState("");
  let groupRef=useRef(null);

  const db = getDatabase();

//current user data

  let data=useSelector((state)=>(state.activeUser.value))

//group popup button

let handleAddGroup = () => {
  setGroupPopUp(true);
}

//Blank space click pop up close

let handlegroupBlank = (e) => {
  if(!groupRef.current.contains(e.target)){
    setGroupPopUp(false);
  }
}

//Group name change

let handleGroupName = (e) => {
  setGroupName(e.target.value);
}

//Group tag change

let handleGroupTag = (e) => {
  setGroupTag(e.target.value);
}

//create group & sending data to firebase

let handleCreateGroup = () => {
  set(push(ref(db,'Mygroup/')), {
      adminName:data.displayname,
      adminId:data.uid,
      groupName: groupName,
      groupTag: groupTag
    }).then(()=>{
      setGroupName("");
      setGroupTag("");
      setGroupPopUp(false);
    })
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
          <div onClick={handlegroupBlank} className="popup-image">
            <div  ref={groupRef} className="popup-img-box">
              <h2>Create New Group</h2>
              
              <CssTextField
              value={groupName}
              onChange={handleGroupName}
              id="outlined-basic"
              label="Group Name"
              variant="outlined"
            />
              
              <CssTextField
              value={groupTag}
              onChange={handleGroupTag}
              id="outlined-basic"
              label="Group tag"
              variant="outlined"
            />
              
              
              <div>
                <BootstrapButton onClick={handleCreateGroup} variant="contained">
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