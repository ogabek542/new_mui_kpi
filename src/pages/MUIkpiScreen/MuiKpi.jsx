import React, { useEffect, useState, useMemo } from 'react';
import { Container, Box,Grid,Typography} from '@mui/material';
// IMPORT IMAGE //
import DefaultImage from "../../assets/photo/defaultphoto.jpg"
// IMPORT COLORS //
import { Colors } from '../../styles/theme';
// IMPORT CIRCLEPROGRESSBAR //
import CircularProgressBarWithPercentage from "../../components/CircleProgress/CircleProgressBar"
// IMPORT ICONS //
import VisibilityIcon from '@mui/icons-material/Visibility';
// line chart elements //
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";

  import { useTranslation } from "react-i18next";

    // import axios from "axios" //
import { REQUESTS } from "../../api/requests";
import { useReduxDispatch } from "../../hooks/useReduxHook";

const MuiKpi = ({changeLang}) => {

const {t} = useTranslation()
// elements //
const dispatch = useReduxDispatch();
const [tableData, setTableData] = useState([]);
const [data, setData] = useState([]); // imported api user data
const [circleData, setCircleData] = useState([]);
const [line, setLine] = useState([]);
const [numberLive, setNumberLive] = useState([]);
const [validImage, setValidImage] = useState(false);



const newDefaultImage = DefaultImage;

    const imageUrl = `http://10.8.88.91:8000${data.photo_url}`;

    const formatDate = (value) => {
        const dateObj = new Date(value);
        const monthNames = [
          "Январь",
          "Февраль",
          "Март",
          "Апрель",
          "Май",
          "Июнь",
          "Июль",
          "Август",
          "Сентябрь",
          "Октябрь",
          "Ноябрь",
          "Декабрь",
        ];
    
        const monthIndex = dateObj.getMonth();
        const year = dateObj.getFullYear();
    
        return `${monthNames[monthIndex]} ${year}`;
      };

  
  
    // fetch(imageUrl)
    //   .then((response) => {
    //     if (response.ok) {
    //       console.log("The image exists and is accessible.");
    //       setValidIMage(true);
    //     } else {
    //       console.log("The image does not exist or is not accessible.");
    //       setValidIMage(false);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching the image:", error);
    //   });

    // useEffect(() => {
    //     const fetchImage = async () => {
    //         try {
    //             const response = await fetch(imageUrl);
    //             setValidImage(response.ok);
    //         } catch (error) {
    //             console.error("Error fetching the image:", error);
    //             setValidImage(false);
    //         }
    //     };

    //     fetchImage();
    // }, [imageUrl]);

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //       try {
    //         const response = await REQUESTS.user.getUser();
    //         console.log(response);
    //         const propsdata = response.data[0];
    //         const lastCameData = propsdata[propsdata.length - 1];
    //         const newDatas = propsdata.kpies[propsdata.kpies.length - 1].month_data;
    //         const newOverall = propsdata.kpies[propsdata.kpies.length - 1];
    //         setTableData(newDatas);
    //         setCircleData(newOverall);
    //         console.log(lastCameData);
    //         setData(propsdata);
    //         setLine(propsdata);
    //       } catch (error) {
    //         console.error("Error fetching user data:", error);
    //       }
    //     };
    
    //     const fetchLiveUser = async () => {
    //       try {
    //         const response = await REQUESTS.live.getLive();
    //         console.log(response, "salom");
    //         const livenumber = response.data;
    //         setNumberlive(livenumber);
    //       } catch (error) {
    //         console.error("Error fetching live user data:", error);
    //       }
    //     };
    
    //     fetchUserData();
    //     fetchLiveUser();
    
    //     // Set interval to fetch live user count every 5 seconds
    //     const interval = setInterval(() => {
    //       fetchLiveUser();
    //     }, 5000);

    //       // <=== LAST 12 MONTH SHOW SECTION ====> //
    // const lastTwelveMonthsData = useMemo(() => {
    //     return line.kpies ? line.kpies.slice(-12) : [];
    //   }, [line.kpies]);
    
    //     // Cleanup function to clear the interval
    //     return () => clearInterval(interval);
    //   }, [setTableData, setCircleData, setData, setLine, setNumberlive]);


    useEffect(() => {
        const fetchImage = async () => {
            if (!imageUrl) {
                console.warn("Image URL is undefined or empty. Skipping fetch.");
                setValidImage(false);
                return;
            }
    
            try {
                const response = await fetch(imageUrl);
                setValidImage(response.ok);
            } catch (error) {
                console.error("Error fetching the image:", error);
                setValidImage(false);
            }
        };
    
        if (imageUrl) {
            fetchImage();
        }
    }, [imageUrl]);

    const dataToPass = {
        someKey: "someValue",
        anotherKey: 123,
      };
    

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await REQUESTS.user.getUser();
                const propsdata = response.data[0];
                const newDatas = propsdata.kpies[propsdata.kpies.length - 1].month_data;
                const newOverall = propsdata.kpies[propsdata.kpies.length - 1];
                setTableData(newDatas);
                setCircleData(newOverall);
                setData(propsdata);
                setLine(propsdata);


            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        const fetchLiveUser = async () => {
            try {
                const response = await REQUESTS.live.getLive();
                const livenumber = response.data;
                setNumberLive(livenumber);
            } catch (error) {
                console.error("Error fetching live user data:", error);
            }
        };

        fetchUserData();
        fetchLiveUser();

        const interval = setInterval(() => {
            fetchLiveUser();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    // const CustomizedDot = ({ cx, cy, payload }) => {
    //     const { month, month_data, overall } = payload;
    
    //     const handleClick = () => {
    //       setTableData(month_data);
    //       setCircleData({ overall, month });
    //     };
    //     const fill = overall === 0 ? "#94c7fb" : "#0a7f40";
    
    //     return (
    //       <g onClick={handleClick} style={{ cursor: "pointer" }}>
    //         <circle cx={cx} cy={cy} r={8} fill={fill} className="circleShadow" />
    //       </g>
    //     );
    //   };

    const lastTwelveMonthsData = useMemo(() => {
        return line.kpies ? line.kpies.slice(-12) : [];


    }, [line.kpies]);



    const CustomizedDot = ({ cx, cy, payload }) => {
        const { month, month_data, overall } = payload;

        const handleClick = () => {
            setTableData(month_data);
            setCircleData({ overall, month });
        };
        const fill = overall === 0 ? "#020D9E" : "#0A7F40";

        return (
            <g onClick={handleClick} style={{ cursor: "pointer" }}>
                <circle cx={cx} cy={cy} r={8} fill={fill} />
                <text
                    x={cx - 3}
                    y={cy - 10}
                    textAnchor="middle"
                    fontSize="14px"
                    fill="#000"
                    fontWeight="700"
                    >
                    {Math.round(overall)}%
                </text>
            </g>
        );
    };

    const formatValue = (value) => {
        if (value > 125) {
          return 125;
        } else if (value < 0) {
          return 0;
        } else {
          return value;
        }
      };

      const insertSpaces = (text) => {
        if (!text) return ""; // Handle empty or undefined text
        return text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      };
    

  return (
    <Box sx={{width:"100%",height:"auto",padding:"5px"}}>
        {/* HEADER SECTION OF KPI SCREEN .. USER DATAS IN HERE */}
            <Grid container sx={{width:"100%",height:"200px",}}>
                <Grid item xs={2.5} lg={2.5} sx={{padding:"5px",}}>
                    {/* user image section */}
                    <Box sx={{width:"100%",height:"100%",borderRadius:"5px",border:"1px solid gray",display:"flex",alignItems:"center",justifyContent:"center",padding:"5px"}}>
                        <Box
                            component="img"
                            src={validImage ? imageUrl : newDefaultImage}
                            alt={validImage ? 'worker_image' : 'default_image'}
                            sx={{ width: "140px", height: "180px",objectFit:"cover" }} 
                            />
                    </Box>
                </Grid>
                {/* <=== User Information Table ====> */}
                <Grid item lg={7} sx={{padding:"5px"}}>
                    <Box sx={{width:"100%",height:"100%",borderRadius:"5px",border:"1px solid gray",padding:"4px",display:"flex",flexDirection:"column",gap:"2px"}}>
                        {/* USER NAME */}
                        <Typography sx={{textTransform:"uppercase",color:"#000",fontWeight:"800"}}>{data.name || "no exist name"}</Typography>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid gray",lineHeight:"0px",marginTop:"5px"}}>
                            {/* LEFT SIDE USRT DATA TEXT */}
                            <Typography sx={{fontSize:"12px",textTransform:"uppercase"}}>{t("filial")}</Typography>
                            {/* RIGHT SIDE USRT DATA TEXT */}
                            <Typography sx={{fontSize:"12px",fontWeight:"bold"}}>{data.branch || "нет информации"}</Typography>
                        </Box>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid gray",lineHeight:"0px"}}>
                            {/* LEFT SIDE USRT DATA TEXT */}
                            <Typography sx={{fontSize:"12px",textTransform:"uppercase"}}>{t("vsp")}</Typography>
                            {/* RIGHT SIDE USRT DATA TEXT */}
                            <Typography sx={{fontSize:"12px",fontWeight:"bold"}}>{data.division || "нет информации"}</Typography>
                        </Box>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid gray",lineHeight:"0px"}}>
                            {/* LEFT SIDE USRT DATA TEXT */}
                            <Typography sx={{fontSize:"12px",textTransform:"uppercase"}}>{t("part")}</Typography>
                            {/* RIGHT SIDE USRT DATA TEXT */}
                            <Typography sx={{fontSize:"12px",fontWeight:"bold"}}>{data.department || "нет информации"}</Typography>
                        </Box>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid gray",lineHeight:"0px"}}>
                            {/* LEFT SIDE USRT DATA TEXT */}
                            <Typography sx={{fontSize:"12px",textTransform:"uppercase"}}>{t("positionjob")}</Typography>
                            {/* RIGHT SIDE USRT DATA TEXT */}
                            <Typography sx={{fontSize:"12px",fontWeight:"bold"}}>{data.position || "нет информации"}</Typography>
                        </Box>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid gray",lineHeight:"0px"}}>
                            {/* LEFT SIDE USRT DATA TEXT */}
                            <Typography sx={{fontSize:"12px",textTransform:"uppercase"}}>{t("functional")}</Typography>
                            {/* RIGHT SIDE USRT DATA TEXT */}
                            <Typography sx={{fontSize:"12px",fontWeight:"bold"}}>{data.premium || "нет информации"}</Typography>
                        </Box>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid gray",lineHeight:"0px"}}>
                            {/* LEFT SIDE USRT DATA TEXT */}
                            <Typography sx={{fontSize:"12px",textTransform:"uppercase"}}>{t("tablenumber")}</Typography>
                            {/* RIGHT SIDE USRT DATA TEXT */}
                            <Typography sx={{fontSize:"12px",fontWeight:"bold"}}>{data.table_number || "нет информации"}</Typography>
                        </Box>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid gray",lineHeight:"0px"}}>
                            {/* LEFT SIDE USRT DATA TEXT */}
                            <Typography sx={{fontSize:"12px",textTransform:"uppercase"}}>{t("salary")}</Typography>
                            {/* RIGHT SIDE USRT DATA TEXT */}
                            <Typography sx={{fontSize:"12px",fontWeight:"bold"}}> {insertSpaces(data.fixed)|| "нет информации"}</Typography>
                        </Box>
                    </Box>
                </Grid>
                {/* CIRCLE PROGRESSBAR SECTION */}
                <Grid item xs={2.5} lg={2.5} sx={{padding:"5px",width:"100%",height:"100%"}}>
                    <Box sx={{width:"100%",height:"100%",borderRadius:"5px",border:"1px solid gray",padding:"5px",display:"flex",flexDirection:"column",}}>
                        {/* TOP TEXT SECTION */}
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                            <Typography sx={{fontWeight:"bold",fontSize:"12px"}}>KPI</Typography>
                            <Typography sx={{fontSize:"12px",fontWeight:"bold",textTransform:"capitalize"}}>{formatDate(circleData.month)}г.</Typography>
                        </Box>
                        {/* CIRCLE SECTION */}
                        <Box sx={{width:"100%",height:"90%",display:"flex",alignItems:"center",textAlign:"center",justifyContent:"center"}}>
                                <CircularProgressBarWithPercentage
                                selectedValue={Math.round(circleData.overall)}
                                    maxValue={125}
                                    radius={75} // Set the radius as 8vw (8% of the viewport width)
                                    textColor="#000"
                                    activeStrokeColor={"#00FF00"}
                                    withGradient
                                    className="circle-own-style"
                                    style={{ width: "100%", height: "100%",alignItems:"ceenter" }} // Match the circle's container size with the radius
                                />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        {/* KPI LINECHART  */}
        <Grid container sx={{width:"100%",height:"auto",}}>
            <Grid item xs={12} lg={12} sx={{padding:"5px",}}>
                <Box sx={{width:"100%",height:"100%",borderRadius:"5px",border:"1px solid gray",padding:"5px",display:"flex",flexDirection:"column",gap:"10px"}}>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                            <Typography sx={{fontWeight:"bold",fontSize:"14px"}}>{t("linetoptext")}</Typography>
                            <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",textAlign:"center"}}>
                                <Typography>{t("dayviewers")}:{numberLive.count || "no data"}</Typography>
                                <VisibilityIcon sx={{fontSize:"20px",color:Colors.blue_nbu}}/>
                            </Box>
                        </Box>
                        <Box sx={{width:"100%",height:"400px",}}>
                        <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                width={"100%"}
                                height={"100%"}
                                margin={{ left: -10, top: 20, right: 10,bottom:10 }}
                                // data={line.kpies}
                                data={lastTwelveMonthsData}
                                >
                                <CartesianGrid
                                    strokeDasharray="1"
                                    horizontal="true"
                                    vertical="true"
                                />
                                <XAxis
                                    // dataKey="month"
                                    dataKey={(item) => formatDate(item.month)}
                                    padding={{ left: 0, right: 0 }}
                                    tick={{
                                        fill: "#000",
                                        fontWeight: "bold",
                                        textAnchor: "middle",
                                        width: 10,
                                        fontSize:11,
                                    }}
                                    />
                                <YAxis
                                    className="procent-line-text"
                                    tickFormatter={(value) => `${value} %`}
                                    ticks={[0, 25, 50, 75, 100, 125]}
                                    domain={[0, 125]}
                                    type="number"
                                    tick={{
                                        fontSize:14,
                                        fill: "#000",
                                    }}
                                />
                                <Tooltip />
                                <Area
                                    type="monotone"
                                    dataKey={(item) => Math.round(item.overall)}
                                    stroke={"#00C400"}
                                    strokeWidth={2}
                                    activeDot={{ r: 0.00001, fill: "#000"}}
                                    dot={<CustomizedDot />}
                                    fill="#CDFAD0"
                                />
                                </AreaChart>
                        </ResponsiveContainer>
                        </Box>
                </Box>
            </Grid>
        </Grid>
        {/* KPI TABLE  */}
            <Grid container sx={{width:"100%",height:"auto",padding:"5px"}}>
                <Grid item lg={12} sx={{width:"100%",height:"auto"}}>
                    <Box sx={{width:"100%",height:"100%",borderRadius:"5px",display:"flex",flexDirection:"column"}}>
                            {/* Table Header */}
                        <Grid container  sx={{width:"100%",height:"auto",gap:"4px"}}>
                            <Grid item xs={2.5} sm={2.5}  sx={{bgcolor:Colors.nbu,padding:"10px",borderRadius:"5px"}}>
                            <Typography sx={{textTransform:"uppercase",fontSize:"12px",fontWeight:"bold",color:Colors.white,textAlign:"center"}}>{t("mertikname")}</Typography>
                            </Grid>
                            <Grid item xs={0.7} sm={0.8} sx={{bgcolor:Colors.nbu,padding:"10px",borderRadius:"5px"}}>
                            <Typography sx={{textTransform:"uppercase",fontSize:"12px",fontWeight:"bold",color:Colors.white,textAlign:"center"}}>{t("starttext")}</Typography>
                            </Grid>
                            <Grid item xs={0.7} sm={0.8} sx={{bgcolor:Colors.nbu,padding:"10px",borderRadius:"5px"}}>
                            <Typography sx={{textTransform:"uppercase",fontSize:"12px",fontWeight:"bold",color:Colors.white,textAlign:"center"}}>{t("endtext")}</Typography>
                            </Grid>
                            <Grid item xs={1} sm={1} sx={{bgcolor:Colors.nbu,padding:"10px",borderRadius:"5px"}}>
                            <Typography sx={{textTransform:"uppercase",fontSize:"12px",fontWeight:"bold",color:Colors.white,textAlign:"center"}}>{t("activity")}</Typography>
                            </Grid>
                            <Grid item xs={1.5} sm={1.5} sx={{bgcolor:Colors.nbu,padding:"10px",borderRadius:"5px"}}>
                            <Typography sx={{textTransform:"uppercase",fontSize:"12px",fontWeight:"bold",color:Colors.white,textAlign:"center"}}>{t("calculationmethod")}</Typography>
                            </Grid>
                            <Grid item xs={1} sm={1} sx={{bgcolor:Colors.nbu,padding:"10px",borderRadius:"5px"}}>
                            <Typography sx={{textTransform:"uppercase",fontSize:"12px",fontWeight:"bold",color:Colors.white,textAlign:"center"}}>{t("point")}</Typography>
                            </Grid>
                            <Grid item xs={1} sm={1} sx={{bgcolor:Colors.nbu,padding:"10px",borderRadius:"5px"}}>
                            <Typography sx={{textTransform:"uppercase",fontSize:"12px",fontWeight:"bold",color:Colors.white,textAlign:"center"}}>{t("unity")}</Typography>
                            </Grid>
                            <Grid item xs={1} sm={1} sx={{bgcolor:Colors.nbu,padding:"10px",borderRadius:"5px"}}>
                            <Typography sx={{textTransform:"uppercase",fontSize:"12px",fontWeight:"bold",color:Colors.white,textAlign:"center"}}>{t("plan")}</Typography>
                            </Grid>
                            <Grid item xs={1} sm={1} sx={{bgcolor:Colors.nbu,padding:"10px",borderRadius:"5px"}}>
                            <Typography sx={{textTransform:"uppercase",fontSize:"12px",fontWeight:"bold",color:Colors.white,textAlign:"center"}}>{t("fact")}</Typography>
                            </Grid>
                            <Grid item xs={1.1} sm={1} sx={{bgcolor:Colors.nbu,padding:"10px",borderRadius:"5px"}}>
                            <Typography sx={{textTransform:"uppercase",fontSize:"12px",fontWeight:"bold",color:Colors.white,textAlign:"center"}}>{t("execution")}</Typography>
                            </Grid>
                        </Grid>

                        {/* Table Body */}
                        {tableData.map((rowData, id) => (
                            <Grid container  key={id} sx={{gap:"4px",marginTop:"5px",}}>
                            <Grid item xs={2.5} sm={2.5} sx={{bgcolor:Colors.blue_light_table,padding:"10px",borderRadius:"4px",display:"flex",alignItems: "center", }}>
                                <Typography sx={{textTransform:"uppercase",fontSize:"10px",fontWeight:"bold",color:Colors.dark,display:"flex",alignItems:"center",justifyContent:"start"}}>{rowData.kpi_name}</Typography>
                            </Grid>
                            <Grid item xs={0.7} sm={0.8} sx={{bgcolor:Colors.gray_back,padding:"10px",borderRadius:"4px",display:"flex",alignItems: "center",justifyContent:"center"}}>
                                <Typography sx={{textTransform:"uppercase",fontSize:"11px",fontWeight:"bold",color:Colors.dark,textAlign:"center"}}>{rowData.start}</Typography>
                            </Grid>
                            <Grid item xs={0.7} sm={0.8} sx={{bgcolor:Colors.gray_back,padding:"10px",borderRadius:"4px",display:"flex",alignItems: "center",justifyContent:"center"}}>
                                <Typography sx={{textTransform:"uppercase",fontSize:"11px",fontWeight:"bold",color:Colors.dark,textAlign:"center"}}>{rowData.end}</Typography>
                            </Grid>
                            <Grid
                                item
                                xs={1} sm={1}
                                sx={{
                                    backgroundColor: rowData.activity === "Да" ? "#91FF9A" : "#F7F763",
                                    padding: "10px",
                                    borderRadius: "4px",
                                    display:"flex",
                                    alignItems: "center",
                                    justifyContent:"center",
                                }}
                            >
                                <Typography sx={{textTransform:"uppercase",fontSize:"11px",fontWeight:"bold",color:Colors.dark,textAlign:"center"}}>{rowData.activity}</Typography>
                            </Grid>
                            <Grid item xs={1.5} sm={1.5}  sx={{bgcolor:Colors.gray_back,padding:"10px",borderRadius:"4px",display:"flex",alignItems: "center",justifyContent:"center"}}>
                                <Typography sx={{textTransform:"uppercase",fontSize:"11px",fontWeight:"bold",color:Colors.dark,textAlign:"center"}}>{rowData.method}</Typography>
                            </Grid>
                            <Grid item xs={1} sm={1} sx={{bgcolor:Colors.blue_light_table,padding:"10px",borderRadius:"4px",display:"flex",alignItems: "center",justifyContent:"center"}}>
                                <Typography sx={{textTransform:"uppercase",fontSize:"11px",fontWeight:"bold",color:Colors.dark,textAlign:"center"}}>{Math.round(rowData.weight)}%</Typography>
                            </Grid>
                            <Grid item xs={1} sm={1} sx={{bgcolor:Colors.gray_back,padding:"10px",borderRadius:"4px",display:"flex",alignItems: "center",justifyContent:"center"}}>
                                <Typography sx={{textTransform:"uppercase",fontSize:"11px",fontWeight:"bold",color:Colors.dark,textAlign:"center"}}>{rowData.metric}</Typography>
                            </Grid>
                            <Grid item xs={1} sm={1} sx={{bgcolor:Colors.gray_back,padding:"10px",borderRadius:"4px",display:"flex",alignItems: "center",justifyContent:"center"}}>
                                <Typography sx={{textTransform:"uppercase",fontSize:"11px",fontWeight:"bold",color:Colors.dark,textAlign:"center"}}>{rowData.performance_score}</Typography>
                            </Grid>
                            <Grid item xs={1} sm={1} sx={{bgcolor:Colors.gray_back,padding:"10px",borderRadius:"4px",display:"flex",alignItems: "center",justifyContent:"center"}}>
                                <Typography sx={{textTransform:"uppercase",fontSize:"11px",fontWeight:"bold",color:Colors.dark,textAlign:"center"}}>{rowData.fact}</Typography>
                            </Grid>
                            <Grid item xs={1} sm={1} sx={{bgcolor:Colors.blue_light_table,padding:"10px",borderRadius:"4px",display:"flex",alignItems: "center",justifyContent:"center"}}>
                                <Typography sx={{textTransform:"uppercase",fontSize:"11px",fontWeight:"bold",color:Colors.dark,textAlign:"center"}}>{Math.round(formatValue(rowData.finished))}%</Typography>
                            </Grid>
                            </Grid>
                        ))}
                    </Box>
                </Grid>
            </Grid>
    </Box>
  )
}

export default MuiKpi