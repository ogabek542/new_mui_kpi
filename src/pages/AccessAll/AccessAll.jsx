import * as React from 'react'
import { Container, Box, Typography, Button, Grid ,Modal,Alert} from "@mui/material";
import { Colors } from "../../styles/theme";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useState} from 'react';
import { REQUESTS } from '../../api/requests';
// import components //
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
// icons //
// import screen components //


// <=== Import New Charts ====> //
import PieChartMainChart from "../../components/PieChartMainSection/PieChartMainChart.jsx";
import HolePieChart from "../../components/HolePieChart/HolePieChart.jsx";
import StackedBartchart from "../../components/StackedBarchart/StackedBartchart.jsx";
import VerticalBarchartTwo from "../../components/VerticalBarchartTwo/VerticalBarchartTwo.jsx";
import MainPageCostBarchart from "../../components/MainPageCostBarchart/MainPageCostBarchart.jsx"

import MovingIcon from "@mui/icons-material/Moving";


// import image //
// recharts elements //

import { useTranslation } from "react-i18next";
import i18n from "i18next";

import dayjs from "dayjs";
import "dayjs/locale/ru";
// for holidays data //
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);


const AccessAll = () => {

  const changeLang = (value) => {
    i18n.changeLanguage(value)
  }


  const navigate = useNavigate();
  const [userdata, setUserData] = React.useState([]);
  const [usertype, setUsertype] = React.useState("leader");
  const [barlogin, setBarlogin] = React.useState(true);
  const [barpoint, setBarpoint] = React.useState("");
  const [openauthmodal,setOpenAuthModal] = React.useState(false);
  const [chooseData, setChooseData] = useState([]);
  const [selectNewData, setSelectNewData] = useState(dayjs());


  const {t} = useTranslation()

  // AUTH  MODAL FUNCTION //
  const handleOpenAuthModal = () =>  setOpenAuthModal(true);
  
  const handleCloseAuthModal = () => setOpenAuthModal(false);

  
  useEffect(() => {
    const getUserData = async () => {
      try {
        const responses = await REQUESTS.user.getUser();
        console.log(responses);
        const propsdata = responses.data[0];
        setUserData(propsdata);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    const changeColorBar = () => {
      if (barpoint >= 100) {
        setBarlogin(true);
      } else setBarlogin(false);
    };
    changeColorBar();
    getUserData();
  }, [setUserData]);

  fetch(userdata)
    .then((response) => {
      if (response.ok) {
        console.log("The data exists and is accessible");
      } else {
        console.log("The data does not exist or is not accessible");
      }
    })
    .catch((error) => {
      console.error("Error fetching the data:", error);
    });

    const handleOpenKPI = () => {
      navigate("/kpidashboard");
  
    }

    
useEffect(() => { 
  const fetchGraphicData = async () => {
    try {
      const respond =
        await REQUESTS.mainCalendarScreen.getMainCalendarScreen();
      const calendarIndicators = respond.data;
      console.log(respond);
      console.log(calendarIndicators, "New Fetched data");
      setChooseData(calendarIndicators);
    } catch (error) {
      console.error("Error fetching graphic indicator data:", error);
      if (error.respond && error.respond.status === 404) {
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
  // barchart section code elements //
    // <----- BAR CHART DATA -----> //
 
    
      // <=== BArchart styles ====> //
      // Styled components


    const insertSpaces = (text) => {
      if (!text) return ""; // Handle empty or undefined text
    
      // Convert to string and ensure no more than 6 characters
      const str = text.toString().slice(0, 6);
    
      // Add spaces every 3 digits
      return str.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };

    const handleDateChange = (newValue) => {
      setSelectNewData(newValue);
      const formattedDate = newValue ? dayjs(newValue).format("DD.MM.YYYY") : "";
    
      // Filter the data by selected date (calenDate) from testMainAPI
      const selectedData = chooseData.filter((item) => item.calenDate === formattedDate);
    
      // If data is found for the selected date, update the state
      if (selectedData.length > 0) {
        const filteredData = selectedData; // Assuming only one match per date
    
        // Log or update any part of the filtered data as needed, for example:
        console.log('Filtered Bank Assets:', filteredData.bankAssets);
        console.log('Filtered Bank Profitability:', filteredData.bankProfitability);
        
        setChooseData(filteredData); // Update the state with the selected data
      } else {
        console.log("No data found for the selected date");
        setChooseData([]); // Clear the data if no match is found
      }
    };




      useEffect(() => {
        handleDateChange(selectNewData);
      }, [selectNewData]); //
    

  return (
    <Container    maxWidth={false} // This allows the container to expand beyond the default breakpoints
    disableGutters
    sx={{
      px: "10px",
      bgcolor: Colors.gray_back,
      width: '100%', // Ensure the container takes up 100% of the viewport width
      maxWidth: '100vw', // Ensure the container doesn't exceed the viewport width
      '@media (min-width: 1920px)': {
        maxWidth: '100%', // For extra-large screens, allow full width
      },
    }}>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "center",
        height: "100%", // Make sure the Box takes the full viewport height
      }}
    >
      <Header changeLang={changeLang} value={selectNewData} onChange={handleDateChange}/>
      <Box
          sx={{
            flexDirection: "column",
            width: "100%",
            gap: "10px",
            height: "auto",
            my: "5px",
          }}
        >
          {/* <=== login main section ===> */}
          <Box
            sx={{
              bgcolor: Colors.blue_login,
              width: "100%",
              height: "auto",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: "10px",
              my: "5px",
              marginBottom: "10px",
              py: { xs: "5px", sm: "5px", md: "0px" },
              lineHeight: "1",
              flexDirection: {
                xs: "column",
                sm: "column",
                md: "row",
              },
            }}
          >
            <Button variant="text" sx={{display: { xs: "none",sm:"none" ,md: "block" },}}>
              <Typography
                sx={{
                  fontWeight: "800",
                  fontSize: {xs:"10px",sm:"14px",md:"14px",lg:"16px"},
                  color: Colors.nbu,
                }}
              >
                {t("kpicorner")}
              </Typography>
            </Button>
            <Box
              sx={{
                display: { xs: "", md: "flex" },
                flexDirection: {
                  xs: "column",
                  sm: "column",
                  md: "row",
                },
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
        
              {/* <=== USERNAME SECTION ====> */}
              <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",gap:{xs:"0px",md:"5px"}}}>
                <Typography variant="text" sx={{fontSize:{xs:"10px",md:"14px",lg:"16px"},fontWeight:"500",color:Colors.green_dark,textTransform:"uppercase"}}>
                {t("welcomekpi")}
                </Typography>
                <Typography variant="text" sx={{fontSize:{xs:"10px",md:"14px",lg:"16px",textTransform:"uppercase"},fontWeight:"bold",color:Colors.green_dark}}>
                {userdata ? userdata.name : "no exist name"}
                </Typography>

              </Box>
            </Box>
            {/* <=== Forget Password ===> */}
            <Button variant="text" color="secondary">
              <Typography
                sx={{
                  fontWeight: "800",
                  fontSize:{ xs:"10px",md:"14px",lg:"16px"},
                  lineHeight: "1",
                  color:Colors.blue_nbu,
                  textTransform:"uppercase",
                }}
                onClick={handleOpenKPI}
              >
                {t("resultkpi")}
              </Typography>
            </Button>
          </Box>
          <Button onClick={() => navigate("/netprofit")}>kirish</Button>
          {/* <==== BARCHART CARDS SECTION ====> */}
            {chooseData && chooseData.length > 0 ? (
              chooseData.map((item, indx) => (
              <Grid
                container
                sx={{ margin: "auto" ,}}
                direction="row"
                width={"100%"}
                key={indx}
              >
              {/* first div */}
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={4}
                sx={{
                  height: { xs: "400px", md: "500px" },
                  width: "auto",
                  padding: "5px",
                }}>
                <Box sx={{width:"100%",height:"100%",borderRadius:"5px",padding:"10px",display:"flex",flexDirection:"column",gap:"10px",bgcolor:Colors.gray_footer,  position: "relative",
                  "&:hover .hover-button": {
                    opacity: 1, // Show button when hovering over the box
                  },}}>
                  <Typography sx={{textAlign:"start",fontWeight:"bold",fontSize:{xs:"12px",md:"20px"},}}>{t("secontText")}</Typography>
                  <Box sx={{display:"flex",flexDirection:"column",height:"90%",width:"100%",gap:"10px",marginTop:"15px"}} >
                    <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",height:"28%"}}>
                      {/* top side of div */}
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"10px"}}>
                          <Typography variant="h2" sx={{fontWeight:"bold",textAlign:"start"}}>{insertSpaces(item.bankAssets.totalActive)}</Typography>
                            <Typography
                              sx={{
                                color: Colors.gray,
                                width: "auto",
                                lineHeight: "1.2",
                                fontStyle: "italic",
                                fontWeight: "500",
                                wordWrap: "break-word",
                              }}
                            >
                              {t("partoneBillion")}<br/>{t("parttwoBillion")}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
                          {/* Icon with text */}

                          {/* Box containing Icon and percentage */}
                          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                            <MovingIcon
                              sx={{
                                fontSize: "32px",
                                transition: "transform 0.3s ease",
                                color: Colors.green_area,
                              }}
                            />
                            <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: "2px" }}>
                              <Typography variant="h4" sx={{ color: Colors.green_area, fontWeight: "800", lineHeight: "1" }}>
                                {item.bankAssets.totalActivePercentage} <span style={{color: Colors.green_area, fontSize: "20px", lineHeight: "1"}}>%</span>
                              </Typography>
                            </Box>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",height:"70%"}}>
                      {/* pie chart section  */}
                      <Box sx={{ display:"flex",alignItems:"center" ,width:"60%",height:"100%"}} >
                          <PieChartMainChart piechartData={item.bankAssets.pieChartDatas}/>  
                      </Box>
                      {/* right side Texts */}
                      <Box sx={{}}>
                            {/* top side light blue */}
                        <Box sx={{display:"flex",flexDirection:"column"}}>
                            <Box>
                              <Typography sx={{fontSize:"12px",color:Colors.dark,fontWeight:"bold",textAlign:"left",lineHeight:"1",textTransform:"uppercase"}}>{t("assetsCredits")}</Typography>
                              <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:"10px"}}>
                                <Typography sx={{color:"rgba(255, 99, 132, 0.8)",fontSize:"32px",fontWeight:"bold",width:"auto",lineHeight:"1.1",}}>{insertSpaces(item.bankAssets.creditsActive)}</Typography>
                                <Typography sx={{color:Colors.gray,fontSize:"12px",width:"50px", wordWrap: "break-word",textAlign: "start",lineHeight:"1",}}>{t("partoneBillion")}<br/>{t("parttwoBillion")}</Typography>
                              </Box>
                            </Box>
                          {/* bottom side dark_blue national  */}
                          <Box sx={{display:"flex",flexDirection:"column"}}>
                              <Box>
                                <Typography sx={{fontSize:"12px",color:Colors.dark,fontWeight:"bold",textAlign:"left",lineHeight:"1",textTransform:"uppercase"}}>{t("assetsBankDeposits")}</Typography>
                                <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:"10px"}}>
                                  <Typography sx={{color:"rgba(144, 238, 144, 1)",fontSize:"32px",fontWeight:"bold",width:"auto",lineHeight:"1.1",}}>{insertSpaces(item.bankAssets.depositActive)}</Typography>
                                  <Typography sx={{color:Colors.gray,fontSize:"12px",width:"50px", wordWrap: "break-word",textAlign: "start",lineHeight:"1",}}>{t("partoneBillion")}<br/>{t("parttwoBillion")}</Typography>
                                </Box>
                              </Box>
                          </Box>
                          <Box sx={{display:"flex",flexDirection:"column"}}>
                              <Box>
                                <Typography sx={{fontSize:"12px",color:Colors.dark,fontWeight:"bold",textAlign:"left",lineHeight:"1",textTransform:"uppercase"}}>{t("assetsInvestments")}</Typography>
                                <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:"10px"}}>
                                  <Typography sx={{color:"rgba(54, 162, 235, 0.6)",fontSize:"32px",fontWeight:"bold",width:"auto",lineHeight:"1.1",}}>{insertSpaces(item.bankAssets.investmentActive)}</Typography>
                                  <Typography sx={{color:Colors.gray,fontSize:"12px",width:"50px", wordWrap: "break-word",textAlign: "start",lineHeight:"1",}}>{t("partoneBillion")}<br/>{t("parttwoBillion")}</Typography>
                                </Box>
                              </Box>
                          </Box>
                        
                          <Box sx={{display:"flex",flexDirection:"column"}}>
                              <Box>
                                <Typography sx={{fontSize:"12px",color:Colors.dark,fontWeight:"bold",textAlign:"left",lineHeight:"1",textTransform:"uppercase"}}>{t("othersText")}</Typography>
                                <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:"10px"}}>
                                  <Typography sx={{color:"rgba(76, 0, 153, 0.7)",fontSize:"32px",fontWeight:"bold",width:"auto",lineHeight:"1.1",}}>{insertSpaces(item.bankAssets.othersActive)}</Typography>
                                  <Typography sx={{color:Colors.gray,fontSize:"12px",width:"50px", wordWrap: "break-word",textAlign: "start",lineHeight:"1",}}>{t("partoneBillion")}<br/>{t("parttwoBillion")}</Typography>
                                </Box>
                              </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  {/* button styles */}
                  <Box   className="hover-button"
                    sx={{
                      textAlign: "end",
                      position: "absolute",
                      bottom: "10px",
                      right: "10px",
                      opacity: 0, // Initially hidden
                      transition: "opacity 300ms ease", // Smooth transition for hover
                    }}>
                    <Button variant="contained" size={"medium"} onClick={handleOpenAuthModal}>
                    <Typography sx={{color:Colors.white,fontWeight:"800",textTransform:"uppercase"}} >{t("infobutton")}</Typography>
                    </Button>
                  </Box>
                </Box>
              </Grid>
              {/* second div */}
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={4}
                sx={{
                  height: "500px",
                  width:"auto",
                  padding:"5px",
                }}
              >
                <Box sx={{width:"100%",height:"100%",borderRadius:"5px",padding:"10px",display:"flex",flexDirection:"column",gap:"10px",bgcolor:Colors.gray_footer,  position: "relative",
                  "&:hover .hover-button": {
                    opacity: 1, // Show button when hovering over the box
                  },}}>
                  <Typography sx={{textAlign:"start",fontWeight:"bold",fontSize:{xs:"12px",md:"20px"},}}>{t("thirdText")}</Typography>
                  <Box sx={{display:"flex",flexDirection:"column",height:"90%",width:"100%",gap:"10px",marginTop:"15px"}} >
                    <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",height:"28%"}}>
                      {/* top side of div */}
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"10px"}}>
                          <Typography variant="h2" sx={{fontWeight:"bold",textAlign:"start"}}>{insertSpaces(item.bankObligations.totalObligations)}</Typography>
                            <Typography
                              sx={{
                                color: Colors.gray,
                                width: "auto",
                                lineHeight: "1.2",
                                fontStyle: "italic",
                                fontWeight: "500",
                                wordWrap: "break-word",
                              }}
                            >
                              {t("partoneBillion")}<br/>{t("parttwoBillion")}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
                          {/* Icon with text */}

                          {/* Box containing Icon and percentage */}
                          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                            <MovingIcon
                              sx={{
                                fontSize: "32px",
                                transition: "transform 0.3s ease",
                                color: Colors.green_area,
                              }}
                            />
                            <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: "2px" }}>
                              <Typography variant="h4" sx={{ color: Colors.green_area, fontWeight: "800", lineHeight: "1" }}>
                                {item.bankObligations.totalObligationsPercentage} <span style={{color: Colors.green_area, fontSize: "20px", lineHeight: "1"}}>%</span>
                              </Typography>
                            </Box>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",height:"70%"}}>
                      {/* pie chart section  */}
                      <Box sx={{ display:"flex",alignItems:"center" ,width:"60%",height:"100%"}} >
                          <HolePieChart doughtnutData={item.bankObligations.doughtnutData}/>  
                      </Box>
                      {/* right side Texts */}
                      <Box sx={{}}>
                          {/* top side light blue */}
                        <Box sx={{display:"flex",flexDirection:"column"}}>
                            <Box>
                              <Typography sx={{fontSize:"12px",color:Colors.dark,fontWeight:"bold",textAlign:"left",lineHeight:"1",textTransform:"uppercase"}}>{t("obligationCrediteLine")}</Typography>
                              <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:"10px"}}>
                                <Typography sx={{color:"rgba(2, 13, 158, 1)",fontSize:"32px",fontWeight:"bold",width:"auto",lineHeight:"1.1",}}>{insertSpaces(item.bankObligations.creditLines)}</Typography>
                                <Typography sx={{color:Colors.gray,fontSize:"12px",width:"50px", wordWrap: "break-word",textAlign: "start",lineHeight:"1",}}>{t("partoneBillion")}<br/>{t("parttwoBillion")}</Typography>
                              </Box>
                            </Box>
                        </Box>
                        {/* bottom side dark_blue national  */}
                        <Box sx={{display:"flex",flexDirection:"column"}}>
                            <Box>
                              <Typography sx={{fontSize:"12px",color:Colors.dark,fontWeight:"bold",textAlign:"left",lineHeight:"1",textTransform:"uppercase"}}>{t("clientsDeposits")}</Typography>
                              <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:"10px"}}>
                                <Typography sx={{color:"rgba(54, 162, 235, 0.6)",fontSize:"32px",fontWeight:"bold",width:"auto",lineHeight:"1.1",}}>{insertSpaces(item.bankObligations.clientsDeposits)}</Typography>
                                <Typography sx={{color:Colors.gray,fontSize:"12px",width:"50px", wordWrap: "break-word",textAlign: "start",lineHeight:"1",}}>{t("partoneBillion")}<br/>{t("parttwoBillion")}</Typography>
                              </Box>
                            </Box>
                        </Box>
                        <Box sx={{display:"flex",flexDirection:"column"}}>
                            <Box>
                              <Typography sx={{fontSize:"12px",color:Colors.dark,fontWeight:"bold",textAlign:"left",lineHeight:"1",textTransform:"uppercase"}}>{t("bankDeposits")}</Typography>
                              <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:"10px"}}>
                                <Typography sx={{color:"rgba(76, 0, 153, 0.7)",fontSize:"32px",fontWeight:"bold",width:"auto",lineHeight:"1.1",}}>{insertSpaces(item.bankObligations.banksDeposits)}</Typography>
                                <Typography sx={{color:Colors.gray,fontSize:"12px",width:"50px", wordWrap: "break-word",textAlign: "start",lineHeight:"1",}}>{t("partoneBillion")}<br/>{t("parttwoBillion")}</Typography>
                              </Box>
                            </Box>
                        </Box>
                        <Box sx={{display:"flex",flexDirection:"column"}}>
                            <Box>
                              <Typography sx={{fontSize:"12px",color:Colors.dark,fontWeight:"bold",textAlign:"left",lineHeight:"1",textTransform:"uppercase"}}>{t("othersText")}</Typography>
                              <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:"10px"}}>
                                <Typography sx={{color:"rgba(144, 238, 144, 1)",fontSize:"32px",fontWeight:"bold",width:"auto",lineHeight:"1.1",}}>{insertSpaces(item.bankObligations.othersObligations)}</Typography>
                                <Typography sx={{color:Colors.gray,fontSize:"12px",width:"50px", wordWrap: "break-word",textAlign: "start",lineHeight:"1",}}>{t("partoneBillion")}<br/>{t("parttwoBillion")}</Typography>
                              </Box>
                            </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  {/* button styles */}
                  <Box   className="hover-button"
                    sx={{
                      textAlign: "end",
                      position: "absolute",
                      bottom: "10px",
                      right: "10px",
                      opacity: 0, // Initially hidden
                      transition: "opacity 300ms ease", // Smooth transition for hover
                    }}>
                    <Button variant="contained" size={"medium"} onClick={handleOpenAuthModal}>
                    <Typography sx={{color:Colors.white,fontWeight:"800",textTransform:"uppercase"}} >{t("infobutton")}</Typography>
                    </Button>
                  </Box>
                </Box>
              </Grid>
              {/* third div */}
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={4}
                sx={{
                  height: {xs:"400px",md:"500px"},
                  width:"auto",
                  padding:"5px",
                  position: "relative",
                  "&:hover .hover-button": {
                    opacity: 1, // Show button when hovering over the box
                  },
                }}
              >
                <Box sx={{width:"100%",height:"100%",borderRadius:"5px",padding:"10px",display:"flex",flexDirection:"column",gap:"20px",bgcolor:Colors.gray_footer,}}>
                  <Typography sx={{textAlign:"start",fontWeight:"800",fontSize:{xs:"12px",md:"20px"},}}> {t("eighthText")} </Typography>
                  <Box sx={{display:"flex",flexDirection:"column",height:"90%",width:"100%",gap:"10px",marginTop:"15px"}} >
                    <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",height:"28%"}}>
                      {/* top side of div */}
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"10px"}}>
                          <Typography variant="h2" sx={{fontWeight:"bold",textAlign:"start"}}>{insertSpaces(item.bankCapitals.totalCapitals)}</Typography>
                            <Typography
                              sx={{
                                color: Colors.gray,
                                width: "auto",
                                lineHeight: "1.2",
                                fontStyle: "italic",
                                fontWeight: "500",
                                wordWrap: "break-word",
                              }}
                            >
                              {t("partoneBillion")}<br/>{t("parttwoBillion")}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
                          {/* Icon with text */}

                          {/* Box containing Icon and percentage */}
                          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                            <MovingIcon
                              sx={{
                                fontSize: "32px",
                                transition: "transform 0.3s ease",
                                color: Colors.green_area,
                              }}
                            />
                            <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: "2px" }}>
                              <Typography variant="h4" sx={{ color: Colors.green_area, fontWeight: "800", lineHeight: "1" }}>
                                {item.bankCapitals.totalCapitalsPercentage} <span style={{color: Colors.green_area, fontSize: "20px", lineHeight: "1"}}>%</span>
                              </Typography>
                            </Box>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",height:"70%"}}>
                      {/* pie chart section  */}
                      <Box sx={{ display:"flex",alignItems:"center" ,width:"60%",height:"100%"}} >
                          <StackedBartchart  reserveFundLine={item.bankCapitals.reserveFundLine} retainedEarningsLine={item.bankCapitals.retainedEarningsLine} charterCapitalLine={item.bankCapitals.charterCapitalLine} />  
                      </Box>
                      {/* right side Texts */}
                      <Box sx={{}}>
                      
                        {/* middle sie */}
                        <Box sx={{display:"flex",flexDirection:"column"}}>
                            <Box>
                              <Typography sx={{fontSize:"12px",color:Colors.dark,fontWeight:"bold",textAlign:"left",lineHeight:"1",textTransform:"uppercase"}}>{t("reserveFundText")}</Typography>
                              <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:"10px"}}>
                                <Typography sx={{color:"rgba(76, 0, 153, 0.7)",fontSize:"32px",fontWeight:"bold",width:"auto",lineHeight:"1.1",}}>{insertSpaces(item.bankCapitals.reserveFund)}</Typography>
                                <Typography sx={{color:Colors.gray,fontSize:"12px",width:"50px", wordWrap: "break-word",textAlign: "start",lineHeight:"1",}}>{t("partoneBillion")}<br/>{t("parttwoBillion")}</Typography>
                              </Box>
                            </Box>
                        </Box> 
                            {/* top side light blue */}
                            <Box sx={{display:"flex",flexDirection:"column"}}>
                            <Box>
                              <Typography sx={{fontSize:"12px",color:Colors.dark,fontWeight:"bold",textAlign:"left",lineHeight:"1",textTransform:"uppercase"}}>{t("charterCapital")}</Typography>
                              <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:"10px"}}>
                                <Typography sx={{color:"rgba(54, 162, 235, 0.6)",fontSize:"32px",fontWeight:"bold",width:"auto",lineHeight:"1.1",}}>{insertSpaces(item.bankCapitals.charterCapital)}</Typography>
                                <Typography sx={{color:Colors.gray,fontSize:"12px",width:"50px", wordWrap: "break-word",textAlign: "start",lineHeight:"1",}}>{t("partoneBillion")}<br/>{t("parttwoBillion")}</Typography>
                              </Box>
                            </Box>
                        </Box>
                        {/* 30318 chiqarilgan ustav kapitali */}
                        {/* bottom side dark_blue national  */}
                        <Box sx={{display:"flex",flexDirection:"column"}}>
                            <Box>
                              {/* 31203 TAQSIMLANMAGAN FOYDA  */}
                              <Typography sx={{fontSize:"12px",color:Colors.dark,fontWeight:"bold",textAlign:"left",lineHeight:"1",textTransform:"uppercase"}}> {t("retainedEarnings")}</Typography>
                              <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:"10px"}}>
                                <Typography sx={{color:"rgba(0, 77, 77, 0.7)",fontSize:"32px",fontWeight:"bold",width:"auto",lineHeight:"1.1",}}>{insertSpaces(item.bankCapitals.retainedEarnings)}</Typography>
                                <Typography sx={{color:Colors.gray,fontSize:"12px",width:"50px", wordWrap: "break-word",textAlign: "start",lineHeight:"1",}}>{t("partoneBillion")}<br/>{t("parttwoBillion")}</Typography>
                              </Box>
                            </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  {/* button section  */}
                  <Box   className="hover-button"
                    sx={{
                      textAlign: "end",
                      position: "absolute",
                      bottom: "15px",
                      right: "15px",
                      opacity: 0, // Initially hidden
                      transition: "opacity 300ms ease", // Smooth transition for hover
                    }}>
                    <Button variant="contained" size={"medium"} onClick={handleOpenAuthModal}>
                    <Typography sx={{color:Colors.white,fontWeight:"800",textTransform:"uppercase"}} >{t("infobutton")}</Typography>
                    </Button>
                  </Box>
                </Box>
              </Grid> 
              {/* fourth div */}
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={4}
                sx={{
                  height: {xs:"400px",md:"500px"},
                  width:"auto",
                  padding:"5px",
                  position: "relative",
                  "&:hover .hover-button": {
                    opacity: 1, // Show button when hovering over the box
                  },
                }}
              >
                <Box sx={{width:"100%",height:"100%",borderRadius:"5px",padding:"10px",display:"flex",flexDirection:"column",bgcolor:Colors.gray_footer,}}>
                  <Typography sx={{textAlign:"start",fontWeight:"800",fontSize:{xs:"12px",md:"20px"},}}>  {t("firstText")}</Typography>
                            {/* bottom side */}
                          <Box sx={{display:"flex",flexDirection:"column",height:"100%",justifyContent:"center",paddingBottom:"25px"}}>
                            <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",width:"100%",gap:"20px"}}> 
                            {/* left side roa texts */}
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems:"flex-end",
                              }}
                            >
                              <Typography sx={{color:Colors.gray,fontWeight:"normal",fontSize:"42px",overflow: "hidden", whiteSpace: "nowrap",textOverflow:"ellipsis", display: 'block', maxWidth: '100%', }}>{t("netProfitText")}</Typography>
                              <Typography sx={{color:Colors.gray,fontWeight:"normal",fontSize:"48px"}}>ROA</Typography>
                              <Typography sx={{color:Colors.gray,fontWeight:"normal",fontSize:"48px"}}>ROE</Typography>
                              <Typography sx={{color:Colors.gray,fontWeight:"normal",fontSize:"48px"}}>CIR</Typography>
                            </Box>
                              {/* right percentage */}
                              <Box sx={{display:"flex",flexDirection:"column",alignItems:"start",justifyContent:"center" }}>
                                  <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",textAlign:"left",height:"100%",gap:"10px"}}>
                                    <Typography sx={{fontWeight:"bold",textAlign:"start",color:Colors.blue_middle,fontSize:"40px"}}>{insertSpaces(item.bankProfitability.netProfit)}</Typography>
                                    <Typography
                                      sx={{
                                        color: Colors.gray,
                                        width: "auto",
                                        fontStyle: "italic",
                                        fontWeight: "500",
                                        wordWrap: "break-word",
                                        fontSize:"16px",
                                        lineHeight:"1.2",
                                      }}
                                    >
                                      {t("partoneBillion")}<br/>{t("parttwoBillion")}
                                    </Typography>
                                  </Box>

                                <Typography sx={{color:Colors.blue_middle,fontWeight:"bold",fontSize:"48px"}}>{item.bankProfitability.totalRoa}<span style={{color:Colors.blue_middle,fontSize:"28px"}}>%</span></Typography>
                                <Typography sx={{color:Colors.blue_middle,fontWeight:"bold",fontSize:"48px"}}>{item.bankProfitability.totalRoe}<span style={{color:Colors.blue_middle,fontSize:"28px"}}>%</span></Typography>
                                <Typography sx={{color:Colors.blue_middle,fontWeight:"bold",fontSize:"48px"}}>{item.bankProfitability.totalCir}<span style={{color:Colors.blue_middle,fontSize:"28px"}}>%</span></Typography>
                              </Box>
                            </Box>
                          </Box>
                    {/* button section */}
                  <Box   className="hover-button"
                    sx={{
                      textAlign: "end",
                      position: "absolute",
                      bottom: "15px",
                      right: "15px",
                      opacity: 0, // Initially hidden
                      transition: "opacity 300ms ease", // Smooth transition for hover
                    }}>
                    <Button variant="contained" size={"medium"} onClick={handleOpenAuthModal}>
                    <Typography sx={{color:Colors.white,fontWeight:"800",textTransform:"uppercase"}} >{t("infobutton")}</Typography>
                    </Button>
                  </Box>
                </Box>
              </Grid>
              {/* fifth div*/}
                <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={4}
                sx={{
                  height: {xs:"400px",md:"500px"},
                  width:"auto",
                  padding:"5px",
                  position:"relative",
                  "&:hover .hovers-button": {
                    opacity: 1, // Show button when hovering over the box
                  },
                }}
              >
                  <Box sx={{width:"100%",height:"100%",borderRadius:"5px",padding:"10px",display:"flex",flexDirection:"column",gap:"20px",bgcolor:Colors.gray_footer,}}>
                  <Typography sx={{textAlign:"start",fontWeight:"800",fontSize:{xs:"12px",md:"20px"},}}>{t("ninthText")}</Typography>
                  <Box sx={{display:"flex",flexDirection:"column",height:"90%",width:"100%",gap:"10px",marginTop:"15px"}} >
                    <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",height:"28%"}}>
                      {/* top side of div */}
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"10px"}}>
                          <Typography variant="h2" sx={{fontWeight:"bold",textAlign:"start"}}>{insertSpaces(item.bankIncomes.totalIncomes)}</Typography>
                            <Typography
                              sx={{
                                color: Colors.gray,
                                width: "auto",
                                lineHeight: "1.2",
                                fontStyle: "italic",
                                fontWeight: "500",
                                wordWrap: "break-word",
                              }}
                            >
                              {t("partoneBillion")}<br/>{t("parttwoBillion")}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
                          {/* Box containing Icon and percentage */}
                          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                            <MovingIcon
                              sx={{
                                fontSize: "32px",
                                transition: "transform 0.3s ease",
                                color: Colors.green_area,
                              }}
                            />
                            <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: "2px" }}>
                              <Typography variant="h4" sx={{ color: Colors.green_area, fontWeight: "800", lineHeight: "1" }}>
                                {item.bankIncomes.totalIncomesPercentage} <span style={{color: Colors.green_area, fontSize: "20px", lineHeight: "1"}}>%</span>
                              </Typography>
                            </Box>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",height:"70%"}}>
                      {/* pie chart section  */}
                      <Box sx={{ display:"flex",alignItems:"center" ,width:"60%",height:"100%"}} >
                          <VerticalBarchartTwo percentageIncome={item.bankIncomes.percentageIncomePercentage} nopercentageIncome={item.bankIncomes.nopercentageIncomePercentage} />  
                      </Box>
                      {/* right side Texts */}
                      <Box sx={{}}>
                          {/* top side light blue */}
                        <Box sx={{display:"flex",flexDirection:"column"}}>
                            <Box>
                              <Typography sx={{fontSize:"12px",color:Colors.dark,fontWeight:"bold",textAlign:"left",lineHeight:"1",textTransform:"uppercase"}}>{t("percentageIncomeText")}</Typography>
                              <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:"10px"}}>
                                <Typography sx={{color:"rgba(54, 100, 200, 1)",fontSize:"32px",fontWeight:"bold",width:"auto",lineHeight:"1.1",}}>{insertSpaces(item.bankIncomes.percentageIncome)}</Typography>
                                <Typography sx={{color:Colors.gray,fontSize:"12px",width:"50px", wordWrap: "break-word",textAlign: "start",lineHeight:"1",}}>{t("partoneBillion")}<br/>{t("parttwoBillion")}</Typography>
                              </Box>
                            </Box>
                        </Box>
                        {/* bottom side dark_blue national  */}
                        <Box sx={{display:"flex",flexDirection:"column"}}>
                            <Box>
                              <Typography sx={{fontSize:"12px",color:Colors.dark,fontWeight:"bold",textAlign:"left",lineHeight:"1",textTransform:"uppercase"}}>{t("noPercenteageIncomeText")}</Typography>
                              <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:"10px"}}>
                                <Typography sx={{color:"rgba(60, 179, 113, 1)",fontSize:"32px",fontWeight:"bold",width:"auto",lineHeight:"1.1",}}>{insertSpaces(item.bankIncomes.nopercentageIncome)}</Typography>
                                <Typography sx={{color:Colors.gray,fontSize:"12px",width:"50px", wordWrap: "break-word",textAlign: "start",lineHeight:"1",}}>{t("partoneBillion")}<br/>{t("parttwoBillion")}</Typography>
                              </Box>
                            </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                      {/* button section */}
                  <Box    className="hovers-button"
                    sx={{
                      textAlign: "end",
                      position: "absolute",
                      bottom: "15px",
                      right: "15px",
                      opacity: 0, // Initially hidden
                      transition: "opacity 300ms ease", // Smooth transition for hover
                    }}>
                    <Button variant="contained" size={"medium"} onClick={handleOpenAuthModal}>
                    <Typography sx={{color:Colors.white,fontWeight:"800",textTransform:"uppercase"}} >{t("infobutton")}</Typography>
                    </Button>
                  </Box>
                </Box>
              </Grid>
              {/* sixth div */}
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={4}
                sx={{
                  height: {xs:"400px",md:"500px"},
                  width:"auto",
                  padding:"5px",
                  position: "relative",
                  "&:hover .hover-button": {
                    opacity: 1, // Show button when hovering over the box
                  },
                }}
              >
                <Box sx={{width:"100%",height:"100%",borderRadius:"5px",padding:"10px",display:"flex",flexDirection:"column",gap:"20px",bgcolor:Colors.gray_footer,position:"relative"}}>
                  <Typography sx={{textAlign:"start",fontWeight:"800",fontSize:{xs:"12px",md:"20px"},}}>{t("thirteenth")}</Typography>
                  <Box sx={{display:"flex",flexDirection:"column",height:"90%",width:"100%",gap:"10px",marginTop:"15px"}} >
                    <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",height:"28%"}}>
                      {/* top side of div */}
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"10px"}}>
                          <Typography variant="h2" sx={{fontWeight:"bold",textAlign:"start"}}>{insertSpaces(item.bankExpenses.totalExpenses)}</Typography>
                            <Typography
                              sx={{
                                color: Colors.gray,
                                width: "auto",
                                lineHeight: "1.2",
                                fontStyle: "italic",
                                fontWeight: "500",
                                wordWrap: "break-word",
                              }}
                            >
                              {t("partoneBillion")}<br/>{t("parttwoBillion")}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
                          {/* Icon with text */}

                          {/* Box containing Icon and percentage */}
                          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                            <MovingIcon
                              sx={{
                                fontSize: "32px",
                                transition: "transform 0.3s ease",
                                color: Colors.green_area,
                              }}
                            />
                            <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: "2px" }}>
                              <Typography variant="h4" sx={{ color: Colors.green_area, fontWeight: "800", lineHeight: "1" }}>
                                {item.bankExpenses.totalExpensesPercentage} <span style={{color: Colors.green_area, fontSize: "20px", lineHeight: "1"}}>%</span>
                              </Typography>
                            </Box>
                          </Box>
                      </Box>
                    </Box>
                    <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",height:"70%"}}>
                      {/* pie chart section  */}
                      <Box sx={{ display:"flex",alignItems:"center" ,width:"60%",height:"100%"}} >
                      <MainPageCostBarchart percentageCost={item.bankExpenses.percentageCostPercentage} nopercentageCost={item.bankExpenses.nopercentageCostPercentage} />  
                      </Box>
                      {/* right side Texts */}
                      <Box sx={{}}>
                          {/* top side light blue */}
                        <Box sx={{display:"flex",flexDirection:"column"}}>
                            <Box>
                              <Typography sx={{fontSize:"12px",color:Colors.dark,fontWeight:"bold",textAlign:"left",lineHeight:"1",textTransform:"uppercase"}}>{t("percentageCostText")}</Typography>
                              <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:"10px"}}>
                                <Typography sx={{color:"rgba(54, 100, 200, 1)",fontSize:"32px",fontWeight:"bold",width:"auto",lineHeight:"1.1",}}>{insertSpaces(item.bankExpenses.percentageCost)}</Typography>
                                <Typography sx={{color:Colors.gray,fontSize:"12px",width:"50px", wordWrap: "break-word",textAlign: "start",lineHeight:"1",}}>{t("partoneBillion")}<br/>{t("parttwoBillion")}</Typography>
                              </Box>
                            </Box>
                        </Box>
                        {/* bottom side dark_blue national  */}
                        <Box sx={{display:"flex",flexDirection:"column"}}>
                            <Box>
                              <Typography sx={{fontSize:"12px",color:Colors.dark,fontWeight:"bold",textAlign:"left",lineHeight:"1",textTransform:"uppercase"}}>{t("nopercentageCostText")}</Typography>
                              <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:"10px"}}>
                                <Typography sx={{color:"rgba(60, 179, 113, 1)",fontSize:"32px",fontWeight:"bold",width:"auto",lineHeight:"1.1",}}>{insertSpaces(item.bankExpenses.nopercentageCost)}</Typography>
                                <Typography sx={{color:Colors.gray,fontSize:"12px",width:"50px", wordWrap: "break-word",textAlign: "start",lineHeight:"1",}}>{t("partoneBillion")}<br/>{t("parttwoBillion")}</Typography>
                              </Box>
                            </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  {/* button section */}
                  <Box   className="hover-button"
                    sx={{
                      textAlign: "end",
                      position: "absolute",
                      bottom: "10px",
                      right: "10px",
                      opacity: 0, // Initially hidden
                      transition: "opacity 300ms ease", // Smooth transition for hover
                    }}>
                    <Button variant="contained" size={"medium"} onClick={handleOpenAuthModal}>
                    <Typography sx={{color:Colors.white,fontWeight:"800",textTransform:"uppercase"}} >{t("infobutton")}</Typography>
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          ))
        ) : (
          <Typography>No data available</Typography> // Handle case where chooseData is empty or not an array
        )}
                  {/* <=== AUTHORISATION MODAL ===>*/}
            <Modal
                open={openauthmodal}
                onClose={handleCloseAuthModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
              <Box sx={{position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: "auto",
                  bgcolor: "blue",
                  border: '1px solid gray',
                  boxShadow: 24,
                  borderRadius:"5px",
                  }}>
                  <Alert variant="filled" severity="info">
                    {t("accessmodaltext")}
                  </Alert>
              </Box>
            </Modal>
        </Box>
      <Footer/>
    </Box>
    </Container>
  )
}

export default AccessAll;