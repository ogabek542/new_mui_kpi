import * as React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Container, Box, Typography, Button, Stack } from "@mui/material";
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
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const MainPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [backdrop,setBackdrop] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleOpenBackdrop = () => setBackdrop(true)
  const handleCloseBackdrop = () => setBackdrop(false)
  return (
    <Container fixed maxWidth="xl" disableGutters sx={{ px: "10px" }}>
      <Box
        sx={{
        
          display:"flex",
          flexDirection:"column",
          justifyContent:"space-between",
          alignItems: "center",
          textAlign: "center",
          height: "100%", // Make sure the Box takes the full viewport height
        }}
      >
        <Header />
        {/* <=== MAIN SECTION ===> */}
        <Box sx={{flexDirection:"column",width:"100%"}}>

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
              py:{xs:"5px",sm:"5px",md:"0px"},
              lineHeight: "1",
              flexDirection: {
                xs: 'column', // flexDirection for extra-small screens
                sm: 'column', // flexDirection for extra-small screens
                md: 'row'     // flexDirection for medium screens and larger
              },
            }}
          >
            <Typography
              sx={{ fontWeight: "800", fontSize: "16px", color: Colors.nbu ,display:{xs:"none",md:"block"}}}
            >
              KPI БУРЧАГИ
            </Typography>
            <Box
              sx={{
                display: {xs:"",md:"flex"},
                flexDirection: {
                  xs: 'column', // flexDirection for extra-small screens
                  sm: 'column', // flexDirection for extra-small screens
                  md: 'row'     // flexDirection for medium screens and larger
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
                  marginTop:{xs:"8px",sm:"8px",md:"0px"},
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
                        {showPassword ? <VisibilityOff sx={{color:Colors.blue_nbu}}/> : <Visibility sx={{color:Colors.blue_nbu}}/>}
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
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
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
              >
                ПАРОЛНИ УНУТДИНГИЗМИ?
              </Typography>
            </Button>
          </Box>
        </Box>
        <Footer />
      </Box>
    </Container>
  );
};

export default MainPage;
