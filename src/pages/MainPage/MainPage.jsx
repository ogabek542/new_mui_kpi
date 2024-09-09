import * as React   from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Container, Box, Typography, Button, Grid,  } from "@mui/material";
import { Colors } from "../../styles/theme";
import { motion } from "framer-motion";
// input elements //
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { REQUESTS } from "../../api/requests.js";
// backdrop //
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
// modal //
import Modal from "@mui/material/Modal";
// icon //
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
// MODAL FOTO //
import ModalImage from "../../assets/photo/NewQualityNbuModalFoto.jpg";
import LeftSideSVG from "../../assets/svg/Left_SVG.svg";
// IMAGE MAGNIFIER //
import ReactImageMagnify from "react-image-magnify";
import { useState} from 'react';
import {useReduxDispatch } from "../../hooks/useReduxHook.js"
import { useNavigate } from "react-router-dom";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../../store/slice/userSlice.js"
import { useParams } from "react-router-dom"
import Alert from '@mui/material/Alert';
import MovingIcon from "@mui/icons-material/Moving";
// <=== Import Charts ====> //
import PieChartMainChart from "../../components/PieChartMainSection/PieChartMainChart.jsx";

// modal styles //

// recharts elements //
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Tooltip,
  LabelList,
} from "recharts";

// IMPORT CARDS //
import HorizontalBarChart from "../../components/HorizontalBarchart/HorizontalBarchart.jsx";
import AreaChart from "../../components/AreaChart/AreaChart.jsx"
import SteppedLineChart from "../../components/SteppedLineChart/SteppedLineChart.jsx";
import DoughnutChart from "../../components/Doughnut/Doughnut.jsx";
import PieChart from "../../components/PieChart/PieChart.jsx";
import VerticalBarChart from "../../components/VerticalBarChart/VerticalBarChart.jsx";
import SynchronizedLineCharts from "../../components/SynchronizedLineCharts/SynchronizedLineCharts.jsx";
import RadialBarChartComponent from "../../components/RadialBarChart/RadialBarChart.jsx";
import RadarChart from "../../components/RadarChart/RadarChart.jsx";
import SparklineApp from "../../components/Sparkline/Sparkline.jsx";
// 12 Screen Components //
import LiabilitiesChart from "../../components/TwelfScreenComponents/ThirdScreenComponent/LiabilitiesChart.jsx";
import LoanPortfolioChart from "../../components/TwelfScreenComponents/FouthScreenComponent/LoanPortfolioChart .jsx";
import NetProfitChart from "../../components/TwelfScreenComponents/FifthScreenComponent/NetProfitChart.jsx";
import DigitalIndicatorsChart from "../../components/TwelfScreenComponents/SixthScreenComponent/DigitalIndicatorsChart.jsx";
import CurrencyIndicatorsChart from "../../components/TwelfScreenComponents/SeventhScreenComponent/CurrencyIndicatorsChart.jsx";
import CapitalChart from "../../components/TwelfScreenComponents/EightScreenComponent/CapitalChart.jsx";
import RevenuesExpensesChart from "../../components/TwelfScreenComponents/NinthScreenComponent/RevenuesExpensesChart.jsx";
import RisksComplianceChart from "../../components/TwelfScreenComponents/TenthScreenComponent/RisksComplianceChart.jsx";
import FinancialStabilityChart from "../../components/TwelfScreenComponents/EleventhScreenComponent/FinancialStabilityChart.jsx";
import StrategicPlansChart from "../../components/TwelfScreenComponents/TwelfScreen/StrategicPlansChart.jsx";




// LANGUAGE SECTION //
import i18n from "i18next";

import { useTranslation } from "react-i18next";






const MainPage = () => {

  // change language function //
  const changeLang = (value) => {
    i18n.changeLanguage(value)
  }
  const {t} = useTranslation()


  const [showPassword, setShowPassword] = React.useState(false);
  const [backdrop, setBackdrop] = React.useState(false);
  const [openmodal, setOpenModal] = React.useState(false);
  const [loginError, setLoginError] = React.useState("");
  const [openauthmodal,setOpenAuthModal] = React.useState(false);
  // PASSWORD SHOW HIDE FUNCTION //
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // BACKDROP FUNCTION //
  const handleCloseBackdrop = () => setBackdrop(false);

  // AUTH  MODAL FUNCTION //
  const handleOpenAuthModal = () =>  setOpenAuthModal(true);
  
  const handleCloseAuthModal = () => setOpenAuthModal(false);
    
  

  // modal function //
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };

    // <----- BAR CHART DATA -----> //
    const barchartdata = [
      {
        // name: "PageA",
        plan: 4000,
        fact: 2400,
        amt: 2400,
        percentage:"120"
      },
      {
        // name: "PageB",
        plan: 6000,
        fact: 1398,
        amt: 2210,
      },
      {
        // name: "PageC",
        plan: 2000,
        fact: 1000,
        amt: 2290,
      },
    ];
    
      // <=== BArchart styles ====> //
      // Styled components


    const renderShape = ({ x, y, width, height }) => {
      const translateX = width * (-0.25); // 10% of the width
      const borderRadius = 5; // Radius for the top corners
      return (
        <>
          <rect
            className="shape_render"
            x={x}
            y={y}
            width={`10%`}
            height={height}
            fill={Colors.blue_middle}
            ry={borderRadius} // Apply radius to top-left and top-right corners
            transform={`translate(${translateX}, 0)`}
            
          />
        </>
      )
    };
    const renderBlueShape = ({ x, y, width, height }) => {
      const translateX = width * (0.4); // 10% of the width
      return (
        <>
          <rect
            className="shape_blue"
            x={x}
            y={y}
            width={`10%`}
            height={height}
            fill={Colors.gray_back}
            ry={5}
            transform={`translate(${translateX}, 0)`}
          />
        </>

      )
    };
    const renderCustomizedLabel = (props) => {
      const { x, y, width, value } = props;
      const rectWidth = 65;
      const rectHeight = 20;
      const rectX = x + width / 2 - rectWidth / 2 + 22;
      const rectY = y - rectHeight - 5; // Adjust y position as needed
      const loginValue = value >= 100 ? true : false;
      return (
        <g className="custom-label" >
          <rect
            x={rectX}
            y={rectY}
            width={rectWidth}
            height={rectHeight}
            fill={Colors.transparent}
          />
          <foreignObject
            x={rectX}
            y={rectY}
            width={rectWidth}
            height={rectHeight}
          >
          <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
              <Box
                sx={{
                  color: loginValue ? Colors.blue_middle : Colors.red,
                  fontSize: '14px', // Adjust the size as needed
                }}
              >
                <FontAwesomeIcon icon={faCircleCheck} />
              </Box>
            <Typography
              component="span"
              sx={{
                color: loginValue ? Colors.blue_middle : Colors.red,
                fontWeight: '500', // Adjust font weight as needed
                fontSize: '16px', // Adjust font size as needed
              }}
            >
              {value}%
            </Typography>
          </Box>
          </foreignObject>
        </g>
      );
    };


// <---- LOGIN CONSTANTS -----> //
const dispatch = useReduxDispatch();
const [isAuth, setIsAuth] = useState(false);
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();
const params = useParams();
const [usernameError, setUsernameError] = useState("");
const [passwordError, setPasswordError] = useState("");



const handleLogin = async () => {
  // console.log("clicked ", username, password);
  localStorage.clear();

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
    navigate("/accessall");

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



  return (
    <Container
    maxWidth={false} // This allows the container to expand beyond the default breakpoints
    disableGutters
    sx={{
      px: "10px",
      bgcolor: Colors.gray_back,
      width: '100%', // Ensure the container takes up 100% of the viewport width
      maxWidth: '100vw', // Ensure the container doesn't exceed the viewport width
      '@media (min-width: 1920px)': {
        maxWidth: '100%', // For extra-large screens, allow full width
      },
    }}
  >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "center",
          height: "100%", // Make sure the Box takes the full viewport height
        }}
      >
        <Header changeLang={changeLang}/>
        {/* <=== MAIN SECTION ===> */}
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
          {/* <==== BARCHART CARDS SECTION ====> */}
            <Grid
              container
              sx={{ margin: "auto" ,}}
              direction="row"
              width={"100%"}
            >

            {/* first div */}
              <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={4}
              sx={{
                height: { xs: "400px", md: "500px" },
                width: "auto",
                padding: "5px",
              }}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: "5px",
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                gap: "30px",
                bgcolor: Colors.gray_footer,
                position: "relative",
                "&:hover .hover-button": {
                  opacity: 1, // Show button when hovering over the box
                },
              }}
            >
              <Typography
                sx={{
                  textAlign: "start",
                  fontWeight: "800",
                  fontSize: { xs: "12px", md: "16px" },
                }}
              >
                {t("secontText")}
              </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      height: "90%",
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "10px",
                        }}
                      >
                        <Typography
                          sx={{
                            color: Colors.gray_text,
                            fontSize: { xs: "22px", sm: "30px", md: "32px" },
                            fontWeight: "400",
                            textTransform: "uppercase",
                          }}
                        >
                          ROA
                        </Typography>
                        <Typography
                          sx={{
                            color: Colors.blue_middle,
                            fontSize: { xs: "22px", sm: "34px", md: "36px" },
                            fontWeight: "900",
                          }}
                        >
                          21%
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "10px",
                        }}
                      >
                        <Typography
                          sx={{
                            color: Colors.gray_text,
                            fontSize: { xs: "22px", sm: "30px", md: "32px" },
                            fontWeight: "400",
                            textTransform: "uppercase",
                          }}
                        >
                          ROE
                        </Typography>
                        <Typography
                          sx={{
                            color: Colors.blue_middle,
                            fontSize: { xs: "22px", sm: "34px", md: "36px" },
                            fontWeight: "900",
                          }}
                        >
                          21%
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "10px",
                        }}
                      >
                        <Typography
                          sx={{
                            color: Colors.gray_text,
                            fontSize: { xs: "22px", sm: "30px", md: "32px" },
                            fontWeight: "400",
                          }}
                        >
                          CIR
                        </Typography>
                        <Typography
                          sx={{
                            color: Colors.blue_middle,
                            fontSize: { xs: "22px", sm: "34px", md: "36px" },
                            fontWeight: "900",
                          }}
                        >
                          21%
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                {/* Button at the bottom-right */}
                <Box
                  className="hover-button"
                  sx={{
                    textAlign: "end",
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                    opacity: 0, // Initially hidden
                    transition: "opacity 300ms ease", // Smooth transition for hover
                  }}
                >
                  <Button
                    variant="contained"
                    size="medium"
                    onClick={handleOpenAuthModal}
                  >
                    <Typography
                      sx={{
                        color: Colors.white,
                        fontWeight: "800",
                        textTransform: "uppercase",
                      }}
                    >
                      {t("infobutton")}
                    </Typography>
                  </Button>
                </Box>
              </Box>
            </Grid>
            {/* second div */}
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={4}
              sx={{
                height: "500px",
                width:"auto",
                padding:"5px",
              }}
            >
              <Box sx={{width:"100%",height:"100%",borderRadius:"5px",padding:"10px",display:"flex",flexDirection:"column",gap:"10px",bgcolor:Colors.gray_footer,  position: "relative",
                "&:hover .hover-button": {
                  opacity: 1, // Show button when hovering over the box
                },}}>
                <Typography sx={{textAlign:"start",fontWeight:"bold",fontSize:{xs:"12px",md:"16px"},}}>{t("thirdText")}</Typography>
                <Box sx={{display:"flex",flexDirection:"column",height:"90%",width:"100%",gap:"10px"}} >
                  <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",height:"28%"}}>
                    {/* top side of div */}
                      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",}}>
                        <Typography variant="h2" sx={{fontWeight:"bold",textAlign:"left"}}>97421</Typography>
                        <Typography sx={{color:Colors.gray,width:"50px",lineHeight:"1"}}>
                        млрд.
                        сўм.экв
                        </Typography>
                      </Box>
                      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                          {/* Icon on the right side */}
                                <Box>
                                <MovingIcon
                                          sx={{
                                            fontSize: "32px",
                                            padding: "0px",
                                            transition: "transform 0.3s ease",
                                            color:Colors.green_area,
                                            lineHeight:"1",
                                          }}
                                        />
                                  <Box sx={{display:"flex",alignItems:"center",justifyContent:"center"}}> 
                                    <Typography variant="h4" sx={{color:Colors.green_area,fontWeight:"800"}}>
                                        72
                                    </Typography>
                                    <Typography variant="h6" sx={{color:Colors.green_area}}>
                                        %
                                    </Typography>
                                  </Box>
                                </Box>
                      </Box> 
                  </Box>
                  <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",height:"70%"}}>
                    {/* pie chart section  */}
                    <Box sx={{ display:"flex",alignItems:"center" ,width:"60%",height:"100%"}} >
                        <PieChartMainChart/>  
                    </Box>
                    {/* right side Texts */}
                    <Box sx={{}}>
                      <Typography sx={{fontSize:"12px",color:Colors.gray,fontStyle: "italic",textAlign:"left" }}>шу жумладан:</Typography>
                        {/* top side light blue */}
                      <Box sx={{display:"flex",flexDirection:"column"}}>
                          <Box>
                            <Typography sx={{fontSize:"12px",color:Colors.dark,fontWeight:"bold",textAlign:"left",lineHeight:"1"}}>ХОРИЖИЙ ВАЛЮТАДА</Typography>
                            <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:"10px"}}>
                              <Typography sx={{color:Colors.blue_light_table,fontSize:"40px",fontWeight:"bold",width:"auto",lineHeight:"1.1",}}>98256</Typography>
                              <Typography sx={{color:Colors.gray,fontSize:"12px",width:"50px", wordWrap: "break-word",textAlign: "start",lineHeight:"1",}}>млрд <br/> сўм.экв</Typography>
                            </Box>
                          </Box>
                      </Box>
                      {/* bottom side dark_blue national  */}
                      <Box sx={{display:"flex",flexDirection:"column"}}>
                          <Box>
                            <Typography sx={{fontSize:"12px",color:Colors.dark,fontWeight:"bold",textAlign:"left",lineHeight:"1"}}>МИЛЛИЙ ВАЛЮТАДА</Typography>
                            <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:"10px"}}>
                              <Typography sx={{color:Colors.blue_nbu,fontSize:"40px",fontWeight:"bold",width:"auto",lineHeight:"1.1",}}>98256</Typography>
                              <Typography sx={{color:Colors.gray,fontSize:"12px",width:"50px", wordWrap: "break-word",textAlign: "start",lineHeight:"1",}}>млрд <br/> сўм.экв</Typography>
                            </Box>
                          </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                {/* button styles */}
                <Box   className="hover-button"
                  sx={{
                    textAlign: "end",
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                    opacity: 0, // Initially hidden
                    transition: "opacity 300ms ease", // Smooth transition for hover
                  }}>
                  <Button variant="contained" size={"medium"} onClick={handleOpenAuthModal}>
                  <Typography sx={{color:Colors.white,fontWeight:"800",textTransform:"uppercase"}} >{t("infobutton")}</Typography>
                  </Button>
                </Box>
              </Box>
            </Grid>
            {/* third div */}
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={4}
              sx={{
                height: {xs:"400px",md:"500px"},
                width:"auto",
                padding:"5px",
                position: "relative",
                "&:hover .hover-button": {
                  opacity: 1, // Show button when hovering over the box
                },
              }}
            >
              <Box sx={{width:"100%",height:"100%",borderRadius:"5px",padding:"10px",display:"flex",flexDirection:"column",gap:"20px",bgcolor:Colors.gray_footer,}}>
                <Typography sx={{textAlign:"start",fontWeight:"800",fontSize:{xs:"12px",md:"16px"},}}> {t("eighthText")} </Typography>
                <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",height:"77%",bgcolor:"transparent"}} >
                  {/* <HorizontalBarChart /> */}
                  <LiabilitiesChart/>
                </Box>
                <Box   className="hover-button"
                  sx={{
                    textAlign: "end",
                    position: "absolute",
                    bottom: "15px",
                    right: "15px",
                    opacity: 0, // Initially hidden
                    transition: "opacity 300ms ease", // Smooth transition for hover
                  }}>
                  <Button variant="contained" size={"medium"} onClick={handleOpenAuthModal}>
                  <Typography sx={{color:Colors.white,fontWeight:"800",textTransform:"uppercase"}} >{t("infobutton")}</Typography>
                  </Button>
                </Box>
              </Box>
            </Grid>
            {/* fourth div */}
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={4}
              sx={{
                height: {xs:"400px",md:"500px"},
                width:"auto",
                padding:"5px",
                position: "relative",
                "&:hover .hover-button": {
                  opacity: 1, // Show button when hovering over the box
                },
              }}
            >
              <Box sx={{width:"100%",height:"100%",borderRadius:"5px",padding:"10px",display:"flex",flexDirection:"column",gap:"20px",bgcolor:Colors.gray_footer,}}>
                <Typography sx={{textAlign:"start",fontWeight:"800",fontSize:{xs:"12px",md:"16px"},}}>  {t("firstText")}</Typography>
                <Box sx={{display:"flex",height:"77%"}} >
                    {/* <AreaChart/> */}
                    <LoanPortfolioChart/>
                </Box>
                <Box   className="hover-button"
                  sx={{
                    textAlign: "end",
                    position: "absolute",
                    bottom: "15px",
                    right: "15px",
                    opacity: 0, // Initially hidden
                    transition: "opacity 300ms ease", // Smooth transition for hover
                  }}>
                  <Button variant="contained" size={"medium"} onClick={handleOpenAuthModal}>
                  <Typography sx={{color:Colors.white,fontWeight:"800",textTransform:"uppercase"}} >{t("infobutton")}</Typography>
                  </Button>
                </Box>
              </Box>
            </Grid>
            {/* fifth div*/}
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={4}
              sx={{
                height: {xs:"400px",md:"500px"},
                width:"auto",
                padding:"5px",
                position:"relative",
                "&:hover .hovers-button": {
                  opacity: 1, // Show button when hovering over the box
                },
              }}
            >
                <Box sx={{width:"100%",height:"100%",borderRadius:"5px",padding:"10px",display:"flex",flexDirection:"column",gap:"20px",bgcolor:Colors.gray_footer,}}>
                <Typography sx={{textAlign:"start",fontWeight:"800",fontSize:{xs:"12px",md:"16px"},}}>{t("ninthText")}</Typography>
                <Box sx={{display:"flex",height:"77%"}} >
                  <NetProfitChart/>
                </Box>
                <Box    className="hovers-button"
                  sx={{
                    textAlign: "end",
                    position: "absolute",
                    bottom: "15px",
                    right: "15px",
                    opacity: 0, // Initially hidden
                    transition: "opacity 300ms ease", // Smooth transition for hover
                  }}>
                  <Button variant="contained" size={"medium"} onClick={handleOpenAuthModal}>
                  <Typography sx={{color:Colors.white,fontWeight:"800",textTransform:"uppercase"}} >{t("infobutton")}</Typography>
                  </Button>
                </Box>
              </Box>
            </Grid>
            {/* sixth div */}
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={4}
              sx={{
                height: {xs:"400px",md:"500px"},
                width:"auto",
                padding:"5px",
                position: "relative",
                "&:hover .hover-button": {
                  opacity: 1, // Show button when hovering over the box
                },

              }}
            >
              <Box sx={{width:"100%",height:"100%",borderRadius:"5px",padding:"10px",display:"flex",flexDirection:"column",gap:"20px",bgcolor:Colors.gray_footer,position:"relative"}}>
                <Typography sx={{textAlign:"start",fontWeight:"800",fontSize:{xs:"12px",md:"16px"},}}>{t("thirteenth")}</Typography>
                <Box sx={{display:"flex",height:"77%"}} >
                  <DigitalIndicatorsChart/>
                </Box>
                <Box   className="hover-button"
                  sx={{
                    textAlign: "end",
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                    opacity: 0, // Initially hidden
                    transition: "opacity 300ms ease", // Smooth transition for hover
                  }}>
                  <Button variant="contained" size={"medium"} onClick={handleOpenAuthModal}>
                  <Typography sx={{color:Colors.white,fontWeight:"800",textTransform:"uppercase"}} >{t("infobutton")}</Typography>
                  </Button>
                </Box>
              </Box>
            </Grid>
          
          </Grid>
        </Box>
        <Footer />
        {/* <=== PASSWORD MODAL ====> */}
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
        {/* <=== AUTHORISATION MODAL ===>*/}
        <Modal
            open={openauthmodal}
            onClose={handleCloseAuthModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
          <Box sx={{position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: "auto",
              bgcolor: "orange",
              border: '1px solid gray',
              boxShadow: 24,
              borderRadius:"5px",
              }}>
              <Alert variant="filled" severity="warning">
                {t("maintextmodal")}
              </Alert>
          </Box>
        </Modal>
      </Box>
    </Container>
  );
};

export default MainPage;