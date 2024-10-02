import * as React from "react";
import {
  Container,
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Autocomplete,
  TextField,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Colors } from "../../styles/theme";
// IMPORT SCREENS //
import LightHeader from "../../components/LightHeader/LightHeader";
import Footer from "../../components/Footer/Footer";
import NewMain from "../TableKPI/TableKpiScreen";
import MUIkpi from "../MUIkpiScreen/MuiKpi";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
// import Icon //
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import { useTranslation } from "react-i18next";
import { Outlet, useNavigate } from "react-router-dom";

const KpiScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [loader, setLoader] = React.useState(false);
  const pdfRef = useRef(null);

  const revertStyles = () => {
    const style = document.getElementById("pdfStyles");
    if (style) {
      style.remove();
    }
  };

  const userListData = [
    { title: "no name1", id: 1 },
    { title: "no name2", id: 2 },
    { title: "no name3", id: 3 },
    { title: "no name4", id: 4 },
    { title: "no name5", id: 5 },
    { title: "no name6", id: 6 },
  ];

  const [value, setValue] = React.useState();
  const [workerValue, setWorkerValue] = React.useState(null);

  const downloadPDF = () => {
    // Apply the styles for PDF
    // applyStylesForPDF();

    // Create a temporary container to combine the content
    const tempContainer = document.createElement("div");
    // Move it out of the view
    document.body.appendChild(tempContainer);

    // Select and clone elements
    const elementsToCapture = document.querySelectorAll(".pdf_container");
    elementsToCapture.forEach((element) => {
      tempContainer.appendChild(element.cloneNode(true));
    });

    setLoader(true);

    // Calculate the full height of the combined content
    const capture = tempContainer;
    capture.style.height = "auto";

    html2canvas(pdfRef.current, { scale: 2, useCORS: true, logging: true })
      .then((canvas) => {
        console.log("Canvas created");
        const imgData = canvas.toDataURL("image/png");
        const doc = new jsPDF("l", "mm", "a4");
        const pageHeight = doc.internal.pageSize.getHeight();
        const pageWidth = doc.internal.pageSize.getWidth();
        const imgProps = doc.getImageProperties(imgData);
        const imgHeight = (imgProps.height * pageWidth) / imgProps.width;

        doc.addImage(imgData, "PNG", 0, 0, pageWidth, imgHeight);
        setLoader(false);
        doc.save("USER_KPI_PDF.pdf");

        revertStyles();
      })
      .catch((error) => {
        console.error("Error during PDF generation:", error);
        setLoader(false);
        revertStyles();
      });
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
      <LightHeader />

      <Box sx={{ height: "auto", width: "100%", my: "10px" }}>
        <Grid
          container
          spacing={0.5}
          sx={{ height: "auto" }}
          alignItems="stretch"
        >
          {/* Left side (3 columns) */}
          <Grid item xs={2} sm={2} sx={{ height: "auto" }}>
            <Paper elevation={3} sx={{ height: "100%", padding: "16px" }}>
              <Typography
                variant="h6"
                sx={{ color: Colors.nbu, fontWeight: "bold" }}
              >
                KPI
              </Typography>
              {/* <==== USER SELECT SECTION =====> */}
              <Autocomplete
                options={userListData}
                sx={{ width: "100%", height: "20px", my: 4, padding: "0px" }}
                getOptionLabel={(option) => option.title}
                value={workerValue}
                onChange={(event, newValue) => {
                  setWorkerValue(newValue); // Update the workerValue state
                  setValue(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Выбор сотрудник"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#083473", // Default border color
                        },
                        "&:hover fieldset": {
                          borderColor: "#083473", // Border color on hover
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#083473", // Border color when focused
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "#083473", // Default label color
                        "&.Mui-focused": {
                          color: "#083473", // Label color when focused
                        },
                      },
                    }}
                  />
                )}
              />
              {/* <== PRESS DPF FILE BUTTON ===> */}
              <Button
                variant="outlined"
                sx={{
                  width: "100%",
                  height: "30px",
                  marginTop: "15px",
                  borderColor: "#083473", // Button border color
                  color: "#083473", // Button text and icon color
                  "&:hover": {
                    borderColor: "#083473", // Border color on hover
                    backgroundColor: "rgba(8, 52, 115, 0.04)", // Optional: Light blue background on hover
                  },
                }}
                disabled={loader}
                onClick={downloadPDF}
                endIcon={
                  loader ? (
                    <RefreshOutlinedIcon
                      sx={{
                        color: "#083473", // Icon color
                        animation: "spin 2s linear infinite",
                        "@keyframes spin": {
                          "0%": {
                            transform: "rotate(0deg)",
                          },
                          "100%": {
                            transform: "rotate(360deg)",
                          },
                        },
                      }}
                    />
                  ) : (
                    <PictureAsPdfIcon sx={{ color: "#083473" }} /> // Icon color
                  )
                }
              >
                {loader ? t("printing") : t("print")}
              </Button>
                {/* <==== USER SEND EXCEL FILE BUTTON ====> */}
                <Button
                      onClick={() => navigate("kpidailiyworktable")}
                      variant="outlined"
                      sx={{
                        width: "100%",
                        height: "30px",
                        marginTop: "15px",
                        borderColor: "#083473", // Button border color
                        color: "#083473", // Button text and icon color
                        "&:hover": {
                          borderColor: "#083473", // Border color on hover
                          backgroundColor: "rgba(8, 52, 115, 0.04)", // Optional: Light blue background on hover
                        },
                      }}>
                    {t("send_excel")}
                  </Button>
            </Paper>
          </Grid>
          {/* Right side (9 columns) */}
          <Grid
            item
            xs={10}
            sm={10}
            sx={{ height: "auto", display: "block" }}
            ref={pdfRef}
          >
            {/* KPI SCREEN */}
            <Paper
              elevation={3}
              sx={{ height: "100%", padding: "5px", width: "100%" }}
            >
              {/* <==== SCREEN NAVIGATION ====> */}
              <Outlet />
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Container>
  );
};

export default KpiScreen;
