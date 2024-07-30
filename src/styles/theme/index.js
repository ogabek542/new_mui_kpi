import { createTheme } from "@mui/material";

export const Colors = {
    // black //
    dark:"#000000",
    dark_light:"#FFFFFF00", // transparent white //
    // white //
    white:"#FFFFFF",
    white_back:"#F4F4F4",
    // blue //
    nbu:"#083473",
    blue_nbu:"#020D9E",
    blue_middle:"#00AEEF",
    blue_icon:"#0156B4",
    blue_light_table:"#94C7FB",
    blue_light_ultra:"#D6DEEA",
    blue_box:"#E2EBF8",
    // green //
    green_light:"#00FF00", 
    green_area:"#00C400", 
    green_dark:"#008000",
    green_dote:"#0A7F40",
    green_yes:"#91FF9A",
    green_area_light:"#CDFAD0",
    // gray //
    gray:"#808080",
    gray_footer:"#F8F7F4",
    gray_common:"#E2E2E2",
    gray_back:"#E6E7E8",/*bar gray */
    gray_text:"#AAAAAE",
    gray_rentable:"#AAAAAE",
    yellow_light:"#F7F763",
    // red //
    red:"#FF0000",
    red_light:"#FF3532",
    transparent:"rgba(0,0,0,0.0)",
};

const themes = createTheme({
    palette: {
        primary: {
            main: Colors.blue_middle,
        },
        secondary: {
            main: Colors.nbu,
        },
        customColors: {
            dark: Colors.dark,
            white: Colors.white,
            nbu: Colors.nbu,
            blueMiddle: Colors.blue_middle,
            greenLight: Colors.green_light,
            greenDark: Colors.green_dark,
            gray: Colors.gray,
            red: Colors.red,
        },
    },
    typography: {
        fontWeightBold: 700,
    },
      // other theme settings
});

export default themes;