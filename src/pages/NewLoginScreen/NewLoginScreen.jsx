import React from 'react';
import { Container, Box, Typography, Button, Grid,TextField  } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Colors } from "../../styles/theme";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom"
import { useState} from 'react';
import {useReduxDispatch } from "../../hooks/useReduxHook.js";
import { REQUESTS } from "../../api/requests.js";
import {
    loginFailure,
    loginStart,
    loginSuccess,
  } from "../../store/slice/userSlice.js";
  import {useNavigate } from "react-router-dom";
// backdrop //
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import ReactImageMagnify from "react-image-magnify";
import Modal from "@mui/material/Modal";
import ModalImage from "../../assets/photo/NewQualityNbuModalFoto.jpg";


// LANGUAGE SECTION //
import i18n from "i18next";
import { useTranslation } from "react-i18next";


const NewLoginScreen = () => {



      // change language function //
  const changeLang = (value) => {
    i18n.changeLanguage(value)
  }


  const [acceptNavigate, setAcceptNavigate] = useState(false);
    const {t} = useTranslation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const params = useParams();
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [backdrop, setBackdrop] = React.useState(false);
    const [openmodal, setOpenModal] = React.useState(false);
    const [loginError, setLoginError] = React.useState("");
    const [openauthmodal,setOpenAuthModal] = React.useState(false);
    const dispatch = useReduxDispatch();
    const [isAuth, setIsAuth] = useState(false);
    const navigate = useNavigate();
      // modal function //
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };

    // PASSWORD SHOW HIDE FUNCTION //
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const handleLogin = async () => {
        // console.log("clicked ", username, password);
        localStorage.clear();
        // navigate("/accessall");
        // const isLoggedIn = true;
        try {
          const formData = new FormData();
          formData.append("username", username);
          formData.append("password", password);
          dispatch(loginStart());
          const response = await REQUESTS.auth.login(formData);
          setIsAuth(true);
          console.log("opened login");
          setUsername(""); // Clear username
          setPassword(""); // Clear password
          navigate("/newtestscreen", { state: { acceptNavigate: true } });
          // navigate('/');

          if (response && response.data) {
            dispatch(loginSuccess(response.data.access));
            localStorage.setItem("token", response.data.access);
            params.setPassname();
          } else {
            throw new Error("Invalid response from server");
          }
        } catch (error) {
          console.error("Login failed:", error);
          let errorMessage = "Login failed";
          if (error.response && error.response.status === 401) {
            // errorMessage = "Invalid username or password";
            errorMessage = "Login yoki Parol xato !!!";
          } else if (error.response && error.response.status === 500) {
            errorMessage = "Server error. Please try again later.";
          }
          dispatch(loginFailure(errorMessage));
          setLoginError(errorMessage);
          setIsAuth(!isAuth);
        }
      };

        // BACKDROP FUNCTION //
  const handleCloseBackdrop = () => setBackdrop(false);



  return (
    <Box
          sx={{
            flexDirection: "column",
            width: "100%",
            gap: "10px",
            height: "auto",
            my: "5px",
          }}
        >
          {/* <=== login main section ===> */}
          <Box sx={{width:"100%",height:"auto",bgcolor: Colors.blue_login,  borderRadius: "5px",px: "10px",
                marginTop: "5px",
                marginBottom: "10px",
                py: { xs: "5px", sm: "5px", md: "0px" },
                lineHeight: "1",}}>
            <Box
              sx={{
                bgcolor: Colors.blue_login,
                width: "100%",
                height: "auto",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: {
                  xs: "column",
                  sm: "column",
                  md: "row",
                },
              }}
            >
              <Button variant="text" sx={{display: { xs: "none", md: "block" },}}>
                <Typography
                  sx={{
                    fontWeight: "800",
                    fontSize: "16px",
                    color: Colors.nbu,
                    textTransform:"uppercase",
                  }}
                >
                  {t("kpicorner")}
                </Typography>
              </Button>
              <Box
                sx={{
                  display: { xs: "", md: "flex" },
                  flexDirection: {
                    xs: "column",
                    sm: "column",
                    md: "row",
                  },
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                {/* <=== Login Section ===> */}
                <TextField
                  id="outlined-basic"
                  label={t("login")}
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  size="small"
                  autoComplete="off"
                  autoSave="off"
                  required
                  InputLabelProps={{
                    sx: {
                      color: Colors.blue_nbu, // Custom label text color
                      "&.Mui-focused": {
                        color: Colors.blue_nbu, // Custom label text color on focus
                      },
                    },
                  }}
                  sx={{
                    bgcolor: "white",
                    borderRadius: "5px",
                    marginTop: { xs: "8px", sm: "8px", md: "0px" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: Colors.blue_nbu, // Custom border color
                      },
                      "&:hover fieldset": {
                        borderColor: Colors.blue_nbu, // Border color on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: Colors.blue_nbu, // Border color on focus
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: Colors.blue_nbu, // Custom label text color
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: Colors.blue_nbu, // Custom label text color on focus
                    },
                  }}
                />
                {/* <== Password section ===> */}
                  <FormControl
                  sx={{
                    m: 1,
                    width: "25ch",
                    bgcolor: "white",
                    borderRadius: "5px",
                    "& .MuiInputLabel-root": {
                      color: Colors.blue_nbu, // Custom label text color
                      "&.Mui-focused": {
                        color: Colors.blue_nbu, // Custom label text color on focus
                      },
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: Colors.blue_nbu, // Default border color
                      },
                      "&:hover fieldset": {
                        borderColor: Colors.blue_nbu, // Border color on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: Colors.blue_nbu, // Border color on focus
                      },
                    },
                  }}
                  variant="outlined"
                  size="small"
                      >
        <InputLabel htmlFor="outlined-adornment-password">{t("parol")}</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoSave="off"
          autoComplete="new-password"
          required
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? (
                  <Visibility sx={{ color: Colors.blue_nbu }} />
                ) : (
                  <VisibilityOff sx={{ color: Colors.blue_nbu }} />
                )}
              </IconButton>
            </InputAdornment>
          }
          label="ПАРОЛ"
        />
                  </FormControl>
                {/* <=== OPEN button ====> */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Button
                  size="medium"
                    variant="contained"
                    onClick={handleLogin}
                    sx={{
                      bgcolor: Colors.nbu,
                      "&:hover": {
                        bgcolor: Colors.nbu, // Set hover background color to be the same as default
                      },
                    }}
                  >
                    <Typography sx={{ color: Colors.white, fontWeight: "700" }}>
                      {t("access")}
                    </Typography>
                  </Button>
                </motion.div>
                {/* <=== Backdrop ===> */}
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={backdrop}
                  onClick={handleCloseBackdrop}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>

                {/* <=== Register section ===> */}
                <Button variant="text" color="secondary" size="medium">
                  <Typography
                    sx={{
                      fontWeight: "800",
                      fontSize: "16px",
                      lineHeight: "1",
                      color: Colors.green_dark,
                      textTransform:"uppercase",
                    }}
                  >
                    {t("register")}
                  </Typography>
                </Button>
              </Box>
              {/* <=== Forget Password ===> */}
              <Button variant="text" color="secondary">
                <Typography
                  sx={{
                    fontWeight: "800",
                    fontSize: "16px",
                    lineHeight: "1",
                    color: Colors.red,
                    textTransform:"uppercase",
                  }}
                  onClick={handleOpenModal}
                >
                  {t("forgetpassword")}
                </Typography>
              </Button>
            </Box>
            <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" className="nav-bottom-errlogin-section">

      {/* Left section (can be customized with MUI styles if needed) */}
      <Box className="left-bottom" />

      {/* Center section */}
      <Box className="center-bottom" textAlign="center">
        <Box className="error-section">
          {passwordError && (
            <Typography variant="body2" sx={{ fontSize:"16px",color:"red",fontWeight:"bold"}}>
              {passwordError}
            </Typography>
          )}
          {loginError && (
            <Typography variant="body2" color="error" sx={{fontSize:"16px",color:"red",fontWeight:"bold"}}>
              {loginError}
            </Typography>
          )}
          {usernameError && (
            <Typography variant="body2"  sx={{ fontSize:"16px",color:"red",fontWeight:"bold"}}>
              {usernameError}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Right section (can be customized with MUI styles if needed) */}
      <Box className="right-bottom" />

            </Box>
            </Box>
          </Box>
          {/*  */}
          <Modal
          open={openmodal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <motion.div
            className="modal__backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, transition: { delay: 0.3 } }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: { xs: "270px", sm: "450px", md: "500px", lg: "600px" },
                height: { xs: "240px", sm: "400px", md: "400px", lg: "540px" },
                bgcolor: Colors.gray_back,
                border: "1px solid gray",
                borderRadius: "10px",
                boxShadow: 24,
                pt: 2,
                px: 4,
                pb: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{
                    textTransform: "uppercase",
                    fontWeight: "800",
                    color: Colors.nbu,
                    fontSize: { xs: "14px", md: "24px" },
                  }}
                >
                  {t("maintextforgetpassword")}
                </Typography>
                <motion.div
                  onClick={handleCloseModal}
                  whileHover={{ scale: 1.3 }}
                >
                  <CancelRoundedIcon
                    sx={{
                      fontSize: { xs: "32px", md: "40px" },
                      color: Colors.red,
                      cursor: "pointer",
                    }}
                  />
                </motion.div>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  // padding: "5px",
                  textAlign: "center",
                  margin: "auto",
                  justifyContent: "center",
                  objectFit: "fill",
                  paddingBlock: "5px",
                  borderRadius: "10px",
                }}
              >
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: "Wristwatch by Ted Baker London",
                      isFluidWidth: true,
                      src: ModalImage,
                      className: "smallImage",
                    },
                    largeImage: {
                      src: ModalImage,
                      width: 1000,
                      height: 800,
                      className: "largeImage",
                    },
                    lensStyle: {
                      backgroundColor: "rgba(255, 255, 255, 0.3)", // Semi-transparent background
                      border: "2px solid #000", // Border styling
                      borderRadius: "50%", // Make the lens circular
                      width: "180px", // Width of the lens
                      height: "180px", // Height of the lens
                    },
                    enlargedImageContainerDimensions: {
                      width: "200%",
                      height: "200%",
                    },
                    enlargedImagePosition: "over", // Display the magnified image over the original image
                  }}
                />
              </Box>
            </Box>
          </motion.div>
        </Modal>
        </Box>
  )
}

export default NewLoginScreen