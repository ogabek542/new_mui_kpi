import * as React from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  Select,
  IconButton,
  Input,
  InputAdornment,
} from "@mui/material";
import backgroundImage from "../../assets/photo/newHomePageTopImage.jpg";
import { Colors } from "../../styles/theme";
import NBUlogo from "../../assets/svg/newForSVG.svg";
import { motion } from "framer-motion";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { useEffect } from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { useTranslation } from "react-i18next";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Link } from "react-router-dom";

import translationEn from "../../locale/translationEn.js";
import translationUz from "../../locale/translationUz.js";
import translationRu from "../../locale/translationRu.js";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationEn },
    uz: { translation: translationUz },
    ru: { translation: translationRu },
  },
  lng: localStorage.getItem("language") || "ru", // Set initial language based on localStorage or default to 'uz'
  fallbackLng: "ru",
});

const Header = ({ value, onChange }) => {
  const { t, i18n } = useTranslation();
  const [age, setAge] = React.useState(
    localStorage.getItem("language") || "ru"
  ); // Initialize with persisted language or default

  useEffect(() => {
    setAge(i18n.language);
  }, [i18n.language]);

  const handleChangeLanguage = (event) => {
    const newLanguage = event.target.value;
    setAge(newLanguage);
    i18n.changeLanguage(newLanguage); // Change language using i18n
    localStorage.setItem("language", newLanguage); // Persist language in localStorage
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
      {/* Left side box */}
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
          width: { xs: "150px", sm: "200px", md: "300px" },
          boxShadow: `-10px -10px 15px rgba(255, 255, 255, 0.5),
                      10px 10px 15px rgba(70, 70, 70, 0.12)`,
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
          <Link to="/">
            <Box
              component="img"
              src={NBUlogo}
              sx={{ width: { xs: "35px", md: "55px" }, cursor: "pointer" }}
            />
          </Link>
        </motion.div>
        <Typography
          sx={{
            width: { xs: "120px", sm: "180px", md: "220px" },
            fontSize: { xs: "8px", sm: "10px", md: "16px" },
            textAlign: "left",
            fontWeight: "900",
            lineHeight: "1.3",
          }}
          color={Colors.dark}
        >
          {t("headerText")}
        </Typography>
      </Box>
      {/* Right side box */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "end",
          width: { xs: "120px", sm: "200px" },
          height: "auto",
          gap: "20px",
        }}
      >
        {/* Language selection section */}
        <Box>
          <FormControl
            size="small"
            sx={{
              m: 1,
              minWidth: 15,
              backgroundColor: "white",
              borderRadius: "4px",
              boxShadow:
                "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
              "& .MuiOutlinedInput-root": {
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
              height: { sm: "auto" },
              fontSize: { xs: "8px", sm: "12px" },
            }}
          >
            <Select
              size="small"
              value={age}
              onChange={handleChangeLanguage}
              displayEmpty
              sx={{
                color: "black",
                fontSize: { xs: "10px", sm: "14px" },
                fontWeight: "700",
              }}
            >
              <MenuItem
                value="uz"
                sx={{
                  color: "black",
                  fontSize: { xs: "10px", sm: "14px" },
                  fontWeight: "700",
                }}
              >
                UZ
              </MenuItem>
              <MenuItem
                value="en"
                sx={{
                  color: "black",
                  fontSize: { xs: "10px", sm: "14px" },
                  fontWeight: "700",
                }}
              >
                EN
              </MenuItem>
              <MenuItem
                value="ru"
                sx={{
                  color: "black",
                  fontSize: { xs: "10px", sm: "14px" },
                  fontWeight: "700",
                }}
              >
                RU
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Calendar select data */}
        <Box
          sx={{
            width: { xs: "120px", sm: "200px", md: "200px" },
            marginRight: "100px",
            bgcolor: "white",
            borderRadius: "5px",
            boxShadow:
              "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              value={value}
              onChange={onChange}
              // components={{
              //   OpenPickerIcon:CalendarMonthIcon
              // }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  inputProps={{
                    ...params.inputProps,
                    placeholder: "DD.MM.YYYY",
                    readOnly: true,
                  }}
                />
              )}
              // renderInput={(props) => <TextField {...props}/>}
              sx={{
                ".MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                    display: "none",
                    border: "none",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                    border: "none",
                  },
                  ".MuiInputAdornment-root .MuiIconButton-root": {
                    color: Colors.blue_nbu,
                  },
                  ".MuiInputBase-input": {
                    fontWeight: 700,
                    fontSize: { xs: "12px", sm: "16px" },
                  },
                },
              }}
            />
          </LocalizationProvider>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
