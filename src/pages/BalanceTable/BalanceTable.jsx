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
    {/* <Typography sx={{display:"flex",alignItems:"center",justifyContent:"center",height:"100px"}}>Tez orada Malumot Yuklanadi</Typography> */}
          <Box sx={{marginTop:"10px",marginBottom:"25px"}}>
                  {/* Table Header Div  */}
                <Grid
                  container
                  sx={{
                    borderBottom: `2px solid ${Colors.gray_back}`,
                    borderRight: `2px solid ${Colors.gray_back}`,
                    height: "85px",
                    // bgcolor: Colors.blue_tableheader_light,
                    position: "sticky",
                    top: 0,
                    borderTopLeftRadius:"8px",
                    borderTopRightRadius:"8px"
                  }}
                >
                  {/* N */}
                  <Grid
                    item
                    xs={0.4}
                    sx={{
                      borderRight: `3px solid ${Colors.gray_back}`,
                      // borderLeft: `2px solid ${Colors.gray_back}`,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.4) inset ",
                      bgcolor: Colors.blue_tableheader_light,
                      borderTopLeftRadius:"5px",
                      borderTopRightRadius:"5px",
                    }}
                  >
                    <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight:"bold",
                        padding:"5px",
                        fontSize:"14px",
                      }}
                    >
                      №
                    </Typography>
                  </Grid>
                    {/* name div  */}
                  <Grid
                    item
                    xs={4.2}
                    sx={{ 
                      borderRight: `3px solid ${Colors.gray_back}`,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontWeight: "bold",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.4) inset ",
                      bgcolor: Colors.blue_tableheader_light,
                      borderTopLeftRadius:"5px",
                      borderTopRightRadius:"5px",
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        px: "5px",
                        overflowWrap: "break-word",
                        wordBreak: "break-all",
                        fontWeight: "bold",
                        padding:"5px",
                      }}
                    >
                      Статьи баланса
                    </Typography>
                  </Grid>
                  {/* equal 1-div */}
                  <Grid
                    item
                    xs={1.2}
                    sx={{
                      borderRight: `2px solid ${Colors.gray_back}`,
                      display: "flex",
                      justifyContent: "center",
                      textAlign: "center",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3) inset ",
                      bgcolor: Colors.blue_tableheader_light,
                      borderTopLeftRadius:"5px",
                      borderTopRightRadius:"5px",
                    }}
                  >
                      <Typography
                      component="span"
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        px: "5px",
                        height: "auto",
                        overflowWrap: "break-word",
                        wordBreak: "break-all",
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding:"5px",
                      }}
                    >
                      в национальной валюте
                    </Typography>
                  </Grid>
                  {/* equal 2-div */}
                  <Grid
                    item
                    xs={1.2}
                    sx={{
                      borderRight: `2px solid ${Colors.gray_back}`,
                      display: "flex",
                      justifyContent: "center",
                      textAlign: "center",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3) inset ",
                      bgcolor: Colors.blue_tableheader_light,
                      borderTopLeftRadius:"5px",
                      borderTopRightRadius:"5px",
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        px: "5px",
                        height: "auto",
                        overflowWrap: "break-word",
                        wordBreak: "break-all",
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding:"5px",
                      }}
                    >
                      (%) соотношение от всего баланса


                    </Typography>
                  </Grid>
                  {/* equal 3-div */}
                  <Grid
                    item
                    xs={1.2}
                    sx={{
                      borderRight: `2px solid ${Colors.gray_back}`,
                      display: "flex",
                      justifyContent: "center",
                      textAlign: "center",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2) inset ",
                      bgcolor:Colors.green_tablerow_light,
                      borderTopLeftRadius:"5px",
                      borderTopRightRadius:"5px",
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        px: "5px",
                        height: "auto",
                        overflowWrap: "break-word",
                        wordBreak: "break-all",
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding:"5px",
                      }}
                    >
                      в иностранной валюте (эквивалент)
                    </Typography>
                  </Grid>
                  {/* equal 4-div */}
                  <Grid
                    item
                    xs={1.2}
                    sx={{
                      borderRight: `2px solid ${Colors.gray_back}`,
                      display: "flex",
                      justifyContent: "center",
                      textAlign: "center",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3) inset ",
                      padding:"5px",
                      bgcolor:Colors.green_tablerow_light,
                      borderTopLeftRadius:"5px",
                      borderTopRightRadius:"5px",
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "auto",
                        overflowWrap: "break-word",
                        wordBreak: "break-all",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      (%) соотношение от всего баланса
                    </Typography>
                  </Grid>
                  {/* equal 5-div */}
                  <Grid
                    item
                    xs={1.3}
                    sx={{
                      borderRight: `2px solid ${Colors.gray_back}`,
                      display: "flex",
                      justifyContent: "center",
                      textAlign: "center",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3) inset ",
                      bgcolor:Colors.green_tablerow_light,
                      borderTopLeftRadius:"5px",
                      borderTopRightRadius:"5px",
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "auto",
                        overflowWrap: "break-word",
                        wordBreak: "break-all",
                        fontSize: "12px",
                        fontWeight: "900",
                        textTransform:"uppercase",
                        padding:"5px",
                      }}
                    >
                      в иностранной валюте (экв. В тыс.дол.США)
                    </Typography>
                  </Grid>
                  {/* equal 6-div */}
                  <Grid
                    item
                    xs={1.2}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      textAlign: "center",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.4) inset ",
                      bgcolor: Colors.blue_tableheader_light,
                      borderTopLeftRadius:"5px",
                      borderTopRightRadius:"5px",
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "auto",
                        overflowWrap: "break-word",
                        wordBreak: "break-all",
                        fontSize: "16px",
                        fontWeight: "bold",
                        textTransform:"uppercase",
                        padding:"5px",
                      }}
                    >
                      ВСЕГО
                    </Typography>
                  </Grid>
                
                </Grid>
                {/* row section */}
                <Grid
                  container
                  sx={{
                    borderBottom: `2px solid ${Colors.gray_back}`,
                    borderRight: `2px solid ${Colors.gray_back}`,
                    height: "50px",
                    // bgcolor: Colors.blue_tableheader_light,
                    top: 0,
                    }}
                >
                  {/* N INDEX */}
                  <Grid
                    item
                    xs={0.4}
                    sx={{
                      borderRight: `3px solid ${Colors.gray_back}`,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      // boxShadow: "0px 1px 6px rgba(0, 0, 0, 0.4) inset ",
                      bgcolor: Colors.white,
                    }}
                  >
                    <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight:"bold",
                        padding:"5px",
                        fontSize:"14px",
                      }}
                    >
                      1.2.3
                    </Typography>
                  </Grid>
                    {/* name div  */}
                  <Grid
                    item
                    xs={4.2}
                    sx={{ 
                      borderRight: `3px solid ${Colors.gray_back}`,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontWeight: "bold",
                      // boxShadow: "0px 1px 6px rgba(0, 0, 0, 0.1) inset ",
                      bgcolor: Colors.white,
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        width: "100%",
                        px: "5px",
                        overflowWrap: "break-word",
                        wordBreak: "break-all",
                        fontWeight: "bold",
                        padding:"5px",
                        fontSize:"13px"
                      }}
                    >
                      Инвестиции в долговые ценные бумаги, удерживаемые до погашения, чистые (15900)

                    </Typography>
                  </Grid>
                  {/* equal 1-div */}
                  <Grid
                    item
                    xs={1.2}
                    sx={{
                      borderRight: `2px solid ${Colors.gray_back}`,
                      display: "flex",
                      justifyContent: "flex-end",
                      textAlign: "center",
                      // boxShadow: "0px 1px 6px rgba(0, 0, 0, 0.4) inset ",
                      bgcolor: Colors.white,
                    }}
                  >
                      <Typography
                      component="span"
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        px: "5px",
                        height: "auto",
                        overflowWrap: "break-word",
                        wordBreak: "break-all",
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding:"5px",
                      }}
                    >
                           816 354.20

                    </Typography>
                  </Grid>
                  {/* equal 2-div */}
                  <Grid
                    item
                    xs={1.2}
                    sx={{
                      borderRight: `2px solid ${Colors.gray_back}`,
                      display: "flex",
                      justifyContent: "flex-end",
                      textAlign: "center",
                      // boxShadow: "0px 1px 6px rgba(0, 0, 0, 0.4) inset ",
                      bgcolor: Colors.white,
                    }}
                  >
                      <Typography
                      component="span"
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        px: "5px",
                        height: "auto",
                        overflowWrap: "break-word",
                        wordBreak: "break-all",
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding:"5px",
                      }}
                    >
                          35,47%
                    </Typography>
                  </Grid>
                  {/* equal 3-div */}
                  <Grid
                    item
                    xs={1.2}
                    sx={{
                      borderRight: `2px solid ${Colors.gray_back}`,
                      display: "flex",
                      justifyContent: "flex-end",
                      textAlign: "center",
                      // boxShadow: "0px 1px 6px rgba(0, 0, 0, 0.4) inset ",
                      bgcolor: Colors.white,
                    }}
                  >
                      <Typography
                      component="span"
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        px: "5px",
                        height: "auto",
                        overflowWrap: "break-word",
                        wordBreak: "break-all",
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding:"5px",
                      }}
                    >
                              1 485 429.20
                    </Typography>
                  </Grid>
                  {/* equal 4-div */}
                  <Grid
                    item
                    xs={1.2}
                    sx={{
                      borderRight: `2px solid ${Colors.gray_back}`,
                      display: "flex",
                      justifyContent: "flex-end",
                      textAlign: "center",
                      // boxShadow: "0px 1px 6px rgba(0, 0, 0, 0.4) inset ",
                      bgcolor: Colors.white,
                    }}
                  >
                      <Typography
                      component="span"
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        px: "5px",
                        height: "auto",
                        overflowWrap: "break-word",
                        wordBreak: "break-all",
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding:"5px",
                      }}
                    >
                          64,53%
                    </Typography>
                  </Grid>
                  {/* equal 5-div */}
                  <Grid
                    item
                    xs={1.3}
                    sx={{
                      borderRight: `2px solid ${Colors.gray_back}`,
                      display: "flex",
                      justifyContent: "flex-end",
                      textAlign: "center",
                      // boxShadow: "0px 1px 6px rgba(0, 0, 0, 0.4) inset ",
                      bgcolor: Colors.white,
                    }}
                  >
                      <Typography
                      component="span"
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        px: "5px",
                        height: "auto",
                        overflowWrap: "break-word",
                        wordBreak: "break-all",
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding:"5px",
                      }}
                    >
                              116 506.54
                    </Typography>
                  </Grid>
                  {/* equal 6-div */}
                  <Grid
                    item
                    xs={1.2}
                    sx={{
                      // borderRight: `2px solid ${Colors.gray_back}`,
                      display: "flex",
                      justifyContent: "flex-end",
                      textAlign: "center",
                      // boxShadow: "0px 1px 6px rgba(0, 0, 0, 0.4) inset ",
                      bgcolor: Colors.white,
                    }}
                  >
                      <Typography
                      component="span"
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        px: "5px",
                        height: "auto",
                        overflowWrap: "break-word",
                        wordBreak: "break-all",
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding:"5px",
                      }}
                    >
                              2 301 783.40
                    </Typography>
                  </Grid>
                
                </Grid>
              
          </Box>
        
    <Footer />
  </Container>
  )
}

export default BalanceTable