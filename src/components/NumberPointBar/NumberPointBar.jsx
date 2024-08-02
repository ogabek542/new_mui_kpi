import * as React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import { motion } from "framer-motion";
import './numberbar.css'; // Import the CSS file

const NumberPointBar = ({ title, dataItem, onButtonClick }) => {
  return (
    <Box
      className="grid-items_hh" // Use the class from the CSS file
      sx={{
        p: 2,
        borderRadius: 1,
        boxShadow: 3,
        bgcolor: "background.paper",
        minHeight: { xs: '350px', sm: '500px' },
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {['roa', 'roe', 'cir', 'cor'].map((key) => (
            <Box sx={{ mb: 2 }} key={key}>
              <Typography variant="subtitle1" sx={{ fontSize: { xs: '14px', sm: '16px', md: '18px' } }}>
                {key.toUpperCase()}
              </Typography>
              <Typography variant="h6" sx={{ fontSize: { xs: '18px', sm: '24px', md: '28px' } }}>
                {dataItem[key]}
              </Typography>
            </Box>
          ))}
        </Grid>
        <Grid item xs={6}>
          {['npl', 'nps', 'mau', 'nim'].map((key) => (
            <Box sx={{ mb: 2 }} key={key}>
              <Typography variant="subtitle1" sx={{ fontSize: { xs: '14px', sm: '16px', md: '18px' } }}>
                {key.toUpperCase()}
              </Typography>
              <Typography variant="h6" sx={{ fontSize: { xs: '18px', sm: '24px', md: '28px' } }}>
                {dataItem[key]}
              </Typography>
            </Box>
          ))}
        </Grid>
      </Grid>
      <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
        <motion.div whileHover={{ scale: 1.1 }}>
          <Button variant="contained" color="primary" onClick={onButtonClick}>
            ТЎЛИҚ МАЪЛУМОТ
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
};

export default NumberPointBar;
