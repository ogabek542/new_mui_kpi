import React, { useState } from 'react'
import { Container, Box, Typography, Button, Grid } from "@mui/material";
import { useEffect } from "react";
import { Colors } from "../../styles/theme";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
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

const IndicatorKey = () => {


  const navigate = useNavigate();
  const [newdata, setNewData] = useState(dayjs());
  const [chooseData, setChooseData] = useState(null);

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
  //       const formattedDate = selectedDate.format("YYYY-MM-DD"); 
        
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
      <Header
        changeLang={changeLang}
        value={newdata}
        onChange={handleDateChange}
      />
      {/* navigate div section */}
        <Box sx={{height:"55px",width:"100%",padding:"5px",bgcolor:Colors.gray_footer,marginBottom:"10px",borderRadius:"5px",display:"flex",alignItems:"center",paddingX:"10px",gap:"10px",marginTop:"10px"}}>
            <Button 
                variant="text" 
                sx={{
                  textAlign: "start", 
                  bgcolor: Colors.gray_footer, 
                  '&:hover': {
                    bgcolor: Colors.gray_footer, // Change this to your desired hover background color
                  }
                }}
              >
                <Typography sx={{fontWeight:"bold",color:Colors.blue_nbu,textTransform:"uppercase"}}>KUNLIK HISOBOTLAR</Typography>
              </Button>
              {/* <=== KEY INDEX BUTTON ====> */}
            <Button 
                variant="contained" 
                sx={{
                  textAlign: "start", 
                  bgcolor: Colors.gray_common, 
                  '&:hover': {
                    bgcolor: Colors.gray_common, // Change this to your desired hover background color
                  },
                  marginLeft:"100px",
                }}
                onClick={handleNavigateKeyIndicators}
              >
                <Typography sx={{fontWeight:"bold",textTransform:"uppercase"}}>ASOSIY KO'RSATKICHLAR</Typography>
              </Button>
              {/* <=== BALANS BUTTON ====> */}
            <Button 
                variant="contained" 
                sx={{
                  textAlign: "start", 
                  bgcolor: Colors.gray_common, 
                  '&:hover': {
                    bgcolor: Colors.gray_common, // Change this to your desired hover background color
                  }
                }}
                onClick={handleNavigateBalanceScreen}
              >
                <Typography sx={{fontWeight:"bold",textTransform:"uppercase"}}>BALANS</Typography>
              </Button>
          </Box>
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
        <Typography sx={{fontWeight:"bold",textTransform:"uppercase"}}>
        Основные показатели деятельности Национального банка Внешнеэкономической деятельности Республики Узбекистан по состоянию на 17.09.2024 года											
        </Typography>
      </Box>
      <Box sx={{ marginY: "10px" }}>
        <Box
          sx={{
            border: `2px solid ${Colors.gray_back}`,
            height: "auto",
            borderBottom: "none",
            margin: "auto",
            position:"relative"
          }}
        >
          {/* GRID HEADER SECTION */}

          {/* <== gird 1-row ==> */}
          <Grid
            container
            sx={{
              borderBottom: `2px solid ${Colors.gray_back}`,
              borderRight: `2px solid ${Colors.gray_back}`,
              // height: "auto",
              height: "70px",
              bgcolor: Colors.blue_tableheader_light,
              // position:"fixed"
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
          {/* 1 2-reow */}
          <Grid
            container
            sx={{
              borderBottom: `2px solid ${Colors.gray_back}`,
              borderRight: `2px solid ${Colors.gray_back}`,
              height: "40px",
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
                  fontStyle: "uppercase",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  width: "100%",
                  px: "5px",
                  height: "auto",
                  overflowWrap: "break-word",
                  wordBreak: "break-all",
                  fontWeight: "bold",
                }}
              >
                Активы (нетто)
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
          {/* 2 3-row */}
          <Grid
            container
            sx={{
              borderBottom: `2px solid ${Colors.gray_back}`,
              borderRight: `2px solid ${Colors.gray_back}`,
              height: "40px",
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
                }}
              >
                2
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
                  justifyContent: "flex-start",
                  alignItems: "center",
                  width: "100%",
                  px: "5px",
                  height: "auto",
                  overflowWrap: "break-word",
                  wordBreak: "break-all",
                  fontWeight: "bold",
                }}
              >
                Касса
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
      </Box>
      <Footer />
    </Container>
  );
}

export default IndicatorKey