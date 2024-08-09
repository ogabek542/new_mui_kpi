import * as React   from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Container, Box, Typography, Button, Grid, Fade  } from "@mui/material";
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

const MainPage = () => {
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
  const handleOpenBackdrop = () => setBackdrop(true);
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
    <Container fixed maxWidth="xl" disableGutters sx={{ px: "10px",bgcolor:Colors.gray_back }}>
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
        <Header />
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
          <Box
            sx={{
              bgcolor: Colors.blue_login,
              width: "100%",
              height: "auto",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: "10px",
              my: "5px",
              marginBottom: "10px",
              py: { xs: "5px", sm: "5px", md: "0px" },
              lineHeight: "1",
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
                }}
              >
                KPI БУРЧАГИ
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
                label="ЛОГИН"
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
      <InputLabel htmlFor="outlined-adornment-password">ПАРОЛ</InputLabel>
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
                    КИРИШ
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
                  }}
                >
                  РЎЙҲАТДАН ЎТИШ
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
                }}
                onClick={handleOpenModal}
              >
                ПАРОЛНИ УНУТДИНГИЗМИ?
              </Typography>
            </Button>
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
                height: {xs:"400px",md:"500px"},
                width:"auto",
                padding:"5px",
              }}
            >
              <Box sx={{width:"100%",height:"100%",borderRadius:"5px",padding:"10px",display:"flex",flexDirection:"column",gap:"30px",bgcolor:Colors.gray_footer,}}>
                <Typography sx={{textAlign:"start",fontWeight:"800",fontSize:{xs:"12px",md:"16px"},}}>БАНК РЕНТАБЕЛЛИГИ КЎРСАТКИЧЛАРИ</Typography>
                <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",height:"73%"}} >
                    <Box sx={{display:"flex",flexDirection:"column",gap:"10px",}}>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"10px"}}>
                          <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400",textTransform:"uppercase"}}>ROA</Typography>
                          <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                        </Box>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"10px"}}>
                          <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400",textTransform:"uppercase"}}>ROE</Typography>
                          <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                        </Box>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"10px"}}>
                          <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400",}}>CIR</Typography>
                          <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                        </Box>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"10px"}}>
                          <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400"}}>COR</Typography>
                          <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                        </Box>
                    </Box>
                    <Box sx={{display:"flex",flexDirection:"column",gap:"10px"}}>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"10px"}}>
                          <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400",textTransform:"uppercase"}}>NPL</Typography>
                          <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                        </Box>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"10px"}}>
                        <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400",textTransform:"uppercase"}}>NPS</Typography>
                        <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                      </Box>
                      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"10px"}}>
                          <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400",textTransform:"uppercase"}}>MAU</Typography>
                          <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                        </Box>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"10px"}}>
                        <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400"}}>NIM</Typography>
                        <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                      </Box>
                    </Box>
                </Box>
                <Box sx={{textAlign:"end"}}>
                  <Button variant="contained" size={"medium"} onClick={handleOpenAuthModal}>
                      <Typography sx={{color:Colors.white,fontWeight:"800"}} >ТЎЛИҚ МАЪЛУМОТ</Typography>
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
              <Box sx={{width:"100%",height:"100%",borderRadius:"5px",padding:"10px",display:"flex",flexDirection:"column",gap:"10px",bgcolor:Colors.gray_footer,}}>
                <Typography sx={{textAlign:"start",fontWeight:"800",fontSize:{xs:"12px",md:"16px"},}}>БАНК АКТИВЛАРИ</Typography>
                <Box sx={{display:"flex",flexDirection:"column",height:"81%"}} >
                  {/* three text container Box */}
                  <Box sx={{width:"100%",height:"auto",display:"flex",alignItems:"center",justifyContent:"space-around",}}>
                    <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",}}>
                      <Typography sx={{lineHeight:"1.2",fontSize:{xs:"8px",md:"10px"},fontWeight:"600"}}>ЖАМИ</Typography>
                      <Typography component="span" sx={{lineHeight:"1.2",color:Colors.gray_text,fontSize:{xs:"8px",md:"10px"},fontWeight:"500",fontStyle:"italic"}}>млрд.сўм.экв</Typography>
                    </Box>
                    <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",width:"50px"}}>
                      <Typography sx={{lineHeight:"1.2",fontSize:{xs:"8px",md:"10px"},fontWeight:"600"}}>ХОРИЖИЙ ВАЛЮТАДА</Typography>
                      <Typography component="span" sx={{lineHeight:"1.2",color:Colors.gray_text,fontSize:{xs:"8px",md:"10px"},fontWeight:"500",fontStyle:"italic"}}>минг.долл</Typography>
                    </Box>
                    <Box sx={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                      <Typography sx={{lineHeight:"1.2",fontSize:{xs:"8px",md:"10px"},fontWeight:"600"}}>МИЛЛИЙ ВАЛЮТАДА</Typography>
                      <Typography component="span" sx={{lineHeight:"1.2",color:Colors.gray_text,fontSize:{xs:"8px",md:"10px"},fontWeight:"500",fontStyle:"italic"}}>млрд.сўм.экв</Typography>
                    </Box>
                  </Box>
                  {/* plan fakt top text  */}
                  <Box sx={{height:"auto",width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                      <Box></Box>
                    <Box sx={{display:"flex",flexDirection:"column",gap:"5px"}}>
                      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",gap:"5px"}}> 
                        <Box sx={{width:"10px",height:"10px",borderRadius:"50%",bgcolor:Colors.gray_text}}></Box>
                        <Typography sx={{color:Colors.gray_text,lineHeight:"1",fontWeight:"500",fontSize:"14px"}}>План</Typography>
                      </Box>
                      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",gap:"5px"}}> 
                        <Box sx={{width:"10px",height:"10px",borderRadius:"50%",bgcolor:Colors.blue_middle}}></Box>
                        <Typography sx={{color:Colors.blue_middle,lineHeight:"1",fontWeight:"500",fontSize:"14px"}}>Факт</Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{height:"350px",width:"100%",position:"relative"}}>
                  <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        width={500}
                        height={400}
                        data={barchartdata}
                        margin={{
                          top: 25,
                        }}
                        padding={{
                          top: 45,
                        }}
                      >
                        <Tooltip />
                        <Bar
                          dataKey="plan"
                          fill={Colors.gray_text}
                          minPointSize={5}
                          shape={renderBlueShape}
                        >
                          <LabelList
                            dataKey="percentage"
                            content={renderCustomizedLabel}
                          />
                        </Bar>
                        <Bar
                          dataKey="fact"
                          fill={Colors.blue_middle}
                          minPointSize={10}
                          shape={renderShape}
                        />
                      </BarChart>
                  </ResponsiveContainer>
                  <Box  sx={{ marginTop:"-35px",position:"absolute",display:"flex",alignItems:"center",justifyContent:"space-around",width:"100%" }}>
                    <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"10px"}}>
                      <Typography sx={{border:"1px solid",borderColor:Colors.gray_text,padding:"4px",lineHeight:1 ,borderRadius:"5px",bgcolor:Colors.white,color:Colors.gray_text,fontSize:{xs:"10px",md:"16px"}}}>4000</Typography>
                      <Typography sx={{border:"1px solid",borderColor:Colors.blue_middle,padding:"4px",lineHeight:1 ,borderRadius:"5px",bgcolor:Colors.white,color:Colors.blue_middle,fontSize:{xs:"10px",md:"16px"}}}>2000</Typography>
                    </Box>
                    <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"10px"}}>
                      <Typography sx={{border:"1px solid",borderColor:Colors.gray_text,padding:"4px",lineHeight:1 ,borderRadius:"5px",bgcolor:Colors.white,color:Colors.gray_text,fontSize:{xs:"10px",md:"16px"}}}>4000</Typography>
                      <Typography sx={{border:"1px solid",borderColor:Colors.blue_middle,padding:"4px",lineHeight:1 ,borderRadius:"5px",bgcolor:Colors.white,color:Colors.blue_middle,fontSize:{xs:"10px",md:"16px"}}}>2000</Typography>
                    </Box>
                    <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"10px"}}>
                      <Typography sx={{border:"1px solid",borderColor:Colors.gray_text,padding:"4px",lineHeight:1 ,borderRadius:"5px",bgcolor:Colors.white,color:Colors.gray_text,fontSize:{xs:"10px",md:"16px"}}}>4000</Typography>
                      <Typography sx={{border:"1px solid",borderColor:Colors.blue_middle,padding:"4px",lineHeight:1 ,borderRadius:"5px",bgcolor:Colors.white,color:Colors.blue_middle,fontSize:{xs:"10px",md:"16px"}}}>2000</Typography>
                    </Box>
                  </Box>
                    <Box sx={{position:"absolute",bottom:"30%",left:"26%"}}>
                      <Box
                          component="img"
                          src={LeftSideSVG}
                          sx={{ width: {xs:"35px",md:"45px"}, cursor: "pointer" }}
                        />
                    </Box>
                  </Box>
                </Box>
                <Box sx={{textAlign:"end"}}>
                  <Button variant="contained" size={"medium"} onClick={handleOpenAuthModal}>
                      <Typography sx={{color:Colors.white,fontWeight:"800"}} >ТЎЛИҚ МАЪЛУМОТ</Typography>
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
                padding:"5px"
              }}
            >
              <Box sx={{width:"100%",height:"100%",borderRadius:"5px",padding:"10px",display:"flex",flexDirection:"column",gap:"20px",bgcolor:Colors.gray_footer,}}>
                <Typography sx={{textAlign:"start",fontWeight:"800",fontSize:{xs:"12px",md:"16px"},}}>БАНК РЕНТАБЕЛЛИГИ КЎРСАТКИЧЛАРИ</Typography>
                <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",height:"77%",bgcolor:"transparent"}} >
                  <HorizontalBarChart />
                </Box>
                <Box sx={{textAlign:"end"}}>
                  <Button variant="contained" size={"medium"} onClick={handleOpenAuthModal}>
                      <Typography sx={{color:Colors.white,fontWeight:"800"}} >ТЎЛИҚ МАЪЛУМОТ</Typography>
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
                padding:"5px"
              }}
            >
              <Box sx={{width:"100%",height:"100%",borderRadius:"5px",padding:"10px",display:"flex",flexDirection:"column",gap:"20px",bgcolor:Colors.gray_footer,}}>
                <Typography sx={{textAlign:"start",fontWeight:"800",fontSize:{xs:"12px",md:"16px"},}}>БАНК РЕНТАБЕЛЛИГИ КЎРСАТКИЧЛАРИ</Typography>
                <Box sx={{display:"flex",height:"77%"}} >
                    <AreaChart/>
                </Box>
                <Box sx={{textAlign:"end"}}>
                  <Button variant="contained" size={"medium"} onClick={handleOpenAuthModal}>
                      <Typography sx={{color:Colors.white,fontWeight:"800"}} >ТЎЛИҚ МАЪЛУМОТ</Typography>
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
                padding:"5px"
              }}
            >
                <Box sx={{width:"100%",height:"100%",borderRadius:"5px",padding:"10px",display:"flex",flexDirection:"column",gap:"20px",bgcolor:Colors.gray_footer,}}>
                <Typography sx={{textAlign:"start",fontWeight:"800",fontSize:{xs:"12px",md:"16px"},}}>БАНК РЕНТАБЕЛЛИГИ КЎРСАТКИЧЛАРИ</Typography>
                <Box sx={{display:"flex",height:"77%"}} >
                  <SteppedLineChart/>
                </Box>
                <Box sx={{textAlign:"end"}}>
                  <Button variant="contained" size={"medium"} onClick={handleOpenAuthModal}>
                      <Typography sx={{color:Colors.white,fontWeight:"800"}} >ТЎЛИҚ МАЪЛУМОТ</Typography>
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
              }}
            >
              <Box sx={{width:"100%",height:"100%",borderRadius:"5px",padding:"10px",display:"flex",flexDirection:"column",gap:"20px",bgcolor:Colors.gray_footer,}}>
                <Typography sx={{textAlign:"start",fontWeight:"800",fontSize:{xs:"12px",md:"16px"},}}>БАНК РЕНТАБЕЛЛИГИ КЎРСАТКИЧЛАРИ</Typography>
                <Box sx={{display:"flex",height:"77%"}} >
                  <DoughnutChart/>
                </Box>
                <Box sx={{textAlign:"end"}}>
                  <Button variant="contained" size={"medium"} onClick={handleOpenAuthModal}>
                      <Typography sx={{color:Colors.white,fontWeight:"800"}} >ТЎЛИҚ МАЪЛУМОТ</Typography>
                  </Button>
                </Box>
              </Box>
            </Grid>
            {/* seventh div */}
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
              }}
            >
                <Box sx={{width:"100%",height:"100%",borderRadius:"5px",padding:"10px",display:"flex",flexDirection:"column",gap:"20px",bgcolor:Colors.gray_footer,}}>
                <Typography sx={{textAlign:"start",fontWeight:"800",fontSize:{xs:"12px",md:"16px"},}}>БАНК РЕНТАБЕЛЛИГИ КЎРСАТКИЧЛАРИ</Typography>
                <Box sx={{display:"flex",height:"77%"}} >
                  <PieChart/>
                </Box>
                <Box sx={{textAlign:"end"}}>
                  <Button variant="contained" size={"medium"} onClick={handleOpenAuthModal}>
                      <Typography sx={{color:Colors.white,fontWeight:"800"}} >ТЎЛИҚ МАЪЛУМОТ</Typography>
                  </Button>
                </Box>
              </Box>
            </Grid>
            {/* eight div */}
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={4}
              sx={{
                height: {xs:"400px",md:"500px"},
                width:"auto",
                padding:"5px"
              }}
            >
            <Box sx={{width:"100%",height:"100%",borderRadius:"5px",padding:"10px",display:"flex",flexDirection:"column",gap:"20px",bgcolor:Colors.gray_footer,}}>
                <Typography sx={{textAlign:"start",fontWeight:"800",fontSize:{xs:"12px",md:"16px"},}}>БАНК РЕНТАБЕЛЛИГИ КЎРСАТКИЧЛАРИ</Typography>
                <Box sx={{display:"flex",height:"77%"}} >
                  <VerticalBarChart/>
                </Box>
                <Box sx={{textAlign:"end"}}>
                  <Button variant="contained" size={"medium"} onClick={handleOpenAuthModal}>
                      <Typography sx={{color:Colors.white,fontWeight:"800"}} >ТЎЛИҚ МАЪЛУМОТ</Typography>
                  </Button>
                </Box>
              </Box>
            </Grid>
            {/* nineth div */}
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={4}
              sx={{
                height: {xs:"400px",md:"500px"},
                width:"auto",
                padding:"5px"
              }}
            >
                <Box sx={{width:"100%",height:"100%",borderRadius:"5px",padding:"10px",display:"flex",flexDirection:"column",gap:"20px",bgcolor:Colors.gray_footer,}}>
                <Typography sx={{textAlign:"start",fontWeight:"800",fontSize:{xs:"12px",md:"16px"},}}>БАНК РЕНТАБЕЛЛИГИ КЎРСАТКИЧЛАРИ</Typography>
                <Box sx={{display:"flex",height:"77%"}} >
                  <SynchronizedLineCharts/>
                </Box>
                <Box sx={{textAlign:"end"}}>
                  <Button variant="contained" size={"medium"} onClick={handleOpenAuthModal}>
                      <Typography sx={{color:Colors.white,fontWeight:"800"}} >ТЎЛИҚ МАЪЛУМОТ</Typography>
                  </Button>
                </Box>
              </Box>
            </Grid>
            {/* tenth div */}
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={4}
              sx={{
                height: {xs:"400px",md:"500px"},
                width:"auto",
                padding:"5px"
              }}
            >
                <Box sx={{width:"100%",height:"100%",borderRadius:"5px",padding:"10px",display:"flex",flexDirection:"column",gap:"20px",bgcolor:Colors.gray_footer,}}>
                <Typography sx={{textAlign:"start",fontWeight:"800",fontSize:{xs:"12px",md:"16px"},}}>БАНК РЕНТАБЕЛЛИГИ КЎРСАТКИЧЛАРИ</Typography>
                <Box sx={{display:"flex",height:"77%"}} >
                  <RadialBarChartComponent/>
                </Box>
                <Box sx={{textAlign:"end"}}>
                  <Button variant="contained" size={"medium"} onClick={handleOpenAuthModal}>
                      <Typography sx={{color:Colors.white,fontWeight:"800"}} >ТЎЛИҚ МАЪЛУМОТ</Typography>
                  </Button>
                </Box>
              </Box>
            </Grid>
            {/* eleventh div */}
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
              }}
            >
                <Box sx={{width:"100%",height:"100%",borderRadius:"5px",padding:"10px",display:"flex",flexDirection:"column",gap:"20px",bgcolor:Colors.gray_footer,}}>
                <Typography sx={{textAlign:"start",fontWeight:"800",fontSize:{xs:"12px",md:"16px"},}}>БАНК РЕНТАБЕЛЛИГИ КЎРСАТКИЧЛАРИ</Typography>
                <Box sx={{display:"flex",height:"77%"}} >
                  <SparklineApp/>
                </Box>
                <Box sx={{textAlign:"end"}}>
                  <Button variant="contained" size={"medium"} onClick={handleOpenAuthModal}>
                      <Typography sx={{color:Colors.white,fontWeight:"800"}} >ТЎЛИҚ МАЪЛУМОТ</Typography>
                  </Button>
                </Box>
              </Box>
            </Grid>
            {/* twelveth div */}
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
              }}
            >
              <Box sx={{width:"100%",height:"100%",borderRadius:"5px",padding:"10px",display:"flex",flexDirection:"column",gap:"20px",bgcolor:Colors.gray_footer,}}>
                <Typography sx={{textAlign:"start",fontWeight:"800",fontSize:{xs:"12px",md:"16px"},}}>БАНК РЕНТАБЕЛЛИГИ КЎРСАТКИЧЛАРИ</Typography>
                <Box sx={{display:"flex",height:"77%"}} >
                  <RadarChart/>
                </Box>
                <Box sx={{textAlign:"end"}}>
                  <Button variant="contained" size={"medium"} onClick={handleOpenAuthModal}>
                      <Typography sx={{color:Colors.white,fontWeight:"800"}} >ТЎЛИҚ МАЪЛУМОТ</Typography>
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
                  Tanishib chiqing !!!
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
                "Aftorizatsiyadan o'tgandan keyin yangi sahifaga o'tish mumkin !!!"
              </Alert>
          </Box>
        </Modal>
      </Box>
    </Container>
  );
};

export default MainPage;
