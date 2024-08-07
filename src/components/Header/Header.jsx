import * as React from "react";
import { Box, Typography,TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// icons //
// import LOGO image //
import backgroundImage from "../../assets/photo/newHomePageTopImage.jpg";
import { Colors } from "../../styles/theme";
// SVG //
import NBUlogo from "../../assets/svg/newForSVG.svg";
// import framer motion //
import { motion } from "framer-motion";
// calendar elements section //
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from 'dayjs';
import 'dayjs/locale/ru'; // Import Russian locale

const Header = () => {
  const [age, setAge] = React.useState("UZ");
  const [selectedDate, setSelectedDate] = React.useState(dayjs());

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
            width:{xs:"150px",sm:"200px", md:"300px"},
            boxShadow: `-10px -10px 15px rgba(255, 255, 255, 0.5),
                      10px 10px 15px rgba(70, 70, 70, 0.12)`
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
                sx={{ width: {xs:"35px",md:"55px"}, cursor: "pointer" }}
              />
            </a>
          </motion.div>
          <Typography
            sx={{
              width: {xs:"120px",sm:"180px",md:"220px"},
              fontSize: {xs:"8px",sm:"10px",md:"16px"},
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
          width:{xs:"120px",sm:"200px"},
          height:"auto",
          gap:"20px"
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
              boxShadow: "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px", 
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
              height: {sm:"auto"},
              fontSize: {xs:"8px",sm:"12px"},
            }}
          >
            <Select
              size="small"
              value={age}
              onChange={handleChangeLanguage}
              displayEmpty
              sx={{
                color: "black",
                fontSize: {xs:"10px",sm:"14px"},
                fontWeight: "700",
              }}
            >
              <MenuItem
                value="UZ"
                sx={{
                  color: "black",
                  fontSize: {xs:"10px",sm:"14px"},
                  fontWeight: "700",
                }}
              >
                UZ
              </MenuItem>
              <MenuItem
                value="EN"
                sx={{
                  color: "black",
                  fontSize: {xs:"10px",sm:"14px"},
                  fontWeight: "700",
                }}
              >
                EN
              </MenuItem>
              <MenuItem
                value="RU"
                sx={{
                  color: "black",
                  fontSize: {xs:"10px",sm:"14px"},
                  fontWeight: "700",
                }}
              >
                RU
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* <=== calendar select data ===> */}
        <Box sx={{ width: {xs:"120px",sm:"200px",md:"200px"}, marginRight: "100px",bgcolor:"white",borderRadius:"5px",boxShadow:"rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px"}}>
      <LocalizationProvider dateAdapter={AdapterDayjs}  adapterLocale="ru" >
          <DatePicker
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              slotProps={{ textField: { size: 'small' } }}
              renderInput={(props) => (
              <Box sx={{ width: {xs:"100px",sm:"100px",md:"200px"} }}>
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
                '.MuiInputAdornment-root .MuiIconButton-root': {
                  color: Colors.blue_nbu, // Custom color for the DatePicker icon
                },
                ".MuiInputBase-input": {
                  fontWeight: 700, // Adjust the font weight of the DatePicker's text
                  fontSize:{xs:"12px",sm:"16px"}
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
// box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;