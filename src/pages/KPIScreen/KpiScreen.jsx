import * as React from 'react';
import { Container, Box, CssBaseline, Drawer, AppBar, Toolbar, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText ,Grid,Paper,Typography,ToggleButton,ToggleButtonGroup, Button } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Colors } from '../../styles/theme';
// IMPORT SCREENS //
import LightHeader from '../../components/LightHeader/LightHeader';
import Footer from '../../components/Footer/Footer';
import NewMain from '../TableKPI/TableKpiScreen';
import MUIkpi from "../MUIkpiScreen/MuiKpi"
import {useRef} from "react"
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
// import Icon //
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';

const KpiScreen = () => {

  const [loader, setLoader] = React.useState(false);
  const pdfRef = useRef(null);
  

  const revertStyles = () => {
    const style = document.getElementById('pdfStyles');
    if (style) {
      style.remove();
    }
  };

    // add new changes of styles 
    const applyStylesForPDF = () => {
      const style = document.createElement('style');
      style.id = 'pdfStyles';
      style.innerHTML = `
       .formIcon {
        margin-right:15px;
       }
        .imageDiv {
          padding: 10px 50px !important;
        }
        .workerImageStyle{
          object-fit:contain;
        }
      `;
      document.head.appendChild(style);
    };


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
      width: '100%', // Ensure the container takes up 100% of the viewport width
      maxWidth: '100vw', // Ensure the container doesn't exceed the viewport width
      '@media (min-width: 1920px)': {
        maxWidth: '100%', // For extra-large screens, allow full width
      },
    }}
    
  >
      <LightHeader />
              {/* <Box sx={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <Grid container spacing={2}>
            <Grid item xs={12} sm={3} sx={{height:"100%"}}>
              <Paper elevation={3} sx={{ padding: '16px' ,height:"100%"}}>
                
              </Paper>
            </Grid>

            <Grid item xs={12} sm={9} sx={{height:"100%"}}>
              <Paper elevation={3} sx={{ padding: '16px' }}>
                
              </Paper>
            </Grid>
          </Grid>

              </Box> */}
          <Box sx={{ height: 'auto', width: '100%',my:"10px" }}>
              <Grid container spacing={0.5} sx={{ height: 'auto' }} alignItems="stretch">
                {/* Left side (3 columns) */}
                <Grid item xs={2} sm={2} sx={{ height: 'auto' }}>
                  <Paper elevation={3} sx={{ height: '100%', padding: '16px',}}>
                    <Typography variant="h6" sx={{color:Colors.nbu,fontWeight:"bold"}}>KPI</Typography>
                    {/* <List>
                          <ListItem  disablePadding>
                          <ListItemButton>
                                <ListItemIcon>
                                <InboxIcon sx={{color:Colors.nbu}}/> 
                                </ListItemIcon>
                                <ListItemText sx={{color:Colors.nbu,fontWeight:"800",textTransform:"uppercase"}}>
                                  salom
                                </ListItemText>
                          </ListItemButton>
                          </ListItem>
                            <ListItem  disablePadding>
                              <ListItemButton>
                                <ListItemIcon>
                                <InboxIcon sx={{color:Colors.nbu}}/> 
                                </ListItemIcon>
                                <ListItemText sx={{color:Colors.nbu,fontWeight:"800",textTransform:"uppercase"}}>
                                  salom
                                </ListItemText>
                              </ListItemButton>
                            </ListItem>
                          <ListItem  disablePadding>
                            <ListItemButton>
                              <ListItemIcon>
                              <InboxIcon sx={{color:Colors.nbu}}/> 
                              </ListItemIcon>
                              <ListItemText sx={{color:Colors.nbu,fontWeight:"800",textTransform:"uppercase"}}>
                                salom
                              </ListItemText>
                            </ListItemButton>
                          </ListItem>
                          <ListItem  disablePadding>
                            <ListItemButton>
                              <ListItemIcon>
                              <InboxIcon sx={{color:Colors.nbu}}/> 
                              </ListItemIcon>
                              <ListItemText sx={{color:Colors.nbu,fontWeight:"800",textTransform:"uppercase"}}>
                                salom
                              </ListItemText>
                            </ListItemButton>
                          </ListItem>
                    </List> */}
                    <Button variant="outlined" sx={{width:"100%",height:"30px",}} disabled={loader} onClick={downloadPDF} endIcon={ loader ?   <RefreshOutlinedIcon   sx={{
                            animation: 'spin 2s linear infinite',
                            '@keyframes spin': {
                              '0%': {
                                transform: 'rotate(0deg)',
                              },
                              '100%': {
                                transform: 'rotate(360deg)',
                              },
                            },
                          }}/> : <PictureAsPdfIcon />}>
                    {loader ? "печать...." : "печать"}
                    </Button>
                  </Paper>
                </Grid>
                {/* Right side (9 columns) */}
                <Grid item xs={10} sm={10} sx={{ height: 'auto',display:"block" }} ref={pdfRef}>
                  {/* KPI SCREEN */}
                  <Paper elevation={3} sx={{ height: '100%', padding: '5px',width:"100%" }}>
                    <MUIkpi/>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
      <Footer />
    </Container>
  );
};

export default KpiScreen;
