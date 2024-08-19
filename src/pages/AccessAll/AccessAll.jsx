import * as React from 'react'
import { Container, Box, Typography, Button, Grid } from "@mui/material";
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

const AccessAll = () => {
  const navigate = useNavigate();
  const [userdata, setUserData] = React.useState([]);
  const [usertype, setUsertype] = React.useState("leader");
  const [barlogin, setBarlogin] = React.useState(true);
  const [barpoint, setBarpoint] = React.useState("");

  
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
      <Header/>
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
                KPI БУРЧАГИ
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
                <Typography variant="text" sx={{fontSize:{xs:"10px",md:"14px",lg:"16px"},fontWeight:"nornal",color:Colors.green_dark,textTransform:"uppercase"}}>
                САҲИФАМИЗГА ХУШ КЕЛИБСИЗ, ҲУРМАТЛИ
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
                  color: Colors.blue_nbutton,
                }}
                onClick={handleOpenKPI}
              >
                KPI НАТИЖАЛАРИ БИЛАН ТАНИШИШ
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
                <Typography sx={{textAlign:"start",fontWeight:"800",fontSize:{xs:"12px",md:"16px"},}}>БАНК РЕНТАБЕЛЛИГИ КЎРСАТКИЧЛАРИ</Typography>
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
                  <Button variant="contained" size={"medium"}>
                      <Typography sx={{color:Colors.white,fontWeight:"800"}} >ТЎЛИҚ МАЪЛУМОТ</Typography>
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
                <Typography sx={{textAlign:"start",fontWeight:"800",fontSize:{xs:"12px",md:"16px"},}}>БАНК АКТИВЛАРИ</Typography>
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
                  <Button variant="contained" size={"medium"}>
                      <Typography sx={{color:Colors.white,fontWeight:"800"}} >ТЎЛИҚ МАЪЛУМОТ</Typography>
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
              <Box sx={{width:"100%",height:"100%",bgcolor:Colors.gray_footer,borderRadius:"5px"}}>

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
              <Box sx={{width:"100%",height:"100%",bgcolor:Colors.gray_footer,borderRadius:"5px"}}>

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
              <Box sx={{width:"100%",height:"100%",bgcolor:Colors.gray_footer,borderRadius:"5px"}}>

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
              <Box sx={{width:"100%",height:"100%",borderRadius:"5px",padding:"10px",display:"flex",flexDirection:"column",gap:"30px",bgcolor:Colors.gray_footer,}}>
                <Typography sx={{textAlign:"start",fontWeight:"800",fontSize:{xs:"12px",md:"16px"},}}>БАНК РЕНТАБЕЛЛИГИ КЎРСАТКИЧЛАРИ</Typography>
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
                  <Button variant="contained" size={"medium"}>
                      <Typography sx={{color:Colors.white,fontWeight:"800"}} >ТЎЛИҚ МАЪЛУМОТ</Typography>
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
              <Box sx={{width:"100%",height:"100%",borderRadius:"5px",padding:"10px",display:"flex",flexDirection:"column",gap:"30px",bgcolor:Colors.gray_footer,}}>
                <Typography sx={{textAlign:"start",fontWeight:"800",fontSize:{xs:"12px",md:"16px"},}}>БАНК РЕНТАБЕЛЛИГИ КЎРСАТКИЧЛАРИ</Typography>
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
                  <Button variant="contained" size={"medium"}>
                      <Typography sx={{color:Colors.white,fontWeight:"800"}} >ТЎЛИҚ МАЪЛУМОТ</Typography>
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
              <Box sx={{width:"100%",height:"100%",bgcolor:Colors.gray_footer,borderRadius:"5px"}}>

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
              <Box sx={{width:"100%",height:"100%",bgcolor:Colors.gray_footer,borderRadius:"5px"}}>

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
              <Box sx={{width:"100%",height:"100%",bgcolor:Colors.gray_footer,borderRadius:"5px"}}>

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
              <Box sx={{width:"100%",height:"100%",borderRadius:"5px",padding:"10px",display:"flex",flexDirection:"column",gap:"30px",bgcolor:Colors.gray_footer,}}>
                <Typography sx={{textAlign:"start",fontWeight:"800",fontSize:{xs:"12px",md:"16px"},}}>БАНК РЕНТАБЕЛЛИГИ КЎРСАТКИЧЛАРИ</Typography>
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
                  <Button variant="contained" size={"medium"}>
                      <Typography sx={{color:Colors.white,fontWeight:"800"}} >ТЎЛИҚ МАЪЛУМОТ</Typography>
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
              <Box sx={{width:"100%",height:"100%",borderRadius:"5px",padding:"10px",display:"flex",flexDirection:"column",gap:"30px",bgcolor:Colors.gray_footer,}}>
                <Typography sx={{textAlign:"start",fontWeight:"800",fontSize:{xs:"12px",md:"16px"},}}>БАНК РЕНТАБЕЛЛИГИ КЎРСАТКИЧЛАРИ</Typography>
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
                  <Button variant="contained" size={"medium"}>
                      <Typography sx={{color:Colors.white,fontWeight:"800"}} >ТЎЛИҚ МАЪЛУМОТ</Typography>
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      <Footer/>
    </Box>
    </Container>
  )
}

export default AccessAll;