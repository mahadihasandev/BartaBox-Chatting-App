import React, { useState } from 'react'
import Grid from '@mui/material/Grid';

import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

import RegistrationImg from '../assets/registration.png';
import { Link } from 'react-router-dom';
import { FiEye,FiEyeOff } from "react-icons/fi";

const BootstrapButton = styled(Button)({
  width:'55%',
  padding:"19px 0px",
  background:"#5F35F5",
  borderRadius:"86px",
  fontFamily:"Open Sans",
});


const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#11175D',
  },
   '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2',
  },
  '& .MuiOutlinedInput-root': {
    
    '&.Mui-focused fieldset': {
      borderColor: '#11175D',
    },
  },
  width:"55%",
  paddingBottom:"33px"
});


function Registration() {

  const [showPass,setShowPass]=useState(false);
  const [email,setEmail]=useState("");
  const [emailError,setEmailError]=useState("");
  const [nameError,setNameError]=useState("");
  const [passError,setPassError]=useState("");
  const [name,setName]=useState("");
   const [pass,setPass]=useState("");
    


    function handleEmail(e){
      
        setEmail(e.target.value)
        setEmailError("")

    }

    function handleName(e){
        setName(e.target.value)
        setNameError("")
    }

    function handlePass(e){
        setPass(e.target.value)
        setPassError("")
    }

   function handleClick(){
    if(!email){
        setEmailError("Email does not exist")
        
      }else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
      setEmailError("Type a valid email")
    }


    if(!name){
      setNameError("name is required")
    }else if(!/^.{2,15}$/.test(name)){
      setNameError("Name must be between 2-16 character long") 
    }else if(!/^[a-zA-Z].*$/.test(name)){
      setNameError("Must be start with a letter") 
    }else if(!/^[a-zA-Z0-9_]+$/.test(name)){
      setNameError("only later number & underscore are valid") 
    }

    if(!pass){
      setPassError("Password is empty")
    }else if (!/^.{8,}$/.test(pass)){
      setPassError("at least 8 character")
    }else if(!/.*[A-Z]/.test(pass)){
      setPassError("at least one upper case")
    }else if (!/^.*[a-z]/.test(pass)){
      setPassError("at least one lower case")
    }else if (!/.*\d/.test(pass)){
      setPassError("at least one number")

      // (?=.*[@$!%*?&])
      // [A-Za-z\d@$!%*?&]{8,}$
    }

   }

    let handleEyeClick=()=>{
      
      setShowPass(!showPass)
      
    }

  return (
    <>
      <Grid container>
        <Grid size={6} spacing={20}>
         <div className='reg-box'>
           <div className='reg-title'>
            <h2>Get started with easily register</h2>
            <p>Free register and you can enjoy it</p>
            {emailError&&<div className='error-screen'>{emailError}</div>}
            <CssTextField onChange={handleEmail} id="outlined-basic" label="Email Address" variant="outlined" />
            {nameError&&<div className='error-screen'>{nameError}</div>}
            <CssTextField onChange={handleName} id="outlined-basic" label="Full name" variant="outlined" />
            {passError&&<div className='error-screen'>{passError}</div>}
            <div className='passField'>
                          <CssTextField onChange={handlePass} type={showPass?"text":"password"} id="outlined-basic" label="Password" variant="outlined" />
                          <div onClick={handleEyeClick} className='fa-eye-on'>
                          
                          {showPass?<FiEye />:<FiEyeOff />}
                          </div>
                          </div>

            <BootstrapButton onClick={handleClick} variant="contained">Sign up</BootstrapButton>
            <p>Already  have an account ? <Link to='/login'><span>Sign In</span></Link> </p>
          </div>
         </div>
           
  
        </Grid>
        <Grid className='reg-grid' size={6}>
          <img className='regImg' src={RegistrationImg} alt="Image" />
        </Grid>  
      </Grid>
    </>
  )
}

export default Registration