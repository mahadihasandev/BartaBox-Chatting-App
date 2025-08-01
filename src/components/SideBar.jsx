
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
  const [Locations, setLocation] = useState();
  const [visiblePopup, setVisiblePopup] = useState(false);

  // const storage = getStorage();

  const auth = getAuth();
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let location = useLocation();
  const [image, setImage] = useState("");

  const [cropData, setCropData] = useState("");
  const cropperRef = createRef();
  
  

  useEffect(() => {
    setLocation(location.pathname.replace("/pages/", ""));
  });
  let domRef = useRef(null);

  let data = useSelector((state) => state.activeUser.value);
  let ppData=data.photoURL
  // let imgdata=useSelector((state)=>console.log(state.activeUser.value.photoURL))

  useEffect(() => {
    if (!data) {
      navigate("/login");
    }
  }, []);

  let handleLogOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("activeUser");
        dispatch(userDetails(null));
        navigate("/login");
      })
      .catch((error) => {
        let errorCode = error.code;
        toast.error(errorCode);
      });
  };

  let handleUpdateProfile = () => {
    setVisiblePopup(true);
  };

  let handlePopUp = (e) => {
    if (!domRef.current.contains(e.target)) {
      setVisiblePopup(false);
    }
  };

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
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      // const storageRef = ref(storage, auth.currentUser.uid);

    //   const message4 = cropData;
    //   uploadString(storageRef, message4, "data_url").then((snapshot) => {
    //     console.log("Uploaded a data_url string!");
    //   });
      // getDownloadURL(storageRef).then((downloadURL) => {
      //   console.log("File available at", downloadURL);
      // });
    }
  };

  return (
    <>
      <div className="sidebar-layouts">
        <div onClick={handleUpdateProfile} className="profile-layout">
          <img src={ppData} alt="Img" />
          <div className="overlay">
            <FaCloudUploadAlt className="icon" />
          </div>
        </div>
        <div className="page-layout">
          <Link className={Locations == "home" && "active"} to="/pages/home">
            <TbHomeDown className="page-icon" />
          </Link>
          <Link
            className={Locations == "messages" && "active"}
            to="/pages/messages"
          >
            <AiOutlineMessage className="page-icon" />
          </Link>
          <Link
            className={Locations == "notification" && "active"}
            to="/pages/notification"
          >
            <MdOutlineNotificationsActive className="page-icon" />
          </Link>
          <Link
            className={Locations == "settings" && "active"}
            to="/pages/settings"
          >
            <MdOutlineSettings className="page-icon" />
          </Link>
        </div>
        <div className="logout-layout">
          <HiOutlineLogout onClick={handleLogOut} className="page-icon" />
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
                <div>
                  <div className="preview-box">
                    <h1>Preview</h1>
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
