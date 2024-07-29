import React from "react";
import {  Box, Typography, Stack, Divider } from "@mui/material";
import StatisticImage from "../../assets/photo/restStatistik.png";
import NBUSVG from "../../assets/svg/newForSVG.svg"
import { Colors } from "../../styles/theme";

const Footer = () => {
  return (
        <Stack
        direction="column"
        sx={{ width: "100%", height: "235px", gap: "10px", padding: "10px" }}
        >
        <Box sx={{ bgcolor: "red", mx: "10px" }}>
            <Typography>footer top</Typography>
        </Box>
        <Divider
            orientation="horizontal"
            variant="middle"
            sx={{ color: "blue" }}
            flexItem
        />
        <Box sx={{ mx: "10px",display:"flex",alignItems:"center",justifyContent:"space-between" }}>

            <Box sx={{display:"flex",alignItems:"baseline",justifyContent:"space-between",gap:"5px"}}>
            <Box
                component="img"
                src={NBUSVG}
                alt="statistic_fake_image"
                sx={{ width:"25px",cursor:"pointer",}}
                
            /> 
            <Typography variant="h1" color={Colors.nbu} >NBU</Typography>
            </Box>
            <Typography variant="h5" color={Colors.nbu} >© 2023-2024 “ЎЗМИЛЛИЙБАНК” АЖ БУХГАЛТЕРИЯ ҲИСОБИ ВА МОЛИЯВИЙ МЕНЕЖМЕНТ ДЕПАРТАМЕНТИ</Typography>
            <Box
                component="img"
                src={StatisticImage}
                alt="statistic_fake_image"
                sx={{ width: "100px", height: "auto",cursor:"pointer"}}
            />
        </Box>
        </Stack>
  );
};

export default Footer;
