import React from "react";
import {
  Container,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { Colors } from "../../styles/theme";
import { useNavigate } from "react-router-dom";
import { useEffect, useCallback } from "react";
import { useState } from "react";
import { REQUESTS } from "../../api/requests";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { logout } from "../../store/slice/userSlice";
import { useReduxDispatch } from "../../hooks/useReduxHook";

import { useTranslation } from "react-i18next";
import i18n from "i18next";

import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const NewTestScreen = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [userdata, setUserData] = React.useState([]);
  const [barlogin, setBarlogin] = React.useState(true);
  const dispatch = useReduxDispatch();

  const handleOpenKPI = () => {
    navigate("/kpidashboard");
  };

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

    getUserData();
  }, [setUserData]);
  // <=== LOG OUT FUNCTION ====> /
  const handleLogOut = useCallback(() => {
    dispatch(logout());
    navigate("/");
    localStorage.clear();
  }, [dispatch]);

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
          py: { xs: "5px", sm: "5px", md: "5px" },
          lineHeight: "1",
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "row",
          },
        }}
      >
        <Button
          variant="text"
          sx={{ display: { xs: "none", sm: "none", md: "block" } }}
        >
          <Typography
            sx={{
              fontWeight: "800",
              fontSize: { xs: "10px", sm: "14px", md: "14px", lg: "16px" },
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: { xs: "0px", md: "5px" },
            }}
          >
            <Typography
              variant="text"
              sx={{
                fontSize: { xs: "10px", md: "14px", lg: "16px" },
                fontWeight: "400",
                color: Colors.green_dark,
                textTransform: "uppercase",
              }}
            >
              {t("welcomekpi")}
            </Typography>
            <Typography
              variant="text"
              sx={{
                fontSize: {
                  xs: "10px",
                  md: "14px",
                  lg: "18px",
                  textTransform: "uppercase",
                },
                fontWeight: "800",
                color: Colors.green_dark,
              }}
            >
              {userdata ? userdata.name : "no exist name"}
            </Typography>
          </Box>
        </Box>
        {/* <=== ENTER KPI SCREEN BUTTON ===> */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: Colors.green_dark,
              "&:hover": {
                bgcolor: Colors.green_dark, // Set hover background color to be the same as default
              },
            }}
          >
            <Typography
              sx={{
                fontWeight: "800",
                fontSize: { xs: "10px", md: "14px", lg: "16px" },
                lineHeight: "1",
                color: Colors.white,
                textTransform: "uppercase",
              }}
              onClick={handleOpenKPI}
            >
              {t("resultkpi")}
            </Typography>
          </Button>
          {/* <=== LOGOUT BUTTON ====> */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: Colors.nbu,
              "&:hover": {
                bgcolor: Colors.nbu, // Set hover background color to be the same as default
              },
            }}
          >
            <Typography
              sx={{
                fontWeight: "800",
                fontSize: { xs: "10px", md: "14px", lg: "16px" },
                lineHeight: "1",
                color: Colors.white,
                textTransform: "uppercase",
              }}
              onClick={handleLogOut}
            >
              {t("close")}
            </Typography>
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NewTestScreen;
