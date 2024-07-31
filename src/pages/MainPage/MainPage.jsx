import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Container, Box, Typography } from "@mui/material";

const MainPage = () => {
  return (
        <Container fixed maxWidth="xl" disableGutters sx={{px:"10px"}}>
          
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              height: "100%", // Make sure the Box takes the full viewport height
            }}
          >
            <Header   />
            {/* Main */}
            <Box>
              <Typography>MAin Section</Typography>
            </Box>
            <Footer />
          </Box>
        </Container>

  );
};

export default MainPage;
