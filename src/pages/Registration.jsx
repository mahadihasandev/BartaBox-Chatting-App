import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { ToastContainer, toast, Bounce } from "react-toastify";
import RegistrationImg from "../assets/registration.png";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import fireBaseConfig from "../FirebaseConfig";
import { getDatabase, ref, set } from "firebase/database";

const BootstrapButton = styled(Button)({
  width: "55%",
  padding: "14px 0px",
  background: "#0d6efd",
  borderRadius: "12px",
  fontFamily: "Manrope",
  textTransform: "none",
  fontWeight: 700,
});

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#0945a8",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#0d6efd",
    },
  },
  width: "55%",
  paddingBottom: "18px",
});

function Registration() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passError, setPassError] = useState("");
  const [confirmPassError, setConfirmPassError] = useState("");
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const auth = getAuth(fireBaseConfig);

  const validate = () => {
    let hasError = false;

    if (!email) {
      setEmailError("Email is required");
      hasError = true;
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailError("Enter a valid email");
      hasError = true;
    }

    if (!name) {
      setNameError("Display name is required");
      hasError = true;
    } else if (!/^.{2,20}$/.test(name)) {
      setNameError("Name must be 2-20 characters");
      hasError = true;
    }

    if (!pass) {
      setPassError("Password is required");
      hasError = true;
    } else if (!/^.{8,}$/.test(pass)) {
      setPassError("Use at least 8 characters");
      hasError = true;
    } else if (!/.*[A-Z]/.test(pass)) {
      setPassError("Include at least one uppercase letter");
      hasError = true;
    } else if (!/^.*[a-z]/.test(pass)) {
      setPassError("Include at least one lowercase letter");
      hasError = true;
    } else if (!/.*\d/.test(pass)) {
      setPassError("Include at least one number");
      hasError = true;
    }

    if (!confirmPass) {
      setConfirmPassError("Confirm your password");
      hasError = true;
    } else if (confirmPass !== pass) {
      setConfirmPassError("Passwords do not match");
      hasError = true;
    }

    return !hasError;
  };

  const handleClick = () => {
    setEmailError("");
    setNameError("");
    setPassError("");
    setConfirmPassError("");

    if (!validate()) return;

    setIsSubmitting(true);
    createUserWithEmailAndPassword(auth, email, pass)
      .then(async (user) => {
        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: "https://i.ibb.co/GQ4sL6n/default-avatar.png",
        });

        await sendEmailVerification(auth.currentUser);

        const db = getDatabase();
        await set(ref(db, "users/" + user.user.uid), {
          username: name,
          email: user.user.email,
          photo: "https://i.ibb.co/GQ4sL6n/default-avatar.png",
        });

        setEmail("");
        setName("");
        setPass("");
        setConfirmPass("");
        toast.success("Account created. Verify your email to login.");
        setTimeout(() => {
          navigate("/login");
        }, 1200);
      })
      .catch((error) => {
        toast.error(error.code);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <Grid container>
        <Grid size={{ xs: 12, md: 6 }}>
          <div className="reg-box">
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              transition={Bounce}
            />

            <div className="reg-title">
              <h2>Create your account</h2>
              <p>Join your friends and start chatting instantly.</p>

              {emailError && <div className="error-screen">{emailError}</div>}
              <CssTextField
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                id="register-email"
                label="Email Address"
                variant="outlined"
              />

              {nameError && <div className="error-screen">{nameError}</div>}
              <CssTextField
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameError("");
                }}
                id="register-name"
                label="Display Name"
                variant="outlined"
              />

              {passError && <div className="error-screen">{passError}</div>}
              <div className="passField">
                <CssTextField
                  value={pass}
                  onChange={(e) => {
                    setPass(e.target.value);
                    setPassError("");
                  }}
                  type={showPass ? "text" : "password"}
                  id="register-password"
                  label="Password"
                  variant="outlined"
                />
                <div onClick={() => setShowPass(!showPass)} className="fa-eye-on">
                  {showPass ? <FiEye /> : <FiEyeOff />}
                </div>
              </div>

              {confirmPassError && <div className="error-screen">{confirmPassError}</div>}
              <div className="passField">
                <CssTextField
                  value={confirmPass}
                  onChange={(e) => {
                    setConfirmPass(e.target.value);
                    setConfirmPassError("");
                  }}
                  type={showConfirmPass ? "text" : "password"}
                  id="register-confirm-password"
                  label="Confirm Password"
                  variant="outlined"
                />
                <div onClick={() => setShowConfirmPass(!showConfirmPass)} className="fa-eye-on">
                  {showConfirmPass ? <FiEye /> : <FiEyeOff />}
                </div>
              </div>

              <BootstrapButton onClick={handleClick} variant="contained" disabled={isSubmitting}>
                {isSubmitting ? "Creating account..." : "Create account"}
              </BootstrapButton>

              <p>
                Already have an account? <Link to="/login"><span>Sign in</span></Link>
              </p>
            </div>
          </div>
        </Grid>

        <Grid className="reg-grid" size={{ xs: 0, md: 6 }}>
          <img className="regImg" src={RegistrationImg} alt="Registration visual" />
        </Grid>
      </Grid>
    </>
  );
}

export default Registration;
