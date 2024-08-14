import React from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Box, Typography } from "@mui/material";

// <==== FUNCTION ====> //
const getCSSVariableValue = (variable) => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim();
};

const CircleProgressBar = ({
  selectedValue,
  maxValue,
  radius = 100, // default radius value
  textColor,
  activeStrokeColor,
  withGradient,
}) => {
  // Get CSS variable values inside the component to ensure they are available when rendering
  const circleWhite = getCSSVariableValue("--white-circle");

  const formattedValue = `${selectedValue}%`;

  return (
    <Box
      sx={{
        width: radius * 2,
        height: radius * 2,
      }}
    >
      <CircularProgressbarWithChildren
        value={selectedValue}
        maxValue={maxValue}
        strokeWidth={16}
        className="inside-circle"
        styles={{
          path: {
            stroke: activeStrokeColor,
            strokeLinecap: "unset",
            transition: "stroke-dashoffset 0.6s ease 0.1s",
          },
          trail: {
            stroke: circleWhite,
          },
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            color: textColor,
          }}
        >
          {formattedValue}
        </Typography>
      </CircularProgressbarWithChildren>
    </Box>
  );
};

export default CircleProgressBar;
