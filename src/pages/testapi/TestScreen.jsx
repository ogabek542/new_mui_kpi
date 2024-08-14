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
