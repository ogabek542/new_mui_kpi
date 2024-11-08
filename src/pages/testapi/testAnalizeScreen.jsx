import React, { useState } from "react";
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
} from "@mui/material";
import { useEffect } from "react";
import LightHeader from "../../components/LightHeader/LightHeader";
import { Colors } from "../../styles/theme";
import FormControl from "@mui/material/FormControl";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PropTypes from "prop-types";

// branch section //
const top128Filials = [
  { title: "Республика", id: 1 },
  { title: "Тошкент ш", id: 2 },
  { title: "Андижон", id: 3 },
  { title: "Бухоро", id: 4 },
  { title: "Фарғона", id: 5 },
  { title: "Жиззах", id: 6 },
  { title: "Наманган", id: 7 },
  { title: "Навоий", id: 8 },
  { title: "Қашқадарё", id: 9 },
  { title: "Самарқанд", id: 10 },
  { title: "Сирдарё", id: 11 },
  { title: "Сурхондарё", id: 12 },
  { title: "Тошкент вил", id: 13 },
  { title: "Хоразм", id: 14 },
  { title: "Қорақалпоғистон рес", id: 15 },
  { title: "Миробод", id: 16 },
];

// filials section //
const setSelectedSecondMap = {
  // NBU//
  1: [{ title: "Республика" }],
  // Тошкент шаҳри //
  2: [
    { title: "Головной офис" },
    { title: "Абусахий БХО" },
    { title: "Атлас НБУ БХО" },
    { title: "Ғалаба БХО" },
    { title: "Миробод плаза БХО" },
    { title: "Наврўз БХО" },
    { title: "Технопарк БХО" },
    { title: "Хумо БХО" },
    { title: "Шайхонтохур БХО" },
    { title: "Янги сергели БХО" },
    { title: "Академия БХМ" },
    { title: "Бектемир БХМ" },
    { title: "Бош амалиёт БХМ" },
    { title: "Марказий амалиёт БХМ" },
    { title: "Мирзо-Улуғбек БХМ" },
    { title: "Олмазор БХМ" },
    { title: "Саёхат БХМ" },
    { title: "Себзор амалиёт БХМ" },
    { title: "Сергели БХМ" },
    { title: "Учтепа БХM" },
    { title: "Юнусобод БХМ" },
    { title: "Яккасарой БХМ" },
    { title: "Янгиобод БХM" },
    { title: "Яшнобод БХM" },
  ],
  // Андижон вилояти //
  3: [
    { title: "Андижон амалиёт БХМ" },
    { title: "Асака БХM" },
    { title: "Избоскан БХО" },
    { title: "Қурғонтепа БХО" },
    { title: "Мархамат БХМ" },
    { title: "Пахтаобод БХО" },
    { title: "Шахрихон БХО" },
  ],
  // Бухоро вилояти //
  4: [
    { title: "Арк БХО" },
    { title: "Бухоро амалиёт БХМ" },
    { title: "Бухоро шаҳар БХО" },
    { title: "Вобкент БХО" },
    { title: "Ғиждувон БХМ" },
    { title: "Когон БХM" },
    { title: "Қоракўл БХМ" },
    { title: "Қоровулбозор БХО" },
    { title: "Нақшбанд БХО" },
    { title: "Ромитан БХМ" },
    { title: "Шофиркон БХО" },
  ],
  // Фарғона вилояти //
  5: [
    { title: "Бешариқ БХМ" },
    { title: "Бувайда БХО" },
    { title: "Қува БХМ" },
    { title: "Қувасой БХО" },
    { title: "Қуқон БХМ" },
    { title: "Риштон БХМ" },
    { title: "Фарғона амалиёт БХМ" },
    { title: "Марғилон БХО" },
  ],
  // Жиззах  вилояти //
  6: [
    { title: "Джизак амалиёт БХМ" },
    { title: "Индустриал БХМ" },
    { title: "Мирзачуль БХМ" },
    { title: "Пахтакор БХО" },
  ],
  // Наманган  вилояти //
  7: [
    { title: "Косонсой БХО" },
    { title: "Наманган амалиёт БХМ" },
    { title: "Турақўрғон БХО" },
    { title: "Уйчи БХМ" },
    { title: "Учқурғон БХМ" },
    { title: "Чортоқ БХМ" },
    { title: "Чуст БХО" },
  ],
  // Навоий  вилояти //
  8: [
    { title: "Зарафшон БХМ" },
    { title: "Қизилтепа БХМ" },
    { title: "Маликрабод БХМ" },
    { title: "Навоий амалиёт БХМ" },
    { title: "Нурота БХО" },
    { title: "Учқудуқ БХМ" },
  ],
  // Қашқадарё  вилояти //
  9: [
    { title: "Ғузор БХО" },
    { title: "Қарши амалиёт БХМ" },
    { title: "Муборак БХО" },
    { title: "Шаҳрисабз БХМ" },
    { title: "Янгинишон БХО" },
  ],
  // Самарқанд  вилояти //
  10: [
    { title: "Булунғур БХО" },
    { title: "Джамбай БХМ" },
    { title: "Зармитан БХО" },
    { title: "Каттақўрғон БХО" },
    { title: "Қорасув БХО" },
    { title: "Нуробод БХО" },
    { title: "Пайариқ БХО" },
    { title: "Пастдаргом БХМ" },
    { title: "Регистан БХМ" },
    { title: "Самарканд амалиёт БХМ" },
    { title: "Ургут БХМ" },
  ],
  // Сирдарё  вилояти //
  11: [{ title: "Гулистан амалиёт БХМ" }, { title: "Оқолтин БХО" }],
  // Сурхондарё  вилояти //
  12: [
    { title: "Денов БХМ" },
    { title: "Қумқўрғон БХМ" },
    { title: "Термиз амалиёт БХМ" },
    { title: "Жарқўрғон БХО" },
    { title: "Шеробод БХО" },
  ],
  // Тошкент  вилояти //
  13: [
    { title: "Ангрен БХM" },
    { title: "Бекабад БХМ" },
    { title: "Газалкент БХО" },
    { title: "Нурафшон амалиёт БХМ" },
    { title: "Олмалиқ БХО" },
    { title: "Тошкент шахар БХО" },
    { title: "Чирчиқ БХО" },
    { title: "Янгийул БХМ" },
  ],
  // Хоразм  вилояти //
  14: [
    { title: "Гурлан БХО" },
    { title: "Карвон БХО" },
    { title: "Хазорасп БХМ" },
    { title: "Хива БХО" },
    { title: "Хонқа БХМ" },
    { title: "Хоразм амалиёт БХМ" },
    { title: "Шовот БХМ" },
    { title: "Янгиариқ БХО" },
    { title: "Кушкупир БХМ" },
  ],
  // Қорақалпоғистон республикаси //
  15: [
    { title: "Кўнғирот БХМ" },
    { title: "Манғит БХО" },
    { title: "Нукус амалиёт БХМ" },
    { title: "Тўрткўл БХM" },
    { title: "Хўжайли БХО" },
    { title: "Чимбой БХО" },
  ],
  16: [{ title: "Миробод" }],
};
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

//
const numbersList = ["561", "562", "563", "564", "565", "566", "567"];

// Mock table data
const tableData = [
  {
    id: "1",
    name: "Main Row 1",
    months: {
      January: { plan: 100, fact: 90 },
      February: { plan: 150, fact: 140 },
      March: { plan: 130, fact: 125 },
      April: { plan: 120, fact: 115 },
      May: { plan: 140, fact: 135 },
      June: { plan: 160, fact: 155 },
      July: { plan: 170, fact: 165 },
      August: { plan: 180, fact: 175 },
      September: { plan: 150, fact: 145 },
      October: { plan: 130, fact: 125 },
      November: { plan: 140, fact: 138 },
      December: { plan: 160, fact: 155 },
    },
    sum: 1730,
    subRows: [
      {
        id: "1.1",
        name: "Sub Row 1.1",
        months: {
          January: { plan: 50, fact: 48 },
          February: { plan: 60, fact: 58 },
          March: { plan: 70, fact: 68 },
          April: { plan: 65, fact: 63 },
          May: { plan: 55, fact: 52 },
          June: { plan: 75, fact: 72 },
          July: { plan: 80, fact: 78 },
          August: { plan: 90, fact: 85 },
          September: { plan: 70, fact: 68 },
          October: { plan: 65, fact: 62 },
          November: { plan: 60, fact: 58 },
          December: { plan: 80, fact: 78 },
        },
        sum: 820,
        subRows: [
          {
            id: " 1.1.1",
            name: "Sub Sub Row 1.1.1",
            months: {
              January: { plan: 20, fact: 19 },
              February: { plan: 25, fact: 24 },
              March: { plan: 30, fact: 29 },
              April: { plan: 28, fact: 27 },
              May: { plan: 22, fact: 21 },
              June: { plan: 35, fact: 34 },
              July: { plan: 40, fact: 39 },
              August: { plan: 45, fact: 44 },
              September: { plan: 30, fact: 29 },
              October: { plan: 28, fact: 27 },
              November: { plan: 25, fact: 24 },
              December: { plan: 35, fact: 34 },
            },
            sum: 363,
            subRows: [
              {
                id: " 1.1.1.1",
                name: "Sub Sub Sub Row 1.1.1",
                months: {
                  January: { plan: 20, fact: 19 },
                  February: { plan: 25, fact: 24 },
                  March: { plan: 30, fact: 29 },
                  April: { plan: 28, fact: 27 },
                  May: { plan: 22, fact: 21 },
                  June: { plan: 35, fact: 34 },
                  July: { plan: 40, fact: 39 },
                  August: { plan: 45, fact: 44 },
                  September: { plan: 30, fact: 29 },
                  October: { plan: 28, fact: 27 },
                  November: { plan: 25, fact: 24 },
                  December: { plan: 35, fact: 34 },
                },
                sum: 363,
                subRows: [],
              },
            ],
          },
        ],
      },
    ],
  },
  // Add more rows as needed
];
// Define the list of years
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
  const [selectedFirstYear, setSelectedFirstYear] = useState(2023); // Default first year
  const [selectedSecondtYear, setSelectedSecondYear] = useState(null); // Default first year
  const [selectedMonths, setSelectedMonths] = useState([]); // select mont name
  const [selectedNumbers, setSelectedNumbers] = useState([]); // select account book number
  const [firsttableData, setFirstTableData] = useState(tableData);
  const [selectedYears, setSelectedYears] = useState([]);
  const [dataFetched, setDataFetched] = useState(false); // New state variable
  const [yearBollean, setYearBollean] = useState(false);

  const monthArray = monthsList.map((month) => month.name);

  const getDataForYear = (year) => {
    // Simulate data fetching logic here
    // For now, return the same mock data
    return tableData.map((item) => ({
      ...item,
      name: `${item.name} (${year})`, // Append year to distinguish data
    }));
  };

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
            paddingLeft: `${depth * 3}px`, // Indent sub-rows
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

  // select first year code //
  const handleFirstYearChange = (event) => {
    setSelectedFirstYear(event.target.value);
  };

  // select month code //
  const handleMonthToggle = (month) => {
    setSelectedMonths((prev) =>
      prev.includes(month) ? prev.filter((m) => m !== month) : [...prev, month]
    );
  };

  // Render function for the tables
  const renderTable = () => {
    if (dataFetched) {
      if (selectedYears.length === 1 || selectedYears.length === 2) {
        return (
          <Box sx={{ minWidth: "2340px" }}>
            {/* Header Rows */}
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
                <Typography variant="h6">Сумма по полю Сумма</Typography>
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

            <Box>
              {firstTableData.map((row) => (
                <DataRow key={row.id} row={row} />
              ))}
            </Box>
          </Box>
        );
      }
    }
    return null;
  };

  // select account number //
  const handleNumberToggle = (number) => {
    setSelectedNumbers((prev) =>
      prev.includes(number)
        ? prev.filter((item) => item !== number)
        : [...prev, number]
    );
  };

  

 // select years section
const YearPicker = ({ yearsList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedYears, setSelectedYears] = useState([]);

  const handleToggleYearSelection = (yearId) => {
    setSelectedYears((prev) => {
      if (prev.includes(yearId)) {
        return prev.filter((id) => id !== yearId); // Deselect if already selected
      }
      if (prev.length < 2) {
        return [...prev, yearId]; // Allow only up to two years
      }
      return prev; // Do nothing if already two years selected
    });
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
          ? selectedYears
              .map((id) => yearsList.find((year) => year.id === id)?.label)
              .join(" - ")
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
              key={year.id}
              sx={{
                padding: "5px",
                marginBottom: "2px",
                borderRadius: "5px",
                backgroundColor: selectedYears.includes(year.id)
                  ? "#083473"
                  : "transparent",
                color: selectedYears.includes(year.id) ? "white" : "black",
                "&:hover": {
                  backgroundColor: Colors.blue_light_ultra,
                  color: "black",
                  fontWeight: "bold",
                },
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
              onClick={() => handleToggleYearSelection(year.id)}
            >
              {/* Checkbox next to each year */}
              <Checkbox
                checked={selectedYears.includes(year.id)}
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

  const handleToggleYearSelection = (year) => {
    setSelectedYears((prev) => {
      if (prev.includes(year)) {
        return prev.filter((y) => y !== year); // Deselect if already selected
      }
      if (prev.length < 2) {
        return [...prev, year]; // Allow only up to two years
      }
      return prev; // Do nothing if already two years selected
    });
  };
  // check yeras //
  const findYears = () => {
    if (selectedYears.length === 2) {
      setYearBollean(true);
    } else {
      setYearBollean(false);
    }
  };

  console.log(yearBollean, "check year");

  useEffect(() => {
    handleToggleYearSelection();
    findYears();
  }, []);

  const toggleRowOpen = (id) => {
    setOpenRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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
                e.stopPropagation(); // Prevent the click event from triggering the handleToggle
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
            onClick={() => onToggle(filial.id)} // Pass filial.id to handleToggle
          >
            {filial.title}
          </TableCell>
        </TableRow>
        {/* Sub-region rows stay open as long as isOpen is true */}
        {isOpen && (
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
              <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 0, padding: 0 }}>
                  <Table
                    size="small"
                    aria-label="subregions"
                    sx={{ margin: 0 }}
                  >
                    <TableBody>
                      {subRegions.map((subRegion, index) => (
                        <TableRow key={index}>
                          <TableCell sx={{ padding: "2px", pl: 2 }}>
                            <Checkbox
                              onChange={(e) => {
                                e.stopPropagation(); // Prevent the click event from triggering handleToggle
                                handleCheckboxChange(subRegion.title);
                              }}
                              checked={checkedItems.includes(subRegion.title)}
                              size="small"
                            />
                          </TableCell>

                          <TableCell
                            sx={{ padding: "2px", pl: 2, cursor: "pointer" }}
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
  // Updated sendCheckedItemsToBackend function
  const sendCheckedItemsToBackend = () => {
    console.log("Checked items to send:", checkedItems);
    console.log("Selected years:", selectedYears);

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
        },
      }}
    >
      {/* <==== LIGHT HEADER SECTION ====> */}
      <LightHeader />
      {/* <==== TABLE SECTION ====> */}
      <Grid
        container
        // spacing={0.5}
        sx={{ height: "auto", marginTop: "5px", gap: "5px" }}
        alignItems="stretch"
      >
        {/* <=== LEFT SIDE FILTER SECTION ====> */}
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
            {/* <==== REFRESH BUTTON FOR GET DATA FROM BACKEND ====> */}
            <Button
              variant="contained"
              onClick={sendCheckedItemsToBackend}
              sx={{
                width: "100%",
                fontWeight: "bold",
                color: "white",
                bgcolor: Colors.nbu,
                "&:hover": {
                  bgcolor: Colors.nbu, // Set hover background color to be the same as default
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
            {/* <==== LEFT SIDE FILIALS FILTER ====> */}
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

            {/* <==== RIGHT SIDE YEAR,MONT,ACCOUNT FILTER ====> */}
            <Box
              sx={{
                width: "40%",
                display: "block",
                height: "100%",
                color: Colors.white,
              }}
            >
              {/* <==== FIRST YEAR SELECTOR ====> */}
              <Box sx={{ padding: "10px" }}>
                <YearPicker
                  yearsList={yearsList}
                  selectedFirstYear={selectedFirstYear}
                  setSelectedFirstYear={setSelectedFirstYear}
                />
              </Box>
              {/* <===== MONTH PICKER =====> */}
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
                        backgroundColor: Colors.blue_icon, // Light blue hover effect
                        color: Colors.white,
                        fontWeight: "bold",
                      },
                    }}
                  >
                    <ListItemText sx={{ margin: 0 }} primary={month.name} />
                  </ListItem>
                ))}
              </List>
              {/* <==== ACCOUNT NUMBER ====> */}
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
                        backgroundColor: Colors.blue_icon, // Light blue hover effect
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
        {/* <=== RIGHT SIDE TABLE SECTION ====> */}
        <Grid
          item
          xs={8.85}
          sm={8.85}
          sx={{
            height: "1000px",
            bgcolor: Colors.white,
            borderRadius: "5px",
            padding: "5px",
            overflowX: "auto", // Enable horizontal scrolling
          }}
        >
          {/* Wrapper Box with scrolling properties */}
          <Box sx={{ minWidth: "2340px",whiteSpace: "nowrap"  }}>
            {/* Show two tables if two years are selected */}
            {selectedYears.length === 2 ? (
              <>
                {/* First Table */}
                <Box sx={{ marginBottom: "20px" }}>
                  {/* First Header Row */}
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
                        Сумма по полю Сумма (Год 1)
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

                {/* Second Table */}
                <Box sx={{ minWidth: "2340px" }}>
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
                        Сумма по полю Сумма (Год 2)
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
                    {secondTableData.map((row) => (
                      <DataRow key={row.id} row={row} />
                    ))}
                  </Box>
                </Box>
              </>
            ) : (
              /* Show single table if one or no year is selected */
              <Box sx={{ minWidth: "2340px" }}>
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
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AnalizeYearDashboard;
