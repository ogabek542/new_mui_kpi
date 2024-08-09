import React from "react";
import { Container, Box, Grid, Paper } from "@mui/material";
import { Colors } from "../../styles/theme";
// IMPORT SCREENS //
import LightHeader from "../../components/LightHeader/LightHeader";
import DoughnutChart from "../../components/Doughnut/Doughnut";
import AreaChart from "../../components/AreaChart/AreaChart";
import VerticalBarChart from "../../components/VerticalBarChart/VerticalBarChart";
import HorizontalBarChart from "../../components/HorizontalBarchart/HorizontalBarchart";

const NetProfitSceen = () => {
  return (
    <Container
      fixed
      maxWidth="xl"
      disableGutters
      sx={{ px: "10px", bgcolor: Colors.white, height: "100%" }} // Full viewport height
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          height: "100%",
          my: "10px",
        }}
      >
        <LightHeader />
        <Grid container spacing={2} sx={{ width: "100%", height:"100%",gap:"10px",display:"flex",flexDirection:"column",my:"10px" }}>
          {" "}
          {/* flex: 1 allows the Grid to grow */}
          <Grid container  sx={{ height: "300px", width: "100%", }}>
            <Grid item xs={12} sm={4}>
              <Paper
                sx={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <DoughnutChart />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Paper
                sx={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AreaChart />
              </Paper>
            </Grid>
          </Grid>
          <Grid container  sx={{ height: "300px", width: "100%" }}>
            <Grid item xs={12} sm={4}>
              <Paper
                sx={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <DoughnutChart />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Paper
                sx={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AreaChart />
              </Paper>
            </Grid>
          </Grid>
          <Grid container  sx={{ height: "300px", width: "100%" }}>
            <Grid item xs={12} sm={6}>
              <Paper
                sx={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <VerticalBarChart />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper
                sx={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <HorizontalBarChart />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default NetProfitSceen;
