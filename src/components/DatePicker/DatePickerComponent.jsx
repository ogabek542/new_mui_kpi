import * as React from "react";
import { Box, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Colors } from "../../styles/theme"; // Adjust import based on your path

const DatePickerComponent = ({
  value,
  onChange,
  locale,
  ...rest // Additional props if needed
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <DatePicker
        value={value}
        onChange={onChange}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            inputProps={{
              ...params.inputProps,
              placeholder: "DD.MM.YYYY",
              readOnly: true,
            }}
          />
        )}
        sx={{
          ".MuiOutlinedInput-root": {
            "& fieldset": {
              border: "none", // Remove border
            },
            "&:hover fieldset": {
              border: "none", // No border on hover
            },
            "&.Mui-focused fieldset": {
              border: "none", // No border when focused
            },
            ".MuiInputAdornment-root .MuiIconButton-root": {
              color: Colors.blue_nbu, // Custom color for the icon
            },
            ".MuiInputBase-input": {
              fontWeight: 700,
              fontSize: { xs: "12px", sm: "16px" },
            },
          },
        }}
        slotProps={{
          day: {
            sx: {
              fontWeight: 700, // Apply font-weight to calendar dates
              fontSize: "14px", // Adjust font-size if needed
            },
          },
        }}
        {...rest} // Spread the rest props if needed
      />
    </LocalizationProvider>
  );
};

export default DatePickerComponent;
