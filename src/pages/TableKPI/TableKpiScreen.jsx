import React, {
    useState,
    useMemo,
    useEffect,
    useCallback,
    createContext,
  } from "react";
  import "./newmain.css";
  import CircularProgressBarWithPercentage from "../../components/circleProgressBar";
  import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
  // ------ Import Mock Data ------ //
  import { useNavigate } from "react-router-dom";
  // import axios from "axios" //
  import { REQUESTS } from "../../api/requests";
  import {useReduxDispatch } from "../../hooks/useReduxHook.js"
  import { logout } from "../../store/slice/userSlice.js";
  // defaul photo //
  import DefaultImage from "../../assets/photo/defaultphoto.jpg";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faEye } from "@fortawesome/free-solid-svg-icons";
  import { faCalendarCheck } from "@fortawesome/free-regular-svg-icons";
  
  export const userName = createContext();
  
  const NewMain = () => {
    const dispatch = useReduxDispatch();
    const [tableData, setTableData] = useState([]);
    const [data, setData] = useState([]); // imported api data
    const [circledata, setCircleData] = useState([]);
    const [line, setLine] = useState([]);
    const [numberlive, setNumberlive] = useState([]);
    const navigate = useNavigate();
  
    // <==== FUNCTION ====> //
    const getCSSVariableValue = (variable) => {
      return getComputedStyle(document.documentElement)
        .getPropertyValue(variable)
        .trim();
    };
  
    // Get CSS variable values
    const lightGreen = getCSSVariableValue("--light-green");
    const darkColor = getCSSVariableValue("--dark");
    const greenArea = getCSSVariableValue("--green-area");
    const blueTableColor = getCSSVariableValue("--table-light-blue");
    const greenDotColor = getCSSVariableValue("--dote-green");
  
    const [validImage, setValidIMage] = useState();
  
    const formatValue = (value) => {
      if (value > 125) {
        return 125;
      } else if (value < 0) {
        return 0;
      } else {
        return value;
      }
    };
  
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
  
    const insertSpaces = (text) => {
      if (!text) return ""; // Handle empty or undefined text
      return text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };
  
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
  
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await REQUESTS.user.getUser();
          console.log(response);
          const propsdata = response.data[0];
          const lastCameData = propsdata[propsdata.length - 1];
          const newDatas = propsdata.kpies[propsdata.kpies.length - 1].month_data;
          const newOverall = propsdata.kpies[propsdata.kpies.length - 1];
          setTableData(newDatas);
          setCircleData(newOverall);
          console.log(lastCameData);
          setData(propsdata);
          setLine(propsdata);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
  
      const fetchLiveUser = async () => {
        try {
          const response = await REQUESTS.live.getLive();
          console.log(response, "salom");
          const livenumber = response.data;
          setNumberlive(livenumber);
        } catch (error) {
          console.error("Error fetching live user data:", error);
        }
      };
  
      fetchUserData();
      fetchLiveUser();
  
      // Set interval to fetch live user count every 5 seconds
      const interval = setInterval(() => {
        fetchLiveUser();
      }, 5000);
  
      // Cleanup function to clear the interval
      return () => clearInterval(interval);
    }, [setTableData, setCircleData, setData, setLine, setNumberlive]);
  
    const handleLogOut = useCallback(() => {
      dispatch(logout());
      navigate("/");
      localStorage.clear();
    }, [dispatch]);
  
    // <=== LAST 12 MONTH SHOW SECTION ====> //
    const lastTwelveMonthsData = useMemo(() => {
      return line.kpies ? line.kpies.slice(-12) : [];
    }, [line.kpies]);
  
    const newDefaultImage = DefaultImage;
  
    // const imageUrl = `http://10.8.88.91:8010${data.photo_url}`;
  
    const imageUrl = `http://10.8.88.91:8000${data.photo_url}`;
  
    fetch(imageUrl)
      .then((response) => {
        if (response.ok) {
          console.log("The image exists and is accessible.");
          setValidIMage(true);
        } else {
          console.log("The image does not exist or is not accessible.");
          setValidIMage(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching the image:", error);
      });
  
    return (
      <>
        <div className="new-main-container">
          <header className="header-new-grid-container">
            {/* image div */}
            <div className="new-image-div new-grid-item">
              {validImage ? (
                <img
                  src={imageUrl}
                  alt="worker_image"
                  className="worker-image-new"
                />
              ) : (
                <img
                  src={newDefaultImage}
                  alt="default_image"
                  className="worker-image-new"
                />
              )}
            </div>
            {/* person data div */}
            <div className="user-data-div new-grid-item">
              <h2 className="full-name-new">{data.name || "no exist name"}</h2>
              <div className="userdata-grid">
                <div className="userdata-grid-item ">
                  <p className="left-text-new">ФИЛИАЛ /ГО</p>
                  <p className="right-text-new">
                    {data.branch || "нет информации"}
                  </p>
                </div>
                <div className="userdata-grid-item">
                  <p className="left-text-new">ВСП (ОПЕРУ/БХМ/БХО)</p>
                  <p className="right-text-new">
                    {data.division || "нет информации"}
                  </p>
                </div>
                <div className="userdata-grid-item">
                  <p className="left-text-new">ПОДРАЗДЕЛЕНИЕ</p>
                  <p className="right-text-new">
                    {data.department || "нет информации"}
                  </p>
                </div>
                <div className="userdata-grid-item">
                  <p className="left-text-new">ДОЛЖНОСТЬ</p>
                  <p className="right-text-new">
                    {data.position || "нет информации"}
                  </p>
                </div>
                <div className="userdata-grid-item">
                  <p className="left-text-new">функционал</p>
                  <p className="right-text-new">
                    {data.premium || "нет информации"}
                  </p>
                </div>
                <div className="userdata-grid-item">
                  <p className="left-text-new">ТАБЕЛЬНЫЙ НОМЕР РАБОТНИКА</p>
                  <p className="right-text-new">
                    {data.table_number || "нет информации"}
                  </p>
                </div>
                <div className="userdata-grid-item">
                  <p className="left-text-new">ОКЛАД РАБОТНИКА, СУМ</p>
                  <p className="right-text-new">
                    {insertSpaces(data.fixed) || "нет информации"}
                  </p>
                </div>
              </div>
            </div>
            {/* circle div */}
            <div className="kpi-circle-new new-grid-item">
              <div className="circle-top-text">
                <h3 className="circle-kpi">KPI</h3>
                <p className="circle-data-text">
                  за {formatDate(circledata.month)} г.
                </p>
              </div>
              <div className="circle-piechart-div">
                <CircularProgressBarWithPercentage
                  selectedValue={Math.round(circledata.overall)}
                  maxValue={125}
                  radius={150}
                  textColor="#000"
                  activeStrokeColor={lightGreen}
                  withGradient
                  className="circle-own-style"
                />
              </div>
            </div>
          </header>
          <main className="main-graphline">
            <div className="main-graph-top">
              <div className="dynamic-text">
                <p className="graph-diynamic-text">
                  Динамика выполнения общих плановых показателей KPI
                </p>
              </div>
              <div className="live-user-div">
                <p className="live-user-text">
                  Количество просмотров в день: {numberlive.count || "no data"}
                </p>
                <FontAwesomeIcon icon={faEye} className="live-user-eye-icon" />
              </div>
            </div>
            <div className="graph-section">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  width={"100%"}
                  height={"100%"}
                  margin={{ left: -20, top: 15, right: 10 }}
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
                    className="bottom-line-text"
                    padding={{ left: 0, right: 0 }}
                    tick={{
                      fill: "#000",
                      fontWeight: "bold",
                      textAnchor: "middle",
                      width: 10,
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
                    stroke={greenArea}
                    strokeWidth={2}
                    activeDot={{ r: 0.00001, fill: { lightGreen } }}
                    dot={<CustomizedDot />}
                    fill="#abf7b1"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </main>
          <footer>
            {/* <---- TABLE SECTION DIV -----> */}
            <table className="table-section">
              <thead className="table-head-section">
                <tr className="table-header-row-section">
                  <th className="table-header_big-div  table-header-text_div">
                    <p className="table-header-text">НАименование метрики</p>
                  </th>
                  <th className="table-header-text_div">
                    <p className="table-header-text">начало</p>
                  </th>
                  <th className="table-header-text_div">
                    <p className="table-header-text">конец</p>
                  </th>
                  <th className="table-header-text_div">
                    <p className="table-header-text">активность</p>
                  </th>
                  <th className="table-header-text_div">
                    <p className="table-header-text">метод расчёта</p>
                  </th>
                  <th className="table-header-text_div">
                    <p className="table-header-text">вес показ.</p>
                  </th>
                  <th className="table-header-text_div">
                    <p className="table-header-text">единица</p>
                  </th>
                  <th className="table-header-text_div">
                    <p className="table-header-text">план</p>
                  </th>
                  <th className="table-header-text_div">
                    <p className="table-header-text">факт</p>
                  </th>
                  <th className="table-header-text_div">
                    <p className="table-header-text">исполнение</p>
                  </th>
                </tr>
              </thead>
              <tbody className="table-body-section">
                {tableData.map((rowData, id) => (
                  <tr className="table-body-row" key={id}>
                    <td className="table-header_big-div table-body_text-div">
                      <p className="table-body-text leftside-table-name">{rowData.kpi_name}</p>
                    </td>
                    <td className="table-body_text-div">
                      <p className="table-body-text">{rowData.start}</p>
                    </td>
                    <td className="table-body_text-div">
                      <p className="table-body-text">{rowData.end}</p>
                    </td>
                    <td
                      className={`table-body_text-div ${
                        rowData.activity === "Да" ? "defaultBg" : "yellowBg"
                      }`}
                    >
                      <p className="table-body-text">{rowData.activity}</p>
                    </td>
                    <td className="table-body_text-div">
                      <p className="table-body-text">{rowData.method}</p>
                    </td>
                    <td className="table-body_text-div">
                      <p className="table-body-text">{Math.round(rowData.weight)} %</p>
                    </td>
                    <td className="table-body_text-div">
                      <p className="table-body-text">{rowData.metric}</p>
                    </td>
                    <td className="table-body_text-div">
                      <p className="table-body-text">{rowData.performance_score}</p>
                    </td>
                    <td className="table-body_text-div">
                      <p className="table-body-text">{rowData.fact}</p>
                    </td>
                    <td className="table-body_text-div">
                      <p className="table-body-text">{Math.round(formatValue(rowData.finished))} %</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </footer>
        </div>
      </>
    );
  };
  
  export default NewMain;
  