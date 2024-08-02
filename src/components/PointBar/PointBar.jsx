import React from "react";
import { ResponsiveContainer, BarChart, Bar, Tooltip, LabelList } from "recharts";
import { motion } from "framer-motion";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  useMediaQuery,
  useTheme
} from "@mui/material";

// <==== FUNCTION ====> //
const getCSSVariableValue = (variable) => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim();
};

// Get CSS variable values
const textGray = getCSSVariableValue("--text-gray");
const middleBlue = getCSSVariableValue("--middle-blue");

const PointBar = ({
  title,
  data,
  leftIcon,
  renderBlueShape,
  renderShape,
  renderCustomizedLabel,
  onButtonClick,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Container sx={{ padding: theme.spacing(2), backgroundColor: "#fffafa", borderRadius: 1, height: 500, display: "flex", flexDirection: "column", gap: theme.spacing(2) }}>
      <Box>
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography variant="body1">
                  ЖАМИ <br />
                </Typography>
                <Typography variant="caption">млрд.сўм.экв</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  ХОРИЖИЙ <br /> ВАЛЮТАДА <br />
                </Typography>
                <Typography variant="caption">млрд.сўм.экв</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  МИЛЛИЙ ВАЛЮТАДА <br />
                </Typography>
                <Typography variant="caption">млрд.сўм.экв</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Box mt={2} mb={2}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ width: 12, height: 12, backgroundColor: textGray, borderRadius: "50%", mr: 1 }}></Box>
                <Typography variant="caption">План</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ width: 12, height: 12, backgroundColor: middleBlue, borderRadius: "50%", mr: 1 }}></Box>
                <Typography variant="caption">Факт</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 25 }}
            padding={{ top: 45 }}
          >
            <Tooltip />
            <Bar
              dataKey="plan"
              fill={textGray}
              minPointSize={5}
              shape={renderBlueShape}
            >
              <LabelList dataKey="percentage" content={renderCustomizedLabel} />
            </Bar>
            <Bar
              dataKey="fact"
              fill={middleBlue}
              minPointSize={10}
              shape={renderShape}
            />
          </BarChart>
        </ResponsiveContainer>

        <Box sx={{ position: "relative", bottom: isMobile ? 50 : 15, left: isMobile ? "19%" : "auto" }}>
          <img
            src={leftIcon}
            alt="left_side_icon"
            style={{
              width: isMobile ? 30 : 50,
              height: isMobile ? 30 : 50,
              backgroundColor: "transparent"
            }}
          />
        </Box>
      </Box>

      <Box mt="auto" sx={{ display: "flex", justifyContent: "space-between" }}>
        <motion.div whileHover={{ scale: 1.1 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={onButtonClick}
          >
            ТЎЛИҚ МАЪЛУМОТ
          </Button>
        </motion.div>
      </Box>
    </Container>
  );
};

export default PointBar;
