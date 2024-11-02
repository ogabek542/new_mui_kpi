import React, { useState } from 'react'
import { Container, Box, Typography, Button, Grid } from "@mui/material";
import { useEffect } from "react";
import { Colors } from "../../styles/theme";
import Footer from "../../components/Footer/Footer";
import LightHeader from '../../components/LightHeader/LightHeader';
import { useNavigate } from "react-router-dom";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
// <==== Import Components ====> //
import dayjs from "dayjs";
import "dayjs/locale/ru";
// for holidays data //
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

// change language function //
const changeLang = (value) => {
  i18n.changeLanguage(value);
};

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
import Autocomplete from "@mui/material/Autocomplete";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { isWeekend, parse } from "date-fns"; // Importing necessary functions from date-fns



const BalanceTable = () => {

  
  const top128Filials = [
    { title: "Республика", id: 1 },
    { title: "Тошкент шаҳри", id: 2 },
    { title: "Андижон вилояти", id: 3 },
    { title: "Бухоро вилояти", id: 4 },
    { title: "Фарғона вилояти", id: 5 },
    { title: "Жиззах  вилояти", id: 6 },
    { title: "Наманган  вилояти", id: 7 },
    { title: "Навоий  вилояти", id: 8 },
    { title: "Қашқадарё  вилояти", id: 9 },
    { title: "Самарқанд  вилояти", id: 10 },
    { title: "Сирдарё  вилояти", id: 11 },
    { title: "Сурхондарё  вилояти", id: 12 },
    { title: "Тошкент  вилояти", id: 13 },
    { title: "Хоразм  вилояти", id: 14 },
    { title: "Қорақалпоғистон республикаси", id: 15 },
    { title: "Миробод бўлими", id: 16 },
  ];

  const setSelectedSecondMap = {
    // NBU//
    1: [{ title: "Республика" }],
    // Тошкент шаҳри //
    2: [
      { title: "Головной офис" },
      { title: "Абусахий БХО" },
      { title: "Атлас НБУ БХО" },
      { title: "Ғалаба БХО" },
      { title: "Миробод плаза БХО" },
      { title: "Наврўз БХО" },
      { title: "Технопарк БХО" },
      { title: "Хумо БХО" },
      { title: "Шайхонтохур БХО" },
      { title: "Янги сергели БХО" },
      { title: "Академия БХМ" },
      { title: "Бектемир БХМ" },
      { title: "Бош амалиёт БХМ" },
      { title: "Марказий амалиёт БХМ" },
      { title: "Мирзо-Улуғбек БХМ" },
      { title: "Олмазор БХМ" },
      { title: "Саёхат БХМ" },
      { title: "Себзор амалиёт БХМ" },
      { title: "Сергели БХМ" },
      { title: "Учтепа БХM" },
      { title: "Юнусобод БХМ" },
      { title: "Яккасарой БХМ" },
      { title: "Янгиобод БХM" },
      { title: "Яшнобод БХM" },
    ],
    // Андижон вилояти //
    3: [
      { title: "Андижон амалиёт БХМ" },
      { title: "Асака БХM" },
      { title: "Избоскан БХО" },
      { title: "Қурғонтепа БХО" },
      { title: "Мархамат БХМ" },
      { title: "Пахтаобод БХО" },
      { title: "Шахрихон БХО" },
    ],
    // Бухоро вилояти //
    4: [
      { title: "Арк БХО" },
      { title: "Бухоро амалиёт БХМ" },
      { title: "Бухоро шаҳар БХО" },
      { title: "Вобкент БХО" },
      { title: "Ғиждувон БХМ" },
      { title: "Когон БХM" },
      { title: "Қоракўл БХМ" },
      { title: "Қоровулбозор БХО" },
      { title: "Нақшбанд БХО" },
      { title: "Ромитан БХМ" },
      { title: "Шофиркон БХО" },
    ],
    // Фарғона вилояти //
    5: [
      { title: "Бешариқ БХМ" },
      { title: "Бувайда БХО" },
      { title: "Қува БХМ" },
      { title: "Қувасой БХО" },
      { title: "Қуқон БХМ" },
      { title: "Риштон БХМ" },
      { title: "Фарғона амалиёт БХМ" },
      { title: "Марғилон БХО" },
    ],
    // Жиззах  вилояти //
    6: [
      { title: "Джизак амалиёт БХМ" },
      { title: "Индустриал БХМ" },
      { title: "Мирзачуль БХМ" },
      { title: "Пахтакор БХО" },
    ],
    // Наманган  вилояти //
    7: [
      { title: "Косонсой БХО" },
      { title: "Наманган амалиёт БХМ" },
      { title: "Турақўрғон БХО" },
      { title: "Уйчи БХМ" },
      { title: "Учқурғон БХМ" },
      { title: "Чортоқ БХМ" },
      { title: "Чуст БХО" },
    ],
    // Навоий  вилояти //
    8: [
      { title: "Зарафшон БХМ" },
      { title: "Қизилтепа БХМ" },
      { title: "Маликрабод БХМ" },
      { title: "Навоий амалиёт БХМ" },
      { title: "Нурота БХО" },
      { title: "Учқудуқ БХМ" },
    ],
    // Қашқадарё  вилояти //
    9: [
      { title: "Ғузор БХО" },
      { title: "Қарши амалиёт БХМ" },
      { title: "Муборак БХО" },
      { title: "Шаҳрисабз БХМ" },
      { title: "Янгинишон БХО" },
    ],
    // Самарқанд  вилояти //
    10: [
      { title: "Булунғур БХО" },
      { title: "Джамбай БХМ" },
      { title: "Зармитан БХО" },
      { title: "Каттақўрғон БХО" },
      { title: "Қорасув БХО" },
      { title: "Нуробод БХО" },
      { title: "Пайариқ БХО" },
      { title: "Пастдаргом БХМ" },
      { title: "Регистан БХМ" },
      { title: "Самарканд амалиёт БХМ" },
      { title: "Ургут БХМ" },
    ],
    // Сирдарё  вилояти //
    11: [{ title: "Гулистан амалиёт БХМ" }, { title: "Оқолтин БХО" }],
    // Сурхондарё  вилояти //
    12: [
      { title: "Денов БХМ" },
      { title: "Қумқўрғон БХМ" },
      { title: "Термиз амалиёт БХМ" },
      { title: "Жарқўрғон БХО" },
      { title: "Шеробод БХО" },
    ],
    // Тошкент  вилояти //
    13: [
      { title: "Ангрен БХM" },
      { title: "Бекабад БХМ" },
      { title: "Газалкент БХО" },
      { title: "Нурафшон амалиёт БХМ" },
      { title: "Олмалиқ БХО" },
      { title: "Тошкент шахар БХО" },
      { title: "Чирчиқ БХО" },
      { title: "Янгийул БХМ" },
    ],
    // Хоразм  вилояти //
    14: [
      { title: "Гурлан БХО" },
      { title: "Карвон БХО" },
      { title: "Хазорасп БХМ" },
      { title: "Хива БХО" },
      { title: "Хонқа БХМ" },
      { title: "Хоразм амалиёт БХМ" },
      { title: "Шовот БХМ" },
      { title: "Янгиариқ БХО" },
      { title: "Кушкупир БХМ" },
    ],
    // Қорақалпоғистон республикаси //
    15: [
      { title: "Кўнғирот БХМ" },
      { title: "Манғит БХО" },
      { title: "Нукус амалиёт БХМ" },
      { title: "Тўрткўл БХM" },
      { title: "Хўжайли БХО" },
      { title: "Чимбой БХО" },
    ],
    16: [{ title: "Миробод бўлими" }],
  };

   // Define holidays (formatted correctly for date-fns parsing)
   const holidays = [
    "01.01.2024", // New Year's Day
    "02.01.2024", // New Year's Day
    "08.03.2024", // Women's Day
  "11.03.2024", // Ramazan Day
    "21.03.2024", // Navruz Happy Day
    "22.03.2024", // Navruz Happy Day
  "23.03.2024", // Navruz Happy Day
    "10.04.2024", // Eid Al Fitr Day
  "11.04.2024", // Eid Al Fitr Day
    "12.04.2024", // Eid Al Fitr Day
    "09.05.2024", // Remember Day
    "16.06.2024", // Eid Al Adha Day
    "17.06.2024", // Eid Al Adha Day
    "18.06.2024", // Eid Al Adha Day
    "31.08.2024", // Independence Day
    "01.09.2024", // Independence Day
    "02.09.2024", // Independence Day
    "03.09.2024", // Independence Day
    "12.08.2024", // Constitution Day
    "01.10.2024", // Constitution Day
    "09.12.2024", // Happy New Year Day
    "30.12.2024", // Happy New Year Day
    "31.12.2024", // Happy New Year Day
    // Add more holidays as needed
  ].map((date) => parse(date, "dd.MM.yyyy", new Date()));


   // Define exception working days that fall on weekends
   const exceptionWorkingDays = [
    "06.01.2024", // Specific weekend day which is a working day
    "29.06.2024",
    "14.12.2024",
    // Add more exception working days here if needed
  ].map((date) => parse(date, "dd.MM.yyyy", new Date()));

  // Function to disable weekends and holidays
  const shouldDisableDate = (date) => {
    // If it's a weekend but is listed as an exception working day, allow it
    const isExceptionWorkingDay = exceptionWorkingDays.some(
      (exceptionDay) => exceptionDay.getTime() === date.toDate().getTime()
    );

    if (isExceptionWorkingDay) {
      return false; // Don't disable if it's an exception working day
    }

    // Disable weekends
    if (isWeekend(date.toDate())) {
      return true;
    }

    // Disable holidays
    const isHoliday = holidays.some(
      (holiday) => holiday.getTime() === date.toDate().getTime()
    );

    return isHoliday;
  };




  const changeLang = (value) => {
    i18n.changeLanguage(value)
  }
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // State to track loading
  const [selectNewData, setSelectNewData] = useState(dayjs());
  const [dateText, setDateText] = useState(dayjs().format("DD.MM.YYYY"));
  const [chooseData, setChooseData] = useState([]);
  const [selectedFirstOption, setSelectedFirstOption] = useState({
    title: "Республика",
  });
  const [selectedSecondOptions, setSelectedSecondOptions] = useState({
    title: "Республика",
  });
  const [secondOptions, setSecondOptions] = useState(setSelectedSecondMap[1]);

  const formattedDate = dayjs(selectNewData).format("DD.MM.YYYY");

const handleDateChange = (newValue) => {
  setSelectNewData(newValue); // Update the selected date
  console.log(newValue);
};

useEffect(() => {
  if (selectedFirstOption && selectedFirstOption.id) {
    setSecondOptions(setSelectedSecondMap[selectedFirstOption.id] || []);
    setSelectedSecondOptions(null); // Reset the second option
  } else {
    setSecondOptions([]);
  }
}, [selectedFirstOption]);


// <==== GET DATA FROM BACKEND SECTION ====> //
useEffect(() => {
  const fetchGraphicData = async () => {
    try {
      setLoading(true);
      const formattedDate = selectNewData.format("DD.MM.YYYY");
      const params = {
        date: formattedDate,
        option: selectedSecondOptions?.title || "",
      };
      const response = await REQUESTS.analysisScreenOne.getAnalysisScreenOne(params);
      const graphicIndicators = response.data;
      console.log(response, "Fetched data All Income");
      setChooseData(graphicIndicators);
    } catch (error) {
      console.error("Error fetching graphic indicator data:", error);
      if (error.response && error.response.status === 404) {
        console.error(
          "Endpoint not found. Please check the URL or backend configuration."
        );
      } else {
        console.error("An error occurred:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (selectNewData && selectedSecondOptions) {
    fetchGraphicData();
  }
}, [selectNewData, selectedSecondOptions]);

const insertSpaces = (text) => {
  if (!text) return ""; // Handle empty or undefined text

  // Convert to string and ensure no more than 6 characters
  const str = text.toString()

  // Add spaces every 3 digits
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, " ");


};


  
  const handleNavigateKeyIndicators = () => { 
    // navigate("/keyindicatorscreen");
    navigate("/keyindicatorscreen");
  };
  const handleNavigateBalanceScreen = () => { 
    navigate("/balancescreen");
  };


  return (
    <Container
    maxWidth={false} // This allows the container to expand beyond the default breakpoints
    disableGutters
    sx={{
      px: "10px",
      bgcolor: Colors.gray_back,
      width: "100%", // Ensure the container takes up 100% of the viewport width
      maxWidth: "100vw", // Ensure the container doesn't exceed the viewport width
      "@media (min-width: 1920px)": {
        maxWidth: "100%", // For extra-large screens, allow full width
      },
    }}
  >
    <LightHeader/>

       {/* <=== HEADER TITLE ====> */}
        <Box sx={{borderRadius:"8px",bgcolor:Colors.white,width:"100%",height:"auto",paddingY:"10px", marginTop:"10px"  ,boxShadow: "1px 2px 10px 2px rgba(34, 60, 80, 0.2)",}}>
          <Typography sx={{fontWeight:"bold",textTransform:"uppercase",paddingLeft:"6px",}}>
          Основные показатели деятельности Национального банка Внешнеэкономической деятельности Республики Узбекистан по состоянию на {selectNewData.format("DD.MM.YYYY")} года	
          </Typography>

        </Box>
        {/* <===== FILTER SECTION =====> */}
        <Grid container sx={{ width: "100%", height: "auto" }}>
              <Grid item xs={12} sm={12} md={5} lg={5} sx={{ padding: "5px" }}>
                <Box
                  sx={{
                    bgcolor: Colors.white,
                    borderRadius: "5px",
                    width: "100%",
                    height: "50px",
                    padding: "5px",
                    boxShadow: "1px 2px 10px 2px rgba(34, 60, 80, 0.2)",
                  }}
                >
                  {/* First Autocomplete */}
                  <Autocomplete
                    options={top128Filials}
                    sx={{ width: "100%", height: "100%", mb: 2 }}
                    getOptionLabel={(option) => option.title}
                    value={selectedFirstOption}
                    onChange={(event, value) => setSelectedFirstOption(value)}
                    isOptionEqualToValue={(option, value) =>
                      option.title === value?.title
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={t("selectregion")}
                        variant="standard"
                        sx={{
                          "& .MuiInput-underline:before": {
                            borderBottomColor: "transparent",
                          },
                          "& .MuiInput-underline:after": {
                            borderBottomColor: "blue",
                          },
                        }}
                        InputLabelProps={{ style: { color: "black" } }}
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={7} md={4} lg={4} sx={{ padding: "5px" }}>
                <Box
                  sx={{
                    bgcolor: Colors.white,
                    borderRadius: "5px",
                    width: "100%",
                    height: "50px",
                    padding: "5px",
                    boxShadow: "1px 2px 10px 2px rgba(34, 60, 80, 0.2)",
                  }}
                >
                  {/* Second Autocomplete */}
                  <Autocomplete
                    options={secondOptions}
                    sx={{ width: "100%", height: "100%" }}
                    getOptionLabel={(option) => option.title}
                    onChange={(event, value) => setSelectedSecondOptions(value)}
                    value={selectedSecondOptions}
                    isOptionEqualToValue={(option, value) =>
                      option.title === value?.title
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={t("selectfilial")}
                        variant="standard"
                        sx={{
                          "& .MuiInput-underline:before": {
                            borderBottomColor: "transparent",
                          },
                          "& .MuiInput-underline:after": {
                            borderBottomColor: "blue",
                          },
                        }}
                        InputLabelProps={{ style: { color: "black" } }}
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={5} md={3} lg={3} sx={{ padding: "5px" }}>
                <Box
                  sx={{
                    bgcolor: Colors.white,
                    borderRadius: "5px",
                    width: "100%",
                    height: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    boxShadow: "1px 2px 10px 2px rgba(34, 60, 80, 0.2)",
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={selectNewData}
                      onChange={handleDateChange}
                      maxDate={dayjs()}
                      format="DD.MM.YYYY"
                      calendarStartDay={1}
                      shouldDisableDate={shouldDisableDate}
                          sx={{
                            ".MuiOutlinedInput-root": {
                              "& fieldset": {
                                border: "none", // Remove borders if necessary
                              },
                              "&:hover fieldset": {
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
                      //   />
                      // )}
                    />
                  </LocalizationProvider>
                </Box>
              </Grid>
        </Grid> 
        {/* <=== TABLE BODY ===> */}
          <Box sx={{marginTop:"10px",marginBottom:"25px"}}>
                  {/* Table Header Div  */}
                <Grid
                  container
                  sx={{
                    borderBottom: `2px solid ${Colors.gray_back}`,
                    borderRight: `2px solid ${Colors.gray_back}`,
                    height: "85px",
                    // bgcolor: Colors.blue_tableheader_light,
                    position: "sticky",
                    top: 0,
                    borderTopLeftRadius:"8px",
                    borderTopRightRadius:"8px"
                  }}
                >
                  {/* N */}
                  <Grid
                    item
                    xs={0.4}
                    sx={{
                      borderRight: `3px solid ${Colors.gray_back}`,
                      // borderLeft: `2px solid ${Colors.gray_back}`,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.4) inset ",
                      bgcolor: Colors.blue_tableheader_light,
                      borderTopLeftRadius:"5px",
                      borderTopRightRadius:"5px",
                    }}
                  >
                    <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight:"bold",
                        padding:"5px",
                        fontSize:"14px",
                      }}
                    >
                      №
                    </Typography>
                  </Grid>
                    {/* name div  */}
                  <Grid
                    item
                    xs={4.2}
                    sx={{ 
                      borderRight: `3px solid ${Colors.gray_back}`,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontWeight: "bold",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.4) inset ",
                      bgcolor: Colors.blue_tableheader_light,
                      borderTopLeftRadius:"5px",
                      borderTopRightRadius:"5px",
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        px: "5px",
                        overflowWrap: "break-word",
                        wordBreak: "break-all",
                        fontWeight: "bold",
                        padding:"5px",
                      }}
                    >
                      Статьи баланса
                    </Typography>
                  </Grid>
                  {/* equal 1-div */}
                  <Grid
                    item
                    xs={1.2}
                    sx={{
                      borderRight: `2px solid ${Colors.gray_back}`,
                      display: "flex",
                      justifyContent: "center",
                      textAlign: "center",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3) inset ",
                      bgcolor: Colors.blue_tableheader_light,
                      borderTopLeftRadius:"5px",
                      borderTopRightRadius:"5px",
                    }}
                  >
                      <Typography
                      component="span"
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        px: "5px",
                        height: "auto",
                        overflowWrap: "break-word",
                        wordBreak: "break-all",
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding:"5px",
                      }}
                    >
                      в национальной валюте
                    </Typography>
                  </Grid>
                  {/* equal 2-div */}
                  <Grid
                    item
                    xs={1.2}
                    sx={{
                      borderRight: `2px solid ${Colors.gray_back}`,
                      display: "flex",
                      justifyContent: "center",
                      textAlign: "center",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3) inset ",
                      bgcolor: Colors.blue_tableheader_light,
                      borderTopLeftRadius:"5px",
                      borderTopRightRadius:"5px",
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        px: "5px",
                        height: "auto",
                        overflowWrap: "break-word",
                        wordBreak: "break-all",
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding:"5px",
                      }}
                    >
                      (%) соотношение от всего баланса


                    </Typography>
                  </Grid>
                  {/* equal 3-div */}
                  <Grid
                    item
                    xs={1.2}
                    sx={{
                      borderRight: `2px solid ${Colors.gray_back}`,
                      display: "flex",
                      justifyContent: "center",
                      textAlign: "center",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2) inset ",
                      bgcolor:Colors.green_tablerow_light,
                      borderTopLeftRadius:"5px",
                      borderTopRightRadius:"5px",
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        px: "5px",
                        height: "auto",
                        overflowWrap: "break-word",
                        wordBreak: "break-all",
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding:"5px",
                      }}
                    >
                      в иностранной валюте (эквивалент)
                    </Typography>
                  </Grid>
                  {/* equal 4-div */}
                  <Grid
                    item
                    xs={1.2}
                    sx={{
                      borderRight: `2px solid ${Colors.gray_back}`,
                      display: "flex",
                      justifyContent: "center",
                      textAlign: "center",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3) inset ",
                      padding:"5px",
                      bgcolor:Colors.green_tablerow_light,
                      borderTopLeftRadius:"5px",
                      borderTopRightRadius:"5px",
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "auto",
                        overflowWrap: "break-word",
                        wordBreak: "break-all",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      (%) соотношение от всего баланса
                    </Typography>
                  </Grid>
                  {/* equal 5-div */}
                  <Grid
                    item
                    xs={1.3}
                    sx={{
                      borderRight: `2px solid ${Colors.gray_back}`,
                      display: "flex",
                      justifyContent: "center",
                      textAlign: "center",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3) inset ",
                      bgcolor:Colors.green_tablerow_light,
                      borderTopLeftRadius:"5px",
                      borderTopRightRadius:"5px",
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "auto",
                        overflowWrap: "break-word",
                        wordBreak: "break-all",
                        fontSize: "12px",
                        fontWeight: "900",
                        textTransform:"uppercase",
                        padding:"5px",
                      }}
                    >
                      в иностранной валюте (экв. В тыс.дол.США)
                    </Typography>
                  </Grid>
                  {/* equal 6-div */}
                  <Grid
                    item
                    xs={1.2}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      textAlign: "center",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.4) inset ",
                      bgcolor: Colors.blue_tableheader_light,
                      borderTopLeftRadius:"5px",
                      borderTopRightRadius:"5px",
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "auto",
                        overflowWrap: "break-word",
                        wordBreak: "break-all",
                        fontSize: "16px",
                        fontWeight: "bold",
                        textTransform:"uppercase",
                        padding:"5px",
                      }}
                    >
                      ВСЕГО
                    </Typography>
                  </Grid>
                
                </Grid>
                {/* row section */}
                <Grid
                  container
                  sx={{
                    borderBottom: `2px solid ${Colors.gray_back}`,
                    borderRight: `2px solid ${Colors.gray_back}`,
                    height: "50px",
                    // bgcolor: Colors.blue_tableheader_light,
                    top: 0,
                    }}
                >
                  {/* N INDEX */}
                  <Grid
                    item
                    xs={0.4}
                    sx={{
                      borderRight: `3px solid ${Colors.gray_back}`,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      // boxShadow: "0px 1px 6px rgba(0, 0, 0, 0.4) inset ",
                      bgcolor: Colors.white,
                    }}
                  >
                    <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight:"bold",
                        padding:"5px",
                        fontSize:"14px",
                      }}
                    >
                      1.2.3
                    </Typography>
                  </Grid>
                    {/* name div  */}
                  <Grid
                    item
                    xs={4.2}
                    sx={{ 
                      borderRight: `3px solid ${Colors.gray_back}`,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontWeight: "bold",
                      // boxShadow: "0px 1px 6px rgba(0, 0, 0, 0.1) inset ",
                      bgcolor: Colors.white,
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        width: "100%",
                        px: "5px",
                        overflowWrap: "break-word",
                        wordBreak: "break-all",
                        fontWeight: "bold",
                        padding:"5px",
                        fontSize:"13px"
                      }}
                    >
                      Инвестиции в долговые ценные бумаги, удерживаемые до погашения, чистые (15900)

                    </Typography>
                  </Grid>
                  {/* equal 1-div */}
                  <Grid
                    item
                    xs={1.2}
                    sx={{
                      borderRight: `2px solid ${Colors.gray_back}`,
                      display: "flex",
                      justifyContent: "flex-end",
                      textAlign: "center",
                      // boxShadow: "0px 1px 6px rgba(0, 0, 0, 0.4) inset ",
                      bgcolor: Colors.white,
                    }}
                  >
                      <Typography
                      component="span"
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        px: "5px",
                        height: "auto",
                        overflowWrap: "break-word",
                        wordBreak: "break-all",
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding:"5px",
                      }}
                    >
                           816 354.20

                    </Typography>
                  </Grid>
                  {/* equal 2-div */}
                  <Grid
                    item
                    xs={1.2}
                    sx={{
                      borderRight: `2px solid ${Colors.gray_back}`,
                      display: "flex",
                      justifyContent: "flex-end",
                      textAlign: "center",
                      // boxShadow: "0px 1px 6px rgba(0, 0, 0, 0.4) inset ",
                      bgcolor: Colors.white,
                    }}
                  >
                      <Typography
                      component="span"
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        px: "5px",
                        height: "auto",
                        overflowWrap: "break-word",
                        wordBreak: "break-all",
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding:"5px",
                      }}
                    >
                          35,47%
                    </Typography>
                  </Grid>
                  {/* equal 3-div */}
                  <Grid
                    item
                    xs={1.2}
                    sx={{
                      borderRight: `2px solid ${Colors.gray_back}`,
                      display: "flex",
                      justifyContent: "flex-end",
                      textAlign: "center",
                      // boxShadow: "0px 1px 6px rgba(0, 0, 0, 0.4) inset ",
                      bgcolor: Colors.white,
                    }}
                  >
                      <Typography
                      component="span"
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        px: "5px",
                        height: "auto",
                        overflowWrap: "break-word",
                        wordBreak: "break-all",
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding:"5px",
                      }}
                    >
                              1 485 429.20
                    </Typography>
                  </Grid>
                  {/* equal 4-div */}
                  <Grid
                    item
                    xs={1.2}
                    sx={{
                      borderRight: `2px solid ${Colors.gray_back}`,
                      display: "flex",
                      justifyContent: "flex-end",
                      textAlign: "center",
                      // boxShadow: "0px 1px 6px rgba(0, 0, 0, 0.4) inset ",
                      bgcolor: Colors.white,
                    }}
                  >
                      <Typography
                      component="span"
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        px: "5px",
                        height: "auto",
                        overflowWrap: "break-word",
                        wordBreak: "break-all",
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding:"5px",
                      }}
                    >
                          64,53%
                    </Typography>
                  </Grid>
                  {/* equal 5-div */}
                  <Grid
                    item
                    xs={1.3}
                    sx={{
                      borderRight: `2px solid ${Colors.gray_back}`,
                      display: "flex",
                      justifyContent: "flex-end",
                      textAlign: "center",
                      // boxShadow: "0px 1px 6px rgba(0, 0, 0, 0.4) inset ",
                      bgcolor: Colors.white,
                    }}
                  >
                      <Typography
                      component="span"
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        px: "5px",
                        height: "auto",
                        overflowWrap: "break-word",
                        wordBreak: "break-all",
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding:"5px",
                      }}
                    >
                              116 506.54
                    </Typography>
                  </Grid>
                  {/* equal 6-div */}
                  <Grid
                    item
                    xs={1.2}
                    sx={{
                      // borderRight: `2px solid ${Colors.gray_back}`,
                      display: "flex",
                      justifyContent: "flex-end",
                      textAlign: "center",
                      // boxShadow: "0px 1px 6px rgba(0, 0, 0, 0.4) inset ",
                      bgcolor: Colors.white,
                    }}
                  >
                      <Typography
                      component="span"
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        px: "5px",
                        height: "auto",
                        overflowWrap: "break-word",
                        wordBreak: "break-all",
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding:"5px",
                      }}
                    >
                              2 301 783.40
                    </Typography>
                  </Grid>
                
                </Grid>
              
          </Box>
        
    <Footer />
  </Container>
  )
}

export default BalanceTable