import React from "react";
import Footer from "../../components/Footer/Footer";
import CssBaseline from "@mui/material/CssBaseline";
import {Container,Box} from "@mui/material";
const MainPage = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container  fixed maxWidth="xl" disableGutters>
        <Box sx={{
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
            textAlign:"center",
            height:"100%",
            bgcolor:"aquamarine"
        }}>
            {/* Header */}
            {/* Main */}
            {/* Footer */}
            <Footer />
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default MainPage;
