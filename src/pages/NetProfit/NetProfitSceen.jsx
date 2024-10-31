import React, { useEffect, useState } from "react";
import { Container, Box, Grid, Typography, Divider,  } from "@mui/material";
import { Colors } from "../../styles/theme";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import LightHeader from "../../components/LightHeader/LightHeader";
import Footer from "../../components/Footer/Footer";
import NoIncomeLineChart from "../../components/LineChart/LineChart.jsx";
import NewLineChart from "../../components/NewLineChart/NewLineChart";
import OpenHorizontalBarChart from "../../components/OpenHorizontalBar/OpenHorizontalBar";
import HorizontalCostBarChart from "../../components/HorizontalBarchart/HorizontalBarchart.jsx";
import OpenDoughnutChart from "../../components/OperDroughtBar/OpenDroughtBar";
import OpenVerticalGroupBarChart from "../../components/OpenVerticalGroupBarchart/OpenVerticalBarChart";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import "dayjs/locale/ru";
import { REQUESTS } from "../../api/requests.js";
import MovingIcon from "@mui/icons-material/Moving";
import { useTranslation } from "react-i18next";
// import testData from "../testapi/testDataAll.jsx";
// for holidays data //
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
// <== IMPORT LOADER ====> //

import {HashLoader} from 'react-spinners';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const NetProfitSceen = ({ changeLang }) => {
  const { t } = useTranslation();

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
  const [formapData, setFormapData] = useState([]);

  useEffect(() => {
    if (selectedFirstOption && selectedFirstOption.id) {
      setSecondOptions(setSelectedSecondMap[selectedFirstOption.id] || []);
      setSelectedSecondOptions(null); // Reset the second option
    } else {
      setSecondOptions([]);
    }
  }, [selectedFirstOption]);

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

  const handleDateChange = (newValue) => {
    setSelectNewData(newValue);
  };

  const formattedDate = dayjs(selectNewData).format("DD.MM.YYYY");

  const insertSpaces = (text) => {
    if (!text) return "";
    return text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
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
        // console.log(response, "Fetched data All Income");
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

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        px: "10px",
        bgcolor: Colors.gray_back,
        width: "100%",
        maxWidth: "100vw",
        "@media (min-width: 1920px)": {
          maxWidth: "100%",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          height: "auto",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <LightHeader />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
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

          {loading ? ( <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "40vh",
                  }}
                >
                  <HashLoader
                    color={Colors.blue_tableheader_light}
                    loading={loading}
                    size={100}
                  />
                </Box>) : (

                  chooseData.flatMap((item, index) =>
                    item.sana
                      ?.filter((sanaItem) => sanaItem.date === formattedDate)
                      .map((sanaItem, idx) => (
                        <Box
                          key={`${index}-${idx}`}
                          sx={{ width: "100%", height: "100%", marginTop: "5px" }}
                        >
                          {/* {sanaItem.date} */}
                          {/* <=== first grid div ====> */}
                          <Grid container sx={{ width: "100%", height: "200px" }}>
                            {/* first number div */}
                            
                            <Grid item xs={5} md={5} lg={4} sx={{ padding: "5px" }}>
                              {sanaItem?.cleanProfit ? (
                                <Box
                                  sx={{
                                    bgcolor: Colors.white,
                                    borderRadius: "5px",
                                    width: "100%",
                                    height: "100%",
                                    padding: "5px",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "5px",
                                    boxShadow:
                                      "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                                    WebkitBoxShadow:
                                      "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                                    MozBoxShadow:
                                      "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      fontWeight: "700",
                                      fontSize: "13px",
                                      color: Colors.dark,
                                      textAlign: "start",
                                      textTransform: "uppercase",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap", // Ensures text does not wrap and is cut off with ellipsis if overflowed
                                      textShadow: "0.5px 0.5px 2px gray",
                                    }}
                                  >
                                    {t("cleanincommain")}
                                  </Typography>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "space-evenly",
                                    }}
                                  >
                                    {/* Left side of text box */}
                                    <Box
                                      sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "flex-end", // Aligns the content to the bottom
                                        alignItems: "center",
                                        gap: "5px",
                                        height: "100%", // Ensure the parent Box has a height to push content to the bottom
                                      }}
                                    >
                                      <Typography
                                        sx={{
                                          fontSize: "64px", // 112px
                                          fontWeight: "800",
                                          textAlign: "start",
                                          overflow: "hidden",
                                          textOverflow: "ellipsis",
                                          whiteSpace: "nowrap",
                                          textShadow: "2px 2px 5px gray",
                                        }}
                                      >
                                        {sanaItem.cleanProfit?.netProfitData
                                          ? insertSpaces(
                                              Math.round(
                                                sanaItem.cleanProfit.netProfitData
                                              )
                                            )
                                          : "0"}
                                      </Typography>
                                    </Box>
                                    {/* Right side of text box */}
                                    <Box
                                      sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "5px",
                                        alignItems: "center",
                                      }}
                                    >
                                      {/* Icon on the right side */}
                                      <MovingIcon
                                        sx={{
                                          color:
                                            sanaItem.cleanProfit?.netPercentageData <=
                                            100
                                              ? Colors.red
                                              : Colors.green_dark,
                                          fontSize: "48px",
                                          padding: "0px",
                                          transform:
                                            sanaItem.cleanProfit.netPercentageData <=
                                            100
                                              ? "rotate(180deg)"
                                              : "rotate(0deg)",
                                          transition: "transform 0.3s ease",
                                        }}
                                      />
                                      {/* Percentage text on the right side */}
                                      <Typography
                                        sx={{
                                          fontSize: "40px",
                                          overflow: "hidden",
                                          textOverflow: "ellipsis",
                                          whiteSpace: "nowrap",
                                          fontWeight: "600",
                                        }}
                                      >
                                        {sanaItem.cleanProfit?.netPercentageData ||
                                          "нет информации"}
                                        %
                                      </Typography>
                                    </Box>
                                  </Box>
                                </Box>
                              ) : (
                                <Typography
                                  sx={{
                                    fontWeight: "800",
                                    textTransform: "uppercase",
                                    color: "red",
                                  }}
                                >
                                  No Data Available
                                </Typography>
                              )}
                            </Grid>

                            {/* second number div */}
                            <Grid item xs={5} md={5} lg={4} sx={{ padding: "5px" }}>
                              <Box
                                sx={{
                                  bgcolor: Colors.white,
                                  borderRadius: "5px",
                                  width: "100%",
                                  height: "100%",
                                  padding: "5px",
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "5px",
                                  boxShadow:
                                    "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                                  WebkitBoxShadow:
                                    "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                                  MozBoxShadow:
                                    "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontWeight: "700",
                                    fontSize: "13px",
                                    color: Colors.dark,
                                    textAlign: "start",
                                    textTransform: "uppercase",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap", // Ensures text does not wrap and is cut off with ellipsis if overflowed
                                    textShadow: "0.5px 0.5px 2px gray",
                                  }}
                                >
                                  {t("cleanpercentagevalues")}
                                </Typography>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-evenly",
                                    height: "100%",
                                  }}
                                >
                                  {/* Left side Doxod */}
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "column",
                                      height: "auto",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-evenly",
                                      }}
                                    >
                                      {/* Left side of BIG text box */}
                                      <Box
                                        sx={{
                                          display: "flex",
                                          flexDirection: "column",
                                          justifyContent: "flex-end", // Aligns the content to the bottom
                                          alignItems: "center",
                                          gap: "5px",
                                          height: "100%", // Ensure the parent Box has a height to push content to the bottom
                                        }}
                                      >
                                        <Typography
                                          sx={{
                                            fontSize: "32px",
                                            fontWeight: "900",
                                            textAlign: "start",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                            textShadow: "0.5px 0.5px 2px gray",
                                          }}
                                        >
                                          {/* {insertSpaces(item.cleanPercentageIncome.netSoftProfitData) || "нет информации"} */}
                                          {sanaItem.cleanPercentageIncome
                                            .netSoftProfitData
                                            ? insertSpaces(
                                                Math.round(
                                                  sanaItem.cleanPercentageIncome
                                                    .netSoftProfitData
                                                )
                                              )
                                            : "нет информации"}
                                        </Typography>
                                      </Box>
                                      {/* Right side of text box */}
                                      <Box
                                        sx={{
                                          display: "flex",
                                          flexDirection: "column",
                                          gap: "5px",
                                          alignItems: "center",
                                        }}
                                      >
                                        {/* Icon on the right side */}
                                        <MovingIcon
                                          sx={{
                                            color:
                                              sanaItem.cleanPercentageIncome
                                                .netSoftPercentageData <= 100
                                                ? Colors.red
                                                : Colors.green_dark,
                                            fontSize: "24px",
                                            padding: "0px",
                                            transform:
                                              sanaItem.cleanPercentageIncome
                                                .netSoftPercentageData <= 100
                                                ? "rotate(180deg)"
                                                : "rotate(0deg)",
                                            transition: "transform 0.3s ease",
                                          }}
                                        />
                                        {/* Percentage text on the right side */}
                                        <Typography
                                          sx={{
                                            fontSize: "18px",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                            fontWeight: "600",
                                          }}
                                        >
                                          {sanaItem.cleanPercentageIncome
                                            .netSoftPercentageData ||
                                            "нет информации"}
                                          %
                                        </Typography>
                                      </Box>
                                    </Box>
                                  </Box>

                                  {/* Divider */}
                                  <Divider
                                    orientation="vertical"
                                    variant="middle"
                                    flexItem
                                    sx={{
                                      width: "3px", // Sets the width of the divider
                                      backgroundColor: Colors.gray_back, // Sets the color of the divider
                                      margin: "0 10px", // Optional: Adds some space around the divider
                                    }}
                                  />
                                  {/* right side Rosxod */}
                                  {sanaItem?.cleanNoPercentageIncome ? (
                                    <Box
                                      sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        height: "auto",
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "space-evenly",
                                        }}
                                      >
                                        {/* Left side of BIG text box */}
                                        <Box
                                          sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "flex-end", // Aligns the content to the bottom
                                            alignItems: "center",
                                            gap: "5px",
                                            height: "100%", // Ensure the parent Box has a height to push content to the bottom
                                          }}
                                        >
                                          <Typography
                                            sx={{
                                              fontSize: "32px",
                                              fontWeight: "900",
                                              textAlign: "start",
                                              overflow: "hidden",
                                              textOverflow: "ellipsis",
                                              whiteSpace: "nowrap",
                                              textShadow: "0.5px 0.5px 2px gray",
                                            }}
                                          >
                                            {/* {insertSpaces(item.cleanNoPercentageIncome.netSoftNoProfitData)|| "нет информации"} */}
                                            {sanaItem.cleanNoPercentageIncome
                                              ?.netSoftNoProfitData
                                              ? insertSpaces(
                                                  Math.round(
                                                    sanaItem.cleanNoPercentageIncome
                                                      .netSoftNoProfitData
                                                  )
                                                )
                                              : "нет информации"}
                                          </Typography>
                                        </Box>
                                        {/* Right side of text box */}
                                        <Box
                                          sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "5px",
                                            alignItems: "center",
                                          }}
                                        >
                                          {/* Icon on the right side */}
                                          <MovingIcon
                                            sx={{
                                              color:
                                                sanaItem.cleanNoPercentageIncome
                                                  ?.netSoftNoPercentageData <= 100
                                                  ? Colors.red
                                                  : Colors.green_dark,
                                              fontSize: "24px",
                                              padding: "0px",
                                              transform:
                                                sanaItem.cleanNoPercentageIncome
                                                  ?.netSoftNoPercentageData <= 100
                                                  ? "rotate(180deg)"
                                                  : "rotate(0deg)",
                                              transition: "transform 0.3s ease",
                                            }}
                                          />
                                          {/* Percentage text on the right side */}
                                          <Typography
                                            sx={{
                                              fontSize: "18px",
                                              overflow: "hidden",
                                              textOverflow: "ellipsis",
                                              whiteSpace: "nowrap",
                                              fontWeight: "600",
                                            }}
                                          >
                                            {sanaItem.cleanNoPercentageIncome
                                              ?.netSoftNoPercentageData ||
                                              "нет информации"}
                                            %
                                          </Typography>
                                        </Box>
                                      </Box>
                                    </Box>
                                  ) : (
                                    <Typography
                                      sx={{
                                        fontWeight: "800",
                                        textTransform: "uppercase",
                                        color: "red",
                                      }}
                                    >
                                      No Data Available
                                    </Typography>
                                  )}
                                </Box>
                              </Box>
                            </Grid>
                            {/* third number div */}
                            <Grid item xs={5} md={5} lg={4} sx={{ padding: "5px" }}>
                              {sanaItem?.cirProfir ? (
                                <Box
                                  sx={{
                                    bgcolor: Colors.white,
                                    borderRadius: "5px",
                                    width: "100%",
                                    height: "100%",
                                    padding: "5px",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "5px",
                                    boxShadow:
                                      "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                                    WebkitBoxShadow:
                                      "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                                    MozBoxShadow:
                                      "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      fontWeight: "800",
                                      fontSize: "20px",
                                      color: Colors.dark,
                                      textAlign: "start",
                                      textTransform: "uppercase",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap", // Ensures text does not wrap and is cut off with ellipsis if overflowed
                                      textShadow: "0.5px 0.5px 2px gray",
                                    }}
                                  >
                                    CIR
                                  </Typography>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center", // Center the content vertically
                                      height: "100%", // Ensure the Box takes the full height of the viewport
                                    }}
                                  >
                                    {/* Inner Box to center content */}
                                    <Box
                                      sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center", // Center the content vertically
                                        alignItems: "center", // Center the content horizontally
                                        textAlign: "center",
                                        gap: "5px",
                                        width: "100%", // Optional: Ensures full width for content centering
                                      }}
                                    >
                                      <Typography
                                        sx={{
                                          fontSize: "96px",
                                          fontWeight: "900",
                                          textAlign: "center",
                                          overflow: "hidden",
                                          textOverflow: "ellipsis",
                                          whiteSpace: "nowrap",
                                          textShadow: "4px 4px 4px gray",
                                        }}
                                      >
                                        {Math.round(
                                          sanaItem.cirProfir?.cirPercentageDate * -100
                                        ) || "0"}{" "}
                                        %
                                      </Typography>
                                    </Box>
                                  </Box>
                                </Box>
                              ) : (
                                <Typography
                                  sx={{
                                    fontWeight: "800",
                                    textTransform: "uppercase",
                                    color: "red",
                                  }}
                                >
                                  No Data Available
                                </Typography>
                              )}
                            </Grid>
                          </Grid>
                          {/*<==== second grid div ====>*/}
                          <Grid container sx={{ width: "100%", height: "250px" }}>
                            {/* left side */}
                            <Grid item xs={5} md={5} lg={6} sx={{ padding: "5px" }}>
                              {sanaItem?.interestIncome ? (
                                <Box
                                  sx={{
                                    bgcolor: Colors.white,
                                    borderRadius: "5px",
                                    width: "100%",
                                    height: "100%",
                                    padding: "5px",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "5px",
                                    boxShadow:
                                      "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                                    WebkitBoxShadow:
                                      "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                                    MozBoxShadow:
                                      "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      fontWeight: "700",
                                      fontSize: "14px",
                                      color: Colors.dark,
                                      textAlign: "start",
                                      textTransform: "uppercase",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap", // Ensures text does not wrap and is cut off with ellipsis if overflowed
                                    }}
                                  >
                                    {t("percentageincome")}{" "}
                                  </Typography>
                                  <Box sx={{ width: "100%", height: "auto" }}>
                                    <NewLineChart
                                      planData={
                                        sanaItem.interestIncome?.planData || []
                                      }
                                      factData={
                                        sanaItem.interestIncome?.factData || []
                                      }
                                    />
                                  </Box>
                                </Box>
                              ) : (
                                <Typography
                                  sx={{
                                    fontWeight: "800",
                                    textTransform: "uppercase",
                                    color: "red",
                                  }}
                                >
                                  No Data Available
                                </Typography>
                              )}
                            </Grid>
                            {/* right side */}
                            <Grid item xs={7} md={7} lg={6} sx={{ padding: "5px" }}>
                              {sanaItem?.nointerestIncome ? (
                                <Box
                                  sx={{
                                    bgcolor: Colors.white,
                                    borderRadius: "5px",
                                    width: "100%",
                                    height: "100%",
                                    padding: "5px",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "5px",
                                    boxShadow:
                                      "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                                    WebkitBoxShadow:
                                      "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                                    MozBoxShadow:
                                      "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      fontWeight: "700",
                                      fontSize: "14px",
                                      color: Colors.dark,
                                      textAlign: "start",
                                      textTransform: "uppercase",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap", // Ensures text does not wrap and is cut off with ellipsis if overflowed
                                    }}
                                  >
                                    {t("nopercentageincome")}
                                  </Typography>
                                  <Box sx={{ width: "100%", height: "auto" }}>
                                    <NoIncomeLineChart
                                      planData={
                                        sanaItem.nointerestIncome?.planData || []
                                      }
                                      factData={
                                        sanaItem.nointerestIncome?.factData || []
                                      }
                                    />
                                  </Box>
                                </Box>
                              ) : (
                                <Typography
                                  sx={{
                                    fontWeight: "800",
                                    textTransform: "uppercase",
                                    color: "red",
                                  }}
                                >
                                  No Data Available
                                </Typography>
                              )}
                            </Grid>
                          </Grid>
                          {/*<==== third grid div ====>*/}
                          <Grid container sx={{ width: "100%", height: "400px" }}>
                            {/* left side of third div */}
                            <Grid
                              item
                              xs={6}
                              md={6}
                              lg={6}
                              sx={{ padding: "5px", height: "auto" }}
                            >
                              {sanaItem?.interestCost ? (
                                <Box
                                  sx={{
                                    bgcolor: Colors.white,
                                    borderRadius: "5px",
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "10px",
                                    padding: "5px",
                                    boxShadow:
                                      "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                                    WebkitBoxShadow:
                                      "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                                    MozBoxShadow:
                                      "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                                  }}
                                >
                                  {/* topside text of third div */}
                                  <Typography
                                    sx={{
                                      fontWeight: "700",
                                      fontSize: "14px",
                                      color: Colors.dark,
                                      textAlign: "start",
                                      textTransform: "uppercase",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap", // Ensures text does not wrap and is cut off with ellipsis if overflowed
                                    }}
                                  >
                                    {t("costpercentage")}
                                  </Typography>
                                  {/* Bottom side box of third div */}
                                  <Box sx={{ width: "100%", height: "350px" }}>
                                    <HorizontalCostBarChart
                                      planData={sanaItem.interestCost?.planData || []}
                                      factData={sanaItem.interestCost?.factData || []}
                                    />
                                  </Box>
                                </Box>
                              ) : (
                                <Typography
                                  sx={{
                                    fontWeight: "800",
                                    textTransform: "uppercase",
                                    color: "red",
                                  }}
                                >
                                  No Data Available
                                </Typography>
                              )}
                            </Grid>
                            {/* right side of third div */}
                            <Grid item xs={6} md={6} lg={6} sx={{ padding: "5px" }}>
                              {sanaItem?.nointerestCost ? (
                                <Box
                                  sx={{
                                    bgcolor: Colors.white,
                                    borderRadius: "5px",
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "10px",
                                    padding: "5px",
                                    boxShadow:
                                      "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                                    WebkitBoxShadow:
                                      "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                                    MozBoxShadow:
                                      "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                                  }}
                                >
                                  {/* topside text of third div */}
                                  <Typography
                                    sx={{
                                      fontWeight: "700",
                                      fontSize: "14px",
                                      color: Colors.dark,
                                      textAlign: "start",
                                      textTransform: "uppercase",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap", // Ensures text does not wrap and is cut off with ellipsis if overflowed
                                    }}
                                  >
                                    {t("costnopercentage")}
                                  </Typography>
                                  {/* Bottom side box of third div */}
                                  <Box sx={{ width: "100%", height: "350px" }}>
                                    <OpenHorizontalBarChart
                                      planData={
                                        sanaItem.nointerestCost?.planData || []
                                      }
                                      factData={
                                        sanaItem.nointerestCost?.factData || []
                                      }
                                    />
                                  </Box>
                                </Box>
                              ) : (
                                <Typography
                                  sx={{
                                    fontWeight: "800",
                                    textTransform: "uppercase",
                                    color: "red",
                                  }}
                                >
                                  No Data Available
                                </Typography>
                              )}
                            </Grid>
                          </Grid>
                          {/*<==== fourth grid div ====>*/}
                          <Grid container sx={{ width: "100%", height: "260px" }}>
                            {/* left side */}
                            <Grid item xs={5} md={5} lg={5} sx={{ padding: "5px" }}>
                              {sanaItem?.operatingExpenses ? (
                                <Box
                                  sx={{
                                    bgcolor: Colors.white,
                                    borderRadius: "5px",
                                    width: "100%",
                                    height: "100%",
                                    padding: "5px",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "5px",
                                    boxShadow:
                                      "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                                    WebkitBoxShadow:
                                      "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                                    MozBoxShadow:
                                      "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      fontWeight: "700",
                                      fontSize: "14px",
                                      color: Colors.dark,
                                      textAlign: "start",
                                      textTransform: "uppercase",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap", // Ensures text does not wrap and is cut off with ellipsis if overflowed
                                    }}
                                  >
                                    {t("operatsioncost")}
                                  </Typography>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "space-evenly",
                                    }}
                                  >
                                    {/* Left side of text box */}
                                    <OpenDoughnutChart
                                      chartData={
                                        sanaItem.operatingExpenses?.factData || []
                                      }
                                    />
                                    {/* Right side of text box */}
                                  </Box>
                                </Box>
                              ) : (
                                <Typography
                                  sx={{
                                    fontWeight: "800",
                                    textTransform: "uppercase",
                                    color: "red",
                                  }}
                                >
                                  No Data Available
                                </Typography>
                              )}
                            </Grid>
                            {/* right side */}
                            <Grid item xs={7} md={7} lg={7} sx={{ padding: "5px" }}>
                              {sanaItem?.reserveData ? (
                                <Box
                                  sx={{
                                    bgcolor: Colors.white,
                                    borderRadius: "5px",
                                    width: "100%",
                                    height: "100%",
                                    padding: "5px",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "5px",
                                    boxShadow:
                                      "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                                    WebkitBoxShadow:
                                      "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                                    MozBoxShadow:
                                      "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      fontWeight: "700",
                                      fontSize: "14px",
                                      color: Colors.dark,
                                      textAlign: "start",
                                      textTransform: "uppercase",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap", // Ensures text does not wrap and is cut off with ellipsis if overflowed
                                    }}
                                  >
                                    {t("reserve")}
                                  </Typography>
                                  <Box sx={{ width: "100%", height: "auto" }}>
                                    <OpenVerticalGroupBarChart
                                      planData={sanaItem.reserveData?.planData || []}
                                      factData={sanaItem.reserveData?.factData || []}
                                    />
                                  </Box>
                                </Box>
                              ) : (
                                <Typography
                                  sx={{
                                    fontWeight: "800",
                                    textTransform: "uppercase",
                                    color: "red",
                                  }}
                                >
                                  No Data Available
                                </Typography>
                              )}
                            </Grid>
                          </Grid>
                        </Box>
                      ))
                  )
                ) }

          </Box>
          <Footer />
        </Box>
      </Box>
    </Container>
  );
};

export default NetProfitSceen;