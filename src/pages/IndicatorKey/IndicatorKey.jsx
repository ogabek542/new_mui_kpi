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
import Autocomplete from "@mui/material/Autocomplete";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";

// change language function //
const changeLang = (value) => {
  i18n.changeLanguage(value);
};
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const IndicatorKey = () => {


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

   // Example holidays (add your holidays here)
   const holidays = [
    dayjs("01.01.2024"), // New Year's Day
    dayjs("02.01.2024"), // New Year's Day
    dayjs("08.03.2024"), // Women's Day
    dayjs("11.03.2024"), // Ramazan Day
    dayjs("21.03.2024"), // Navruz Happy Day
    dayjs("22.03.2024"), // Navruz Happy Day
    dayjs("23.03.2024"), // Navruz Happy Day
    dayjs("10.04.2024"), // Eid Al Fitr Day
    dayjs("11.04.2024"), // Eid Al Fitr Day
    dayjs("12.04.2024"), // Eid Al Fitr Day
    dayjs("09.05.2024"), // Remember Day
    dayjs("16.06.2024"), // Eid Al Adha Day
    dayjs("17.06.2024"), // Eid Al Adha Day
    dayjs("18.06.2024"), // Eid Al Adha Day
    dayjs("31.08.2024"), // Independence Day
    dayjs("01.09.2024"), // Independence Day
    dayjs("02.09.2024"), // Independence Day
    dayjs("03.09.2024"), // Independence Day
    dayjs("12.08.2024"), // Constitution Day
    dayjs("01.10.2024"), // Constitution Day
    dayjs("09.12.2024"), // Happy New Year Day
    dayjs("30.12.2024"), // Happy New Year Day
    dayjs("31.12.2024"), // Happy New Year Day
    // Add more holidays as needed
  ];



    // Function to disable weekends and holidays
    const shouldDisableDate = (date) => {
      // Disable holidays
      const isHoliday = holidays.some((holiday) => date.isSame(holiday, "day"));
      return isHoliday;
    };


  const changeLang = (value) => {
    i18n.changeLanguage(value)
  }
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [newdata, setNewData] = useState(dayjs());
    // const [selectNewData, setSelectNewData] = useState(dayjs());
    const [loading, setLoading] = useState(true); // State to track loading
    const [selectNewData, setSelectNewData] = useState(dayjs("29.07.2024", "DD.MM.YYYY"));
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
    setNewData(newValue); // Update the selected date
    console.log(newValue);
  };

  const handleNavigateKeyIndicators = () => { 
    // navigate("/keyindicatorscreen");
    navigate("/keyindicatorscreen");
  };
  const handleNavigateBalanceScreen = () => { 
    navigate("/balancescreen");
  };

  // Use useEffect to call handleDateChange whenever selectNewData changes
  useEffect(() => {
    // handleDateChange(newdata);
    // GET zapros qilinadi
    // url?date=`${newdata}`
    // response
    // [ {date1: ,data1: [] date2:, } ]
  }, [newdata]);

  // useEffect(() => {
  //   const fetchGraphicData = async () => {
  //     if (!selectedDate) return; // Do not fetch if no date is selected

  //     try {
  //       // Format the date based on how your API expects it.
  //       const formattedDate = selectedDate.format("DD-MM-YYYY"); 
        
  //       // Fetch data using your REQUESTS object with the formatted date as a parameter
  //       const response = await REQUESTS.mainCalendarScreen.getMainCalendarScreen({
  //         params: { date: formattedDate },
  //       });

  //       // Handle the API response, assuming the data is in `response.data`
  //       const calendarIndicators = response.data;
        
  //       // Update the component state with the fetched data
  //       setChooseData(calendarIndicators);
  //       console.log(response, "New Fetched data");
  //     } catch (error) {
  //       console.error("Error fetching graphic indicator data:", error);

  //       // Handle specific error cases (like 404, network issues, etc.)
  //       if (error.response && error.response.status === 404) {
  //         console.error(
  //           "Endpoint not found. Please check the URL or backend configuration."
  //         );
  //       } else {
  //         console.error("An error occurred:", error.message);
  //       }
  //     }
  //   };

  //   fetchGraphicData();
  // }, [selectedDate]); // Depend on selectedDate

  const insertSpaces = (text) => {
    if (!text) return ""; // Handle empty or undefined text
  
    // Convert to string and ensure no more than 6 characters
    const str = text.toString()
  
    // Add spaces every 3 digits
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
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
      <LightHeader
      />
     {/* main title section */}
     <Box
        sx={{
          height: "50px",
          borderRadius: "5px",
          bgcolor: "transparent",
          marginY: "10px",
          display: "flex",
          alignItems: "center",
          paddingY: "5px",
          paddingX: "10px",
        }}
      >
        <Box sx={{borderRadius:"8px",bgcolor:Colors.white,width:"100%",height:"auto",paddingY:"10px"}}>
          <Typography sx={{fontWeight:"bold",textTransform:"uppercase",paddingLeft:"6px"}}>
          Основные показатели деятельности Национального банка Внешнеэкономической деятельности Республики Узбекистан по состоянию на 17.09.2024 года											
          </Typography>

        </Box>
      </Box>
        {/* Header items div */}
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

   
      <Box  sx={{ marginY: "10px",position:"relative",width:"100%" }}>
          {/* GRID HEADER SECTION */}

          {/* <== gird  HEADER SECTION ==> */}
          
          <Grid
            container
            sx={{
              borderBottom: `2px solid ${Colors.gray_back}`,
              borderRight: `2px solid ${Colors.gray_back}`,
              // width: "98.7%",
              height: "90px",
              bgcolor: Colors.blue_tableheader_light,
              position: "sticky",
              top: 0,
            }}
          >
            <Grid
              item
              xs={0.5}
              sx={{
                borderRight: `2px solid ${Colors.gray_back}`,
                borderLeft: `2px solid ${Colors.gray_back}`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight:"bold"
                }}
              >
                №
              </Typography>
            </Grid>
            <Grid
              item
              xs={2}
              sx={{ 
                borderRight: `2px solid ${Colors.gray_back}`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
              }}
            >
               <Typography
                component="span"
                sx={{
                  fontStyle: "uppercase",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  px: "5px",
                  overflowWrap: "break-word",
                  wordBreak: "break-all",
                  fontWeight: "bold",
                }}
              >
                Статьи баланса
              </Typography>
            </Grid>
            {/* date div */}
            <Grid
              item
              xs={1.1}
              sx={{
                borderRight: `2px solid ${Colors.gray_back}`,
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <Typography
                component="span"
                sx={{
                  fontStyle: "uppercase",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  px: "5px",
                  height: "auto",
                  overflowWrap: "break-word",
                  wordBreak: "break-all",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                1/1/2024
              </Typography>
            </Grid>
            {/* date div */}
            <Grid
              item
              xs={1.1}
              sx={{
                borderRight: `2px solid ${Colors.gray_back}`,
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <Typography
                component="span"
                sx={{
                  fontStyle: "uppercase",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  px: "5px",
                  height: "auto",
                  overflowWrap: "break-word",
                  wordBreak: "break-all",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                9/1/2024
              </Typography>
            </Grid>
            {/* date div */}
            <Grid
              item
              xs={1.1}
              sx={{
                borderRight: `2px solid ${Colors.gray_back}`,
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <Typography
                component="span"
                sx={{
                  fontStyle: "uppercase",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  px: "5px",
                  height: "auto",
                  overflowWrap: "break-word",
                  wordBreak: "break-all",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                9/16/2024
              </Typography>
            </Grid>
            {/* date div */}
            <Grid
              item
              xs={1.1}
              sx={{
                borderRight: `2px solid ${Colors.gray_back}`,
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <Typography
                component="span"
                sx={{
                  fontStyle: "uppercase",
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
                9/16/2024
              </Typography>
            </Grid>
            {/* protsent summa div */}
            <Grid
              item
              xs={1.7}
              sx={{
                borderRight: `2px solid ${Colors.gray_back}`,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "62%",
                  borderBottom: `2px solid ${Colors.gray_back}`,
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    fontStyle: "uppercase",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    // px: "5px",
                    height: "auto",
                    // overflowWrap: "break-word",
                    // wordBreak: "break-all",

                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  Изменения с начала года
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  height: "38%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                    width: "50%",
                    height:"100%",
                    borderRight: `2px solid ${Colors.gray_back}`,
                  }}
                >
                  <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                    в сумах
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                    width: "50%",
                    height:"100%",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                    в процентах
                  </Typography>
                </Box>
              </Box>
            </Grid>
            {/* protsent summa div */}
            <Grid
              item
              xs={1.7}
              sx={{
                borderRight: `2px solid ${Colors.gray_back}`,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderBottom: `2px solid ${Colors.gray_back}`,
                  height: "62%",
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    fontStyle: "uppercase",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    // px: "5px",
                    height: "auto",
                    // overflowWrap: "break-word",
                    // wordBreak: "break-all",

                    textAlign: "center",
                    lineHeight: "1.2",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  Изменения с начала месяца
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  height: "38%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                    width: "50%",
                    height:"100%",
                    borderRight: `2px solid ${Colors.gray_back}`,
                  }}
                >
                  <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                    в сумах
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                    width: "50%",
                    height:"100%",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                    в процентах
                  </Typography>
                </Box>
              </Box>
            </Grid>
            {/* protsent summa div */}
            <Grid
              item
              xs={1.7}
              sx={{
                // borderRight: "1px solid #000",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderBottom: `2px solid ${Colors.gray_back}`,
                  height: "62%",
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    fontStyle: "uppercase",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    // px: "5px",
                    height: "auto",
                    textAlign: "center",
                    lineHeight: "1.2",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  Изменения за предыдущий день
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  height: "38%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                    width: "50%",
                    height:"100%",
                    borderRight: `2px solid ${Colors.gray_back}`,
                  }}
                >
                  <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                    в сумах
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                    width: "50%",
                    height:"100%"
                  }}
                >
                  <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                    в процентах
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>


          {/* 1 1-reow */}
          <Grid
            container
            sx={{
              borderBottom: `2px solid ${Colors.gray_back}`,
              borderRight: `2px solid ${Colors.gray_back}`,
              height: "85px",
              bgcolor: Colors.gray_footer,
            }}
          >
            <Grid
              item
              xs={0.5}
              sx={{
                borderRight: `2px solid ${Colors.gray_back}`,
                borderLeft: `2px solid ${Colors.gray_back}`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  fontSize:"14px",
                }}
              >
                1
              </Typography>
            </Grid>
            <Grid
              item
              xs={2}
              sx={{
                borderRight: `2px solid ${Colors.gray_back}`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
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
                  height: "auto",
                  overflowWrap: "break-word",
                  wordBreak: "break-all",
                  fontWeight: "bold",
                  fontSize:"14px",
                }}
              >
               Начисленные проценты к получению, возмещаемые за счет субсидий Гос. Бюджета (16325+16327)
              </Typography>
            </Grid>
            {/* date div */}
            <Grid
              item
              xs={1.1}
              sx={{
                borderRight: `2px solid ${Colors.gray_back}`,
                display: "flex",
                justifyContent: "end",
                textAlign: "center",
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
                }}
              >
                {insertSpaces(127502890.49)}
              </Typography>
            </Grid>
            {/* date div */}
            <Grid
              item
              xs={1.1}
              sx={{
                borderRight: `2px solid ${Colors.gray_back}`,
                display: "flex",
                justifyContent: "end",
                textAlign: "center",
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
                }}
              >
               {insertSpaces(135798589.41)}
              </Typography>
            </Grid>
            {/* date div */}
            <Grid
              item
              xs={1.1}
              sx={{
                borderRight: `2px solid ${Colors.gray_back}`,
                display: "flex",
                justifyContent: "end",
                textAlign: "center",
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
                }}
              >
                {insertSpaces( 137240940.28)}
              </Typography>
            </Grid>
            {/* date div */}
            <Grid
              item
              xs={1.1}
              sx={{
                borderRight: `2px solid ${Colors.gray_back}`,
                display: "flex",
                justifyContent: "end",
                textAlign: "center",
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
                }}
              >
               {insertSpaces(137759743.51)}
              </Typography>
            </Grid>
            {/* protsent summa div */}
            <Grid
              item
              xs={1.7}
              sx={{
                borderRight: `2px solid ${Colors.gray_back}`,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                    fontWeight: "bold",
                    width: "50%",
                    borderRight: `2px solid ${Colors.gray_back}`,
                    height: "100%",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                  {insertSpaces(137759743.51)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "bold",
                    width: "50%",
                    height: "100%",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                  {insertSpaces(108.04)}%
                  </Typography>
                </Box>
              </Box>
            </Grid>
            {/* protsent summa div */}
            <Grid
              item
              xs={1.7}
              sx={{
                borderRight: `2px solid ${Colors.gray_back}`,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "bold",
                    width: "50%",
                    borderRight: `2px solid ${Colors.gray_back}`,
                    height: "100%",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                  {insertSpaces(1961154.10)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "bold",
                    width: "50%",
                    height: "100%",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                  {insertSpaces(101.44)}%
                  </Typography>
                </Box>
              </Box>
            </Grid>
            {/* protsent summa div */}
            <Grid
              item
              xs={1.7}
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "bold",
                    width: "50%",
                    borderRight: `2px solid ${Colors.gray_back}`,
                    height: "100%",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                  {insertSpaces(518803.23)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "bold",
                    width: "50%",
                    height: "100%",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                  {insertSpaces(100.38)}%
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          {/* 2 2-row */}
          <Grid
            container
            sx={{
              borderBottom: `2px solid ${Colors.gray_back}`,
              borderRight: `2px solid ${Colors.gray_back}`,
              height: "85px",
              bgcolor: Colors.gray_footer,
            }}
          >
            <Grid
              item
              xs={0.5}
              sx={{
                borderRight: `2px solid ${Colors.gray_back}`,
                borderLeft: `2px solid ${Colors.gray_back}`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  fontSize:"14px",
                }}
              >
                1
              </Typography>
            </Grid>
            <Grid
              item
              xs={2}
              sx={{
                borderRight: `2px solid ${Colors.gray_back}`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
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
                  height: "auto",
                  overflowWrap: "break-word",
                  wordBreak: "break-all",
                  fontWeight: "bold",
                  fontSize:"14px",
                }}
              >
               Начисленные проценты к получению, возмещаемые за счет субсидий Гос. Бюджета (16325+16327)
              </Typography>
            </Grid>
            {/* date div */}
            <Grid
              item
              xs={1.1}
              sx={{
                borderRight: `2px solid ${Colors.gray_back}`,
                display: "flex",
                justifyContent: "end",
                textAlign: "center",
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
                }}
              >
                {insertSpaces(127502890.49)}
              </Typography>
            </Grid>
            {/* date div */}
            <Grid
              item
              xs={1.1}
              sx={{
                borderRight: `2px solid ${Colors.gray_back}`,
                display: "flex",
                justifyContent: "end",
                textAlign: "center",
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
                }}
              >
               {insertSpaces(135798589.41)}
              </Typography>
            </Grid>
            {/* date div */}
            <Grid
              item
              xs={1.1}
              sx={{
                borderRight: `2px solid ${Colors.gray_back}`,
                display: "flex",
                justifyContent: "end",
                textAlign: "center",
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
                }}
              >
               {insertSpaces( 137240940.28)}
              </Typography>
            </Grid>
            {/* date div */}
            <Grid
              item
              xs={1.1}
              sx={{
                borderRight: `2px solid ${Colors.gray_back}`,
                display: "flex",
                justifyContent: "end",
                textAlign: "center",
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
                }}
              >
               {insertSpaces(137759743.51)}
              </Typography>
            </Grid>
            {/* protsent summa div */}
            <Grid
              item
              xs={1.7}
              sx={{
                borderRight: `2px solid ${Colors.gray_back}`,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                    fontWeight: "bold",
                    width: "50%",
                    borderRight: `2px solid ${Colors.gray_back}`,
                    height: "100%",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                  {insertSpaces(137759743.51)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "bold",
                    width: "50%",
                    height: "100%",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                  {insertSpaces(108.04)}%
                  </Typography>
                </Box>
              </Box>
            </Grid>
            {/* protsent summa div */}
            <Grid
              item
              xs={1.7}
              sx={{
                borderRight: `2px solid ${Colors.gray_back}`,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "bold",
                    width: "50%",
                    borderRight: `2px solid ${Colors.gray_back}`,
                    height: "100%",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                  {insertSpaces(1961154.10)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "bold",
                    width: "50%",
                    height: "100%",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                  {insertSpaces(101.44)}%
                  </Typography>
                </Box>
              </Box>
            </Grid>
            {/* protsent summa div */}
            <Grid
              item
              xs={1.7}
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "bold",
                    width: "50%",
                    borderRight: `2px solid ${Colors.gray_back}`,
                    height: "100%",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                  {insertSpaces(518803.23)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "bold",
                    width: "50%",
                    height: "100%",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                  {insertSpaces(100.38)}%
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
      </Box>
      <Footer />
    </Container>
  );
}

export default IndicatorKey