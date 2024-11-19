import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  OutlinedInput,
  ClickAwayListener,
} from "@mui/material";
import LightHeader from "../../components/LightHeader/LightHeader";
import { Colors } from "../../styles/theme";
import FormControl from "@mui/material/FormControl";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";
// import 1-mock api datda // 
import newTestAPI from "../testapi/analizeTestFirstApi";
// import 2-mock api datda //
import secondTableAPI from "../testapi/analizeSecondTable";
import { REQUESTS } from "../../api/requests";
// filials list imported //
import setSelectedSecondMap from "../testapi/SecondOptions";
// branch options list  //
import top128Filials from "../testapi/firstOption";
// loader icon //
import AnimatedIcon from "../../components/AnimatedIcon/AnimatedIcon";
import Footer from "../../components/Footer/Footer";

// month names //
const monthsList = [
  { name: "January", id: 1 },
  { name: "February", id: 2 },
  { name: "March", id: 3 },
  { name: "April", id: 4 },
  { name: "May", id: 5 },
  { name: "June", id: 6 },
  { name: "July", id: 7 },
  { name: "August", id: 8 },
  { name: "September", id: 9 },
  { name: "October", id: 10 },
  { name: "November", id: 11 },
  { name: "December", id: 12 },
];

// shot list //
const numbersList = [
  "561",
  "562",
  "563",
  "564",
  "565",
  "566",
  "567",
  "568",
  "569",
  "570",
  "571",
  "572",
  "573",
  "574",
  "575",
  "576",
  "577",
  "578",
  "579",
];

// shottext list //
const textList = [
  "Заработная плата",
  "Служба охраны",
  "Командировочные расходы",
  "Почта, телефон, факс",
  "Репрезентация",
  "Расходы на износ",
  "Налоги (иные, чем налоги на прибыль)",
  "568",
  "569",
  "570",
  "571",
  "572",
  "573",
  "574",
  "575",
  "576",
  "577",
  "578",
  "579",
];
// Combine the two lists into one array of objects
const combinedList = numbersList.map((number, index) => ({
  id: `${number}-${index}`, // Unique ID
  number,
  text: textList[index] || "", // Handle cases where textList might be shorter
}));
// Define the list of years without id
const yearsList = [
  { label: 2020 },
  { label: 2021 },
  { label: 2022 },
  { label: 2023 },
  { label: 2024 },
];

const AnalizeYearDashboard = () => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [openRows, setOpenRows] = useState({});
  const [selectedMonths, setSelectedMonths] = useState([]); // select mont name
  const [selectedNumbers, setSelectedNumbers] = useState([]); // select account book number
  const [selectedYears, setSelectedYears] = useState([]);
  const [dataFetched, setDataFetched] = useState(false); // New state variable
  const [firstYear, setFirstYear] = useState(null);
  const [secondYear, setSecondYear] = useState(null);
  const [showFirstYear, setShowFirstYear] = useState(true);
  const [showSecondYear, setShowSecondYear] = useState(true);
  const [onetable,setOneTable] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState({
    firstYear: true,
    secondYear: true,
    percentage: true,
    amount: true,
  });
  const [selectedItems, setSelectedItems] = useState([]);
  const [error, setError] = useState(null);

    // <==== MAKE SPACE CODE  =====>  //
  const insertSpaces = (text) => {
    if (!text) return ""; // Handle empty or undefined text

    // Convert to string and ensure no more than 6 characters
    const str = text.toString().slice(0, 6);

    // Add spaces every 3 digits
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  // State variables for fetched data and UI type
  const [tableData, setTableData] = useState(null); // Data fetched from backend
  const [uiType, setUiType] = useState(null); // '1-UI' or '2-UI'

  const [changeapi,setChangeAPI] = useState(true);
  // const changeAPI = changeapi ?  secondTableAPI : newTestAPI;
  const changeAPI = changeapi ?  secondTableAPI : onetable;
  // const changeAPI = newTestAPI;
  const [firsttableData, setFirstTableData] = useState( changeAPI || null );
  const [loading, setLoading] = useState(true); // Start with loading as true

  useEffect(() => {
    setFirstTableData(changeAPI);
}, [changeapi, changeAPI]);

  const handleSelect = (event, newSelection) => {
    if (newSelection !== null) {
      setSelectedButton(newSelection);
    }
  };

    // Handle year selection
    const handleYearChange = (event) => {
      const selected = typeof event.target.value === "string" ? event.target.value.split(",") : event.target.value;
      const sortedSelected = selected.slice(0, 2).sort((a, b) => a - b); // Limit to two years
      setSelectedYears(sortedSelected);
    };

  const monthArray = monthsList.map((month) => month.name);

  // <==== First DATA TABLE SECTION CODE ====>
  function DataRow({ row, depth = 0, monthArray }) {
    const [open, setOpen] = useState(false);
    const hasSubRows = row.subRows && row.subRows.length > 0;

    // Apply alternating background color as needed
    const backgroundColor = "#FFFFFF";




    return (
      <React.Fragment>
        {/* Main Row */}
        <TableRow
          onClick={() => hasSubRows && setOpen(!open)}
          sx={{
            backgroundColor: backgroundColor,
            cursor: hasSubRows ? "pointer" : "default",
            height: "20px",
          }}
        >
        <TableCell
          sx={{
            position: 'sticky',
            left: 0,
            backgroundColor: '#fff',
            zIndex: depth === 0 ? 1 : 0,
            width: '200px',
            border: '2px solid #d0d0d0',
            borderRadius: '5px',
            height: '25px',
            padding: '0px',
            paddingLeft: `${depth * 5}px`, // Indent based on depth
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            borderRight: '1px solid #d0d0d0',
          }}
            >
            <Typography
              variant="body1"
              sx={{
                fontSize: '16px',
                fontWeight: 'bold',
                paddingLeft: '5px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '100%',
              }}
            >
              {row.name}
            </Typography>
          </TableCell>

          {monthArray.map((month) => (
            <React.Fragment key={month}>
            {visibleColumns.firstYear && (
              <TableCell
                sx={{
                  width: '80px',
                  border: '2px solid #d0d0d0',
                  borderRadius: '5px',
                  height: '20px',
                  padding: '0 4px',
                  textAlign: 'right',
                  display: visibleColumns.firstYear ? 'table-cell' : 'none', // Hide or show
                }}
              >
                {insertSpaces(row.months[month]?.newfirstYear) || '-'}
              </TableCell>
            )}
              {visibleColumns.secondYear && (
              <TableCell
                sx={{
                  width: "80px",
                  border: "2px solid #d0d0d0",
                  borderRadius: "5px",
                  height: "20px",
                  padding: "0 4px",
                  textAlign: "right",
                }}
              >
                {insertSpaces(row.months[month]?.newsecondYear) || "-"}
              </TableCell>
              )}
              {visibleColumns.percentage && (
              <TableCell
                sx={{
                  width: "80px",
                  textAlign: "center",
                  border: "2px solid #d0d0d0",
                  borderRadius: "5px",
                  height: "20px",
                  padding: "0 4px",
                }}
              >
                {row.months[month]?.differencePercentage || "-"}%
              </TableCell>
              )}
              {visibleColumns.amount && (
              <TableCell
                sx={{
                  width: "80px",
                  border: "2px solid #d0d0d0",
                  borderRadius: "5px",
                  height: "20px",
                  padding: "0 4px",
                  textAlign: "right",
                }}
              >
                {insertSpaces(row.months[month]?.differenceAmount) || "-"}
              </TableCell>
                )}
            </React.Fragment>
          ))}
          {visibleColumns.firstYear && (
          <TableCell
            sx={{
              width: "80px",
              border: "2px solid #d0d0d0",
              borderRadius: "5px",
              height: "20px",
              padding: "0 4px",
              textAlign: "right",
            }}
          >
            {insertSpaces(row?.firstYearTotalSum) || "-"}
          </TableCell>
          )}
          {visibleColumns.secondYear && (
          <TableCell
            sx={{
              width: "80px",
              border: "2px solid #d0d0d0",
              borderRadius: "5px",
              height: "20px",
              padding: "0 4px",
              textAlign: "right",
            }}
          >
            {insertSpaces(row?.secondYearTotalSum) || "-"}
          </TableCell>
          )}
          {visibleColumns.percentage && (
          <TableCell
            sx={{
              width: "80px",
              textAlign: "center",
              border: "2px solid #d0d0d0",
              borderRadius: "5px",
              height: "20px",
              padding: "0 4px",
            }}
          >
            {row?.percentageSeparateTotal || "-"}%
          </TableCell>
          )}
          {visibleColumns.amount && (
          <TableCell
            sx={{
              width: "80px",
              border: "2px solid #d0d0d0",
              borderRadius: "5px",
              height: "20px",
              padding: "0 4px",
              textAlign: "right",
            }}
          >
            {insertSpaces(row?.amountSeparateTotal) || "-"}
          </TableCell>
          )}
        </TableRow>

        {/* Subrows */}
        {hasSubRows &&
          open &&
          row.subRows.map((subRow) => (
            <DataRow
              key={subRow.id}
              row={subRow}
              depth={depth + 1}
              monthArray={monthArray}
            />
          ))}
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

   // <==== SECOND DATA TABLE SECTION CODE ====>
    function SecondDataRow({ row, depth = 0, monthArray }) {
      const [open, setOpen] = useState(false);
      const hasSubRows = row.subRows && row.subRows.length > 0;
  
      // Apply alternating background color as needed
      const backgroundColor = "#FFFFFF";
  
      return (
        <React.Fragment>
          {/* Main Row */}
          <TableRow
            onClick={() => hasSubRows && setOpen(!open)}
            sx={{
              backgroundColor: backgroundColor,
              cursor: hasSubRows ? "pointer" : "default",
              height: "20px",
            }}
          >
            <TableCell
              sx={{
                width: "800px",
                border: "2px solid #d0d0d0",
                borderRadius: "5px",
                height: "25px",
                padding: "0px",
                paddingLeft: `${depth * 5}px`, // Indent based on depth
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  paddingLeft: "5px",
                  whiteSpace: "nowrap", // Prevents text from wrapping to the next line
                  overflow: "hidden", // Ensures overflowed text is clipped
                  textOverflow: "ellipsis", // Adds ellipses when text overflows
                  display: "block", // Ensures the element behaves as a block for ellipsis
                }}
              >
                {row.name}
              </Typography>
            </TableCell>
  
            {monthArray.map((month) => (
              <React.Fragment key={month}>
                <TableCell
                  sx={{
                    width: "80px",
                    border: "2px solid #d0d0d0",
                    borderRadius: "5px",
                    height: "20px",
                    padding: "0 4px",
                    textAlign: "right",
                    display: showFirstYear ? "table-cell" : "none",
                  }}
                >
                  {row.months[month]?.plan || "-"}
                </TableCell>
                <TableCell
                  sx={{
                    width: "80px",
                    border: "2px solid #d0d0d0",
                    borderRadius: "5px",
                    height: "20px",
                    padding: "0 4px",
                    textAlign: "right",
                  }}
                >
                  {row.months[month]?.fackt || "-"}
                </TableCell>
                <TableCell
                  sx={{
                    width: "80px",
                    textAlign: "center",
                    border: "2px solid #d0d0d0",
                    borderRadius: "5px",
                    height: "20px",
                    padding: "0 4px",
                  }}
                >
                  {row.months[month]?.difference_Plan_Percentage || "-"}%
                </TableCell>
                <TableCell
                  sx={{
                    width: "80px",
                    border: "2px solid #d0d0d0",
                    borderRadius: "5px",
                    height: "20px",
                    padding: "0 4px",
                    textAlign: "right",
                  }}
                >
                  {row.months[month]?.difference_Plan_Amount || "-"}
                </TableCell>
              </React.Fragment>
            ))}
  
            <TableCell
              sx={{
                width: "80px",
                border: "2px solid #d0d0d0",
                borderRadius: "5px",
                height: "20px",
                padding: "0 4px",
                textAlign: "right",
              }}
            >
              {row?.plan_TotalSum || "-"}
            </TableCell>
            <TableCell
              sx={{
                width: "80px",
                border: "2px solid #d0d0d0",
                borderRadius: "5px",
                height: "20px",
                padding: "0 4px",
                textAlign: "right",
              }}
            >
              {row?.fackt_TotalSum || "-"}
            </TableCell>
            <TableCell
              sx={{
                width: "80px",
                textAlign: "center",
                border: "2px solid #d0d0d0",
                borderRadius: "5px",
                height: "20px",
                padding: "0 4px",
              }}
            >
              {row?.percentageSeparateTotal || "-"}%
            </TableCell>
            <TableCell
              sx={{
                width: "80px",
                border: "2px solid #d0d0d0",
                borderRadius: "5px",
                height: "20px",
                padding: "0 4px",
                textAlign: "right",
              }}
            >
              {row?.amountSeparateTotal || "-"}
            </TableCell>
          </TableRow>
  
          {/* Subrows */}
          {hasSubRows &&
            open &&
            row.subRows.map((subRow) => (
              <SecondDataRow
                key={subRow.id}
                row={subRow}
                depth={depth + 1}
                monthArray={monthArray}
              />
            ))}
        </React.Fragment>
      );
    }
  
    // SecondDataRow.propTypes = {
    //   row: PropTypes.shape({
    //     id: PropTypes.string.isRequired,
    //     name: PropTypes.string.isRequired,
    //     months: PropTypes.object.isRequired,
    //     firstYearTotalSum: PropTypes.string.isRequired,
    //     secondYearTotalSum: PropTypes.string.isRequired,
    //     subRows: PropTypes.array,
    //   }).isRequired,
    //   depth: PropTypes.number,
    //   monthArray: PropTypes.array.isRequired,
    // };

  // select account number //
  const handleNumberToggle = (number) => {
    setSelectedNumbers((prev) =>
      prev.includes(number)
        ? prev.filter((item) => item !== number)
        : [...prev, number]
    );
  };

  // Updated YearPicker Component
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
      <FormControl
        sx={{
          width: "100%", // Reduced width
          marginTop: "8px", // Reduced top margin
          "& .MuiInputLabel-root": {
            fontSize: "1rem", // Smaller label font size
            color: Colors.dark,
          },
          "& .MuiSelect-root": {
            fontSize: "0.8rem", // Smaller select font size
          },
        }}
        size="small" // Use small size for compactness
      >
        <InputLabel id="year-picker-label">Yilni Tanlash</InputLabel>
        <Select
          labelId="year-picker-label"
          id="year-picker"
          multiple
          value={selectedYears}
          onChange={handleChange}
          input={<OutlinedInput label="Yilni Tanlash" />}
          renderValue={(selected) => selected.join(" - ")}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200, // Adjust as needed
                width: 150, // Adjust as needed
              },
            },
          }}
        >
          {yearsList.map((year) => (
            <MenuItem
              key={year.label}
              value={year.label}
              sx={{
                padding: "4px 8px", // Reduced padding for compactness
                display: "flex",
                alignItems: "center",
                gap: "8px", // Reduced gap between Checkbox and Text
              }}
            >
              <Checkbox
                checked={selectedYears.includes(year.label)}
                sx={{ color: Colors.blue_nbu, padding: "0" }} // Removed extra padding
                size="small" // Optional: Use small size for the checkbox
              />
              <ListItemText
                primary={year.label}
                sx={{ fontSize: "0.8rem", margin: 0 }} // Reduced font size and removed margin
              />
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

  // <==== YEAR PICKER proptype   ====> //
  YearPicker.propTypes = {
    yearsList: PropTypes.array.isRequired,
    selectedYears: PropTypes.array.isRequired,
    setSelectedYears: PropTypes.func.isRequired,
    // setFirstYear: PropTypes.func.isRequired,
    // setSecondYear: PropTypes.func.isRequired,
  };

  // const toggleRowOpen = (id) => {
  //   setOpenRows((prev) => ({
  //     ...prev,
  //     [id]: !prev[id],
  //   }));
  // };

  const toggleRowOpen = (id) => {
    if (id === 1) {
      // If "Respublika" is toggled
      setOpenRows((prev) => {
        const allOpen = !prev[id]; // Toggle the state of "Respublika"
        const newOpenRows = {};
        top128Filials.forEach((filial) => {
          newOpenRows[filial.id] = allOpen;
        });
        return newOpenRows;
      });
    } else {
      setOpenRows((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));
    }
  };

  // Filials name section  //

// function Row({ filial, isOpen, onToggle, checkedItems, setCheckedItems }) {
//     const subRegions = setSelectedSecondMap[filial.id] || [];

//     // Extract titles of subRegions
//     const subRegionTitles = subRegions.map((sub) => sub.title);

//     // Determine if all subRegions are checked
//     const allSubChecked = subRegionTitles.every((title) =>
//       checkedItems.includes(title)
//     );

//     // Determine if some (but not all) subRegions are checked
//     const someSubChecked =
//       subRegionTitles.some((title) => checkedItems.includes(title)) &&
//       !allSubChecked;

//     // Handle main branch checkbox change
//     const handleMainCheckboxChange = (event) => {
//       const { checked } = event.target;
//       if (checked) {
//         // Add main branch and all subRegions to checkedItems
//         setCheckedItems((prev) => [
//           ...new Set([...prev, filial.title, ...subRegionTitles]),
//         ]);
//       } else {
//         // Remove main branch and all subRegions from checkedItems
//         setCheckedItems((prev) =>
//           prev.filter(
//             (item) => item !== filial.title && !subRegionTitles.includes(item)
//           )
//         );
//       }
//     };

//     // Handle subRegion checkbox change
//     const handleSubCheckboxChange = (title) => {
//       setCheckedItems((prev) =>
//         prev.includes(title)
//           ? prev.filter((item) => item !== title)
//           : [...prev, title]
//       );
//     };

//     // Handle click on subRegion name to toggle checkbox
//     const handleSubRegionClick = (title) => {
//       handleSubCheckboxChange(title);
//     };

//     return (
//       <>
//         <TableRow
//           sx={{
//             height: "55px",
//             paddingLeft: "0px",
//             display: "flex",
//             alignItems: "center",
//           }}
//         >
//           {/* Checkbox cell */}
//           <TableCell sx={{ padding: "0px", width: "21px" }}>
//             <Checkbox
//               onChange={handleMainCheckboxChange}
//               checked={allSubChecked}
//               indeterminate={someSubChecked}
//               size="small"
//               sx={{ margin: 0, padding: "0px", paddingBottom: "2px" }}
//             />
//           </TableCell>
//           {/* Clickable name cell to toggle open/close */}
//           <TableCell
//             sx={{
//               padding: 0,
//               cursor: "pointer",
//               fontWeight: "bold",
//               color: Colors.black,
//               whiteSpace: "nowrap", 
//               overflow:"hidden",
//               textOverflow:"ellipsis",
//               width:"100%",
//               height:"22px",
//             }}
//             onClick={() => onToggle(filial.id)} // Pass filial.id to handleToggle
//           >
//             {filial.title}
//           </TableCell>
//         </TableRow>
//         {/* Sub-region rows stay open as long as isOpen is true */}
//         {isOpen && (
//           <TableRow sx={{ display: "flex", alignItems: "center" }}>
//             <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
//               <Collapse in={isOpen} timeout="auto" unmountOnExit>
//                 <Box sx={{ margin: 0, padding: 0 }}>
//                   <Box sx={{ margin: "0.5px" }}>
//                     {subRegions.map((subRegion, index) => (
//                       <TableRow key={index} sx={{ padding: "0px",display:"flex",alignItems:"center" }}>
//                         <TableCell
//                           sx={{
//                             padding: "0px",
//                             width: "20px",
//                             height:"20px",
//                             display: "flex",
//                             alignItems: "center",
//                             verticalAlign: "center",
//                           }}
//                         >
//                           <Checkbox
//                             onChange={(e) => {
//                               e.stopPropagation(); // Prevent the click event from triggering handleToggle
//                               handleSubCheckboxChange(subRegion.title);
//                             }}
//                             checked={checkedItems.includes(subRegion.title)}
//                             size="small"
//                             sx={{ margin: 0, padding: "0px" , height:"20px",}}
//                           />
//                         </TableCell>

//                         <TableCell
//                           sx={{
//                             padding: "2px",
//                             margin: "0px",
//                             cursor: "pointer",
//                             fontSize: "14px",
//                             fontWeight: "500",
//                             paddingLeft: "-5px",
//                             whiteSpace: "nowrap", 
//                             overflow:"hidden",
//                             textOverflow:"ellipsis",
//                             width:"110px",
//                             height:"20px",
//                           }}
//                           onClick={() => handleSubRegionClick(subRegion.title)}
//                         >
//                           {subRegion.title}
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </Box>
//                 </Box>
//               </Collapse>
//             </TableCell>
//           </TableRow>
//         )}
//       </>
//     );
//   }

function Row({ filial, isOpen, onToggle, checkedItems, setCheckedItems }) {
  let subRegions = setSelectedSecondMap[filial.id] || [];
  let subRegionTitles = subRegions.map((sub) => sub.title);

  if (filial.title === "Respublika") {
    // For "Respublika", subRegions are all filials except "Respublika" itself
    subRegions = top128Filials
      .filter((f) => f.title !== "Respublika")
      .map((f) => ({ title: f.title }));
    subRegionTitles = subRegions.map((sub) => sub.title);
  }

  // Determine if all subRegions are checked
  const allSubChecked = subRegionTitles.every((title) =>
    checkedItems.includes(title)
  );

  // Determine if some (but not all) subRegions are checked
  const someSubChecked =
    subRegionTitles.some((title) => checkedItems.includes(title)) &&
    !allSubChecked;

  // Handle main branch checkbox change
  const handleMainCheckboxChange = (event) => {
    const { checked } = event.target;
    if (checked) {
      // Add main branch and all subRegions to checkedItems
      setCheckedItems((prev) => [
        ...new Set([...prev, filial.title, ...subRegionTitles]),
      ]);
    } else {
      // Remove main branch and all subRegions from checkedItems
      setCheckedItems((prev) =>
        prev.filter(
          (item) => item !== filial.title && !subRegionTitles.includes(item)
        )
      );
    }
  };

  // Handle subRegion checkbox change
  const handleSubCheckboxChange = (title) => {
    setCheckedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  // Handle click on subRegion name to toggle checkbox
  const handleSubRegionClick = (title) => {
    handleSubCheckboxChange(title);
  };

  return (
    <>
      <TableRow
        sx={{
          paddingLeft: "0px",
          display: "flex",
          alignItems: "center",
          verticalAlign:"center",
          height: "53px",
          borderBottom:"1px solid #AAAAAE"
        }}
      >
        {/* Checkbox cell */}
        <TableCell sx={{ padding: "0px", width: "21px",border:"none" }}>
          <Checkbox
            onChange={handleMainCheckboxChange}
            checked={allSubChecked}
            indeterminate={someSubChecked}
            size="small"
            sx={{ margin: 0, padding: "0px", paddingBottom: "2px" }}
          />
        </TableCell>
        {/* Clickable name cell to toggle open/close */}
        <TableCell
          sx={{
            padding: 0,
            cursor: "pointer",
            fontWeight: "bold",
            color: Colors.black,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
            height: "22px",
            border:"none"
          }}
          onClick={() => onToggle(filial.id)}
        >
          {filial.title}
        </TableCell>
      </TableRow>
      {/* Sub-region rows stay open as long as isOpen is true */}
      {isOpen && (
        <TableRow sx={{ display: "flex", alignItems: "center" }}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 0, padding: 0 }}>
                <Box sx={{ margin: "0.5px" }}>
                  {subRegions.map((subRegion, index) => (
                    <TableRow
                      key={index}
                      sx={{ padding: "0px", display: "flex", alignItems: "center", }}
                    >
                      <TableCell
                        sx={{
                          padding: "0px",
                          width: "20px",
                          height: "20px",
                          display: "flex",
                          alignItems: "center",
                          verticalAlign: "center",
                        }}
                      >
                        <Checkbox
                          onChange={(e) => {
                            e.stopPropagation();
                            handleSubCheckboxChange(subRegion.title);
                          }}
                          checked={checkedItems.includes(subRegion.title)}
                          size="small"
                          sx={{ margin: 0, padding: "0px", height: "20px" }}
                        />
                      </TableCell>

                      <TableCell
                        sx={{
                          padding: "2px",
                          margin: "0px",
                          cursor: "pointer",
                          fontSize: "14px",
                          fontWeight: "500",
                          paddingLeft: "-5px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          width: "100px",
                          height: "20px",
                        }}
                        onClick={() => handleSubRegionClick(subRegion.title)}
                      >
                        {subRegion.title}
                      </TableCell>
                    </TableRow>
                  ))}
                </Box>
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

  // <=== SELECT MONTHS SECTION ===>

  const MonthPicker = ({ monthsList, selectedMonths, setSelectedMonths }) => {

    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setSelectedMonths(
        typeof value === 'string' ? value.split(',') : value,
      );
    };


    return (
      <FormControl
        sx={{
          width: "100%",
          "& .MuiInputLabel-root": {
            fontSize: "1rem",
            color: Colors.dark,
          },
          "& .MuiSelect-root": {
            fontSize: "0.8rem",
          },
        }}
        size="small"
      >
        <InputLabel id="month-picker-label">Oyni Tanlash</InputLabel>
        <Select
          multiple
          labelId="month-picker-label"
          id="month-picker"
          value={selectedMonths}
          onChange={handleChange}
          input={<OutlinedInput label="Oyni Tanlash" />}
          renderValue={(selected) => selected.join(", ")}
        >
          {monthsList.map((month) => (
            <MenuItem
              key={month.id}
              value={month.name}
              sx={{
                padding: "4px 8px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Checkbox
                checked={selectedMonths.includes(month.name)}
                sx={{ color: Colors.blue_nbu, padding: 0 }}
                size="small"
              />
              <ListItemText
                primary={month.name}
                sx={{ fontSize: "0.8rem", margin: 0 }}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  MonthPicker.propTypes = {
    monthsList: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      })
    ).isRequired,
    selectedMonths: PropTypes.arrayOf(PropTypes.string).isRequired,
    setSelectedMonths: PropTypes.func.isRequired,
  };


  // <=== SELECT FIRST YEAR FUNCTION ====> //
  const handleHideFirstYear = () => {
    setShowFirstYear((prev) => !prev);
  };
  const handleHideSecondYear = () => {
    setShowSecondYear((prev) => !prev);
  };

  // Function to get all subregion filial names (excluding main filial titles)
  const getAllFilialNames = () => {
    let allFilialNames = [];

    // Get subregion titles only
    Object.values(setSelectedSecondMap).forEach((subRegions) => {
      subRegions.forEach((subRegion) => {
        allFilialNames.push(subRegion.title);
      });
    });

    return allFilialNames;
  };

      // Function to collect selected data and prepare parameters
  const getSelectedParams = () => {
          const params = {};

          // Account Numbers
          params.accountNumbers = selectedNumbers.length
            ? selectedNumbers
            : numbersList; // Default to all numbers if none selected

          // Months
          params.months = selectedMonths.length
            ? selectedMonths
            : monthsList.map((month) => month.name); // Default to all months if none selected

           // Filials
            params.filials = checkedItems.length
            ? checkedItems
            : ["Respublika"]; // If no filials selected, send all filial names

          return params;
  };
  

  const toggleColumnVisibility = (columnKey) => {
          setVisibleColumns((prev) => {
            const updatedVisibility = { ...prev, [columnKey]: !prev[columnKey] };

            // Ensure at least one column is visible
            const visibleCount = Object.values(updatedVisibility).filter(Boolean).length;
            if (visibleCount === 0) return prev;

            return updatedVisibility;
          });

        };

// send request to backend //
const sendCheckedItemsToBackend = async () => {
  console.log("Checked items to send:", checkedItems);
  console.log("Selected years:", selectedYears);

  const params = getSelectedParams();

  // Create formatted parameters, converting arrays to comma-separated strings
  const formattedParams = {
    choosedfirstYear: selectedYears[0],
    choosedsecondYear: selectedYears[1],
    newMonths: (params.months || []), // Convert to comma-separated string
    accountNumbers: (params.accountNumbers || []).join(','), // Convert to comma-separated string
    // filials: Excluded as per your request
    filials: params.filials || [],
  };


  try {

    console.log("Formatted Params:", formattedParams);

    const response = await REQUESTS.financialAnalize.getFinancialAnalize(
      formattedParams
    );

    
    if (selectedYears.length === 1) {
      // **1-UI Logic**
      console.log("Fetching data for 1-UI (single year selected)...");

      const response = await REQUESTS.financialAnalize.getFinancialAnalize({
        year: selectedYears[0],
        ...formattedParams,
      });

      console.log("Response for 1-UI:", response.data);
      setFirstTableData(response.data); // Assuming firstTableData is used for 1-UI
      setTableData(response.data);
      setUiType("1-UI");
    } else if (selectedYears.length === 2) {setFirstTableData(response.data); // Update firsttableData directly

    console.log("Response from backend:", response.data);
    setTableData(response.data);
    setUiType("2-UI");

  } else {
    // **No Valid Selection**
    console.log("No valid year selection, clearing data");
    setTableData(null);
    setUiType(null);
  }

  } catch (error) {
    console.error("Error fetching data:", error.response?.data || error.message);
    setTableData(null);
    setUiType(null);
  }
};

// Fetch initial data for 2-UI when component mounts or selected years change
    useEffect(() => {
      const fetchFinancialData = async () => {
        if (selectedYears.length === 2) {
          try {
            setLoading(true); // Start the loader when fetching begins
            console.log("Fetching data for 2-UI (two years selected)...");
            const params = getSelectedParams();
            console.log("Generated params:", params);

            const response = await REQUESTS.financialAnalize.getFinancialAnalize({
              year1: selectedYears[0],
              year2: selectedYears[1],
              ...params,
            });
            console.log("Response for 2-UI:", response.data);
            setTableData(response.data);
            setUiType("2-UI");
          } catch (error) {
            if (error.response) {
              console.error("Server responded with an error:", error.response.data);
            } else if (error.request) {
              console.error("No response received from server:", error.request);
            } else {
              console.error("Error in setting up the request:", error.message);
            }
            setTableData(null);
            setUiType(null);
          }
            finally {
            setLoading(false);
          }
        }
      };

      fetchFinancialData();
    }, [selectedYears]);


    const handleSelectAllToggle = () => {
      if (selectedItems.length === combinedList.length) {
        setSelectedItems([]);
      } else {
        setSelectedItems(combinedList.map((item) => item.id));
      }
    };
  
    const handleItemToggle = (id) => {
      setSelectedItems((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    };


  return (
    <Container
      maxWidth={false} // This allows the container to expand beyond the default breakpoints
      disableGutters
      sx={{
        px: "10px",
        bgcolor: Colors.gray_back,
        width: "100%", // Ensure the container takes up 100% of the viewport width
        maxWidth: "100vw", // Ensure the container doesn't exceed the viewport width
        "@media (min-width: 1920px)": {
          maxWidth: "100%", // For extra-large screens, allow full width
          height:"100%"
        },
      }}
    >
      {/* <==== LIGHT HEADER SECTION ====> */}
      <LightHeader />
      {/* <==== TABLE SECTION ====> */}
      <Grid
        container
        // spacing={0.5}
        sx={{ height: "auto", marginTop: "5px", gap: "5px",marginBottom:"5px" }}
        // alignItems="stretch"
      >
        {/* <=== LEFT SIDE FILTER SECTION ====> */}
        <Grid
          item
          xs={3}
          sm={3}
          sx={{
            height: "auto",
            bgcolor: Colors.white,
            borderRadius: "5px",
            padding: "5px",
          }}
        >
          {/* <=== BUTTON'S SECTION ===>S */}
          <Box
            sx={{
              width: "100%",
              height: "45px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            {/* <====  SEND REQUEST BUTTON FOR GET DATA FROM BACKEND ====> */}
            <Button
              variant="contained"
              onClick={sendCheckedItemsToBackend}
              sx={{
                width: "79%",
                fontWeight: "bold",
                color: "white",
                bgcolor: Colors.nbu,
                height: "45px",
                "&:hover": {
                  bgcolor: Colors.nbu, // Set hover background color to be the same as default
                },
              }}
            >
              NATIJA
            </Button>
            {/* <==== GRAFUC REQUEST BUTTON ====> */}
            <Button
              variant="contained"
              // onClick={sendCheckedItemsToBackend}
              sx={{
                width: "19%",
                fontWeight: "bold",
                color: "white",
                bgcolor: Colors.nbu,
                height: "45px",
                "&:hover": {
                  bgcolor: Colors.nbu, // Set hover background color to be the same as default
                },
              }}
            >
              GRAFIK
            </Button>
          </Box>

          {/* <==== FILIALS SELECT SECTION =====> */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "5px",
              height: "100%",
              marginTop: "5px",
            }}
          >
            {/* <==== LEFT SIDE FILIALS FILTER ====> */}
            <Box
              sx={{
                width: "30%",
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

            {/* <==== RIGHT SIDE YEAR,MONT,ACCOUNT FILTER ====> */}
            <Box
              sx={{
                width: "68%",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                color: Colors.white,
                gap: "10px",
              }}
            >
              {/* <==== YEAR SELECTOR ====> */}
              <Box
                sx={{
                  width: "100%",
                  height: "auto",
                  // marginBottom: "16px",
                  bgcolor: "white",
                }}
              >
                <YearPicker
                  yearsList={yearsList}
                  selectedYears={selectedYears}
                  setSelectedYears={setSelectedYears}
                  setFirstYear={setFirstYear}
                  setSecondYear={setSecondYear}
                />
              </Box>
              {/* <===== MONTH PICKER =====> */}
              <Box sx={{ width: "100%", height: "auto" }}>
                <MonthPicker
                  monthsList={monthsList}
                  selectedMonths={selectedMonths}
                  setSelectedMonths={setSelectedMonths} 
                />
              </Box>
              {/* ACCOUNT NUMBER LIST */}
                <List
                    sx={{
                      paddingTop: "5px",
                      height: "100%",
                      overflowY: "auto",
                      "&::-webkit-scrollbar": {
                        width: "8px",
                      },
                      "&::-webkit-scrollbar-track": {
                        background: "#f1f1f1",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#C0C0C0",
                        border: "2px solid #f1f1f1",
                        transition: "background-color 0.3s ease",
                      },
                      "&::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: "#555",
                      },
                    }}
                  >
                {/* Select All ListItem */}
                <ListItem
                  onClick={handleSelectAllToggle}
                  sx={{
                    height: "35px",
                    borderRadius: "5px",
                    marginBottom: "2px",
                    border: "1px solid #AAAAAE",
                    boxShadow:
                      "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
                    backgroundColor:
                      selectedItems.length === combinedList.length
                        ? "#083473"
                        : selectedItems.length > 0
                        ? "rgba(8, 52, 115, 0.5)"
                        : "transparent",
                    color: selectedItems.length > 0 ? "white" : "black",
                    "&:hover": {
                      backgroundColor:
                        selectedItems.length === combinedList.length
                          ? "#083473"
                          : "rgba(8, 52, 115, 0.5)",
                      color: "white",
                      fontWeight: "bold",
                    },
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <ListItemText primary="Select All" />
                </ListItem>

                {/* Combined ListItems */}
                {combinedList.map((item) => (
                  <ListItem
                    key={item.id}
                    onClick={() => handleItemToggle(item.id)}
                    sx={{
                      padding: "5px",
                      minHeight: "30px",
                      borderRadius: "5px",
                      marginBottom: "1px",
                      border: "1px solid #AAAAAE",
                      boxShadow:
                        "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
                      backgroundColor: selectedItems.includes(item.id)
                        ? "#083473"
                        : "transparent",
                      color: selectedItems.includes(item.id) ? "white" : "black",
                      "&:hover": {
                        backgroundColor: Colors.blue_icon,
                        color: "white",
                        fontWeight: "bold",
                      },
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <ListItemText
                      sx={{ margin: 0 }}
                      primary={
                        <Box sx={{ display: "flex", justifyContent: "left",alignItems:"center",gap:"5px" }}>
                          <span style={{fontWeight:"bold"}}>{item.number}</span>
                          <span style={{fontWeight:"bold"}}>-</span>
                          <span style={{display:"flex",textAlign:"left",lineHeight:"0.9",fontSize:"12px"}}>{item.text}</span>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </Grid>

        {/* <=== RIGHT SIDE TABLE SECTION ====> */}
        <Grid
          item
          xs={8.95}
          sm={8.95}
          sx={{
            height: "auto",
            bgcolor: Colors.white,
            borderRadius: "5px",
            padding: "5px",
            overflowX: "auto",
          }}
        >
          {/* 1-UI  */}
          {uiType === "1-UI" && tableData && (
          <Box sx={{ minWidth: "4000px", whiteSpace: "nowrap",height:"100%" }}>
            <Box sx={{ minWidth: "2340px" }}>
              <Table>
                <TableHead>
                  {/* Main Header Row */}
                  <TableRow
                    sx={{
                      backgroundColor: Colors.lightGray,
                      height: "45px",
                      padding: "0px",
                      bgcolor: Colors.blue_tableheader_light,
                      borderRadius: "5px",
                    }}
                  >
                    <TableCell
                      sx={{
                        width: "900px",
                        flexShrink: 0,
                        height: "20px",
                        padding: "0 4px",
                        borderRadius: "5px",
                      }}
                    >
                      <Typography variant="h6" sx={{ lineHeight: "normal" }}>
                        Статья затрат
                      </Typography>
                    </TableCell>
                    {firsttableData.newMonths.map((month) => (
                      <TableCell
                        key={month}
                        colSpan={showFirstYear ? 4 : 3 || showSecondYear ? 3 : 2}
                        sx={{
                          textAlign: "center",
                          width: "320px",
                          border: "2px solid #FFFFFF",
                          height: "20px",
                          borderRadius: "5px",
                          borderBottom: "2px solid #e0e0e0",
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ lineHeight: "normal" }}
                        >
                          {month}
                        </Typography>
                      </TableCell>
                    ))}
                    <TableCell
                      colSpan={4}
                      sx={{
                        textAlign: "center",
                        width: "340px",
                        borderBottom: "2px solid #e0e0e0",
                        borderRight: "2px solid #FFFFFF",
                        height: "2px",
                        padding: "0 4px",
                        borderRadius: "5px",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ lineHeight: "normal" }}
                      >
                        Total
                      </Typography>
                    </TableCell>
                  </TableRow>

                  {/* Sub-header Row */}
                  <TableRow
                    sx={{
                      backgroundColor: Colors.lightGray,
                      // borderTop: "2px solid #e0e0e0 ",
                      height: "22px",
                    }}
                  >
                    <TableCell
                      sx={{
                        width: "100%",
                        flexShrink: 0,
                        borderTop: "2px solid #e0e0e0 ",
                        borderLeft: "2px solid #e0e0e0 ",
                        height: "22px",
                        padding: "0",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                    </TableCell>
                    {monthArray.map((month) => (
                      <React.Fragment key={month}>
                        <TableCell
                          sx={{
                            width: "120px",
                            textAlign: "center",
                            border: "2px solid #d0d0d0",
                            borderRadius: "8px",
                            height: "20px",
                            padding: "0 4px",
                            display: showFirstYear ? "table-cell" : "none",
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            sx={{ lineHeight: "normal" }}
                          >
                            Plan
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{
                            width: "120px",
                            textAlign: "center",
                            border: "2px solid #d0d0d0",
                            borderRadius: "8px",
                            height: "20px",
                            padding: "0 4px",
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            sx={{ lineHeight: "normal" }}
                          >
                            Fakt
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{
                            width: "120px",
                            textAlign: "center",
                            border: "2px solid #d0d0d0 ",
                            borderRadius: "5px", // Added border radius
                            height: "20px",
                            padding: "0 4px",
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            sx={{ lineHeight: "normal" }}
                          >
                            Perf.
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{
                            width: "120px",
                            textAlign: "center",
                            border: "2px solid #d0d0d0",
                            borderRadius: "5px", // Added border radius
                            height: "20px",
                            padding: "0 4px",
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            sx={{ lineHeight: "normal" }}
                          >
                            Amount
                          </Typography>
                        </TableCell>
                      </React.Fragment>
                    ))}

                    <TableCell
                      sx={{
                        width: "120px",
                        textAlign: "center",
                        borderTop: "2px solid #d0d0d0",
                        borderRadius: "5px", // Added border radius
                        height: "20px",
                        padding: "0 4px",
                        display: showFirstYear ? "table-cell" : "none",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ lineHeight: "normal", fontWeight: "bold" }}
                      >
                        Plan
                      </Typography>
                    </TableCell>

                    <TableCell
                      sx={{
                        width: "120px",
                        textAlign: "center",
                        border: "2px solid #d0d0d0",
                        borderRadius: "5px", // Added border radius
                        height: "20px",
                        padding: "0 4px",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ lineHeight: "normal", fontWeight: "bold" }}
                      >
                        Fakt
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "120px",
                        textAlign: "center",
                        border: "2px solid #d0d0d0",
                        borderRadius: "5px", // Added border radius
                        height: "20px",
                        padding: "0 4px",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ lineHeight: "normal", fontWeight: "bold" }}
                      >
                        Perf.
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "120px",
                        textAlign: "center",
                        border: "2px solid #d0d0d0",
                        borderRadius: "5px", // Added border radius
                        height: "20px",
                        padding: "0 4px",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ lineHeight: "normal", fontWeight: "bold" }}
                      >
                        Amount
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                {/* Data Rows */}
                <TableBody>
                  {firsttableData &&
                    firsttableData.data &&
                    firsttableData.data.map((row) => (
                      <SecondDataRow key={row.id} row={row} monthArray={monthArray} />
                    ))}
                  {/* <==== TOTAL BOTTOM SECTION  ====> */}
                  {newTestAPI.totalData.map((total, key) => (
                    <TableRow
                      key={key}
                      sx={{
                        backgroundColor: Colors.lightGray,
                        borderTop: "2px solid #e0e0e0",
                        height: "22px",
                      }}
                    >
                      {/* Name Cell */}
                      <TableCell
                        sx={{
                          width: "482px",
                          flexShrink: 0,
                          border: "2px solid #d0d0d0",
                          height: "20px",
                          padding: "0",
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{
                            lineHeight: "normal",
                            fontWeight: "bold",
                            paddingLeft: "5px",
                          }}
                        >
                          {total.name}
                        </Typography>
                      </TableCell>

                      {/* Monthly Data Cells */}
                      {monthArray.map((month, index) => (
                        <React.Fragment key={index}>
                          <TableCell
                            sx={{
                              width: "120px",
                              textAlign: "right",
                              border: "2px solid #d0d0d0",
                              borderRadius: "8px",
                              height: "20px",
                              padding: "0 4px",
                              display: showFirstYear ? "table-cell" : "none",
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{ lineHeight: "normal" }}
                            >
                              {total.months[month]?.newfirstMonth || "-"}
                            </Typography>
                          </TableCell>
                          <TableCell
                            sx={{
                              width: "120px",
                              textAlign: "right",
                              border: "2px solid #d0d0d0",
                              borderRadius: "8px",
                              height: "20px",
                              padding: "0 4px",
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{ lineHeight: "normal" }}
                            >
                              {total.months[month]?.newsecondMonth || "-"}
                            </Typography>
                          </TableCell>
                          <TableCell
                            sx={{
                              width: "120px",
                              textAlign: "center",
                              border: "2px solid #d0d0d0",
                              borderRadius: "5px",
                              height: "20px",
                              padding: "0 4px",
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{ lineHeight: "normal" }}
                            >
                              {total.months[month]
                                ?.differencePercentageTotalMonth || "-"}
                              %
                            </Typography>
                          </TableCell>
                          <TableCell
                            sx={{
                              width: "120px",
                              textAlign: "right",
                              border: "2px solid #d0d0d0",
                              borderRadius: "5px",
                              height: "20px",
                              padding: "0 4px",
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{ lineHeight: "normal" }}
                            >
                              {total.months[month]
                                ?.differenceAmountTotalMonth || "-"}
                            </Typography>
                          </TableCell>
                        </React.Fragment>
                      ))}

                      {/* Total Yearly Sums and Final Columns */}
                      <TableCell
                        sx={{
                          width: "120px",
                          textAlign: "right",
                          border: "2px solid #d0d0d0",
                          borderRadius: "5px",
                          height: "20px",
                          padding: "0 4px",
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ lineHeight: "normal", fontWeight: "bold" }}
                        >
                          {total.firstYearTotalMonthSum}
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          width: "120px",
                          textAlign: "right",
                          border: "2px solid #d0d0d0",
                          borderRadius: "5px",
                          height: "20px",
                          padding: "0 4px",
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ lineHeight: "normal", fontWeight: "bold" }}
                        >
                          {total.secondYearTotalMonthSum}
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          width: "120px",
                          textAlign: "center",
                          border: "2px solid #d0d0d0",
                          borderRadius: "5px",
                          height: "20px",
                          padding: "0 4px",
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ lineHeight: "normal", fontWeight: "bold" }}
                        >
                          {total.percentageSeparateTotalMonth}%
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          width: "120px",
                          textAlign: "right",
                          border: "2px solid #d0d0d0",
                          borderRadius: "5px",
                          height: "20px",
                          padding: "0 4px",
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ lineHeight: "normal", fontWeight: "bold" }}
                        >
                          {total.amountSeparateTotalMonth}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Box>
        )}
          {/* 2-UI */}
          {uiType === "2-UI" && (
            <>
              {loading ? (
                // Loader
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%", // Match the table height
                  }}
                >
                    <AnimatedIcon sx={{ width: '300px', height: '350px' }}/>
                </Box>
              ) : error ? (
                // Error Message
                <Typography variant="h6" color="error">
                  Error loading data: {error.message}
                </Typography>
              ) : tableData && firsttableData ? (
          <Box sx={{ width: '100%', overflowX: 'auto', whiteSpace: "nowrap",height:"auto" }}>
            <Box sx={{ minWidth: "2340px" }}>
              <Table 
                  sx={{
                    tableLayout: 'fixed',
                    width: '100%',
                  }}
              >
                <TableHead>
                  {/* Main Header Row */}
                  <TableRow
                    sx={{
                      backgroundColor: Colors.lightGray,
                      borderBottom: "2px solid #FFFFFF",
                      height: "45px",
                      padding: "0px",
                      bgcolor: Colors.blue_tableheader_light,
                      borderRadius: "5px",
                    }}
                  >
                    <TableCell
                      sx={{
                        position: 'sticky',
                        left: 0,
                        width: "600px",
                        flexShrink: 0,
                        height: "22px",
                        padding: "0 4px",
                        borderRadius: "5px",
                        bgcolor: Colors.blue_tableheader_light,
                      }}
                    >
                      <Typography variant="h6" 
                      sx={{ 
                        lineHeight: "normal",
                        textAlign: "center",
                        whiteSpace: "nowrap", 
                        overflow:"hidden",
                        textOverflow:"ellipsis",
                        width:"100%",
                        }}>
                        Статья затрат
                      </Typography>
                    </TableCell>
                    {firsttableData.newMonths.map((month) => (
                      <TableCell
                        key={month}
                        // columns number section  //
                        colSpan={
                          (visibleColumns.firstYear ? 1 : 0) +
                          (visibleColumns.secondYear ? 1 : 0) +
                          (visibleColumns.percentage ? 1 : 0) +
                          (visibleColumns.amount ? 1 : 0)
                        }
                        sx={{
                          textAlign: "center",
                          width: "320px",
                          border: "2px solid #FFFFFF",
                          height: "20px",
                          padding: "0 4px",
                          borderRadius: "5px",
                          borderBottom: "2px solid #e0e0e0",
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ lineHeight: "normal" }}
                        >
                          {month}
                        </Typography>
                      </TableCell>
                    ))}
                    {/* <==== TOTAL COLUMN HEADER ====> */}
                    <TableCell
                          colSpan={
                          (visibleColumns.firstYear ? 1 : 0) +
                          (visibleColumns.secondYear ? 1 : 0) +
                          (visibleColumns.percentage ? 1 : 0) +
                          (visibleColumns.amount ? 1 : 0)
                        }
                      sx={{
                        textAlign: "center",
                        width: "340px",
                        borderBottom: "2px solid #e0e0e0",
                        borderRight: "2px solid #FFFFFF",
                        height: "2px",
                        padding: "0 4px",
                        borderRadius: "5px",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ lineHeight: "normal" }}
                      >
                        Total
                      </Typography>
                    </TableCell>
                  </TableRow>

                  {/* Sub-header Row */}
                  <TableRow
                    sx={{
                      backgroundColor: Colors.lightGray,
                      borderTop: "2px solid #e0e0e0 ",
                      height: "22px",
                    }}
                  >
                    {/* <==== HIDE BUTTONS SECTIONS ===> */}
                    <TableCell
                      sx={{
                        position:"sticky",
                        left:0,
                        width: "100%",
                        flexShrink: 0,
                        border: "2px solid #d0d0d0",
                        height: "22px",
                        padding: "0",
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                        bgcolor: Colors.lightGray,
                      }}
                    >
                        <Button
                          value={firstYear}
                          variant="contained"
                          sx={{
                            width: "25%",
                            padding: "0px",
                            lineHeight: "20px",
                            color: "black",
                            borderRadius: "0px",
                            bgcolor: visibleColumns.firstYear ? "#66CFFF" : "#C0C0C0", // Light blue when visible, dark blue when hidden
                            "&:hover": {
                              bgcolor: visibleColumns.firstYear ? "#559FCF" : "#9CC5D2", // Adjust hover color
                            },
                          }}
                          onClick={() => toggleColumnVisibility("firstYear")}
                        >
                          {firstYear}
                        </Button>
                        <Button
                          value={secondYear}
                          variant="contained"
                          sx={{
                            width: "25%",
                            padding: "0px",
                            lineHeight: "20px",
                            color: "black",
                            borderRadius: "0px",
                            bgcolor: visibleColumns.secondYear ? "#66CFFF" : "#C0C0C0",
                            "&:hover": {
                              bgcolor: visibleColumns.secondYear ? "#559FCF" : "#9CC5D2",
                            },
                          }}
                          onClick={() => toggleColumnVisibility("secondYear")}
                        >
                          {secondYear}
                        </Button>
                        <Button
                          value="%"
                          variant="contained"
                          sx={{
                            width: "25%",
                            padding: "0px",
                            lineHeight: "20px",
                            color: "black",
                            borderRadius: "0px",
                            bgcolor: visibleColumns.percentage ? "#66CFFF" : "#C0C0C0",
                            "&:hover": {
                              bgcolor: visibleColumns.percentage ? "#559FCF" : "#9CC5D2",
                            },
                          }}
                          onClick={() => toggleColumnVisibility("percentage")}
                        >
                          %
                        </Button>
                        <Button
                          value="$"
                          variant="contained"
                          sx={{
                            width: "25%",
                            padding: "0px",
                            lineHeight: "20px",
                            color: "black",
                            borderRadius: "0px",
                            bgcolor: visibleColumns.amount ? "#66CFFF" : "#C0C0C0",
                            "&:hover": {
                              bgcolor: visibleColumns.amount ? "#559FCF" : "#9CC5D2",
                            },
                          }}
                          onClick={() => toggleColumnVisibility("amount")}
                        >
                          $
                        </Button>
                    </TableCell>
                    {tableData.newMonths.map((month) => (
                      <React.Fragment key={month}>
                        {visibleColumns.firstYear && (
                        <TableCell
                          sx={{
                            width: "120px",
                            textAlign: "center",
                            border: "2px solid #d0d0d0",
                            borderRadius: "8px",
                            height: "20px",
                            padding: "0 4px",
                            display: showFirstYear ? "table-cell" : "none",
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            sx={{ lineHeight: "normal" }}
                          >
                            {firsttableData.choosedfirstYear}
                          </Typography>
                        </TableCell>
                         )}
                        {visibleColumns.secondYear && (
                        <TableCell
                          sx={{
                            width: "120px",
                            textAlign: "center",
                            border: "2px solid #d0d0d0",
                            borderRadius: "8px",
                            height: "20px",
                            padding: "0 4px",
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            sx={{ lineHeight: "normal" }}
                          >
                            {firsttableData.choosedsecondYear}
                          </Typography>
                        </TableCell> 
                        )}
                         {visibleColumns.percentage && (
                        <TableCell
                          sx={{
                            width: "120px",
                            textAlign: "center",
                            border: "2px solid #d0d0d0 ",
                            borderRadius: "5px", // Added border radius
                            height: "20px",
                            padding: "0 4px",
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            sx={{ lineHeight: "normal" }}
                          >
                            Perf.
                          </Typography>
                        </TableCell>
                         )}
                           {visibleColumns.amount && (
                        <TableCell
                          sx={{
                            width: "120px",
                            textAlign: "center",
                            border: "2px solid #d0d0d0",
                            borderRadius: "5px", // Added border radius
                            height: "20px",
                            padding: "0 4px",
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            sx={{ lineHeight: "normal" }}
                          >
                            Amount
                          </Typography>
                        </TableCell>
                           )}
                      </React.Fragment>
                    ))}
                      {visibleColumns.firstYear && (
                    <TableCell
                      sx={{
                        width: "120px",
                        textAlign: "center",
                        borderTop: "2px solid #d0d0d0",
                        borderRadius: "5px", // Added border radius
                        height: "20px",
                        padding: "0 4px",
                        display: showFirstYear ? "table-cell" : "none",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ lineHeight: "normal", fontWeight: "bold" }}
                      >
                        {firsttableData.choosedfirstYear}
                      </Typography>
                    </TableCell>
                      )}
                    {visibleColumns.secondYear && (
                    <TableCell
                      sx={{
                        width: "120px",
                        textAlign: "center",
                        border: "2px solid #d0d0d0",
                        borderRadius: "5px", // Added border radius
                        height: "20px",
                        padding: "0 4px",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ lineHeight: "normal", fontWeight: "bold" }}
                      >
                        {firsttableData.choosedsecondYear}
                      </Typography>
                    </TableCell> 
                    )}

                    {visibleColumns.percentage && (
                    <TableCell
                      sx={{
                        width: "120px",
                        textAlign: "center",
                        border: "2px solid #d0d0d0",
                        borderRadius: "5px", // Added border radius
                        height: "20px",
                        padding: "0 4px",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ lineHeight: "normal", fontWeight: "bold" }}
                      >
                        Perf.
                      </Typography>
                    </TableCell>
                    )}

                    {visibleColumns.amount && (
                    <TableCell
                      sx={{
                        width: "120px",
                        textAlign: "center",
                        border: "2px solid #d0d0d0",
                        borderRadius: "5px", // Added border radius
                        height: "20px",
                        padding: "0 4px",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ lineHeight: "normal", fontWeight: "bold" }}
                      >
                        Amount
                      </Typography>
                    </TableCell>
                    )}
                  </TableRow>
                </TableHead>
                {/* Data Rows */}
                <TableBody>
                  {firsttableData &&
                    firsttableData.data &&
                    firsttableData.data.map((row) => (
                      <DataRow key={row.id} row={row} monthArray={monthArray} />
                    ))}
                  {/* <==== TOTAL BOTTOM SECTION  ====> */}
                  {firsttableData.totalData.map((total, key) => (
                    <TableRow
                      key={key}
                      sx={{
                        backgroundColor: Colors.lightGray,
                        borderTop: "2px solid #e0e0e0",
                        height: "22px",
                      }}
                    >
                      {/* Name Cell */}
                      <TableCell
                        sx={{
                          position:"sticky",
                          left:0,
                          width: "600px",
                          flexShrink: 0,
                          border: "2px solid #d0d0d0",
                          height: "20px",
                          padding: "0",
                          bgcolor:"#e0e0e0",
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{
                            lineHeight: "normal",
                            fontWeight: "bold",
                            paddingLeft: "5px",
                            whiteSpace: "nowrap", 
                            overflow:"hidden",
                            textOverflow:"ellipsis",
                            width:"100%",
                            textAlign:"left",
                          }}
                        >
                          {total.name}
                        </Typography>
                      </TableCell>

                      {/* Monthly Data Cells */}
                      {firsttableData.newMonths.map((month, index) => (
                        <React.Fragment key={index}>
                          {visibleColumns.firstYear && (
                          <TableCell
                            sx={{
                              width: "120px",
                              textAlign: "right",
                              border: "2px solid #d0d0d0",
                              borderRadius: "8px",
                              height: "20px",
                              padding: "0 4px",
                              display: showFirstYear ? "table-cell" : "none",
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{ lineHeight: "normal" }}
                            >
                              {insertSpaces(total.months[month]?.newfirstMonth) || "-"}
                            </Typography>
                          </TableCell>
                            )}
                            {visibleColumns.secondYear && (
                          <TableCell
                            sx={{
                              width: "120px",
                              textAlign: "right",
                              border: "2px solid #d0d0d0",
                              borderRadius: "8px",
                              height: "20px",
                              padding: "0 4px",
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{ lineHeight: "normal" }}
                            >
                              {insertSpaces(total.months[month]?.newsecondMonth) || "-"}
                            </Typography>
                          </TableCell>
                            )}
                            {visibleColumns.percentage && (
                          <TableCell
                            sx={{
                              width: "120px",
                              textAlign: "center",
                              border: "2px solid #d0d0d0",
                              borderRadius: "5px",
                              height: "20px",
                              padding: "0 4px",
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{ lineHeight: "normal" }}
                            >
                              {insertSpaces(total.months[month]?.differencePercentageTotalMonth) || "-"}%
                            </Typography>
                          </TableCell>
                            )}
                            {visibleColumns.amount && (
                          <TableCell
                            sx={{
                              width: "120px",
                              textAlign: "right",
                              border: "2px solid #d0d0d0",
                              borderRadius: "5px",
                              height: "20px",
                              padding: "0 4px",
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{ lineHeight: "normal" }}
                            >
                              {insertSpaces(total.months[month]?.differenceAmountTotalMonth) || "-"}
                                
                            </Typography>
                          </TableCell>
                            )}
                        </React.Fragment>
                      ))}
                      {/* Total Yearly Sums and Final Columns */}
                      {visibleColumns.firstYear && (
                      <TableCell
                        sx={{
                          width: "120px",
                          textAlign: "right",
                          border: "2px solid #d0d0d0",
                          borderRadius: "5px",
                          height: "20px",
                          padding: "0 4px",
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ lineHeight: "normal", fontWeight: "bold" }}
                        >
                          {insertSpaces(total.firstYearTotalMonthSum)}
                        </Typography>
                      </TableCell>
                      )}
                      {visibleColumns.secondYear && (
                      <TableCell
                        sx={{
                          width: "120px",
                          textAlign: "right",
                          border: "2px solid #d0d0d0",
                          borderRadius: "5px",
                          height: "20px",
                          padding: "0 4px",
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ lineHeight: "normal", fontWeight: "bold" }}
                        >
                          {insertSpaces(total.secondYearTotalMonthSum)}
                        </Typography>
                      </TableCell>
                      )}
                      {visibleColumns.percentage && (
                      <TableCell
                        sx={{
                          width: "120px",
                          textAlign: "center",
                          border: "2px solid #d0d0d0",
                          borderRadius: "5px",
                          height: "20px",
                          padding: "0 4px",
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ lineHeight: "normal", fontWeight: "bold" }}
                        >
                          {total.percentageSeparateTotalMonth}%
                        </Typography>
                      </TableCell>
                      )}
                      {visibleColumns.amount && (
                      <TableCell
                        sx={{
                          width: "120px",
                          textAlign: "right",
                          border: "2px solid #d0d0d0",
                          borderRadius: "5px",
                          height: "20px",
                          padding: "0 4px",
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ lineHeight: "normal", fontWeight: "bold" }}
                        >
                          {insertSpaces(total.amountSeparateTotalMonth)}
                        </Typography>
                      </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Box>
           ) : (
            // Optional: No Data Message
            <Typography variant="h6" color="textSecondary">
              No data available.
            </Typography>
          )}
        </>
      )}
        </Grid>

      </Grid>
      <Footer />
    </Container>
  );
};

export default AnalizeYearDashboard;
