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

 {/* <TextField value={startworktime} onChange={e => {startworktimechange(e.target.value)}} variant="outlined" label="StartTime"></TextField>
              <TextField value={endworktime} onChange={e => {endworktimechange(e.target.value)}} variant="outlined" label="EndTime"></TextField> */}



              {items && items.length > 0 ? (
                <Reorder.Group
                  axis="y"
                  onReorder={handleReorder}
                  values={items}
                  as="div"
                >
                  {items.map((item, index) => (
                    <Reorder.Item key={item.id} value={item} as="div">
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                          borderRadius: "5px",
                          boxShadow:
                            "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
                          marginBottom: "5px",
                          paddingY: "5px",
                          paddingX: "4px",
                          backgroundColor: overlappingIds.includes(item.id)
                            ? "#ffcccc"
                            : "white", // Highlight if overlapping
                        }}
                      >
                        <Grid container>
                          {/* <==== INDEX ====> */}
                          <Grid
                            item
                            xs={0.3}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography>{index + 1}</Typography>
                          </Grid>
                          {/* <==== WORK TITLE ====> */}
                          <Grid
                            item
                            xs={3.3}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "start",
                              textAlign: "start",
                            }}
                          >
                            <Typography
                              sx={{
                                height: "auto",
                                overflowWrap: "break-word",
                                wordBreak: "break-all",
                                lineHeight: "1.1",
                                paddingX: "4px",
                              }}
                            >
                              {item.title}
                            </Typography>
                          </Grid>
                          {/* <==== WORKING TIME =====> */}
                          <Grid
                            item
                            xs={1}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography
                              sx={{
                                height: "auto",
                                overflowWrap: "break-word",
                                wordBreak: "break-all",
                                fontSize: "16px",
                              }}
                            >
                              {item.workTime}
                            </Typography>
                          </Grid>
                          {/* <==== START TIME ====> */}
                          <Grid
                            item
                            xs={1}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography
                              sx={{
                                height: "auto",
                                overflowWrap: "break-word",
                                wordBreak: "break-all",
                              }}
                            >
                              {item.startTime}
                            </Typography>
                          </Grid>
                          {/* <==== END TIME ====> */}
                          <Grid
                            item
                            xs={1}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography
                              sx={{
                                height: "auto",
                                overflowWrap: "break-word",
                                wordBreak: "break-all",
                              }}
                            >
                              {item.endTime}
                            </Typography>
                          </Grid>
                          {/* <==== WORK TYPE ====> */}
                          <Grid
                            item
                            xs={1.5}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography
                              sx={{
                                height: "auto",
                                overflowWrap: "break-word",
                                wordBreak: "break-all",
                              }}
                            >
                              {item.workType === "regular"
                                ? "регулярная"
                                : "разовая"}
                            </Typography>
                          </Grid>
                          {/* <==== WORK HISTORY ====> */}
                          <Grid
                            item
                            xs={1.2}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography
                              sx={{
                                height: "auto",
                                overflowWrap: "break-word",
                                wordBreak: "break-all",
                              }}
                            >
                              {item.workingHistory === "yes" ? "да" : "нет"}
                            </Typography>
                          </Grid>
                          {/* <==== WORK COMMENT ====> */}
                          <Grid
                            item
                            xs={2}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography
                              sx={{
                                height: "auto",
                                overflowWrap: "break-word",
                                wordBreak: "break-all",
                                lineHeight: "1.1",
                                paddingX: "4px",
                              }}
                            >
                              {item.workingComment}
                            </Typography>
                          </Grid>
                          {/* <==== ACTIONS ====> */}
                          <Grid
                            item
                            xs={0.6}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {/* Edit Button */}
                            <Button
                              variant="text"
                              sx={{
                                minWidth: "auto",
                                padding: "0px",
                                margin: "0px",
                              }}
                              onClick={() => handleOpenEditDialog(item)}
                            >
                              <ModeEditOutlineIcon
                                sx={{
                                  color: Colors.nbu,
                                  width: "22px",
                                  height: "22px",
                                }}
                              />
                            </Button>
                            {/* Delete Button */}
                            <Button
                              variant="text"
                              sx={{
                                minWidth: "auto",
                                padding: "0px",
                                margin: "0px",
                                marginLeft: "5px",
                              }}
                              onClick={() => handleDelete(item.id)}
                            >
                              <DeleteForeverIcon
                                sx={{
                                  color: "red",
                                  width: "22px",
                                  height: "22px",
                                }}
                              />
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
              ) : (
                <Typography sx={{ textAlign: "center", margin: "20px" }}>
                  {t("find_row")}
                </Typography>
              )}



              // ready code //
              import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  Snackbar,
  Alert,
  Modal ,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Colors } from "../../styles/theme"; // Ensure this path is correct
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers";
import { Reorder, color } from "framer-motion";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import GetAppIcon from "@mui/icons-material/GetApp";
import SendIcon from "@mui/icons-material/Send";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid"; // Importing uuid
import {REQUESTS} from "../../api/requests";
// import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import PriorityHighTwoToneIcon from '@mui/icons-material/PriorityHighTwoTone';
import { keyframes } from '@emotion/react';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const KpiDailiyWorkTable = () => {
  const { t } = useTranslation();

  // Dialog States
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openNoticeModal, setOpenNoticeModal] = useState(false);

  // Add Form States
  const [addTitle, setAddTitle] = useState("");
  const [addWorkDuration, setAddWorkDuration] = useState(dayjs("00:00", "HH:mm"));
  const [addWorkType, setAddWorkType] = useState("");
  const [addWorkingHistory, setAddWorkingHistory] = useState("");
  const [addWorkingComment, setAddWorkingComment] = useState("");
  const [addStartTime, setAddStartTime] = useState(dayjs("09:00", "HH:mm"));
  const [addEndTime, setAddEndTime] = useState(dayjs("09:00", "HH:mm"));
  const [totalWorkingTime, setTotalWorkingTime] = useState("0h 0m");

  // Edit Form States
  const [editItemId, setEditItemId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editWorkDuration, setEditWorkDuration] = useState(dayjs("00:00", "HH:mm"));
  const [editWorkType, setEditWorkType] = useState("");
  const [editWorkingHistory, setEditWorkingHistory] = useState("");
  const [editWorkingComment, setEditWorkingComment] = useState("");
  const [editStartTime, setEditStartTime] = useState(dayjs("09:00", "HH:mm"));
  const [editEndTime, setEditEndTime] = useState(dayjs("09:00", "HH:mm"));

  // Items and Date States
  const [items, setItems] = useState([]);
  const [userData, setUserData] = useState({});
  const [selectDate, setSelectDate] = useState(dayjs());
  const formattedDate = dayjs(selectDate).format("DD.MM.YYYY");
  const [formattedDateForGet, setFormattedDateForGet] = useState(dayjs(selectDate).format("YYYY-MM-DD"));

  const [defaultStartTime, setDefaultStartTime] = useState(dayjs("09:00", "HH:mm"));
  const tableNumber = userData.table_number ;
  const [combinedNew,setCombinedNew] = useState([]);
  
  

    // Define mapWorkType at the top level
    const mapWorkType = (translatedValue) => {
      switch (translatedValue) {
        case t("working_type_value_one"):
          return "onetime";
        case t("working_type_value_two"):
          return "regular";
        default:
          return "";
      }
    };


// <=== NOITCE MODAL COLOR ===> //
  const waveAnimation = keyframes`
  0%, 100% {
    box-shadow: 0 0 0 0px rgba(255, 193, 7, 0.5), /* Increased opacity to 0.5 */
                0 0 0 10px rgba(255, 193, 7, 0.5), /* Increased opacity to 0.5 */
                0 0 0 20px rgba(255, 193, 7, 0.5); /* Increased opacity to 0.5 */
  }
  50% {
    box-shadow: 0 0 0 10px rgba(255, 193, 7, 0.4), /* Increased opacity to 0.4 */
                0 0 0 20px rgba(255, 193, 7, 0.4), /* Increased opacity to 0.4 */
                0 0 0 30px rgba(255, 193, 7, 0.3); /* Increased opacity to 0.3 */
  }
`;

  // Snackbar State
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Overlapping Items State
  const [overlappingIds, setOverlappingIds] = useState([]);

  // Ref for Previous Items (used in Reorder)
  const prevItemsRef = useRef([]);

  // Helper Functions
  // const parseWorkTime = (timeValue) => {
  //   if (!timeValue || !timeValue.isValid()) return 0;
  //   const hours = timeValue.hour();
  //   const minutes = timeValue.minute();
  //   return hours * 60 + minutes;
  // };

  const formatTime = (dayjsObj) => {
    return dayjsObj.format("HH:mm");
  };

  const calculateEndTime = (start, totalMinutes) => {
    const startMoment = dayjs(start, "HH:mm");
    const endMoment = startMoment.add(totalMinutes, t("minutes"));
    return endMoment;
  };

  const calculateWorkingTime = (totalMinutes) => {
    if (totalMinutes <= 0) {
      return "0h 0m";
    }
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Fetch User Data on Mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
          const response = await REQUESTS.user.getUser();
          const propsdata = response.data[0];
          setUserData(propsdata);


      } catch (error) {
          console.error("Error fetching user data:", error);
      }
  };
    
    fetchUserData();
  }, []);

 

  // Check for Time Overlaps
  const findOverlappingItems = (itemsList) => {
    const overlappingIdsSet = new Set();
    // No need to sort since times are recalculated
    for (let i = 0; i < itemsList.length - 1; i++) {
      const currentEnd = dayjs(itemsList[i].endTime, "HH:mm");
      const nextStart = dayjs(itemsList[i + 1].startTime, "HH:mm");
      if (currentEnd.isAfter(nextStart)) {
        overlappingIdsSet.add(itemsList[i].id);
        overlappingIdsSet.add(itemsList[i + 1].id);
      }
    }
    return Array.from(overlappingIdsSet);
  };

  // Function to Recalculate Times
  const recalculateTimes = (itemsList) => {
    let currentTime = defaultStartTime;
    return itemsList.map((item) => {
      const workTimeMinutes = item.workHours * 60 + item.workMinutes;
      const startTime = currentTime;
      const endTime = currentTime.add(workTimeMinutes, "minute");
      const newItem = {
        ...item,
        startTime: formatTime(startTime),
        endTime: formatTime(endTime),
      };
      currentTime = endTime;
      return newItem;
    });
  };

  // Handle Reorder with Time Recalculation
  const handleReorder = (reorderedItems) => {
    // Recalculate times based on new order
    const updatedItems = recalculateTimes(reorderedItems);

    // Update state and localStorage
    setItems(updatedItems);
    localStorage.setItem("workItems", JSON.stringify(updatedItems));
    prevItemsRef.current = updatedItems;

    showSnackbar(t("delete_successfully"), "success");

    // Check for overlaps after reordering
    const overlapping = findOverlappingItems(updatedItems);
    if (overlapping.length > 0) {
      showSnackbar(
        t("time_operlaps_error_text"),
        "warning"
      );
      setOverlappingIds(overlapping);
    } else {
      setOverlappingIds([]);
    }
  };

  // Handle Add Submit
  const handleAddSubmit = async (e) => {
    e.preventDefault();

    // Validate Required Fields
    if (
      !addTitle ||
      !addWorkType ||
      !addWorkingHistory ||
      !addWorkDuration 
    ) {
      showSnackbar(t("need_empty_space"), "error");
      return;
    }

    // Validate Time Values
    if (!addWorkDuration.isValid()) {
      showSnackbar(t("error_time_amount"), "error");
      return;
    }

    const workHours = addWorkDuration.hour();
    const workMinutes = addWorkDuration.minute();
    const workTimeMinutes = workHours * 60 + workMinutes;

    if (workTimeMinutes <= 0) {
      showSnackbar(t("check_workinghours"), "error");
      return;
    }

    // Generate a unique ID for the new item
    const uniqueId = uuidv4();

    const mapWorkType = (translatedValue) => {
      switch (translatedValue) {
        case t("working_type_value_one"):
          return "onetime";
        case t("working_type_value_two"):
          return "regular";
        default:
          return "";
      }
    };

    const newItem = {
      id: uniqueId, // Assign the unique ID
      title: addTitle,
      workHours: workHours,
      workMinutes: workMinutes,
      workTime: calculateWorkingTime(workTimeMinutes),
      workType: addWorkType,
      workingHistory: addWorkingHistory,
      workingComment: addWorkingComment,
      date: formattedDate,
    };

    try {
      // Add the new item locally
      const updatedItems = [...items, newItem];

      // Recalculate times
      const recalculatedItems = recalculateTimes(updatedItems);

      setItems(recalculatedItems);
      showSnackbar(t("add_newrow_success"), "success");
      handleCloseAddDialog();
      prevItemsRef.current = recalculatedItems;

      // Save to local storage
      localStorage.setItem("workItems", JSON.stringify(recalculatedItems));
    } catch (error) {
      console.error("Error adding item:", error);
      showSnackbar(error.message || t("add_newrow_error"), "error");
    }
  };

  // Handle Edit Submit
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    // Validate Required Fields
    if (
      !editTitle ||
      !editWorkType ||
      !editWorkingHistory ||
      !editWorkDuration
    ) {
      showSnackbar( t("need_empty_space"), "error");
      return;
    }

    // Validate Time Values
    if (!editWorkDuration.isValid()) {
      showSnackbar( t("enter_time_error"), "error");
      return;
    }

    const workHours = editWorkDuration.hour();
    const workMinutes = editWorkDuration.minute();
    const workTimeMinutes = workHours * 60 + workMinutes;

    if (workTimeMinutes <= 0) {
      showSnackbar( t("enter_error_working_hours"), "error");
      return;
    }

    const editedItem = {
      id: editItemId,
      title: editTitle,
      workHours: workHours,
      workMinutes: workMinutes,
      workTime: calculateWorkingTime(workTimeMinutes),
      workType: editWorkType,
      workingHistory: editWorkingHistory,
      workingComment: editWorkingComment,
      date: formattedDate,
    };

    try {
      // Update the item locally
      const editedItemIndex = items.findIndex((item) => item.id === editItemId);
      let updatedItems = [...items];
      updatedItems[editedItemIndex] = editedItem;

      // Recalculate times
      const recalculatedItems = recalculateTimes(updatedItems);

      setItems(recalculatedItems);
      showSnackbar(t("edit_row_success"), "success");
      handleCloseEditDialog();
      prevItemsRef.current = recalculatedItems;

      // Save to local storage
      localStorage.setItem("workItems", JSON.stringify(recalculatedItems));
    } catch (error) {
      console.error("Error editing item:", error);
      showSnackbar(error.message || t("edit_row_error"), "error");
    }
  };

  // Handle Delete
  const handleDelete = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);

    // Recalculate times
    const recalculatedItems = recalculateTimes(updatedItems);

    setItems(recalculatedItems);
    localStorage.setItem("workItems", JSON.stringify(recalculatedItems));
    showSnackbar(t("delete_successfully"), "info");
    prevItemsRef.current = recalculatedItems;
  };

 // Helper function to merge items
// function mergeItems(existingItems, fetchedItems) {
//   const mergedItemsMap = {};

//   // Add fetched items to the map
//   fetchedItems.forEach(item => {
//     mergedItemsMap[item.id] = item;
//   });

//   // Add existing items, overwriting fetched items if IDs are the same
//   existingItems.forEach(item => {
//     mergedItemsMap[item.id] = item;
//   });

//   return Object.values(mergedItemsMap);
// }

function mergeItems(existingItems, fetchedItems) {
  const mergedItemsMap = new Map();

  // Add fetched items, ensuring unique IDs by generating UUIDs where needed
  fetchedItems.forEach((item) => {
    const uniqueId = item.id || uuidv4(); // Generate UUID if `id` is missing
    mergedItemsMap.set(uniqueId, { ...item, id: uniqueId });
  });

  // Add existing items, which can overwrite fetched items if IDs collide
  existingItems.forEach((item) => {
    const uniqueId = item.id || uuidv4();
    mergedItemsMap.set(uniqueId, { ...item, id: uniqueId });
  });

  return Array.from(mergedItemsMap.values());
}

// const handleRefresh = async () => {
//   setItems([]); // Clear the table body
//   try {
//     const formattedDate = dayjs(selectDate).format('DD.MM.YYYY');

//     if (!tableNumber) {
//       throw new Error('Table number is missing.');
//     }

//     // Fetch data from the backend
//     const response = await REQUESTS.data.getData(tableNumber, formattedDate);
//     const fetchedData = response.data.row_datas || [];
//     setCombinedNew(fetchedData)

//     console.log(fetchedData)
//     // const uniqueId = `backend-${item.id}`;
//     // Map the fetched data
//     const mappedFetchedData = fetchedData.map((item) => ({
//       id: item.id ? `backend-${item.id}` : uuidv4(),
//       title: item.title || '',
//       workHours: item.work_hours || 0,
//       workMinutes: item.work_minutes || 0,
//       workTime: item.work_time || '',
//       workType: item.work_type || '',
//       workingHistory: item.working_history || '',
//       workingComment: item.working_comment || '',
//       date: dayjs(item.date).format('DD.MM.YYYY'),
//       startTime: item.start_time || '',
//       endTime: item.end_time || '',
//     }));

//     // Separate existing items by date
//     const itemsForOtherDates = items.filter(item => item.date !== formattedDate);

//     // Merge existing items with fetched items for the selected date
//     const mergedItemsForDate = mergeItems(itemsForOtherDates, mappedFetchedData);

//     // Combine items for other dates with merged items for the selected date
//     const updatedItems = [...itemsForOtherDates, ...mergedItemsForDate];

//     // Recalculate times
//     const recalculatedItems = recalculateTimes(updatedItems);

//     setItems(recalculatedItems);
//     prevItemsRef.current = recalculatedItems;

//     // Update total working time from backend response
//     setTotalWorkingTime(response.data.total_working_hours || '0h 0m');

//     showSnackbar(t('success_data_refresh_text'), 'success');

//     // Check for overlaps
//     const overlapping = findOverlappingItems(recalculatedItems);
//     if (overlapping.length > 0) {
//       setOverlappingIds(overlapping);
//       showSnackbar(t('time_overlaps_error_text'), 'warning');
//     } else {
//       setOverlappingIds([]);
//     }
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     showSnackbar(t('error_fetching_data'), 'error');
//   }
// };


  // Handle Send
  // const handleSend = async () => {

  //   setOpenNoticeModal(false)
    
  //   const itemsForSelectedDate = items.filter(
  //     (item) => item.date === formattedDate
  //   );

  //   const dataToSend = {
  //     tableNumber: tableNumber, 
  //     mainDate: formattedDate,
  //     rowDatas: itemsForSelectedDate,
  //   };
  //   const itemsToSend = items.map(item => ({
  //     ...item,
  //     workType: mapWorkType(item.workType),
  //   }));

  //   console.log("Sending data to backend: ", dataToSend);
  
  //   try {
  //     // Replace with actual API call
  //     await REQUESTS.data.sendAllData(dataToSend);
  //     showSnackbar(t("send_data_success"), "success");
  //   } catch (error) {
  //     console.error("Error sending data:", error);
  //     showSnackbar(t("send_data_error"), "error");
  //   }
  // };

  // Handle Send
// const handleSend = async () => {

//   setOpenNoticeModal(false);

//   const itemsForSelectedDate = items.filter(
//     (item) => item.date === formattedDate
//   );

//   const dataToSend = {
//     tableNumber: tableNumber, 
//     mainDate: formattedDate,
//     totalWorkingHour: totalWorkingTime,
//     rowDatas: itemsForSelectedDate,
//   };

//   // Optional: Stringify the object to ensure logging or debugging in a specific order
//   // console.log("Sending data to backend: ", JSON.stringify({
//   //   tableNumber: tableNumber, 
//   //   mainDate: formattedDate,
//   //   totalWorkingHour: totalWorkingTime,
//   //   rowDatas: itemsForSelectedDate,
//   // }, null, 2)); 


//   try {
//     // Replace with actual API call
//     await REQUESTS.data.sendAllData(dataToSend);
//     showSnackbar(t("send_data_success"), "success");
//   } catch (error) {
//     console.error("Error sending data:", error);
//     showSnackbar(t("send_data_error"), "error");
//   }
//   console.log(dataToSend)
// };


// Handle Send




// const handleSend = async () => {
//   setOpenNoticeModal(false);

//   const formattedDate = dayjs(selectDate).format('DD.MM.YYYY');

//   // Filter items for the selected date
//   const itemsForSelectedDate = items.filter(item => item.date === formattedDate);

//   const dataToSend = {
//     totalWorkingHour: totalWorkingTime,
//     rowDatas: itemsForSelectedDate,
//     tableNumber: tableNumber,
//     mainDate: formattedDate,
//   };

//   console.log('Sending data to backend:', dataToSend);

//   try {
//     if (!tableNumber || !formattedDate) {
//       throw new Error('Table number or formatted date is missing.');
//     }

//     await REQUESTS.data.sendAllData(tableNumber, formattedDate, dataToSend);

//     showSnackbar(t('send_data_success'), 'success');
//   } catch (error) {
//     console.error('Error sending data:', error);

//     if (error.response && error.response.data) {
//       showSnackbar(error.response.data.error || t('send_data_error'), 'error');
//     } else {
//       showSnackbar(t('send_data_error'), 'error');
//     }
//   }
// };


const handleSend = async () => {
  setOpenNoticeModal(false);

  const formattedDateDisplay = dayjs(selectDate).format('DD.MM.YYYY');
  const formattedDateBackend = dayjs(selectDate).format('DD.MM.YYYY');

  // Retrieve the latest items from state
  const currentItems = [...items];

  // Retrieve items from localStorage (if necessary)
  const savedItems = JSON.parse(localStorage.getItem("workItems")) || [];

  // Filter items for the selected date from both state and localStorage
  const itemsForSelectedDateState = currentItems.filter(item => item.date === formattedDate);
  const itemsForSelectedDateLocal = savedItems.filter(item => dayjs(item.date, 'DD.MM.YYYY').isSame(selectDate, 'day'));

  // Combine both arrays without duplicates
  const combinedItemsMap = new Map();

  itemsForSelectedDateState.forEach(item => {
    combinedItemsMap.set(item.id, item);
  });

  itemsForSelectedDateLocal.forEach(item => {
    combinedItemsMap.set(item.id, item);
  });

  const combinedItemsForDate = Array.from(combinedItemsMap.values());

  // Prepare the data object to send
  const dataToSend = {
    totalWorkingHour: totalWorkingTime,
    rowDatas: combinedItemsForDate,
    tableNumber: tableNumber,
    mainDate: formattedDate,
  };

  console.log('Sending data to backend:', dataToSend);

  try {
    // Validate essential data
    if (!tableNumber || !formattedDate) {
      throw new Error('Table number or formatted date is missing.');
    }

    // Send data to backend
    await REQUESTS.data.sendAllData(tableNumber, formattedDate, dataToSend);

    // Provide feedback and reset state
    showSnackbar(t('send_data_success'), 'success');
    // setHasUnsavedChanges(false);
  } catch (error) {
    console.error('Error sending data:', error);

    if (error.response && error.response.data) {
      showSnackbar(error.response.data.error || t('send_data_error'), 'error');
    } else {
      showSnackbar(t('send_data_error'), 'error');
    }
  }
};

  // Handle Refresh
  // const handleRefresh = () => {
  //   const savedItems = JSON.parse(localStorage.getItem("workItems")) || [];
  //   const recalculatedItems = recalculateTimes(savedItems);
  //   setItems(recalculatedItems);
  //   showSnackbar(t("success_data_refresh_text"), "success");
  //   prevItemsRef.current = recalculatedItems;

  //   // Recheck overlaps
  //   const overlapping = findOverlappingItems(recalculatedItems);
  //   if (overlapping.length > 0) {
  //     setOverlappingIds(overlapping);
  //     showSnackbar(
  //       t("time_operlaps_error_text"),
  //       "warning"
  //     );
  //   } else {
  //     setOverlappingIds([]);
  //   }
  // };

  // Handle Refresh
  const handleRefresh = async () => {

    setItems([]); // Clear the table body


    try {
      const formattedDateForGet = dayjs(selectDate).format('DD.MM.YYYY');
  
      if (!tableNumber) {
        throw new Error('Table number is missing.');
      }
  
      // Fetch data from the backend
      const response = await REQUESTS.data.getData(tableNumber, formattedDateForGet);
  
      // Log the response for debugging
      console.log('Response data:', response.data);
  
      // Extract the data from response.data.row_datas
      const fetchedData = response.data.row_datas || [];
  
      // Proceed only if fetchedData is an array
      if (!Array.isArray(fetchedData)) {
        console.error('Fetched data is not an array:', fetchedData);
        return;
      }
  
      // Map the fetched data to match your frontend data structure
      const mappedData = fetchedData.map((item) => ({
        id: item.id || uuidv4(),
        title: item.title || '',
        workHours: item.work_hours || 0,
        workMinutes: item.work_minutes || 0,
        workTime: item.work_time || '',
        workType: item.work_type || '',
        workingHistory: item.working_history || '',
        workingComment: item.working_comment || '',
        date: dayjs(item.date).format('DD.MM.YYYY'),
        startTime: item.start_time || '',
        endTime: item.end_time || '',
      }));
  
      // Recalculate times if necessary
      const recalculatedItems = recalculateTimes(mappedData);
  
      setItems(recalculatedItems);
      prevItemsRef.current = recalculatedItems;
  
      // Update total working time from backend response
      setTotalWorkingTime(response.data.total_working_hours || '0h 0m');
  
      showSnackbar(t('success_data_refresh_text'), 'success');
  
      // Check for overlaps
      const overlapping = findOverlappingItems(recalculatedItems);
      if (overlapping.length > 0) {
        setOverlappingIds(overlapping);
        showSnackbar(t('time_overlaps_error_text'), 'warning');
      } else {
        setOverlappingIds([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      showSnackbar(t('error_fetching_data'), 'error');
    }
  };
  

  // Handle Date Change
 const onChangeDate = (newDate) => {

  setSelectDate(newDate);

};

useEffect(()=> {
  handleRefresh();
},[selectDate])



// Helper function to merge items
function mergeItems(existingItems, fetchedItems) {
  const mergedItemsMap = {};

  // Add fetched items to the map
  fetchedItems.forEach(item => {
    mergedItemsMap[item.id] = item;
  });

  // Add existing items, overwriting fetched items if IDs are the same
  existingItems.forEach(item => {
    mergedItemsMap[item.id] = item;
  });

  return Object.values(mergedItemsMap);
}


  // Load Items from Local Storage on Mount
  
  // const handleRefresh = async () => {
  //   try {
  //     const formattedDateForGet = dayjs(selectDate).format('YYYY-MM-DD');
  
  //     if (!tableNumber) {
  //       throw new Error('Table number is missing.');
  //     }
  
  //     // Fetch data from the backend
  //     const response = await REQUESTS.data.getData(tableNumber, formattedDateForGet);
  //     const fetchedData = response.data.row_datas || [];
  //     console.log(fetchedData)
  
  //     // Map the fetched data
  //     const mappedFetchedData = fetchedData.map((item) => ({
  //       id: item.id || uuidv4(),
  //       title: item.title || '',
  //       workHours: item.work_hours || 0,
  //       workMinutes: item.work_minutes || 0,
  //       workTime: item.work_time || '',
  //       workType: item.work_type || '',
  //       workingHistory: item.working_history || '',
  //       workingComment: item.working_comment || '',
  //       date: dayjs(item.date).format('YYYY-MM-DD'),
  //       startTime: item.start_time || '',
  //       endTime: item.end_time || '',
  //     }));
  
  //     // Merge fetched data with existing items
  //     const existingItems = items.filter(
  //       (item) => !mappedFetchedData.some((fetchedItem) => fetchedItem.id === item.id)
  //     );
  
  //     const updatedItems = [...existingItems, ...mappedFetchedData];
  
  //     // Recalculate times
  //     const recalculatedItems = recalculateTimes(updatedItems);
  
  //     setItems(recalculatedItems);
  //     prevItemsRef.current = recalculatedItems;
  
  //     // Update total working time
  //     setTotalWorkingTime(response.data.total_working_hours || '0h 0m');
  
  //     showSnackbar(t('success_data_refresh_text'), 'success');
  
  //     // Check for overlaps
  //     const overlapping = findOverlappingItems(recalculatedItems);
  //     if (overlapping.length > 0) {
  //       setOverlappingIds(overlapping);
  //       showSnackbar(t('time_overlaps_error_text'), 'warning');
  //     } else {
  //       setOverlappingIds([]);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     showSnackbar(t('error_fetching_data'), 'error');
  //   }
  // };
  
  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("workItems")) || [];
    const recalculatedItems = recalculateTimes(savedItems);
    setItems(recalculatedItems);
    prevItemsRef.current = recalculatedItems;

    // Check for overlaps on initial load
    const overlapping = findOverlappingItems(recalculatedItems);
    if (overlapping.length > 0) {
      setOverlappingIds(overlapping);
      showSnackbar(
        t("warning_error_text"),
        "warning"
      );
    }
  }, []);

  // Synchronize prevItemsRef whenever items change (excluding reorder)
  useEffect(() => {
    // This ensures that prevItemsRef is always up-to-date except during reorder
    // Prevent updating prevItemsRef inside handleReorder
    // Only update after successful add/edit/delete operations
    // Since handleReorder already updates prevItemsRef
    if (!prevItemsRef.current.length || items !== prevItemsRef.current) {
      prevItemsRef.current = items;
    }
  }, [items]);

  // Reset Add Form
  const resetAddForm = () => {
    setAddTitle("");
    setAddWorkDuration(dayjs("00:00", "HH:mm"));
    setAddWorkType("");
    setAddWorkingHistory("");
    setAddWorkingComment("");
    setAddStartTime(dayjs("09:00", "HH:mm"));
    setAddEndTime(dayjs("09:00", "HH:mm"));
  };

  // Reset Edit Form
  const resetEditForm = () => {
    setEditItemId(null);
    setEditTitle("");
    setEditWorkDuration(dayjs("00:00", "HH:mm"));
    setEditWorkType("");
    setEditWorkingHistory("");
    setEditWorkingComment("");
    setEditStartTime(dayjs("09:00", "HH:mm"));
    setEditEndTime(dayjs("09:00", "HH:mm"));
  };

  // Function to Open Notice Modal
const handleOpenNoticeDialog = () => {
  setOpenNoticeModal(true);
};

// Function to Close Notice Modal
const handleCloseNoticeDialog = () => {
  setOpenNoticeModal(false);
};


  // Open Add Dialog
  const handleOpenAddDialog = () => {
    if (items.length > 0) {
      const lastItem = items[items.length - 1];
      setAddStartTime(dayjs(lastItem.endTime, "HH:mm"));
      setAddEndTime(dayjs(lastItem.endTime, "HH:mm").add(addWorkDuration.hour(), "hour").add(addWorkDuration.minute(), "minute"));
    } else {
      setAddStartTime(defaultStartTime);
      setAddEndTime(defaultStartTime);
    }
    setOpenAddDialog(true);
  };

  // Close Add Dialog
  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    resetAddForm();
  };

  // Open Edit Dialog
  const handleOpenEditDialog = (item) => {
    setEditItemId(item.id);
    setEditTitle(item.title);
    setEditWorkDuration(dayjs().hour(item.workHours).minute(item.workMinutes));
    setEditWorkType(item.workType);
    setEditWorkingHistory(item.workingHistory);
    setEditWorkingComment(item.workingComment);
    setEditStartTime(dayjs(item.startTime, "HH:mm"));
    setEditEndTime(dayjs(item.endTime, "HH:mm"));
    setOpenEditDialog(true);
  };

  // Close Edit Dialog
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    resetEditForm();
  };

  // Update End Time when Work Duration changes in Add Dialog
  useEffect(() => {
    if (openAddDialog) {
      const updatedEndTime = addStartTime.add(addWorkDuration.hour(), "hour").add(addWorkDuration.minute(), "minute");
      setAddEndTime(updatedEndTime);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addWorkDuration, addStartTime]);

  // Update End Time when Work Duration changes in Edit Dialog
  useEffect(() => {
    if (openEditDialog) {
      const updatedEndTime = editStartTime.add(editWorkDuration.hour(), "hour").add(editWorkDuration.minute(), "minute");
      setEditEndTime(updatedEndTime);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editWorkDuration, editStartTime]);


  const calculateTotalWorkingTime = () => {
    if (items.length === 0) return "0h 0m"; // No items, no working time
  
    // Get the endTime of the last item
    const lastItem = items[items.length - 1];
    const lastEndTime = dayjs(lastItem.endTime, "HH:mm");
  
    // Get the default start time
    const startTime = dayjs(defaultStartTime, "HH:mm"); // Ensure defaultStartTime is a dayjs object
  
    // Calculate the difference in minutes
    const totalMinutes = lastEndTime.diff(startTime, 'minute');
  
    if (totalMinutes <= 0) return "0h 0m"; // Handle non-positive durations
  
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
  
    return `${hours}h ${minutes}m`;
  };


    // useEffect to Update Total Working Time Whenever Items Change
    useEffect(() => {
      const calculatedTime = calculateTotalWorkingTime();
      setTotalWorkingTime(calculatedTime);
    }, [items, defaultStartTime]);

    // useEffect(() => {
    //   const savedItems = JSON.parse(localStorage.getItem("workItems")) || [];
    //   const recalculatedItems = recalculateTimes(savedItems);
    //   setItems(recalculatedItems);
    //   prevItemsRef.current = recalculatedItems;
    
    //   // Check for overlaps on initial load
    //   const overlapping = findOverlappingItems(recalculatedItems);
    //   if (overlapping.length > 0) {
    //     setOverlappingIds(overlapping);
    //     showSnackbar(
    //       t("warning_error_text"),
    //       "warning"
    //     );
    //   }
    // }, []);

      // Effect to synchronize localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("workItems", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    const uniqueItems = items.map((item) => ({
      ...item,
      id: item.id || uuidv4(), // Generate a UUID if `id` is missing
    }));
    setItems(uniqueItems);
  }, [items]);
    

  return (
    <Box sx={{ width: "100%", height: "auto", padding: "5px" }}>
      {/* <==== HEADER SECTION =====> */}
      <Box
        sx={{
          display: "flex",

          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        {t("daily_work_main_title")}
        </Typography>
        {/* Calendar select date */}
        <Box
          sx={{
            width: { xs: "100px", sm: "200px", md: "200px" },
            bgcolor: "white",
            borderRadius: "5px",
            boxShadow:
              "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              value={selectDate}
              onChange={onChangeDate}
              format="DD.MM.YYYY"
              maxDate={dayjs()}
              renderInput={(params) => <TextField {...params} />}
              sx={{
                ".MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                    display: "none",
                    border: "none",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                    border: "none",
                  },
                  ".MuiInputAdornment-root .MuiIconButton-root": {
                    color: Colors.blue_nbu,
                  },
                  ".MuiInputBase-input": {
                    fontWeight: 700,
                    fontSize: { xs: "12px", sm: "16px" },
                  },
                },
                height: "45px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </LocalizationProvider>
        </Box>
      </Box>
      {/* <==== USER INFORMATION DATA =====> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          marginTop: "10px",
          borderRadius: "5px",
          boxShadow:
            "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
        }}
      >
        {/* <===== USER NAME SECTION =====> */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderBottom: "2px solid #AAAAAE",
            paddingLeft: "5px",
            height: "45px",
          }}
        >
          <Typography
            sx={{
              width: "50%",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            {t("full_name_user")}
          </Typography>
          <Typography
            sx={{
              width: "50%",
              fontWeight: "bold",
              textAlign: "start",
              color: "black",
            }}
          >
            {userData.name || "нет информации"}
          </Typography>
        </Box>
        {/* <===== WORKER FILIAL/BRANCH SECTION =====> */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderBottom: "2px solid #AAAAAE",
            paddingLeft: "5px",
            height: "40px",
          }}
        >
          <Typography sx={{ width: "50%", fontWeight: "bold" }}>
            {t("filial")}
          </Typography>
          <Typography
            sx={{ width: "50%", fontWeight: "normal", textAlign: "start" }}
          >
            {userData.branch || "нет информации"}
          </Typography>
        </Box>

        {/* <=== DIVISION SECTION ====> */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderBottom: "2px solid #AAAAAE",
            paddingLeft: "5px",
            height: "40px",
          }}
        >
          <Typography
            sx={{
              width: "50%",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            {t("group_of_worker")}
          </Typography>
          <Typography
            sx={{ width: "50%", fontWeight: "normal", textAlign: "start" }}
          >
            {userData.division || "нет информации"}
          </Typography>
        </Box>

        {/* <===== DEPARTMENT SECTION =====> */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "2px solid #AAAAAE",
            width: "100%",
            paddingLeft: "5px",
            height: "40px",
          }}
        >
          <Typography
            sx={{
              width: "50%",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            {t("sector_of_worker")}
          </Typography>
          <Typography
            sx={{ width: "50%", fontWeight: "normal", textAlign: "start" }}
          >
            {userData.department || "нет информации"}
          </Typography>
        </Box>

        {/* <==== WORKER POSITION =====>  */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingLeft: "5px",
            height: "40px",
            borderBottom: "2px solid #AAAAAE",
          }}
        >
          <Typography sx={{ width: "50%", fontWeight: "bold" }}>
            {t("positionjob")}
          </Typography>
          <Typography
            sx={{ width: "50%", fontWeight: "normal", textAlign: "start" }}
          >
            {userData.position || "нет информации"}
          </Typography>
        </Box>
        {/* <===== START TIME SELECTION SECTION =====> */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingLeft: "5px",
            height: "40px",
          }}
        >
          <Typography
            sx={{
              width: "50%",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            {t("default_startTime")}
          </Typography>
          {/* <=== START TIME DISPLAY ====> */}
          <Typography
            sx={{ width: "50%", fontWeight: "normal", textAlign: "start" }}
          >
            {formatTime(defaultStartTime)}
          </Typography>
        </Box>
      </Box>

      {/* <==== TABLE HEADER SECTION ====> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "100%",
          marginTop: "10px",
          position: "relative",
          backgroundColor: "white",
          marginBottom: "10px",
          borderRadius: "5px",
          boxShadow:
            "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
        }}
      >
        <Grid
          container
          sx={{
            height: "90px",
            position: "sticky",
            top: 0,
            backgroundColor: "white", // Ensure header has background
            zIndex: 1, // Ensure header stays above table rows
          }}
        >
          {/* Index Column */}
          <Grid
            item
            xs={0.3}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "5px",
              boxShadow:
                "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
            }}
          >
            <Typography sx={{}}>№</Typography>
          </Grid>
          {/* Work Title Column */}
          <Grid
            item
            xs={3.3}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "5px",
              boxShadow:
                "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
            }}
          >
            <Typography
              sx={{ fontWeight: "bold", fontSize: "14px", lineHeight: "1" }}
            >
              {t("table_header_title")}
            </Typography>
          </Grid>
          {/* Work Time Column */}
          <Grid
            item
            xs={1}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              borderRadius: "5px",
              boxShadow:
                "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
            }}
          >
            <Typography
              sx={{ fontSize: "14px", fontWeight: "bold", lineHeight: "1" }}
            >
            {t("table_header_workhour")}
            </Typography>
          </Grid>
          {/* Start Time Column */}
          <Grid
            item
            xs={1}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "5px",
              boxShadow:
                "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
            }}
          >
            <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
              {t("start_time")}
            </Typography>
          </Grid>
          {/* End Time Column */}
          <Grid
            item
            xs={1}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "5px",
              boxShadow:
                "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
            }}
          >
            <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
              {t("end_time")}
            </Typography>
          </Grid>
          {/* Work Type Column */}
          <Grid
            item
            xs={1.5}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              borderRadius: "5px",
              boxShadow:
                "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
            }}
          >
            <Typography
              sx={{ fontSize: "15px", fontWeight: "bold", lineHeight: "1.1" }}
            >
              {t("working_type_text")}
            </Typography>
          </Grid>
          {/* Working History Column */}
          <Grid
            item
            xs={1.2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              borderRadius: "5px",
              boxShadow:
                "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
              padding: "2px",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "bold",
                textTransform: "capitalize",
                lineHeight: "1.2",
              }}
            >
            {t("working_task_title")}
            </Typography>
          </Grid>
          {/* Comments Column */}
          <Grid
            item
            xs={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{ fontSize: "14px", fontWeight: "bold", lineHeight: "1" }}
            >
            {t("comment_text")}
            </Typography>
          </Grid>
          {/* Actions Column (Hidden for Table Header) */}
          <Grid
            item
            xs={0.6}
            sx={{
              display: "none",
            }}
          >
            {/* Placeholder for Actions Column */}
          </Grid>
        </Grid>
      </Box>
      {/* <==== TABLE BODY SECTION ====> */}
            
            {items && items.length > 0 ? (
              <Reorder.Group
                axis="y"
                onReorder={handleReorder}
                values={items}
                as="div"
              >
                {items.map((item, index) => (
                  <Reorder.Item key={item.id} value={item} as="div">
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        borderRadius: "5px",
                        boxShadow:
                          "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
                        marginBottom: "5px",
                        paddingY: "5px",
                        paddingX: "4px",
                        backgroundColor: overlappingIds.includes(item.id)
                          ? "#ffcccc"
                          : "white",
                      }}
                    >
                      <Grid container>
                        {/* Index */}
                        <Grid item xs={0.3} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Typography>{index + 1}</Typography>
                        </Grid>
                        {/* Work Title */}
                        <Grid item xs={3.3} sx={{ display: "flex", alignItems: "center", justifyContent: "start", textAlign: "start" }}>
                          <Typography sx={{ height: "auto", overflowWrap: "break-word", wordBreak: "break-all", lineHeight: "1.1", paddingX: "4px" }}>
                            {item.title || ""}
                          </Typography>
                        </Grid>
                        {/* Working Time */}
                        <Grid item xs={1} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Typography sx={{ height: "auto", overflowWrap: "break-word", wordBreak: "break-all", fontSize: "16px" }}>
                            {item.workTime || ""}
                          </Typography>
                        </Grid>
                        {/* Start Time */}
                        <Grid item xs={1} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Typography sx={{ height: "auto", overflowWrap: "break-word", wordBreak: "break-all" }}>
                            {item.startTime || ""}
                          </Typography>
                        </Grid>
                        {/* End Time */}
                        <Grid item xs={1} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Typography sx={{ height: "auto", overflowWrap: "break-word", wordBreak: "break-all" }}>
                            {item.endTime || ""}
                          </Typography>
                        </Grid>
                        {/* Work Type */}
                        <Grid item xs={1.5} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Typography sx={{ height: "auto", overflowWrap: "break-word", wordBreak: "break-all" }}>
                            {item.workType === "regular" ? t("working_type_value_two") : t("working_type_value_one")}
                          </Typography>
                        </Grid>
                        {/* Working History */}
                        <Grid item xs={1.2} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Typography sx={{ height: "auto", overflowWrap: "break-word", wordBreak: "break-all" }}>
                            {item.workingHistory}
                          </Typography>
                        </Grid>
                        {/* Working Comment */}
                        <Grid item xs={2} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Typography sx={{ height: "auto", overflowWrap: "break-word", wordBreak: "break-all", lineHeight: "1.1", paddingX: "4px" }}>
                            {item.workingComment || ""}
                          </Typography>
                        </Grid>
                        {/* Actions */}
                        <Grid item xs={0.6} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {/* Edit Button */}
                          <Button variant="text" sx={{ minWidth: "auto", padding: "0px", margin: "0px" }} onClick={() => handleOpenEditDialog(item)}>
                            <ModeEditOutlineIcon sx={{ color: Colors.nbu, width: "22px", height: "22px" }} />
                          </Button>
                          {/* Delete Button */}
                          <Button variant="text" sx={{ minWidth: "auto", padding: "0px", margin: "0px", marginLeft: "5px" }} onClick={() => handleDelete(item.id)}>
                            <DeleteForeverIcon sx={{ color: "red", width: "22px", height: "22px" }} />
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Reorder.Item>
                ))}
              </Reorder.Group>
                ) : (
                  <Typography sx={{ textAlign: "center", margin: "20px" }}>
                    {t("find_row")}
                  </Typography>
                )}

      {/* <=== CREATE AND SEND BUTTON ====> */}
      <Box
        sx={{
          marginY: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          {/* <=== ADD NEW ROW INFORMATION ====> */}
          <Button
            onClick={handleOpenAddDialog}
            variant="contained"
            sx={{ background: Colors.nbu }}
            endIcon={
              <AddCircleIcon
                sx={{ color: "white", fontSize: "20px", fontWeight: "bold" }}
              />
            }
          >
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "white",
                textTransform: "uppercase",
              }}
            >
              {t("add_new_row")}
            </Typography>
          </Button>
          {/* <=== REFRESH DATA ===> */}
          <Button
            variant="contained"
            onClick={handleRefresh}
            sx={{ background: Colors.nbu }}
            endIcon={
              <GetAppIcon
                sx={{ color: "white", fontSize: "20px", fontWeight: "bold" }}
              />
            }
          >
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "white",
                textTransform: "uppercase",
              }}
            >
              {t("refresh_row_data")}
            </Typography>
          </Button>
        </Box>
        {/* <=== SEND BUTTON ===> */}
        <Button
          variant="contained"
          
          onClick={() => handleOpenNoticeDialog()}
          sx={{ background: Colors.nbu }}
          endIcon={
            <SendIcon
              sx={{ color: "white", fontSize: "20px", fontWeight: "bold" }}
            />
          }
        >
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "bold",
              color: "white",
              textTransform: "uppercase",
            }}
          >
            {t("send_rowdata")}
          </Typography>
        </Button>
      </Box>

      {/* <==== ADD ROW MODAL ====> */}
      <Dialog
        open={openAddDialog}
        onClose={handleCloseAddDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontSize: "20px" }}>
            {t("fotowork_section_title")} {formattedDate} {t("year")}.
          </Typography>
        </DialogTitle>
        <DialogContent>
          {/* Display Task Timing */}
          <Box sx={{ marginBottom: "10px" }}>
            <Typography variant="subtitle1" color="textSecondary">
              {t("start_task_time")}: {formatTime(addStartTime)} {t("end_task_time")} :{" "}
              {formatTime(addEndTime)}
            </Typography>
          </Box>
          <form onSubmit={handleAddSubmit}>
            <Stack
              margin={2}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              {/* <=== LEFT SIDE ===> */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "50%",
                  gap: "10px",
                }}
              >
                {/* <=== TITLE INPUT ===> */}
                <TextField
                  value={addTitle}
                  onChange={(e) => setAddTitle(e.target.value)}
                  variant="outlined"
                  label={t("first_doingwork_inputlabel")}
                  required
                  multiline // To increase the height
                  minRows={6} // Reduced rows for better UX
                  inputProps={{ maxLength: 290 }} // Set the maximum length of the input
                  InputLabelProps={{
                    sx: {
                      color: Colors.nbu, // Custom label text color
                      "&.Mui-focused": {
                        color: Colors.blue_nbu, // Custom label text color on focus
                      },
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: Colors.blue_nbu, // Custom border color
                      },
                      "&:hover fieldset": {
                        borderColor: Colors.blue_nbu, // Border color on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: Colors.blue_nbu, // Border color on focus
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: Colors.blue_nbu, // Custom label text color
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: Colors.blue_nbu, // Custom label text color on focus
                    },
                  }}
                />
               {/* <=== WORK DURATION INPUT ===> */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label={t("spent_timeto_work")}
                    value={addWorkDuration}
                    onChange={(newValue) =>
                      setAddWorkDuration(
                        newValue && newValue.isValid()
                          ? newValue
                          : dayjs("00:00", "HH:mm")
                      )
                    }
                    views={["hours", "minutes"]}
                    format="HH:mm"
                    ampm={false}
                    renderInput={(params) => <TextField {...params} required />}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: Colors.blue_nbu, // Custom border color
                        },
                        "&:hover fieldset": {
                          borderColor: Colors.blue_nbu, // Border color on hover
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: Colors.blue_nbu, // Border color on focus
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: Colors.blue_nbu, // Custom label text color
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: Colors.blue_nbu, // Custom label text color on focus
                      },
                    }}
                  />
                </LocalizationProvider>
              </Box>
              {/* <=== RIGHT SIDE ====> */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "50%",
                  gap: "10px",
                }}
              >
              {/* <=== WORKING TYPE ===> */}
              <FormControl
                  variant="outlined"
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: Colors.nbu, // Custom border color
                      },
                      "&:hover fieldset": {
                        borderColor: Colors.nbu, // Border color on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: Colors.nbu, // Border color on focus
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: Colors.blue_nbu, // Custom label text color
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: Colors.blue_nbu, // Custom label text color on focus
                    },
                    "& .MuiSelect-root": {
                      color: Colors.blue_nbu, // Custom text color inside the Select component
                    },
                  }}
                >
                  <InputLabel id="add-work-type-label">{t("working_typeof_task")}</InputLabel>
                  <Select
                    labelId="add-work-type-label"
                    value={addWorkType}
                    onChange={(e) => setAddWorkType(e.target.value)}
                    label={t("working_typeof_task")}
                  >
                    <MenuItem value="onetime">{t("working_type_value_one")}</MenuItem>
                    <MenuItem value="regular">{t("working_type_value_two")}</MenuItem>
                  </Select>
                </FormControl>
                {/* <=== WORKING HISTORY BOOLEAN YES/NO ====> */}
                <FormControl
                  variant="outlined"
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: Colors.blue_nbu, // Custom border color
                      },
                      "&:hover fieldset": {
                        borderColor: Colors.blue_nbu, // Border color on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: Colors.blue_nbu, // Border color on focus
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: Colors.blue_nbu, // Custom label text color
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: Colors.blue_nbu, // Custom label text color on focus
                    },
                    "& .MuiSelect-root": {
                      color: Colors.blue_nbu, // Custom text color inside the Select component
                    },
                  }}
                >
                  <InputLabel id="add-working-history-label">
                    {t("job_tasks_scope_desctiption")}
                  </InputLabel>
                  <Select
                    labelId="add-working-history-label"
                    value={addWorkingHistory}
                    onChange={(e) => setAddWorkingHistory(e.target.value)}
                    label={t("job_tasks_scope_desctiption")}
                  >
                    <MenuItem value={t("yes")}>{t("yes")}</MenuItem>
                    <MenuItem value={t("no")}>{t("no")}</MenuItem>
                  </Select>
                </FormControl>
                {/* <=== WORKING COMMENT ===> */}
                <TextField
                  value={addWorkingComment}
                  onChange={(e) => setAddWorkingComment(e.target.value)}
                  variant="outlined"
                  label={t("comment_text")}
                  // required
                  multiline // To increase the height
                  minRows={3} // Set the minimum number of rows for the TextField
                  inputProps={{ maxLength: 150 }} // Set the maximum length of the input
                  InputLabelProps={{
                    sx: {
                      color: Colors.nbu, // Custom label text color
                      "&.Mui-focused": {
                        color: Colors.blue_nbu, // Custom label text color on focus
                      },
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: Colors.blue_nbu, // Custom border color
                      },
                      "&:hover fieldset": {
                        borderColor: Colors.blue_nbu, // Border color on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: Colors.blue_nbu, // Border color on focus
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: Colors.blue_nbu, // Custom label text color
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: Colors.blue_nbu, // Custom label text color on focus
                    },
                  }}
                />
              </Box>
            </Stack>
            {/* <=== SUBMIT BUTTON ===> */}
            <Button
              variant="contained"
              type="submit"
              sx={{ backgroundColor: Colors.nbu, width: "100%" }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: Colors.white,
                  textTransform: "uppercase",
                }}
              >
              {t("submit_button_text")}
              </Typography>
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* <==== EDIT ROW MODAL ====> */}
      <Dialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontSize: "20px" }}>
          {t("fotowork_section_title")} {formattedDate} {t("year")}.
          </Typography>
        </DialogTitle>
        <DialogContent>
          {/* Display Task Timing */}
          <Box sx={{ marginBottom: "10px" }}>
            <Typography variant="subtitle1" color="textSecondary">
            {t("start_task_time")}: {formatTime(editStartTime)} {t("end_task_time")}: {" "}
              {formatTime(editEndTime)}
            </Typography>
          </Box>
          <form onSubmit={handleEditSubmit}>
            <Stack
              margin={2}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              {/* <=== LEFT SIDE ===> */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "50%",
                  gap: "10px",
                }}
              >
                {/* <=== TITLE INPUT ===> */}
                <TextField
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  variant="outlined"
                  label={t("first_doingwork_inputlabel")}
                  required
                  multiline
                  minRows={6}
                  inputProps={{ maxLength: 290 }}
                  InputLabelProps={{
                    sx: {
                      color: Colors.nbu,
                      "&.Mui-focused": {
                        color: Colors.blue_nbu,
                      },
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: Colors.blue_nbu,
                      },
                      "&:hover fieldset": {
                        borderColor: Colors.blue_nbu,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: Colors.blue_nbu,
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: Colors.blue_nbu,
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: Colors.blue_nbu,
                    },
                  }}
                />
                   {/* <=== WORK DURATION INPUT ===> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label={t("spent_timeto_work")}
                    value={editWorkDuration}
                    onChange={(newValue) =>
                      setEditWorkDuration(
                        newValue && newValue.isValid()
                          ? newValue
                          : dayjs("00:00", "HH:mm")
                      )
                    }
                    views={["hours", "minutes"]}
                    format="HH:mm"
                    ampm={false}
                    renderInput={(params) => <TextField {...params} required />}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: Colors.blue_nbu,
                        },
                        "&:hover fieldset": {
                          borderColor: Colors.blue_nbu,
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: Colors.blue_nbu,
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: Colors.blue_nbu,
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: Colors.blue_nbu,
                      },
                    }}
                  />
                </LocalizationProvider>
            
              </Box>
              {/* <=== RIGHT SIDE ====> */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "50%",
                  gap: "10px",
                }}
              >
              {/* <=== WORKING TYPE ===> */}
                <FormControl
                  variant="outlined"
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: Colors.nbu,
                      },
                      "&:hover fieldset": {
                        borderColor: Colors.nbu,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: Colors.nbu,
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: Colors.blue_nbu,
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: Colors.blue_nbu,
                    },
                    "& .MuiSelect-root": {
                      color: Colors.blue_nbu,
                    },
                  }}
                >
                  <InputLabel id="edit-work-type-label">{t("working_typeof_task")}</InputLabel>
                  <Select
                    labelId="edit-work-type-label"
                    value={editWorkType}
                    onChange={(e) => setEditWorkType(e.target.value)}
                    label={t("working_typeof_task")}
                  >
                    <MenuItem value={t("working_type_value_one")}>{t("working_type_value_one")}</MenuItem>
                    <MenuItem value={t("working_type_value_two")}>{t("working_type_value_two")}</MenuItem>
                  </Select>
                </FormControl>
                {/* <=== WORKING HISTORY BOOLEAN YES/NO ====> */}
                <FormControl
                  variant="outlined"
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: Colors.blue_nbu,
                      },
                      "&:hover fieldset": {
                        borderColor: Colors.blue_nbu,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: Colors.blue_nbu,
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: Colors.blue_nbu,
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: Colors.blue_nbu,
                    },
                    "& .MuiSelect-root": {
                      color: Colors.blue_nbu,
                    },
                  }}
                >
                  <InputLabel id="edit-working-history-label">
                    {t("job_tasks_scope_desctiption")}
                  </InputLabel>
                  <Select
                    labelId="edit-working-history-label"
                    value={editWorkingHistory}
                    onChange={(e) => setEditWorkingHistory(e.target.value)}
                    label={t("job_tasks_scope_desctiption")}
                  >
                    <MenuItem value={t("yes")}>{t("yes")}</MenuItem>
                    <MenuItem value={t("no")}>{t("no")}</MenuItem>
                  </Select>
                </FormControl>

                {/* <=== WORKING COMMENT ===> */}
                <TextField
                  value={editWorkingComment}
                  onChange={(e) => setEditWorkingComment(e.target.value)}
                  variant="outlined"
                  label={t("comment_text")}
                  required
                  multiline
                  minRows={3}
                  inputProps={{ maxLength: 150 }}
                  InputLabelProps={{
                    sx: {
                      color: Colors.nbu,
                      "&.Mui-focused": {
                        color: Colors.blue_nbu,
                      },
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: Colors.blue_nbu,
                      },
                      "&:hover fieldset": {
                        borderColor: Colors.blue_nbu,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: Colors.blue_nbu,
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: Colors.blue_nbu,
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: Colors.blue_nbu,
                    },
                  }}
                />
              </Box>
            </Stack>
            {/* <=== SUBMIT BUTTON ===> */}
            <Button
              variant="contained"
              type="submit"
              sx={{ backgroundColor: Colors.nbu, width: "100%" }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: Colors.white,
                  textTransform: "uppercase",
                }}
              >
                {t("submit_button_text")}
              </Typography>
            </Button>
          </form>
        </DialogContent>
      </Dialog>

        {/* <=== NOTICE MODAL OF SEND BUTTON ===> */}
        <Modal
        open={openNoticeModal}
        onClose={handleCloseNoticeDialog}
        fullWidth
        maxWidth="md"
        >
        <Box sx={{  
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: "650px",
              bgcolor: Colors.white,
              boxShadow: 24,
              p: 4,
              borderRadius:"5px",
              }}>
                {/* <=== Upper Box of Notice Modal ===> */}
                <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",height:"80%",gap:"45px"}}>
                <Box
                    sx={{
                      width: "100px",
                      height: "auto",
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      animation: `${waveAnimation} 3s infinite ease-in-out`,
                      borderRadius: '50%',
                      marginLeft:"10px"
                    }}
                  >
                    <PriorityHighTwoToneIcon
                      sx={{
                        width: "100%",
                        height: "100%",
                        color: Colors.yellow_orange,
                      }}
                    /> 
                  </Box>
                    <Box>
                      <Typography sx={{fontSize:"20px", fontWeight:"normal", textTransform:"initial", lineHeight:"1.2", color:Colors.gray, marginBottom:"10px"}}>
                        {t("first_sectionof_noticemodal")} <Box component="span" sx={{color: Colors.nbu,fontWeight:"bold",fontSize:"20px",}}>{formattedDate}</Box> {t("second_sectionof_noticemodal")}<Box component="span" sx={{color: Colors.nbu,fontWeight:"bold",fontSize:"20px",}}> {totalWorkingTime}</Box> 
                      </Typography>
                        <Typography sx={{fontSize:"20px",fontWeight:"normal",textTransform:"initial",lineHeight:"1.2",color:Colors.gray}}>
                            {t("notice_info_text")}
                        </Typography>
                        {/* <=== ModalButtons Section ===> */}
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"15px"}}>
                            <Button 
                            variant="contained"
                            sx={{bgcolor:Colors.nbu,color:Colors.white ,fontWeight:"bold",textTransform:"uppercase"}}
                            onClick={handleSend}
                            >
                              {t("yes")}
                            </Button>
                            <Button 
                            variant="contained" 
                            sx={{bgcolor:Colors.blue_box,color:Colors.nbu ,fontWeight:"bold", textTransform:"uppercase",'&:hover': {
                              bgcolor:Colors.red, color:Colors.white
                            }}}
                            onClick={handleCloseNoticeDialog}
                            >
                              {t("no")}
                            </Button>
                        </Box>
                    </Box>

                  </Box>
        </Box>
      </Modal>

      {/* <==== SNACKBAR FOR USER FEEDBACK ====> */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default KpiDailiyWorkTable; 