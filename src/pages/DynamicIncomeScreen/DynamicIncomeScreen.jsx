import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import LightHeader from "../../components/LightHeader/LightHeader";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Divider,
  TextField,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useTranslation } from "react-i18next";
import { Colors } from "../../styles/theme/index";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/ru";
// for holidays data //
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
// <=== HORISONTAL PIE CHART  ====> //
// import DynamicHorisontalBArchart from "../../components/DynamicHorisontalBarchart/DynamicHorisontalBArchart";
//<=== Dynamic Incomes Line Chart ====>   //
import IncomeDynamicLineChart from "../../components/IncomeDynamicLineChart/IncomeDynamicLineChart";

const DynamicIncomeScreen = () => {

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

  const [selectNewData, setSelectNewData] = useState(dayjs());
  const { t } = useTranslation();
  const [chooseData, setChooseData] = useState([]);
  const [selectedFirstOption, setSelectedFirstOption] = useState({
    title: "Республика",
  });
  const [selectedSecondOptions, setSelectedSecondOptions] = useState({
    title: "Республика",
  });
  const [secondOptions, setSecondOptions] = useState(setSelectedSecondMap[1]);

  useEffect(() => {
    if (selectedFirstOption && selectedFirstOption.id) {
      setSecondOptions(setSelectedSecondMap[selectedFirstOption.id] || []);
      setSelectedSecondOptions(null); // Reset the second option
    } else {
      setSecondOptions([]);
    }
  }, [selectedFirstOption]);

  const handleDateChange = (newValue) => {
    setSelectNewData(newValue);
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
      <LightHeader />
    

      <Box
        sx={{
          width: "100%",
          height: "100%",
          bgcolor: Colors.white,
          marginY: "5px",
          borderRadius: "5px",
          gap: "5px",
        }}
      >
          {/* <=== SELECTION SECTION ====? */}
      <Grid container sx={{ width: "100%", height: "auto", paddingTop:"5px" }}>
        <Grid item xs={12} sm={12} md={5} lg={3} sx={{ padding: "5px" }}>
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
        <Grid item xs={12} sm={7} md={4} lg={3} sx={{ padding: "5px" }}>
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
          </Box>
        </Grid>
        <Grid item xs={12} sm={5} md={3} lg={2} sx={{ padding: "5px" }}>
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
                views={["year"]}
                value={selectNewData}
                onChange={handleDateChange}
                maxDate={dayjs()}
                minDate={dayjs('2018-08-18')} // Minimum date set to 2018-08-18
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
        {/* <==== BIG SIZE STRING ====> */}
        <Grid container sx={{ width: "100%", height: "auto",}}>
          <Grid item  xs={3} sm={3} md={3} lg={3} sx={{ padding: "5px",border:"1px solid red",borderRadius:"5px" }}>

          </Grid>
          {/* <=== RIGHT SIDE ====> */}
          <Grid item  xs={9} sm={9} md={9} lg={9} sx={{ border:"1px solid red",borderRadius:"5px"  }}>
          <Typography
            variant="h5"
            sx={{
              width: "100%",
              padding: "10px",
              color: Colors.blue_dark,
              textTransform: "uppercase",
              fontWeight: "500",
              marginY: "5px",
            }}
          >
            Динамика процентных доходов/расходов Банка
          </Typography>
          {/* <==== SMALL SIZE STRING ====> */}
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              gap: "10px",
              paddingX: "10px",
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: Colors.blue_middle, lineHeight: "1" }}
            >
              Анализ за период с сентябрь 2022 до сентябрь 2024
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                color: Colors.gray,
                fontWeight: "500",
                lineHeight: "1",
              }}
            >
              млрд.сум
            </Typography>
          </Box>
          {/* <==== LINE CHART SECTION =====> */}
          <Box sx={{ width: "100%", padding: "5px", height: "320px" }}>
            <IncomeDynamicLineChart />
          </Box>
          <Box sx={{ width: "100%", padding: "5px", height: "320px" }}>
            <IncomeDynamicLineChart />
          </Box>
          <Box sx={{ width: "100%", padding: "5px", height: "320px" }}>
            <IncomeDynamicLineChart />
          </Box>


          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Container>
  );
};

export default DynamicIncomeScreen;
