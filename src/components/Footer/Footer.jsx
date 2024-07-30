import React from "react";
import { Box, Typography, Stack, Divider, Grid } from "@mui/material";
import StatisticImage from "../../assets/photo/restStatistik.png";
import NBUSVG from "../../assets/svg/newForSVG.svg";
import { Colors } from "../../styles/theme";
import { motion } from "framer-motion";
// MUI icons //
import CallIcon from "@mui/icons-material/Call";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import PlaceIcon from "@mui/icons-material/Place";

const Footer = () => {
  return (
    <Stack
      direction="column"
      sx={{ width: "100%", height: "235px", gap: "10px", padding: "10px" }}
    >
      <Box sx={{ mx: "10px", p: "10px" }}>
        <Grid
          container
          spacing={1}
          alignItems="center"
          justifyContent="space-around"
        >
          {/* first grid item */}
          <Grid item xs={12} sm={6} md={3}>
            <motion.div whileHover={{ scale: 0.9 }}>
              <Box
                sx={{
                  bgcolor: Colors.blue_box,
                  height: "100px",
                  borderRadius: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  padding: "5px",
                }}
                color={Colors.blue_nbu}
              >
                <CallIcon sx={{ color: Colors.blue_nbu }} />
                <Divider
                  orientation="vertical"
                  variant="middle"
                  color={Colors.nbu}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left",
                  }}
                >
                  <Typography sx={{}} color={Colors.dark}>Контакт маркази</Typography>
                  <Typography>1669</Typography>
                  <Typography>+998903299295</Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>
          {/* second grid item */}
          <Grid item xs={12} sm={6} md={3}>
            <motion.div whileHover={{ scale: 0.9 }}>
              <Box
                sx={{
                  bgcolor: Colors.blue_box,
                  height: "100px",
                  borderRadius: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  padding: "5px",
                }}
                color={Colors.blue_nbu}
              >
                <AlternateEmailIcon sx={{ color: Colors.blue_nbu }} />
                <Divider
                  orientation="vertical"
                  variant="middle"
                  color={Colors.nbu}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left",
                  }}
                >
                  <Typography sx={{}}  color={Colors.dark}>Корпоратив мурожаатлар учун</Typography>
                  <Typography>U_Rajabov@nbu.uz</Typography>
                  <Typography>webmaster@nbu.uz</Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>
          {/* third grid item */}
          <Grid item xs={12} sm={6} md={3}>
            <motion.div whileHover={{ scale: 0.9 }}>
              <Box
                sx={{
                  bgcolor: Colors.blue_box,
                  height: "100px",
                  borderRadius: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  padding: "5px",
                }}
                color={Colors.blue_nbu}
              >
                <QuestionAnswerIcon sx={{ color: Colors.blue_nbu,fontSize:"32px" }} />
                <Divider
                  orientation="vertical"
                  variant="middle"
                  color={Colors.nbu}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left",
                  }}
                >
                  <Typography sx={{}}  color={Colors.dark}>Мурожаатлар регламенти</Typography>
                  <Typography>
                    Душанба-жума кунлари 
                  </Typography>
                  <Typography>соат 9:00 дан 18:00 гача</Typography>
                  <Typography>Тушлик: 13:00 дан 14:00 гача</Typography>
                  {/* <Typography >
                  Душанба-жума кунлари соат 9:00 дан 18:00 гача Тушлик: 13:00 дан 14:00 гача
                  </Typography> */}
                </Box>
              </Box>
            </motion.div>
          </Grid>
          {/* fouth grid item */}
          <Grid item xs={12} sm={6} md={3}>
            <motion.div whileHover={{ scale: 0.9 }}>
              <Box
                sx={{
                  bgcolor: Colors.blue_box,
                  height: "100px",
                  borderRadius: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  padding: "5px",
                }}
                color={Colors.blue_nbu}
              >
                <PlaceIcon sx={{ color: Colors.blue_nbu }} />
                <Divider
                  orientation="vertical"
                  variant="middle"
                  color={Colors.nbu}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left",
                  }}
                >
                  <Typography sx={{}}  color={Colors.dark}>Манзил</Typography>
                  <Typography>100084. Ўзбекистон Республикаси,</Typography>
                  <Typography>Тошкент ш.,Амир Темур шоҳ кўчаси </Typography>
                  <Typography>101-уй</Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
      {/* diver of footer's top and bottom side */}
      <Divider
        orientation="horizontal"
        variant="middle"
        flexItem
        color={Colors.nbu}
      />
      {/* Footer bottom side  */}
      <Box
        sx={{
          mx: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: "5px",
          }}
        >
          <Box
            component="img"
            src={NBUSVG}
            alt="statistic_fake_image"
            sx={{
              width: {
                xs: "14px",
                sm: "16px",
                md: "18px",
                lg: "20px",
                xl: "25px",
              },
              cursor: "pointer",
            }}
          />
          <Typography
            variant="h1"
            color={Colors.nbu}
            sx={{
              fontSize: { xs: "16px", md: "22px", lg: "28px", xl: "32px" },
            }}
          >
            NBU
          </Typography>
        </Box>
        <Typography
          variant="h5"
          color={Colors.nbu}
          sx={{
            fontWeight: "500",
            fontSize: {
              xs: "8px",
              sm: "10px",
              md: "12px",
              lg: "14px",
              xl: "16px",
            },
          }}
        >
          © 2023-2024 “ЎЗМИЛЛИЙБАНК” АЖ БУХГАЛТЕРИЯ ҲИСОБИ ВА МОЛИЯВИЙ МЕНЕЖМЕНТ
          ДЕПАРТАМЕНТИ
        </Typography>
        <Box
          component="img"
          src={StatisticImage}
          alt="statistic_fake_image"
          sx={{
            width: {
              xs: "50px",
              sm: "60px",
              md: "70px",
              lg: "80px",
              xl: "100px",
            },
            height: "auto",
            cursor: "pointer",
          }}
        />
      </Box>
    </Stack>
  );
};

export default Footer;
