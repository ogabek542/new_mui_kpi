import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import { Colors } from "../../styles/theme";

const CustomGridTable = ({ data }) => {
  return (
    <Box
      sx={{
        border: "1px solid black",
        width: "95  %",
        height: "800px",
        margin: "15px",
      }}
    >
      <Grid
        container
        sx={{
          borderBottom: "1px solid #000",
          textAlign: "center",
          bgcolor: Colors.blue_light_ultra,
        }}
      >
        <Grid
          item
          xs={0.5}
          sx={{
            borderRight: "1px solid #000",
            height: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>KOD</Typography>
        </Grid>
        <Grid
          item
          xs={3.5}
          sx={{
            borderRight: "1px solid #000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>Filial Name</Typography>
        </Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography
            sx={{ fontWeight: "bold", borderBottom: "1px solid #000" }}
          >
            Fact
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>Fact</Typography>
        </Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography
            sx={{ fontWeight: "bold", borderBottom: "1px solid #000" }}
          >
            Fact
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>Fact</Typography>
        </Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography
            sx={{ fontWeight: "bold", borderBottom: "1px solid #000" }}
          >
            Plan
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>Plan</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography
            sx={{ fontWeight: "bold", borderBottom: "1px solid #000" }}
          >
            Plan
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>Plan</Typography>
        </Grid>
      </Grid>
      {/* <== gird rows ==> */}
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        <Grid item xs={0.5} sx={{ borderRight: "1px solid #000" }}>
        <Typography sx={{ fontWeight: "bold",display: "flex",
            justifyContent: "center",
            alignItems: "center", }}>40</Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}></Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 40 */}
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        <Grid item xs={0.5} sx={{ borderRight: "1px solid #000" }}>
        <Typography sx={{ fontWeight: "bold",display: "flex",
            justifyContent: "center",
            alignItems: "center", }}>30</Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}></Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 80 */}
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        <Grid item xs={0.5} sx={{ borderRight: "1px solid #000" }}>
        <Typography sx={{ fontWeight: "bold",display: "flex",
            justifyContent: "center",
            alignItems: "center", }}>80</Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}></Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 90 */}
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        <Grid item xs={0.5} sx={{ borderRight: "1px solid #000" }}>
        <Typography sx={{ fontWeight: "bold",display: "flex",
            justifyContent: "center",
            alignItems: "center", }}>90</Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}></Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 110 */}
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        <Grid item xs={0.5} sx={{ borderRight: "1px solid #000" }}>
        <Typography sx={{ fontWeight: "bold",display: "flex",
            justifyContent: "center",
            alignItems: "center", }}>110</Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}></Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 120 */}
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        <Grid item xs={0.5} sx={{ borderRight: "1px solid #000" }}>
        <Typography sx={{ fontWeight: "bold",display: "flex",
            justifyContent: "center",
            alignItems: "center", }}>120</Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}></Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 140 */}
      <Grid container sx={{ borderBottom: "1px solid #000",bgcolor:Colors.blue_light_ultra }}>
        <Grid item xs={0.5} sx={{ borderRight: "1px solid #000" }}>
        <Typography sx={{ fontWeight: "bold",display: "flex",
            justifyContent: "center",
            alignItems: "center", }}>140</Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}></Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" ,fontWeight: "bold"}}>
            1
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase",fontWeight: "bold" }}>
            1
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase",fontWeight: "bold" }}>
            1
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase",fontWeight: "bold" }}>
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 160 */}
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        <Grid item xs={0.5} sx={{ borderRight: "1px solid #000" }}>
        <Typography sx={{ fontWeight: "bold",display: "flex",
            justifyContent: "center",
            alignItems: "center", }}>160</Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}></Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 170 */}
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        <Grid item xs={0.5} sx={{ borderRight: "1px solid #000" }}>
        <Typography sx={{ fontWeight: "bold",display: "flex",
            justifyContent: "center",
            alignItems: "center", }}>170</Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}></Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 180 */}
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        <Grid item xs={0.5} sx={{ borderRight: "1px solid #000" }}>
        <Typography sx={{ fontWeight: "bold",display: "flex",
            justifyContent: "center",
            alignItems: "center", }}>180</Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}></Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 200 */}
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        <Grid item xs={0.5} sx={{ borderRight: "1px solid #000" }}>
        <Typography sx={{ fontWeight: "bold",display: "flex",
            justifyContent: "center",
            alignItems: "center", }}>200</Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}></Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 210 */}
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        <Grid item xs={0.5} sx={{ borderRight: "1px solid #000" }}>
        <Typography sx={{ fontWeight: "bold",display: "flex",
            justifyContent: "center",
            alignItems: "center", }}>210</Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}></Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 230 */}
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        <Grid item xs={0.5} sx={{ borderRight: "1px solid #000" }}>
        <Typography sx={{ fontWeight: "bold",display: "flex",
            justifyContent: "center",
            alignItems: "center", }}>230</Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}></Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" }}>
            1
          </Typography>
        </Grid>
      </Grid>
      {/* 240 */}
      <Grid container sx={{ borderBottom: "1px solid #000",bgcolor:Colors.blue_light_ultra }}>
        <Grid item xs={0.5} sx={{ borderRight: "1px solid #000" }}>
        <Typography sx={{ fontWeight: "bold",display: "flex",
            justifyContent: "center",
            alignItems: "center", }}>240</Typography>
        </Grid>
        <Grid item xs={3.5} sx={{ borderRight: "1px solid #000" }}></Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase" ,fontWeight: "bold"}}>
            1
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase",fontWeight: "bold" }}>
            1
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase",fontWeight: "bold" }}>
            1
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ borderRight: "1px solid #000" }}>
          <Typography component="span" sx={{ fontStyle: "uppercase",fontWeight: "bold" }}>
            1
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomGridTable;
