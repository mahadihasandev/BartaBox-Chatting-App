import React, { useEffect } from 'react'
import {useDispatch, useSelector } from 'react-redux'
import { useNavigate} from 'react-router-dom'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { userDetails } from '../slices/userInfoSlice';
import { Bounce, toast, ToastContainer } from 'react-toastify';


const BootstrapButton = styled(Button)({
  width:'55%',
  padding:"19px 0px",
  background:"#5F35F5",
  fontFamily:"Open Sans",
  
});


function Home() {
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
    localStorage.removeItem("activeUser")
    dispatch(userDetails(null))
    navigate('/login')
  }
 
  return (
    <>
    <div>
      <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              transition={Bounce}
              />
    </div>
    <div>
      <div>{data.displayName}</div>
      <div>{data.email}</div>
      <div><img src={data.photoURL} alt="Image" /></div>
      <div>{data.createdAt}</div>
      <div>{data.lastLoginAt}</div>
      
      <BootstrapButton onClick={handleLogOut} variant="contained">Log Out</BootstrapButton>
    </div>
    </>
  )
}

export default Home