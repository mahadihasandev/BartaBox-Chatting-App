import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import LoginImg from "../assets/loginImg.png";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "../assets/googleIcon.png";
import { FiEye, FiEyeOff } from "react-icons/fi";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { ToastContainer, toast, Bounce } from "react-toastify";
import fireBaseConfig from "../FirebaseConfig";
import { useDispatch } from "react-redux";
import { userDetails } from "../slices/userInfoSlice";
import { getDatabase, ref, set } from "firebase/database";

const BootstrapButton = styled(Button)({
  width: "55%",
  padding: "14px 0px",
  background: "#0d6efd",
  fontFamily: "Manrope",
  borderRadius: "12px",
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

function Login() {
  const provider = new GoogleAuthProvider(fireBaseConfig);
  const auth = getAuth(fireBaseConfig);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPass, setShowPass] = useState(false);
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const [forgetPassBtn, setForgetPassBtn] = useState(false);
  const [forgetEmail, setForgetEmail] = useState("");

  provider.setCustomParameters({
    prompt: "select_account",
  });

  const persistGoogleUser = (user) => {
    dispatch(userDetails(user));
    localStorage.setItem("activeUser", JSON.stringify(user));

    const db = getDatabase();
    return set(ref(db, "users/" + user.uid), {
      username: user.displayName,
      email: user.email,
      photo: user.photoURL,
    });
  };

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (!result?.user) return;

        const db = getDatabase();
        set(ref(db, "users/" + result.user.uid), {
          username: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }).then(() => {
          dispatch(userDetails(result.user));
          localStorage.setItem("activeUser", JSON.stringify(result.user));
          toast.success("Welcome to BartaBox");
          navigate("/pages/home");
        });
      })
      .catch((error) => {
        if (error?.code !== "auth/no-auth-event") {
          toast.error(error.code || "Google login failed");
        }
      })
      .finally(() => {
        setIsGoogleLoading(false);
      });
  }, [auth, dispatch, navigate]);

  const validate = () => {
    let valid = true;

    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailError("Enter a valid email");
      valid = false;
    }

    if (!pass) {
      setPassError("Password is required");
      valid = false;
    } else if (pass.length < 8) {
      setPassError("Password must be at least 8 characters");
      valid = false;
    }

    return valid;
  };

  const handleBtnClick = () => {
    setEmailError("");
    setPassError("");

    if (!validate()) return;

    setIsSubmitting(true);
    signInWithEmailAndPassword(auth, email, pass)
      .then((user) => {
        if (user.user.emailVerified) {
          dispatch(userDetails(user.user));
          localStorage.setItem("activeUser", JSON.stringify(user.user));
          setEmail("");
          setPass("");
          toast.success("Welcome back");
          setTimeout(() => navigate("/pages/home"), 800);
        } else {
          toast.error("Verify your email before logging in");
        }
      })
      .catch((error) => {
        const errorcode = error.code;
        if (errorcode.includes("auth/invalid-credential")) {
          toast.error("Invalid email or password");
        } else {
          toast.error(errorcode);
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleGoogleAuth = () => {
    setIsGoogleLoading(true);

    signInWithPopup(auth, provider)
      .then((user) => {
        persistGoogleUser(user.user).then(() => {
          toast.success("Welcome to BartaBox");
          navigate("/pages/home");
        });
      })
      .catch((error) => {
        const popupRestrictedErrors = [
          "auth/popup-blocked",
          "auth/popup-closed-by-user",
          "auth/cancelled-popup-request",
          "auth/operation-not-supported-in-this-environment",
        ];

        if (popupRestrictedErrors.includes(error.code)) {
          toast.info("Opening Google sign-in redirect...");
          signInWithRedirect(auth, provider);
          return;
        }

        toast.error(error.code || "Google login failed");
      })
      .finally(() => {
        setIsGoogleLoading(false);
      });
  };

  const handleForgetPassBtn = () => {
    if (!forgetEmail) {
      toast.error("Enter your email first");
      return;
    }

    sendPasswordResetEmail(auth, forgetEmail)
      .then(() => {
        toast.success("Reset email sent");
      })
      .catch((error) => {
        toast.error(error.code);
      })
      .finally(() => {
        setForgetPassBtn(false);
        setForgetEmail("");
      });
  };

  return (
    <>
      <Grid container>
        <Grid size={{ xs: 12, md: 6 }}>
          <div className="reg-box">
            <div className="reg-title">
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

              <h5>Log in to Messenger-style chat</h5>
              <p>Fast, simple, and secure access to your messages.</p>

              <button
                onClick={handleGoogleAuth}
                className="googleBtn"
                type="button"
                disabled={isGoogleLoading}
              >
                <img src={GoogleIcon} alt="Google" />
                <h4>{isGoogleLoading ? "Connecting..." : "Continue with Google"}</h4>
              </button>

              {emailError && <div className="error-screen">{emailError}</div>}
              <CssTextField
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                id="login-email"
                label="Email Address"
                variant="outlined"
              />

              <div className="passField">
                {passError && <div className="error-screen">{passError}</div>}
                <div className="passFieldLogin">
                  <CssTextField
                    value={pass}
                    onChange={(e) => {
                      setPass(e.target.value);
                      setPassError("");
                    }}
                    type={showPass ? "text" : "password"}
                    id="login-password"
                    label="Password"
                    variant="outlined"
                  />
                  <div onClick={() => setShowPass(!showPass)} className="fa-eye-on-login">
                    {showPass ? <FiEye /> : <FiEyeOff />}
                  </div>
                </div>

                <div onClick={() => setForgetPassBtn(true)} className="forget-pass">
                  Forgot password?
                </div>
              </div>

              <BootstrapButton onClick={handleBtnClick} variant="contained" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Log in"}
              </BootstrapButton>

              <p>
                Don&apos;t have an account? <Link to="/"><span>Create one</span></Link>
              </p>
            </div>
          </div>
        </Grid>

        <Grid className="reg-grid" size={{ xs: 0, md: 6 }}>
          <img className="regImg" src={LoginImg} alt="Login visual" />
        </Grid>
      </Grid>

      {forgetPassBtn && (
        <div className="forget-pass-ui">
          <div className="forget-pass-ui-box">
            <CssTextField
              className="forget-pass-email"
              value={forgetEmail}
              onChange={(e) => setForgetEmail(e.target.value)}
              id="forget-pass-email"
              label="Email Address"
              variant="outlined"
            />
            <div className="forget-pass-btn-box">
              <BootstrapButton onClick={handleForgetPassBtn} variant="contained">
                Send reset email
              </BootstrapButton>
              <BootstrapButton
                onClick={() => {
                  setForgetPassBtn(false);
                  setForgetEmail("");
                }}
                variant="contained"
              >
                Cancel
              </BootstrapButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
