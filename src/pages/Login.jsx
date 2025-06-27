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
  const [eye,setEye]=useState(false)

  let handleEyeClick=()=>{
    setShowPass(!showPass)
    setEye(!eye)
  }

  return (
    <>
       <Container>
      <Grid container>
        <Grid size={6}>
          <div className='reg-box'>
           <div className='reg-title'>
            <h5>Login to your account!</h5>
            <div className='googleBtn'>
              <img src={GoogleIcon} alt="Google" />
              <h4>Login with Google</h4>
            </div>
            <CssTextField id="outlined-basic" label="Email Address" variant="outlined" />
            <div className='passField'>
              <CssTextField type={showPass?"text":"password"} id="outlined-basic" label="Password" variant="outlined" />
              <div onClick={handleEyeClick} className='fa-eye-on'>
              
              {eye?<FiEye />:<FiEyeOff />}
              </div>
            
            </div>
            <BootstrapButton variant="contained">Login to Continue</BootstrapButton>
            <p>Don’t have an account ? <Link to='/'><span>Sign up</span></Link></p>
          </div>
         </div>
           
  
        </Grid>
        <Grid size={6}>
          <img className='regImg' src={LoginImg} alt="Image" />
        </Grid>  
      </Grid>
    </Container>
    </>
  )
}

export default Login