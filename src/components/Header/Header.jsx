import * as React from 'react';
import { Box, Stack, Typography,} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import LOGO image //
import backgroundImage from "../../assets/photo/homePageTopImage.png";
import { Colors } from "../../styles/theme";
// SVG //
import NBUlogo from "../../assets/svg/newForSVG.svg";
// import framer motion //
import { motion } from "framer-motion";

const Header = () => {

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };
  return (
    <Stack
      direction="row"
      sx={{
        width: "100%",
        height: "137px",
        padding: "10px",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow:
          "0px 4px 12px rgba(0, 0, 0, 0.1) inset , -10px -10px 10px white",
      }}
    >
      {/* left side box */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: "rgba(254, 254, 254, 0.645)",
          borderRadius: "5px",
          padding: "10px",
          gap: "10px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.3,
            ease: [0, 0.5, 0.2, 1.01],
            scale: {
              type: "spring",
              damping: 4,
              stiffness: 100,
              restDelta: 0.001,
            },
          }}
        >
            <a href="/">
                <Box
                    component="img"
                    src={NBUlogo}
                    sx={{ width: "55px", cursor: "pointer" }}
                />
            </a>
        </motion.div>
        <Typography
          sx={{
            width: "220px",
            fontSize: "16px",
            textAlign: "left",
            fontWeight: "900",
            lineHeight: "1.3",
          }}
          color={Colors.dark}
        >
          “ЎЗМИЛЛИЙБАНК” АЖ БУХГАЛТЕРИЯ ҲИСОБИ ВА МОЛИЯВИЙ МЕНЕЖМЕНТ
          ДЕПАРТАМЕНТИ
        </Typography>
      </Box>
      {/* right side box */}
      <Box sx={{width:"100px"}}>
        {/* <=== language selection sextion ===>*/}
        <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>

        {/* <=== calendar select data ===> */}
          
      </Box>
    </Stack>
  );
};

export default Header;
// backdrop-filter:blur(10px);
