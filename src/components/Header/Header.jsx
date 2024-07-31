import * as React from "react";
import { Box, Stack, Typography, Button ,TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// icons //
// import LOGO image //
import backgroundImage from "../../assets/photo/homePageTopImage.png";
import { Colors } from "../../styles/theme";
// SVG //
import NBUlogo from "../../assets/svg/newForSVG.svg";
// import framer motion //
import { motion } from "framer-motion";
// calendar elements section //
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Header = () => {
  const [age, setAge] = React.useState("UZ");

  const handleChangeLanguage = (event) => {
    setAge(event.target.value);
  };
  return (
    <Box
      sx={{
        px: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: "137px",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow:
          "0px 4px 12px rgba(0, 0, 0, 0.1) inset , -10px -10px 10px white",
      }}
    >
      {/* left side box */}
      <Box 
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: "rgba(254, 254, 254, 0.645)",
          borderRadius: "5px",
          padding: "10px",
          gap: "10px",
          marginRight: "10px",
          width:"300px"
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.3,
            ease: [0, 0.5, 0.2, 1.01],
            scale: {
              type: "spring",
              damping: 4,
              stiffness: 100,
              restDelta: 0.001,
            },
          }}
        >
          <a href="/">
            <Box
              component="img"
              src={NBUlogo}
              sx={{ width: "55px", cursor: "pointer" }}
            />
          </a>
        </motion.div>
        <Typography
          sx={{
            width: "220px",
            fontSize: "16px",
            textAlign: "left",
            fontWeight: "900",
            lineHeight: "1.3",
          }}
          color={Colors.dark}
        >
          “ЎЗМИЛЛИЙБАНК” АЖ БУХГАЛТЕРИЯ ҲИСОБИ ВА МОЛИЯВИЙ МЕНЕЖМЕНТ
          ДЕПАРТАМЕНТИ
        </Typography>
      </Box>
      {/* right side box */}
      <Box 
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign:"end",
          width:"200px",
          height:"auto",
        }}
      >
        {/* <=== language selection section ===>*/}
        <Box >
          <FormControl
            size="small"
            sx={{
              m: 1,
              minWidth: 15,
              backgroundColor: "white", // Custom background color
              borderRadius: "4px", // Custom border radius
              boxShadow: "0 3px 5px 2px rgba(255, 255, 255, .3)", // Custom shadow
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white", // Default border color
                },
                "&:hover fieldset": {
                  borderColor: "white", // Border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white", // Border color on focus
                },
              },
              height: "auto",
              fontSize: "12px",
            }}
          >
            <Select
              size="small"
              value={age}
              onChange={handleChangeLanguage}
              displayEmpty
              sx={{
                color: "black",
                fontSize: "14px",
                fontWeight: "700",
              }}
            >
              <MenuItem
                value="UZ"
                sx={{
                  color: "black",
                  fontSize: "14px",
                  fontWeight: "700",
                }}
              >
                UZ
              </MenuItem>
              <MenuItem
                value="EN"
                sx={{
                  color: "black",
                  fontSize: "14px",
                  fontWeight: "700",
                }}
              >
                EN
              </MenuItem>
              <MenuItem
                value="RU"
                sx={{
                  color: "black",
                  fontSize: "14px",
                  fontWeight: "700",
                }}
              >
                RU
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* <=== calendar select data ===> */}
  <Box sx={{ width: "200px", marginRight: "100px",bgcolor:"white",borderRadius:"5px",my:"10px"}}>
      <LocalizationProvider dateAdapter={AdapterDayjs}  >
          <DatePicker
              renderInput={(props) => (
              <Box sx={{ width: "200px" }}>
                <TextField {...props} fullWidth />
              </Box>
            )}
            sx={{
              ".MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",

                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
            }}
          />
      </LocalizationProvider>
        </Box>
      </Box >
    </Box>
  );
};

export default Header;
// backdrop-filter:blur(10px);
