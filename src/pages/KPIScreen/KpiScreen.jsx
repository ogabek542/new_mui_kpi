import * as React from 'react';
import { Container, Box, CssBaseline, Drawer, AppBar, Toolbar, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText ,Grid,Paper,Typography} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Colors } from '../../styles/theme';
// IMPORT SCREENS //
import LightHeader from '../../components/LightHeader/LightHeader';
import Footer from '../../components/Footer/Footer';
import NewMain from '../TableKPI/TableKpiScreen';

const KpiScreen = () => {

  return (
    <Container fixed maxWidth="xl" disableGutters sx={{ px: '10px', height: '100%' }}>
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
                <Grid item xs={12} sm={2} sx={{ height: 'auto' }}>
                  <Paper elevation={3} sx={{ height: '100%', padding: '16px' }}>
                    <Typography variant="h6" sx={{color:Colors.nbu,fontWeight:"bold"}}>KPI</Typography>
                    <List>
                      {/* First item */}
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
                          {/* second item */}
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
                          {/* third item */}
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
                          {/* fouth item */}
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
                    </List>
                  </Paper>
                </Grid>
                {/* Right side (9 columns) */}
                <Grid item xs={12} sm={10} sx={{ height: 'auto',display:"block" }}>
                  <Paper elevation={3} sx={{ height: '100%', padding: '16px',width:"100%" }}>
                    <NewMain/>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
      <Footer />
    </Container>
  );
};

export default KpiScreen;
