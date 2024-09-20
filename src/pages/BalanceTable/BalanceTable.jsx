import React, { useState } from 'react'
import { Container, Box, Typography, Button, Grid } from "@mui/material";
import { useEffect } from "react";
import { Colors } from "../../styles/theme";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
// <==== Import Components ====> //
import dayjs from "dayjs";
import "dayjs/locale/ru";
// for holidays data //
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

// change language function //
const changeLang = (value) => {
  i18n.changeLanguage(value);
};
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);



const BalanceTable = () => {


  const navigate = useNavigate();

  
  const handleNavigateKeyIndicators = () => { 
    // navigate("/keyindicatorscreen");
    navigate("/keyindicatorscreen");
  };
  const handleNavigateBalanceScreen = () => { 
    navigate("/balancescreen");
  };


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
    <Header/>
       {/* navigate div section */}
       <Box sx={{height:"55px",width:"100%",padding:"5px",bgcolor:Colors.gray_footer,marginBottom:"10px",borderRadius:"5px",display:"flex",alignItems:"center",paddingX:"10px",gap:"10px",marginTop:"10px"}}>
            <Button 
                variant="text" 
                sx={{
                  textAlign: "start", 
                  bgcolor: Colors.gray_footer, 
                  '&:hover': {
                    bgcolor: Colors.gray_footer, // Change this to your desired hover background color
                  }
                }}
              >
                <Typography sx={{fontWeight:"bold",color:Colors.blue_nbu,textTransform:"uppercase"}}>KUNLIK HISOBOTLAR</Typography>
              </Button>
              {/* <=== KEY INDEX BUTTON ====> */}
            <Button 
                variant="contained" 
                sx={{
                  textAlign: "start", 
                  bgcolor: Colors.gray_common, 
                  '&:hover': {
                    bgcolor: Colors.gray_common, // Change this to your desired hover background color
                  },
                  marginLeft:"100px",
                }}
                onClick={handleNavigateKeyIndicators}
              >
                <Typography sx={{fontWeight:"bold",textTransform:"uppercase"}}>ASOSIY KO'RSATKICHLAR</Typography>
              </Button>
              {/* <=== BALANS BUTTON ====> */}
            <Button 
                variant="contained" 
                disabled
                sx={{
                  textAlign: "start", 
                  bgcolor: Colors.gray_common, 
                  '&:hover': {
                    bgcolor: Colors.gray_common, // Change this to your desired hover background color
                  }
                }}
                onClick={handleNavigateBalanceScreen}
              >
                <Typography sx={{fontWeight:"bold",textTransform:"uppercase"}}>BALANS</Typography>
              </Button>
          </Box>
    <Typography sx={{display:"flex",alignItems:"center",justifyContent:"center",height:"100px"}}>Tez orada Malumot Yuklanadi</Typography>
    <Footer/>
  </Container>
  )
}

export default BalanceTable