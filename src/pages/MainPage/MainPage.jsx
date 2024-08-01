import * as React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Container, Box, Typography, Button } from "@mui/material";
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

const MainPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Container fixed maxWidth="xl" disableGutters sx={{ px: "10px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          height: "100%", // Make sure the Box takes the full viewport height
        }}
      >
        <Header />
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
            lineHeight: "1",
          }}
        >
          <Typography
            sx={{ fontWeight: "800", fontSize: "16px", color: Colors.nbu }}
          >
            KPI БУРЧАГИ
          </Typography>
          <Box
            sx={{
              display: "flex",
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
              margin="none"
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
                '&:hover fieldset': {
                  borderColor: Colors.blue_nbu, // Border color on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: Colors.blue_nbu, // Border color on focus
                },
              }}
              InputProps={{
                sx: {
                  bgcolor: "white",
                  borderRadius: "5px",
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: Colors.blue_nbu, // Border color
                    },
                    '&:hover fieldset': {
                      borderColor: Colors.blue_nbu, // Border color on hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: Colors.blue_nbu, // Border color on focus
                    },
                  },
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
                      {showPassword ? <VisibilityOff /> : <Visibility />}
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

        <Footer />
      </Box>
    </Container>
  );
};

export default MainPage;
