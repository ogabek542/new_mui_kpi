import React from "react";
import { Container, Box, Grid,Typography } from "@mui/material";
import { Colors } from "../../styles/theme";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
// IMPORT SCREENS //
import LightHeader from "../../components/LightHeader/LightHeader";
import Footer from "../../components/Footer/Footer";
import AreaLineChart from "../../components/LineChart/LineChart";
import NewLineChart from "../../components/NewLineChart/NewLineChart";
import OpenDoughnutChart from "../../components/OperDroughtBar/OpenDroughtBar";
import OpenHorizontalBarChart from "../../components/OpenHorizontalBar/OpenHorizontalBar";
import OpenVerticalGroupBarChart from "../../components/OpenVerticalGroupBarchart/OpenVerticalBarChart";
// calendar elements section //
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/ru"; // Import Russian locale
// IPORT TEST API //
import TestNewApi from '../../pages/testapi/someTestApi.jsx';
import CommonData from "../../pages/testapi/testDataAll.jsx"

// IMPORT ICONS //
import MovingIcon from "@mui/icons-material/Moving";

const NetProfitSceen = () => {

  // data //
  const top128Filials = [
    { title: "Тошкент шаҳри", id: 1 },
    { title: "Андижон вилояти", id: 2 },
    { title: "Бухоро вилояти", id: 3 },
    { title: "Фарғона вилояти", id: 4 },
    { title: "Жиззах  вилояти", id: 5 },
    { title: "Наманган  вилояти", id: 6 },
    { title: "Навоий  вилояти", id: 7 },
    { title: "Қашқадарё  вилояти", id: 8 },
    { title: "Самарқанд  вилояти", id: 9 },
    { title: "Сирдарё  вилояти", id: 10 },
    { title: "Сурхондарё  вилояти", id: 11 },
    { title: "Тошкент  вилояти", id: 12 },
    { title: "Хоразм  вилояти", id: 13 },
    { title: "Қорақалпоғистон республикаси", id: 14 },
  ];
  const setSelectedSecondMap = {
    // Тошкент шаҳри //
    1: [
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
    2: [
      { title: "Андижон амалиёт БХМ" },
      { title: "Асака БХM" },
      { title: "Избоскан БХО" },
      { title: "Қурғонтепа БХО" },
      { title: "Мархамат БХМ" },
      { title: "Пахтаобод БХО" },
      { title: "Шахрихон БХО" },
    ],
    // Бухоро вилояти //
    3: [
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
    4: [
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
    5: [
      { title: "Джизак амалиёт БХМ" },
      { title: "Индустриал БХМ" },
      { title: "Мирзачуль БХМ" },
      { title: "Пахтакор БХО" },
    ],
    // Наманган  вилояти //
    6: [
      { title: "Косонсой БХО" },
      { title: "Наманган амалиёт БХМ" },
      { title: "Турақўрғон БХО" },
      { title: "Уйчи БХМ" },
      { title: "Учқурғон БХМ" },
      { title: "Чортоқ БХМ" },
      { title: "Чуст БХО" },
    ],
    // Навоий  вилояти //
    7: [
      { title: "Зарафшон БХМ" },
      { title: "Қизилтепа БХМ" },
      { title: "Маликрабод БХМ" },
      { title: "Навоий амалиёт БХМ" },
      { title: "Нурота БХО" },
      { title: "Учқудуқ БХМ" },
    ],
    // Қашқадарё  вилояти //
    8: [
      { title: "Ғузор БХО" },
      { title: "Қарши амалиёт БХМ" },
      { title: "Муборак БХО" },
      { title: "Шаҳрисабз БХМ" },
      { title: "Янгинишон БХО" },
    ],
    // Самарқанд  вилояти //
    9: [
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
    10: [
      { title: "Гулистан амалиёт БХМ" },
      { title: "Оқолтин БХО" },
    ],
    // Сурхондарё  вилояти //
    11: [
      { title: "Денов БХМ" },
      { title: "Қумқўрғон БХМ" },
      { title: "Термиз амалиёт БХМ" },
      { title: "Жарқўрғон БХО" },
      { title: "Шеробод БХО" },
    ],
    // Тошкент  вилояти //
    12: [
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
    13: [
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
    14: [
      { title: "Кўнғирот БХМ" },
      { title: "Манғит БХО" },
      { title: "Нукус амалиёт БХМ" },
      { title: "Тўрткўл БХM" },
      { title: "Хўжайли БХО" },
      { title: "Чимбой БХО" },
    ],
  };

  const [selectnewdata, setSelectNewData] = React.useState(dayjs());
  const [dateText, setDateText] = React.useState(dayjs().format('DD.MM.YYYY')); // state for the formatted date text
  // const [selectnewdata, setSelectNewData] = React.useState(dayjs().format('DD.MM.YYYY'));
  const [chooseData, setChooseData] = React.useState([]);
  const [dataSelectedDate, setDataSelectedDate] = React.useState("");

  console.log(chooseData)

  // auto complete elements //
  const [prevFirstOption, setPrevFirstOption] = React.useState(null);
  const [selectedFirstOption, setSelectedFirstOption] = React.useState({ title: "Тошкент шаҳри" });
  const [selectedSecondOptions, setSelectedSecondOptions] = React.useState({ title: "Миробод бўлими" });
  const [prevSecondOption, setPrevSecondOption] = React.useState(null);
  // for data map //
  const [secondOptions, setSecondOptions] = React.useState([]);
  

  // REal worjing Code //
  const handleDateChange = (newValue) => {
    // Update selected date and formatted date text
    setSelectNewData(newValue);
    const formattedDate = newValue ? dayjs(newValue).format('DD.MM.YYYY') : '';
    setDateText(formattedDate);
  
    // Find data from newAllData based on the selected second option and formatted date
    const selectedDataFromAPI = CommonData.find(
      (item) =>
        item.name.toLowerCase() === (selectedSecondOptions ? selectedSecondOptions.title.toLowerCase() : '')
    )?.sana.find(
      (sanaItem) => sanaItem.date === formattedDate
    );
  
    // Update state based on the match
    if (selectedDataFromAPI) {
      setChooseData([selectedDataFromAPI]);
    } else {
      setChooseData([]);
    }
  };

  

    // Update the options for the second Autocomplete based on the first selection
    useEffect(() => {
      if (selectedFirstOption && selectedFirstOption.id) {
        // Save the current selections before changing the options
        setPrevFirstOption(selectedFirstOption);
        setPrevSecondOption(setSelectedSecondOptions);
  
        setSecondOptions(setSelectedSecondMap[selectedFirstOption.id] || []);
        setSelectedSecondOptions(null); // Reset the second option
      } else {
        setSecondOptions([]);
      }
      const initializeScreen = () => {
        // Set initial date or use the current date as default
        const initialDate = dayjs(); // You can adjust this to a specific date if needed
    
        // Trigger handleDateChange with the initial date
        handleDateChange(initialDate);
      };
    
      // Call the initialization function
      initializeScreen();
    }, [selectedFirstOption]);




  return (
    <Container
      fixed
      maxWidth="xl"
      disableGutters
      sx={{ px: "10px", bgcolor: Colors.gray_back }}
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
          <Typography variant="body1" sx={{ mt: 2 }}>
            Selected Date: {dateText}
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* header items div */}
            <Grid container sx={{ width: "100%", height: "auto" }}>
              <Grid item xs={12} sm={12} md={5} lg={5} sx={{ padding: "5px" }}>
                <Box
                  sx={{
                    bgcolor: Colors.white,
                    borderRadius: "5px",
                    width: "100%",
                    height: "50px",
                    padding: "5px",
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
                            label="Выбор отделение"
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
                  }}
                >
                  {/* <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="ru"
                  >
                    <DatePicker
                      value={selectnewdata}
                      onChange={(newValue) => setSelectNewData(newValue)}
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
                            color: Colors.blue_nbu, // Custom color for the DatePicker icon
                          },
                          ".MuiInputBase-input": {
                            fontWeight: 800, // Adjust the font weight of the DatePicker's text
                            fontSize: { xs: "12px", sm: "18px" },
                          },
                        },
                      }}
                    />
                  </LocalizationProvider> */}
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
            {/* first grid div */}
            <Grid container sx={{ width: "100%", height: "250px" }}>
              {/* left side */}
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
                    Чистая прибыль
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
                          fontSize: "112px",
                          fontWeight: "900",
                          textAlign: "start",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        992
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
                          color: Colors.green_dark,
                          fontSize: "48px",
                          padding: "0px",
                          // rotate:"180deg"
                          
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
                        16.16%
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              {/* right side */}
              <Grid item xs={7} md={7} lg={8} sx={{ padding: "5px" }}>
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
                    }}>Даходы(процент)  план/факт</Typography>
                    <Box sx={{width:"100%",height:"auto"}}>
                      <AreaLineChart/>
                    </Box>
                </Box>
              </Grid>
            </Grid>
            {/* second grid div */}
            <Grid container sx={{ width: "100%", height: "250px" }}>
              {/* left side */}
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
                    оперативный  расходы
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                    }}
                  >
                    {/* Left side of text box */}
                  <OpenDoughnutChart/>
                    {/* Right side of text box */}
                  
                  </Box>
                </Box>
              </Grid>
              {/* right side */}
              <Grid item xs={7} md={7} lg={8} sx={{ padding: "5px" }}>
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
                    }}>Даходы(без процентов)   план/факт</Typography>
                      <Box sx={{ width: "100%", height: "auto" }}>
                        {/* {TestNewApi.map((item, index) => (
                          <div key={index}>
                            <NewLineChart 
                              labelsData={item.cleanProfit.labelsData} 
                              planData={item.cleanProfit.planData} 
                              factData={item.cleanProfit.factData} 
                            />
                          </div>
                        ))} */}
                        {chooseData.map((item, index) => (
                          <div key={index}>
                            <NewLineChart 
                              labelsData={item.cleanProfit.labelsData} 
                              planData={item.cleanProfit.planData} 
                              factData={item.cleanProfit.factData} 
                            />
                          </div>
                        ))}
                        
                      </Box>
                </Box>
              </Grid>
            </Grid>
            {/* third grid div */}
            <Grid container sx={{ width: "100%", height: "350px" }}>
              {/* left side of third div */}
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
                    без процентов  расходы
                  </Typography>
                  {/* Bottom side box of third div */}
                  <Box sx={{width:"100%",height:"300px"}}>
                  <OpenVerticalGroupBarChart/>
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
                    процентные расходы
                  </Typography>
                  {/* Bottom side box of third div */}
                  <Box sx={{width:"100%",height:"300px"}}>
                  <OpenHorizontalBarChart/>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Footer />
        </Box>
      </Box>
    </Container>
  );
};

export default NetProfitSceen;
