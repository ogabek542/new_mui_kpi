import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
} from "@mui/material";
import LightHeader from "../../components/LightHeader/LightHeader";
import { Colors } from "../../styles/theme";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PropTypes from "prop-types";

// Branch section
const top128Filials = [
  { title: "Республика", id: 1 },
  { title: "Тошкент ш", id: 2 },
  // ... (other filials)
];

// Filials section
const setSelectedSecondMap = {
  1: [{ title: "Республика" }],
  2: [
    { title: "Головной офис" },
    // ... (other sub-filials)
  ],
  // ... (other regions)
};

// Month names
const monthsList = [
  { name: "January", id: 1 },
  { name: "February", id: 2 },
  // ... (other months)
];

// Account numbers
const numbersList = ["561", "562", "563", "564", "565", "566", "567"];

// Mock table data
const tableData = [
  {
    id: "1",
    name: "Main Row 1",
    months: {
      January: { plan: 100, fact: 90 },
      // ... (other months)
    },
    sum: 1730,
    subRows: [
      {
        id: "1.1",
        name: "Sub Row 1.1",
        months: {
          January: { plan: 50, fact: 48 },
          // ... (other months)
        },
        sum: 820,
        subRows: [
          {
            id: "1.1.1",
            name: "Sub Sub Row 1.1.1",
            months: {
              January: { plan: 20, fact: 19 },
              // ... (other months)
            },
            sum: 363,
            subRows: [],
          },
        ],
      },
    ],
  },
  // ... (additional rows as needed)
];

// List of years
const yearsList = [
  { id: 1, label: 2018 },
  { id: 2, label: 2019 },
  { id: 3, label: 2020 },
  { id: 4, label: 2021 },
  { id: 5, label: 2022 },
  { id: 6, label: 2023 },
  { id: 7, label: 2024 },
  { id: 8, label: 2025 },
];

const AnalizeYearDashboard = () => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [openRows, setOpenRows] = useState({});
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [firstTableData, setFirstTableData] = useState([]);
  const [secondTableData, setSecondTableData] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  const monthArray = monthsList.map((month) => month.name);

  // Function to simulate fetching data for a specific year
  const getDataForYear = (year) => {
    return tableData.map((item) => ({
      ...item,
      name: `${item.name} (${year})`, // Append year to distinguish data
    }));
  };

  // DataRow component
  function DataRow({ row, depth = 0 }) {
    const [open, setOpen] = useState(false);
    const hasSubRows = row.subRows && row.subRows.length > 0;

    return (
      <React.Fragment>
        {/* Main Row */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: depth % 2 === 0 ? "#f9f9f9" : "#ffffff",
            paddingLeft: `${depth * 20}px`, // Indent sub-rows
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          {/* Arrow Icon */}
          <Box sx={{ width: "40px" }}>
            {hasSubRows && (
              <IconButton size="small" onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            )}
          </Box>

          {/* Name Cell */}
          <Box sx={{ width: "350px", flexShrink: 0 }}>
            <Typography variant="body1">{row.name}</Typography>
          </Box>

          {/* Months Data Cells */}
          {monthArray.map((month) => (
            <React.Fragment key={month}>
              <Box sx={{ width: "80px", textAlign: "center" }}>
                {row.months[month]?.plan || 0}
              </Box>
              <Box sx={{ width: "80px", textAlign: "center" }}>
                {row.months[month]?.fact || 0}
              </Box>
            </React.Fragment>
          ))}

          {/* Sum Cells */}
          <Box sx={{ width: "80px", textAlign: "center" }}>{row.sum}</Box>
        </Box>

        {/* Collapsible Sub-Rows */}
        {hasSubRows && open && (
          <Box>
            {row.subRows.map((subRow) => (
              <DataRow key={subRow.id} row={subRow} depth={depth + 1} />
            ))}
          </Box>
        )}
      </React.Fragment>
    );
  }

  DataRow.propTypes = {
    row: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      name: PropTypes.string.isRequired,
      months: PropTypes.object.isRequired,
      sum: PropTypes.number.isRequired,
      subRows: PropTypes.array,
    }).isRequired,
    depth: PropTypes.number,
  };

  // Handle month selection
  const handleMonthToggle = (month) => {
    setSelectedMonths((prev) =>
      prev.includes(month) ? prev.filter((m) => m !== month) : [...prev, month]
    );
  };

  // Handle account number selection
  const handleNumberToggle = (number) => {
    setSelectedNumbers((prev) =>
      prev.includes(number)
        ? prev.filter((item) => item !== number)
        : [...prev, number]
    );
  };

  // YearPicker component
  const YearPicker = ({ yearsList, selectedYears, setSelectedYears }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggleYearSelection = (year) => {
      setSelectedYears((prev) => {
        let newSelectedYears;
        if (prev.includes(year)) {
          newSelectedYears = prev.filter((y) => y !== year);
        } else if (prev.length < 2) {
          newSelectedYears = [...prev, year];
        } else {
          newSelectedYears = prev;
        }

        // Sort the years in ascending order
        newSelectedYears.sort();

        return newSelectedYears;
      });

      // Close the dropdown after selection
      setIsOpen(false);
    };

    return (
      <Box
        sx={{
          marginTop: 2,
          borderRadius: "5px",
          backgroundColor: Colors.white,
        }}
      >
        {/* Clickable label to toggle list visibility */}
        <Typography
          sx={{
            fontWeight: "600",
            cursor: "pointer",
            color: "black",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedYears.length > 0
            ? selectedYears.join(" - ")
            : "Select Year"}
          {isOpen ? (
            <KeyboardArrowUpIcon sx={{ marginLeft: "6px" }} />
          ) : (
            <KeyboardArrowDownIcon sx={{ marginLeft: "6px" }} />
          )}
        </Typography>

        {/* List of years with checkboxes */}
        {isOpen && (
          <List sx={{ padding: 0 }}>
            {yearsList.map((year) => (
              <ListItem
                key={year.label}
                sx={{
                  padding: "5px",
                  marginBottom: "2px",
                  borderRadius: "5px",
                  backgroundColor: selectedYears.includes(year.label)
                    ? "#083473"
                    : "transparent",
                  color: selectedYears.includes(year.label) ? "white" : "black",
                  "&:hover": {
                    backgroundColor: Colors.blue_light_ultra,
                    color: "black",
                    fontWeight: "bold",
                  },
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() => handleToggleYearSelection(year.label)}
              >
                {/* Checkbox next to each year */}
                <Checkbox
                  checked={selectedYears.includes(year.label)}
                  tabIndex={-1}
                  disableRipple
                  size="small"
                  sx={{ marginRight: "8px" }}
                />
                <ListItemText
                  primary={year.label}
                  sx={{
                    fontSize: "14px",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    );
  };

  // Toggle open state for filial rows
  const toggleRowOpen = (id) => {
    setOpenRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Filial row component
  function Row({ filial, isOpen, onToggle, checkedItems, setCheckedItems }) {
    const subRegions = setSelectedSecondMap[filial.id] || [];

    const handleCheckboxChange = (title) => {
      setCheckedItems((prev) =>
        prev.includes(title)
          ? prev.filter((item) => item !== title)
          : [...prev, title]
      );
    };

    return (
      <>
        <TableRow>
          {/* Checkbox cell */}
          <TableCell sx={{ padding: "2px" }}>
            <Checkbox
              onChange={(e) => {
                e.stopPropagation();
                handleCheckboxChange(filial.title);
              }}
              checked={checkedItems.includes(filial.title)}
              size="small"
            />
          </TableCell>
          {/* Clickable name cell to toggle open/close */}
          <TableCell
            sx={{
              padding: "2px",
              cursor: "pointer",
              fontWeight: "bold",
              color: Colors.black,
            }}
            onClick={() => onToggle(filial.id)}
          >
            {filial.title}
          </TableCell>
        </TableRow>
        {/* Sub-region rows */}
        {isOpen && (
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
              <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 0, padding: 0 }}>
                  <Table size="small" aria-label="subregions" sx={{ margin: 0 }}>
                    <TableBody>
                      {subRegions.map((subRegion, index) => (
                        <TableRow key={index}>
                          <TableCell sx={{ padding: "2px", pl: 2 }}>
                            <Checkbox
                              onChange={(e) => {
                                e.stopPropagation();
                                handleCheckboxChange(subRegion.title);
                              }}
                              checked={checkedItems.includes(subRegion.title)}
                              size="small"
                            />
                          </TableCell>

                          <TableCell
                            sx={{ padding: "2px", pl: 2, cursor: "pointer" }}
                            onClick={() => handleCheckboxChange(subRegion.title)}
                          >
                            {subRegion.title}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        )}
      </>
    );
  }

  Row.propTypes = {
    filial: PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
    isOpen: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
    checkedItems: PropTypes.array.isRequired,
    setCheckedItems: PropTypes.func.isRequired,
  };

  // Function to handle data fetching when REFRESH is clicked
  const sendCheckedItemsToBackend = () => {
    console.log("Checked items to send:", checkedItems);
    console.log("Selected years:", selectedYears);

    if (selectedYears.length === 0) {
      alert("Please select at least one year.");
      return;
    }

    // Check if the second selected year is greater than the first
    if (selectedYears.length === 2 && selectedYears[1] <= selectedYears[0]) {
      alert(
        "The second selected year must be greater than the first selected year."
      );
      return; // Exit the function without fetching data
    }

    // Simulate data fetching based on selectedYears
    // Replace this with your actual API call
    setTimeout(() => {
      // After fetching data, update the state
      if (selectedYears.length >= 1) {
        // Fetch data for the first selected year
        const dataForFirstYear = getDataForYear(selectedYears[0]);
        setFirstTableData(dataForFirstYear);
      } else {
        setFirstTableData([]);
      }

      if (selectedYears.length === 2) {
        // Fetch data for the second selected year
        const dataForSecondYear = getDataForYear(selectedYears[1]);
        setSecondTableData(dataForSecondYear);
      } else {
        setSecondTableData([]);
      }

      setDataFetched(true);
    }, 1000);
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        px: "10px",
        bgcolor: Colors.gray_back,
        width: "100%",
        maxWidth: "100vw",
        "@media (min-width: 1920px)": {
          maxWidth: "100%",
        },
      }}
    >
      {/* Light Header Section */}
      <LightHeader />
      {/* Main Content */}
      <Grid
        container
        sx={{ height: "auto", marginTop: "5px", gap: "5px" }}
        alignItems="stretch"
      >
        {/* Left Side Filter Section */}
        <Grid
          item
          xs={3.1}
          sm={3.1}
          sx={{
            height: "1000px",
            bgcolor: Colors.white,
            borderRadius: "5px",
            padding: "5px",
          }}
        >
          <Box sx={{ width: "100%", height: "40px" }}>
            {/* REFRESH Button */}
            <Button
              variant="contained"
              onClick={sendCheckedItemsToBackend}
              sx={{
                width: "100%",
                fontWeight: "bold",
                color: "white",
                bgcolor: Colors.nbu,
                "&:hover": {
                  bgcolor: Colors.nbu,
                },
              }}
            >
              REFRESH
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "5px",
              height: "95%",
            }}
          >
            {/* Filials Filter */}
            <Box
              sx={{
                width: "60%",
                display: "block",
                height: "100%",
                color: Colors.white,
              }}
            >
              <TableContainer component={Paper} sx={{ padding: 0 }}>
                <Table aria-label="collapsible table" sx={{ margin: 0 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ padding: 0 }}>XUDUD</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {top128Filials.map((filial) => (
                      <Row
                        key={filial.id}
                        filial={filial}
                        isOpen={openRows[filial.id] || false}
                        onToggle={toggleRowOpen}
                        checkedItems={checkedItems}
                        setCheckedItems={setCheckedItems}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            {/* Year, Month, Account Filters */}
            <Box
              sx={{
                width: "40%",
                display: "block",
                height: "100%",
                color: Colors.white,
              }}
            >
              {/* Year Selector */}
              <Box sx={{ padding: "10px" }}>
                <YearPicker
                  yearsList={yearsList}
                  selectedYears={selectedYears}
                  setSelectedYears={setSelectedYears}
                />
              </Box>
              {/* Month Picker */}
              <List sx={{ padding: 0, borderTop: "1px solid #AAAAAE " }}>
                {monthsList.map((month) => (
                  <ListItem
                    key={month.id}
                    onClick={() => handleMonthToggle(month.name)}
                    sx={{
                      padding: "5px",
                      margin: 0,
                      minHeight: "30px",
                      borderRadius: "5px",
                      marginBottom: "2px",
                      backgroundColor: selectedMonths.includes(month.name)
                        ? "#083473"
                        : "#FFFFFF",
                      color: selectedMonths.includes(month.name)
                        ? "white"
                        : "black",
                      "&:hover": {
                        backgroundColor: Colors.blue_icon,
                        color: Colors.white,
                        fontWeight: "bold",
                      },
                    }}
                  >
                    <ListItemText sx={{ margin: 0 }} primary={month.name} />
                  </ListItem>
                ))}
              </List>
              {/* Account Number */}
              <List
                sx={{
                  padding: 0,
                  marginTop: 2,
                  borderTop: "1px solid #AAAAAE ",
                }}
              >
                {numbersList.map((number) => (
                  <ListItem
                    key={number}
                    onClick={() => handleNumberToggle(number)}
                    sx={{
                      padding: "5px",
                      minHeight: "30px",
                      borderRadius: "5px",
                      marginBottom: "1px",
                      backgroundColor: selectedNumbers.includes(number)
                        ? "#083473"
                        : "transparent",
                      color: selectedNumbers.includes(number)
                        ? "white"
                        : "black",
                      "&:hover": {
                        backgroundColor: Colors.blue_icon,
                        color: Colors.white,
                        fontWeight: "bold",
                      },
                    }}
                  >
                    <ListItemText sx={{ margin: 0 }} primary={number} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </Grid>
        {/* Right Side Table Section */}
        <Grid
          item
          xs={8.85}
          sm={8.85}
          sx={{
            height: "1000px",
            bgcolor: Colors.white,
            borderRadius: "5px",
            padding: "5px",
            overflowX: "auto",
          }}
        >
          {/* Table Rendering */}
          {dataFetched ? (
            <Box sx={{ minWidth: "2340px", whiteSpace: "nowrap" }}>
              {/* Two Tables for Two Years */}
              {selectedYears.length === 2 ? (
                <>
                  {/* First Table */}
                  {firstTableData.length > 0 && (
                    <Box sx={{ marginBottom: "20px" }}>
                      {/* Table Headers */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: Colors.lightGray,
                          padding: "10px 0",
                          borderBottom: "1px solid #e0e0e0",
                        }}
                      >
                        <Box sx={{ width: "40px" }} />
                        <Box sx={{ width: "350px", flexShrink: 0 }}>
                          <Typography variant="h6">
                            Сумма по полю Сумма ({selectedYears[0]})
                          </Typography>
                        </Box>
                        {monthArray.map((month) => (
                          <Box
                            key={month}
                            sx={{
                              width: "160px",
                              textAlign: "center",
                            }}
                          >
                            <Typography variant="subtitle2">{month}</Typography>
                          </Box>
                        ))}
                        <Box sx={{ width: "80px", textAlign: "center" }}>
                          <Typography variant="subtitle2">Total</Typography>
                        </Box>
                      </Box>
                      {/* Sub-Headers */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: Colors.lightGray,
                          padding: "10px 0",
                          borderBottom: "2px solid #e0e0e0",
                        }}
                      >
                        <Box sx={{ width: "40px" }} />
                        <Box sx={{ width: "350px", flexShrink: 0 }} />
                        {monthArray.map((month) => (
                          <React.Fragment key={month}>
                            <Box sx={{ width: "80px", textAlign: "center" }}>
                              <Typography variant="subtitle2">Plan</Typography>
                            </Box>
                            <Box sx={{ width: "80px", textAlign: "center" }}>
                              <Typography variant="subtitle2">Fact</Typography>
                            </Box>
                          </React.Fragment>
                        ))}
                        <Box sx={{ width: "80px", textAlign: "center" }} />
                      </Box>
                      {/* Table Body */}
                      <Box>
                        {firstTableData.map((row) => (
                          <DataRow key={row.id} row={row} />
                        ))}
                      </Box>
                    </Box>
                  )}

                  {/* Second Table */}
                  {secondTableData.length > 0 && (
                    <Box sx={{ minWidth: "2340px" }}>
                      {/* Table Headers */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: Colors.lightGray,
                          padding: "10px 0",
                          borderBottom: "1px solid #e0e0e0",
                        }}
                      >
                        <Box sx={{ width: "40px" }} />
                        <Box sx={{ width: "350px", flexShrink: 0 }}>
                          <Typography variant="h6">
                            Сумма по полю Сумма ({selectedYears[1]})
                          </Typography>
                        </Box>
                        {monthArray.map((month) => (
                          <Box
                            key={month}
                            sx={{
                              width: "160px",
                              textAlign: "center",
                            }}
                          >
                            <Typography variant="subtitle2">{month}</Typography>
                          </Box>
                        ))}
                        <Box sx={{ width: "80px", textAlign: "center" }}>
                          <Typography variant="subtitle2">Total</Typography>
                        </Box>
                      </Box>
                      {/* Sub-Headers */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: Colors.lightGray,
                          padding: "10px 0",
                          borderBottom: "2px solid #e0e0e0",
                        }}
                      >
                        <Box sx={{ width: "40px" }} />
                        <Box sx={{ width: "350px", flexShrink: 0 }} />
                        {monthArray.map((month) => (
                          <React.Fragment key={month}>
                            <Box sx={{ width: "80px", textAlign: "center" }}>
                              <Typography variant="subtitle2">Plan</Typography>
                            </Box>
                            <Box sx={{ width: "80px", textAlign: "center" }}>
                              <Typography variant="subtitle2">Fact</Typography>
                            </Box>
                          </React.Fragment>
                        ))}
                        <Box sx={{ width: "80px", textAlign: "center" }} />
                      </Box>
                      {/* Table Body */}
                      <Box>
                        {secondTableData.map((row) => (
                          <DataRow key={row.id} row={row} />
                        ))}
                      </Box>
                    </Box>
                  )}
                </>
              ) : selectedYears.length === 1 ? (
                /* Single Table for One Year */
                firstTableData.length > 0 ? (
                  <Box sx={{ minWidth: "2340px" }}>
                    {/* Table Headers */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: Colors.lightGray,
                        padding: "10px 0",
                        borderBottom: "1px solid #e0e0e0",
                      }}
                    >
                      <Box sx={{ width: "40px" }} />
                      <Box sx={{ width: "350px", flexShrink: 0 }}>
                        <Typography variant="h6">
                          Сумма по полю Сумма ({selectedYears[0]})
                        </Typography>
                      </Box>
                      {monthArray.map((month) => (
                        <Box
                          key={month}
                          sx={{
                            width: "160px",
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="subtitle2">{month}</Typography>
                        </Box>
                      ))}
                      <Box sx={{ width: "80px", textAlign: "center" }}>
                        <Typography variant="subtitle2">Total</Typography>
                      </Box>
                    </Box>
                    {/* Sub-Headers */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: Colors.lightGray,
                        padding: "10px 0",
                        borderBottom: "2px solid #e0e0e0",
                      }}
                    >
                      <Box sx={{ width: "40px" }} />
                      <Box sx={{ width: "350px", flexShrink: 0 }} />
                      {monthArray.map((month) => (
                        <React.Fragment key={month}>
                          <Box sx={{ width: "80px", textAlign: "center" }}>
                            <Typography variant="subtitle2">Plan</Typography>
                          </Box>
                          <Box sx={{ width: "80px", textAlign: "center" }}>
                            <Typography variant="subtitle2">Fact</Typography>
                          </Box>
                        </React.Fragment>
                      ))}
                      <Box sx={{ width: "80px", textAlign: "center" }} />
                    </Box>
                    {/* Table Body */}
                    <Box>
                      {firstTableData.map((row) => (
                        <DataRow key={row.id} row={row} />
                      ))}
                    </Box>
                  </Box>
                ) : (
                  <Typography>No data available for the selected year.</Typography>
                )
              ) : (
                // No years selected
                <Typography>Select at least one year to display data.</Typography>
              )}
            </Box>
          ) : (
            // Data not fetched yet
            <Typography>Select years and click REFRESH to load data.</Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default AnalizeYearDashboard;



  // Modified DataRow component using Box instead of TableRow and TableCell
  function DataRow({ row, depth = 0 }) {
    const [open, setOpen] = useState(false);
    const hasSubRows = row.subRows && row.subRows.length > 0;

    return (
      <React.Fragment>
        {/* Main Row */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: depth % 2 === 0 ? "#f9f9f9" : "#ffffff",
            paddingLeft: `${depth * 0.1}px`, // Indent sub-rows
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          {/* Arrow Icon */}
          <Box sx={{ width: "40px" }}>
            {hasSubRows && (
              <IconButton size="small" onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            )}
          </Box>

          {/* Name Cell */}
          <Box sx={{ width: "350px", flexShrink: 0 }}>
            <Typography variant="body1">{row.name}</Typography>
          </Box>

          {/* Months Data Cells */}
          {monthArray.map((month) => (
            <React.Fragment key={month}>
              <Box sx={{ width: "80px", textAlign: "center" }}>
                {row.months[month]?.plan || 0}
              </Box>
              <Box sx={{ width: "80px", textAlign: "center" }}>
                {row.months[month]?.fact || 0}
              </Box>
            </React.Fragment>
          ))}

          {/* Sum Cells */}
          <Box sx={{ width: "80px", textAlign: "center" }}>{row.sum}</Box>
        </Box>

        {/* Collapsible Sub-Rows */}
        {hasSubRows && open && (
          <Box>
            {row.subRows.map((subRow) => (
              <DataRow key={subRow.id} row={subRow} depth={depth + 1} />
            ))}
          </Box>
        )}
      </React.Fragment>
    );
  }

  DataRow.propTypes = {
    row: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      name: PropTypes.string.isRequired,
      months: PropTypes.object.isRequired,
      sum: PropTypes.number.isRequired,
      subRows: PropTypes.array,
    }).isRequired,
    depth: PropTypes.number,
  };

  <Grid
  item
  xs={9.25}
  sm={9.25}
  sx={{
    height: "auto",
    bgcolor: Colors.white,
    borderRadius: "5px",
    padding: "5px",
    overflowX: "auto", // Enable horizontal scrolling
  }}
>
  {/* Wrapper Box with scrolling properties */}
  <Box sx={{ minWidth: "2340px",whiteSpace: "nowrap" , }}>
      <Box sx={{ minWidth: "2340px",}}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: Colors.lightGray,
            padding: "10px 0",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <Box sx={{ width: "40px" }} />
          <Box sx={{ width: "350px", flexShrink: 0 ,}}>
            <Typography variant="h6">Сумма Сумма</Typography>
          </Box>
          {monthArray.map((month) => (
            <Box
              key={month}
              sx={{
                width: "160px",
                textAlign: "center",
              }}
            >
              <Typography variant="subtitle2">{month}</Typography>
            </Box>
          ))}
          <Box sx={{ width: "80px", textAlign: "center" }}>
            <Typography variant="subtitle2">Total</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: Colors.lightGray,
            padding: "10px 0",
            borderBottom: "2px solid #e0e0e0",
          }}
        >
          <Box sx={{ width: "40px" }} />
          <Box sx={{ width: "350px", flexShrink: 0 }} />
          {monthArray.map((month) => (
            <React.Fragment key={month}>
              <Box sx={{ width: "80px", textAlign: "center" }}>
                <Typography variant="subtitle2">Plan</Typography>
              </Box>
              <Box sx={{ width: "80px", textAlign: "center" }}>
                <Typography variant="subtitle2">Fact</Typography>
              </Box>
            </React.Fragment>
          ))}
          <Box sx={{ width: "80px", textAlign: "center" }} />
        </Box>
        <Box>
          {firsttableData.map((row) => (
            <DataRow key={row.id} row={row} />
          ))}
        </Box>
      </Box>
  </Box>
</Grid>



import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  OutlinedInput,
  FormControl,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import LightHeader from "../../components/LightHeader/LightHeader";
import { Colors } from "../../styles/theme";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PropTypes from "prop-types";
import axios from "axios";

// Branch section
const top128Filials = [
  { title: "Республика", id: 1 },
  // ... other filials ...
];

// Filials section
const setSelectedSecondMap = {
  // ... filial data ...
};

// Month names
const monthsList = [
  { name: "January", id: 1 },
  { name: "February", id: 2 },
  // ... other months ...
  { name: "December", id: 12 },
];

const numbersList = ["561", "562", "563", "564", "565", "566", "567"];

// Mock table data
const tableData = {
  selectedFirstYear: 2023,
  selectedSecondYear: 2024,
  selectedMonths: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  data: [
    {
      id: "1",
      name: "561",
      months: {
        January: {
          firstYear: 2023,
          secondYear: 2024,
          differencePercentage: "18",
          differenceAmount: "37600",
        },
        // ... other months ...
      },
      firstYearTotalSum: "866,007",
      secondYearTotalSum: "846,963",
      subRows: [
        // ... subRows ...
      ],
    },
    // ... more rows as needed ...
  ],
};

// Define the list of years
const yearsList = [
  { label: 2020 },
  { label: 2021 },
  { label: 2022 },
  { label: 2023 },
  { label: 2024 },
];

const AnalizeYearDashboard = () => {
  // State variables
  const [checkedItems, setCheckedItems] = useState([]);
  const [openRows, setOpenRows] = useState({});
  const [selectedMonths, setSelectedMonths] = useState(tableData.selectedMonths);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [firstTableData, setFirstTableData] = useState(tableData);
  const [selectedYears, setSelectedYears] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [firstYear, setFirstYear] = useState(tableData.selectedFirstYear);
  const [secondYear, setSecondYear] = useState(tableData.selectedSecondYear);

  const monthArray = selectedMonths;

  // DataRow component
  function DataRow({ row, depth = 0, monthArray }) {
    const [open, setOpen] = useState(false);
    const hasSubRows = row.subRows && row.subRows.length > 0;

    return (
      <React.Fragment>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: depth % 2 === 0 ? "#f9f9f9" : "#ffffff",
            paddingLeft: `${depth * 10}px`,
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <Box sx={{ width: "40px" }}>
            {hasSubRows && (
              <IconButton size="small" onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            )}
          </Box>
          <Box sx={{ width: "350px", flexShrink: 0 }}>
            <Typography variant="body1">{row.name}</Typography>
          </Box>

          {monthArray.map((month) => (
            <React.Fragment key={month}>
              <Box sx={{ width: "80px", textAlign: "center" }}>
                {row.months[month]?.firstYear || "-"}
              </Box>
              <Box sx={{ width: "80px", textAlign: "center" }}>
                {row.months[month]?.secondYear || "-"}
              </Box>
              <Box sx={{ width: "80px", textAlign: "center" }}>
                {row.months[month]?.differencePercentage || "-"}%
              </Box>
              <Box sx={{ width: "80px", textAlign: "center" }}>
                {row.months[month]?.differenceAmount || "-"}
              </Box>
            </React.Fragment>
          ))}

          <Box sx={{ width: "80px", textAlign: "center" }}>
            {row.firstYearTotalSum}
          </Box>
          <Box sx={{ width: "80px", textAlign: "center" }}>
            {row.secondYearTotalSum}
          </Box>
        </Box>

        {hasSubRows && open && (
          <Box>
            {row.subRows.map((subRow) => (
              <DataRow
                key={subRow.id}
                row={subRow}
                depth={depth + 1}
                monthArray={monthArray}
              />
            ))}
          </Box>
        )}
      </React.Fragment>
    );
  }

  DataRow.propTypes = {
    row: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      months: PropTypes.object.isRequired,
      firstYearTotalSum: PropTypes.string.isRequired,
      secondYearTotalSum: PropTypes.string.isRequired,
      subRows: PropTypes.array,
    }).isRequired,
    depth: PropTypes.number,
    monthArray: PropTypes.array.isRequired,
  };

  // YearPicker component
  const YearPicker = ({
    yearsList,
    selectedYears,
    setSelectedYears,
    setFirstYear,
    setSecondYear,
  }) => {
    const handleChange = (event) => {
      const {
        target: { value },
      } = event;

      // Convert the value to an array if it's a string
      const selected = typeof value === "string" ? value.split(",") : value;

      // Ensure the selected years are sorted in ascending order
      const sortedSelected = selected.slice(0, 2).sort((a, b) => a - b);
      setSelectedYears(sortedSelected);

      // Update firstYear and secondYear states based on sorted selection
      setFirstYear(sortedSelected[0] || null); // If no selection, set to null
      setSecondYear(sortedSelected[1] || null); // If only one selection, set secondYear to null
    };

    return (
      <FormControl sx={{ width: "165px", marginTop: "12px" }}>
        <InputLabel id="year-picker-label">Yilni Tanlash</InputLabel>
        <Select
          labelId="year-picker-label"
          id="year-picker"
          multiple
          value={selectedYears}
          onChange={handleChange}
          input={<OutlinedInput label="Yilni Tanlash" />}
          renderValue={(selected) => selected.join(" - ")}
        >
          {yearsList.map((year) => (
            <MenuItem key={year.label} value={year.label}>
              <Checkbox
                checked={selectedYears.includes(year.label)}
                sx={{ color: Colors.blue_nbu }}
              />
              <ListItemText primary={year.label} sx={{ fontWeight: "bold" }} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  useEffect(() => {
    console.log(firstYear, "have year 1");
    console.log(secondYear, "have year 2");
  }, [firstYear, secondYear]);

  YearPicker.propTypes = {
    yearsList: PropTypes.array.isRequired,
    selectedYears: PropTypes.array.isRequired,
    setSelectedYears: PropTypes.func.isRequired,
    setFirstYear: PropTypes.func.isRequired,
    setSecondYear: PropTypes.func.isRequired,
  };

  const toggleRowOpen = (id) => {
    setOpenRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Row component for filial selection
  function Row({ filial, isOpen, onToggle, checkedItems, setCheckedItems }) {
    const subRegions = setSelectedSecondMap[filial.id] || [];

    const handleCheckboxChange = (title) => {
      setCheckedItems((prev) =>
        prev.includes(title)
          ? prev.filter((item) => item !== title)
          : [...prev, title]
      );
    };

    return (
      <>
        <TableRow sx={{ padding: 0 }}>
          {/* Checkbox cell */}
          <TableCell sx={{ padding: "2px" }}>
            <Checkbox
              onChange={(e) => {
                e.stopPropagation();
                handleCheckboxChange(filial.title);
              }}
              checked={checkedItems.includes(filial.title)}
              size="small"
            />
          </TableCell>
          {/* Clickable name cell to toggle open/close */}
          <TableCell
            sx={{
              padding: 0,
              cursor: "pointer",
              fontWeight: "bold",
              color: Colors.black,
            }}
            onClick={() => onToggle(filial.id)}
          >
            {filial.title}
          </TableCell>
        </TableRow>
        {/* Sub-region rows stay open as long as isOpen is true */}
        {isOpen && (
          <TableRow>
            <TableCell
              style={{ paddingBottom: 0, paddingTop: 0 }}
              colSpan={2}
            >
              <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 0, padding: 0 }}>
                  <Table
                    size="small"
                    aria-label="subregions"
                    sx={{ margin: 0, padding: 0 }}
                  >
                    <TableBody>
                      {subRegions.map((subRegion, index) => (
                        <TableRow key={index}>
                          <TableCell sx={{ padding: "0" }}>
                            <Checkbox
                              onChange={(e) => {
                                e.stopPropagation();
                                handleCheckboxChange(subRegion.title);
                              }}
                              checked={checkedItems.includes(subRegion.title)}
                              size="small"
                              sx={{ padding: "0" }}
                            />
                          </TableCell>

                          <TableCell
                            sx={{
                              padding: "2px",
                              cursor: "pointer",
                              fontSize: "12px",
                              fontWeight: "500",
                            }}
                            onClick={() =>
                              handleCheckboxChange(subRegion.title)
                            }
                          >
                            {subRegion.title}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        )}
      </>
    );
  }

  Row.propTypes = {
    filial: PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
    isOpen: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
    checkedItems: PropTypes.array.isRequired,
    setCheckedItems: PropTypes.func.isRequired,
  };

  // MonthPicker component
  const MonthPicker = ({ monthsList, selectedMonths, setSelectedMonths }) => {
    const [open, setOpen] = useState(false);

    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      event.stopPropagation();
      const selected = typeof value === "string" ? value.split(",") : value;
      setSelectedMonths(selected);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleOpen = () => {
      setOpen(true);
    };

    return (
      <FormControl sx={{ width: "165px", marginTop: "6px" }}>
        <InputLabel id="month-picker-label">Oyni Tanlash</InputLabel>
        <Select
          labelId="month-picker-label"
          id="month-picker"
          multiple
          open={open}
          onOpen={handleOpen}
          onClose={handleClose}
          value={selectedMonths}
          onChange={handleChange}
          input={<OutlinedInput label="Oyni Tanlash" />}
          renderValue={(selected) => selected.join(",")}
          MenuProps={{
            keepMounted: true,
          }}
        >
          {monthsList.map((month) => (
            <MenuItem
              key={month.id}
              value={month.name}
              onClick={(event) => event.stopPropagation()}
            >
              <Checkbox checked={selectedMonths.includes(month.name)} />
              <ListItemText primary={month.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  MonthPicker.propTypes = {
    monthsList: PropTypes.array.isRequired,
    selectedMonths: PropTypes.array.isRequired,
    setSelectedMonths: PropTypes.func.isRequired,
  };

  // Handle account number toggle
  const handleNumberToggle = (number) => {
    setSelectedNumbers((prev) =>
      prev.includes(number)
        ? prev.filter((item) => item !== number)
        : [...prev, number]
    );
  };

  // Send checked items to backend
  const sendCheckedItemsToBackend = async () => {
    console.log("Checked items to send:", checkedItems);
    console.log("Selected years:", selectedYears);

    try {
      // For now, we will set firstTableData to tableData
      setFirstTableData(tableData);
      setDataFetched(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      setDataFetched(false);
    }
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        px: "10px",
        bgcolor: Colors.gray_back,
        width: "100%",
        maxWidth: "100vw",
        "@media (min-width: 1920px)": {
          maxWidth: "100%",
        },
      }}
    >
      {/* Light Header Section */}
      <LightHeader />
      {/* Table Section */}
      <Grid
        container
        sx={{ height: "auto", marginTop: "5px", gap: "5px" }}
        alignItems="stretch"
      >
        {/* Left Side Filter Section */}
        <Grid
          item
          xs={2.7}
          sm={2.7}
          sx={{
            height: "auto",
            bgcolor: Colors.white,
            borderRadius: "5px",
            padding: "5px",
          }}
        >
          <Box sx={{ width: "100%", height: "40px" }}>
            {/* Send Request Button */}
            <Button
              variant="contained"
              onClick={sendCheckedItemsToBackend}
              sx={{
                width: "100%",
                fontWeight: "bold",
                color: "white",
                bgcolor: Colors.nbu,
                "&:hover": {
                  bgcolor: Colors.nbu,
                },
              }}
            >
              SEND REQUEST
            </Button>
          </Box>

          {/* Filials Select Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "5px",
              height: "95%",
            }}
          >
            {/* Left Side Filials Filter */}
            <Box
              sx={{
                width: "50%",
                display: "block",
                height: "100%",
                color: Colors.white,
              }}
            >
              <TableContainer component={Paper} sx={{ padding: 0 }}>
                <Table aria-label="collapsible table" sx={{ margin: 0 }}>
                  <TableBody>
                    {top128Filials.map((filial) => (
                      <Row
                        key={filial.id}
                        filial={filial}
                        isOpen={openRows[filial.id] || false}
                        onToggle={toggleRowOpen}
                        checkedItems={checkedItems}
                        setCheckedItems={setCheckedItems}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            {/* Right Side Year, Month, Account Filter */}
            <Box
              sx={{
                width: "50%",
                display: "block",
                height: "100%",
                color: Colors.white,
              }}
            >
              {/* Year Picker */}
              <Box
                sx={{ width: "100px", height: "auto", marginBottom: "16px" }}
              >
                <YearPicker
                  yearsList={yearsList}
                  selectedYears={selectedYears}
                  setSelectedYears={setSelectedYears}
                  setFirstYear={setFirstYear}
                  setSecondYear={setSecondYear}
                />
              </Box>
              {/* Month Picker */}
              <Box sx={{ width: "100px", height: "auto" }}>
                <MonthPicker
                  monthsList={monthsList}
                  selectedMonths={selectedMonths}
                  setSelectedMonths={setSelectedMonths}
                />
              </Box>
              {/* Account Number */}
              <List
                sx={{
                  padding: 0,
                  marginTop: 2,
                  borderTop: "1px solid gray ",
                  paddingTop: "10px",
                }}
              >
                {numbersList.map((number) => (
                  <ListItem
                    key={number}
                    onClick={() => handleNumberToggle(number)}
                    sx={{
                      padding: "5px",
                      minHeight: "30px",
                      borderRadius: "5px",
                      marginBottom: "1px",
                      border: "1px solid #AAAAAE",
                      boxShadow:
                        "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
                      backgroundColor: selectedNumbers.includes(number)
                        ? "#083473"
                        : "transparent",
                      color: selectedNumbers.includes(number)
                        ? "white"
                        : "black",
                      "&:hover": {
                        backgroundColor: Colors.blue_icon,
                        color: Colors.white,
                        fontWeight: "bold",
                      },
                    }}
                  >
                    <ListItemText sx={{ margin: 0 }} primary={number} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </Grid>
        {/* Right Side Table Section */}
        <Grid
          item
          xs={9.25}
          sm={9.25}
          sx={{
            height: "auto",
            bgcolor: Colors.white,
            borderRadius: "5px",
            padding: "5px",
            overflowX: "auto",
          }}
        >
          {dataFetched && (
            <Box sx={{ minWidth: "2340px", whiteSpace: "nowrap" }}>
              <Box sx={{ minWidth: "2340px" }}>
                {/* Main Header Row */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: Colors.lightGray,
                    padding: "10px 0",
                    borderBottom: "1px solid #e0e0e0",
                  }}
                >
                  <Box sx={{ width: "40px" }} />
                  <Box sx={{ width: "350px", flexShrink: 0 }}>
                    <Typography variant="h6">Account Name</Typography>
                  </Box>
                  {monthArray.map((month) => (
                    <Box
                      key={month}
                      sx={{ width: "240px", textAlign: "center" }}
                    >
                      <Typography variant="subtitle2">{month}</Typography>
                    </Box>
                  ))}
                  <Box sx={{ width: "160px", textAlign: "center" }}>
                    <Typography variant="subtitle2">Total</Typography>
                  </Box>
                </Box>

                {/* Sub-header Row */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: Colors.lightGray,
                    padding: "10px 0",
                    borderBottom: "2px solid #e0e0e0",
                  }}
                >
                  <Box sx={{ width: "40px" }} />
                  <Box sx={{ width: "350px", flexShrink: 0 }} />
                  {monthArray.map((month) => (
                    <React.Fragment key={month}>
                      <Box sx={{ width: "80px", textAlign: "center" }}>
                        <Typography variant="subtitle2">{firstYear}</Typography>
                      </Box>
                      <Box sx={{ width: "80px", textAlign: "center" }}>
                        <Typography variant="subtitle2">
                          {secondYear}
                        </Typography>
                      </Box>
                      <Box sx={{ width: "80px", textAlign: "center" }}>
                        <Typography variant="subtitle2">Perf.</Typography>
                      </Box>
                      <Box sx={{ width: "80px", textAlign: "center" }}>
                        <Typography variant="subtitle2">Amount</Typography>
                      </Box>
                    </React.Fragment>
                  ))}
                  <Box sx={{ width: "80px", textAlign: "center" }}>
                    <Typography variant="subtitle2">
                      Total {firstYear}
                    </Typography>
                  </Box>
                  <Box sx={{ width: "80px", textAlign: "center" }}>
                    <Typography variant="subtitle2">
                      Total {secondYear}
                    </Typography>
                  </Box>
                </Box>

                {/* Data Rows */}
                <Box>
                  {firstTableData.data.map((row) => (
                    <DataRow
                      key={row.id}
                      row={row}
                      monthArray={monthArray}
                    />
                  ))}
                </Box>
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default AnalizeYearDashboard;




const sendCheckedItemsToBackend = async () => {
    console.log("Checked items to send:", checkedItems);
    console.log("Selected years:", selectedYears);
  
    try {
      if (selectedYears.length === 1) {
        console.log("Sending request to first API for a single year");
        // Send a GET request to the first API if one year is selected
        const response = await axios.get(`/api/firstEndpoint`, {
          params: { year: selectedYears[0] },
        });
        console.log("Response from first API:", response.data);
  
        setFirstTableData(response.data);
        setSecondTableData([]);  // Clear second table data
        setDataFetched(true);
        
      } else if (selectedYears.length === 2) {
        console.log("Sending request to second API for two years");
        // Send a GET request to the second API if two years are selected
        const response = await axios.get(`/api/secondEndpoint`, {
          params: { year1: selectedYears[0], year2: selectedYears[1] },
        });
        console.log("Response from second API:", response.data);
  
        if (response.data && response.data.year1Data && response.data.year2Data) {
          setFirstTableData(response.data.year1Data);
          setSecondTableData(response.data.year2Data);
        } else {
          console.error("Data structure mismatch in response:", response.data);
          setFirstTableData([]);
          setSecondTableData([]);
        }
        setDataFetched(true);
        
      } else {
        console.log("No valid year selection, clearing data");
        setFirstTableData([]);
        setSecondTableData([]);
        setDataFetched(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setDataFetched(false);
    }
  };
