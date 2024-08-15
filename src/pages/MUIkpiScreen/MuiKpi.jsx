import React, { useEffect, useState, useMemo } from 'react';
import { Container, Box,Grid,Typography} from '@mui/material';
// IMPORT IMAGE //
import DefaultImage from "../../assets/photo/defaultphoto.jpg"
// IMPORT COLORS //
import { Colors } from '../../styles/theme';
// IMPORT CIRCLEPROGRESSBAR //
import CircularProgressBarWithPercentage from "../../components/CircleProgress/CircleProgressBar"
// IMPORT ICONS //

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

    // import axios from "axios" //
import { REQUESTS } from "../../api/requests";
import { useReduxDispatch } from "../../hooks/useReduxHook";

const MuiKpi = () => {
// elements //
const dispatch = useReduxDispatch();
const [tableData, setTableData] = useState([]);
const [data, setData] = useState([]); // imported api data
const [circleData, setCircleData] = useState([]);
const [line, setLine] = useState([]);
const [numberLive, setNumberLive] = useState([]);
const [validImage, setValidImage] = useState(false);



const newDefaultImage = DefaultImage;

    const imageUrl = `http://10.8.88.91:8000${data.photo_url}`;

    const formatDate = (value) => {
        const dateObj = new Date(value);
        
        // Check if the dateObj is valid
        if (isNaN(dateObj.getTime())) {
          throw new RangeError("Invalid time value");
        }
      
        const monthNames = [
          "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", 
          "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
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
    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch(imageUrl);
                setValidImage(response.ok);
            } catch (error) {
                console.error("Error fetching the image:", error);
                setValidImage(false);
            }
        };

        fetchImage();
    }, [imageUrl]);


      
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
        const fill = overall === 0 ? "#94c7fb" : "#0a7f40";

        return (
            <g onClick={handleClick} style={{ cursor: "pointer" }}>
                <circle cx={cx} cy={cy} r={8} fill={fill} className="circleShadow" />
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
    

  return (
    <Box sx={{width:"100%",height:"auto",padding:"5px"}}>
        {/* HEADER SECTION OF KPI SCREEN .. USER DATAS IN HERE */}
            <Grid container sx={{width:"100%",height:"200px",}}>
                <Grid item xs={2.5} lg={2.5} sx={{padding:"5px",}}>
                    <Box sx={{width:"100%",height:"100%",borderRadius:"5px",border:"1px solid gray",display:"flex",alignItems:"center",justifyContent:"center",padding:"5px"}}>
                        <Box
                            component="img"
                            src={validImage ? imageUrl : newDefaultImage}
                            alt={validImage ? 'worker_image' : 'default_image'}
                            sx={{ width: "140px", height: "180px",objectFit:"cover" }} 
                            />
                    </Box>
                </Grid>
                <Grid item lg={7} sx={{padding:"5px"}}>
                    <Box sx={{width:"100%",height:"100%",borderRadius:"5px",border:"1px solid gray",padding:"4px",display:"flex",flexDirection:"column",gap:"2px"}}>
                        {/* USER NAME */}
                        <Typography sx={{textTransform:"uppercase",color:"#000",fontWeight:"800"}}>{data.name || "no exist name"}</Typography>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid gray",lineHeight:"0px",marginTop:"5px"}}>
                            {/* LEFT SIDE USRT DATA TEXT */}
                            <Typography sx={{fontSize:"12px",textTransform:"uppercase"}}>ФИЛИАЛ/ГО</Typography>
                            {/* RIGHT SIDE USRT DATA TEXT */}
                            <Typography sx={{fontSize:"12px",fontWeight:"bold"}}>{data.branch || "нет информации"}</Typography>
                        </Box>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid gray",lineHeight:"0px"}}>
                            {/* LEFT SIDE USRT DATA TEXT */}
                            <Typography sx={{fontSize:"12px",textTransform:"uppercase"}}>ВСП (ОПЕРУ/БХМ/БХО)</Typography>
                            {/* RIGHT SIDE USRT DATA TEXT */}
                            <Typography sx={{fontSize:"12px",fontWeight:"bold"}}>{data.division || "нет информации"}</Typography>
                        </Box>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid gray",lineHeight:"0px"}}>
                            {/* LEFT SIDE USRT DATA TEXT */}
                            <Typography sx={{fontSize:"12px",textTransform:"uppercase"}}>ПОДРАЗДЕЛЕНИЕ</Typography>
                            {/* RIGHT SIDE USRT DATA TEXT */}
                            <Typography sx={{fontSize:"12px",fontWeight:"bold"}}>{data.department || "нет информации"}</Typography>
                        </Box>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid gray",lineHeight:"0px"}}>
                            {/* LEFT SIDE USRT DATA TEXT */}
                            <Typography sx={{fontSize:"12px",textTransform:"uppercase"}}>ДОЛЖНОСТЬ</Typography>
                            {/* RIGHT SIDE USRT DATA TEXT */}
                            <Typography sx={{fontSize:"12px",fontWeight:"bold"}}>{data.position || "нет информации"}</Typography>
                        </Box>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid gray",lineHeight:"0px"}}>
                            {/* LEFT SIDE USRT DATA TEXT */}
                            <Typography sx={{fontSize:"12px",textTransform:"uppercase"}}>функционал</Typography>
                            {/* RIGHT SIDE USRT DATA TEXT */}
                            <Typography sx={{fontSize:"12px",fontWeight:"bold"}}>{data.premium || "нет информации"}</Typography>
                        </Box>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid gray",lineHeight:"0px"}}>
                            {/* LEFT SIDE USRT DATA TEXT */}
                            <Typography sx={{fontSize:"12px",textTransform:"uppercase"}}>ТАБЕЛЬНЫЙ НОМЕР РАБОТНИКА</Typography>
                            {/* RIGHT SIDE USRT DATA TEXT */}
                            <Typography sx={{fontSize:"12px",fontWeight:"bold"}}>{data.table_number || "нет информации"}</Typography>
                        </Box>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid gray",lineHeight:"0px"}}>
                            {/* LEFT SIDE USRT DATA TEXT */}
                            <Typography sx={{fontSize:"12px",textTransform:"uppercase"}}>ОКЛАД РАБОТНИКА, СУМ</Typography>
                            {/* RIGHT SIDE USRT DATA TEXT */}
                            <Typography sx={{fontSize:"12px",fontWeight:"bold"}}> {data.fixed || "нет информации"}</Typography>
                        </Box>
                    </Box>
                </Grid>
                {/* CIRCLE PROGRESSBAR SECTION */}
                <Grid item xs={2.5} lg={2.5} sx={{padding:"5px",width:"100%",height:"100%"}}>
                    <Box sx={{width:"100%",height:"100%",borderRadius:"5px",border:"1px solid gray",padding:"5px",display:"flex",flexDirection:"column",}}>
                        {/* TOP TEXT SECTION */}
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                            <Typography sx={{fontWeight:"bold",fontSize:"12px"}}>KPI</Typography>
                            <Typography sx={{fontSize:"12px",fontWeight:"bold",textTransform:"capitalize"}}>{circleData.month}г.</Typography>
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
                            <Typography sx={{fontWeight:"bold",fontSize:"14px"}}>Динамика выполнения общих плановых показателей KPI</Typography>
                            <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",textAlign:"center"}}>
                                <Typography>Количество просмотров в день:{numberLive.count || "no data"}</Typography>
                            </Box>
                        </Box>
                        <Box sx={{width:"100%",height:"100%",}}>
                        <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                width={"100%"}
                                height={"100%"}
                                margin={{ left: 0, top: 10, right: 10,bottom:15 }}
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
                                    dataKey={(item) => item.month}
                                    padding={{ left: 0, right: 0 }}
                                    tick={{
                                    fill: "#000",
                                    fontWeight: "bold",
                                    textAnchor: "middle",
                                    width: 10,
                                    fontSize:10,
                                    }}
                                    
                                />
                                <YAxis
                                    className="procent-line-text"
                                    tickFormatter={(value) => `${value} %`}
                                    ticks={[0, 25, 50, 75, 100, 125]}
                                    domain={[0, 125]}
                                    type="number"
                                />
                                <Tooltip />
                                <Area
                                    type="monotone"
                                    dataKey={(item) => Math.round(item.overall)}
                                    stroke={"green"}
                                    strokeWidth={2}
                                    activeDot={{ r: 0.00001, fill: "#000"}}
                                    dot={<CustomizedDot />}
                                    fill="#abf7b1"
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
                    <Box sx={{width:"100%",height:"100%",borderRadius:"5px",border:"1px solid gray",display:"flex",flexDirection:"column"}}>
                            {/* Table Header */}
                        <Grid container  sx={{width:"100%",height:"auto",gap:"5px"}}>
                            <Grid item xs={2.5} sm={2.5}  sx={{bgcolor:Colors.nbu,padding:"10px",borderRadius:"5px"}}>
                            <Typography sx={{textTransform:"uppercase",fontSize:"12px",fontWeight:"bold",color:Colors.white,textAlign:"center"}}>НАименование метрики</Typography>
                            </Grid>
                            <Grid item xs={0.7} sm={0.7} sx={{bgcolor:Colors.nbu,padding:"10px",borderRadius:"5px"}}>
                            <Typography sx={{textTransform:"uppercase",fontSize:"12px",fontWeight:"bold",color:Colors.white,textAlign:"center"}}>начало</Typography>
                            </Grid>
                            <Grid item xs={0.7} sm={0.7} sx={{bgcolor:Colors.nbu,padding:"10px",borderRadius:"5px"}}>
                            <Typography sx={{textTransform:"uppercase",fontSize:"12px",fontWeight:"bold",color:Colors.white,textAlign:"center"}}>конец</Typography>
                            </Grid>
                            <Grid item xs={1} sm={1} sx={{bgcolor:Colors.nbu,padding:"10px",borderRadius:"5px"}}>
                            <Typography sx={{textTransform:"uppercase",fontSize:"12px",fontWeight:"bold",color:Colors.white,textAlign:"center"}}>активность</Typography>
                            </Grid>
                            <Grid item xs={1.5} sm={1.5} sx={{bgcolor:Colors.nbu,padding:"10px",borderRadius:"5px"}}>
                            <Typography sx={{textTransform:"uppercase",fontSize:"12px",fontWeight:"bold",color:Colors.white,textAlign:"center"}}>метод расчёта</Typography>
                            </Grid>
                            <Grid item xs={1} sm={1} sx={{bgcolor:Colors.nbu,padding:"10px",borderRadius:"5px"}}>
                            <Typography sx={{textTransform:"uppercase",fontSize:"12px",fontWeight:"bold",color:Colors.white,textAlign:"center"}}>вес показ.</Typography>
                            </Grid>
                            <Grid item xs={1} sm={1} sx={{bgcolor:Colors.nbu,padding:"10px",borderRadius:"5px"}}>
                            <Typography sx={{textTransform:"uppercase",fontSize:"12px",fontWeight:"bold",color:Colors.white,textAlign:"center"}}>единица</Typography>
                            </Grid>
                            <Grid item xs={1} sm={1} sx={{bgcolor:Colors.nbu,padding:"10px",borderRadius:"5px"}}>
                            <Typography sx={{textTransform:"uppercase",fontSize:"12px",fontWeight:"bold",color:Colors.white,textAlign:"center"}}>план</Typography>
                            </Grid>
                            <Grid item xs={1} sm={1} sx={{bgcolor:Colors.nbu,padding:"10px",borderRadius:"5px"}}>
                            <Typography sx={{textTransform:"uppercase",fontSize:"12px",fontWeight:"bold",color:Colors.white,textAlign:"center"}}>факт</Typography>
                            </Grid>
                            <Grid item xs={1} sm={1.1} sx={{bgcolor:Colors.nbu,padding:"10px",borderRadius:"5px"}}>
                            <Typography sx={{textTransform:"uppercase",fontSize:"12px",fontWeight:"bold",color:Colors.white,textAlign:"center"}}>исполнение</Typography>
                            </Grid>
                        </Grid>

                        {/* Table Body */}
                        {tableData.map((rowData, id) => (
                            <Grid container  key={id} >
                            <Grid item xs={2.5} sm={2.5} >
                                <Typography >{rowData.kpi_name}</Typography>
                            </Grid>
                            <Grid item xs={0.7} sm={0.7} >
                                <Typography >{rowData.start}</Typography>
                            </Grid>
                            <Grid item xs={0.7} sm={0.7} >
                                <Typography >{rowData.end}</Typography>
                            </Grid>
                            <Grid
                                item
                                xs={1} sm={1}
                                className={`table-body_text-div ${rowData.activity === "Да" ? "defaultBg" : "yellowBg"}`}
                            >
                                <Typography >{rowData.activity}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={2} >
                                <Typography >{rowData.method}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={1} >
                                <Typography >{Math.round(rowData.weight)}%</Typography>
                            </Grid>
                            <Grid item xs={12} sm={1} >
                                <Typography >{rowData.metric}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={1} >
                                <Typography >{rowData.performance_score}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={1} >
                                <Typography >{rowData.fact}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={1} className="table-body_text-div">
                                <Typography className="table-body-text">{Math.round(formatValue(rowData.finished))} %</Typography>
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