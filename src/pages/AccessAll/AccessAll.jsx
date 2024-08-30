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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
// import screen components //
import DoughnutChart from '../../components/Doughnut/Doughnut';
import HorizontalBarChart from '../../components/HorizontalBarchart/HorizontalBarchart';
import AreaChart from '../../components/AreaChart/AreaChart';
import SteppedLineChart from '../../components/SteppedLineChart/SteppedLineChart';
import PieChart from '../../components/PieChart/PieChart';
import VerticalBarChart from '../../components/VerticalBarChart/VerticalBarChart';
import SynchronizedLineCharts from "../../components/SynchronizedLineCharts/SynchronizedLineCharts.jsx";
import RadialBarChartComponent from "../../components/RadialBarChart/RadialBarChart.jsx";
import RadarChart from "../../components/RadarChart/RadarChart.jsx";
import SparklineApp from "../../components/Sparkline/Sparkline.jsx";
// 12 Screen Components //
import LiabilitiesChart from "../../components/TwelfScreenComponents/ThirdScreenComponent/LiabilitiesChart.jsx";
import LoanPortfolioChart from "../../components/TwelfScreenComponents/FouthScreenComponent/LoanPortfolioChart .jsx";
import NetProfitChart from "../../components/TwelfScreenComponents/FifthScreenComponent/NetProfitChart.jsx";
import DigitalIndicatorsChart from "../../components/TwelfScreenComponents/SixthScreenComponent/DigitalIndicatorsChart.jsx";
import CurrencyIndicatorsChart from "../../components/TwelfScreenComponents/SeventhScreenComponent/CurrencyIndicatorsChart.jsx";
import CapitalChart from "../../components/TwelfScreenComponents/EightScreenComponent/CapitalChart.jsx";
import RevenuesExpensesChart from "../../components/TwelfScreenComponents/NinthScreenComponent/RevenuesExpensesChart.jsx";
import RisksComplianceChart from "../../components/TwelfScreenComponents/TenthScreenComponent/RisksComplianceChart.jsx";
import FinancialStabilityChart from "../../components/TwelfScreenComponents/EleventhScreenComponent/FinancialStabilityChart.jsx";
import StrategicPlansChart from "../../components/TwelfScreenComponents/TwelfScreen/StrategicPlansChart.jsx";




// import image //
import LeftSideSVG from "../../assets/svg/Left_SVG.svg";
// recharts elements //
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Tooltip,
  LabelList,
} from "recharts";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

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
  // barchart section code elements //
    // <----- BAR CHART DATA -----> //
    const barchartdata = [
      {
        // name: "PageA",
        plan: 4000,
        fact: 2400,
        amt: 2400,
        percentage:"120"
      },
      {
        // name: "PageB",
        plan: 6000,
        fact: 1398,
        amt: 2210,
      },
      {
        // name: "PageC",
        plan: 2000,
        fact: 1000,
        amt: 2290,
      },
    ];
    
      // <=== BArchart styles ====> //
      // Styled components

    const renderShape = ({ x, y, width, height }) => {
      const translateX = width * (-0.25); // 10% of the width
      const borderRadius = 5; // Radius for the top corners
      return (
        <>
          <rect
            className="shape_render"
            x={x}
            y={y}
            width={`10%`}
            height={height}
            fill={Colors.blue_middle}
            ry={borderRadius} // Apply radius to top-left and top-right corners
            transform={`translate(${translateX}, 0)`}
            
          />
        </>
      )
    };
    const renderBlueShape = ({ x, y, width, height }) => {
      const translateX = width * (0.4); // 10% of the width
      return (
        <>
          <rect
            className="shape_blue"
            x={x}
            y={y}
            width={`10%`}
            height={height}
            fill={Colors.gray_back}
            ry={5}
            transform={`translate(${translateX}, 0)`}
          />
        </>

      )
    };
    const renderCustomizedLabel = (props) => {
      const { x, y, width, value } = props;
      const rectWidth = 65;
      const rectHeight = 20;
      const rectX = x + width / 2 - rectWidth / 2 + 22;
      const rectY = y - rectHeight - 5; // Adjust y position as needed
      const loginValue = value >= 100 ? true : false;
      return (
        <g className="custom-label" >
          <rect
            x={rectX}
            y={rectY}
            width={rectWidth}
            height={rectHeight}
            fill={Colors.transparent}
          />
          <foreignObject
            x={rectX}
            y={rectY}
            width={rectWidth}
            height={rectHeight}
          >
          <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
              <Box
                sx={{
                  color: loginValue ? Colors.blue_middle : Colors.red,
                  fontSize: '14px', // Adjust the size as needed
                }}
              >
                <FontAwesomeIcon icon={faCircleCheck} />
              </Box>
            <Typography
              component="span"
              sx={{
                color: loginValue ? Colors.blue_middle : Colors.red,
                fontWeight: '500', // Adjust font weight as needed
                fontSize: '16px', // Adjust font size as needed
              }}
            >
              {value}%
            </Typography>
          </Box>
          </foreignObject>
        </g>
      );
    };

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
      <Header changeLang={changeLang} />
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
          {/* <==== BARCHART CARDS SECTION ====> */}
          <Grid
            container
            sx={{ margin: "auto" ,}}
            direction="row"
            width={"100%"}
          >
            {/* first div */}
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
                
              }}
            >
              <Box sx={{width:"100%",height:"100%",borderRadius:"5px",padding:"10px",display:"flex",flexDirection:"column",gap:"30px",bgcolor:Colors.gray_footer,}}>
                <Typography sx={{textAlign:"start",fontWeight:"800",fontSize:{xs:"12px",md:"16px"},}}>{t("firstText")}</Typography>
                <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",height:"73%"}} >
                    <Box sx={{display:"flex",flexDirection:"column",gap:"10px",}}>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"10px"}}>
                          <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400",textTransform:"uppercase"}}>ROA</Typography>
                          <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                        </Box>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"10px"}}>
                          <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400",textTransform:"uppercase"}}>ROE</Typography>
                          <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                        </Box>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"10px"}}>
                          <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400",}}>CIR</Typography>
                          <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                        </Box>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"10px"}}>
                          <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400"}}>COR</Typography>
                          <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                        </Box>
                    </Box>
                    <Box sx={{display:"flex",flexDirection:"column",gap:"10px"}}>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"10px"}}>
                          <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400",textTransform:"uppercase"}}>NPL</Typography>
                          <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                        </Box>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"10px"}}>
                        <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400",textTransform:"uppercase"}}>NPS</Typography>
                        <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                      </Box>
                      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"10px"}}>
                          <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400",textTransform:"uppercase"}}>MAU</Typography>
                          <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                        </Box>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"10px"}}>
                        <Typography sx={{color:Colors.gray_text,fontSize:{xs:"22px",sm:"30px",md:"32px"},fontWeight:"400"}}>NIM</Typography>
                        <Typography sx={{color:Colors.blue_middle,fontSize:{xs:"22px",sm:"34px",md:"36px"},fontWeight:"900"}}>21%</Typography>
                      </Box>
                    </Box>
                </Box>
                <Box sx={{textAlign:"end"}}>
                  <Button variant="contained" size={"medium"} onClick={() => navigate("/netprofit")}>
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
              <Box sx={{width:"100%",height:"100%",borderRadius:"5px",padding:"10px",display:"flex",flexDirection:"column",gap:"10px",bgcolor:Colors.gray_footer,}}>
                <Typography sx={{textAlign:"start",fontWeight:"800",fontSize:{xs:"12px",md:"16px"},}}>{t("secontText")}</Typography>
                <Box sx={{display:"flex",flexDirection:"column",height:"81%"}} >
                  {/* three text container Box */}
                  <Box sx={{width:"100%",height:"auto",display:"flex",alignItems:"center",justifyContent:"space-around",}}>
                    <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",}}>
                      <Typography sx={{lineHeight:"1.2",fontSize:{xs:"8px",md:"10px"},fontWeight:"600"}}>ЖАМИ</Typography>
                      <Typography component="span" sx={{lineHeight:"1.2",color:Colors.gray_text,fontSize:{xs:"8px",md:"10px"},fontWeight:"500",fontStyle:"italic"}}>млрд.сўм.экв</Typography>
                    </Box>
                    <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",width:"50px"}}>
                      <Typography sx={{lineHeight:"1.2",fontSize:{xs:"8px",md:"10px"},fontWeight:"600"}}>ХОРИЖИЙ ВАЛЮТАДА</Typography>
                      <Typography component="span" sx={{lineHeight:"1.2",color:Colors.gray_text,fontSize:{xs:"8px",md:"10px"},fontWeight:"500",fontStyle:"italic"}}>минг.долл</Typography>
                    </Box>
                    <Box sx={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                      <Typography sx={{lineHeight:"1.2",fontSize:{xs:"8px",md:"10px"},fontWeight:"600"}}>МИЛЛИЙ ВАЛЮТАДА</Typography>
                      <Typography component="span" sx={{lineHeight:"1.2",color:Colors.gray_text,fontSize:{xs:"8px",md:"10px"},fontWeight:"500",fontStyle:"italic"}}>млрд.сўм.экв</Typography>
                    </Box>
                  </Box>
                  {/* plan fakt top text  */}
                  <Box sx={{height:"auto",width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                      <Box></Box>
                    <Box sx={{display:"flex",flexDirection:"column",gap:"5px"}}>
                      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",gap:"5px"}}> 
                        <Box sx={{width:"10px",height:"10px",borderRadius:"50%",bgcolor:Colors.gray_text}}></Box>
                        <Typography sx={{color:Colors.gray_text,lineHeight:"1",fontWeight:"500",fontSize:"14px"}}>План</Typography>
                      </Box>
                      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",gap:"5px"}}> 
                        <Box sx={{width:"10px",height:"10px",borderRadius:"50%",bgcolor:Colors.blue_middle}}></Box>
                        <Typography sx={{color:Colors.blue_middle,lineHeight:"1",fontWeight:"500",fontSize:"14px"}}>Факт</Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{height:"350px",width:"100%",position:"relative"}}>
                  <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        width={500}
                        height={400}
                        data={barchartdata}
                        margin={{
                          top: 25,
                        }}
                        padding={{
                          top: 45,
                        }}
                      >
                        <Tooltip />
                        <Bar
                          dataKey="plan"
                          fill={Colors.gray_text}
                          minPointSize={5}
                          shape={renderBlueShape}
                        >
                          <LabelList
                            dataKey="percentage"
                            content={renderCustomizedLabel}
                          />
                        </Bar>
                        <Bar
                          dataKey="fact"
                          fill={Colors.blue_middle}
                          minPointSize={10}
                          shape={renderShape}
                        />
                      </BarChart>
                  </ResponsiveContainer>
                  <Box  sx={{ marginTop:"-35px",position:"absolute",display:"flex",alignItems:"center",justifyContent:"space-around",width:"100%" }}>
                    <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"10px"}}>
                      <Typography sx={{border:"1px solid",borderColor:Colors.gray_text,padding:"4px",lineHeight:1 ,borderRadius:"5px",bgcolor:Colors.white,color:Colors.gray_text,fontSize:{xs:"10px",md:"16px"}}}>4000</Typography>
                      <Typography sx={{border:"1px solid",borderColor:Colors.blue_middle,padding:"4px",lineHeight:1 ,borderRadius:"5px",bgcolor:Colors.white,color:Colors.blue_middle,fontSize:{xs:"10px",md:"16px"}}}>2000</Typography>
                    </Box>
                    <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"10px"}}>
                      <Typography sx={{border:"1px solid",borderColor:Colors.gray_text,padding:"4px",lineHeight:1 ,borderRadius:"5px",bgcolor:Colors.white,color:Colors.gray_text,fontSize:{xs:"10px",md:"16px"}}}>4000</Typography>
                      <Typography sx={{border:"1px solid",borderColor:Colors.blue_middle,padding:"4px",lineHeight:1 ,borderRadius:"5px",bgcolor:Colors.white,color:Colors.blue_middle,fontSize:{xs:"10px",md:"16px"}}}>2000</Typography>
                    </Box>
                    <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"10px"}}>
                      <Typography sx={{border:"1px solid",borderColor:Colors.gray_text,padding:"4px",lineHeight:1 ,borderRadius:"5px",bgcolor:Colors.white,color:Colors.gray_text,fontSize:{xs:"10px",md:"16px"}}}>4000</Typography>
                      <Typography sx={{border:"1px solid",borderColor:Colors.blue_middle,padding:"4px",lineHeight:1 ,borderRadius:"5px",bgcolor:Colors.white,color:Colors.blue_middle,fontSize:{xs:"10px",md:"16px"}}}>2000</Typography>
                    </Box>
                  </Box>
                    <Box sx={{position:"absolute",bottom:"30%",left:"26%"}}>
                      <Box
                          component="img"
                          src={LeftSideSVG}
                          sx={{ width: {xs:"35px",md:"45px"}, cursor: "pointer" }}
                        />
                    </Box>
                  </Box>
                </Box>
                <Box sx={{textAlign:"end"}}>
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
                padding:"5px"
              }}
            >
              <Box sx={{width:"100%",height:"100%",borderRadius:"5px",padding:"10px",display:"flex",flexDirection:"column",gap:"20px",bgcolor:Colors.gray_footer,}}>
                <Typography sx={{textAlign:"start",fontWeight:"800",fontSize:{xs:"12px",md:"16px"},}}>{t("thirdText")}</Typography>
                <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",height:"77%",bgcolor:"transparent"}} >
                  {/* <HorizontalBarChart /> */}
                  <LiabilitiesChart/>
                </Box>
                <Box sx={{textAlign:"end"}}>
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
                padding:"5px"
              }}
            >
              <Box sx={{width:"100%",height:"100%",borderRadius:"5px",padding:"10px",display:"flex",flexDirection:"column",gap:"20px",bgcolor:Colors.gray_footer,}}>
                <Typography sx={{textAlign:"start",fontWeight:"800",fontSize:{xs:"12px",md:"16px"},}}>{t("fourthText")}</Typography>
                <Box sx={{display:"flex",height:"77%"}} >
                    {/* <AreaChart/> */}
                    <LoanPortfolioChart/>
                </Box>
                <Box sx={{textAlign:"end"}}>
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
                padding:"5px"
              }}
            >
                <Box sx={{width:"100%",height:"100%",borderRadius:"5px",padding:"10px",display:"flex",flexDirection:"column",gap:"20px",bgcolor:Colors.gray_footer,}}>
                <Typography sx={{textAlign:"start",fontWeight:"800",fontSize:{xs:"12px",md:"16px"},}}>{t("fifthText")}</Typography>
                <Box sx={{display:"flex",height:"77%"}} >
                  <NetProfitChart/>
                </Box>
                <Box sx={{textAlign:"end"}}>
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
              }}
            >
              <Box sx={{width:"100%",height:"100%",borderRadius:"5px",padding:"10px",display:"flex",flexDirection:"column",gap:"20px",bgcolor:Colors.gray_footer,}}>
                <Typography sx={{textAlign:"start",fontWeight:"800",fontSize:{xs:"12px",md:"16px"},}}>{t("sixthText")}</Typography>
                <Box sx={{display:"flex",height:"77%"}} >
                  <DigitalIndicatorsChart/>
                </Box>
                <Box sx={{textAlign:"end"}}>
                  <Button variant="contained" size={"medium"} onClick={handleOpenAuthModal}>
                  <Typography sx={{color:Colors.white,fontWeight:"800",textTransform:"uppercase"}} >{t("infobutton")}</Typography>
                  </Button>
                </Box>
              </Box>
            </Grid>
            {/* seventh div */}
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
              }}
            >
                <Box sx={{width:"100%",height:"100%",borderRadius:"5px",padding:"10px",display:"flex",flexDirection:"column",gap:"20px",bgcolor:Colors.gray_footer,}}>
                <Typography sx={{textAlign:"start",fontWeight:"800",fontSize:{xs:"12px",md:"16px"},}}>{t("seventhText")}</Typography>
                <Box sx={{display:"flex",height:"77%"}} >
                  <CurrencyIndicatorsChart/>
                </Box>
                <Box sx={{textAlign:"end"}}>
                  <Button variant="contained" size={"medium"} onClick={handleOpenAuthModal}>
                  <Typography sx={{color:Colors.white,fontWeight:"800",textTransform:"uppercase"}} >{t("infobutton")}</Typography>
                  </Button>
                </Box>
              </Box>
            </Grid>
            {/* eight div */}
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={4}
              sx={{
                height: {xs:"400px",md:"500px"},
                width:"auto",
                padding:"5px"
              }}
            >
            <Box sx={{width:"100%",height:"100%",borderRadius:"5px",padding:"10px",display:"flex",flexDirection:"column",gap:"20px",bgcolor:Colors.gray_footer,}}>
                <Typography sx={{textAlign:"start",fontWeight:"800",fontSize:{xs:"12px",md:"16px"},}}>{t("eighthText")}</Typography>
                <Box sx={{display:"flex",height:"77%"}} >
                  <CapitalChart/>
                </Box>
                <Box sx={{textAlign:"end"}}>
                  <Button variant="contained" size={"medium"} onClick={handleOpenAuthModal}>
                  <Typography sx={{color:Colors.white,fontWeight:"800",textTransform:"uppercase"}} >{t("infobutton")}</Typography>
                  </Button>
                </Box>
              </Box>
            </Grid>
            {/* nineth div */}
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={4}
              sx={{
                height: {xs:"400px",md:"500px"},
                width:"auto",
                padding:"5px"
              }}
            >
                <Box sx={{width:"100%",height:"100%",borderRadius:"5px",padding:"10px",display:"flex",flexDirection:"column",gap:"20px",bgcolor:Colors.gray_footer,}}>
                <Typography sx={{textAlign:"start",fontWeight:"800",fontSize:{xs:"12px",md:"16px"},}}>{t("ninthText")}</Typography>
                <Box sx={{display:"flex",height:"77%"}} >
                  <RevenuesExpensesChart/>
                </Box>
                <Box sx={{textAlign:"end"}}>
                  <Button variant="contained" size={"medium"} onClick={handleOpenAuthModal}>
                  <Typography sx={{color:Colors.white,fontWeight:"800",textTransform:"uppercase"}} >{t("infobutton")}</Typography>
                  </Button>
                </Box>
              </Box>
            </Grid>
            {/* tenth div */}
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={4}
              sx={{
                height: {xs:"400px",md:"500px"},
                width:"auto",
                padding:"5px"
              }}
            >
                <Box sx={{width:"100%",height:"100%",borderRadius:"5px",padding:"10px",display:"flex",flexDirection:"column",gap:"20px",bgcolor:Colors.gray_footer,}}>
                <Typography sx={{textAlign:"start",fontWeight:"800",fontSize:{xs:"12px",md:"16px"},}}>{t("tenthText")}</Typography>
                <Box sx={{display:"flex",height:"77%"}} >
                  <RisksComplianceChart/>
                </Box>
                <Box sx={{textAlign:"end"}}>
                  <Button variant="contained" size={"medium"} onClick={handleOpenAuthModal}>
                  <Typography sx={{color:Colors.white,fontWeight:"800",textTransform:"uppercase"}} >{t("infobutton")}</Typography>
                  </Button>
                </Box>
              </Box>
            </Grid>
            {/* eleventh div */}
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
              }}
            >
                <Box sx={{width:"100%",height:"100%",borderRadius:"5px",padding:"10px",display:"flex",flexDirection:"column",gap:"20px",bgcolor:Colors.gray_footer,}}>
                <Typography sx={{textAlign:"start",fontWeight:"800",fontSize:{xs:"12px",md:"16px"},}}>{t("eleventhText")}</Typography>
                <Box sx={{display:"flex",height:"77%"}} >
                  <FinancialStabilityChart/>
                </Box>
                <Box sx={{textAlign:"end"}}>
                  <Button variant="contained" size={"medium"} onClick={handleOpenAuthModal}>
                  <Typography sx={{color:Colors.white,fontWeight:"800",textTransform:"uppercase"}} >{t("infobutton")}</Typography>
                  </Button>
                </Box>
              </Box>
            </Grid>
            {/* twelveth div */}
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
              }}
            >
              <Box sx={{width:"100%",height:"100%",borderRadius:"5px",padding:"10px",display:"flex",flexDirection:"column",gap:"20px",bgcolor:Colors.gray_footer,}}>
                <Typography sx={{textAlign:"start",fontWeight:"800",fontSize:{xs:"12px",md:"16px"},}}>{t("twelfthText")}</Typography>
                <Box sx={{display:"flex",height:"77%"}} >
                  <StrategicPlansChart/>
                </Box>
                <Box sx={{textAlign:"end"}}>
                  <Button variant="contained" size={"medium"} onClick={handleOpenAuthModal}>
                  <Typography sx={{color:Colors.white,fontWeight:"800",textTransform:"uppercase"}} >{t("infobutton")}</Typography>
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
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