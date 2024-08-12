import React from "react";
import { Container, Box, Grid, Paper,Typography } from "@mui/material";
import { Colors } from "../../styles/theme";
import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
// IMPORT SCREENS //
import LightHeader from "../../components/LightHeader/LightHeader";
import DoughnutChart from "../../components/Doughnut/Doughnut";
import AreaChart from "../../components/AreaChart/AreaChart";
import VerticalBarChart from "../../components/VerticalBarChart/VerticalBarChart";
import HorizontalBarChart from "../../components/HorizontalBarchart/HorizontalBarchart";
import Footer from "../../components/Footer/Footer";
// calendar elements section //
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from 'dayjs';
import 'dayjs/locale/ru'; // Import Russian locale

const NetProfitSceen = () => {

    // data //
    const top128Filials = [
      { title: "Избоскан БХО" }, 
      { title: "Шахрихон БХО" },
      { title: "Асака БХМ" },
      { title: "Зарафшон БХМ"},
    
    ];

    const [selectnewdata,setSelectNewData] = React.useState(dayjs());

  return (
    <Container fixed maxWidth="xl" disableGutters sx={{ px: "10px",bgcolor:Colors.gray_back }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          height: "auto",
        }}
      >
        <Box sx={{width:"100%",height:"auto",display:"flex",flexDirection:"column",gap:"10px"}}>
          <LightHeader />
          <Box sx={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",}}>
            {/* header items div */}
            <Grid  container sx={{width:"100%",height:"auto",}}>
              <Grid item xs={12} sm={12} md={5} lg={5}  sx={{padding:"5px"}}>
                <Box sx={{bgcolor:Colors.white,borderRadius:"5px",width:"100%",height:"50px",padding:"5px"}}>
                  {/* choose filila name  */}
                  <Autocomplete
                    options={top128Filials}
                    sx={{ width: "100%",height:"100%" }}
                    getOptionLabel={(option) => `${option.title}`}
                    id="movie-customized-option-demo"
                    disableCloseOnSelect
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Выбор отделение"
                        variant="standard"
                        sx={{
                          "& .MuiInput-underline:before": {
                            borderBottomColor: "red", // Change the color here
                          },
                          "& .MuiInput-underline:after": {
                            borderBottomColor: "green", // Change the color here
                          },
                          "& .MuiInput-underline:before, & .MuiInput-underline:after": {
                            borderBottom: "none", // To remove the border
                          },
                        }}
                        InputLabelProps={{
                          style: { color: Colors.dark }, // Change the color to your desired value
                        }}
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={7} md={4} lg={4}  sx={{padding:"5px"}}>
              <Box sx={{bgcolor:Colors.white,borderRadius:"5px",width:"100%",height:"50px",padding:"5px"}}>
                  {/* choose filila name  */}
                  <Autocomplete
                    options={top128Filials}
                    sx={{ width: "100%",height:"100%" }}
                    getOptionLabel={(option) => `${option.title}`}
                    id="movie-customized-option-demo"
                    disableCloseOnSelect
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Выбор филиала"
                        variant="standard"
                        sx={{
                          "& .MuiInput-underline:before": {
                            borderBottomColor: "red", // Change the color here
                          },
                          "& .MuiInput-underline:after": {
                            borderBottomColor: "green", // Change the color here
                          },
                          "& .MuiInput-underline:before, & .MuiInput-underline:after": {
                            borderBottom: "none", // To remove the border
                          },
                        }}
                        InputLabelProps={{
                          style: { color: Colors.dark }, // Change the color to your desired value
                        }}
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={5} md={3} lg={3}  sx={{padding:"5px"}}>
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
                        <LocalizationProvider dateAdapter={AdapterDayjs}  adapterLocale="ru" >
                            <DatePicker
                                value={selectnewdata}
                                onChange={(newValue) => setSelectNewData(newValue)}
                                slotProps={{ textField: { size: 'medium' } }}
                                renderInput={(props) => (
                                <Box sx={{ width: {xs:"100px",sm:"100px",md:"200px"} }}>
                                  <TextField {...props} fullWidth />
                                </Box>
                              )}
                              sx={{
                                ".MuiOutlinedInput-root": {
                                  "& fieldset": {
                                    borderColor: "white",
                                    border:"none"
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "white",
                                    border:"none"

                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: "white",
                                  },
                                  '.MuiInputAdornment-root .MuiIconButton-root': {
                                    color: Colors.blue_nbu, // Custom color for the DatePicker icon
                                  },
                                  ".MuiInputBase-input": {
                                    fontWeight: 800, // Adjust the font weight of the DatePicker's text
                                    fontSize:{xs:"12px",sm:"18px"}
                                  },
                                },
                              }}
                            />
                        </LocalizationProvider>
                    </Box>
              </Grid>
            </Grid>
            {/* first grid div */}
            <Grid  container sx={{width:"100%",height:"250px",}}>
                {/* left side */}
              <Grid item xs={5} md={5} lg={4}  sx={{padding:"5px"}}>
                <Box sx={{bgcolor:Colors.white,borderRadius:"5px",width:"100%",height:"100%"}}>

                </Box>
              </Grid>
              {/* right side */}
              <Grid item xs={7} md={7} lg={8}  sx={{padding:"5px"}}>
                  <Box sx={{bgcolor:Colors.white,borderRadius:"5px",width:"100%",height:"100%"}}>

                  </Box>
              </Grid>
            </Grid>
            {/* second grid div */}
            <Grid  container sx={{width:"100%",height:"250px",}}>
              <Grid item xs={5} md={5} lg={4}  sx={{padding:"5px"}}>
                <Box sx={{bgcolor:Colors.white,borderRadius:"5px",width:"100%",height:"100%"}}>

                </Box>
              </Grid>
              <Grid item xs={7} md={7} lg={8}  sx={{padding:"5px"}}>
                  <Box sx={{bgcolor:Colors.white,borderRadius:"5px",width:"100%",height:"100%"}}>

                  </Box>
              </Grid>
            </Grid>
            {/* third grid div */}
            <Grid  container sx={{width:"100%",height:"300px",}}>
              <Grid item xs={6} md={6} lg={6}  sx={{padding:"5px"}}>
                <Box sx={{bgcolor:Colors.white,borderRadius:"5px",width:"100%",height:"100%"}}>

                </Box>
              </Grid>
              <Grid item xs={6  } md={6} lg={6}  sx={{padding:"5px"}}>
                  <Box sx={{bgcolor:Colors.white,borderRadius:"5px",width:"100%",height:"100%"}}>

                  </Box>
              </Grid>
            </Grid>
          </Box>
        <Footer/>
        </Box>
      </Box>
    </Container>
  );
};

export default NetProfitSceen;
