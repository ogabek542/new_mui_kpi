import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Box } from '@mui/material';

// Sample data for the Autocomplete
const top128Filials = [
  { title: "Избоскан БХО", id: 1 },
  { title: "Шахрихон БХО", id: 2 },
  { title: "Асака БХМ", id: 3 },
  { title: "Зарафшон БХМ", id: 4 },
];

// Options for the second Autocomplete based on the first selection
const secondOptionsMap = {
  1: [
    { title: "Option 1A" },
    { title: "Option 1B" },
  ],
  2: [
    { title: "Option 2A" },
    { title: "Option 2B" },
  ],
  3: [
    { title: "Option 3A" },
    { title: "Option 3B" },
  ],
  4: [
    { title: "Option 4A" },
    { title: "Option 4B" },
  ],
};

const DependentAutocomplete = () => {
  const [selectedFirstOption, setSelectedFirstOption] = useState(null);
  const [selectedSecondOption, setSelectedSecondOption] = useState(null);
  const [secondOptions, setSecondOptions] = useState([]);
  const [prevFirstOption, setPrevFirstOption] = useState(null);
  const [prevSecondOption, setPrevSecondOption] = useState(null);

  // Update the options for the second Autocomplete based on the first selection
  useEffect(() => {
    if (selectedFirstOption && selectedFirstOption.id) {
      // Save the current selections before changing the options
      setPrevFirstOption(selectedFirstOption);
      setPrevSecondOption(selectedSecondOption);

      setSecondOptions(secondOptionsMap[selectedFirstOption.id] || []);
      setSelectedSecondOption(null); // Reset the second option
    } else {
      setSecondOptions([]);
    }
  }, [selectedFirstOption]);

  return (
    <Box sx={{ width: '300px', margin: '0 auto' }}>
      {/* First Autocomplete */}
      <Autocomplete
        options={top128Filials}
        sx={{ width: '100%', height: '100%', mb: 2 }}
        getOptionLabel={(option) => option.title}
        value={selectedFirstOption || prevFirstOption}
        onChange={(event, value) => setSelectedFirstOption(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Выбор отделение"
            variant="standard"
            sx={{
              "& .MuiInput-underline:before": { borderBottomColor: "red" },
              "& .MuiInput-underline:after": { borderBottomColor: "green" },
              "& .MuiInput-underline:before, & .MuiInput-underline:after": {
                borderBottom: "none",
              },
            }}
            InputLabelProps={{ style: { color: 'black' } }}
          />
        )}
      />

      {/* Second Autocomplete */}
      <Autocomplete
        options={secondOptions}
        sx={{ width: '100%', height: '100%' }}
        getOptionLabel={(option) => option.title}
        value={selectedSecondOption || prevSecondOption}
        onChange={(event, value) => setSelectedSecondOption(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Выбор филиала"
            variant="standard"
            sx={{
              "& .MuiInput-underline:before": { borderBottomColor: "red" },
              "& .MuiInput-underline:after": { borderBottomColor: "green" },
              "& .MuiInput-underline:before, & .MuiInput-underline:after": {
                borderBottom: "none",
              },
            }}
            InputLabelProps={{ style: { color: 'black' } }}
          />
        )}
      />
    </Box>
  );
};

export default DependentAutocomplete;
