import React, { useState, useEffect } from "react";
import { Container, Box, Grid, Typography } from "@mui/material";
import { Colors } from "../../styles/theme";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import LightHeader from "../../components/LightHeader/LightHeader";
import Footer from "../../components/Footer/Footer";
import AreaLineChart from "../../components/LineChart/LineChart";
import NewLineChart from "../../components/NewLineChart/NewLineChart";
import OpenDoughnutChart from "../../components/OperDroughtBar/OpenDroughtBar";
import OpenHorizontalBarChart from "../../components/OpenHorizontalBar/OpenHorizontalBar";
import OpenVerticalGroupBarChart from "../../components/OpenVerticalGroupBarchart/OpenVerticalBarChart";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import TestNewApi from '../../pages/testapi/someTestApi.jsx';
import CommonData from "../../pages/testapi/testDataAll.jsx";
import MovingIcon from "@mui/icons-material/Moving";

const TestScreen = () => {
  // Data
  const top128Filials = [
    { title: "Тошкент шаҳри", id: 1 },
    { title: "Андижон вилояти", id: 2 },
    // ... other options
  ];

  const setSelectedSecondMap = {
    1: [{ title: "Головной офис" }, /* more options here */],
    2: [{ title: "Андижон амалиёт БХМ" }, /* more options here */],
    // Other regions
    //...
  };

  const [selectnewdata, setSelectNewData] = useState(dayjs());
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Replace this with actual data fetching logic based on `selectnewdata`
      const formattedDate = dayjs(selectnewdata).format('YYYY-MM-DD');
      // Simulate fetching data based on the selected date
      const filteredData = TestNewApi.filter(item => item.date === formattedDate);
      setData(filteredData);
    };

    fetchData();
  }, [selectnewdata]);

  const handleDateChange = (newValue) => {
    setSelectNewData(dayjs(newValue));
  };

  const [prevFirstOption, setPrevFirstOption] = useState(null);
  const [selectedFirstOption, setSelectedFirstOption] = useState(null);
  const [selectedSecondOptions, setSelectedSecondOptions] = useState([]);
  const [prevSecondOption, setPrevSecondOption] = useState(null);
  const [secondOptions, setSecondOptions] = useState([]);

  useEffect(() => {
    if (selectedFirstOption && selectedFirstOption.id) {
      setPrevFirstOption(selectedFirstOption);
      setPrevSecondOption(selectedSecondOptions);
      setSecondOptions(setSelectedSecondMap[selectedFirstOption.id] || []);
      setSelectedSecondOptions(null);
    } else {
      setSecondOptions([]);
    }
  }, [selectedFirstOption]);

  return (
    <Container fixed maxWidth="xl" disableGutters sx={{ px: "10px", bgcolor: Colors.gray_back }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", height: "auto" }}>
        <Box sx={{ width: "100%", height: "auto", display: "flex", flexDirection: "column", gap: "10px" }}>
          <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Grid container sx={{ width: "100%", height: "auto" }}>
              <Grid item xs={12} sm={12} md={5} lg={5} sx={{ padding: "5px" }}>
                <Box sx={{ bgcolor: Colors.white, borderRadius: "5px", width: "100%", height: "50px", padding: "5px" }}>
                  <Autocomplete
                    options={top128Filials}
                    sx={{ width: '100%', height: '100%', mb: 2 }}
                    getOptionLabel={(option) => option.title}
                    value={selectedFirstOption || prevFirstOption}
                    onChange={(event, value) => setSelectedFirstOption(value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Выбор отделение"
                        variant="standard"
                        sx={{
                          "& .MuiInput-underline:before": { borderBottomColor: "red" },
                          "& .MuiInput-underline:after": { borderBottomColor: "green" },
                          "& .MuiInput-underline:before, & .MuiInput-underline:after": { borderBottom: "none" },
                        }}
                        InputLabelProps={{ style: { color: 'black' } }}
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={7} md={4} lg={4} sx={{ padding: "5px" }}>
                <Box sx={{ bgcolor: Colors.white, borderRadius: "5px", width: "100%", height: "50px", padding: "5px" }}>
                  <Autocomplete
                    options={secondOptions}
                    sx={{ width: '100%', height: '100%' }}
                    getOptionLabel={(option) => option.title}
                    onChange={(event, value) => setSelectedSecondOptions(value)}
                    value={selectedSecondOptions || prevSecondOption}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Выбор филиала"
                        variant="standard"
                        sx={{
                          "& .MuiInput-underline:before": { borderBottomColor: "red" },
                          "& .MuiInput-underline:after": { borderBottomColor: "green" },
                          "& .MuiInput-underline:before, & .MuiInput-underline:after": { borderBottom: "none" },
                        }}
                        InputLabelProps={{ style: { color: 'black' } }}
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={5} md={3} lg={3} sx={{ padding: "5px" }}>
                <Box sx={{ bgcolor: Colors.white, borderRadius: "5px", width: "100%", height: "50px", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                    <DatePicker
                      value={selectnewdata}
                      onChange={handleDateChange}
                      slotProps={{ textField: { size: "medium" } }}
                      renderInput={(props) => (
                        <Box sx={{ width: { xs: "100px", sm: "100px", md: "200px" } }}>
                          <TextField {...props} fullWidth />
                        </Box>
                      )}
                      sx={{
                        ".MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "white", border: "none" },
                          "&:hover fieldset": { borderColor: "white", border: "none" },
                          "&.Mui-focused fieldset": { borderColor: "white" },
                          ".MuiInputAdornment-root .MuiIconButton-root": { color: '#0000FF' },
                          ".MuiInputBase-input": { fontWeight: 800, fontSize: { xs: "12px", sm: "18px" } },
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ width: "100%", height: "auto" }}>
              {data.map((item, index) => (
                <Box key={index} sx={{ marginBottom: "20px" }}>
                  <NewLineChart 
                    labelsData={item.cleanProfit.labelsData} 
                    planData={item.cleanProfit.planData} 
                    factData={item.cleanProfit.factData} 
                  />
                </Box>
              ))}
            </Box>
            <Grid container sx={{ width: "100%", height: "250px" }}>
              <Grid item xs={5} md={5} lg={4} sx={{ padding: "5px" }}>
                <Box sx={{ bgcolor: Colors.white, borderRadius: "5px", width: "100%", height: "100%", padding: "5px", display: "flex", flexDirection: "column", gap: "5px" }}>
                  <Typography sx={{ fontWeight: "700", fontSize: "14px", color: Colors.dark, textAlign: "start", textTransform: "uppercase", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    Профит
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", gap: "5px" }}>
                      <AreaLineChart />
                      <Typography sx={{ fontWeight: "700", fontSize: "12px", color: Colors.dark }}>Месяц</Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", gap: "5px" }}>
                      <NewLineChart  />
                      <Typography sx={{ fontWeight: "700", fontSize: "12px", color: Colors.dark }}>Год</Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              {/* You can add other charts/components here as needed */}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default TestScreen;


// import * as React from "react";
// import { Box, Typography,TextField} from "@mui/material";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// // icons //
// // import LOGO image //
// import backgroundImage from "../../assets/photo/newHomePageTopImage.jpg";
// import { Colors } from "../../styles/theme";
// // SVG //
// import NBUlogo from "../../assets/svg/newForSVG.svg";
// // import framer motion //
// import { motion } from "framer-motion";
// // calendar elements section //
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from 'dayjs';
// import 'dayjs/locale/ru'; // Import Russian locale
// import {useEffect} from "react"

// import { useTranslation } from "react-i18next";

// const Header = ({changeLang}) => {

//   const {t,i18n} = useTranslation()

//   const handleChangeLanguage = (event) => {
//     const newLanguage = event.target.value;
//     setAge(newLanguage);
//     changeLang(newLanguage);
//   };

//   const [age, setAge] = React.useState("UZ");
//   const [selectedDate, setSelectedDate] = React.useState(dayjs());


//   useEffect(() => {
//     setAge(i18n.language);
//   }, [i18n.language]);

  
//   return (
//     <Box
//       sx={{
//         px: "10px",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//         width: "100%",
//         height: "137px",
//         backgroundImage: `url(${backgroundImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         boxShadow:
//           "0px 4px 12px rgba(0, 0, 0, 0.1) inset , -10px -10px 10px white",
//       }}
//     >
//       {/* left side box */}
//         <Box 
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             bgcolor: "rgba(254, 254, 254, 0.645)",
//             borderRadius: "5px",
//             padding: "10px",
//             gap: "10px",
//             marginRight: "10px",
//             width:{xs:"150px",sm:"200px", md:"300px"},
//             boxShadow: `-10px -10px 15px rgba(255, 255, 255, 0.5),
//                       10px 10px 15px rgba(70, 70, 70, 0.12)`
//           }}
//         >
//           <motion.div
//             initial={{ opacity: 0, scale: 0.5 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{
//               duration: 0.3,
//               ease: [0, 0.5, 0.2, 1.01],
//               scale: {
//                 type: "spring",
//                 damping: 4,
//                 stiffness: 100,
//                 restDelta: 0.001,
//               },
//             }}
//           >
//             <a href="/">
//               <Box
//                 component="img"
//                 src={NBUlogo}
//                 sx={{ width: {xs:"35px",md:"55px"}, cursor: "pointer" }}
//               />
//             </a>
//           </motion.div>
//           <Typography
//             sx={{
//               width: {xs:"120px",sm:"180px",md:"220px"},
//               fontSize: {xs:"8px",sm:"10px",md:"16px"},
//               textAlign: "left",
//               fontWeight: "900",
//               lineHeight: "1.3",
//             }}
//             color={Colors.dark}
//           >
//             {/* “ЎЗМИЛЛИЙБАНК” АЖ БУХГАЛТЕРИЯ ҲИСОБИ ВА МОЛИЯВИЙ МЕНЕЖМЕНТ
//             ДЕПАРТАМЕНТИ */}
//             {t("headerText")}
//           </Typography>
//         </Box>
//       {/* right side box */}
//       <Box 
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           textAlign:"end",
//           width:{xs:"120px",sm:"200px"},
//           height:"auto",
//           gap:"20px"
//         }}
//       >
//         {/* <=== language selection section ===>*/}
//         <Box >
//           <FormControl
//             size="small"
//             sx={{
//               m: 1,
//               minWidth: 15,
//               backgroundColor: "white", // Custom background color
//               borderRadius: "4px", // Custom border radius
//               boxShadow: "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px", 
//               "& .MuiOutlinedInput-root": {
//                 "& fieldset": {
//                   borderColor: "white", // Default border color
//                 },
//                 "&:hover fieldset": {
//                   borderColor: "white", // Border color on hover
//                 },
//                 "&.Mui-focused fieldset": {
//                   borderColor: "white", // Border color on focus
//                 },
//               },
//               height: {sm:"auto"},
//               fontSize: {xs:"8px",sm:"12px"},
//             }}
//           >
//             <Select
//               size="small"
//               value={age}
//               onChange={handleChangeLanguage}
//               displayEmpty
//               sx={{
//                 color: "black",
//                 fontSize: {xs:"10px",sm:"14px"},
//                 fontWeight: "700",
//               }}
//             >
//               <MenuItem
//                 value="uz"
//                 sx={{
//                   color: "black",
//                   fontSize: {xs:"10px",sm:"14px"},
//                   fontWeight: "700",
//                 }}
//               >
//                 UZ
//               </MenuItem>
//               <MenuItem
//                 value="en"
//                 sx={{
//                   color: "black",
//                   fontSize: {xs:"10px",sm:"14px"},
//                   fontWeight: "700",
//                 }}
//               >
//                 EN
//               </MenuItem>
//               <MenuItem
//                 value="ru"
//                 sx={{
//                   color: "black",
//                   fontSize: {xs:"10px",sm:"14px"},
//                   fontWeight: "700",
//                 }}
//               >
//                 RU
//               </MenuItem>
//             </Select>
//           </FormControl>
//         </Box>

//         {/* <=== calendar select data ===> */}
//         <Box sx={{ width: {xs:"120px",sm:"200px",md:"200px"}, marginRight: "100px",bgcolor:"white",borderRadius:"5px",boxShadow:"rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px"}}>
//       <LocalizationProvider dateAdapter={AdapterDayjs}  adapterLocale="ru" >
//           <DatePicker
//               value={selectedDate}
//               onChange={(newValue) => setSelectedDate(newValue)}
//               slotProps={{ textField: { size: 'small' } }}
//               renderInput={(props) => (
//               <Box sx={{ width: {xs:"100px",sm:"100px",md:"200px"} }}>
//                 <TextField {...props} fullWidth />
//               </Box>
//             )}
//             sx={{
//               ".MuiOutlinedInput-root": {
//                 "& fieldset": {
//                   borderColor: "white",
//                 },
//                 "&:hover fieldset": {
//                   borderColor: "white",

//                 },
//                 "&.Mui-focused fieldset": {
//                   borderColor: "white",
//                 },
//                 '.MuiInputAdornment-root .MuiIconButton-root': {
//                   color: Colors.blue_nbu, // Custom color for the DatePicker icon
//                 },
//                 ".MuiInputBase-input": {
//                   fontWeight: 700, // Adjust the font weight of the DatePicker's text
//                   fontSize:{xs:"12px",sm:"16px"}
//                 },
//               },
//             }}
//           />
//       </LocalizationProvider>
//         </Box>
//       </Box >
//     </Box>
//   );
// };

// export default Header;

