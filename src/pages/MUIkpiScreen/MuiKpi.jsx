import React from 'react'
import { Container, Box,Grid,Paper,Typography} from '@mui/material';

const MuiKpi = () => {


    
  return (
    <Box sx={{width:"100%",height:"100%",padding:"5px"}}>
        {/* HEADER SECTION OF KPI SCREEN .. USER DATAS IN HERE */}
        <header>
            <Grid container sx={{width:"100%",height:"200px",}}>
                <Grid item lg={2.5} sx={{padding:"5px"}}>
                    <Box sx={{width:"100%",height:"100%",bgcolor:"red",borderRadius:"5px"}}>
                        <Typography>1</Typography>
                    </Box>
                </Grid>
                <Grid item lg={7} sx={{padding:"5px"}}>
                <Box sx={{width:"100%",height:"100%",bgcolor:"yellow",borderRadius:"5px"}}>
                        <Typography>2</Typography>
                    </Box>
                </Grid>
                <Grid item lg={2.5} sx={{padding:"5px"}}>
                <Box sx={{width:"100%",height:"100%",bgcolor:"green",borderRadius:"5px"}}>
                        <Typography>3</Typography>
                    </Box>
                </Grid>
            </Grid>
        </header>
        {/* KPI LINECHART  */}
        <Grid container sx={{width:"100%",height:"300px",padding:"5px",}}>
            <Grid item lg={12} sx={{}}>
                <Box sx={{width:"100%",height:"100%",bgcolor:"orange",borderRadius:"5px"}}>
                    <Typography>LInechart</Typography>
                </Box>
            </Grid>
        </Grid>
        {/* KPI TABLE  */}
        <Grid container sx={{width:"100%",height:"auto",padding:"5px"}}>
            <Grid item lg={12} sx={{width:"100%",height:"auto"}}>
                <Box sx={{width:"100%",height:"100%",borderRadius:"5px",bgcolor:"gray"}}>
                    <Typography sx={{height:"50px"}}>table</Typography>
                </Box>
            </Grid>
        </Grid>
    </Box>
  )
}

export default MuiKpi