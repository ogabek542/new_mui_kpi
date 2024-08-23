import { Box, Typography,} from "@mui/material";
// icons //
// import LOGO image //
import backgroundImage from "../../assets/photo/newHomePageTopImage.jpg";
import { Colors } from "../../styles/theme";
// SVG //
import NBUlogo from "../../assets/svg/newForSVG.svg";
// import framer motion //
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";


const LightHeader = ({changeLang}) => {

  const {t} = useTranslation()
   
  return (
    <Box
    sx={{
      px: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      height: "137px",
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
        marginRight: "10px",
        width:{xs:"150px",sm:"200px", md:"300px"},
        boxShadow: `-10px -10px 15px rgba(255, 255, 255, 0.5),
                  10px 10px 15px rgba(70, 70, 70, 0.12)`
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
            sx={{ width: {xs:"35px",md:"55px"}, cursor: "pointer" }}
          />
        </a>
      </motion.div>
      <Typography
        sx={{
          width: {xs:"120px",sm:"180px",md:"220px"},
          fontSize: {xs:"8px",sm:"10px",md:"16px"},
          textAlign: "left",
          fontWeight: "900",
          lineHeight: "1.3",
        }}
        color={Colors.dark}
      >
        {/* “ЎЗМИЛЛИЙБАНК” АЖ БУХГАЛТЕРИЯ ҲИСОБИ ВА МОЛИЯВИЙ МЕНЕЖМЕНТ
        ДЕПАРТАМЕНТИ */}
        {t("headerText")}
      </Typography>
    </Box>
    {/* right side box */}
    <Box 
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign:"end",
        width:{xs:"120px",sm:"200px"},
        height:"auto",
        gap:"20px"
      }}
    >
    
    </Box >
  </Box>
  )
}

export default LightHeader