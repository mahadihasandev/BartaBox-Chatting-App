import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import LoginImg from '../assets/loginImg.png'
import { Link } from 'react-router-dom';
import GoogleIcon from '../assets/googleIcon.png'
import { FiEye,FiEyeOff } from "react-icons/fi";
import { getAuth, signInWithEmailAndPassword,signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { ToastContainer, toast,Bounce } from 'react-toastify';



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
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
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

    if(email&&(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))&&pass){
      
      signInWithEmailAndPassword(auth, email, pass)
        .then((user) => {
          if(user.user.emailVerified){
            setEmail('')
            setPass('')
            toast.success("You are logged in Successfully") 
          }else{
            toast.error("Email is not verified")
          }
         
  })
  .catch((error) => {
    let errorcode=error.code
    if(errorcode.includes("auth/invalid-credential")){
      toast.error("Invalid Email or Password")
    }else{      
      toast.error(errorcode)
        setEmail('')
        setPass('')      
    }
    
  });
}}

let handleGoogleAuth=()=>{

signInWithPopup(auth, provider)
  .then((result) => {
    console.log(result)
    toast.success("You are logged in Successfully") 
    
  }).catch((error) => {
    const errorCode = error.code;
    toast.error(errorCode)
    
  });
  console.log("google")
}



  return (
    <>
       <>
      <Grid container>        
        <Grid size={{xs:12,md:6}}>
          <div className='reg-box'>
           <div className='reg-title'>
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
            <h5>Login to your account!</h5>
            <div onClick={handleGoogleAuth} className='googleBtn'>
              <img src={GoogleIcon} alt="Google" />
              <h4>Login with Google</h4>
            </div>
            <div className='emailError'>
            {emailError&&<div className='error-screen'>{emailError}</div>}
            </div>
            <CssTextField value={email} onChange={handleEmail} id="outlined-basic" label="Email Address" variant="outlined" />
            <div className='passField'>
              {passError&&<div className='error-screen'>{passError}</div>}

              <div className='passFieldLogin'>
              <CssTextField value={pass} onChange={handlePass} type={showPass?"text":"password"} id="outlined-basic" label="Password" variant="outlined" />
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
        <Grid className='reg-grid' size={{xs:0,md:6}}>
          <img className='regImg' src={LoginImg} alt="Image" />
        </Grid>  
      </Grid>
    </>
    </>
  )
}

export default Login