import React from 'react'
import Grid from '@mui/material/Grid';
import RegistrationImg from '../assets/registration.png';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const BootstrapButton = styled(Button)({
  width:'55%',
  padding:"19px 0px",
  background:"#5F35F5",
  borderRadius:"86px"
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
            <CssTextField id="outlined-basic" label="Password" variant="outlined" />
            <BootstrapButton variant="contained">Contained</BootstrapButton>
            <p>Already  have an account ? <span>Sign In</span></p>
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