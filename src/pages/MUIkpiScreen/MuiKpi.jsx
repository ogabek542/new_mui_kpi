import React from 'react'
import { Container, Box,Grid,Paper,Typography} from '@mui/material';
// IMPORT IMAGE //
import DefaultImage from "../../assets/photo/defaultphoto.jpg"
// IMPORT COLORS //
import { Colors } from '../../styles/theme';
// IMPORT CIRCLEPROGRESSBAR //
import CircularProgressBarWithPercentage from "../../components/CircleProgress/CircleProgressBar"



const MuiKpi = () => {
// elements //
const [validImage, setValidIMage] = React.useState();




// const newDefaultImage = DefaultImage;

    // const imageUrl = `http://10.8.88.91:8000${data.photo_url}`;
  
    // fetch(imageUrl)
    //   .then((response) => {
    //     if (response.ok) {
    //       console.log("The image exists and is accessible.");
    //       setValidIMage(true);
    //     } else {
    //       console.log("The image does not exist or is not accessible.");
    //       setValidIMage(false);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching the image:", error);
    //   });

  return (
    <Box sx={{width:"100%",height:"100%",padding:"5px"}}>
        {/* HEADER SECTION OF KPI SCREEN .. USER DATAS IN HERE */}
        <header>
            <Grid container sx={{width:"100%",height:"200px",}}>
                <Grid item xs={2.5} lg={2.5} sx={{padding:"5px",}}>
                    <Box sx={{width:"100%",height:"100%",borderRadius:"5px",border:"1px solid gray"}}>
                    {/* <Box
                        component="img"
                        src={validImage ? imageUrl : newDefaultImage}
                        alt={validImage ? 'worker_image' : 'default_image'}
                        sx={{ width: "px", height: "100px" }} 
                        /> */}
                    </Box>
                </Grid>
                <Grid item lg={7} sx={{padding:"5px"}}>
                    <Box sx={{width:"100%",height:"100%",borderRadius:"5px",border:"1px solid gray",padding:"4px",display:"flex",flexDirection:"column",gap:"2px"}}>
                        {/* USER NAME */}
                        <Typography sx={{textTransform:"uppercase",color:Colors.dark,fontWeight:"800"}}>g'iyosova aziza shuxrat qizi</Typography>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid gray",lineHeight:"0px",marginTop:"5px"}}>
                            {/* LEFT SIDE USRT DATA TEXT */}
                            <Typography sx={{fontSize:"12px",textTransform:"uppercase"}}>ФИЛИАЛ/ГО</Typography>
                            {/* RIGHT SIDE USRT DATA TEXT */}
                            <Typography sx={{fontSize:"12px",fontWeight:"bold"}}>Golovnoy ofis</Typography>
                        </Box>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid gray",lineHeight:"0px"}}>
                            {/* LEFT SIDE USRT DATA TEXT */}
                            <Typography sx={{fontSize:"12px",textTransform:"uppercase"}}>ВСП (ОПЕРУ/БХМ/БХО)</Typography>
                            {/* RIGHT SIDE USRT DATA TEXT */}
                            <Typography sx={{fontSize:"12px",fontWeight:"bold"}}>Golovnoy ofis</Typography>
                        </Box>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid gray",lineHeight:"0px"}}>
                            {/* LEFT SIDE USRT DATA TEXT */}
                            <Typography sx={{fontSize:"12px",textTransform:"uppercase"}}>ПОДРАЗДЕЛЕНИЕ</Typography>
                            {/* RIGHT SIDE USRT DATA TEXT */}
                            <Typography sx={{fontSize:"12px",fontWeight:"bold"}}>Golovnoy ofis</Typography>
                        </Box>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid gray",lineHeight:"0px"}}>
                            {/* LEFT SIDE USRT DATA TEXT */}
                            <Typography sx={{fontSize:"12px",textTransform:"uppercase"}}>ДОЛЖНОСТЬ</Typography>
                            {/* RIGHT SIDE USRT DATA TEXT */}
                            <Typography sx={{fontSize:"12px",fontWeight:"bold"}}>Golovnoy ofis</Typography>
                        </Box>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid gray",lineHeight:"0px"}}>
                            {/* LEFT SIDE USRT DATA TEXT */}
                            <Typography sx={{fontSize:"12px",textTransform:"uppercase"}}>функционал</Typography>
                            {/* RIGHT SIDE USRT DATA TEXT */}
                            <Typography sx={{fontSize:"12px",fontWeight:"bold"}}>Golovnoy ofis</Typography>
                        </Box>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid gray",lineHeight:"0px"}}>
                            {/* LEFT SIDE USRT DATA TEXT */}
                            <Typography sx={{fontSize:"12px",textTransform:"uppercase"}}>ТАБЕЛЬНЫЙ НОМЕР РАБОТНИКА</Typography>
                            {/* RIGHT SIDE USRT DATA TEXT */}
                            <Typography sx={{fontSize:"12px",fontWeight:"bold"}}>Golovnoy ofis</Typography>
                        </Box>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid gray",lineHeight:"0px"}}>
                            {/* LEFT SIDE USRT DATA TEXT */}
                            <Typography sx={{fontSize:"12px",textTransform:"uppercase"}}>ОКЛАД РАБОТНИКА, СУМ</Typography>
                            {/* RIGHT SIDE USRT DATA TEXT */}
                            <Typography sx={{fontSize:"12px",fontWeight:"bold"}}>Golovnoy ofis</Typography>
                        </Box>
                    </Box>
                </Grid>
                {/* CIRCLE PROGRESSBAR SECTION */}
                <Grid item xs={2.5} lg={2.5} sx={{padding:"5px",width:"100%",height:"100%"}}>
                    <Box sx={{width:"100%",height:"100%",borderRadius:"5px",border:"1px solid gray",padding:"5px",display:"flex",flexDirection:"column",}}>
                        {/* TOP TEXT SECTION */}
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                            <Typography sx={{fontWeight:"bold",fontSize:"12px"}}>KPI</Typography>
                            <Typography sx={{fontSize:"12px",fontWeight:"bold",textTransform:"capitalize"}}>Август 2024 г.</Typography>
                        </Box>
                        {/* CIRCLE SECTION */}
                        <Box sx={{width:"100%",height:"90%",display:"flex",alignItems:"center",textAlign:"center",justifyContent:"center"}}>
                                <CircularProgressBarWithPercentage
                                    selectedValue={100}
                                    maxValue={125}
                                    radius={75} // Set the radius as 8vw (8% of the viewport width)
                                    textColor="#000"
                                    activeStrokeColor={Colors.green_area}
                                    withGradient
                                    className="circle-own-style"
                                    style={{ width: "100%", height: "100%",alignItems:"ceenter" }} // Match the circle's container size with the radius
                                />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </header>
        {/* KPI LINECHART  */}
        <Grid container sx={{width:"100%",height:"400px",}}>
            <Grid item xs={12} lg={12} sx={{padding:"5px",}}>
                <Box sx={{width:"100%",height:"100%",borderRadius:"5px",border:"1px solid gray",padding:"5px",display:"flex",flexDirection:"column",gap:"10px"}}>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                            <Typography sx={{fontWeight:"bold",fontSize:"14px"}}>Динамика выполнения общих плановых показателей KPI</Typography>
                            <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around"}}>

                            </Box>
                        </Box>
                </Box>
            </Grid>
        </Grid>
        {/* KPI TABLE  */}
        <footer>
            <Grid container sx={{width:"100%",height:"auto",padding:"5px"}}>
                <Grid item lg={12} sx={{width:"100%",height:"auto"}}>
                    <Box sx={{width:"100%",height:"100%",borderRadius:"5px",border:"1px solid gray"}}>
                        <Typography sx={{height:"50px"}}>table</Typography>
                    </Box>
                </Grid>
            </Grid>
        </footer>
    </Box>
  )
}

export default MuiKpi