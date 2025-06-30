import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import LoginImg from '../assets/loginImg.png'
import { Link } from 'react-router-dom';
import GoogleIcon from '../assets/googleIcon.png'
import { FiEye,FiEyeOff } from "react-icons/fi";


const BootstrapButton = styled(Button)({
  width:'55%',
  padding:"19px 0px",
  background:"#5F35F5",
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


function Login() {
  const [showPass,setShowPass]=useState(false);
  const [pass,setPass]=useState('');

  const [email,setEmail]=useState('');
  const [emailError,setEmailError]=useState('');
  const [passError,setPassError]=useState('');
  

  let handleEyeClick=()=>{
    setShowPass(!showPass)
    
  }

  let handleEmail=(e)=>{
    setEmail(e.target.value)
    setEmailError("")
    
  }

  let handlePass=(e)=>{
    setPass(e.target.value)
    setPassError('')

  }

  let handleBtnClick=()=>{
    if(!email){
      setEmailError("Emile is empty");
      
    }else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
      setEmailError("Type a valid email")
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

  
  return (
    <>
       <>
      <Grid container>        
        <Grid size={6}>
          <div className='reg-box'>
           <div className='reg-title'>
            <h5>Login to your account!</h5>
            <div className='googleBtn'>
              <img src={GoogleIcon} alt="Google" />
              <h4>Login with Google</h4>
            </div>
            <div className='emailError'>
            {emailError&&<div className='error-screen'>{emailError}</div>}
            </div>
            <CssTextField onChange={handleEmail} id="outlined-basic" label="Email Address" variant="outlined" />
            <div className='passField'>
              {passError&&<div className='error-screen'>{passError}</div>}

              <div className='passFieldLogin'>
              <CssTextField onChange={handlePass} type={showPass?"text":"password"} id="outlined-basic" label="Password" variant="outlined" />
              <div onClick={handleEyeClick} className='fa-eye-on-login'>
              
              {showPass?<FiEye />:<FiEyeOff />}
              </div>
            </div>
            </div>
            <BootstrapButton onClick={handleBtnClick} variant="contained">Login to Continue</BootstrapButton>
            <p>Don’t have an account ? <Link to='/'><span>Sign up</span></Link></p>
          </div>
         </div>
           
  
        </Grid>
        <Grid className='reg-grid' size={6}>
          <img className='regImg' src={LoginImg} alt="Image" />
        </Grid>  
      </Grid>
    </>
    </>
  )
}

export default Login