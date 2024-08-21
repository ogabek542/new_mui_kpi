import React from "react";
import { Container, Box, Grid,Typography,Divider  } from "@mui/material";
import { Colors } from "../../styles/theme";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
// IMPORT SCREENS //
import LightHeader from "../../components/LightHeader/LightHeader";
import Footer from "../../components/Footer/Footer";
import NewLineChart from "../../components/NewLineChart/NewLineChart"; // % income line chart component//
import NoIncomeLineChart from "../../components/LineChart/LineChart.jsx"; // no % income line chart component//
import OpenDoughnutChart from "../../components/OperDroughtBar/OpenDroughtBar"; // changes doughnut //
import OpenHorizontalBarChart from "../../components/OpenHorizontalBar/OpenHorizontalBar";
import HorizontalCostBarChart from "../../components/HorizontalBarchart/HorizontalBarchart.jsx";
import OpenVerticalGroupBarChart from "../../components/OpenVerticalGroupBarchart/OpenVerticalBarChart"; // change static form label name //
// calendar elements section //
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/ru"; // Import Russian locale
// IPORT TEST API //
import CommonData from "../../pages/testapi/testDataAll.jsx"

// IMPORT ICONS //
import MovingIcon from "@mui/icons-material/Moving";

const NetProfitSceen = () => {

  // data //
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
  ];
  const setSelectedSecondMap = {
    // NBU//
    1: [
      { title: "НБУ" },
    ],
    // Тошкент шаҳри //
    2: [
      { title: "Головной офис" },
      { title: "Миробод бўлими" },
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
      { title: "Гулистан амалиёт БХМ" },
      { title: "Оқолтин БХО" },
    ],
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
  };

  const [selectnewdata, setSelectNewData] = React.useState(dayjs());
  const [dateText, setDateText] = React.useState(dayjs().format('DD.MM.YYYY'));
  // const [selectnewdata, setSelectNewData] = React.useState(dayjs().format('DD.MM.YYYY'));
  const [chooseData, setChooseData] = React.useState([]);
  // const [dataSelectedDate, setDataSelectedDate] = React.useState("");

  console.log(chooseData)

  // auto complete elements //
  const [prevFirstOption, setPrevFirstOption] = React.useState(null);
  const [selectedFirstOption, setSelectedFirstOption] = React.useState({ title: "Республика" });
  const [selectedSecondOptions, setSelectedSecondOptions] = React.useState({ title: "НБУ" });
  const [prevSecondOption, setPrevSecondOption] = React.useState(null);
  // for data map //
  const [secondOptions, setSecondOptions] = React.useState([]);
  

  // Real working Code //
  const handleDateChange = (newValue) => {
    setSelectNewData(newValue);
    const formattedDate = newValue ? dayjs(newValue).format('DD.MM.YYYY') : '';
    setDateText(formattedDate);
  
    const selectedDataFromAPI = CommonData.find(
      (item) =>
        item.name.toLowerCase() === (selectedSecondOptions ? selectedSecondOptions.title.toLowerCase() : '')
    )?.sana.find(
      (sanaItem) => sanaItem.date === formattedDate
    );
  
    if (selectedDataFromAPI) {
      setChooseData([selectedDataFromAPI]);
    } else {
      setChooseData([]);
    }
  };


    useEffect(() => {
      if (selectedFirstOption && selectedFirstOption.id) {
        setPrevFirstOption(selectedFirstOption);
        setPrevSecondOption(setSelectedSecondOptions);
  
        setSecondOptions(setSelectedSecondMap[selectedFirstOption.id] || []);
        setSelectedSecondOptions(null); // Reset the second option
      } else {
        setSecondOptions([]);
      }
    
      const initializeScreen = () => {
        // Use the day before today as the initial date
        const initialDate = dayjs().subtract(1, 'day');
  
        // Trigger handleDateChange with the initial date
        handleDateChange(initialDate);
      };
    
      initializeScreen();
    }, [selectedFirstOption]);

    const insertSpaces = (text) => {
      if (!text) return ""; 
      return text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };


  return (
    <Container
    maxWidth={false} // This allows the container to expand beyond the default breakpoints
    disableGutters
    sx={{
      px: "10px",
      bgcolor: Colors.gray_back,
      width: '100%', // Ensure the container takes up 100% of the viewport width
      maxWidth: '100vw', // Ensure the container doesn't exceed the viewport width
      '@media (min-width: 1920px)': {
        maxWidth: '100%', // For extra-large screens, allow full width
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
            {/*<=== header items div ===>*/}
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
                    WebkitBoxShadow: "1px 2px 10px 2px rgba(34, 60, 80, 0.2)",
                    MozBoxShadow: "1px 2px 10px 2px rgba(34, 60, 80, 0.2)", 
                  }}
                >
                  {/* First autocomplete  */}
                    <Autocomplete
                        options={top128Filials}
                        sx={{ width: '100%', height: '100%', mb: 2 }}
                        getOptionLabel={(option) => option.title}
                        value={selectedFirstOption || prevFirstOption}
                        onChange={(event, value) => setSelectedFirstOption(value)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Выбор область"
                            variant="standard"
                            sx={{
                              "& .MuiInput-underline:before": { borderBottomColor: "red" },
                              "& .MuiInput-underline:after": { borderBottomColor: "green" },
                              "& .MuiInput-underline:before, & .MuiInput-underline:after": {
                                borderBottom: "none",
                              },
                            }}
                            InputLabelProps={{ style: { color: 'black' } }}
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
                    WebkitBoxShadow: "1px 2px 10px 2px rgba(34, 60, 80, 0.2)",
                    MozBoxShadow: "1px 2px 10px 2px rgba(34, 60, 80, 0.2)", 
                  }}
                >
                      {/* Second Autocomplete */}
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
                              "& .MuiInput-underline:before, & .MuiInput-underline:after": {
                                borderBottom: "none",
                              },
                            }}
                            InputLabelProps={{ style: { color: 'black' } }}
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
                    WebkitBoxShadow: "1px 2px 10px 2px rgba(34, 60, 80, 0.2)",
                    MozBoxShadow: "1px 2px 10px 2px rgba(34, 60, 80, 0.2)", 
                  }}
                >
                  
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                      <DatePicker
                        value={dayjs(selectnewdata, 'DD.MM.YYYY')}
                        onChange={handleDateChange}
                        slotProps={{ textField: { size: "medium" } }}
                        renderInput={(props) => (
                          <Box
                            sx={{
                              width: { xs: "100px", sm: "100px", md: "200px" },
                            }}
                          >
                            <TextField {...props} fullWidth />
                          </Box>
                        )}
                        sx={{
                          ".MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "white",
                              border: "none",
                            },
                            "&:hover fieldset": {
                              borderColor: "white",
                              border: "none",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "white",
                            },
                            ".MuiInputAdornment-root .MuiIconButton-root": {
                              color: '#0000FF', // Custom color for the DatePicker icon
                            },
                            ".MuiInputBase-input": {
                              fontWeight: 800, // Adjust the font weight of the DatePicker's text
                              fontSize: { xs: "12px", sm: "18px" },
                            },
                          },
                        }}
                      />
                  </LocalizationProvider>
                </Box>
              </Grid>
            </Grid>
            {chooseData.map((item, index) => (
              <Box key={index} sx={{width:"100%",height:"100%"}}>
            {/*<==== first grid div ====>*/}
            <Grid container sx={{ width: "100%", height: "250px" }}>
              {/* first number div */}
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
                    boxShadow: "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                    WebkitBoxShadow: "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                    MozBoxShadow: "0px -1px 12px 1px rgba(34, 60, 80, 0.2)", 
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
                      textShadow:"0.5px 0.5px 2px gray",
                    }}
                  >
                    Чистая прибыль(млрд сум)
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
                          fontSize: "64px",// 112px
                          fontWeight: "800",
                          textAlign: "start",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          textShadow:"2px 2px 5px gray",
                        }}
                      >
                        {/* { insertSpaces(item.cleanProfit.netProfitData) || "нет информации"} */}
                        {item.cleanProfit.netProfitData ? insertSpaces(Math.round(item.cleanProfit.netProfitData / 1000 )) : "нет информации"}
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
                          color: item.cleanProfit.netPercentageData <= 100 ? Colors.red : Colors.green_dark,
                          fontSize: "48px",
                          padding: "0px",
                          transform: item.cleanProfit.netPercentageData <= 100 ? "rotate(180deg)" : "rotate(0deg)",
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
                        {item.cleanProfit.netPercentageData || "нет информации"}% 
                      </Typography>
                    </Box>
                  </Box>
                </Box>
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
                    boxShadow: "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                    WebkitBoxShadow: "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                    MozBoxShadow: "0px -1px 12px 1px rgba(34, 60, 80, 0.2)", 
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
                      textShadow:"0.5px 0.5px 2px gray",
                    }}
                  >
                    чистый % доход  / чистый Бес % доход (млрд сум)
                  </Typography>
                  <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",height:"100%",}}>
                    {/* Left side Doxod */}
                    <Box sx={{display:"flex",flexDirection:"column",height:"auto",}}>
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
                              textShadow:"0.5px 0.5px 2px gray",
                            }}
                          >
                            {/* {insertSpaces(item.cleanPercentageIncome.netSoftProfitData) || "нет информации"} */}
                            {item.cleanPercentageIncome.netSoftProfitData ? insertSpaces(Math.round(item.cleanPercentageIncome.netSoftProfitData / 1000))
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
                              color:item.cleanPercentageIncome.netSoftPercentageData <= 100 ? Colors.red :  Colors.green_dark,
                              fontSize: "24px",
                              padding: "0px",
                              transform:item.cleanPercentageIncome.netSoftPercentageData <= 100 ? "rotate(180deg)" : "rotate(0deg)",
                              transition:"transform 0.3s ease", 
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
                            {item.cleanPercentageIncome.netSoftPercentageData || "нет информации"}%
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
                        width: "3px",            // Sets the width of the divider
                        backgroundColor: Colors.gray_back,   // Sets the color of the divider
                        margin: "0 10px",         // Optional: Adds some space around the divider
                      }}
                    />
                    {/* right side Rosxod */}
                    <Box sx={{display:"flex",flexDirection:"column",height:"auto"}}>
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
                              textShadow:"0.5px 0.5px 2px gray",
                            }}
                          >
                            {/* {insertSpaces(item.cleanNoPercentageIncome.netSoftNoProfitData)|| "нет информации"} */}
                            {item.cleanNoPercentageIncome.netSoftNoProfitData
                              ? insertSpaces(Math.round(item.cleanNoPercentageIncome.netSoftNoProfitData / 1000))
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
                              color:item.cleanNoPercentageIncome.netSoftNoPercentageData <= 100 ? Colors.red: Colors.green_dark,
                              fontSize: "24px",
                              padding: "0px",
                              transform:item.cleanNoPercentageIncome.netSoftNoPercentageData <=100 ? "rotate(180deg)" : "rotate(0deg)",
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
                            {item.cleanNoPercentageIncome.netSoftNoPercentageData || "нет информации"}%
                          </Typography>
                        </Box>
                        </Box>
                      </Box>
                  </Box>
                </Box>
              </Grid>
              {/* third number div */}
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
                    boxShadow: "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                    WebkitBoxShadow: "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                    MozBoxShadow: "0px -1px 12px 1px rgba(34, 60, 80, 0.2)", 
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
                      textShadow:"0.5px 0.5px 2px gray",
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
                          textShadow:"4px 4px 4px gray",
                        }}
                      >
                        {insertSpaces(item.cirProfir.cirPercentageDate) || "нет информации"} %
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            {/*<==== second grid div ====>*/}
            <Grid container sx={{ width: "100%", height: "250px" }}>
              {/* left side */}
              <Grid item xs={5} md={5} lg={6} sx={{ padding: "5px" }}>
              <Box
                  sx={{
                    bgcolor: Colors.white,
                    borderRadius: "5px",
                    width: "100%",
                    height: "100%",
                    padding:"5px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    boxShadow: "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                    WebkitBoxShadow: "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                    MozBoxShadow: "0px -1px 12px 1px rgba(34, 60, 80, 0.2)", 
                  }}
                >
                  <Typography   sx={{
                      fontWeight: "700",
                      fontSize: "14px",
                      color: Colors.dark,
                      textAlign: "start",
                      textTransform: "uppercase",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap", // Ensures text does not wrap and is cut off with ellipsis if overflowed
                    }}>%  Доходы</Typography>
                    <Box sx={{width:"100%",height:"auto"}}>
                    <NewLineChart 
                              planData={item.interestIncome.planData} 
                              factData={item.interestIncome.factData} 
                            />
                    </Box>
                </Box>
              </Grid>
              {/* right side */}
              <Grid item xs={7} md={7} lg={6} sx={{ padding: "5px" }}>
                <Box
                  sx={{
                    bgcolor: Colors.white,
                    borderRadius: "5px",
                    width: "100%",
                    height: "100%",
                    padding:"5px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    boxShadow: "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                    WebkitBoxShadow: "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                    MozBoxShadow: "0px -1px 12px 1px rgba(34, 60, 80, 0.2)", 
                  }}
                >
                  <Typography   sx={{
                      fontWeight: "700",
                      fontSize: "14px",
                      color: Colors.dark,
                      textAlign: "start",
                      textTransform: "uppercase",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap", // Ensures text does not wrap and is cut off with ellipsis if overflowed
                    }}>Бес % Доходы</Typography>
                      <Box sx={{ width: "100%", height: "auto" }}>
                      
                          
                        <NoIncomeLineChart 
                              planData={item.nointerestIncome.planData} 
                              factData={item.nointerestIncome.factData} 
                        />
                      </Box>
                </Box>
              </Grid>
            </Grid>
            {/*<==== third grid div ====>*/}
            <Grid container sx={{ width: "100%", height: "400px" }}>
              {/* left side of third div */}
              <Grid item xs={6} md={6} lg={6} sx={{ padding: "5px",height:"auto" }}>
                <Box
                  sx={{
                    bgcolor: Colors.white,
                    borderRadius: "5px",
                    width: "100%",
                    height: "100%",
                    display:"flex",
                    flexDirection:"column",
                    gap:"10px",
                    padding:"5px",
                    boxShadow: "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                    WebkitBoxShadow: "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                    MozBoxShadow: "0px -1px 12px 1px rgba(34, 60, 80, 0.2)", 
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
                  % расходы
                  </Typography>
                  {/* Bottom side box of third div */}
                  <Box sx={{width:"100%",height:"350px"}}>
                  
                  <HorizontalCostBarChart 
                      planData={item.interestCost.planData} 
                      factData={item.interestCost.factData} 
                  />
                  </Box>
                </Box>
              </Grid>
              {/* right side of third div */}
              <Grid item xs={6} md={6} lg={6} sx={{ padding: "5px" }}>
              <Box
                  sx={{
                    bgcolor: Colors.white,
                    borderRadius: "5px",
                    width: "100%",
                    height: "100%",
                    display:"flex",
                    flexDirection:"column",
                    gap:"10px",
                    padding:"5px",
                    boxShadow: "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                    WebkitBoxShadow: "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                    MozBoxShadow: "0px -1px 12px 1px rgba(34, 60, 80, 0.2)", 
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
                    Бес % расходы
                  </Typography>
                  {/* Bottom side box of third div */}
                  <Box sx={{width:"100%",height:"350px"}}>
                  
                  <OpenHorizontalBarChart 
                     planData={item.nointerestCost.planData} 
                     factData={item.nointerestCost.factData} 
                  />
                  </Box>
                </Box>
              </Grid>
            </Grid>
            {/*<==== fouth grid div ====>*/}
            <Grid container sx={{ width: "100%", height: "260px" }}>
              {/* left side */}
              <Grid item xs={5} md={5} lg={5} sx={{ padding: "5px", }}>
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
                    boxShadow: "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                    WebkitBoxShadow: "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                    MozBoxShadow: "0px -1px 12px 1px rgba(34, 60, 80, 0.2)", 
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
                    операционные  расходы
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                    }}
                  >
                    {/* Left side of text box */}
                  <OpenDoughnutChart  chartData={item.operatingExpenses.planData}/>
                    {/* Right side of text box */}
                  
                  </Box>
                </Box>
              </Grid>
              {/* right side */}
              <Grid item xs={7} md={7} lg={7} sx={{ padding: "5px",}}>
                <Box
                  sx={{
                    bgcolor: Colors.white,
                    borderRadius: "5px",
                    width: "100%",
                    height: "100%",
                    padding:"5px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    boxShadow: "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                    WebkitBoxShadow: "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                    MozBoxShadow: "0px -1px 12px 1px rgba(34, 60, 80, 0.2)", 
                  }}
                >
                  <Typography   sx={{
                      fontWeight: "700",
                      fontSize: "14px",
                      color: Colors.dark,
                      textAlign: "start",
                      textTransform: "uppercase",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap", // Ensures text does not wrap and is cut off with ellipsis if overflowed
                      
                    }}>резервы</Typography>
                      <Box sx={{ width: "100%", height: "auto" ,}}>
                          <OpenVerticalGroupBarChart 
                              planData={item.reserveData.planData} 
                              factData={item.reserveData.factData} 
                            />
                      </Box>
                </Box>
              </Grid>
            </Grid>
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