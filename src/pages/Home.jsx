import React, { useEffect } from 'react'
import {useDispatch, useSelector } from 'react-redux'
import { useNavigate} from 'react-router-dom'
import Button from '@mui/material/Button';
import { userDetails } from '../slices/userInfoSlice';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { getAuth, signOut } from "firebase/auth";
import { styled } from '@mui/material/styles';


const BootstrapButton = styled(Button)({
  width:'55%',
  padding:"19px 0px",
  background:"#5F35F5",
  fontFamily:"Open Sans",
  
});

function Home() {
  const auth = getAuth();


  console.log("home");
let dispatch=useDispatch()
  let navigate=useNavigate()
let data=useSelector((state)=>(state.activeUser.value)
)

  useEffect(
    ()=>{
      if(!data)
          navigate('/login')
        toast.success("Welcome to home page")   
    }
  ,[])

  let handleLogOut=()=>{

signOut(auth).then(() => {
   localStorage.removeItem("activeUser")
    dispatch(userDetails(null))
    navigate('/login')
}).catch((error) => {
  let errorCode=error.code
  toast.error(errorCode)
});
}
 
  return (
    <>
   
      <BootstrapButton onClick={handleLogOut} variant="contained">Log Out</BootstrapButton>

    </>
  )
}

export default Home