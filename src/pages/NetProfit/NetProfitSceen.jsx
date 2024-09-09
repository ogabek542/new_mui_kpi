import React, { useEffect, useState } from "react";
import { Container, Box, Grid, Typography, Divider } from "@mui/material";
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
import "dayjs/locale/ru";
import { REQUESTS } from "../../api/requests.js";
import MovingIcon from "@mui/icons-material/Moving";
import { useTranslation } from "react-i18next";
import testData from "../testapi/testDataAll.jsx"
// for holidays data //
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

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
    1: [{ title: "НБУ" }],
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
    11: [
      {title: "Гулистан амалиёт БХМ" }, 
      {title: "Оқолтин БХО" }],
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
    16: [
      { title: "Миробод бўлими" },
    ],
  };

  const [selectNewData, setSelectNewData] = useState(dayjs());
  const [dateText, setDateText] = useState(dayjs().format("DD.MM.YYYY"));
  const [chooseData, setChooseData] = useState([]);
  const [selectedFirstOption, setSelectedFirstOption] = useState({
    title: "Республика",
  });
  const [selectedSecondOptions, setSelectedSecondOptions] = useState({
    title: "НБУ",
  });
  const [secondOptions, setSecondOptions] = useState(setSelectedSecondMap[1]);

  useEffect(() => { 
    const fetchGraphicData = async () => {
      try {
        const response =
          await REQUESTS.analysisScreenOne.getAnalysisScreenOne();
        const graphicIndicators = response.data;
        console.log(response);
        console.log(graphicIndicators, "Fetched data");
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
      }
    };

    fetchGraphicData();
  }, []);

  useEffect(() => {
    if (selectedFirstOption && selectedFirstOption.id) {
      setSecondOptions(setSelectedSecondMap[selectedFirstOption.id] || []);
      setSelectedSecondOptions(null); // Reset the second option
    } else {
      setSecondOptions([]);
    }

    // Initialize the screen with the previous day's date
    const initializeScreen = () => {
      const initialDate = dayjs().subtract(1, "day");
      handleDateChange(initialDate);
    };

    initializeScreen();
  }, [selectedFirstOption]);

  const handleDateChange = (newValue) => {
    setSelectNewData(newValue);
    const formattedDate = newValue ? dayjs(newValue).format("DD.MM.YYYY") : "";

    // Filter data by selected date
  
    // const selectedData = chooseData.map((item) => {
    const selectedData = testData.filter((item) => {
      return selectedSecondOptions?.title === item.name; // Only return data if the title matches
    }).map((item) => {
      return {
        ...item, // Spread the existing item properties
        filteredSana: item.sana
          ? item.sana.filter((sanaItem) => sanaItem.date === formattedDate)
          : [], // Filter based on selected date
      };
    });

    setChooseData(selectedData);
  };

  const insertSpaces = (text) => {
    if (!text) return "";
    return text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  // General function to divide data by 100
  const divideAndRoundData = (dataArray) => {
    if (!dataArray) return [];
    return dataArray.map((value) => Math.round(value / 100));
  };

// Example holidays (add your holidays here)
const holidays = [
  dayjs('2024-01-01'), // New Year's Day
  dayjs('2024-01-02'), // New Year's Day
  dayjs('2024-03-08'), // Women's Day
  dayjs('2024-03-11'), // Ramazan Day
  dayjs('2024-03-21'), // Navruz Happy Day
  dayjs('2024-03-22'), // Navruz Happy Day
  dayjs('2024-03-23'), // Navruz Happy Day
  dayjs('2024-04-10'), // Eid Al Fitr Day
  dayjs('2024-04-11'), // Eid Al Fitr Day
  dayjs('2024-04-12'), // Eid Al Fitr Day
  dayjs('2024-05-09'), // Remember Day
  dayjs('2024-06-16'), // Eid Al Adha Day
  dayjs('2024-06-17'), // Eid Al Adha Day
  dayjs('2024-06-18'), // Eid Al Adha Day
  dayjs('2024-08-31'), // Independence Day
  dayjs('2024-09-01'), // Independence Day
  dayjs('2024-09-02'), // Independence Day
  dayjs('2024-09-03'), // Independence Day
  dayjs('2024-12-08'), // Constitution Day
  dayjs('2024-10-01'), // Constitution Day
  dayjs('2024-12-09'), // Happy New Year Day
  dayjs('2024-12-30'), // Happy New Year Day
  dayjs('2024-12-31'), // Happy New Year Day
  // Add more holidays as needed
];

// Function to disable weekends and holidays
const shouldDisableDate = (date) => {
  // Disable weekends (Saturday = 6, Sunday = 0)
  // const isWeekend = date.day() === 0 || date.day() === 6;

  // Disable holidays
  const isHoliday = holidays.some((holiday) => date.isSame(holiday, 'day'));

  return  isHoliday;
};


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
                      shouldDisableDate={shouldDisableDate} // Disable weekends and holidays
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          id="datepicker-input"
                          inputProps={{
                            ...params.inputProps,
                            placeholder: "DD.MM.YYYY",
                            readOnly: true,
                          }}
                          />
                        )}
                        sx={{
                          ".MuiOutlinedInput-root": {
                            "& fieldset": {
                              border:"none",
                            },
                            "&:hover fieldset": {
                              border:"none",
                            },
                            "&.Mui-focused fieldset": {
                              border:"none",
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
                        slotProps={{
                          day: {
                            sx: {
                              fontWeight: 700, // Apply font-weight to calendar dates
                              fontSize: "14px", // Adjust font-size if needed
                            },
                          },
                        }}
                    />
                  </LocalizationProvider>

                </Box>
              </Grid>
            </Grid>

            {/* Display fetched data */}
            {chooseData.map((item, index) => (
              <Box
                key={index}
                sx={{ width: "100%", height: "100%", marginTop: "20px" }}
              >
                <Typography variant="h6">{item.name}</Typography>

                {item.filteredSana && item.filteredSana.length > 0 ? (
                  item.filteredSana.map((sanaItem, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        padding: "10px",
                        marginBottom: "10px",
                        border: "1px solid #ddd",
                      }}
                    >
                      {/* {sanaItem.nointerestIncome &&
                      sanaItem.nointerestIncome.planData &&
                      sanaItem.nointerestIncome.factData ? (
                      
                      ) : (
                        <Typography>No data available for chart</Typography>
                      )} */}
                        <Box sx={{ width: "100%", height: "350px" }}>
                          <NoIncomeLineChart
                            planData={divideAndRoundData(
                              sanaItem.nointerestIncome.planData
                            )}
                            factData={divideAndRoundData(
                              sanaItem.nointerestIncome.factData
                            )}
                          />
                        </Box>
                    
                    </Box>
                  ))
                ) : (
                  <Typography>No data available for selected date.</Typography>
                )}
              </Box>
            ))}

          </Box>
          <Footer />
        </Box>
      </Box>
    </Container>
  );
};

export default NetProfitSceen;
