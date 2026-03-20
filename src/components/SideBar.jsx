
import { TbHomeDown } from "react-icons/tb";
import { AiOutlineMessage } from "react-icons/ai";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { createRef, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userDetails } from "../slices/userInfoSlice";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { getAuth, signOut } from "firebase/auth";
import { FaCloudUploadAlt } from "react-icons/fa";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

// import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";

const BootstrapButton = styled(Button)({
  width: "35%",
  padding: "19px 0px",
  background: "#5F35F5",
  fontFamily: "Open Sans",
  borderRadius: "30px",
});

function SideBar() {
  const [activeRoute, setActiveRoute] = useState("home");
  const [visiblePopup, setVisiblePopup] = useState(false);

  const auth = getAuth();
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let location = useLocation();
  const [image, setImage] = useState("");

  const cropperRef = createRef();
  
  // Use location hook for menu highlight state.
  useEffect(() => {
    setActiveRoute(location.pathname.replace("/pages/", "") || "home");
  }, [location.pathname]);

  let domRef = useRef(null);

  let data = useSelector((state) => state.activeUser.value);

  useEffect(() => {
    if (!data) {
      navigate("/login");
    }
  }, [data, navigate]);

  // Logout button
  let handleLogOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("activeUser");
        localStorage.removeItem("friendLists");
        dispatch(userDetails(null));
        navigate("/login");
      })
      .catch((error) => {
        let errorCode = error.code;
        toast.error(errorCode);
      });
  };

  // Update profile button
  let handleUpdateProfile = () => {
    setVisiblePopup(true);
  };

  // Profile picture popup close when clicking outside.
  let handlePopUp = (e) => {
    if (!domRef.current.contains(e.target)) {
      setVisiblePopup(false);
    }
  };

  // Crop image input locally.
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      const croppedPhoto = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL();
      const updatedUser = { ...data, photoURL: croppedPhoto };
      dispatch(userDetails(updatedUser));
      localStorage.setItem("activeUser", JSON.stringify(updatedUser));
      setImage("");
      setVisiblePopup(false);
      toast.success("Profile photo updated locally");
    }
  };

  return (
    <>
      <div className="sidebar-layouts">
        <div className="sidebar-top">
          <div onClick={handleUpdateProfile} className="profile-layout">
            <img className="ppImg" src={data?.photoURL} alt="Profile" />
            <div className="overlay">
              <FaCloudUploadAlt className="icon" />
            </div>
          </div>
          <h4 className="display-name">{data?.displayName}</h4>
        </div>

        <div className="page-layout">
          <Link className={activeRoute === "home" ? "active" : ""} to="/pages/home">
            <TbHomeDown className="page-icon" />
            <span>Home</span>
          </Link>
          <Link
            className={activeRoute === "messages" ? "active" : ""}
            to="/pages/messages"
          >
            <AiOutlineMessage className="page-icon" />
            <span>Messages</span>
          </Link>
          <Link
            className={activeRoute === "notification" ? "active" : ""}
            to="/pages/notification"
          >
            <MdOutlineNotificationsActive className="page-icon" />
            <span>Notification</span>
          </Link>
          <Link
            className={activeRoute === "settings" ? "active" : ""}
            to="/pages/settings"
          >
            <MdOutlineSettings className="page-icon" />
            <span>Settings</span>
          </Link>
        </div>
        <div className="logout-layout">
          <HiOutlineLogout onClick={handleLogOut} className="page-icon" />
          <span>Logout</span>
        </div>

        {visiblePopup && (
          <div onClick={handlePopUp} className="popup-image">
            <div ref={domRef} className="popup-img-box">
              <h2>Change your profile picture</h2>
              <input onChange={onChange} type="file" />
              <div style={{ display: "flex" }}>
                <div>
                  {image && (
                    <Cropper
                      ref={cropperRef}
                      style={{ height: 400, width: "100%" }}
                      initialAspectRatio={1}
                      preview=".img-preview"
                      src={image}
                      viewMode={1}
                      minCropBoxHeight={10}
                      minCropBoxWidth={10}
                      background={false}
                      responsive={true}
                      autoCropArea={1}
                      checkOrientation={false}
                      guides={true}
                    />
                  )}
                </div>
                <div className="preview-column">
                  <div className="preview-box">
                    <h3>Preview</h3>
                    <div className="img-preview preview-round"></div>
                  </div>
                </div>
              </div>
              <div>
                <BootstrapButton onClick={getCropData} variant="contained">
                  Upload
                </BootstrapButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SideBar;
