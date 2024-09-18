import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Box } from '@mui/material';

// Sample data for the Autocomplete
const top128Filials = [
  { title: "Избоскан БХО", id: 1 },
  { title: "Шахрихон БХО", id: 2 },
  { title: "Асака БХМ", id: 3 },
  { title: "Зарафшон БХМ", id: 4 },
];

// Options for the second Autocomplete based on the first selection
const secondOptionsMap = {
  1: [
    { title: "Option 1A" },
    { title: "Option 1B" },
  ],
  2: [
    { title: "Option 2A" },
    { title: "Option 2B" },
  ],
  3: [
    { title: "Option 3A" },
    { title: "Option 3B" },
  ],
  4: [
    { title: "Option 4A" },
    { title: "Option 4B" },
  ],
};

const DependentAutocomplete = () => {
  const [selectedFirstOption, setSelectedFirstOption] = useState(null);
  const [selectedSecondOption, setSelectedSecondOption] = useState(null);
  const [secondOptions, setSecondOptions] = useState([]);
  const [prevFirstOption, setPrevFirstOption] = useState(null);
  const [prevSecondOption, setPrevSecondOption] = useState(null);

  // Update the options for the second Autocomplete based on the first selection
  useEffect(() => {
    if (selectedFirstOption && selectedFirstOption.id) {
      // Save the current selections before changing the options
      setPrevFirstOption(selectedFirstOption);
      setPrevSecondOption(selectedSecondOption);

      setSecondOptions(secondOptionsMap[selectedFirstOption.id] || []);
      setSelectedSecondOption(null); // Reset the second option
    } else {
      setSecondOptions([]);
    }
  }, [selectedFirstOption]);

  return (
    <Box sx={{ width: '300px', margin: '0 auto' }}>
      {/* First Autocomplete */}
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

      {/* Second Autocomplete */}
      <Autocomplete
        options={secondOptions}
        sx={{ width: '100%', height: '100%' }}
        getOptionLabel={(option) => option.title}
        value={selectedSecondOption || prevSecondOption}
        onChange={(event, value) => setSelectedSecondOption(value)}
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
  );
};

export default DependentAutocomplete;




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
const [data, setData] = useState([]); // imported api data
const [circleData, setCircleData] = useState([]);
const [line, setLine] = useState([]);
const [numberLive, setNumberLive] = useState([]);
const [validImage, setValidImage] = useState(false);



const newDefaultImage = DefaultImage;

    const imageUrl = `http://10.8.88.91:8000${data.photo_url}`;

    // const formatDate = (value) => {
    //     const dateObj = new Date(value);
    //     const monthNames = [
    //       "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", 
    //       "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    //     ];
      
    //     const monthIndex = dateObj.getMonth();
    //     const year = dateObj.getFullYear();
      
    //     return `${monthNames[monthIndex]} ${year}`;
    //   };

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
                            <Grid container  key={id} sx={{gap:"4px",marginTop:"5px"}}>
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


// Memoize and format the data for the last twelve months
const lastTwelveMonthsData = useMemo(() => {
  return line.kpies ? line.kpies.slice(-12).map(item => ({
    ...item,
    formattedMonth: formatDate(item.month)
  })) : [];
}, [line.kpies]);



// testing data //
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
import OpenHorizontalBarChart from "../../components/OpenHorizontalBar/OpenHorizontalBar";// no % cost right side //
import HorizontalCostBarChart from "../../components/HorizontalBarchart/HorizontalBarchart.jsx";
import OpenDoughnutChart from "../../components/OperDroughtBar/OpenDroughtBar"; // changes doughnut //
import OpenVerticalGroupBarChart from "../../components/OpenVerticalGroupBarchart/OpenVerticalBarChart"; // change static form label name //
// calendar elements section //
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/ru"; // Import Russian locale
import { REQUESTS } from "../../api/requests.js";
// IPORT TEST API //
// import CommonData from "../../pages/testapi/testDataAll.jsx"

// IMPORT ICONS //
import MovingIcon from "@mui/icons-material/Moving";
import { useTranslation } from "react-i18next";

const NetProfitSceen = ({changeLang}) => {

  const {t} = useTranslation()

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
  


  // <==== Grapic Indicator API Datas  ====> //

  //   useEffect(() => {
  //     const fetchGraphicData = async () => {
  //         try {
  //             const response = await REQUESTS.analysisScreenOne.getAnalysisScreenOne();
  //             const graphicIndicators = response;
  //             console.log(graphicIndicators,"salom")
  //             setChooseData(graphicIndicators);
  //         } catch (error) {
  //             console.error("Error fetching graphic indicator data:", error);
  //         }
  //     };
  //     fetchGraphicData();
     
  // }, []);

  useEffect(() => {
    const fetchGraphicData = async () => {
      try {
        const response = await REQUESTS.analysisScreenOne.getAnalysisScreenOne();
        const graphicIndicators = response; // Ensure you access the data property
        console.log(graphicIndicators, "Fetched data");
        setChooseData(graphicIndicators);
      } catch (error) {
        console.error("Error fetching graphic indicator data:", error);
      }
    };
  
    fetchGraphicData();
  }, []); // 

  const testData = chooseData;

  // Real working Code //
  const handleDateChange = (newValue) => {
    setSelectNewData(newValue);
    const formattedDate = newValue ? dayjs(newValue).format('DD.MM.YYYY') : '';
    setDateText(formattedDate);
  
    const selectedDataFromAPI = testData.find(
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
      setPrevSecondOption(selectedSecondOptions);
      setSecondOptions(setSelectedSecondMap[selectedFirstOption.id] || []);
      setSelectedSecondOptions(null); // Reset the second option
    } else {
      setSecondOptions([]);
    }
  
    // Initialize the screen with the previous day's date
    const initializeScreen = () => {
      const initialDate = dayjs().subtract(1, 'day');
      handleDateChange(initialDate);
    };
  
    initializeScreen();
  }, [selectedFirstOption, selectedSecondOptions]); // Add dependencies as needed


    // useEffect(() => {
    //   if (selectedFirstOption && selectedFirstOption.id) {
    //     setPrevFirstOption(selectedFirstOption);
    //     setPrevSecondOption(setSelectedSecondOptions);
  
    //     setSecondOptions(setSelectedSecondMap[selectedFirstOption.id] || []);
    //     setSelectedSecondOptions(null); // Reset the second option
    //   } else {
    //     setSecondOptions([]);
    //   }
    
    //   const initializeScreen = () => {
    //     // Use the day before today as the initial date
    //     const initialDate = dayjs().subtract(1, 'day');
  
    //     // Trigger handleDateChange with the initial date
    //     handleDateChange(initialDate);
    //   };
    
    //   initializeScreen();
    // }, [selectedFirstOption]);

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
                    {/* <Autocomplete
                        options={top128Filials}
                        sx={{ width: '100%', height: '100%', mb: 2 }}
                        getOptionLabel={(option) => option.title}
                        value={selectedFirstOption || prevFirstOption}
                        onChange={(event, value) => setSelectedFirstOption(value)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            // label="Выбор область"
                            label={t("selectregion")}
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
                      /> */}
                      <Autocomplete
                          options={top128Filials}
                          sx={{ width: '100%', height: '100%', mb: 2 }}
                          getOptionLabel={(option) => option.title}
                          value={selectedFirstOption || prevFirstOption}
                          onChange={(event, value) => setSelectedFirstOption(value)}
                          isOptionEqualToValue={(option, value) => option.title === value.title} // Add this line
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label={t("selectregion")}
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
                      {/* <Autocomplete
                        options={secondOptions}
                        sx={{ width: '100%', height: '100%' }}
                        getOptionLabel={(option) => option.title}
                        onChange={(event, value) => setSelectedSecondOptions(value)}
                        value={selectedSecondOptions || prevSecondOption}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            // label="Выбор филиала"
                            label={t("selectfilial")}
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
                      /> */}
                      <Autocomplete
                        options={secondOptions}
                        sx={{ width: '100%', height: '100%' }}
                        getOptionLabel={(option) => option.title}
                        onChange={(event, value) => setSelectedSecondOptions(value)}
                        value={selectedSecondOptions || prevSecondOption}
                        isOptionEqualToValue={(option, value) => option.title === value.title} // Add this line
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={t("selectfilial")}
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
                  
                  {/* <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
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
                  </LocalizationProvider> */}
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={selectnewdata}
        onChange={handleDateChange}
        renderInput={(params) => (
          <TextField
            {...params}
            id="datepicker-input"
            inputProps={{
              ...params.inputProps,
              placeholder: "DD.MM.YYYY",
              readOnly: true, // Readonly if you want to prevent manual typing
            }}
          />
        )}
        disableFuture // Optional: Add any additional props needed
      />
    </LocalizationProvider>
                </Box>
              </Grid>
            </Grid>
            {chooseData.map((item, index) => (
              <Box key={index} sx={{width:"100%",height:"100%"}}>
            {/*<==== first grid div ====>*/}
            <Grid container sx={{ width: "100%", height: "200px" }}>
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
                    {t("cleanincommain")}
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
                        {item.cleanProfit.netProfitData ? insertSpaces(Math.round(item.cleanProfit.netProfitData / 1000 )) : "00"}
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
                    {t("cleanpercentagevalues")}
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
                    }}>{t("percentageincome")} </Typography>
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
                    }}>{t("nopercentageincome")}</Typography>
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
                  {t("costpercentage")}
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
                    {t("costnopercentage")}
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
                    {t("operatsioncost")}
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
                      
                    }}>{t("reserve")}</Typography>
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




{chooseData.map((item, index) => (
  <Box key={index} sx={{width:"100%",height:"100%"}}>
{/*<==== first grid div ====>*/}
<Grid container sx={{ width: "100%", height: "200px" }}>
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
        {t("cleanincommain")}
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
            {item.cleanProfit.netProfitData ? insertSpaces(Math.round(item.cleanProfit.netProfitData / 1000 )) : "00"}
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
        {t("cleanpercentagevalues")}
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
        }}>{t("percentageincome")} </Typography>
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
        }}>{t("nopercentageincome")}</Typography>
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
      {t("costpercentage")}
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
        {t("costnopercentage")}
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
        {t("operatsioncost")}
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
          
        }}>{t("reserve")}</Typography>
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



    {/*<==== first grid div ====>*/}
    <Grid container sx={{ width: "100%", height: "200px" }}>
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
          boxShadow:
            "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
          WebkitBoxShadow:
            "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
          MozBoxShadow:
            "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
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
            textShadow: "0.5px 0.5px 2px gray",
          }}
        >
          {t("cleanincommain")}
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
                fontSize: "64px", // 112px
                fontWeight: "800",
                textAlign: "start",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                textShadow: "2px 2px 5px gray",
              }}
            >
              {/* { insertSpaces(item.cleanProfit.netProfitData) || "нет информации"} */}
              {item.cleanProfit.netProfitData
                ? insertSpaces(
                    Math.round(
                      item.cleanProfit.netProfitData / 1000
                    )
                  )
                : "00"}
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
                color:
                  item.cleanProfit.netPercentageData <= 100
                    ? Colors.red
                    : Colors.green_dark,
                fontSize: "48px",
                padding: "0px",
                transform:
                  item.cleanProfit.netPercentageData <= 100
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
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
              {item.cleanProfit.netPercentageData ||
                "нет информации"}
              %
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
          boxShadow:
            "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
          WebkitBoxShadow:
            "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
          MozBoxShadow:
            "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
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
            textShadow: "0.5px 0.5px 2px gray",
          }}
        >
          {t("cleanpercentagevalues")}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            height: "100%",
          }}
        >
          {/* Left side Doxod */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "auto",
            }}
          >
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
                    textShadow: "0.5px 0.5px 2px gray",
                  }}
                >
                  {/* {insertSpaces(item.cleanPercentageIncome.netSoftProfitData) || "нет информации"} */}
                  {item.cleanPercentageIncome
                    .netSoftProfitData
                    ? insertSpaces(
                        Math.round(
                          item.cleanPercentageIncome
                            .netSoftProfitData / 1000
                        )
                      )
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
                    color:
                      item.cleanPercentageIncome
                        .netSoftPercentageData <= 100
                        ? Colors.red
                        : Colors.green_dark,
                    fontSize: "24px",
                    padding: "0px",
                    transform:
                      item.cleanPercentageIncome
                        .netSoftPercentageData <= 100
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
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
                  {item.cleanPercentageIncome
                    .netSoftPercentageData ||
                    "нет информации"}
                  %
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
              width: "3px", // Sets the width of the divider
              backgroundColor: Colors.gray_back, // Sets the color of the divider
              margin: "0 10px", // Optional: Adds some space around the divider
            }}
          />
          {/* right side Rosxod */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "auto",
            }}
          >
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
                    textShadow: "0.5px 0.5px 2px gray",
                  }}
                >
                  {/* {insertSpaces(item.cleanNoPercentageIncome.netSoftNoProfitData)|| "нет информации"} */}
                  {item.cleanNoPercentageIncome
                    .netSoftNoProfitData
                    ? insertSpaces(
                        Math.round(
                          item.cleanNoPercentageIncome
                            .netSoftNoProfitData / 1000
                        )
                      )
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
                    color:
                      item.cleanNoPercentageIncome
                        .netSoftNoPercentageData <= 100
                        ? Colors.red
                        : Colors.green_dark,
                    fontSize: "24px",
                    padding: "0px",
                    transform:
                      item.cleanNoPercentageIncome
                        .netSoftNoPercentageData <= 100
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
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
                  {item.cleanNoPercentageIncome
                    .netSoftNoPercentageData ||
                    "нет информации"}
                  %
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
          boxShadow:
            "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
          WebkitBoxShadow:
            "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
          MozBoxShadow:
            "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
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
            textShadow: "0.5px 0.5px 2px gray",
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
                textShadow: "4px 4px 4px gray",
              }}
            >
              {insertSpaces(
                item.cirProfir.cirPercentageDate
              ) || "нет информации"}{" "}
              %
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
          padding: "5px",
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          boxShadow:
            "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
          WebkitBoxShadow:
            "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
          MozBoxShadow:
            "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
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
          {t("percentageincome")}{" "}
        </Typography>
        <Box sx={{ width: "100%", height: "auto" }}>
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
          padding: "5px",
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          boxShadow:
            "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
          WebkitBoxShadow:
            "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
          MozBoxShadow:
            "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
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
          {t("nopercentageincome")}
        </Typography>
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
    <Grid
      item
      xs={6}
      md={6}
      lg={6}
      sx={{ padding: "5px", height: "auto" }}
    >
      <Box
        sx={{
          bgcolor: Colors.white,
          borderRadius: "5px",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "5px",
          boxShadow:
            "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
          WebkitBoxShadow:
            "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
          MozBoxShadow:
            "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
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
          {t("costpercentage")}
        </Typography>
        {/* Bottom side box of third div */}
        <Box sx={{ width: "100%", height: "350px" }}>
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
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "5px",
          boxShadow:
            "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
          WebkitBoxShadow:
            "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
          MozBoxShadow:
            "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
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
          {t("costnopercentage")}
        </Typography>
        {/* Bottom side box of third div */}
        <Box sx={{ width: "100%", height: "350px" }}>
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
    <Grid item xs={5} md={5} lg={5} sx={{ padding: "5px" }}>
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
          boxShadow:
            "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
          WebkitBoxShadow:
            "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
          MozBoxShadow:
            "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
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
          {t("operatsioncost")}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          {/* Left side of text box */}
          <OpenDoughnutChart
            chartData={item.operatingExpenses.planData}
          />
          {/* Right side of text box */}
        </Box>
      </Box>
    </Grid>
    {/* right side */}
    <Grid item xs={7} md={7} lg={7} sx={{ padding: "5px" }}>
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
          boxShadow:
            "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
          WebkitBoxShadow:
            "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
          MozBoxShadow:
            "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
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
          {t("reserve")}
        </Typography>
        <Box sx={{ width: "100%", height: "auto" }}>
          <OpenVerticalGroupBarChart
            planData={item.reserveData.planData}
            factData={item.reserveData.factData}
          />
        </Box>
      </Box>
    </Grid>
  </Grid>


{chooseData.map((item, index) => (
  <Box key={index} sx={{width:"100%",height:"100%"}}>
{/*<==== first grid div ====>*/}
<Grid container sx={{ width: "100%", height: "200px" }}>
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
        {t("cleanincommain")}
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
            {item.cleanProfit.netProfitData ? insertSpaces(Math.round(item.cleanProfit.netProfitData / 1000 )) : "00"}
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
        {t("cleanpercentagevalues")}
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
        }}>{t("percentageincome")} </Typography>
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
        }}>{t("nopercentageincome")}</Typography>
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
      {t("costpercentage")}
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
        {t("costnopercentage")}
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
        {t("operatsioncost")}
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
          
        }}>{t("reserve")}</Typography>
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


     {/* {sanaItem.nointerestIncome &&
                      sanaItem.nointerestIncome.planData &&
                      sanaItem.nointerestIncome.factData ? (
                      
                      ) : (
                        <Typography>No data available for chart</Typography>
                      )} */}

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


// kpi old vertical barcharts //
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
        <Typography sx={{textAlign:"start",fontWeight:"800",fontSize:{xs:"12px",md:"16px"},}}>{t("thirdText")}</Typography>
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



// recharts elements //
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Tooltip,
  LabelList,
} from "recharts";

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
// main section new datas cards // 
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
    height: { xs: "400px", md: "500px" },
    width: "auto",
    padding: "5px",
  }}>
<Box
  sx={{
    width: "100%",
    height: "100%",
    borderRadius: "5px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    bgcolor: Colors.gray_footer,
    position: "relative",
    "&:hover .hover-button": {
      opacity: 1, // Show button when hovering over the box
    },
  }}
>
  <Typography
    sx={{
      textAlign: "start",
      fontWeight: "800",
      fontSize: { xs: "12px", md: "20px" },
    }}
  >
    {t("secontText")}
  </Typography>

  <Box sx={{display:"flex",flexDirection:"column",height:"90%",width:"100%",gap:"10px",marginTop:"15px"}} >
      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly",height:"28%"}}>
        {/* top side of div */}
          <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"10px"}}>
            <Typography variant="h2" sx={{fontWeight:"bold",textAlign:"start"}}>{insertSpaces(974212)}</Typography>
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
              млрд.<br/> сўм.экв
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
                  72 <span style={{color: Colors.green_area, fontSize: "20px", lineHeight: "1"}}>%</span>
                </Typography>
              </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",height:"70%"}}>
        {/* pie chart section  */}
        <Box sx={{ display:"flex",alignItems:"center" ,width:"60%",height:"100%"}} >
            <StackedBartchart/>  
        </Box>
        {/* right side Texts */}
        <Box sx={{}}>
          <Typography sx={{fontSize:"12px",color:Colors.gray,fontStyle: "italic",textAlign:"left" }}>шу жумладан:</Typography>
            {/* top side light blue */}
          <Box sx={{display:"flex",flexDirection:"column"}}>
              <Box>
                <Typography sx={{fontSize:"12px",color:Colors.dark,fontWeight:"bold",textAlign:"left",lineHeight:"1"}}>ХОРИЖИЙ ВАЛЮТАДА</Typography>
                <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:"10px"}}>
                  <Typography sx={{color:"rgba(76, 0, 153, 0.7)",fontSize:"40px",fontWeight:"bold",width:"auto",lineHeight:"1.1",}}>{insertSpaces(98256)}</Typography>
                  <Typography sx={{color:Colors.gray,fontSize:"12px",width:"50px", wordWrap: "break-word",textAlign: "start",lineHeight:"1",}}>млрд <br/> сўм.экв</Typography>
                </Box>
              </Box>
          </Box>
          {/* bottom side dark_blue national  */}
          <Box sx={{display:"flex",flexDirection:"column"}}>
              <Box>
                <Typography sx={{fontSize:"12px",color:Colors.dark,fontWeight:"bold",textAlign:"left",lineHeight:"1"}}>МИЛЛИЙ ВАЛЮТАДА</Typography>
                <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:"10px"}}>
                  <Typography sx={{color:"rgba(0, 77, 77, 0.7)",fontSize:"40px",fontWeight:"bold",width:"auto",lineHeight:"1.1",}}>{insertSpaces(12785)}</Typography>
                  <Typography sx={{color:Colors.gray,fontSize:"12px",width:"50px", wordWrap: "break-word",textAlign: "start",lineHeight:"1",}}>млрд <br/> сўм.экв</Typography>
                </Box>
              </Box>
          </Box>
        </Box>
      </Box>
    </Box>
    {/* Button at the bottom-right */}
    <Box
      className="hover-button"
      sx={{
        textAlign: "end",
        position: "absolute",
        bottom: "10px",
        right: "10px",
        opacity: 0, // Initially hidden
        transition: "opacity 300ms ease", // Smooth transition for hover
      }}
    >
      <Button
        variant="contained"
        size="medium"
        onClick={handleOpenAuthModal}
      >
        <Typography
          sx={{
            color: Colors.white,
            fontWeight: "800",
            textTransform: "uppercase",
          }}
        >
          {t("infobutton")}
        </Typography>
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
          <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"10"}}>
            <Typography variant="h2" sx={{fontWeight:"bold",textAlign:"start"}}>{insertSpaces(97421)}</Typography>
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
                млрд.<br/> сўм.экв
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
                  72 <span style={{color: Colors.green_area, fontSize: "20px", lineHeight: "1"}}>%</span>
                </Typography>
              </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",height:"70%"}}>
        {/* pie chart section  */}
        <Box sx={{ display:"flex",alignItems:"center" ,width:"60%",height:"100%"}} >
            <PieChartMainChart/>  
        </Box>
        {/* right side Texts */}
        <Box sx={{}}>
          <Typography sx={{fontSize:"12px",color:Colors.gray,fontStyle: "italic",textAlign:"left" }}>шу жумладан:</Typography>
            {/* top side light blue */}
          <Box sx={{display:"flex",flexDirection:"column"}}>
              <Box>
                <Typography sx={{fontSize:"12px",color:Colors.dark,fontWeight:"bold",textAlign:"left",lineHeight:"1"}}>ХОРИЖИЙ ВАЛЮТАДА</Typography>
                <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:"10px"}}>
                  <Typography sx={{color:"rgba(0, 129, 0, 0.7)",fontSize:"40px",fontWeight:"bold",width:"auto",lineHeight:"1.1",}}>{insertSpaces(98256)}</Typography>
                  <Typography sx={{color:Colors.gray,fontSize:"12px",width:"50px", wordWrap: "break-word",textAlign: "start",lineHeight:"1",}}>млрд <br/> сўм.экв</Typography>
                </Box>
              </Box>
          </Box>
          {/* bottom side dark_blue national  */}
          <Box sx={{display:"flex",flexDirection:"column"}}>
              <Box>
                <Typography sx={{fontSize:"12px",color:Colors.dark,fontWeight:"bold",textAlign:"left",lineHeight:"1"}}>МИЛЛИЙ ВАЛЮТАДА</Typography>
                <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:"10px"}}>
                  <Typography sx={{color:"rgba(139, 0, 0, 0.7)",fontSize:"40px",fontWeight:"bold",width:"auto",lineHeight:"1.1",}}>{insertSpaces(12785)}</Typography>
                  <Typography sx={{color:Colors.gray,fontSize:"12px",width:"50px", wordWrap: "break-word",textAlign: "start",lineHeight:"1",}}>млрд <br/> сўм.экв</Typography>
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
            <Typography variant="h2" sx={{fontWeight:"bold",textAlign:"start"}}>{insertSpaces(97421)}</Typography>
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
                млрд.<br/> сўм.экв
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
                  72 <span style={{color: Colors.green_area, fontSize: "20px", lineHeight: "1"}}>%</span>
                </Typography>
              </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",height:"70%"}}>
        {/* pie chart section  */}
        <Box sx={{ display:"flex",alignItems:"center" ,width:"60%",height:"100%"}} >
            <HolePieChart/>  
        </Box>
        {/* right side Texts */}
        <Box sx={{}}>
          <Typography sx={{fontSize:"12px",color:Colors.gray,fontStyle: "italic",textAlign:"left" }}>шу жумладан:</Typography>
            {/* top side light blue */}
          <Box sx={{display:"flex",flexDirection:"column"}}>
              <Box>
                <Typography sx={{fontSize:"12px",color:Colors.dark,fontWeight:"bold",textAlign:"left",lineHeight:"1"}}>ХОРИЖИЙ ВАЛЮТАДА</Typography>
                <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:"10px"}}>
                  <Typography sx={{color:Colors.blue_light_table,fontSize:"40px",fontWeight:"bold",width:"auto",lineHeight:"1.1",}}>{insertSpaces(98256)}</Typography>
                  <Typography sx={{color:Colors.gray,fontSize:"12px",width:"50px", wordWrap: "break-word",textAlign: "start",lineHeight:"1",}}>млрд <br/> сўм.экв</Typography>
                </Box>
              </Box>
          </Box>
          {/* bottom side dark_blue national  */}
          <Box sx={{display:"flex",flexDirection:"column"}}>
              <Box>
                <Typography sx={{fontSize:"12px",color:Colors.dark,fontWeight:"bold",textAlign:"left",lineHeight:"1"}}>МИЛЛИЙ ВАЛЮТАДА</Typography>
                <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:"10px"}}>
                  <Typography sx={{color:Colors.blue_nbu,fontSize:"40px",fontWeight:"bold",width:"auto",lineHeight:"1.1",}}>{insertSpaces(12785)}</Typography>
                  <Typography sx={{color:Colors.gray,fontSize:"12px",width:"50px", wordWrap: "break-word",textAlign: "start",lineHeight:"1",}}>млрд <br/> сўм.экв</Typography>
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
  <Box sx={{width:"100%",height:"100%",borderRadius:"5px",padding:"10px",display:"flex",flexDirection:"column",gap:"20px",bgcolor:Colors.gray_footer,}}>
    <Typography sx={{textAlign:"start",fontWeight:"800",fontSize:{xs:"12px",md:"20px"},}}>  {t("firstText")}</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection:"column",
              gap: "15px",
              height:"100%",
            }}
          >
            <Box sx={{display:"flex",flexDirection:"column",}}>
                <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",textAlign:"left",height:"100%"}}>
                  <Typography sx={{fontSize:"28px",color:Colors.gray,textTransform:"uppercase",fontWeight:"bold",textAlign:"left"}}>Sof Foyda:</Typography>
                  <Typography variant="h2" sx={{fontWeight:"bold",textAlign:"start",color:Colors.blue_middle,lineHeight:"1"}}>{insertSpaces(974212)}</Typography>
                  <Typography
                    sx={{
                      color: Colors.gray,
                      width: "auto",
                      lineHeight: "1",
                      fontStyle: "italic",
                      fontWeight: "500",
                      wordWrap: "break-word",
                      fontSize:"16px"
                    }}
                  >
                    млрд.<br/> сўм.экв
                  </Typography>
                </Box>
            </Box>

              {/* bottom side */}
            <Box sx={{display:"flex",flexDirection:"column",height:"100%"}}>
              <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",width:"100%",gap:"25px"}}> 
              {/* left side roa texts */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems:"flex-end"
                }}
              >
                <Typography sx={{color:Colors.gray,fontWeight:"normal",fontSize:"48px"}}>ROA</Typography>
                <Typography sx={{color:Colors.gray,fontWeight:"normal",fontSize:"48px"}}>ROE</Typography>
                <Typography sx={{color:Colors.gray,fontWeight:"normal",fontSize:"48px"}}>CIR</Typography>
              </Box>
                {/* right percentage */}
                <Box sx={{display:"flex",flexDirection:"column"}}>
                  <Typography sx={{color:Colors.blue_middle,fontWeight:"bold",fontSize:"48px"}}>21<span style={{color:Colors.blue_middle,fontSize:"28px"}}>%</span></Typography>
                  <Typography sx={{color:Colors.blue_middle,fontWeight:"bold",fontSize:"48px"}}>21<span style={{color:Colors.blue_middle,fontSize:"28px"}}>%</span></Typography>
                  <Typography sx={{color:Colors.blue_middle,fontWeight:"bold",fontSize:"48px"}}>21<span style={{color:Colors.blue_middle,fontSize:"28px"}}>%</span></Typography>
                </Box>
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
            <Typography variant="h2" sx={{fontWeight:"bold",textAlign:"start"}}>{insertSpaces(97421)}</Typography>
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
                млрд.<br/> сўм.экв
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
                  72 <span style={{color: Colors.green_area, fontSize: "20px", lineHeight: "1"}}>%</span>
                </Typography>
              </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",height:"70%"}}>
        {/* pie chart section  */}
        <Box sx={{ display:"flex",alignItems:"center" ,width:"60%",height:"100%"}} >
            <VerticalBarchartTwo/>  
        </Box>
        {/* right side Texts */}
        <Box sx={{}}>
          <Typography sx={{fontSize:"12px",color:Colors.gray,fontStyle: "italic",textAlign:"left" }}>шу жумладан:</Typography>
            {/* top side light blue */}
          <Box sx={{display:"flex",flexDirection:"column"}}>
              <Box>
                <Typography sx={{fontSize:"12px",color:Colors.dark,fontWeight:"bold",textAlign:"left",lineHeight:"1"}}>ХОРИЖИЙ ВАЛЮТАДА</Typography>
                <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:"10px"}}>
                  <Typography sx={{color:"rgba(54, 100, 200, 1)",fontSize:"40px",fontWeight:"bold",width:"auto",lineHeight:"1.1",}}>{insertSpaces(98256)}</Typography>
                  <Typography sx={{color:Colors.gray,fontSize:"12px",width:"50px", wordWrap: "break-word",textAlign: "start",lineHeight:"1",}}>млрд <br/> сўм.экв</Typography>
                </Box>
              </Box>
          </Box>
          {/* bottom side dark_blue national  */}
          <Box sx={{display:"flex",flexDirection:"column"}}>
              <Box>
                <Typography sx={{fontSize:"12px",color:Colors.dark,fontWeight:"bold",textAlign:"left",lineHeight:"1"}}>МИЛЛИЙ ВАЛЮТАДА</Typography>
                <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:"10px"}}>
                  <Typography sx={{color:"rgba(60, 179, 113, 1)",fontSize:"40px",fontWeight:"bold",width:"auto",lineHeight:"1.1",}}>{insertSpaces(12785)}</Typography>
                  <Typography sx={{color:Colors.gray,fontSize:"12px",width:"50px", wordWrap: "break-word",textAlign: "start",lineHeight:"1",}}>млрд <br/> сўм.экв</Typography>
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
            <Typography variant="h2" sx={{fontWeight:"bold",textAlign:"start"}}>{insertSpaces(97421)}</Typography>
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
                млрд.<br/> сўм.экв
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
                  72 <span style={{color: Colors.green_area, fontSize: "20px", lineHeight: "1"}}>%</span>
                </Typography>
              </Box>
            </Box>
        </Box>
      </Box>
      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",height:"70%"}}>
        {/* pie chart section  */}
        <Box sx={{ display:"flex",alignItems:"center" ,width:"60%",height:"100%"}} >
            <VerticalBarchartTwo/>  
        </Box>
        {/* right side Texts */}
        <Box sx={{}}>
          <Typography sx={{fontSize:"12px",color:Colors.gray,fontStyle: "italic",textAlign:"left" }}>шу жумладан:</Typography>
            {/* top side light blue */}
          <Box sx={{display:"flex",flexDirection:"column"}}>
              <Box>
                <Typography sx={{fontSize:"12px",color:Colors.dark,fontWeight:"bold",textAlign:"left",lineHeight:"1"}}>ХОРИЖИЙ ВАЛЮТАДА</Typography>
                <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:"10px"}}>
                  <Typography sx={{color:Colors.blue_light_table,fontSize:"40px",fontWeight:"bold",width:"auto",lineHeight:"1.1",}}>{insertSpaces(98256)}</Typography>
                  <Typography sx={{color:Colors.gray,fontSize:"12px",width:"50px", wordWrap: "break-word",textAlign: "start",lineHeight:"1",}}>млрд <br/> сўм.экв</Typography>
                </Box>
              </Box>
          </Box>
          {/* bottom side dark_blue national  */}
          <Box sx={{display:"flex",flexDirection:"column"}}>
              <Box>
                <Typography sx={{fontSize:"12px",color:Colors.dark,fontWeight:"bold",textAlign:"left",lineHeight:"1"}}>МИЛЛИЙ ВАЛЮТАДА</Typography>
                <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:"10px"}}>
                  <Typography sx={{color:Colors.blue_nbu,fontSize:"40px",fontWeight:"bold",width:"auto",lineHeight:"1.1",}}>{insertSpaces(12785)}</Typography>
                  <Typography sx={{color:Colors.gray,fontSize:"12px",width:"50px", wordWrap: "break-word",textAlign: "start",lineHeight:"1",}}>млрд <br/> сўм.экв</Typography>
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
</Box>


const handleDateChange = (newValue) => {
  setSelectNewData(newValue);
  const formattedDate = newValue ? dayjs(newValue).format("MM.DD.YYYY") : "";

  // Filter data by selected date
  // const selectedData = testData.filter((item) => {

  const selectedData = chooseData.map((item) => {
  //   return selectedSecondOptions?.title === item.name; 
  // }).map((item) => {
    return {
      ...item, 
      filteredSana: item.sana
        ? item.sana.filter((sanaItem) => sanaItem.date === formattedDate)
        : [], 
    };
  });

  setChooseData(selectedData);
};


 {/* <=== first grid div ====> */}
 <Grid container sx={{ width: "100%", height: "200px" }}>
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
       boxShadow:
         "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
       WebkitBoxShadow:
         "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
       MozBoxShadow:
         "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
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
         textShadow: "0.5px 0.5px 2px gray",
       }}
     >
       {t("cleanincommain")}
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
             fontSize: "64px", // 112px
             fontWeight: "800",
             textAlign: "start",
             overflow: "hidden",
             textOverflow: "ellipsis",
             whiteSpace: "nowrap",
             textShadow: "2px 2px 5px gray",
           }}
         >
           {/* { insertSpaces(item.cleanProfit.netProfitData) || "нет информации"} */}
           {sanaItem.cleanProfit.netProfitData
             ? insertSpaces(
                 Math.round(
                   sanaItem.cleanProfit.netProfitData / 1000
                 )
               )
             : "00"}
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
             color:
             sanaItem.cleanProfit.netPercentageData <= 100
                 ? Colors.red
                 : Colors.green_dark,
             fontSize: "48px",
             padding: "0px",
             transform:
             sanaItem.cleanProfit.netPercentageData <= 100
                 ? "rotate(180deg)"
                 : "rotate(0deg)",
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
           {sanaItem.cleanProfit.netPercentageData ||
             "нет информации"}
           %
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
       boxShadow:
         "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
       WebkitBoxShadow:
         "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
       MozBoxShadow:
         "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
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
         textShadow: "0.5px 0.5px 2px gray",
       }}
     >
       {t("cleanpercentagevalues")}
     </Typography>
     <Box
       sx={{
         display: "flex",
         alignItems: "center",
         justifyContent: "space-evenly",
         height: "100%",
       }}
     >
       {/* Left side Doxod */}
       <Box
         sx={{
           display: "flex",
           flexDirection: "column",
           height: "auto",
         }}
       >
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
                 textShadow: "0.5px 0.5px 2px gray",
               }}
             >
               {/* {insertSpaces(item.cleanPercentageIncome.netSoftProfitData) || "нет информации"} */}
               {sanaItem.cleanPercentageIncome
                 .netSoftProfitData
                 ? insertSpaces(
                     Math.round(
                       sanaItem.cleanPercentageIncome
                         .netSoftProfitData / 1000
                     )
                   )
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
                 color:
                 sanaItem.cleanPercentageIncome.netSoftPercentageData <= 100
                     ? Colors.red
                     : Colors.green_dark,
                 fontSize: "24px",
                 padding: "0px",
                 transform:
                 sanaItem.cleanPercentageIncome.netSoftPercentageData <= 100
                     ? "rotate(180deg)"
                     : "rotate(0deg)",
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
               {sanaItem.cleanPercentageIncome.netSoftPercentageData ||
                 "нет информации"}
               %
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
           width: "3px", // Sets the width of the divider
           backgroundColor: Colors.gray_back, // Sets the color of the divider
           margin: "0 10px", // Optional: Adds some space around the divider
         }}
       />
       {/* right side Rosxod */}
       <Box
         sx={{
           display: "flex",
           flexDirection: "column",
           height: "auto",
         }}
       >
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
                 textShadow: "0.5px 0.5px 2px gray",
               }}
             >
               {/* {insertSpaces(item.cleanNoPercentageIncome.netSoftNoProfitData)|| "нет информации"} */}
               {sanaItem.cleanNoPercentageIncome.netSoftNoProfitData
                 ? insertSpaces(
                     Math.round(
                       sanaItem.cleanNoPercentageIncome.netSoftNoProfitData / 1000
                     )
                   )
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
                 color:
                   sanaItem.cleanNoPercentageIncome.netSoftNoPercentageData <= 100
                     ? Colors.red
                     : Colors.green_dark,
                 fontSize: "24px",
                 padding: "0px",
                 transform:
                   sanaItem.cleanNoPercentageIncome.netSoftNoPercentageData <= 100
                     ? "rotate(180deg)"
                     : "rotate(0deg)",
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
               {sanaItem.cleanNoPercentageIncome.netSoftNoPercentageData ||
                 "нет информации"}
               %
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
       boxShadow:
         "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
       WebkitBoxShadow:
         "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
       MozBoxShadow:
         "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
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
         textShadow: "0.5px 0.5px 2px gray",
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
             textShadow: "4px 4px 4px gray",
           }}
         >
           {insertSpaces(
             sanaItem.cirProfir.cirPercentageDate
           ) || "нет информации"}{" "}
           %
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
       padding: "5px",
       display: "flex",
       flexDirection: "column",
       gap: "5px",
       boxShadow:
         "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
       WebkitBoxShadow:
         "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
       MozBoxShadow:
         "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
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
       {t("percentageincome")}{" "}
     </Typography>
     <Box sx={{ width: "100%", height: "auto" }}>
       <NewLineChart
         planData={sanaItem.interestIncome.planData}
         factData={sanaItem.interestIncome.factData}
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
       padding: "5px",
       display: "flex",
       flexDirection: "column",
       gap: "5px",
       boxShadow:
         "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
       WebkitBoxShadow:
         "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
       MozBoxShadow:
         "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
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
       {t("nopercentageincome")}
     </Typography>
     <Box sx={{ width: "100%", height: "auto" }}>
       <NoIncomeLineChart
         planData={sanaItem.nointerestIncome.planData}
         factData={sanaItem.nointerestIncome.factData}
       />
     </Box>
   </Box>
 </Grid>
</Grid>
{/*<==== third grid div ====>*/}
<Grid container sx={{ width: "100%", height: "400px" }}>
 {/* left side of third div */}
 <Grid
   item
   xs={6}
   md={6}
   lg={6}
   sx={{ padding: "5px", height: "auto" }}
 >
   <Box
     sx={{
       bgcolor: Colors.white,
       borderRadius: "5px",
       width: "100%",
       height: "100%",
       display: "flex",
       flexDirection: "column",
       gap: "10px",
       padding: "5px",
       boxShadow:
         "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
       WebkitBoxShadow:
         "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
       MozBoxShadow:
         "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
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
       {t("costpercentage")}
     </Typography>
     {/* Bottom side box of third div */}
     <Box sx={{ width: "100%", height: "350px" }}>
       <HorizontalCostBarChart
         planData={sanaItem.interestCost.planData}
         factData={sanaItem.interestCost.factData}
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
       display: "flex",
       flexDirection: "column",
       gap: "10px",
       padding: "5px",
       boxShadow:
         "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
       WebkitBoxShadow:
         "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
       MozBoxShadow:
         "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
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
       {t("costnopercentage")}
     </Typography>
     {/* Bottom side box of third div */}
     <Box sx={{ width: "100%", height: "350px" }}>
       <OpenHorizontalBarChart
         planData={sanaItem.nointerestCost.planData}
         factData={sanaItem.nointerestCost.factData}
       />
     </Box>
   </Box>
 </Grid>
</Grid>
{/*<==== fouth grid div ====>*/}
<Grid container sx={{ width: "100%", height: "260px" }}>
 {/* left side */}
 <Grid item xs={5} md={5} lg={5} sx={{ padding: "5px" }}>
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
       boxShadow:
         "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
       WebkitBoxShadow:
         "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
       MozBoxShadow:
         "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
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
       {t("operatsioncost")}
     </Typography>
     <Box
       sx={{
         display: "flex",
         alignItems: "center",
         justifyContent: "space-evenly",
       }}
     >
       {/* Left side of text box */}
       <OpenDoughnutChart
         chartData={sanaItem.operatingExpenses.factData}
       />
       {/* Right side of text box */}
     </Box>
   </Box>
 </Grid>
 {/* right side */}
 <Grid item xs={7} md={7} lg={7} sx={{ padding: "5px" }}>
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
       boxShadow:
         "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
       WebkitBoxShadow:
         "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
       MozBoxShadow:
         "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
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
       {t("reserve")}
     </Typography>
     <Box sx={{ width: "100%", height: "auto" }}>
       <OpenVerticalGroupBarChart
         planData={sanaItem.reserveData.planData}
         factData={sanaItem.reserveData.factData}
       />
     </Box>
   </Box>
 </Grid>
</Grid>


  // <Box sx={{ padding: "10px", marginBottom: "10px", border: "1px solid #ddd" }}>
                    //   <Box sx={{ width: "100%", height: "350px" }}>
                    //     <NoIncomeLineChart
                    //       planData={divideAndRoundData(sanaItem.nointerestIncome?.planData || [])}
                    //       factData={divideAndRoundData(sanaItem.nointerestIncome?.factData || [])}
                    //     />
                    //   </Box>
                    // </Box>

                    const handleDateChange = (newValue) => {
                      setSelectNewData(newValue);
                      const formattedDate = newValue ? dayjs(newValue).format("MM.DD.YYYY") : "";
                    
                      // Filter data by selected date
                      // const selectedData = testData.filter((item) => {
                    
                      // const selectedData = chooseData.map((item) => {
                      //   return selectedSecondOptions?.title === item.name; 
                      // }).map((item) => {
                      //   return {
                      //     ...item, 
                      //     filteredSana: item.sana
                      //       ? item.sana.filter((sanaItem) => sanaItem.date === formattedDate)
                      //       : [], 
                      //   };
                      // });
                  
                       // Filter and map the data
                    const selectedData = chooseData
                    .filter((item) => selectedSecondOptions?.title === item.name)
                    .map((item) => {
                      return {
                        ...item, 
                        // Filter sana array based on formatted date
                        sana: item.sana
                          ? item.sana.filter((sanaItem) => sanaItem.date === formattedDate)
                          : [], 
                      };
                    });
                    
                      setChooseData(selectedData);
                    };





                    { chooseData.filter((item) => item.date === selectNewData).map((item, index) => (
                      <Box key={index} sx={{ width: "100%", height: "100%", marginTop: "5px" }}>
          
                        {item?.sana?.map((sanaItem, idx) => (
          
                        <Box key={idx} sx={{ width: "100%", height: "100%" }}>
                          {sanaItem.date}
                         {/* <=== first grid div ====> */}
                        <Grid container sx={{ width: "100%", height: "200px" }}>
                            {/* first number div */}
                            <Grid item xs={5} md={5} lg={4} sx={{ padding: "5px" }}>
                            {sanaItem?.cleanProfit ? (
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
                                  boxShadow:
                                    "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                                  WebkitBoxShadow:
                                    "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                                  MozBoxShadow:
                                    "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
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
                                    textShadow: "0.5px 0.5px 2px gray",
                                  }}
                                >
                                  {t("cleanincommain")}
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
                                        fontSize: "64px", // 112px
                                        fontWeight: "800",
                                        textAlign: "start",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        textShadow: "2px 2px 5px gray",
                                      }}
                                    >
                                      {/* { insertSpaces(item.cleanProfit.netProfitData) || "нет информации"} */}
                                      {sanaItem.cleanProfit?.netProfitData
                                        ? insertSpaces(
                                            Math.round(
                                              sanaItem.cleanProfit.netProfitData / 1000
                                            )
                                          )
                                        : "00"}
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
                                        color:
                                        sanaItem.cleanProfit?.netPercentageData <= 100
                                            ? Colors.red
                                            : Colors.green_dark,
                                        fontSize: "48px",
                                        padding: "0px",
                                        transform:
                                        sanaItem.cleanProfit.netPercentageData <= 100
                                            ? "rotate(180deg)"
                                            : "rotate(0deg)",
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
                                      {sanaItem.cleanProfit?.netPercentageData ||
                                        "нет информации"}
                                      %
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                            ) : (
                                    <Typography sx={{ fontWeight: "800", textTransform: "uppercase", color: "red" }}>
                                      No Data Available
                                    </Typography>
                                  )}
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
                                  boxShadow:
                                    "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                                  WebkitBoxShadow:
                                    "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                                  MozBoxShadow:
                                    "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
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
                                    textShadow: "0.5px 0.5px 2px gray",
                                  }}
                                >
                                  {t("cleanpercentagevalues")}
                                </Typography>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-evenly",
                                    height: "100%",
                                  }}
                                >
                                  {/* Left side Doxod */}
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "column",
                                      height: "auto",
                                    }}
                                  >
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
                                            textShadow: "0.5px 0.5px 2px gray",
                                          }}
                                        >
                                          {/* {insertSpaces(item.cleanPercentageIncome.netSoftProfitData) || "нет информации"} */}
                                          {sanaItem.cleanPercentageIncome
                                            .netSoftProfitData
                                            ? insertSpaces(
                                                Math.round(
                                                  sanaItem.cleanPercentageIncome
                                                    .netSoftProfitData / 1000
                                                )
                                              )
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
                                            color:
                                            sanaItem.cleanPercentageIncome.netSoftPercentageData <= 100
                                                ? Colors.red
                                                : Colors.green_dark,
                                            fontSize: "24px",
                                            padding: "0px",
                                            transform:
                                            sanaItem.cleanPercentageIncome.netSoftPercentageData <= 100
                                                ? "rotate(180deg)"
                                                : "rotate(0deg)",
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
                                          {sanaItem.cleanPercentageIncome.netSoftPercentageData ||
                                            "нет информации"}
                                          %
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
                                      width: "3px", // Sets the width of the divider
                                      backgroundColor: Colors.gray_back, // Sets the color of the divider
                                      margin: "0 10px", // Optional: Adds some space around the divider
                                    }}
                                  />
                                  {/* right side Rosxod */}
                                  {sanaItem?.cleanNoPercentageIncome ? (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "column",
                                      height: "auto",
                                    }}
                                  >
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
                                            textShadow: "0.5px 0.5px 2px gray",
                                          }}
                                        >
                                          {/* {insertSpaces(item.cleanNoPercentageIncome.netSoftNoProfitData)|| "нет информации"} */}
                                          {sanaItem.cleanNoPercentageIncome?.netSoftNoProfitData
                                            ? insertSpaces(
                                                Math.round(
                                                  sanaItem.cleanNoPercentageIncome.netSoftNoProfitData / 1000
                                                )
                                              )
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
                                            color:
                                              sanaItem.cleanNoPercentageIncome?.netSoftNoPercentageData <= 100
                                                ? Colors.red
                                                : Colors.green_dark,
                                            fontSize: "24px",
                                            padding: "0px",
                                            transform:
                                              sanaItem.cleanNoPercentageIncome?.netSoftNoPercentageData <= 100
                                                ? "rotate(180deg)"
                                                : "rotate(0deg)",
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
                                          {sanaItem.cleanNoPercentageIncome?.netSoftNoPercentageData ||
                                            "нет информации"}
                                          %
                                        </Typography>
                                      </Box>
                                    </Box>
                                  </Box>
                                    ) : (
                                        <Typography sx={{ fontWeight: "800", textTransform: "uppercase", color: "red" }}>
                                          No Data Available
                                        </Typography>
                                      )}
                                </Box>
                              </Box>
                            </Grid>
                            {/* third number div */}
                            <Grid item xs={5} md={5} lg={4} sx={{ padding: "5px" }}>
                            {sanaItem?.cirProfir ? (
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
                                  boxShadow:
                                    "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                                  WebkitBoxShadow:
                                    "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                                  MozBoxShadow:
                                    "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
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
                                    textShadow: "0.5px 0.5px 2px gray",
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
                                        textShadow: "4px 4px 4px gray",
                                      }}
                                    >
                                      {Math.round(
                                        sanaItem.cirProfir?.cirPercentageDate
                                      ) || "нет информации"}{" "}
                                      %
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                            ) : (
                                    <Typography sx={{ fontWeight: "800", textTransform: "uppercase", color: "red" }}>
                                      No Data Available
                                    </Typography>
                                  )}
                            </Grid>
          
                        </Grid>
                        {/*<==== second grid div ====>*/}
                        <Grid container sx={{ width: "100%", height: "250px" }}>
                        {/* left side */}
                        <Grid item xs={5} md={5} lg={6} sx={{ padding: "5px" }}>
                        {sanaItem?.interestIncome ? (
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
                              boxShadow:
                                "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                              WebkitBoxShadow:
                                "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                              MozBoxShadow:
                                "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
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
                              {t("percentageincome")}{" "}
                            </Typography>
                            <Box sx={{ width: "100%", height: "auto" }}>
                              <NewLineChart
                                planData={sanaItem.interestIncome?.planData || []}
                                factData={sanaItem.interestIncome?.factData || []}
                              />
                            </Box>
                          </Box>
                        ) : (
                                    <Typography sx={{ fontWeight: "800", textTransform: "uppercase", color: "red" }}>
                                      No Data Available
                                    </Typography>
                                  )}
                        </Grid>
                        {/* right side */}
                        <Grid item xs={7} md={7} lg={6} sx={{ padding: "5px" }}>
                        {sanaItem?.nointerestIncome ? (
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
                              boxShadow:
                                "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                              WebkitBoxShadow:
                                "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                              MozBoxShadow:
                                "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
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
                              {t("nopercentageincome")}
                            </Typography>
                            <Box sx={{ width: "100%", height: "auto" }}>
                              <NoIncomeLineChart
                                planData={sanaItem.nointerestIncome?.planData || []}
                                factData={sanaItem.nointerestIncome?.factData || []}
                              />
                            </Box>
                          </Box>
                        ) : (
                                    <Typography sx={{ fontWeight: "800", textTransform: "uppercase", color: "red" }}>
                                      No Data Available
                                    </Typography>
                                  )}
                        </Grid>
                        </Grid>
                        {/*<==== third grid div ====>*/}
                        <Grid container sx={{ width: "100%", height: "400px" }}>
                        {/* left side of third div */}
                        <Grid
                          item
                          xs={6}
                          md={6}
                          lg={6}
                          sx={{ padding: "5px", height: "auto" }}
                        >
                            {sanaItem?.interestCost ? (
                          <Box
                            sx={{
                              bgcolor: Colors.white,
                              borderRadius: "5px",
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              flexDirection: "column",
                              gap: "10px",
                              padding: "5px",
                              boxShadow:
                                "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                              WebkitBoxShadow:
                                "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                              MozBoxShadow:
                                "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
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
                              {t("costpercentage")}
                            </Typography>
                            {/* Bottom side box of third div */}
                            <Box sx={{ width: "100%", height: "350px" }}>
                              <HorizontalCostBarChart
                                planData={sanaItem.interestCost?.planData || []}
                                factData={sanaItem.interestCost?.factData || []}
                              />
                            </Box>
                          </Box>
                        ) : (
                                    <Typography sx={{ fontWeight: "800", textTransform: "uppercase", color: "red" }}>
                                      No Data Available
                                    </Typography>
                                  )}
                        </Grid>
                        {/* right side of third div */}
                        <Grid item xs={6} md={6} lg={6} sx={{ padding: "5px" }}>
                        {sanaItem?.nointerestCost ? (
                          <Box
                            sx={{
                              bgcolor: Colors.white,
                              borderRadius: "5px",
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              flexDirection: "column",
                              gap: "10px",
                              padding: "5px",
                              boxShadow:
                                "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                              WebkitBoxShadow:
                                "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                              MozBoxShadow:
                                "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
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
                              {t("costnopercentage")}
                            </Typography>
                            {/* Bottom side box of third div */}
                            <Box sx={{ width: "100%", height: "350px" }}>
                              <OpenHorizontalBarChart
                                planData={sanaItem.nointerestCost?.planData || []}
                                factData={sanaItem.nointerestCost?.factData || []}
                              />
                            </Box>
                          </Box>
                        ) : (
                                    <Typography sx={{ fontWeight: "800", textTransform: "uppercase", color: "red" }}>
                                      No Data Available
                                    </Typography>
                                  )}
                        </Grid>
                        </Grid>
                        {/*<==== fouth grid div ====>*/}
                        <Grid container sx={{ width: "100%", height: "260px" }}>
                        {/* left side */}
                        <Grid item xs={5} md={5} lg={5} sx={{ padding: "5px" }}>
                          {sanaItem?.operatingExpenses ? (
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
                                boxShadow:
                                  "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                                WebkitBoxShadow:
                                  "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                                MozBoxShadow:
                                  "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
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
                                {t("operatsioncost")}
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-evenly",
                                }}
                              >
                                {/* Left side of text box */}
                                <OpenDoughnutChart
                                  chartData={sanaItem.operatingExpenses?.factData || []}
                                />
                                {/* Right side of text box */}
                              </Box>
                            </Box>
                            ) : (
                                <Typography sx={{ fontWeight: "800", textTransform: "uppercase", color: "red" }}>
                                    No Data Available
                                </Typography>
                              )}
                        </Grid>
                        {/* right side */}
                        <Grid item xs={7} md={7} lg={7} sx={{ padding: "5px" }}>
                        {sanaItem?.reserveData ? (
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
                              boxShadow:
                                "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                              WebkitBoxShadow:
                                "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
                              MozBoxShadow:
                                "0px -1px 12px 1px rgba(34, 60, 80, 0.2)",
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
                              {t("reserve")}
                            </Typography>
                            <Box sx={{ width: "100%", height: "auto" }}>
                              <OpenVerticalGroupBarChart
                                planData={sanaItem.reserveData?.planData || []}
                                factData={sanaItem.reserveData?.factData || []}
                              />
                            </Box>
                          </Box>
                          ) : (
                              <Typography sx={{ fontWeight: "800", textTransform: "uppercase", color: "red" }}>
                                  No Data Available
                              </Typography>
                            )}
                        </Grid>
                        </Grid>
                        </Box>
                        ))}
          
          
                      </Box>
                    ))}


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
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "5px",
                      padding: "10px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "30px",
                      bgcolor: Colors.gray_footer,
                      position: "relative",
                      "&:hover .hover-button": {
                        opacity: 1, // Show button when hovering over the box
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        textAlign: "start",
                        fontWeight: "800",
                        fontSize: { xs: "12px", md: "20px" },
                      }}
                    >
                      {t("secontText")}
                    </Typography>
    
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
                                млрд.<br/> сўм.экв
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
                              <StackedBartchart foreignCurrencyPercentage={item.bankAssets.foreignCurrencyPercentage} nationalCurrencyPercentage={item.bankAssets.nationalCurrencyPercentage}/>  
                          </Box>
                          {/* right side Texts */}
                          <Box sx={{}}>
                            <Typography sx={{fontSize:"12px",color:Colors.gray,fontStyle: "italic",textAlign:"left" }}>шу жумладан:</Typography>
                              {/* top side light blue */}
                            <Box sx={{display:"flex",flexDirection:"column"}}>
                                <Box>
                                  <Typography sx={{fontSize:"12px",color:Colors.dark,fontWeight:"bold",textAlign:"left",lineHeight:"1"}}>ХОРИЖИЙ ВАЛЮТАДА</Typography>
                                  <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:"10px"}}>
                                    <Typography sx={{color:"rgba(76, 0, 153, 0.7)",fontSize:"40px",fontWeight:"bold",width:"auto",lineHeight:"1.1",}}>{insertSpaces(item.bankAssets.foreignCurrency)}</Typography>
                                    <Typography sx={{color:Colors.gray,fontSize:"12px",width:"50px", wordWrap: "break-word",textAlign: "start",lineHeight:"1",}}>млрд <br/> сўм.экв</Typography>
                                  </Box>
                                </Box>
                            </Box>
                            {/* bottom side dark_blue national  */}
                            <Box sx={{display:"flex",flexDirection:"column"}}>
                                <Box>
                                  <Typography sx={{fontSize:"12px",color:Colors.dark,fontWeight:"bold",textAlign:"left",lineHeight:"1"}}>МИЛЛИЙ ВАЛЮТАДА</Typography>
                                  <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:"10px"}}>
                                    <Typography sx={{color:"rgba(0, 77, 77, 0.7)",fontSize:"40px",fontWeight:"bold",width:"auto",lineHeight:"1.1",}}>{insertSpaces(item.bankAssets.nationalCurrency)}</Typography>
                                    <Typography sx={{color:Colors.gray,fontSize:"12px",width:"50px", wordWrap: "break-word",textAlign: "start",lineHeight:"1",}}>млрд <br/> сўм.экв</Typography>
                                  </Box>
                                </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      {/* Button at the bottom-right */}
                      <Box
                        className="hover-button"
                        sx={{
                          textAlign: "end",
                          position: "absolute",
                          bottom: "10px",
                          right: "10px",
                          opacity: 0, // Initially hidden
                          transition: "opacity 300ms ease", // Smooth transition for hover
                        }}
                      >
                        <Button
                          variant="contained"
                          size="medium"
                          onClick={handleOpenAuthModal}
                        >
                          <Typography
                            sx={{
                              color: Colors.white,
                              fontWeight: "800",
                              textTransform: "uppercase",
                            }}
                          >
                            {t("infobutton")}
                          </Typography>
                        </Button>
                      </Box>
                    </Box>
                  </Grid>


<StackedBartchart foreignCurrencyPercentage={item.bankAssets.foreignCurrencyPercentage} nationalCurrencyPercentage={item.bankAssets.nationalCurrencyPercentage}/>  

<HolePieChart doughtnutData={item.bankCapitals.doughtnutCapitalData}/>  

<PieChartMainChart piechartData={item.bankObligations.pieChartDatas}/> 



     {/* top side light blue */}
     <Box sx={{display:"flex",flexDirection:"column"}}>
     <Box>
       <Typography sx={{fontSize:"12px",color:Colors.dark,fontWeight:"bold",textAlign:"left",lineHeight:"1",textTransform:"uppercase"}}>Kreditlar</Typography>
       <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:"10px"}}>
         <Typography sx={{color:"rgba(0, 129, 0, 0.7)",fontSize:"32px",fontWeight:"bold",width:"auto",lineHeight:"1.1",}}>{insertSpaces(item.bankObligations.foreignCurrency)}</Typography>
         <Typography sx={{color:Colors.gray,fontSize:"12px",width:"50px", wordWrap: "break-word",textAlign: "start",lineHeight:"1",}}>млрд <br/> сўм.экв</Typography>
       </Box>
     </Box>
 </Box>
 {/* bottom side dark_blue national  */}
 <Box sx={{display:"flex",flexDirection:"column"}}>
     <Box>
       <Typography sx={{fontSize:"12px",color:Colors.dark,fontWeight:"bold",textAlign:"left",lineHeight:"1",textTransform:"uppercase"}}>Depozitlar</Typography>
       <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:"10px"}}>
         <Typography sx={{color:"rgba(139, 0, 0, 0.7)",fontSize:"32px",fontWeight:"bold",width:"auto",lineHeight:"1.1",}}>{insertSpaces(item.bankObligations.nationalCurrency)}</Typography>
         <Typography sx={{color:Colors.gray,fontSize:"12px",width:"50px", wordWrap: "break-word",textAlign: "start",lineHeight:"1",}}>млрд <br/> сўм.экв</Typography>
       </Box>
     </Box>
 </Box>
 <Box sx={{display:"flex",flexDirection:"column"}}>
     <Box>
       <Typography sx={{fontSize:"12px",color:Colors.dark,fontWeight:"bold",textAlign:"left",lineHeight:"1",textTransform:"uppercase"}}>Investitsiyalar</Typography>
       <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:"10px"}}>
         <Typography sx={{color:"rgba(139, 0, 0, 0.7)",fontSize:"32px",fontWeight:"bold",width:"auto",lineHeight:"1.1",}}>{insertSpaces(item.bankObligations.nationalCurrency)}</Typography>
         <Typography sx={{color:Colors.gray,fontSize:"12px",width:"50px", wordWrap: "break-word",textAlign: "start",lineHeight:"1",}}>млрд <br/> сўм.экв</Typography>
       </Box>
     </Box>
 </Box>
 <Box sx={{display:"flex",flexDirection:"column"}}>
     <Box>
       <Typography sx={{fontSize:"12px",color:Colors.dark,fontWeight:"bold",textAlign:"left",lineHeight:"1",textTransform:"uppercase"}}>Boshqalar</Typography>
       <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:"10px"}}>
         <Typography sx={{color:"rgba(139, 0, 0, 0.7)",fontSize:"32px",fontWeight:"bold",width:"auto",lineHeight:"1.1",}}>{insertSpaces(item.bankObligations.nationalCurrency)}</Typography>
         <Typography sx={{color:Colors.gray,fontSize:"12px",width:"50px", wordWrap: "break-word",textAlign: "start",lineHeight:"1",}}>млрд <br/> сўм.экв</Typography>
       </Box>
     </Box>
 </Box>

<Typography sx={{fontSize:"12px",color:Colors.gray,fontStyle: "italic",textAlign:"left" }}>шу жумладан:</Typography>


<Box sx={{display:"flex",flexDirection:"column"}}>
<Box>
  <Typography sx={{fontSize:"12px",color:Colors.dark,fontWeight:"bold",textAlign:"left",lineHeight:"1",textTransform:"uppercase"}}>Kreditlar</Typography>
  <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:"10px"}}>
    <Typography sx={{color:"rgba(0, 129, 0, 0.7)",fontSize:"32px",fontWeight:"bold",width:"auto",lineHeight:"1.1",}}>{insertSpaces(item.bankObligations.foreignCurrency)}</Typography>
    <Typography sx={{color:Colors.gray,fontSize:"12px",width:"50px", wordWrap: "break-word",textAlign: "start",lineHeight:"1",}}>млрд <br/> сўм.экв</Typography>
  </Box>
</Box>
{/* bottom side dark_blue national  */}
<Box sx={{display:"flex",flexDirection:"column"}}>
  <Box>
    <Typography sx={{fontSize:"12px",color:Colors.dark,fontWeight:"bold",textAlign:"left",lineHeight:"1",textTransform:"uppercase"}}>Depozitlar</Typography>
    <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:"10px"}}>
      <Typography sx={{color:"rgba(139, 0, 0, 0.7)",fontSize:"32px",fontWeight:"bold",width:"auto",lineHeight:"1.1",}}>{insertSpaces(item.bankObligations.nationalCurrency)}</Typography>
      <Typography sx={{color:Colors.gray,fontSize:"12px",width:"50px", wordWrap: "break-word",textAlign: "start",lineHeight:"1",}}>млрд <br/> сўм.экв</Typography>
    </Box>
  </Box>
</Box>
<Box sx={{display:"flex",flexDirection:"column"}}>
  <Box>
    <Typography sx={{fontSize:"12px",color:Colors.dark,fontWeight:"bold",textAlign:"left",lineHeight:"1",textTransform:"uppercase"}}>Investitsiyalar</Typography>
    <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:"10px"}}>
      <Typography sx={{color:"rgba(139, 0, 0, 0.7)",fontSize:"32px",fontWeight:"bold",width:"auto",lineHeight:"1.1",}}>{insertSpaces(item.bankObligations.nationalCurrency)}</Typography>
      <Typography sx={{color:Colors.gray,fontSize:"12px",width:"50px", wordWrap: "break-word",textAlign: "start",lineHeight:"1",}}>млрд <br/> сўм.экв</Typography>
    </Box>
  </Box>
</Box>
<Box sx={{display:"flex",flexDirection:"column"}}>
  <Box>
    <Typography sx={{fontSize:"12px",color:Colors.dark,fontWeight:"bold",textAlign:"left",lineHeight:"1",textTransform:"uppercase"}}>Boshqalar</Typography>
    <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:"10px"}}>
      <Typography sx={{color:"rgba(139, 0, 0, 0.7)",fontSize:"32px",fontWeight:"bold",width:"auto",lineHeight:"1.1",}}>{insertSpaces(item.bankObligations.nationalCurrency)}</Typography>
      <Typography sx={{color:Colors.gray,fontSize:"12px",width:"50px", wordWrap: "break-word",textAlign: "start",lineHeight:"1",}}>млрд <br/> сўм.экв</Typography>
    </Box>
  </Box>
</Box>
</Box>

<Box sx={{}}>
<Typography sx={{fontSize:"12px",color:Colors.gray,fontStyle: "italic",textAlign:"left" }}>шу жумладан:</Typography>
      {/* top side light blue */}

</Box>


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
          <Box sx={{ display:"flex",alignItems:"center" ,width:"50%",height:"100%",}} >
              <HolePieChart holeData={item.bankAssets.pieChartDatas}/>  
              {/* <PieChartMainChart piechartData={item.bankAssets.pieChartDatas}/>   */}
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
                  {/* 31203 TAQSIMLANMAGAN FOYDA  */}
                  <Typography sx={{fontSize:"12px",color:Colors.dark,fontWeight:"bold",textAlign:"left",lineHeight:"1",textTransform:"uppercase"}}> {t("retainedEarnings")}</Typography>
                  <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:"10px"}}>
                    <Typography sx={{color:"rgba(0, 77, 77, 0.7)",fontSize:"32px",fontWeight:"bold",width:"auto",lineHeight:"1.1",}}>{insertSpaces(item.bankCapitals.retainedEarnings)}</Typography>
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
                  <Typography sx={{fontSize:"12px",color:Colors.dark,fontWeight:"bold",textAlign:"left",lineHeight:"1",textTransform:"uppercase"}}>{t("reserveFundText")}</Typography>
                  <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:"10px"}}>
                    <Typography sx={{color:"rgba(76, 0, 153, 0.7)",fontSize:"32px",fontWeight:"bold",width:"auto",lineHeight:"1.1",}}>{insertSpaces(item.bankCapitals.reserveFund)}</Typography>
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
                  <Typography  sx={{fontSize:"12px",color:Colors.dark,fontWeight:"bold",textAlign:"left",lineHeight:"1",textTransform:"uppercase"}}>{t("percentageIncomeText")}</Typography>
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
<Typography>No data available</Typography> 
)}





{chooseData.flatMap ((item,index) => (
  item.filter(sanaItem => sanaItem.calenDate === formattedDate).map((sanaItem,indx) => (
    <Grid
      container
      sx={{ margin: "auto" ,}}
      direction="row"
      width={"100%"}
      key={`${index}-${idx}`}
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
            <Box sx={{ display:"flex",alignItems:"center" ,width:"50%",height:"100%",}} >
                <HolePieChart holeData={item.bankAssets.pieChartDatas}/>  
                {/* <PieChartMainChart piechartData={item.bankAssets.pieChartDatas}/>   */}
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
                    {/* 31203 TAQSIMLANMAGAN FOYDA  */}
                    <Typography sx={{fontSize:"12px",color:Colors.dark,fontWeight:"bold",textAlign:"left",lineHeight:"1",textTransform:"uppercase"}}> {t("retainedEarnings")}</Typography>
                    <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:"10px"}}>
                      <Typography sx={{color:"rgba(0, 77, 77, 0.7)",fontSize:"32px",fontWeight:"bold",width:"auto",lineHeight:"1.1",}}>{insertSpaces(item.bankCapitals.retainedEarnings)}</Typography>
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
                    <Typography sx={{fontSize:"12px",color:Colors.dark,fontWeight:"bold",textAlign:"left",lineHeight:"1",textTransform:"uppercase"}}>{t("reserveFundText")}</Typography>
                    <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:"10px"}}>
                      <Typography sx={{color:"rgba(76, 0, 153, 0.7)",fontSize:"32px",fontWeight:"bold",width:"auto",lineHeight:"1.1",}}>{insertSpaces(item.bankCapitals.reserveFund)}</Typography>
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
                    <Typography  sx={{fontSize:"12px",color:Colors.dark,fontWeight:"bold",textAlign:"left",lineHeight:"1",textTransform:"uppercase"}}>{t("percentageIncomeText")}</Typography>
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
: (
<Typography>No data available</Typography> // Handle case where chooseData is empty or not an array
)}

<Autocomplete
options={top128Filials}
sx={{ width: "90%" }}
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