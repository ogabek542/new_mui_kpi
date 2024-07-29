import React from "react";
import Footer from "../../components/Footer/Footer";
import CssBaseline from "@mui/material/CssBaseline";
import { Container, Box,Typography } from "@mui/material";

const MainPage = () => {
  return (
        <Container fixed maxWidth="xl" disableGutters>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              minHeight: "100%", // Make sure the Box takes the full viewport height
              bgcolor: "aquamarine",
            }}
          >
            {/* Header */}
            {/* Main */}
            <Footer />
          </Box>
        </Container>

  );
};

export default MainPage;
