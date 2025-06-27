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
    const [eye,setEye]=useState(false)
  
    let handleEyeClick=()=>{
      setShowPass(!showPass)
      setEye(!eye)
    }

  return (
    <Container>
      <Grid container>
        <Grid size={6}>
         <div className='reg-box'>
           <div className='reg-title'>
            <h2>Get started with easily register</h2>
            <p>Free register and you can enjoy it</p>
            <CssTextField id="outlined-basic" label="Email Address" variant="outlined" />
            <CssTextField id="outlined-basic" label="Full name" variant="outlined" />
            <div className='passField'>
                          <CssTextField type={showPass?"text":"password"} id="outlined-basic" label="Password" variant="outlined" />
                          <div onClick={handleEyeClick} className='fa-eye-on'>
                          
                          {eye?<FiEye />:<FiEyeOff />}
                          </div>
                          </div>

            <BootstrapButton variant="contained">Sign up</BootstrapButton>
            <p>Already  have an account ? <Link to='/login'><span>Sign In</span></Link> </p>
          </div>
         </div>
           
  
        </Grid>
        <Grid size={6}>
          <img className='regImg' src={RegistrationImg} alt="Image" />
        </Grid>  
      </Grid>
    </Container>
  )
}

export default Registration