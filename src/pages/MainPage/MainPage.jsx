import * as React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Container, Box, Typography, Button, Grid } from "@mui/material";
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
// modal styles //

// IMPORT CARDS //

const MainPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [backdrop, setBackdrop] = React.useState(false);
  const [openmodal, setOpenModal] = React.useState(false);
  // PASSWORD SHOW HIDE FUNCTION //
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // BACKDROP FUNCTION //
  const handleOpenBackdrop = () => setBackdrop(true);
  const handleCloseBackdrop = () => setBackdrop(false);

  // modal function //
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOpenModal = () => {
    setOpenModal(true);
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
                size="small"
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
                <InputLabel htmlFor="outlined-adornment-password">
                  ПАРОЛ
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
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
                  label="Password"
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
                  onClick={handleOpenBackdrop}
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
              <Box sx={{width:"100%",height:"100%",borderRadius:"5px",padding:"15px",display:"flex",flexDirection:"column",gap:"30px",bgcolor:Colors.gray_footer,}}>
                <Typography sx={{textAlign:"start",fontWeight:"800",fontSize:{xs:"12px",md:"16px"},}}>БАНК РЕНТАБЕЛЛИГИ КЎРСАТКИЧЛАРИ</Typography>
                <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",height:"73%"}} >
                    <Box sx={{display:"flex",flexDirection:"column",gap:"10px",textAlign:"left"}}>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",gap:"15px"}}>
                          <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400",textTransform:"uppercase"}}>ROA</Typography>
                          <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                        </Box>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",gap:"15px"}}>
                          <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400",textTransform:"uppercase"}}>ROE</Typography>
                          <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                        </Box>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",gap:"15px"}}>
                          <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400",marginRight:"8px"}}>CIR</Typography>
                          <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                        </Box>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",gap:"15px"}}>
                          <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400"}}>COR</Typography>
                          <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                        </Box>
                    </Box>
                    <Box sx={{display:"flex",flexDirection:"column",gap:"10px"}}>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",gap:{xs:"5px",md:"15px"}}}>
                          <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400",textTransform:"uppercase"}}>NPL</Typography>
                          <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                        </Box>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",gap:"15px"}}>
                        <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400",textTransform:"uppercase"}}>NPS</Typography>
                        <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                      </Box>
                      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",gap:"15px"}}>
                          <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400",textTransform:"uppercase"}}>MAU</Typography>
                          <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                        </Box>
                      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",gap:"15px"}}>
                        <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400"}}>NIM</Typography>
                        <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                      </Box>
                    </Box>
                </Box>
                <Box sx={{textAlign:"end"}}>
                  <Button variant="contained" size={"medium"}>
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
                height: {xs:"400px",md:"500px"},
                width:"auto",
                padding:"5px",
              }}
            >
              <Box sx={{width:"100%",height:"100%",borderRadius:"5px",padding:"15px",display:"flex",flexDirection:"column",gap:"30px",bgcolor:Colors.gray_footer,}}>
                <Typography sx={{textAlign:"start",fontWeight:"800",fontSize:{xs:"12px",md:"16px"},}}>БАНК АКТИВЛАРИ</Typography>
                <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",height:"73%"}} >
                  
                </Box>
                <Box sx={{textAlign:"end"}}>
                  <Button variant="contained" size={"medium"}>
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
              <Box sx={{width:"100%",height:"100%",bgcolor:Colors.gray_footer,borderRadius:"5px"}}>

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
              <Box sx={{width:"100%",height:"100%",bgcolor:Colors.gray_footer,borderRadius:"5px"}}>

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
              <Box sx={{width:"100%",height:"100%",bgcolor:Colors.gray_footer,borderRadius:"5px"}}>

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
              <Box sx={{width:"100%",height:"100%",borderRadius:"5px",padding:"15px",display:"flex",flexDirection:"column",gap:"30px",bgcolor:Colors.gray_footer,}}>
                <Typography sx={{textAlign:"start",fontWeight:"800",fontSize:{xs:"12px",md:"16px"},}}>РАҚАМЛИ КЎРСАТКИЧЛАР</Typography>
                <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",height:"73%"}} >
                    <Box sx={{display:"flex",flexDirection:"column",gap:"10px",textAlign:"left"}}>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",gap:"15px"}}>
                          <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400",textTransform:"uppercase"}}>ROA</Typography>
                          <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                        </Box>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",gap:"15px"}}>
                          <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400",textTransform:"uppercase"}}>ROE</Typography>
                          <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                        </Box>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",gap:"15px"}}>
                          <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400",marginRight:"8px"}}>CIR</Typography>
                          <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                        </Box>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",gap:"15px"}}>
                          <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400"}}>COR</Typography>
                          <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                        </Box>
                    </Box>
                    <Box sx={{display:"flex",flexDirection:"column",gap:"10px"}}>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",gap:{xs:"5px",md:"15px"}}}>
                          <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400",textTransform:"uppercase"}}>NPL</Typography>
                          <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                        </Box>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",gap:"15px"}}>
                        <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400",textTransform:"uppercase"}}>NPS</Typography>
                        <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                      </Box>
                      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",gap:"15px"}}>
                          <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400",textTransform:"uppercase"}}>MAU</Typography>
                          <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                        </Box>
                      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",gap:"15px"}}>
                        <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400"}}>NIM</Typography>
                        <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                      </Box>
                    </Box>
                </Box>
                <Box sx={{textAlign:"end"}}>
                  <Button variant="contained" size={"medium"}>
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
              <Box sx={{width:"100%",height:"100%",borderRadius:"5px",padding:"15px",display:"flex",flexDirection:"column",gap:"30px",bgcolor:Colors.gray_footer,}}>
                <Typography sx={{textAlign:"start",fontWeight:"800",fontSize:{xs:"12px",md:"16px"},}}>РАҚАМЛИ КЎРСАТКИЧЛАР</Typography>
                <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",height:"73%"}} >
                    <Box sx={{display:"flex",flexDirection:"column",gap:"10px",textAlign:"left"}}>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",gap:"15px"}}>
                          <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400",textTransform:"uppercase"}}>ROA</Typography>
                          <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                        </Box>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",gap:"15px"}}>
                          <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400",textTransform:"uppercase"}}>ROE</Typography>
                          <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                        </Box>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",gap:"15px"}}>
                          <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400",marginRight:"8px"}}>CIR</Typography>
                          <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                        </Box>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",gap:"15px"}}>
                          <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400"}}>COR</Typography>
                          <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                        </Box>
                    </Box>
                    <Box sx={{display:"flex",flexDirection:"column",gap:"10px"}}>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",gap:{xs:"5px",md:"15px"}}}>
                          <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400",textTransform:"uppercase"}}>NPL</Typography>
                          <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                        </Box>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",gap:"15px"}}>
                        <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400",textTransform:"uppercase"}}>NPS</Typography>
                        <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                      </Box>
                      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",gap:"15px"}}>
                          <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400",textTransform:"uppercase"}}>MAU</Typography>
                          <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                        </Box>
                      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",gap:"15px"}}>
                        <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400"}}>NIM</Typography>
                        <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                      </Box>
                    </Box>
                </Box>
                <Box sx={{textAlign:"end"}}>
                  <Button variant="contained" size={"medium"}>
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
              <Box sx={{width:"100%",height:"100%",bgcolor:Colors.gray_footer,borderRadius:"5px"}}>

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
              <Box sx={{width:"100%",height:"100%",bgcolor:Colors.gray_footer,borderRadius:"5px"}}>

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
              <Box sx={{width:"100%",height:"100%",bgcolor:Colors.gray_footer,borderRadius:"5px"}}>

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
              <Box sx={{width:"100%",height:"100%",borderRadius:"5px",padding:"15px",display:"flex",flexDirection:"column",gap:"30px",bgcolor:Colors.gray_footer,}}>
                <Typography sx={{textAlign:"start",fontWeight:"800",fontSize:{xs:"12px",md:"16px"},}}>РАҚАМЛИ КЎРСАТКИЧЛАР</Typography>
                <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",height:"73%"}} >
                    <Box sx={{display:"flex",flexDirection:"column",gap:"10px",textAlign:"left"}}>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",gap:"15px"}}>
                          <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400",textTransform:"uppercase"}}>ROA</Typography>
                          <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                        </Box>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",gap:"15px"}}>
                          <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400",textTransform:"uppercase"}}>ROE</Typography>
                          <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                        </Box>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",gap:"15px"}}>
                          <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400",marginRight:"8px"}}>CIR</Typography>
                          <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                        </Box>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",gap:"15px"}}>
                          <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400"}}>COR</Typography>
                          <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                        </Box>
                    </Box>
                    <Box sx={{display:"flex",flexDirection:"column",gap:"10px"}}>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",gap:{xs:"5px",md:"15px"}}}>
                          <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400",textTransform:"uppercase"}}>NPL</Typography>
                          <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                        </Box>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",gap:"15px"}}>
                        <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400",textTransform:"uppercase"}}>NPS</Typography>
                        <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                      </Box>
                      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",gap:"15px"}}>
                          <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400",textTransform:"uppercase"}}>MAU</Typography>
                          <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                        </Box>
                      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",gap:"15px"}}>
                        <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400"}}>NIM</Typography>
                        <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                      </Box>
                    </Box>
                </Box>
                <Box sx={{textAlign:"end"}}>
                  <Button variant="contained" size={"medium"}>
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
                padding:"5px"
              }}
            >
              <Box sx={{width:"100%",height:"100%",bgcolor:Colors.gray_footer,borderRadius:"5px"}}>

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
      </Box>
    </Container>
  );
};

export default MainPage;
