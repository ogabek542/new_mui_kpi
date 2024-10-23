import * as React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import { Colors } from "../../styles/theme";
import { motion } from "framer-motion";
// IMAGE MAGNIFIER //
import { useState } from "react";
import { useReduxDispatch } from "../../hooks/useReduxHook.js";
import { Outlet, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import MovingIcon from "@mui/icons-material/Moving";

import { REQUESTS } from "../../api/requests.js";
// <=== Import New Charts ====> //
import PieChartMainChart from "../../components/PieChartMainSection/PieChartMainChart.jsx";
import HolePieChart from "../../components/HolePieChart/HolePieChart.jsx";
import StackedBartchart from "../../components/StackedBarchart/StackedBartchart.jsx";
import MainPageCostBarchart from "../../components/MainPageCostBarchart/MainPageCostBarchart.jsx";
import { useLocation } from "react-router-dom";
// <=== IMPORT LOADER ICON ====> //
import { PacmanLoader } from "react-spinners";
import AnimatedIcon from "../../components/AnimatedIcon/AnimatedIcon.jsx";
// IMPORT MODAL //
import CustomModal from "../../components/CustomModal/CustomModal.jsx";
import BankIncomeCard from "../../components/BankIncomeCard/BankIncomeCard.jsx";
import BankExpenceCard from "../../components/BankExpenseCard/BankExpenceCard.jsx";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import "dayjs/locale/ru";
// for holidays data //
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
// <==== import Test API ====> //
// import MainTestApi from "../testapi/mainScreenTextApi.jsx";

// LANGUAGE SECTION //
import i18n from "i18next";
import { useTranslation } from "react-i18next";

const MainPage = () => {
  const location = useLocation();
  // change language function //
  const changeLang = (value) => {
    i18n.changeLanguage(value);
  };
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = React.useState(false);
  const [backdrop, setBackdrop] = React.useState(false);
  const [openmodal, setOpenModal] = React.useState(false);
  const [loginError, setLoginError] = React.useState("");
  const [openauthmodal, setOpenAuthModal] = React.useState(false);
  const [openacceptmodal, setAcceptModal] = React.useState(false);

  // AUTH  MODAL FUNCTION //
  const handleOpenAuthModal = () => setOpenAuthModal(true);
  const handleCloseAuthModal = () => setOpenAuthModal(false);
  // This modal open After Authentification //
  const handleOpenAcceptModal = () => setAcceptModal(true);
  const handleCloseAcceptModal = () => setAcceptModal(false);
  const handleNavigateFirstScreen = () => navigate("netprofit");

  // <---- LOGIN CONSTANTS -----> //
  const dispatch = useReduxDispatch();
  const [isAuth, setIsAuth] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [chooseData, setChooseData] = useState([]);
  const [loading, setLoading] = useState(true); // Start with loading as true

  const [selectNewData, setSelectNewData] = useState(
    // dayjs("29.07.2024", "DD.MM.YYYY")
    dayjs().subtract(1, 'day')
  );
  // const [selectNewData, setSelectNewData] = useState(dayjs("2023-07-26"));

  const insertSpaces = (text) => {
    if (!text) return ""; // Handle empty or undefined text

    // Convert to string and ensure no more than 6 characters
    const str = text.toString().slice(0, 6);

    // Add spaces every 3 digits
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const handleNavigateKeyIndicators = () => {
    // navigate("/keyindicatorscreen");
    navigate("keyindicatorscreen");
  };
  const handleNavigateBalanceScreen = () => {
    navigate("balancescreen");
  };

  useEffect(() => {
    const fetchMainPageData = async () => {
      try {
        setLoading(true); // Start the loader when fetching begins
        const formattedDate = selectNewData.format("DD.MM.YYYY");
        const params = { date: formattedDate };

        const respond = await REQUESTS.mainCalendarScreen.getMainCalendarScreen(
          params
        );
        const calendarIndicators = respond.data;
        console.log(formattedDate);
        console.log(respond);
        console.log(calendarIndicators, "New MAIN SCREEN data");
        setChooseData(calendarIndicators);
      } catch (error) {
        console.error("Error fetching graphic indicator data:", error);
        if (error.response && error.response.status === 404) {
          console.error(
            "Endpoint not found. Please check the URL or backend configuration."
          );
        } else {
          console.error("An error occurred:", error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMainPageData();
  }, [selectNewData]);

  useEffect(() => {
    handleDateChange(selectNewData);
  }, [selectNewData]);
  const handleDateChange = (newValue) => {
    setSelectNewData(newValue); // Update the selected date
  };

  const formattedDate = dayjs(selectNewData).format("DD.MM.YYYY");

  // Function to get the information passed from NewLoginScreen
  const getLoginInfo = () => {
    const { acceptNavigate } = location.state || { acceptNavigate: false }; // Default to false if no state is passed
    return acceptNavigate;
  };

  const acceptNavigate = getLoginInfo(); // Call the function to retrieve the value

  return (
    <Container
      maxWidth={false} // This allows the container to expand beyond the default breakpoints
      disableGutters
      sx={{
        px: "10px",
        bgcolor: Colors.gray_back,
        width: "100%", // Ensure the container takes up 100% of the viewport width
        maxWidth: "100vw", // Ensure the container doesn't exceed the viewport width
        "@media (max-width: 1920px)": {
          maxWidth: "100%", // For extra-large screens, allow full width
        },
      }}
    >
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
        <Header
          changeLang={changeLang}
          value={selectNewData}
          onChange={handleDateChange}
        />

        <Outlet />

          {/* <=== TABLES BUTTON'S SECTION ===> */}

        <Box
          sx={{
            height: "55px",
            width: "100%",
            padding: "5px",
            bgcolor: Colors.gray_footer,
            marginBottom: "10px",
            borderRadius: "5px",
            display: "flex",
            alignItems: "center",
            paddingX: "10px",
            gap: "10px",
          }}
        >

          <Button
            variant="text"
            sx={{
              textAlign: "start",
              bgcolor: Colors.gray_footer,
              "&:hover": {
                bgcolor: Colors.gray_footer, // Change this to your desired hover background color
              },
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                color: Colors.blue_nbu,
                textTransform: "uppercase",
              }}
            >
              {t("dailiyInformation")}
            </Typography>
          </Button>
          {/* <=== KEY INDEX BUTTON ====> */}
          <Button
            variant="contained"
            sx={{
              textAlign: "start",
              bgcolor: Colors.gray_common,
              "&:hover": {
                bgcolor: Colors.gray_common, // Change this to your desired hover background color
              },
              marginLeft: "100px",
            }}
            // onClick={handleNavigateKeyIndicators}
            onClick={handleOpenAcceptModal}
          >
            <Typography sx={{ fontWeight: "bold", textTransform: "uppercase" }}>
              {t("keyINdicatorMain")}
            </Typography>
          </Button>
          {/* <=== BALANS BUTTON ====> */}
          <Button
            variant="contained"
            sx={{
              textAlign: "start",
              bgcolor: Colors.gray_common,
              "&:hover": {
                bgcolor: Colors.gray_common, // Change this to your desired hover background color
              },
            }}
            // onClick={handleNavigateBalanceScreen}
            onClick={handleOpenAcceptModal}
          >
            <Typography sx={{ fontWeight: "bold", textTransform: "uppercase" }}>
              {t("balans")}
            </Typography>
          </Button>
          <Button
            variant="contained"
            sx={{
              textAlign: "start",
              bgcolor: Colors.gray_common,
              "&:hover": {
                bgcolor: Colors.gray_common, // Change this to your desired hover background color
              },
            }}
            // onClick={handleNavigateBalanceScreen}
            onClick={handleOpenAcceptModal}
          >
            <Typography sx={{ fontWeight: "bold", textTransform: "uppercase" }}>
              {t("analysis")}
            </Typography>
          </Button>
        </Box>
        {/* <==== BARCHART CARDS SECTION ====> */}

        {loading ? (
          // Display the loader
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 'auto', height: 'auto' 
            }}
          >
            {/* <==== LOADER ICON ====> */}
            {/* <PacmanLoader
              color={Colors.blue_tableheader_light}
              loading={loading}
              size={50}
            /> */}

            <AnimatedIcon sx={{ width: '300px', height: '350px' }}/>

          </Box>
        ) : (
          chooseData
            ?.filter((item) => item?.calenDate === formattedDate)
            .map((item, index) => (
              <Grid
                container
                direction="row"
                sx={{
                  margin: "auto",
                  maxWidth: "1750px",
                  marginBottom: "10px",
                  display: "flex",
                  justifyContent: "center",
                }}
                key={`${index}-${item.calenDate}`} // Use correct key prop
              >
                {/* First div */}
                <Grid
                  item
                  xs={12}
                  sm={9}
                  md={6}
                  lg={4}
                  sx={{
                    height: { xs: "400px", md: "500px" },
                    padding: "5px",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "5px",
                      padding: "10px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
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
                        fontWeight: "bold",
                        fontSize: { xs: "12px", md: "20px" },
                      }}
                    >
                      {t("secontText")}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "90%",
                        width: "100%",
                        gap: "10px",
                        marginTop: "15px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-evenly",
                          height: "28%",
                        }}
                      >
                        {/* top side of div */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "10px",
                          }}
                        >
                          <Typography
                            variant="h2"
                            sx={{ fontWeight: "bold", textAlign: "start" }}
                          >
                            {insertSpaces(item?.bankAssets?.totalActive || 0)}
                          </Typography>
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
                            {t("partoneBillion")}
                            <br />
                            {t("parttwoBillion")}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "10px",
                          }}
                        >
                          {/* Icon with text */}

                          {/* Box containing Icon and percentage */}
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <MovingIcon
                              sx={{
                                color:
                                  item?.bankAssets?.totalActivePercentage <= 99
                                    ? Colors.red
                                    : Colors.green_dark,
                                fontSize: "48px",
                                padding: "0px",
                                transform:
                                  item?.bankAssets?.totalActivePercentage <= 99
                                    ? "rotate(180deg)"
                                    : "rotate(0deg)",
                                transition: "transform 0.3s ease",
                              }}
                            />
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "flex-start",
                                justifyContent: "center",
                                gap: "2px",
                              }}
                            >
                              <Typography
                                variant="h4"
                                sx={{
                                  color:
                                    item?.bankAssets?.totalActivePercentage <=
                                    99
                                      ? Colors.red
                                      : Colors.green_dark,
                                  fontWeight: "800",
                                  lineHeight: "1",
                                }}
                              >
                                {item?.bankAssets?.totalActivePercentage || 0}{" "}
                                <span
                                  style={{
                                    color:
                                      item?.bankAssets?.totalActivePercentage <=
                                      99
                                        ? Colors.red
                                        : Colors.green_dark,
                                    fontSize: "20px",
                                    lineHeight: "1",
                                  }}
                                >
                                  %
                                </span>
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-around",
                          height: "70%",
                        }}
                      >
                        {/* pie chart section  */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            width: "60%",
                            height: "100%",
                          }}
                        >
                          <PieChartMainChart
                            piechartData={item?.bankAssets?.pieChartDatas ?? []}
                          />
                        </Box>
                        {/* right side Texts */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "10px",
                          }}
                        >
                          {/* top side light blue */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              flexDirection: "column",
                            }}
                          >
                            <Box>
                              <Typography
                                sx={{
                                  fontSize: "12px",
                                  color: Colors.dark,
                                  fontWeight: "bold",
                                  textAlign: "left",
                                  lineHeight: "1",
                                  textTransform: "uppercase",
                                }}
                              >
                                {t("assetsCredits")}
                              </Typography>
                              <Typography
                                sx={{
                                  color: "rgba(255, 99, 132, 0.8)",
                                  fontSize: "32px",
                                  fontWeight: "bold",
                                  width: "auto",
                                  lineHeight: "1.1",
                                  textAlign: "start",
                                }}
                              >
                                {insertSpaces(
                                  item?.bankAssets?.creditsActive || 0
                                )}
                              </Typography>
                            </Box>
                            {/* bottom side dark_blue national  */}
                            <Box
                              sx={{ display: "flex", flexDirection: "column" }}
                            >
                              <Box>
                                <Typography
                                  sx={{
                                    fontSize: "12px",
                                    color: Colors.dark,
                                    fontWeight: "bold",
                                    textAlign: "left",
                                    lineHeight: "1",
                                    textTransform: "uppercase",
                                  }}
                                >
                                  {t("assetsBankDeposits")}
                                </Typography>
                                <Typography
                                  sx={{
                                    color: "rgba(144, 238, 144, 1)",
                                    fontSize: "32px",
                                    fontWeight: "bold",
                                    width: "auto",
                                    lineHeight: "1.1",
                                    textAlign: "start",
                                  }}
                                >
                                  {insertSpaces(
                                    item?.bankAssets?.depositActive || 0
                                  )}
                                </Typography>
                              </Box>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                marginLeft: "-30px",
                              }}
                            >
                              <Box>
                                <Typography
                                  sx={{
                                    fontSize: "12px",
                                    color: Colors.dark,
                                    fontWeight: "bold",
                                    textAlign: "start",
                                    lineHeight: "1",
                                    textTransform: "uppercase",
                                    alignItems: "start",
                                  }}
                                >
                                  {t("assetsInvestments")}
                                </Typography>
                                <Typography
                                  sx={{
                                    color: "rgba(54, 162, 235, 0.6)",
                                    fontSize: "32px",
                                    fontWeight: "bold",
                                    width: "auto",
                                    lineHeight: "1.1",
                                    textAlign: "start",
                                    alignItems: "start",
                                  }}
                                >
                                  {insertSpaces(
                                    item?.bankAssets?.investmentActive || 0
                                  )}
                                </Typography>
                              </Box>
                            </Box>

                            <Box
                              sx={{ display: "flex", flexDirection: "column" }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  textAlign: "start",
                                  marginLeft: "-30px",
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontSize: "12px",
                                    color: Colors.dark,
                                    fontWeight: "bold",
                                    textAlign: "start",
                                    lineHeight: "1",
                                    textTransform: "uppercase",
                                  }}
                                >
                                  {t("othersText")}
                                </Typography>
                                <Typography
                                  sx={{
                                    color: "rgba(76, 0, 153, 0.7)",
                                    fontSize: "32px",
                                    fontWeight: "bold",
                                    width: "auto",
                                    lineHeight: "1.1",
                                    textAlign: "start",
                                  }}
                                >
                                  {insertSpaces(
                                    item?.bankAssets?.othersActive || 0
                                  )}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                          {/* RIGHT SIDE MLRD SECTION */}
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "25px",
                              marginTop: "15px",
                            }}
                          >
                            <Typography
                              sx={{
                                color: Colors.gray,
                                fontSize: "12px",
                                width: "50px",
                                wordWrap: "break-word",
                                textAlign: "start",
                                lineHeight: "1",
                              }}
                            >
                              {t("partoneBillion")}
                              <br />
                              {t("parttwoBillion")}
                            </Typography>
                            <Typography
                              sx={{
                                color: Colors.gray,
                                fontSize: "12px",
                                width: "50px",
                                wordWrap: "break-word",
                                textAlign: "start",
                                lineHeight: "1",
                              }}
                            >
                              {t("partoneBillion")}
                              <br />
                              {t("parttwoBillion")}
                            </Typography>
                            <Typography
                              sx={{
                                color: Colors.gray,
                                fontSize: "12px",
                                width: "50px",
                                wordWrap: "break-word",
                                textAlign: "start",
                                lineHeight: "1",
                              }}
                            >
                              {t("partoneBillion")}
                              <br />
                              {t("parttwoBillion")}
                            </Typography>
                            <Typography
                              sx={{
                                color: Colors.gray,
                                fontSize: "12px",
                                width: "50px",
                                wordWrap: "break-word",
                                textAlign: "start",
                                lineHeight: "1",
                              }}
                            >
                              {t("partoneBillion")}
                              <br />
                              {t("parttwoBillion")}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    {/* button styles */}
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
                        size={"medium"}
                        onClick={
                          acceptNavigate
                            ? handleOpenAcceptModal
                            : handleOpenAuthModal
                        }
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
                  sm={9}
                  md={6}
                  lg={4}
                  sx={{
                    height: "500px",
                    // width:"auto",
                    padding: "5px",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "5px",
                      padding: "10px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
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
                        fontWeight: "bold",
                        fontSize: { xs: "12px", md: "20px" },
                      }}
                    >
                      {t("thirdText")}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "90%",
                        width: "100%",
                        gap: "10px",
                        marginTop: "15px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-evenly",
                          height: "28%",
                        }}
                      >
                        {/* top side of div */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "10px",
                          }}
                        >
                          <Typography
                            variant="h2"
                            sx={{ fontWeight: "bold", textAlign: "start" }}
                          >
                            {insertSpaces(
                              item?.bankObligations?.totalObligations || 0
                            )}
                          </Typography>
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
                            {t("partoneBillion")}
                            <br />
                            {t("parttwoBillion")}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "10px",
                          }}
                        >
                          {/* Icon with text */}

                          {/* Box containing Icon and percentage */}
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <MovingIcon
                              sx={{
                                color:
                                  item?.bankObligations
                                    ?.totalObligationsPercentage <= 99
                                    ? Colors.green_dark
                                    : Colors.red,
                                fontSize: "48px",
                                padding: "0px",
                                transform:
                                  item?.bankObligations
                                    ?.totalObligationsPercentage <= 99
                                    ? "rotate(180deg)"
                                    : "rotate(0deg)",
                                transition: "transform 0.3s ease",
                              }}
                            />
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "flex-start",
                                justifyContent: "center",
                                gap: "2px",
                              }}
                            >
                              <Typography
                                variant="h4"
                                sx={{
                                  color:
                                    item?.bankObligations
                                      ?.totalObligationsPercentage <= 99
                                      ? Colors.green_dark
                                      : Colors.red,
                                  fontWeight: "800",
                                  lineHeight: "1",
                                }}
                              >
                                {item?.bankObligations
                                  ?.totalObligationsPercentage || 0}{" "}
                                <span
                                  style={{
                                    color:
                                      item?.bankObligations
                                        ?.totalObligationsPercentage <= 99
                                        ? Colors.green_dark
                                        : Colors.red,
                                    fontSize: "20px",
                                    lineHeight: "1",
                                  }}
                                >
                                  %
                                </span>
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-around",
                          height: "70%",
                        }}
                      >
                        {/* pie chart section  */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            width: "50%",
                            height: "100%",
                          }}
                        >
                          <HolePieChart
                            holeData={item?.bankObligations?.doughnutData ?? []}
                          />
                          {/* <PieChartMainChart piechartData={item.bankAssets.pieChartDatas}/>   */}
                        </Box>
                        {/* right side Texts */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          {/* top side light blue */}
                          <Box
                            sx={{ display: "flex", flexDirection: "column" }}
                          >
                            <Box
                              sx={{ display: "flex", flexDirection: "column" }}
                            >
                              <Box>
                                <Typography
                                  sx={{
                                    fontSize: "12px",
                                    color: Colors.dark,
                                    fontWeight: "bold",
                                    textAlign: "left",
                                    lineHeight: "1",
                                    textTransform: "uppercase",
                                  }}
                                >
                                  {t("obligationCrediteLine")}
                                </Typography>
                                <Typography
                                  sx={{
                                    color: "rgba(2, 13, 158, 1)",
                                    fontSize: "32px",
                                    fontWeight: "bold",
                                    width: "auto",
                                    lineHeight: "1.1",
                                    textAlign: "start",
                                  }}
                                >
                                  {insertSpaces(
                                    item?.bankObligations?.creditLines || 0
                                  )}
                                </Typography>
                              </Box>
                            </Box>
                            {/* bottom side dark_blue national  */}
                            <Box
                              sx={{ display: "flex", flexDirection: "column" }}
                            >
                              <Box>
                                <Typography
                                  sx={{
                                    fontSize: "12px",
                                    color: Colors.dark,
                                    fontWeight: "bold",
                                    textAlign: "left",
                                    lineHeight: "1",
                                    textTransform: "uppercase",
                                  }}
                                >
                                  {t("clientsDeposits")}
                                </Typography>
                                <Typography
                                  sx={{
                                    color: "rgba(54, 162, 235, 0.6)",
                                    fontSize: "32px",
                                    fontWeight: "bold",
                                    width: "auto",
                                    lineHeight: "1.1",
                                    textAlign: "start",
                                  }}
                                >
                                  {insertSpaces(
                                    item?.bankObligations?.clientsDeposits || 0
                                  )}
                                </Typography>
                              </Box>
                            </Box>
                            <Box
                              sx={{ display: "flex", flexDirection: "column" }}
                            >
                              <Box>
                                <Typography
                                  sx={{
                                    fontSize: "12px",
                                    color: Colors.dark,
                                    fontWeight: "bold",
                                    textAlign: "left",
                                    lineHeight: "1",
                                    textTransform: "uppercase",
                                  }}
                                >
                                  {t("bankDeposits")}
                                </Typography>
                                <Typography
                                  sx={{
                                    color: "rgba(76, 0, 153, 0.7)",
                                    fontSize: "32px",
                                    fontWeight: "bold",
                                    width: "auto",
                                    lineHeight: "1.1",
                                    textAlign: "start",
                                  }}
                                >
                                  {insertSpaces(
                                    item?.bankObligations?.banksDeposits || 0
                                  )}
                                </Typography>
                              </Box>
                            </Box>
                            <Box
                              sx={{ display: "flex", flexDirection: "column" }}
                            >
                              <Box>
                                <Typography
                                  sx={{
                                    fontSize: "12px",
                                    color: Colors.dark,
                                    fontWeight: "bold",
                                    textAlign: "left",
                                    lineHeight: "1",
                                    textTransform: "uppercase",
                                  }}
                                >
                                  {t("othersText")}
                                </Typography>
                                <Typography
                                  sx={{
                                    color: "rgba(144, 238, 144, 1)",
                                    fontSize: "32px",
                                    fontWeight: "bold",
                                    width: "auto",
                                    lineHeight: "1.1",
                                    textAlign: "start",
                                  }}
                                >
                                  {insertSpaces(
                                    item?.bankObligations?.othersObligations ||
                                      0
                                  )}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                          {/* Right side mlrd text section */}
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "20px",
                            }}
                          >
                            <Typography
                              sx={{
                                color: Colors.gray,
                                fontSize: "12px",
                                width: "50px",
                                wordWrap: "break-word",
                                textAlign: "start",
                                lineHeight: "1",
                              }}
                            >
                              {t("partoneBillion")}
                              <br />
                              {t("parttwoBillion")}
                            </Typography>
                            <Typography
                              sx={{
                                color: Colors.gray,
                                fontSize: "12px",
                                width: "50px",
                                wordWrap: "break-word",
                                textAlign: "start",
                                lineHeight: "1",
                              }}
                            >
                              {t("partoneBillion")}
                              <br />
                              {t("parttwoBillion")}
                            </Typography>
                            <Typography
                              sx={{
                                color: Colors.gray,
                                fontSize: "12px",
                                width: "50px",
                                wordWrap: "break-word",
                                textAlign: "start",
                                lineHeight: "1",
                              }}
                            >
                              {t("partoneBillion")}
                              <br />
                              {t("parttwoBillion")}
                            </Typography>
                            <Typography
                              sx={{
                                color: Colors.gray,
                                fontSize: "12px",
                                width: "50px",
                                wordWrap: "break-word",
                                textAlign: "start",
                                lineHeight: "1",
                              }}
                            >
                              {t("partoneBillion")}
                              <br />
                              {t("parttwoBillion")}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    {/* button styles */}
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
                        size={"medium"}
                        onClick={
                          acceptNavigate
                            ? handleOpenAcceptModal
                            : handleOpenAuthModal
                        }
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
                {/* third div */}
                <Grid
                  item
                  xs={12}
                  sm={9}
                  md={6}
                  lg={4}
                  sx={{
                    height: { xs: "400px", md: "500px" },
                    width: { xs: "450" },
                    // width:"auto",
                    padding: "5px",
                    position: "relative",
                    "&:hover .hover-button": {
                      opacity: 1, // Show button when hovering over the box
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "5px",
                      padding: "10px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                      bgcolor: Colors.gray_footer,
                    }}
                  >
                    <Typography
                      sx={{
                        textAlign: "start",
                        fontWeight: "800",
                        fontSize: { xs: "12px", md: "20px" },
                      }}
                    >
                      {" "}
                      {t("eighthText")}{" "}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "90%",
                        width: "100%",
                        gap: "10px",
                        marginTop: "15px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-evenly",
                          height: "28%",
                        }}
                      >
                        {/* top side of div */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "10px",
                          }}
                        >
                          <Typography
                            variant="h2"
                            sx={{ fontWeight: "bold", textAlign: "start" }}
                          >
                            {insertSpaces(
                              item?.bankCapitals?.totalCapitals || 0
                            )}
                          </Typography>
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
                            {t("partoneBillion")}
                            <br />
                            {t("parttwoBillion")}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "10px",
                          }}
                        >
                          {/* Icon with text */}

                          {/* Box containing Icon and percentage */}
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <MovingIcon
                              sx={{
                                color:
                                  item?.bankCapitals?.totalCapitalsPercentage <=
                                  99
                                    ? Colors.red
                                    : Colors.green_dark,
                                fontSize: "48px",
                                padding: "0px",
                                transform:
                                  item?.bankCapitals?.totalCapitalsPercentage <=
                                  99
                                    ? "rotate(180deg)"
                                    : "rotate(0deg)",
                                transition: "transform 0.3s ease",
                              }}
                            />
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "flex-start",
                                justifyContent: "center",
                                gap: "2px",
                              }}
                            >
                              <Typography
                                variant="h4"
                                sx={{
                                  color:
                                    item?.bankCapitals
                                      ?.totalCapitalsPercentage <= 99
                                      ? Colors.red
                                      : Colors.green_dark,
                                  fontWeight: "800",
                                  lineHeight: "1",
                                }}
                              >
                                {item?.bankCapitals?.totalCapitalsPercentage ||
                                  0}{" "}
                                <span
                                  style={{
                                    color:
                                      item?.bankCapitals
                                        ?.totalCapitalsPercentage <= 99
                                        ? Colors.red
                                        : Colors.green_dark,
                                    fontSize: "20px",
                                    lineHeight: "1",
                                  }}
                                >
                                  %
                                </span>
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-around",
                          height: "70%",
                        }}
                      >
                        {/* pie chart section  */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            width: "60%",
                            height: "100%",
                          }}
                        >
                          <StackedBartchart
                            reserveFundLine={
                              item?.bankCapitals?.reserveFundLine || 0
                            }
                            retainedEarningsLine={
                              item?.bankCapitals?.retainedEarningsLine || 0
                            }
                            charterCapitalLine={
                              item?.bankCapitals?.charterCapitalLine || 0
                            }
                          />
                        </Box>
                        {/* right side Texts */}
                        <Box sx={{}}>
                          {/* middle sie */}
                          <Box
                            sx={{ display: "flex", flexDirection: "column" }}
                          >
                            <Box>
                              {/* 31203 TAQSIMLANMAGAN FOYDA  */}
                              <Typography
                                sx={{
                                  fontSize: "12px",
                                  color: Colors.dark,
                                  fontWeight: "bold",
                                  textAlign: "left",
                                  lineHeight: "1",
                                  textTransform: "uppercase",
                                }}
                              >
                                {" "}
                                {t("retainedEarnings")}
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  gap: "10px",
                                }}
                              >
                                <Typography
                                  sx={{
                                    color: "rgba(0, 77, 77, 0.7)",
                                    fontSize: "32px",
                                    fontWeight: "bold",
                                    width: "auto",
                                    lineHeight: "1.1",
                                    textAlign: "left",
                                  }}
                                >
                                  {insertSpaces(
                                    item.bankCapitals.retainedEarnings
                                  )}
                                </Typography>
                                <Typography
                                  sx={{
                                    color: Colors.gray,
                                    fontSize: "12px",
                                    width: "50px",
                                    wordWrap: "break-word",
                                    textAlign: "end",
                                    lineHeight: "1",
                                  }}
                                >
                                  {t("partoneBillion")}
                                  <br />
                                  {t("parttwoBillion")}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                          {/* top side light blue */}
                          <Box
                            sx={{ display: "flex", flexDirection: "column" }}
                          >
                            <Box>
                              <Typography
                                sx={{
                                  fontSize: "12px",
                                  color: Colors.dark,
                                  fontWeight: "bold",
                                  textAlign: "left",
                                  lineHeight: "1",
                                  textTransform: "uppercase",
                                }}
                              >
                                {t("charterCapital")}
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  gap: "10px",
                                }}
                              >
                                <Typography
                                  sx={{
                                    color: "rgba(54, 162, 235, 0.6)",
                                    fontSize: "32px",
                                    fontWeight: "bold",
                                    width: "auto",
                                    lineHeight: "1.1",
                                    textAlign: "left",
                                  }}
                                >
                                  {insertSpaces(
                                    item?.bankCapitals?.charterCapital || 0
                                  )}
                                </Typography>
                                <Typography
                                  sx={{
                                    color: Colors.gray,
                                    fontSize: "12px",
                                    width: "50px",
                                    wordWrap: "break-word",
                                    textAlign: "end",
                                    lineHeight: "1",
                                  }}
                                >
                                  {t("partoneBillion")}
                                  <br />
                                  {t("parttwoBillion")}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                          {/* 30318 chiqarilgan ustav kapitali */}
                          {/* bottom side dark_blue national  */}

                          <Box
                            sx={{ display: "flex", flexDirection: "column" }}
                          >
                            <Box>
                              <Typography
                                sx={{
                                  fontSize: "12px",
                                  color: Colors.dark,
                                  fontWeight: "bold",
                                  textAlign: "left",
                                  lineHeight: "1",
                                  textTransform: "uppercase",
                                }}
                              >
                                {t("reserveFundText")}
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  gap: "10px",
                                }}
                              >
                                <Typography
                                  sx={{
                                    color: "rgba(76, 0, 153, 0.7)",
                                    fontSize: "32px",
                                    fontWeight: "bold",
                                    width: "auto",
                                    lineHeight: "1.1",
                                    textAlign: "left",
                                  }}
                                >
                                  {insertSpaces(
                                    item?.bankCapitals?.reserveFund || 0
                                  )}
                                </Typography>
                                <Typography
                                  sx={{
                                    color: Colors.gray,
                                    fontSize: "12px",
                                    width: "50px",
                                    wordWrap: "break-word",
                                    textAlign: "end",
                                    lineHeight: "1",
                                  }}
                                >
                                  {t("partoneBillion")}
                                  <br />
                                  {t("parttwoBillion")}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    {/* button section  */}
                    <Box
                      className="hover-button"
                      sx={{
                        textAlign: "end",
                        position: "absolute",
                        bottom: "15px",
                        right: "15px",
                        opacity: 0, // Initially hidden
                        transition: "opacity 300ms ease", // Smooth transition for hover
                      }}
                    >
                      <Button
                        variant="contained"
                        size={"medium"}
                        onClick={
                          acceptNavigate
                            ? handleOpenAcceptModal
                            : handleOpenAuthModal
                        }
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
                {/* fourth div */}
                <Grid
                  item
                  xs={12}
                  sm={9}
                  md={6}
                  lg={4}
                  sx={{
                    height: { xs: "400px", md: "500px" },
                    width: "auto",
                    padding: "5px",
                    position: "relative",
                    "&:hover .hover-button": {
                      opacity: 1, // Show button when hovering over the box
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "5px",
                      padding: "10px",
                      display: "flex",
                      flexDirection: "column",
                      bgcolor: Colors.gray_footer,
                    }}
                  >
                    <Typography
                      sx={{
                        textAlign: "start",
                        fontWeight: "800",
                        fontSize: { xs: "12px", md: "20px" },
                      }}
                    >
                      {" "}
                      {t("firstText")}
                    </Typography>
                    {/* bottom side */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        justifyContent: "center",
                        paddingBottom: "25px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100%",
                          width: "100%",
                          gap: "20px",
                        }}
                      >
                        {/* left side roa texts */}
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                          }}
                        >
                          <Typography
                            sx={{
                              color: Colors.gray,
                              fontWeight: "normal",
                              fontSize: "42px",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              display: "block",
                              maxWidth: "100%",
                            }}
                          >
                            {t("netProfitText")}
                          </Typography>
                          <Typography
                            sx={{
                              color: Colors.gray,
                              fontWeight: "normal",
                              fontSize: "48px",
                            }}
                          >
                            ROA
                          </Typography>
                          <Typography
                            sx={{
                              color: Colors.gray,
                              fontWeight: "normal",
                              fontSize: "48px",
                            }}
                          >
                            ROE
                          </Typography>
                          <Typography
                            sx={{
                              color: Colors.gray,
                              fontWeight: "normal",
                              fontSize: "48px",
                            }}
                          >
                            CIR
                          </Typography>
                        </Box>
                        {/* right percentage */}
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "start",
                            justifyContent: "center",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              textAlign: "left",
                              height: "100%",
                              gap: "10px",
                            }}
                          >
                            <Typography
                              sx={{
                                fontWeight: "bold",
                                textAlign: "start",
                                color: Colors.blue_middle,
                                fontSize: "40px",
                              }}
                            >
                              {insertSpaces(
                                item?.bankProfitability?.netProfit || 0
                              )}
                            </Typography>
                            <Typography
                              sx={{
                                color: Colors.gray,
                                width: "auto",
                                fontStyle: "italic",
                                fontWeight: "500",
                                wordWrap: "break-word",
                                fontSize: "16px",
                                lineHeight: "1.2",
                              }}
                            >
                              {t("partoneBillion")}
                              <br />
                              {t("parttwoBillion")}
                            </Typography>
                          </Box>

                          <Typography
                            sx={{
                              color: Colors.blue_middle,
                              fontWeight: "bold",
                              fontSize: "48px",
                            }}
                          >
                            {item?.bankProfitability?.totalRoa || 0}
                            <span
                              style={{
                                color: Colors.blue_middle,
                                fontSize: "28px",
                              }}
                            >
                              %
                            </span>
                          </Typography>
                          <Typography
                            sx={{
                              color: Colors.blue_middle,
                              fontWeight: "bold",
                              fontSize: "48px",
                            }}
                          >
                            {item?.bankProfitability?.totalRoe || 0}
                            <span
                              style={{
                                color: Colors.blue_middle,
                                fontSize: "28px",
                              }}
                            >
                              %
                            </span>
                          </Typography>
                          <Typography
                            sx={{
                              color: Colors.blue_middle,
                              fontWeight: "bold",
                              fontSize: "48px",
                            }}
                          >
                            {item?.bankProfitability?.totalCir || 0}
                            <span
                              style={{
                                color: Colors.blue_middle,
                                fontSize: "28px",
                              }}
                            >
                              %
                            </span>
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    {/* button section */}
                    <Box
                      className="hover-button"
                      sx={{
                        textAlign: "end",
                        position: "absolute",
                        bottom: "15px",
                        right: "15px",
                        opacity: 0, // Initially hidden
                        transition: "opacity 300ms ease", // Smooth transition for hover
                      }}
                    >
                      <Button
                        variant="contained"
                        size={"medium"}
                    
                        onClick={() => navigate("netprofit")}
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
                {/* fifth div*/}
                <BankIncomeCard 
                    title={t("ninthText")}
                    titleone={t("partoneBillion")}
                    titletwo={t("parttwoBillion")}
                    percentageTitle={t("percentageIncomeText")}
                    nopercentageIncomeTitle={t("noPercenteageIncomeText")}
                    totalIncomes={item?.bankIncomes?.totalIncomes || 0}
                    totalIncomesPercentage={item?.bankIncomes?.totalIncomesPercentage || 0}
                    percentageIncome={item?.bankIncomes?.percentageIncome || 0}
                    nopercentageIncome={item?.bankIncomes?.nopercentageIncome || 0}
                    percentageIncomePercentage={item?.bankIncomes?.percentageIncomePercentage || 0}
                    nopercentageIncomePercentage={item?.bankIncomes?.nopercentageIncomePercentage || 0}
                    onButtonClick={acceptNavigate ? handleOpenAcceptModal : handleOpenAuthModal}
                    buttonText={t("infobutton")}
                />
                {/* sixth div */}
                <BankExpenceCard
                    title={t("thirteenth")}
                    titleone={t("partoneBillion")}
                    titletwo={t("parttwoBillion")}
                    percentageTitle={t("percentageCostText")}
                    nopercentageExpenseTitle={t("nopercentageCostText")}
                    totalExpenses={item?.bankExpenses?.totalExpenses || 0}
                    totalExpensePercentage={item?.bankExpenses?.totalExpensesPercentage || 0}
                    percentageExpense={item?.bankExpenses?.percentageCost || 0}
                    nopercentageExpense={item?.bankExpenses?.nopercentageCost || 0}
                    percentageCostPercentage={item?.bankExpenses?.percentageCostPercentage || 0}
                    nopercentageCostPercentage={item?.bankExpenses?.nopercentageCostPercentage || 0}
                    onButtonClick={acceptNavigate ? handleOpenAcceptModal : handleOpenAuthModal}
                    buttonText={t("infobutton")}
                />
              </Grid>
            ))
        )}

        <Footer />
      
        {/* <=== BEFORE AUTHORISATION MODAL ===>*/}
          <CustomModal
              open={openauthmodal}
              onClose={handleCloseAuthModal}
              bgcolor="orange"
              severity="warning"
              message={t("maintextmodal")}
            />

        {/* <=== AFTER AUTHORISATION MODAL */}
          <CustomModal
            open={openacceptmodal}
            onClose={handleCloseAcceptModal}
            bgcolor="blue"
            severity="info"
            message={t("accessmodaltext")}
          />
      </Box>
    </Container>
  );
};

export default MainPage;