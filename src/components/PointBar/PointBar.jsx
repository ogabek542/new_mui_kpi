import * as React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Tooltip,
  LabelList,
} from "recharts";
import { motion } from "framer-motion";
import { Box, Grid, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

// <==== FUNCTION ====> //
const getCSSVariableValue = (variable) => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim();
};

// Get CSS variable values
const textGray = getCSSVariableValue("--text-gray");
const middleBlue = getCSSVariableValue("--middle-blue");

// Styled components
const LegendGridItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const PointBar = ({
  title,
  data,
  leftIcon,
  renderBlueShape,
  renderShape,
  renderCustomizedLabel,
  onButtonClick,
}) => {
  return (
    <Box sx={{ border: "1px solid #ccc", borderRadius: 2, overflow: "hidden" }}>
      <Box sx={{ padding: 2, backgroundColor: "#f5f5f5" }}>
        <Typography variant="h6">{title}</Typography>
      </Box>

      <Box sx={{ padding: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <Typography variant="body2">ЖАМИ</Typography>
            <Typography variant="caption" color="textSecondary">
              млрд.сўм.экв
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="body2">ХОРИЖИЙ ВАЛЮТАДА</Typography>
            <Typography variant="caption" color="textSecondary">
              млрд.сўм.экв
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="body2">МИЛЛИЙ ВАЛЮТАДА</Typography>
            <Typography variant="caption" color="textSecondary">
              млрд.сўм.экв
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ marginTop: 2, display: "flex", justifyContent: "flex-end" }}>
          <Box sx={{ display: "flex", alignItems: "center", marginRight: 2 }}>
            <Box
              sx={{ width: 16, height: 16, backgroundColor: textGray, marginRight: 1 }}
            />
            <Typography variant="body2">План</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{ width: 16, height: 16, backgroundColor: middleBlue, marginRight: 1 }}
            />
            <Typography variant="body2">Факт</Typography>
          </Box>
        </Box>

        <Box sx={{ height: 400, marginTop: 2 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={400}
              data={data}
              margin={{
                top: 25,
              }}
              padding={{
                top: 45,
              }}
            >
              <Tooltip />
              <Bar
                dataKey="plan"
                fill={textGray}
                minPointSize={5}
                shape={renderBlueShape}
              >
                <LabelList
                  dataKey="percentage"
                  content={renderCustomizedLabel}
                />
              </Bar>
              <Bar
                dataKey="fact"
                fill={middleBlue}
                minPointSize={10}
                shape={renderShape}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <LegendGridItem  item xs={6}>
              <Typography variant="body2">plan</Typography>
              <Typography variant="body2">fact</Typography>
            </LegendGridItem>
        </Grid>

        <Box sx={{ textAlign: "center", marginTop: 2 }}>
          <img src={leftIcon} alt="left_side_icon" style={{ width: 50 }} />
        </Box>
      </Box>

      <Box sx={{ padding: 2, backgroundColor: "#f5f5f5", textAlign: "center" }}>
        <motion.div whileHover={{ scale: 1.1 }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={onButtonClick}
          >
            ТЎЛИҚ МАЪЛУМОТ
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
};

export default PointBar;
